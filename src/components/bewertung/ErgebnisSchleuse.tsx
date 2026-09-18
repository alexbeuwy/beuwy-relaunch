"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * ErgebnisSchleuse — die Lead-Wall vor den Rechner-Ergebnissen
 * (Wunsch Alex 27.08: „Lead Wall wie die großen, wie beim Riegel-
 * Mietpreisrechner — Blur, Popup und Schloss-Unlock-Animation").
 *
 * Muster portiert aus riegel/src/components/mietwert-teaser.tsx:
 * Das fertige Ergebnis (children) liegt GEBLURRT unter der Gate-Karte
 * (Grid-Stack, beide in derselben Zelle — der Container ist so hoch
 * wie das größere Kind). Absenden legt den Lead über /api/tool-lead
 * an; danach spielt das Schloss seine Öffnungs-Animation, die Karte
 * geht weg und der Blur löst sich weich (filter-Transition).
 *
 * „Einmal freigeschaltet bleibt frei": sessionStorage-Flag über alle
 * drei Rechner hinweg — wer seine Angaben anpasst und neu rechnet,
 * ist schon Lead und tippt nichts doppelt. reduced-motion: alles
 * sofort, ohne Inszenierung.
 *
 * LEAF U6 (Wizard-Mikrotransitions) ergänzt den Erfolgs-Moment: Nach dem
 * Bügel-Aufschwung zeichnet sich kurz ein Häkchen im Schloss-Kreis
 * (motion.path/pathLength, fast + --ease-bounce — dieselbe Mechanik wie
 * der Checkbox-Tick in AufgabenClient.tsx), bevor die Karte weggeht und
 * der Blur sich löst. Fehlermeldungen shaken kurz (Token-Zeit,
 * translateX ±4px, 3 Zyklen) statt nur einzublenden — reduced-motion
 * lässt beides weg, nur die (ohnehin vorhandene) Fehlerfarbe bleibt.
 */

const FREI_KEY = "bw_tools_frei";
const EASE_SMOOTH_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_BOUNCE: [number, number, number, number] = [0.34, 1.36, 0.64, 1];

function istFrei(): boolean {
  try {
    return sessionStorage.getItem(FREI_KEY) === "1";
  } catch {
    return false;
  }
}

function merkeFrei() {
  try {
    sessionStorage.setItem(FREI_KEY, "1");
  } catch {
    /* privates Fenster o. ä. — dann gilt es eben nur für diese Ansicht */
  }
}

/**
 * Schloss mit animierbarem Bügel — der Bügel schwenkt beim Entsperren auf.
 * `haken` folgt kurz danach: das Schloss-Symbol blendet zu einem
 * gezeichneten Häkchen über (derselbe Schloss-Kreis bleibt stehen) — der
 * kurze Erfolgs-Moment, bevor die Karte in ErgebnisSchleuse verschwindet.
 */
function Schloss({ offen, haken }: { offen: boolean; haken: boolean }) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <span
      aria-hidden
      className="grid h-12 w-12 place-items-center rounded-full bg-akzent-wash"
    >
      <AnimatePresence>
        {haken ? (
          <motion.svg
            key="haken"
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            className="col-start-1 row-start-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: EASE_SMOOTH_OUT }}
          >
            <motion.path
              d="M3 7.2l2.8 2.8L11 4"
              stroke="var(--ink-cream)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_BOUNCE }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="schloss"
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            className="col-start-1 row-start-1"
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1, ease: EASE_SMOOTH_OUT } }}
          >
            {/* Bügel: dreht beim Öffnen um seinen rechten Fußpunkt nach oben auf */}
            <path
              d="M6 11V7a5 5 0 0 1 10 0v4"
              stroke="var(--ink-cream)"
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{
                transformOrigin: "16px 11px",
                transform: offen ? "rotate(-38deg) translateY(-1.5px)" : "none",
                transition:
                  "transform var(--duration-very-slow) var(--ease-bounce)",
              }}
            />
            {/* Körper */}
            <rect x="3" y="10.6" width="16" height="11.4" rx="3" fill="var(--ink-cream)" />
            <circle cx="11" cy="15.6" r="1.7" fill="var(--akzent)" />
            <path d="M11 15.6v2.8" stroke="var(--akzent)" strokeWidth="1.7" strokeLinecap="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </span>
  );
}

export function ErgebnisSchleuse({
  tool,
  eingaben,
  ergebnis,
  children,
  texte,
}: {
  /** Kennung für /api/tool-lead und das CRM. */
  tool: "verkaufspreis" | "mietpreis" | "afa";
  /** Struktur der Nutzereingaben — landet im Lead (CRM zeigt sie als Liste). */
  eingaben: object;
  /** Das berechnete Ergebnis — landet strukturiert im Lead. */
  ergebnis: object;
  /** Der fertige Ergebnis-Block, der hinter der Schleuse liegt. */
  children: React.ReactNode;
  /** Studio-Texte (tools.schleuse.*) — die Server-Seite reicht sie aus
      getContent() durch; ohne Props gelten die eingebauten Defaults. */
  texte?: { titel?: string; sub?: string; button?: string; hinweis?: string };
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [frei, setFrei] = useState(false);
  const [entsperrt, setEntsperrt] = useState(false); // Schloss offen, Karte geht
  const [haken, setHaken] = useState(false); // kurzer Erfolgs-Moment: Häkchen im Schloss-Kreis
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [consent, setConsent] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [fehlerNonce, setFehlerNonce] = useState(0); // triggert den Shake bei jeder neuen Fehlermeldung neu
  const [sendet, setSendet] = useState(false);

  /** Fehler setzen + Shake auslösen (auch bei wortgleicher Wiederholung). */
  function zeigeFehler(msg: string) {
    setFehler(msg);
    setFehlerNonce((n) => n + 1);
  }

  // Schon in dieser Sitzung freigeschaltet? Erst nach dem Mount lesen —
  // SSR kennt sessionStorage nicht, und der Server soll das Ergebnis
  // ohnehin nie unverblurrt ausliefern.
  useEffect(() => {
    if (istFrei()) {
      setFrei(true);
      setEntsperrt(true);
    }
  }, []);

  async function senden() {
    if (name.trim().length < 2) return zeigeFehler("Bitte Ihren Namen angeben.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return zeigeFehler("Bitte eine gültige E-Mail-Adresse angeben.");
    if (!consent) return zeigeFehler("Bitte der Verarbeitung Ihrer Angaben zustimmen.");
    setFehler(null);
    setSendet(true);
    try {
      const res = await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          eingaben,
          ergebnis,
          name: name.trim(),
          email: email.trim(),
          telefon: telefon.trim(),
          website: "",
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !json?.ok) {
        zeigeFehler("Senden fehlgeschlagen — bitte kurz erneut versuchen.");
        return;
      }
      merkeFrei();
      const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduziert) {
        setEntsperrt(true);
        setFrei(true);
        return;
      }
      // Inszenierung: erst schwingt der Bügel auf (Schloss-Animation, ~500ms),
      // dann ein kurzer Erfolgs-Moment — das Häkchen zeichnet sich im
      // Schloss-Kreis (s. Schloss-Komponente) —, danach verschwindet die
      // Karte und der Blur löst sich (bestehende Sequenz + ~200ms Laufzeit
      // für den Häkchen-Moment).
      setEntsperrt(true);
      setTimeout(() => setHaken(true), 460);
      setTimeout(() => setFrei(true), 820);
    } catch {
      zeigeFehler("Senden fehlgeschlagen — bitte kurz erneut versuchen.");
    } finally {
      setSendet(false);
    }
  }

  const feld =
    "w-full rounded-xl border border-line-medium bg-white px-4 py-2.5 text-[14px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] placeholder:text-ink-dim focus:border-ink-cream";

  return (
    <div className="grid">
      {/* Ergebnis — geblurrt, bis die Schleuse offen ist. Sichtbar genug,
          um „fertig" zu signalisieren, unlesbar genug, um das Gate zu
          tragen (Riegel-Muster). */}
      <div
        aria-hidden={!frei}
        className={`col-start-1 row-start-1 transition-[filter,opacity] duration-[var(--duration-very-slow)] ease-[var(--ease-smooth-out)] ${
          frei ? "" : "pointer-events-none select-none opacity-90 blur-lg"
        }`}
      >
        {children}
      </div>

      {!frei && (
        <div className="z-10 col-start-1 row-start-1 flex items-start justify-center py-3 sm:items-center">
          <div
            className={`w-full max-w-md rounded-[24px] border border-line-subtle bg-white/95 p-6 shadow-[0_18px_50px_rgba(20,20,18,0.16)] backdrop-blur-sm transition-[opacity,transform] duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)] sm:p-7 ${
              entsperrt ? "pointer-events-none -translate-y-2 opacity-0" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <Schloss offen={entsperrt} haken={haken} />
              <div>
                <p className="text-[15.5px] font-semibold text-ink-cream">
                  {texte?.titel ?? "Ihre Auswertung ist fertig."}
                </p>
                <p className="t-small mt-0.5">
                  {texte?.sub ?? "Sagen Sie uns kurz, für wen wir rechnen — das Ergebnis erscheint direkt danach."}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input
                className={feld}
                aria-label="Ihr Name"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFehler(null);
                }}
                placeholder="Ihr Name"
              />
              <input
                className={feld}
                aria-label="E-Mail"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFehler(null);
                }}
                placeholder="E-Mail"
              />
            </div>
            <input
              className={`${feld} mt-3`}
              aria-label="Telefon (optional)"
              type="tel"
              autoComplete="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="Telefon (optional)"
            />

            <label className="mt-4 flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setFehler(null);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--akzent)]"
              />
              <span>
                Ich willige ein, dass meine Angaben zur Zustellung und
                Bearbeitung der Auswertung verarbeitet werden. Jederzeit
                widerrufbar (siehe{" "}
                <Link href="/datenschutz" className="underline decoration-line-medium underline-offset-2 hover:text-ink-cream">
                  Datenschutz
                </Link>
                ).
              </span>
            </label>

            {fehler && (
              <motion.p
                key={fehlerNonce}
                role="alert"
                className="mt-3 text-[13px] font-medium text-[#c2453a]"
                initial={false}
                animate={reduceMotion ? {} : { x: [0, -4, 4, -4, 4, -4, 4, 0] }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
              >
                {fehler}
              </motion.p>
            )}

            <button
              type="button"
              onClick={senden}
              disabled={sendet || entsperrt}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:opacity-60"
            >
              {sendet ? "Wird gesendet …" : entsperrt ? "Entsperrt" : (texte?.button ?? "Ergebnis freischalten")}
            </button>
            <p className="t-small mt-3 text-center !text-[11.5px]">
              {texte?.hinweis ?? "Keine Werbung, kein Anruf ohne Anlass — Ihre Auswertung, sonst nichts."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
