"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "motion/react";
import { ArrowLeft, Building2, MailCheck, Target, TicketCheck, User, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Client-Teil von /konto (R3 Leaf B9, Onboarding-Umbau R3). Ein Bauteil
 * für beide Zustände: ohne Sitzung ein 5-Schritt-Onboarding mit Intent
 * (Rolle → Intent → Größe/Stadt → Firma/Name → E-Mail-Code, Muster wie
 * der endowed-progress-Wizard in AnfrageFunnel.tsx), mit Sitzung das
 * Dashboard (Stepper, "Ihr Fokus"-Karte, Termin-Karte, Wochenbericht-
 * Karte, Ticket-Liste + Formular). Server-Daten kommen als Props aus
 * page.tsx (dieselbe Aufteilung wie StudioPage/StudioEditor); Formulare
 * sprechen ausschließlich mit /api/konto.
 *
 * Wer den vollen Wizard durchläuft, landet nach erfolgreicher Code-
 * Einlösung direkt im Dashboard — ohne Reload, mit den gerade erst
 * eingegebenen Antworten als lokalem State (der Server bekommt sie über
 * aktion "onboarding" trotzdem dauerhaft gespeichert). Wer "Ich habe
 * schon ein Konto" wählt, überspringt S1–S4 und bekommt nach der
 * Einlösung einen echten Reload, damit page.tsx die tatsächlichen
 * Kontodaten aus Supabase lädt statt erfundener Platzhalter.
 *
 * LEAF U5 (Alex, 27.08 — Einblick- und Konto-UX): Schrittwechsel laufen
 * jetzt über motion AnimatePresence statt der früheren reinen CSS-
 * Keyframe-Animation aus KontoBereich.module.css (die Datei bleibt
 * unangetastet liegen, ist aber ab hier ungenutzt — außerhalb der für
 * dieses Leaf erlaubten Dateiliste). Rollen-/Intent-/Team-Karten haben
 * einen Hover-Lift + einen kurzen Auswahl-Pop; die Code-Eingabe ist
 * sechs Einzelfelder mit Auto-Advance statt einem Textfeld, mit
 * Fehler-Shake über die Motion-Token-Skala und einem Häkchen, das sich
 * mit --ease-bounce zeichnet, bevor das Dashboard erscheint. Dashboard-
 * Karten treten mit 40ms-Stagger an (--duration-stagger). Icons
 * durchgängig lucide-react (die selbst gezeichnete Pfeil-Glyphe im
 * "Weiter"/CTA-Button bleibt unangetastet — sie teilt sich die Form mit
 * den Marketing-Site-CTAs, siehe Nutzungsregeln).
 */

export type KontoTicket = {
  id: number;
  erstellt: string;
  titel: string;
  status: string;
  detail: string;
};

export type KontoDaten = {
  name: string;
  firma: string;
  projektStatus: string;
  tickets: KontoTicket[];
};

/** Eine Antwort im Ticket-Thread (R5 Leaf G7 — additiv). Deckt sich mit
 *  dem Rückgabetyp von ticketAntworten() in src/lib/crm/db.ts. */
export type KontoTicketAntwort = {
  id: number;
  erstellt: string;
  von: "beuwy" | "kunde";
  text: string;
};

/** Antworten aus dem Onboarding-Wizard — nur lokal, für die "Ihr Fokus"-Karte direkt nach dem Onboarding. */
type FokusAntworten = {
  rolle: string;
  intent: string[];
  team: string;
  stadt: string;
};

type OnboardingErgebnis = {
  email: string;
  konto: KontoDaten;
  fokus: FokusAntworten;
};

const STUFEN = [
  { key: "aufnahme", label: "Aufnahme" },
  { key: "design", label: "Design" },
  { key: "umsetzung", label: "Umsetzung" },
  { key: "livegang", label: "Livegang" },
  { key: "betrieb", label: "Betrieb" },
] as const;

const TICKET_STATUS_LABEL: Record<string, string> = {
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
  erledigt: "Erledigt",
  // R5 Leaf G7 (additiv): /intern/tickets schreibt Status im
  // Schema-Vokabular (offen/in-arbeit/erledigt) statt im älteren
  // Frontend-Vokabular oben — beide Sätze hier zusammengeführt, damit
  // dieselbe Karte beide Quellen lesbar anzeigt (siehe R5-FUNKTIONEN.md
  // Modul 7 zum dokumentierten Mismatch; eine echte Vereinheitlichung
  // bleibt späteren Leafs vorbehalten, diese Datei darf nur additiv
  // verändert werden).
  offen: "Neu",
  "in-arbeit": "In Bearbeitung",
};

const ROLLEN = ["Makler", "Projektentwickler", "Bauträger", "Kapitalanlage-Vertrieb"] as const;

const INTENTS = [
  "Mehr Eigentümer-Anfragen",
  "Marke aufwerten",
  "Abläufe automatisieren",
  "Sichtbar werden bei Google & KI",
] as const;

const TEAMGROESSEN = ["allein", "2–5", "6–15", "16+"] as const;

const ONBOARD_SCHRITTE = ["rolle", "intent", "groesse", "firma", "zugang"] as const;
const LETZTER_SCHRITT = ONBOARD_SCHRITTE.length - 1;

// Mirrort --duration-quick (150ms) aus globals.css: kurze Pause, damit die
// Auswahl sichtbar aufleuchtet, bevor der Schritt weiterspringt — bei
// Änderung des Tokens bitte hier mitziehen. (Gleicher Wert wie AnfrageFunnel.)
const AUTOWEITER_PAUSE = 150;

/* Endowed Progress (Nunes & Drèze): Die ersten Klicks füllen den Balken
   überproportional, danach werden die Schritte kleiner — wer nach dem
   ersten Tippen schon bei 38 % steht, bricht seltener ab als bei 20 %.
   Dieselbe Kurve wie im AnfrageFunnel (auch dort 5 Schritte). */
const FORTSCHRITT_KURVE = [38, 62, 78, 88, 94];

/* Motion-Tokens aus globals.css als Sekundenwert-Arrays für motion/react
   (siehe Dateikopf, LEAF U5). EASE_BOUNCE nur für Erfolgsmomente. */
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_BOUNCE = [0.34, 1.36, 0.64, 1] as const;

/** Empfohlener nächster Schritt aus Rolle + Intent, für die "Ihr Fokus"-Karte im Dashboard. */
function empfehlung(fokus: FokusAntworten): { href: string; label: string; intro: string } {
  if (fokus.rolle === "Makler" && fokus.intent.includes("Mehr Eigentümer-Anfragen")) {
    return {
      href: "/tools/verkaufspreisrechner",
      label: "Verkaufspreisrechner als Demo ansehen",
      intro:
        "Mehr Eigentümer-Anfragen entstehen am schnellsten über ein Tool, das Eigentümer selbst nutzen wollen — so sieht es bei Ihnen live aus.",
    };
  }
  if (fokus.intent.includes("Sichtbar werden bei Google & KI")) {
    return {
      href: "/geo-fuer-immobilienmakler",
      label: "Sichtbarkeit bei Google & KI aufbauen",
      intro: "Damit Sie bei Google und in KI-Antworten überhaupt auftauchen, fängt es hier an.",
    };
  }
  return {
    href: "/termin",
    label: "Termin vereinbaren",
    intro: "Der schnellste nächste Schritt ist ein kurzes, unverbindliches Gespräch.",
  };
}

type ApiAntwort = { ok?: boolean; error?: string; demo?: boolean; demoCode?: string };

async function anKonto(body: Record<string, unknown>): Promise<{ ok: boolean; daten: ApiAntwort | null }> {
  try {
    const res = await fetch("/api/konto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const daten = (await res.json().catch(() => null)) as ApiAntwort | null;
    return { ok: res.ok, daten };
  } catch {
    return { ok: false, daten: null };
  }
}

export function KontoBereich({
  authed,
  email,
  konto,
  demoDaten = false,
}: {
  authed: boolean;
  email?: string;
  konto?: KontoDaten;
  demoDaten?: boolean;
}) {
  const [lokal, setLokal] = useState<OnboardingErgebnis | null>(null);

  if (authed && email && konto) {
    return <Dashboard email={email} konto={konto} demoDaten={demoDaten} />;
  }
  if (lokal) {
    return <Dashboard email={lokal.email} konto={lokal.konto} demoDaten={false} fokus={lokal.fokus} />;
  }
  return <Onboarding onFertig={setLokal} />;
}

/* ── Onboarding-Wizard (ersetzt die frühere zweistufige LoginKarte) ── */

function Onboarding({ onFertig }: { onFertig: (ergebnis: OnboardingErgebnis) => void }) {
  const reduceMotion = useReducedMotion() ?? false;
  const shakeControls = useAnimationControls();

  const [index, setIndex] = useState(0);
  const [richtung, setRichtung] = useState<1 | -1>(1);

  const [rolle, setRolle] = useState<string | null>(null);
  const [intent, setIntent] = useState<string[]>([]);
  const [team, setTeam] = useState<string | null>(null);
  const [stadt, setStadt] = useState("");
  const [firma, setFirma] = useState("");
  const [nameWert, setNameWert] = useState("");
  const [schonKonto, setSchonKonto] = useState(false);

  const [codeSchritt, setCodeSchritt] = useState<"email" | "code">("email");
  const [emailWert, setEmailWert] = useState("");
  const [codeZiffern, setCodeZiffern] = useState<string[]>(["", "", "", "", "", ""]);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [eingeloest, setEingeloest] = useState(false);

  const [busy, setBusy] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const headingId = useId();
  const hatOnboardingDaten = rolle !== null && !schonKonto;

  function gehZu(ziel: number, dir: 1 | -1) {
    setRichtung(dir);
    setIndex(ziel);
    setFehler(null);
  }
  const weiter = () => index < LETZTER_SCHRITT && gehZu(index + 1, 1);
  function zurueck() {
    if (index === LETZTER_SCHRITT) {
      if (codeSchritt === "code") {
        setCodeSchritt("email");
        setCodeZiffern(["", "", "", "", "", ""]);
        setFehler(null);
        return;
      }
      if (schonKonto) {
        setSchonKonto(false);
        gehZu(0, -1);
        return;
      }
    }
    if (index > 0) gehZu(index - 1, -1);
  }

  function waehleRolle(wert: string) {
    setRolle(wert);
    window.setTimeout(weiter, AUTOWEITER_PAUSE);
  }

  function toggleIntent(wert: string) {
    setIntent((prev) => (prev.includes(wert) ? prev.filter((f) => f !== wert) : [...prev, wert]));
  }

  function schonKontoKlick() {
    setSchonKonto(true);
    setRichtung(1);
    setIndex(LETZTER_SCHRITT);
    setFehler(null);
  }

  function weiterMitFormular(e: FormEvent, gueltig: boolean) {
    e.preventDefault();
    if (gueltig) weiter();
  }

  async function codeAnfordern(e: FormEvent) {
    e.preventDefault();
    if (busy || !emailWert.trim()) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "code", email: emailWert.trim() });
    setBusy(false);
    if (ok && daten?.ok) {
      setDemoCode(daten.demoCode ?? null);
      setCodeSchritt("code");
      return;
    }
    setFehler(daten?.error || "Der Code konnte nicht verschickt werden — bitte erneut versuchen.");
  }

  async function einloesen(e: FormEvent) {
    e.preventDefault();
    if (busy || !codeZiffern.every(Boolean)) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "einloesen", email: emailWert.trim(), code: codeZiffern.join("") });
    setBusy(false);
    if (!(ok && daten?.ok)) {
      setFehler(daten?.error || "Der Code ist ungültig oder abgelaufen.");
      void shakeControls.start({
        x: reduceMotion ? 0 : [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: reduceMotion ? 0 : 0.4, ease: EASE_SMOOTH },
      });
      return;
    }
    // Häkchen zuerst zeichnen lassen (--ease-bounce) — das Dashboard
    // erscheint erst in dessen onAnimationComplete (nachErfolg unten).
    setEingeloest(true);
  }

  async function nachErfolg() {
    if (!hatOnboardingDaten) {
      // Bestehendes Konto oder übersprungener Flow: voller Reload, damit
      // der Server die echten Kontodaten aus Supabase lädt.
      window.location.reload();
      return;
    }
    const email = emailWert.trim();
    const fokus: FokusAntworten = { rolle: rolle!, intent, team: team ?? "", stadt: stadt.trim() };
    await anKonto({
      aktion: "onboarding",
      email,
      rolle: rolle!,
      intent,
      team: team ?? "",
      stadt: stadt.trim(),
      firma: firma.trim(),
      name: nameWert.trim(),
    });
    onFertig({
      email,
      konto: {
        name: nameWert.trim() || email.split("@")[0],
        firma: firma.trim(),
        projektStatus: "aufnahme",
        tickets: [],
      },
      fokus,
    });
  }

  const gesamt = ONBOARD_SCHRITTE.length;
  const fortschritt = FORTSCHRITT_KURVE[index] ?? 94;

  /* Enter x+8/fade 0.25s, Exit x-8/fade 0.15s (Schließen ~40% schneller
     als Öffnen) — bei reduzierter Bewegung nur Opacity, kein x-Shift.
     `custom` sitzt auf AnimatePresence UND dem motion.div: die
     austretende Karte behält sonst die Richtung ihres EIGENEN letzten
     Renders statt der aktuellen Navigation. */
  const schrittVarianten = {
    enter: (dir: 1 | -1) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * 8 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE_SMOOTH } },
    exit: (dir: 1 | -1) =>
      reduceMotion
        ? { opacity: 0, transition: { duration: 0.15, ease: EASE_SMOOTH } }
        : { opacity: 0, x: dir * -8, transition: { duration: 0.15, ease: EASE_SMOOTH } },
  };

  return (
    <div className="mx-auto max-w-[480px] px-6 pt-32 pb-32">
      <p className="t-label">Ihr Konto</p>

      <div
        className="mt-6 h-1 w-full overflow-hidden rounded-full bg-bg-hover"
        role="progressbar"
        aria-valuenow={fortschritt}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Schritt ${index + 1} von ${gesamt}`}
      >
        <div
          className="h-full rounded-full bg-akzent transition-[width] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]"
          style={{ width: `${fortschritt}%` }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false} custom={richtung}>
        <motion.div
          key={index}
          custom={richtung}
          variants={schrittVarianten}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {index > 0 && (
            <button
              type="button"
              onClick={zurueck}
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-dim outline-offset-2 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream focus-visible:outline-2 focus-visible:outline-(--ring)"
            >
              <ArrowLeft aria-hidden size={16} />
              Zurück
            </button>
          )}

          <p className={cn("t-label", index > 0 ? "mt-5" : "mt-8")}>
            Schritt {index + 1} von {gesamt}
          </p>

          {/* 1 · Rolle */}
          {index === 0 && (
            <Schritt headingId={headingId} titel="Was beschreibt Sie am besten?" icon={User}>
              <div className="mt-6 grid gap-3" role="group" aria-labelledby={headingId}>
                {ROLLEN.map((r) => (
                  <GrossePille key={r} aktiv={rolle === r} onClick={() => waehleRolle(r)} reduceMotion={reduceMotion}>
                    {r}
                  </GrossePille>
                ))}
              </div>
            </Schritt>
          )}

          {/* 2 · Intent (Mehrfachauswahl) */}
          {index === 1 && (
            <Schritt headingId={headingId} titel="Was soll sich zuerst ändern?" icon={Target}>
              <p className="t-small mt-2">Mehrfachauswahl möglich.</p>
              <div className="mt-6 flex flex-wrap gap-3" role="group" aria-labelledby={headingId}>
                {INTENTS.map((i) => (
                  <Pille key={i} aktiv={intent.includes(i)} onClick={() => toggleIntent(i)} reduceMotion={reduceMotion}>
                    {i}
                  </Pille>
                ))}
              </div>
              <WeiterButton onClick={weiter} disabled={intent.length === 0} />
            </Schritt>
          )}

          {/* 3 · Größe & Stadt */}
          {index === 2 && (
            <Schritt headingId={headingId} titel="Wie groß ist Ihr Team?" icon={Users}>
              <form
                onSubmit={(e) => weiterMitFormular(e, team !== null && stadt.trim().length >= 2)}
                noValidate
              >
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-labelledby={headingId}>
                  {TEAMGROESSEN.map((g) => (
                    <Pille key={g} aktiv={team === g} onClick={() => setTeam(g)} zentriert reduceMotion={reduceMotion}>
                      {g}
                    </Pille>
                  ))}
                </div>
                <label htmlFor="ob-stadt" className="t-label mt-6 block">
                  In welcher Stadt sind Sie aktiv?
                </label>
                <input
                  id="ob-stadt"
                  value={stadt}
                  onChange={(e) => {
                    setStadt(e.target.value);
                    setFehler(null);
                  }}
                  autoFocus
                  placeholder="z. B. Mannheim"
                  className="booking-input mt-3 w-full"
                />
                <WeiterButton disabled={team === null || stadt.trim().length < 2} />
              </form>
            </Schritt>
          )}

          {/* 4 · Firma & Name */}
          {index === 3 && (
            <Schritt headingId={headingId} titel="Für wen richten wir das ein?" icon={Building2}>
              <form
                onSubmit={(e) => weiterMitFormular(e, firma.trim().length >= 2 && nameWert.trim().length >= 2)}
                noValidate
              >
                <label htmlFor="ob-firma" className="t-label mt-6 block">
                  Firma
                </label>
                <input
                  id="ob-firma"
                  value={firma}
                  onChange={(e) => {
                    setFirma(e.target.value);
                    setFehler(null);
                  }}
                  autoFocus
                  autoComplete="organization"
                  placeholder="Name Ihres Maklerhauses"
                  className="booking-input mt-3 w-full"
                />
                <label htmlFor="ob-name" className="t-label mt-5 block">
                  Ihr Name
                </label>
                <input
                  id="ob-name"
                  value={nameWert}
                  onChange={(e) => {
                    setNameWert(e.target.value);
                    setFehler(null);
                  }}
                  autoComplete="name"
                  placeholder="Vor- und Nachname"
                  className="booking-input mt-3 w-full"
                />
                <WeiterButton disabled={firma.trim().length < 2 || nameWert.trim().length < 2} />
              </form>
            </Schritt>
          )}

          {/* 5 · Zugang */}
          {index === 4 && (
            <Schritt
              headingId={headingId}
              titel={
                eingeloest
                  ? "Zugang bestätigt"
                  : schonKonto
                    ? "Anmelden"
                    : codeSchritt === "email"
                      ? "Wohin schicken wir den Zugang?"
                      : "Code eingeben"
              }
              icon={eingeloest || schonKonto ? undefined : MailCheck}
            >
              {eingeloest ? (
                <div className="mt-8 flex flex-col items-center py-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-akzent-wash text-ink-cream">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE_BOUNCE }}
                        onAnimationComplete={() => {
                          void nachErfolg();
                        }}
                      />
                    </svg>
                  </span>
                  <p className="t-body mt-4">Einen Moment, wir öffnen Ihr Konto …</p>
                </div>
              ) : codeSchritt === "email" ? (
                <form onSubmit={codeAnfordern} noValidate>
                  <p className="t-body mt-3">
                    Ein Code per E-Mail genügt — kein Passwort zum Merken, jederzeit abbestellbar.
                  </p>
                  <label htmlFor="ob-email" className="t-label mt-6 block">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="ob-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={emailWert}
                    onChange={(e) => {
                      setEmailWert(e.target.value);
                      setFehler(null);
                    }}
                    className="booking-input mt-3 w-full"
                    placeholder="name@firma.de"
                  />
                  {fehler && (
                    <p className="t-small is-fail mt-3" role="alert">
                      {fehler}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={busy || !emailWert.trim()}
                    className="btn-primary mt-6 w-full justify-center disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <span>{busy ? "Einen Moment …" : "Code anfordern"}</span>
                    <span aria-hidden>→</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={einloesen} noValidate>
                  <p className="t-small mt-3 flex items-center gap-1.5">
                    <MailCheck aria-hidden size={14} className="shrink-0 text-ink-dim" />
                    Code verschickt an <span className="is-cream">{emailWert.trim()}</span>. Er ist 15 Minuten gültig.
                  </p>
                  {demoCode && (
                    <p className="t-small mt-3 rounded-lg bg-akzent-wash px-3 py-2.5">
                      Demo-Modus: Auf diesem Deployment ist kein E-Mail-Versand konfiguriert. Ihr Code lautet{" "}
                      <span className="tnum font-semibold">{demoCode}</span>.
                    </p>
                  )}
                  <p id={`${headingId}-code`} className="t-label mt-5 block">
                    Code
                  </p>
                  <CodeFelder
                    ziffern={codeZiffern}
                    onChange={setCodeZiffern}
                    disabled={busy}
                    labelledBy={`${headingId}-code`}
                    shakeControls={shakeControls}
                  />
                  {fehler && (
                    <p className="t-small is-fail mt-3" role="alert">
                      {fehler}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={busy || !codeZiffern.every(Boolean)}
                    className="btn-primary mt-6 w-full justify-center disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <span>{busy ? "Einen Moment …" : "Anmelden"}</span>
                    <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </Schritt>
          )}

          {index < LETZTER_SCHRITT && (
            <button
              type="button"
              onClick={schonKontoKlick}
              className="t-small mt-6 block underline underline-offset-4"
            >
              Ich habe schon ein Konto
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stiller Hinweis für Betreiber (R2 — Auth-UX): dieses Kunden-Login
          ist per Magic-Code, kein Ort für Studio/CRM-Passwörter. Bewusst
          unauffällig — kleine, gedämpfte Zeile ohne Betonung, keine eigene
          Karte. */}
      <p className="t-small mt-8">
        Team-Zugang (Studio/CRM) →{" "}
        <Link href="/login" className="underline underline-offset-4">
          /login
        </Link>
      </p>
    </div>
  );
}

function Dashboard({
  email,
  konto,
  demoDaten,
  fokus,
}: {
  email: string;
  konto: KontoDaten;
  demoDaten: boolean;
  fokus?: FokusAntworten;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [tickets, setTickets] = useState<KontoTicket[]>(konto.tickets);
  const [titel, setTitel] = useState("");
  const [detailText, setDetailText] = useState("");
  const [busy, setBusy] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [erfolg, setErfolg] = useState(false);
  const [abmeldenBusy, setAbmeldenBusy] = useState(false);

  const gefundenerIndex = STUFEN.findIndex((s) => s.key === konto.projektStatus);
  const aktuellerIndex = gefundenerIndex >= 0 ? gefundenerIndex : 0;
  const begruessung = konto.name || email.split("@")[0];
  const empf = fokus ? empfehlung(fokus) : null;

  async function abmelden() {
    if (abmeldenBusy) return;
    setAbmeldenBusy(true);
    await anKonto({ aktion: "abmelden" });
    window.location.reload();
  }

  async function ticketEinreichen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sauber = titel.trim();
    if (busy || sauber.length < 3) return;
    setBusy(true);
    setFehler(null);
    setErfolg(false);
    const { ok, daten } = await anKonto({ aktion: "ticket", titel: sauber, detail: detailText.trim() });
    setBusy(false);
    if (ok && daten?.ok) {
      setTickets((prev) => [
        {
          id: prev.length ? Math.min(...prev.map((t) => t.id)) - 1 : -1,
          erstellt: new Date().toISOString(),
          titel: sauber,
          status: "neu",
          detail: detailText.trim(),
        },
        ...prev,
      ]);
      setTitel("");
      setDetailText("");
      setErfolg(true);
      return;
    }
    setFehler(daten?.error || "Das Anliegen konnte nicht übermittelt werden — bitte erneut versuchen.");
  }

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-32 pb-24 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="t-label">Ihr Konto</p>
          <h1 className="t-h2 mt-4">Hallo, {begruessung}.</h1>
        </div>
        <button
          type="button"
          onClick={abmelden}
          disabled={abmeldenBusy}
          className="t-small underline underline-offset-4 disabled:opacity-40"
        >
          Abmelden
        </button>
      </div>

      {demoDaten && (
        <p className="t-small mt-6 rounded-lg bg-akzent-wash px-4 py-3">
          Demo-Modus: Für dieses Deployment ist keine Datenbank verbunden. Projektstatus und Anliegen sind
          Beispielwerte und bleiben nur für diese Sitzung sichtbar.
        </p>
      )}

      {fokus && empf && (
        <KartenStagger index={0} reduceMotion={reduceMotion}>
          <section className="panel mt-8 rounded-2xl p-6 sm:p-8">
            <p className="t-label flex items-center gap-1.5">
              <Target aria-hidden size={14} />
              Ihr Fokus
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {fokus.intent.map((i) => (
                <span
                  key={i}
                  className="rounded-full bg-akzent-wash px-3 py-1.5 text-[13px] font-medium text-ink-cream"
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="t-body mt-4 max-w-[520px]">{empf.intro}</p>
            <Link href={empf.href} className="btn-primary mt-5">
              <span>{empf.label}</span>
              <span aria-hidden>→</span>
            </Link>
          </section>
        </KartenStagger>
      )}

      <KartenStagger index={1} reduceMotion={reduceMotion}>
        <section className="panel mt-8 rounded-2xl p-6 sm:p-8">
          <p className="t-label">Projekt-Status</p>
          <div className="mt-6 flex flex-wrap gap-x-2 gap-y-5 sm:flex-nowrap">
            {STUFEN.map((stufe, i) => {
              const erreicht = i <= aktuellerIndex;
              const aktiv = i === aktuellerIndex;
              return (
                <div key={stufe.key} className="flex min-w-[5.5rem] flex-1 flex-col items-start gap-2">
                  <span className={`h-1.5 w-full rounded-full ${erreicht ? "bg-akzent" : "bg-line-medium"}`} />
                  <span className={`t-small ${aktiv ? "is-cream font-semibold" : ""}`}>{stufe.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      </KartenStagger>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <KartenStagger index={2} reduceMotion={reduceMotion}>
          <Link
            href="/termin"
            className="panel block rounded-2xl p-6 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-bg-hover"
          >
            <p className="t-label">Ihr nächster Termin</p>
            <p className="t-h3 mt-3">Termin vereinbaren</p>
            <p className="t-body mt-2">Freien Slot wählen — die Bestätigung geht automatisch raus.</p>
            <span className="t-small mt-4 inline-block underline underline-offset-4">Zur Terminbuchung →</span>
          </Link>
        </KartenStagger>
        <KartenStagger index={3} reduceMotion={reduceMotion}>
          <div className="panel rounded-2xl p-6">
            <p className="t-label">Wochenbericht</p>
            <p className="t-h3 mt-3">Jeden Montag per Mail</p>
            <p className="t-body mt-2">
              Anfragen, Termine, Abschlüsse und die Änderung für die Woche danach — ohne dass Sie etwas abrufen
              müssen.
            </p>
          </div>
        </KartenStagger>
      </div>

      <KartenStagger index={4} reduceMotion={reduceMotion}>
        <section className="mt-10">
          <p className="t-label flex items-center gap-1.5">
            <TicketCheck aria-hidden size={14} />
            Ihre Anliegen
          </p>
          <div className="mt-4 space-y-3">
            {tickets.length === 0 && <p className="t-body">Noch keine Anliegen eingereicht.</p>}
            {tickets.map((ticket) => (
              <div key={ticket.id} className="panel rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="t-h3 !text-[15px]">{ticket.titel}</p>
                    {ticket.detail && <p className="t-small mt-1">{ticket.detail}</p>}
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-line-subtle bg-bg-elevated px-3 py-1 text-[12px] font-medium text-ink-cream">
                    {TICKET_STATUS_LABEL[ticket.status] ?? ticket.status}
                  </span>
                </div>
                {/* R5 Leaf G7 (additiv): Antwort-Thread + Kunden-Antwortfeld */}
                <TicketThread ticketId={ticket.id} demoDaten={demoDaten} />
              </div>
            ))}
          </div>

          <form onSubmit={ticketEinreichen} className="panel mt-6 rounded-2xl p-6 sm:p-8" noValidate>
            <p className="t-label">Anliegen einreichen</p>
            <label htmlFor="ticket-titel" className="t-small mt-4 block">
              Titel
            </label>
            <input
              id="ticket-titel"
              value={titel}
              onChange={(e) => {
                setTitel(e.target.value);
                setFehler(null);
                setErfolg(false);
              }}
              className="booking-input mt-2 w-full"
              placeholder="Kurz zusammengefasst"
            />
            <label htmlFor="ticket-detail" className="t-small mt-4 block">
              Details (optional)
            </label>
            <textarea
              id="ticket-detail"
              value={detailText}
              onChange={(e) => setDetailText(e.target.value)}
              rows={3}
              className="booking-input mt-2 w-full resize-none"
              placeholder="Was genau geändert oder geprüft werden soll"
            />
            {fehler && (
              <p className="t-small is-fail mt-3" role="alert">
                {fehler}
              </p>
            )}
            {erfolg && (
              <p className="t-small is-cream mt-3" role="status">
                Anliegen übermittelt — Sie hören sich in Kürze von uns.
              </p>
            )}
            <button
              type="submit"
              disabled={busy || titel.trim().length < 3}
              className="btn-primary mt-5 justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>{busy ? "Einen Moment …" : "Absenden"}</span>
              <span aria-hidden>→</span>
            </button>
          </form>
        </section>
      </KartenStagger>
    </div>
  );
}

/* ── Ticket-Thread (R5 Leaf G7, additiv) ──────────────────────────────
   Lädt den Antwortverlauf eines Tickets client-seitig nach (page.tsx liegt
   außerhalb der für dieses Leaf erlaubten Dateiliste, kann die Antworten
   also nicht als Server-Prop mitliefern) über den additiven GET-Handler
   in src/app/api/konto/route.ts, und reicht neue Kunden-Antworten über die
   ebenfalls additive Aktion "ticket-antwort" desselben POST-Handlers ein.
   Optimistisch angelegte Tickets (negative, nicht-persistente IDs, siehe
   ticketEinreichen oben) laden keinen Verlauf — es gibt serverseitig noch
   nichts zu ihnen. Ohne Datenbank (demoDaten) wird ebenfalls nichts
   nachgeladen, der Verlauf bleibt leer, die Antwort lokal/optimistisch. */
function TicketThread({ ticketId, demoDaten }: { ticketId: number; demoDaten: boolean }) {
  const [antworten, setAntworten] = useState<KontoTicketAntwort[]>([]);
  const [geladen, setGeladen] = useState(demoDaten || ticketId <= 0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  useEffect(() => {
    if (demoDaten || ticketId <= 0) return;
    let aktiv = true;
    fetch(`/api/konto?ticket=${ticketId}`)
      .then((res) => res.json())
      .then((daten: { ok?: boolean; antworten?: KontoTicketAntwort[] }) => {
        if (aktiv && daten?.ok) setAntworten(daten.antworten ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (aktiv) setGeladen(true);
      });
    return () => {
      aktiv = false;
    };
  }, [ticketId, demoDaten]);

  async function antwortSenden(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sauber = text.trim();
    if (busy || sauber.length < 1) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "ticket-antwort", ticketId, text: sauber });
    setBusy(false);
    if (ok && daten?.ok) {
      setAntworten((prev) => [
        ...prev,
        {
          id: prev.length ? Math.min(...prev.map((a) => a.id)) - 1 : -1,
          erstellt: new Date().toISOString(),
          von: "kunde",
          text: sauber,
        },
      ]);
      setText("");
      return;
    }
    setFehler(daten?.error || "Die Nachricht konnte nicht gesendet werden — bitte erneut versuchen.");
  }

  return (
    <div className="mt-4 border-t border-line-subtle pt-4">
      {!geladen ? (
        <p className="t-small">Lädt Nachrichten …</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {antworten.length === 0 && <p className="t-small">Noch keine Antwort von uns.</p>}
          {antworten.map((a) => (
            <div key={a.id} className={cn("flex", a.von === "beuwy" ? "justify-start" : "justify-end")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3.5 py-2.5",
                  a.von === "beuwy" ? "bg-akzent-wash" : "border border-line-medium bg-white",
                )}
              >
                {a.von === "beuwy" && (
                  <span className="mb-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-akzent-hover" aria-hidden />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-muted">beuwy</span>
                  </span>
                )}
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink-cream">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={antwortSenden} className="mt-3 flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setFehler(null);
          }}
          rows={1}
          placeholder="Antworten …"
          className="booking-input w-full resize-none"
        />
        <button
          type="submit"
          disabled={busy || text.trim().length < 1}
          className="shrink-0 rounded-full bg-akzent px-4 py-2.5 text-[13px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:pointer-events-none disabled:opacity-40"
        >
          Senden
        </button>
      </form>
      {fehler && (
        <p className="t-small is-fail mt-2" role="alert">
          {fehler}
        </p>
      )}
    </div>
  );
}

/* ── Hilfskomponenten (Wizard) ── */

function Schritt({
  headingId,
  titel,
  icon: Icon,
  children,
}: {
  headingId: string;
  titel: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <>
      {Icon && (
        <span
          className="mt-6 grid h-11 w-11 place-items-center rounded-full bg-akzent-wash text-ink-cream"
          aria-hidden
        >
          <Icon size={20} strokeWidth={1.75} />
        </span>
      )}
      <h2 id={headingId} className={cn("t-h2 !text-[26px] sm:!text-[30px]", Icon ? "mt-4" : "mt-3")}>
        {titel}
      </h2>
      {children}
    </>
  );
}

function WeiterButton({ onClick, disabled }: { onClick?: () => void; disabled: boolean }) {
  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      disabled={disabled}
      className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-akzent"
    >
      Weiter
      <Pfeil />
    </button>
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

function GrossePille({
  children,
  aktiv,
  onClick,
  reduceMotion,
}: {
  children: React.ReactNode;
  aktiv: boolean;
  onClick: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.15, ease: EASE_SMOOTH } }}
      whileTap={reduceMotion ? undefined : { scale: 0.98, transition: { duration: 0.1, ease: EASE_SMOOTH } }}
      animate={reduceMotion ? undefined : { scale: aktiv ? [1, 1.04, 1] : 1 }}
      transition={{ duration: 0.25, ease: EASE_BOUNCE }}
      className={cn(
        "rounded-full border px-6 py-4 text-left text-[15.5px] font-medium leading-snug",
        "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)",
        aktiv
          ? "border-transparent bg-akzent text-ink-cream"
          : "border-line-medium bg-white text-ink-cream hover:border-transparent hover:bg-akzent-wash"
      )}
    >
      {children}
    </motion.button>
  );
}

function Pille({
  children,
  aktiv,
  onClick,
  zentriert = false,
  reduceMotion,
}: {
  children: React.ReactNode;
  aktiv: boolean;
  onClick: () => void;
  zentriert?: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.15, ease: EASE_SMOOTH } }}
      whileTap={reduceMotion ? undefined : { scale: 0.97, transition: { duration: 0.1, ease: EASE_SMOOTH } }}
      animate={reduceMotion ? undefined : { scale: aktiv ? [1, 1.04, 1] : 1 }}
      transition={{ duration: 0.25, ease: EASE_BOUNCE }}
      className={cn(
        "rounded-full border px-5 py-3 text-[14px] font-medium",
        zentriert ? "text-center" : "text-left",
        "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)",
        aktiv
          ? "border-transparent bg-akzent text-ink-cream"
          : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
      )}
    >
      {children}
    </motion.button>
  );
}

/** Sechs Einzelfelder statt eines Textfelds — Auto-Advance beim Tippen,
 *  Rücksprung bei Backspace auf ein leeres Feld, Paste füllt alle sechs.
 *  `shakeControls` (useAnimationControls im Elternteil, an
 *  onFehlgeschlagen-Callback gebunden) treibt den Fehler-Shake ohne die
 *  Felder neu zu mounten — Fokus/Wert bleiben beim Wackeln erhalten. */
function CodeFelder({
  ziffern,
  onChange,
  disabled,
  labelledBy,
  shakeControls,
}: {
  ziffern: string[];
  onChange: (naechste: string[]) => void;
  disabled: boolean;
  labelledBy: string;
  shakeControls: ReturnType<typeof useAnimationControls>;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function setStelle(i: number, eingabe: string) {
    const ziffer = eingabe.replace(/\D/g, "").slice(-1);
    const naechste = [...ziffern];
    naechste[i] = ziffer;
    onChange(naechste);
    if (ziffer && i < 5) {
      refs.current[i + 1]?.focus();
    }
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !ziffern[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const naechste = ["", "", "", "", "", ""];
    for (let i = 0; i < text.length; i++) naechste[i] = text[i];
    onChange(naechste);
    refs.current[Math.max(0, Math.min(text.length, 6) - 1)]?.focus();
  }

  return (
    <motion.div animate={shakeControls} className="mt-3 flex gap-2" role="group" aria-labelledby={labelledBy}>
      {ziffern.map((z, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={z}
          onChange={(e) => setStelle(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoFocus={i === 0}
          maxLength={1}
          disabled={disabled}
          aria-label={`Ziffer ${i + 1} von 6`}
          className="booking-input tnum h-14 w-11 text-center text-[19px] font-semibold sm:w-12"
        />
      ))}
    </motion.div>
  );
}

/** Dashboard-Karten treten mit 40ms-Versatz an (--duration-stagger). */
function KartenStagger({
  index,
  reduceMotion,
  children,
}: {
  index: number;
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE_SMOOTH, delay: index * 0.04 }}
    >
      {children}
    </motion.div>
  );
}
