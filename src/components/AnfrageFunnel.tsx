"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import stil from "./AnfrageFunnel.module.css";
import { DEFAULTS as ANFRAGE_DEFAULTS } from "@/lib/texte/seiten/anfrage";

/**
 * Vorquali-Funnel für /anfrage — das Konversionsziel der ganzen Seite
 * (GOAL). 4 Fragen qualifizieren, bevor Kontaktdaten überhaupt gefragt
 * werden — jede beantwortete Frage ist ein Mini-Commitment (Zeigarnik/
 * IKEA-Effekt: wer schon geklickt hat, tippt auch die letzten Felder
 * fertig). Einzelauswahl springt per Klick automatisch weiter, Mehrfach-
 * auswahl (Fokus) braucht einen expliziten Weiter-Klick. Die vier
 * Antworten wandern weiterhin als Fließtext ins Nachricht-Feld von POST
 * /api/booking (Vertrag siehe Route — an der Mail ändert sich nichts):
 * die Route verlangt Datum/Uhrzeit im Terminbuchungs-Format, das hier
 * keine echte Bedeutung als Wunschtermin hat, deshalb ehrlich der
 * Einreichungs-Zeitpunkt statt eines erfundenen Slots.
 *
 * R5 Leaf G8 (Codefund 1): zusätzlich zum Fließtext schickt das Payload
 * ein strukturiertes Feld `antworten: {schluessel: wert}` — dieselben
 * vier Antworten einzeln, damit /api/booking sie durchsuchbar in
 * `daten.vorquali` ablegen kann (Route validiert/kappt serverseitig).
 */

/* R11: sämtliche Anzeigetexte kommen als Studio-Key (s.anfrage.funnel.*,
   src/lib/texte/seiten/anfrage.ts) über das `texte`-Prop aus der Page
   (Server-Komponente, liest getContent()). Die Defaults hier greifen nur,
   falls ein fremder Aufrufer den Funnel ohne Prop einbindet. */
export type AnfrageFunnelTexte = {
  fortschrittVor: string;
  fortschrittMitte: string;
  zurueck: string;
  schritt1Titel: string;
  rollen: string[];
  schritt2Titel: string;
  groessen: string[];
  schritt3Titel: string;
  schritt3Hinweis: string;
  fokusse: string[];
  weiter: string;
  schritt4Titel: string;
  zeiten: string[];
  schritt5TitelSondiert: string;
  schritt5TitelStandard: string;
  schritt5TextSondiert: string;
  schritt5TextStandard: string;
  feldNameLabel: string;
  feldNamePlatzhalter: string;
  feldEmailLabel: string;
  feldEmailPlatzhalter: string;
  feldTelefonLabel: string;
  feldTelefonPlatzhalter: string;
  feldNachrichtLabel: string;
  feldNachrichtPlatzhalter: string;
  pflichtfeld: string;
  consentVor: string;
  consentLink: string;
  consentNach: string;
  fehlerName: string;
  fehlerEmail: string;
  fehlerTelefon: string;
  fehlerConsent: string;
  fehlerRateLimit: string;
  fehlerValidierung: string;
  fehlerTechnisch: string;
  absenden: string;
  absendenAktiv: string;
  erfolgTitel: string;
  erfolgVor: string;
  erfolgNach: string;
  erfolgDemoHinweis: string;
  erfolgLink: string;
};

const D = ANFRAGE_DEFAULTS;
const listeLabels = (name: string, n: number) =>
  Array.from({ length: n }, (_, i) => D[`s.anfrage.funnel.${name}.${i + 1}.label`]); // studio:ok

const ANFRAGE_FUNNEL_TEXTE_STANDARD: AnfrageFunnelTexte = {
  fortschrittVor: D["s.anfrage.funnel.fortschritt_vor"], // studio:ok
  fortschrittMitte: D["s.anfrage.funnel.fortschritt_mitte"], // studio:ok
  zurueck: D["s.anfrage.funnel.zurueck"],
  schritt1Titel: D["s.anfrage.funnel.schritt1_titel"], // studio:ok
  rollen: listeLabels("rolle", 3),
  schritt2Titel: D["s.anfrage.funnel.schritt2_titel"], // studio:ok
  groessen: listeLabels("groesse", 4),
  schritt3Titel: D["s.anfrage.funnel.schritt3_titel"], // studio:ok
  schritt3Hinweis: D["s.anfrage.funnel.schritt3_hinweis"], // studio:ok
  fokusse: listeLabels("fokus", 4),
  weiter: D["s.anfrage.funnel.weiter"],
  schritt4Titel: D["s.anfrage.funnel.schritt4_titel"], // studio:ok
  zeiten: listeLabels("zeit", 3),
  schritt5TitelSondiert: D["s.anfrage.funnel.schritt5_titel_sondiert"], // studio:ok
  schritt5TitelStandard: D["s.anfrage.funnel.schritt5_titel_standard"], // studio:ok
  schritt5TextSondiert: D["s.anfrage.funnel.schritt5_text_sondiert"], // studio:ok
  schritt5TextStandard: D["s.anfrage.funnel.schritt5_text_standard"], // studio:ok
  feldNameLabel: D["s.anfrage.funnel.feld_name_label"], // studio:ok
  feldNamePlatzhalter: D["s.anfrage.funnel.feld_name_platzhalter"], // studio:ok
  feldEmailLabel: D["s.anfrage.funnel.feld_email_label"], // studio:ok
  feldEmailPlatzhalter: D["s.anfrage.funnel.feld_email_platzhalter"], // studio:ok
  feldTelefonLabel: D["s.anfrage.funnel.feld_telefon_label"], // studio:ok
  feldTelefonPlatzhalter: D["s.anfrage.funnel.feld_telefon_platzhalter"], // studio:ok
  feldNachrichtLabel: D["s.anfrage.funnel.feld_nachricht_label"], // studio:ok
  feldNachrichtPlatzhalter: D["s.anfrage.funnel.feld_nachricht_platzhalter"], // studio:ok
  pflichtfeld: D["s.anfrage.funnel.pflichtfeld"],
  consentVor: D["s.anfrage.funnel.consent_vor"], // studio:ok
  consentLink: D["s.anfrage.funnel.consent_link"], // studio:ok
  consentNach: D["s.anfrage.funnel.consent_nach"], // studio:ok
  fehlerName: D["s.anfrage.funnel.fehler_name"], // studio:ok
  fehlerEmail: D["s.anfrage.funnel.fehler_email"], // studio:ok
  fehlerTelefon: D["s.anfrage.funnel.fehler_telefon"], // studio:ok
  fehlerConsent: D["s.anfrage.funnel.fehler_consent"], // studio:ok
  fehlerRateLimit: D["s.anfrage.funnel.fehler_rate_limit"], // studio:ok
  fehlerValidierung: D["s.anfrage.funnel.fehler_validierung"], // studio:ok
  fehlerTechnisch: D["s.anfrage.funnel.fehler_technisch"], // studio:ok
  absenden: D["s.anfrage.funnel.absenden"],
  absendenAktiv: D["s.anfrage.funnel.absenden_aktiv"], // studio:ok
  erfolgTitel: D["s.anfrage.funnel.erfolg_titel"], // studio:ok
  erfolgVor: D["s.anfrage.funnel.erfolg_vor"], // studio:ok
  erfolgNach: D["s.anfrage.funnel.erfolg_nach"], // studio:ok
  erfolgDemoHinweis: D["s.anfrage.funnel.erfolg_demo_hinweis"], // studio:ok
  erfolgLink: D["s.anfrage.funnel.erfolg_link"], // studio:ok
};

type SchrittKey = "rolle" | "groesse" | "fokus" | "zeit" | "kontakt";
const SCHRITTE: SchrittKey[] = ["rolle", "groesse", "fokus", "zeit", "kontakt"];

// Erst quittieren, dann springen (transitions-polish, 01.09): die Pause
// deckt Pillen-Pop (--duration-fast, 250ms) plus Haken-Zeichnen ab —
// der Klick wird SICHTBAR bestätigt, dadurch fühlt sich der Sprung
// schneller an, nicht langsamer. Bei Token-Änderung mitziehen.
const AUTOWEITER_PAUSE = 320;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const pad = (n: number) => String(n).padStart(2, "0");

/* `stadt`: kommt vom Stadt-Check auf /system und reist in Mail und CRM mit. */
export function AnfrageFunnel({ texte, stadt }: { texte?: Partial<AnfrageFunnelTexte>; stadt?: string }) {
  const tx = { ...ANFRAGE_FUNNEL_TEXTE_STANDARD, ...texte };
  const [index, setIndex] = useState(0);
  const [richtung, setRichtung] = useState<1 | -1>(1);

  const [rolle, setRolle] = useState<string | null>(null);
  const [groesse, setGroesse] = useState<string | null>(null);
  const [fokus, setFokus] = useState<string[]>([]);
  const [zeit, setZeit] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notiz, setNotiz] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot — bleibt bei Menschen leer
  const [consent, setConsent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ergebnis, setErgebnis] = useState<null | { demo: boolean }>(null);

  const headingId = useId();
  // "Ich sondiere noch" ist immer die dritte Zeit-Option (Index 2) —
  // Studio darf den Text ändern, nicht die Reihenfolge (siehe lesen.ts).
  const sondiert = zeit === tx.zeiten[2];

  function gehZu(ziel: number, dir: 1 | -1) {
    setRichtung(dir);
    setIndex(ziel);
    setError(null);
  }
  const weiter = () => index < SCHRITTE.length - 1 && gehZu(index + 1, 1);
  const zurueck = () => index > 0 && gehZu(index - 1, -1);

  function waehleEinzeln(setter: (v: string) => void, wert: string) {
    setter(wert);
    window.setTimeout(weiter, AUTOWEITER_PAUSE);
  }

  function toggleFokus(wert: string) {
    setFokus((prev) => (prev.includes(wert) ? prev.filter((f) => f !== wert) : [...prev, wert]));
  }

  async function absenden() {
    if (busy) return;
    if (!name.trim()) return setError(tx.fehlerName);
    if (!EMAIL_RE.test(email)) return setError(tx.fehlerEmail);
    if (!phone.trim()) return setError(tx.fehlerTelefon);
    if (!consent) return setError(tx.fehlerConsent);

    setError(null);
    setBusy(true);

    const antwortenText = [
      ...(stadt ? [`Stadt: ${stadt}`] : []),
      `Rolle: ${rolle ?? "–"}`,
      `Abschlüsse/Jahr: ${groesse ?? "–"}`,
      `Fokus: ${fokus.length ? fokus.join(", ") : "–"}`, // studio:ok
      `Zeithorizont: ${zeit ?? "–"}`,
    ].join("\n");
    const message = notiz.trim() ? `${antwortenText}\n\nNachricht:\n${notiz.trim()}` : antwortenText; // studio:ok

    // Dieselben vier Antworten zusätzlich strukturiert (Codefund 1) — die
    // Fließtext-`message` oben bleibt unverändert für die interne Mail.
    const antworten: Record<string, string> = {
      rolle: rolle ?? "",
      groesse: groesse ?? "",
      fokus: fokus.join(", "),
      zeit: zeit ?? "",
      ...(stadt ? { stadt } : {}),
    };

    const jetzt = new Date();
    const payload = {
      type: "Zusammenarbeit anfragen",
      mode: "Anfrage-Funnel",
      duration: "",
      date: `${jetzt.getFullYear()}-${pad(jetzt.getMonth() + 1)}-${pad(jetzt.getDate())}`, // studio:ok
      time: `${pad(jetzt.getHours())}:${pad(jetzt.getMinutes())}`, // studio:ok
      name,
      email,
      phone,
      message,
      antworten,
      website,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) {
        setBusy(false);
        return setError(tx.fehlerRateLimit);
      }
      if (res.status === 422) {
        setBusy(false);
        return setError(tx.fehlerValidierung);
      }
      if (!res.ok) throw new Error("request failed");
      const j = (await res.json()) as { demo?: boolean };
      setBusy(false);
      setErgebnis({ demo: Boolean(j.demo) });
    } catch {
      setBusy(false);
      setError(tx.fehlerTechnisch);
    }
  }

  const gesamt = SCHRITTE.length;
  /* Endowed Progress (Nunes & Drèze): Die ersten Klicks füllen den Balken
     überproportional, danach werden die Schritte kleiner. Wer nach dem
     ersten Tippen schon bei 38 % steht, bricht seltener ab als bei 20 %.
     Die Werte sind bewusst nicht linear und enden erst mit dem Absenden // studio:ok
     bei 100 — der letzte Schritt bleibt spürbar offen. */
  const FORTSCHRITT_KURVE = [38, 62, 78, 88, 94];
  const fortschritt = ergebnis ? 100 : (FORTSCHRITT_KURVE[index] ?? 94);

  /* Endowed-Sweep (transitions-polish, 01.09): Der Balken startet bei 0
     und fuellt sich beim ersten Rendern SICHTBAR auf die geschenkten
     38 % (laengere Sweep-Dauer via .balkenSweep) — das Geschenk kommt
     an, statt einfach dazustehen. Danach schaltet die Breite mit der
     schnellen Standard-Transition. */
  const [balkenBreite, setBalkenBreite] = useState(0);
  const [sweepAktiv, setSweepAktiv] = useState(true);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setBalkenBreite(fortschritt));
    return () => cancelAnimationFrame(raf);
  }, [fortschritt]);
  useEffect(() => {
    // Nach dem ersten Sweep zurueck auf die schnelle Transition.
    const t = window.setTimeout(() => setSweepAktiv(false), 700);
    return () => window.clearTimeout(t);
  }, []);

  /* ── Erfolg ── */
  if (ergebnis) {
    return (
      <div className="max-w-[480px]">
        <span className={stil.hakenKreis} aria-hidden>
          <svg viewBox="0 0 24 24" width={22} height={22} fill="none">
            <path
              className={stil.hakenPfad}
              d="M4.5 12.5 9.5 17.5 19.5 6.5"
              stroke="#161613"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="t-h2 mt-6">{tx.erfolgTitel}</h2>
        <p className="t-body-lg mt-4 max-w-[420px]">
          {tx.erfolgVor}{" "}
          <span className="is-cream font-medium">{email}</span>{tx.erfolgNach}
        </p>
        {ergebnis.demo && (
          <p className="t-data is-fail mt-4">{tx.erfolgDemoHinweis}</p>
        )}
        <Link
          href="/cases"
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
        >
          {tx.erfolgLink}
        </Link>
      </div>
    );
  }

  /* ── Funnel ── */
  return (
    <div className="max-w-[480px]">
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-bg-hover"
        role="progressbar"
        aria-valuenow={fortschritt}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Schritt ${index + 1} von ${gesamt}`}
      >
        <div
          className={cn(
            "h-full rounded-full bg-akzent transition-[width] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]", // studio:ok
            sweepAktiv && stil.balkenSweep,
          )}
          style={{ width: `${balkenBreite}%` }}
        />
      </div>

      <div key={index} className={cn(stil.schritt, richtung === 1 ? stil.vor : stil.zurueck)}>
        {index > 0 && (
          <button
            type="button"
            onClick={zurueck}
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-dim outline-offset-2 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream focus-visible:outline-2 focus-visible:outline-(--ring)"
          >
            <RiArrowLeftLine aria-hidden className="size-3.5" />
            {tx.zurueck}
          </button>
        )}

        <p className={cn("t-label", index > 0 ? "mt-5" : "mt-8")}>
          {tx.fortschrittVor} {index + 1} {tx.fortschrittMitte} {gesamt} ·{" "}
          {/* Prozent poppt bei jedem Fortschritt kurz auf (Number-Pop) —
              quantifizierter Endowed Progress. */}
          <span key={fortschritt} className={cn("tnum font-mono", stil.zahlPop)}>
            {fortschritt} %
          </span>
        </p>

        {/* 1 · Rolle */}
        {index === 0 && (
          <Schritt headingId={headingId} titel={tx.schritt1Titel}>
            <div className="mt-6 grid gap-3" role="group" aria-labelledby={headingId}>
              {tx.rollen.map((r) => (
                <GrossePille
                  key={r}
                  aktiv={rolle === r}
                  onClick={() => waehleEinzeln(setRolle, r)}
                >
                  {r}
                </GrossePille>
              ))}
            </div>
          </Schritt>
        )}

        {/* 2 · Größe */}
        {index === 1 && (
          <Schritt headingId={headingId} titel={tx.schritt2Titel}>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-labelledby={headingId}>
              {tx.groessen.map((g) => (
                <Pille key={g} aktiv={groesse === g} onClick={() => waehleEinzeln(setGroesse, g)}>
                  {g}
                </Pille>
              ))}
            </div>
          </Schritt>
        )}

        {/* 3 · Fokus (Mehrfachauswahl) */}
        {index === 2 && (
          <Schritt headingId={headingId} titel={tx.schritt3Titel}>
            <p className="t-small mt-2">{tx.schritt3Hinweis}</p>
            <div className="mt-6 flex flex-wrap gap-3" role="group" aria-labelledby={headingId}>
              {tx.fokusse.map((f) => (
                <Pille key={f} aktiv={fokus.includes(f)} onClick={() => toggleFokus(f)}>
                  {f}
                </Pille>
              ))}
            </div>
            <button
              type="button"
              onClick={weiter}
              disabled={fokus.length === 0}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-akzent"
            >
              {tx.weiter}
              <Pfeil />
            </button>
          </Schritt>
        )}

        {/* 4 · Zeithorizont */}
        {index === 3 && (
          <Schritt headingId={headingId} titel={tx.schritt4Titel}>
            <div className="mt-6 grid gap-3 sm:grid-cols-3" role="group" aria-labelledby={headingId}>
              {tx.zeiten.map((z) => (
                <Pille key={z} aktiv={zeit === z} onClick={() => waehleEinzeln(setZeit, z)} zentriert>
                  {z}
                </Pille>
              ))}
            </div>
          </Schritt>
        )}

        {/* 5 · Kontakt */}
        {index === 4 && (
          <Schritt
            headingId={headingId}
            titel={sondiert ? tx.schritt5TitelSondiert : tx.schritt5TitelStandard}
          >
            <p className="t-body mt-3">
              {sondiert ? tx.schritt5TextSondiert : tx.schritt5TextStandard}
            </p>

            <div className="mt-6 space-y-4">
              <Feld label={tx.feldNameLabel} htmlFor="anfrage-name" pflicht beam index={0} pflichtfeldText={tx.pflichtfeld}>
                <input
                  id="anfrage-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  placeholder={tx.feldNamePlatzhalter}
                  autoComplete="name"
                  className="booking-input ist-pflicht w-full"
                />
              </Feld>
              <Feld label={tx.feldEmailLabel} htmlFor="anfrage-email" pflicht beam index={1} pflichtfeldText={tx.pflichtfeld}>
                <input
                  id="anfrage-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  type="email"
                  placeholder={tx.feldEmailPlatzhalter}
                  autoComplete="email"
                  className="booking-input ist-pflicht w-full"
                />
              </Feld>
              <Feld label={tx.feldTelefonLabel} htmlFor="anfrage-telefon" pflicht beam index={2} pflichtfeldText={tx.pflichtfeld}>
                <input
                  id="anfrage-telefon"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  type="tel"
                  placeholder={tx.feldTelefonPlatzhalter}
                  autoComplete="tel"
                  className="booking-input ist-pflicht w-full"
                />
              </Feld>
              <Feld label={tx.feldNachrichtLabel} htmlFor="anfrage-notiz">
                <textarea
                  id="anfrage-notiz"
                  value={notiz}
                  onChange={(e) => setNotiz(e.target.value)}
                  rows={3}
                  placeholder={tx.feldNachrichtPlatzhalter}
                  className="booking-input w-full resize-none"
                />
              </Feld>

              {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus. */}
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
            </div>

            <label className="mt-5 flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setError(null);
                }}
                style={{ accentColor: "var(--akzent)" }}
                className="mt-0.5 h-4 w-4"
              />
              <span className="t-small">
                {tx.consentVor}{" "}
                <Link href="/datenschutz" className="btn-link">
                  {tx.consentLink}
                </Link>
                {tx.consentNach}
              </span>
            </label>

            {error && (
              /* key={error} startet den Shake auch, wenn nur der Text
                 wechselt — jede neue Meldung ruettelt einmal kurz. */
              <p key={error} className={cn("t-small is-fail mt-4", stil.shake)} role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={absenden}
              disabled={busy}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-akzent px-7 py-4 text-[15px] font-semibold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? tx.absendenAktiv : tx.absenden}
              {!busy && <Pfeil />}
            </button>
          </Schritt>
        )}
      </div>
    </div>
  );
}

/* ── Hilfskomponenten ── */

function Schritt({
  headingId,
  titel,
  children,
}: {
  headingId: string;
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 id={headingId} className="t-h2 mt-3 !text-[26px] sm:!text-[30px]">
        {titel}
      </h2>
      {children}
    </>
  );
}

/**
 * Feld — Label plus Eingabe. `pflicht` setzt den Gold-Punkt hinter das
 * Label; `beam` legt die laufende Kontur um den Rahmen (Schritt 5, wo
 * die Eingabe wirklich zählt). Die Kontur liegt in einem 1px-Ring um
 * das Feld, damit sie den Fokus-Ring des Inputs nicht überdeckt.
 */
function Feld({
  label,
  htmlFor,
  children,
  pflicht = false,
  beam = false,
  index = 0,
  pflichtfeldText = D["s.anfrage.funnel.pflichtfeld"],
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  pflicht?: boolean;
  beam?: boolean;
  index?: number;
  pflichtfeldText?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="t-label mb-2 flex items-center gap-2">
        {label}
        {pflicht && (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-akzent" aria-hidden />
            <span className="sr-only">{pflichtfeldText}</span>
          </>
        )}
      </label>
      {beam ? (
        <div className={stil.beamRahmen} style={{ "--i": index } as React.CSSProperties}>
          <div className={stil.beamInhalt}>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function Pfeil() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5"
      aria-hidden
    >
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Haken, der sich beim Auswaehlen nachzeichnet — die sichtbare
 *  Quittung vor dem Auto-Weiter (transitions-polish, 01.09). */
function PillenHaken() {
  return (
    <svg viewBox="0 0 14 14" width="13" height="13" fill="none" aria-hidden className="shrink-0">
      <path
        className={stil.pilleHaken}
        d="M2.5 7.5 6 11 11.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GrossePille({
  children,
  aktiv,
  onClick,
}: {
  children: React.ReactNode;
  aktiv: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      className={cn(
        "flex items-center justify-between gap-3 rounded-full border px-6 py-4 text-left text-[15.5px] font-medium leading-snug", // studio:ok
        "transition-[color,background-color,border-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]", // studio:ok
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)", // studio:ok
        "active:scale-[0.98]",
        aktiv
          ? cn("border-transparent bg-akzent text-ink-cream", stil.pilleAktiv)
          : "border-line-medium bg-white text-ink-cream hover:border-transparent hover:bg-akzent-wash" // studio:ok
      )}
    >
      <span>{children}</span>
      {aktiv && <PillenHaken />}
    </button>
  );
}

function Pille({
  children,
  aktiv,
  onClick,
  zentriert = false,
}: {
  children: React.ReactNode;
  aktiv: boolean;
  onClick: () => void;
  zentriert?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      className={cn(
        "rounded-full border px-5 py-3 text-[14px] font-medium", // studio:ok
        zentriert ? "text-center" : "text-left",
        "transition-[color,background-color,border-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]", // studio:ok
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)", // studio:ok
        "active:scale-[0.98]",
        aktiv
          ? cn("border-transparent bg-akzent text-ink-cream", stil.pilleAktiv)
          : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream" // studio:ok
      )}
    >
      {children}
    </button>
  );
}
