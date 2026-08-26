"use client";

import { useId, useMemo, useState } from "react";

import { berechneAfa } from "@/lib/rechner/afa";
import {
  OBJEKTTYPEN,
  OBJEKTTYP_LABEL,
  type AfaEingaben,
  type AfaErgebnis,
  type ModernisierungsPunkte,
  type Objekttyp,
  RechnerFehler,
  aktuellesJahr,
  formatEuro,
  formatProzent,
} from "@/lib/rechner/typen";

/**
 * AfA-/Restnutzungsdauer-Rechner (LEAF B4, das Flaggschiff) — rechnet
 * ausschließlich über src/lib/rechner/afa.ts (Vertrag R3-PLAN.md,
 * Abschnitt "Verträge"). Diese Datei enthält keine eigene Steuerlogik,
 * nur Eingabe-State und Darstellung.
 *
 * Der bewusste Unterschied zu nutzungsdauer.com und immoabschreibung.de:
 * beide zeigen das Ergebnis erst nach der Lead-Wall. Hier steht das
 * Ergebnis von der ersten Sekunde an da (sinnvolle Vorbelegung, jede
 * Eingabe rechnet live über useMemo neu) — die E-Mail-Auswertung ist
 * freiwillig und kommt erst danach.
 *
 * "Zweistufig" heißt hier: zwei klar beschriftete Abschnitte im selben
 * Formular (Schritt 1 Basis, Schritt 2 Modernisierung), kein Wizard, der
 * das Ergebnis hinter einem "Weiter"-Klick versteckt — das widerspräche
 * genau dem Sofort-Versprechen oben.
 *
 * Objekttyp fließt bewusst NICHT in berechneAfa() ein (AfaEingaben kennt
 * das Feld nicht — die Engine ist auf "vermietete Wohnimmobilie im
 * Privatvermögen" kalibriert, siehe afa.ts). Er dient nur der Einordnung
 * einer späteren Anfrage und wandert deshalb separat in den Lead-Payload,
 * nicht in die Rechnung.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const KAUFPREIS_DEFAULT = "450.000";

const GEBAEUDEANTEIL_MIN = 50;
const GEBAEUDEANTEIL_MAX = 95;
const GEBAEUDEANTEIL_DEFAULT = 80;

const BAUJAHR_MIN = 1900;
const BAUJAHR_DEFAULT = 1975;

const JAHRE_MEHRJAHRESBETRACHTUNG = 10;

const jahrFormat = new Intl.NumberFormat("de-DE", { useGrouping: false });

function formatJahr(n: number) {
  return jahrFormat.format(n);
}

/** Nimmt beliebige Tippweisen an ("450000", "450.000", "450 000") und liefert die reine Zahl. */
function parseKaufpreis(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number(digits) : NaN;
}

type BauteilKey = keyof ModernisierungsPunkte;

const BAUTEIL_ORDER: readonly BauteilKey[] = ["dach", "fenster", "heizung", "bad", "elektrik", "grundriss"];
const BAUTEIL_LABEL: Record<BauteilKey, string> = {
  dach: "Dach",
  fenster: "Fenster",
  heizung: "Heizung",
  bad: "Bad",
  elektrik: "Elektrik",
  grundriss: "Grundriss",
};

const GRENZSTEUERSATZ_OPTIONEN = [
  { wert: 14, label: "14 % — Eingangssteuersatz" },
  { wert: 24, label: "24 %" },
  { wert: 30, label: "30 %" },
  { wert: 35, label: "35 %" },
  { wert: 42, label: "42 % — Spitzensteuersatz" },
  { wert: 45, label: "45 % — Reichensteuer" },
] as const;

type Ergebnis =
  | { ok: true; eingaben: AfaEingaben; wert: AfaErgebnis }
  | { ok: false; fehler: string };

export function AfaRechner() {
  const idBasis = useId();

  // ── Schritt 1 — Basis ────────────────────────────────────────────
  const [objekttyp, setObjekttyp] = useState<Objekttyp>("ETW");
  const [kaufpreisStr, setKaufpreisStr] = useState(KAUFPREIS_DEFAULT);
  const [gebaeudeanteil, setGebaeudeanteil] = useState(GEBAEUDEANTEIL_DEFAULT);
  const [baujahr, setBaujahr] = useState(BAUJAHR_DEFAULT);
  const [grenzsteuersatz, setGrenzsteuersatz] = useState(42);

  // ── Schritt 2 — Modernisierung ───────────────────────────────────
  const [modernisierung, setModernisierung] = useState<ModernisierungsPunkte>({
    dach: 0,
    fenster: 0,
    heizung: 0,
    bad: 0,
    elektrik: 0,
    grundriss: 0,
  });

  function setBauteil(key: BauteilKey, wert: number) {
    setModernisierung((prev) => ({ ...prev, [key]: wert }));
  }

  const baujahrMax = aktuellesJahr();

  const ergebnis: Ergebnis = useMemo(() => {
    const eingaben: AfaEingaben = {
      kaufpreisGesamt: parseKaufpreis(kaufpreisStr),
      gebaeudeanteilProzent: gebaeudeanteil,
      baujahr,
      modernisierung,
      grenzsteuersatzProzent: grenzsteuersatz,
    };
    try {
      return { ok: true, eingaben, wert: berechneAfa(eingaben) };
    } catch (e) {
      return {
        ok: false,
        fehler: e instanceof RechnerFehler ? e.message : "Die Eingaben konnten nicht berechnet werden.",
      };
    }
  }, [kaufpreisStr, gebaeudeanteil, baujahr, modernisierung, grenzsteuersatz]);

  // ── Rechenweg-Klappe — .faq-item/.faq-trigger/.faq-panel-Technik ──
  const [rechenwegOffen, setRechenwegOffen] = useState(false);
  const rechenwegPanelId = `${idBasis}-rechenweg`;

  // ── E-Mail-Auswertung (optional, ohne Gate vor dem Ergebnis) ─────
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gesendet, setGesendet] = useState<null | { demo: boolean }>(null);

  async function mailAnfordern(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !ergebnis.ok) return;
    if (!name.trim()) return setError("Bitte Ihren Namen angeben.");
    if (!EMAIL_RE.test(email)) return setError("Bitte eine gültige E-Mail-Adresse angeben.");
    if (!consent) return setError("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "afa",
          eingaben: { ...ergebnis.eingaben, objekttyp },
          ergebnis: ergebnis.wert,
          name,
          email,
          website,
        }),
      });
      if (res.status === 429) {
        setBusy(false);
        return setError("Zu viele Anfragen kurz hintereinander. Bitte in ein paar Minuten erneut versuchen.");
      }
      if (res.status === 422) {
        setBusy(false);
        return setError("Bitte prüfen Sie Namen und E-Mail-Adresse.");
      }
      if (!res.ok) throw new Error("request failed");
      const j = (await res.json()) as { demo?: boolean };
      setBusy(false);
      setGesendet({ demo: Boolean(j.demo) });
    } catch {
      setBusy(false);
      setError("Der Versand hat technisch nicht geklappt. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben.");
    }
  }

  return (
    <div className="check-frame">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
        {/* ── Formular ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-7">
          <div>
            <p className="t-label !text-ink-yellow">Schritt 1 · Basis</p>
          </div>

          <Feld label="Kaufpreis" htmlFor={`${idBasis}-kaufpreis`}>
            <div className="relative">
              <input
                id={`${idBasis}-kaufpreis`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={kaufpreisStr}
                onChange={(e) => setKaufpreisStr(e.target.value)}
                placeholder="450.000"
                className="w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 pr-11 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-ink-dim">
                €
              </span>
            </div>
          </Feld>

          <ReglerFeld
            id={`${idBasis}-gebaeudeanteil`}
            label="Gebäudeanteil"
            wert={gebaeudeanteil}
            min={GEBAEUDEANTEIL_MIN}
            max={GEBAEUDEANTEIL_MAX}
            step={1}
            format={(n) => formatProzent(n, 0)}
            onChange={setGebaeudeanteil}
          />

          <ReglerFeld
            id={`${idBasis}-baujahr`}
            label="Baujahr"
            wert={baujahr}
            min={BAUJAHR_MIN}
            max={baujahrMax}
            step={1}
            format={formatJahr}
            onChange={setBaujahr}
          />

          <div>
            <p className="t-label mb-2.5">Objekttyp</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Objekttyp">
              {OBJEKTTYPEN.map((option) => {
                const aktiv = objekttyp === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setObjekttyp(option)}
                    aria-pressed={aktiv}
                    className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                      aktiv
                        ? "border-transparent bg-akzent text-ink-cream"
                        : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
                    }`}
                  >
                    {OBJEKTTYP_LABEL[option]}
                  </button>
                );
              })}
            </div>
            <p className="t-small mt-2">Beeinflusst nur die Einordnung Ihrer Anfrage, nicht die Berechnung.</p>
          </div>

          <Feld label="Grenzsteuersatz" htmlFor={`${idBasis}-steuersatz`}>
            <div className="relative">
              <select
                id={`${idBasis}-steuersatz`}
                value={grenzsteuersatz}
                onChange={(e) => setGrenzsteuersatz(Number(e.target.value))}
                className="w-full appearance-none rounded-[10px] border border-line-medium bg-white px-4 py-2.5 pr-10 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] focus:border-transparent focus:bg-akzent-wash"
              >
                {GRENZSTEUERSATZ_OPTIONEN.map((o) => (
                  <option key={o.wert} value={o.wert}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 10l6 5 6-5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Feld>

          <div className="mt-2 border-t border-line-subtle pt-7">
            <p className="t-label !text-ink-yellow">Schritt 2 · Modernisierung</p>
            <p className="t-small mt-2">
              0 = nicht modernisiert · 1 = teilmodernisiert · 2 = vollständig modernisiert
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {BAUTEIL_ORDER.map((key) => (
                <BauteilZeile
                  key={key}
                  label={BAUTEIL_LABEL[key]}
                  wert={modernisierung[key]}
                  onChange={(v) => setBauteil(key, v)}
                />
              ))}
            </div>
            {ergebnis.ok && (
              <p className="t-small mt-4">
                Modernisierungsgrad:{" "}
                <span className="tnum font-medium text-ink-cream">
                  {ergebnis.wert.modernisierungspunkteGesamt} von 12
                </span>{" "}
                Punkten — {ergebnis.wert.modernisierungsgrad}.
              </p>
            )}
          </div>
        </div>

        {/* ── Live-Ergebnis ──────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-[18px] border border-line-medium bg-akzent-wash px-6 py-6 sm:px-7 sm:py-7">
            <p className="t-small !text-ink-muted">Ergebnis sofort sichtbar — ohne E-Mail-Pflicht.</p>

            {ergebnis.ok ? (
              <div aria-live="polite">
                <p className="t-label mt-4">Jährliche AfA im Vergleich</p>

                <AfaBalkenpaar
                  regulaerEuro={ergebnis.wert.afaRegulaerProJahrEuro}
                  gutachtenEuro={ergebnis.wert.afaGutachtenProJahrEuro}
                  satzRegulaer={ergebnis.wert.afaSatzRegulaerProzent}
                  satzGutachten={ergebnis.wert.afaSatzGutachtenProzent}
                />

                {!ergebnis.wert.gutachtenGreift && (
                  <p className="t-small mt-3 text-ink-muted">
                    Bei diesem Baujahr und dieser Modernisierung liegt die reguläre AfA bereits auf dem Niveau
                    eines Gutachtens — hier bringt ein Restnutzungsdauer-Gutachten keinen Vorteil.
                  </p>
                )}

                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-line-medium pt-6 sm:grid-cols-3">
                  <Stat
                    label="Mehr-Abschreibung / Jahr"
                    wert={formatEuro(ergebnis.wert.mehrAbschreibungProJahrEuro, 0)}
                  />
                  <Stat
                    label={`Über ${JAHRE_MEHRJAHRESBETRACHTUNG} Jahre`}
                    wert={formatEuro(ergebnis.wert.mehrAbschreibungUeber10JahreEuro, 0)}
                  />
                  <Stat
                    label={`Steuereffekt (${formatProzent(ergebnis.wert.grenzsteuersatzProzent, 0)})`}
                    wert={formatEuro(ergebnis.wert.steuerersparnisProJahrEuro, 0)}
                    sub={`${formatEuro(ergebnis.wert.steuerersparnisUeber10JahreEuro, 0)} über ${JAHRE_MEHRJAHRESBETRACHTUNG} Jahre`}
                  />
                </div>

                <div className="mt-5 rounded-r-lg border-l-2 border-akzent bg-white/60 py-3 pl-4 pr-3">
                  <p className="text-[13px] font-medium text-ink-cream">{ergebnis.wert.hinweis}</p>
                </div>

                {/* Rechenweg — wiederverwendet .faq-item/.faq-trigger/.faq-panel */}
                <div className="faq-item mt-5 border-t border-line-medium" data-open={rechenwegOffen ? "true" : "false"}>
                  <button
                    type="button"
                    className="faq-trigger !py-3.5"
                    aria-expanded={rechenwegOffen}
                    aria-controls={rechenwegPanelId}
                    onClick={() => setRechenwegOffen((v) => !v)}
                  >
                    <span className="text-[13.5px] font-semibold text-ink-cream">Rechenweg anzeigen</span>
                    <svg className="faq-chevron" viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path
                        d="M6 10l6 5 6-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </button>
                  <div className="faq-panel" id={rechenwegPanelId} role="region">
                    <div>
                      <ul className="faq-panel-inner !max-w-none space-y-2">
                        {ergebnis.wert.schritte.map((schritt, i) => (
                          <li
                            key={`${schritt.label}-${i}`}
                            className="flex items-baseline justify-between gap-4 text-[13px]"
                          >
                            <span className="text-ink-muted">{schritt.label}</span>
                            <span className="tnum shrink-0 font-medium text-ink-cream">{schritt.wert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="t-body mt-4" role="alert">
                {ergebnis.fehler}
              </p>
            )}
          </div>

          {/* ── Auswertung per E-Mail (optional, kein Gate) ─────────── */}
          <div className="mt-6 border-t border-line-subtle pt-6">
            {gesendet ? (
              <div>
                <p className="t-h3">Auswertung ist unterwegs.</p>
                <p className="t-body mt-2">
                  Wir schicken die detaillierte Auswertung an <span className="font-medium text-ink-cream">{email}</span>.
                </p>
                {gesendet.demo && (
                  <p className="t-small is-fail mt-3">
                    Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert.
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={mailAnfordern} noValidate>
                <p className="t-small font-medium !text-ink-cream">Detaillierte Auswertung als E-Mail</p>
                <p className="t-small mt-1.5">
                  Rechenweg, Vergleich und Annahmen als PDF-taugliche Zusammenfassung — freiwillig, für später.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${idBasis}-name`} className="t-label mb-1.5 block">
                      Name
                    </label>
                    <input
                      id={`${idBasis}-name`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError(null);
                      }}
                      autoComplete="name"
                      placeholder="Vor- und Nachname"
                      className="w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${idBasis}-email`} className="t-label mb-1.5 block">
                      E-Mail
                    </label>
                    <input
                      id={`${idBasis}-email`}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      autoComplete="email"
                      placeholder="name@beispiel.de"
                      className="w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash"
                    />
                  </div>
                </div>

                {/* Honeypot — für Menschen unsichtbar */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                />

                <label className="mt-3.5 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setError(null);
                    }}
                    style={{ accentColor: "var(--gold)" }}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span className="t-small">
                    Ich willige ein, dass meine Angaben zur Zustellung der Auswertung verarbeitet werden. Jederzeit
                    widerrufbar (siehe{" "}
                    <a href="/datenschutz" className="btn-link">
                      Datenschutz
                    </a>
                    ).
                  </span>
                </label>

                {error && (
                  <p className="t-small is-fail mt-3" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || !ergebnis.ok}
                  className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-akzent px-6 py-3 text-[14.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? "Wird gesendet…" : "Auswertung per E-Mail senden"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Formular-Bausteine ─────────────────────────────────────────── */

function Feld({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="t-label mb-2.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

function ReglerFeld({
  id,
  label,
  wert,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  wert: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="t-label">
          {label}
        </label>
        <span className="font-display text-[16px] font-semibold text-ink-cream tnum">{format(wert)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={wert}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: "var(--akzent)" }}
        className="mt-2.5 w-full cursor-pointer"
      />
      <div className="mt-1 flex justify-between text-[11px] text-ink-dim tnum">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function BauteilZeile({
  label,
  wert,
  onChange,
}: {
  label: string;
  wert: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[12px] border border-line-subtle px-4 py-3">
      <span className="text-[13.5px] font-medium text-ink-cream">{label}</span>
      <div className="flex gap-1.5" role="group" aria-label={`Modernisierung ${label}`}>
        {[0, 1, 2].map((stufe) => {
          const aktiv = wert === stufe;
          return (
            <button
              key={stufe}
              type="button"
              onClick={() => onChange(stufe)}
              aria-pressed={aktiv}
              className={`h-8 w-8 rounded-full text-[12.5px] font-semibold tnum transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                aktiv
                  ? "bg-akzent text-ink-cream"
                  : "bg-bg-elevated text-ink-muted hover:bg-akzent-wash hover:text-ink-cream"
              }`}
            >
              {stufe}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * AfaBalkenpaar — regulär vs. mit Gutachten, ein Balkenpaar auf
 * gemeinsamer Skala (beide Werte sind €/Jahr, dieselbe Einheit — eine
 * zweite Achse wäre hier reine Deko, keine echte Information). Regulär
 * bekommt --chart-kontext (De-Emphasis), Gutachten --chart-akzent
 * (der beuwy-Wert, den es hervorzuheben gilt).
 */
function AfaBalkenpaar({
  regulaerEuro,
  gutachtenEuro,
  satzRegulaer,
  satzGutachten,
}: {
  regulaerEuro: number;
  gutachtenEuro: number;
  satzRegulaer: number;
  satzGutachten: number;
}) {
  const max = Math.max(regulaerEuro, gutachtenEuro, 1);
  return (
    <div className="mt-4 space-y-3">
      <Balken label="Regulär" wert={regulaerEuro} satz={satzRegulaer} anteil={(regulaerEuro / max) * 100} farbe="var(--chart-kontext)" />
      <Balken
        label="Mit Gutachten"
        wert={gutachtenEuro}
        satz={satzGutachten}
        anteil={(gutachtenEuro / max) * 100}
        farbe="var(--chart-akzent)"
      />
    </div>
  );
}

function Balken({
  label,
  wert,
  satz,
  anteil,
  farbe,
}: {
  label: string;
  wert: number;
  satz: number;
  anteil: number;
  farbe: string;
}) {
  const breite = wert > 0 ? Math.max(anteil, 2) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-ink-cream">
          {label} <span className="tnum text-ink-dim">({formatProzent(satz, 1)})</span>
        </span>
        <span className="tnum text-[13px] font-semibold text-ink-cream">{formatEuro(wert, 0)}/Jahr</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)]"
          style={{ width: `${breite}%`, background: farbe }}
        />
      </div>
    </div>
  );
}

function Stat({ label, wert, sub }: { label: string; wert: string; sub?: string }) {
  return (
    <div>
      <p className="t-label">{label}</p>
      <p className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink-cream tnum [text-wrap:balance]">
        {wert}
      </p>
      {sub && <p className="t-small mt-1 tnum">{sub}</p>}
    </div>
  );
}
