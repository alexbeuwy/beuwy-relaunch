"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { berechneVerkaufswert } from "@/lib/rechner/verkaufswert";
import {
  DREI_STUFEN,
  DREI_STUFEN_LABEL,
  type Mikrolage,
  OBJEKTTYPEN,
  OBJEKTTYP_LABEL,
  type Objekttyp,
  RechnerFehler,
  STADTGROESSEN,
  STADTGROESSE_LABEL,
  type StadtGroesse,
  type VerkaufswertEingaben,
  type VerkaufswertErgebnis,
  ZUSTAENDE,
  ZUSTAND_LABEL,
  type Zustand,
  aktuellesJahr,
  formatEuro,
} from "@/lib/rechner/typen";

/**
 * Verkaufspreisrechner (LEAF B2) — Formular links/oben, Live-Ergebnis
 * rechts/unten. Rechnet ausschließlich über src/lib/rechner/verkaufswert.ts
 * (Vertrag R3-PLAN.md, Abschnitt "Verträge") — diese Datei enthält keine
 * eigene Preislogik, nur Eingabe-State und Darstellung.
 *
 * Bewusster Unterschied zu BOTTIMMO & Co.: das Ergebnis steht sofort da,
 * ohne dass vorher eine E-Mail-Adresse verlangt wird. Der Lead-Gate-Moment
 * kommt erst danach, freiwillig, für die ausführlichere Auswertung per Mail.
 *
 * Motion ausschließlich über vorhandene Tokens/Klassen: die
 * Rechenweg-Klappe wiederverwendet die .faq-item/.faq-trigger/.faq-panel-
 * Grid-Rows-Technik aus globals.css (inkl. deren
 * prefers-reduced-motion-Guard) statt einer neuen Animation.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const WOHNFLAECHE_MIN = 20;
const WOHNFLAECHE_MAX = 400;
const WOHNFLAECHE_STEP = 5;

const BAUJAHR_MIN = 1900;

const GRUNDSTUECK_MIN = 100;
const GRUNDSTUECK_MAX = 3000;
const GRUNDSTUECK_STEP = 10;

const qmFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const jahrFormat = new Intl.NumberFormat("de-DE", { useGrouping: false });

function formatM2(n: number) {
  return `${qmFormat.format(n)} m²`;
}

type Ergebnis =
  | { ok: true; eingaben: VerkaufswertEingaben; wert: VerkaufswertErgebnis }
  | { ok: false; fehler: string };

export function VerkaufspreisRechner() {
  const idBasis = useId();

  // ── Eingaben ──────────────────────────────────────────────────
  const [objekttyp, setObjekttyp] = useState<Objekttyp>("ETW");
  const [wohnflaeche, setWohnflaeche] = useState(90);
  const [baujahr, setBaujahr] = useState(1995);
  const [zustand, setZustand] = useState<Zustand>("gepflegt");
  const [stadtgroesse, setStadtgroesse] = useState<StadtGroesse>("grossstadt");
  const [mikrolage, setMikrolage] = useState<Mikrolage>("mittel");
  const [grundstuecksflaeche, setGrundstuecksflaeche] = useState(500);

  const brauchtGrundstueck = objekttyp !== "ETW";
  const baujahrMax = aktuellesJahr() + 1;

  const ergebnis: Ergebnis = useMemo(() => {
    const eingaben: VerkaufswertEingaben = {
      wohnflaeche,
      baujahr,
      objekttyp,
      zustand,
      stadtgroesse,
      mikrolage,
      grundstuecksflaeche: brauchtGrundstueck ? grundstuecksflaeche : undefined,
    };
    try {
      return { ok: true, eingaben, wert: berechneVerkaufswert(eingaben) };
    } catch (e) {
      return {
        ok: false,
        fehler: e instanceof RechnerFehler ? e.message : "Die Eingaben konnten nicht berechnet werden.",
      };
    }
  }, [wohnflaeche, baujahr, objekttyp, zustand, stadtgroesse, mikrolage, grundstuecksflaeche, brauchtGrundstueck]);

  // ── Rechenweg-Klappe ─────────────────────────────────────────
  const [rechenwegOffen, setRechenwegOffen] = useState(false);
  const rechenwegPanelId = `${idBasis}-rechenweg`;

  // ── E-Mail-Auswertung ────────────────────────────────────────
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
          tool: "verkaufspreis",
          eingaben: ergebnis.eingaben,
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
          <PillGruppe
            label="Objekttyp"
            optionen={OBJEKTTYPEN}
            labelMap={OBJEKTTYP_LABEL}
            wert={objekttyp}
            onChange={setObjekttyp}
          />

          <ReglerFeld
            id={`${idBasis}-wohnflaeche`}
            label="Wohnfläche"
            wert={wohnflaeche}
            min={WOHNFLAECHE_MIN}
            max={WOHNFLAECHE_MAX}
            step={WOHNFLAECHE_STEP}
            format={formatM2}
            onChange={setWohnflaeche}
          />

          <ReglerFeld
            id={`${idBasis}-baujahr`}
            label="Baujahr"
            wert={baujahr}
            min={BAUJAHR_MIN}
            max={baujahrMax}
            step={1}
            format={(n) => jahrFormat.format(n)}
            onChange={setBaujahr}
          />

          {brauchtGrundstueck && (
            <ReglerFeld
              id={`${idBasis}-grundstueck`}
              label="Grundstücksfläche"
              wert={grundstuecksflaeche}
              min={GRUNDSTUECK_MIN}
              max={GRUNDSTUECK_MAX}
              step={GRUNDSTUECK_STEP}
              format={formatM2}
              onChange={setGrundstuecksflaeche}
            />
          )}

          <PillGruppe
            label="Zustand"
            optionen={ZUSTAENDE}
            labelMap={ZUSTAND_LABEL}
            wert={zustand}
            onChange={setZustand}
          />

          <PillGruppe
            label="Stadtgröße"
            optionen={STADTGROESSEN}
            labelMap={STADTGROESSE_LABEL}
            wert={stadtgroesse}
            onChange={setStadtgroesse}
          />

          <PillGruppe
            label="Mikrolage"
            optionen={DREI_STUFEN}
            labelMap={DREI_STUFEN_LABEL}
            wert={mikrolage}
            onChange={setMikrolage}
          />
        </div>

        {/* ── Live-Ergebnis ──────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-[18px] border border-line-medium bg-akzent-wash px-6 py-6 sm:px-7 sm:py-7">
            <p className="t-small !text-ink-muted">
              Ergebnis sofort sichtbar — ohne E-Mail-Pflicht.
            </p>

            {ergebnis.ok ? (
              <div aria-live="polite">
                <p className="t-label mt-4">Ihre Verkaufswert-Spanne</p>
                <p className="mt-2 font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.02em] text-ink-cream tnum [text-wrap:balance]">
                  {formatEuro(ergebnis.wert.vonEuro)} – {formatEuro(ergebnis.wert.bisEuro)}
                </p>
                <p className="t-body mt-2">
                  Mittelwert:{" "}
                  <span className="tnum font-semibold text-ink-cream">
                    {formatEuro(ergebnis.wert.mittelwertEuro)}
                  </span>
                </p>
                <p className="t-small mt-3">{ergebnis.wert.hinweis}</p>

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
                  Rechenweg, Spanne und Annahmen als PDF-taugliche Zusammenfassung — freiwillig, für später.
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
                    <Link href="/datenschutz" className="btn-link">
                      Datenschutz
                    </Link>
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

function PillGruppe<T extends string>({
  label,
  optionen,
  labelMap,
  wert,
  onChange,
}: {
  label: string;
  optionen: readonly T[];
  labelMap: Record<T, string>;
  wert: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="t-label mb-2.5">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {optionen.map((option) => {
          const aktiv = wert === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={aktiv}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                aktiv
                  ? "border-transparent bg-akzent text-ink-cream"
                  : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
              }`}
            >
              {labelMap[option]}
            </button>
          );
        })}
      </div>
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
