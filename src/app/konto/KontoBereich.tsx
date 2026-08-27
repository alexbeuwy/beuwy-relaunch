"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { RiArrowLeftLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import stil from "./KontoBereich.module.css";

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
  const [codeWert, setCodeWert] = useState("");
  const [demoCode, setDemoCode] = useState<string | null>(null);

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
        setCodeWert("");
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
    if (busy || codeWert.length !== 6) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "einloesen", email: emailWert.trim(), code: codeWert });
    if (!(ok && daten?.ok)) {
      setBusy(false);
      setFehler(daten?.error || "Der Code ist ungültig oder abgelaufen.");
      return;
    }

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
    setBusy(false);
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

      <div key={index} className={cn(stil.schritt, richtung === 1 ? stil.vor : stil.zurueck)}>
        {index > 0 && (
          <button
            type="button"
            onClick={zurueck}
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-dim outline-offset-2 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream focus-visible:outline-2 focus-visible:outline-(--ring)"
          >
            <RiArrowLeftLine aria-hidden className="size-3.5" />
            Zurück
          </button>
        )}

        <p className={cn("t-label", index > 0 ? "mt-5" : "mt-8")}>
          Schritt {index + 1} von {gesamt}
        </p>

        {/* 1 · Rolle */}
        {index === 0 && (
          <Schritt headingId={headingId} titel="Was beschreibt Sie am besten?">
            <div className="mt-6 grid gap-3" role="group" aria-labelledby={headingId}>
              {ROLLEN.map((r) => (
                <GrossePille key={r} aktiv={rolle === r} onClick={() => waehleRolle(r)}>
                  {r}
                </GrossePille>
              ))}
            </div>
          </Schritt>
        )}

        {/* 2 · Intent (Mehrfachauswahl) */}
        {index === 1 && (
          <Schritt headingId={headingId} titel="Was soll sich zuerst ändern?">
            <p className="t-small mt-2">Mehrfachauswahl möglich.</p>
            <div className="mt-6 flex flex-wrap gap-3" role="group" aria-labelledby={headingId}>
              {INTENTS.map((i) => (
                <Pille key={i} aktiv={intent.includes(i)} onClick={() => toggleIntent(i)}>
                  {i}
                </Pille>
              ))}
            </div>
            <WeiterButton onClick={weiter} disabled={intent.length === 0} />
          </Schritt>
        )}

        {/* 3 · Größe & Stadt */}
        {index === 2 && (
          <Schritt headingId={headingId} titel="Wie groß ist Ihr Team?">
            <form
              onSubmit={(e) => weiterMitFormular(e, team !== null && stadt.trim().length >= 2)}
              noValidate
            >
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-labelledby={headingId}>
                {TEAMGROESSEN.map((g) => (
                  <Pille key={g} aktiv={team === g} onClick={() => setTeam(g)} zentriert>
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
          <Schritt headingId={headingId} titel="Für wen richten wir das ein?">
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
              schonKonto ? "Anmelden" : codeSchritt === "email" ? "Wohin schicken wir den Zugang?" : "Code eingeben"
            }
          >
            {codeSchritt === "email" ? (
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
                <p className="t-small mt-3">
                  Code verschickt an <span className="is-cream">{emailWert.trim()}</span>. Er ist 15 Minuten gültig.
                </p>
                {demoCode && (
                  <p className="t-small mt-3 rounded-lg bg-akzent-wash px-3 py-2.5">
                    Demo-Modus: Auf diesem Deployment ist kein E-Mail-Versand konfiguriert. Ihr Code lautet{" "}
                    <span className="tnum font-semibold">{demoCode}</span>.
                  </p>
                )}
                <label htmlFor="ob-code" className="t-label mt-5 block">
                  Code
                </label>
                <input
                  id="ob-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  maxLength={6}
                  value={codeWert}
                  onChange={(e) => {
                    setCodeWert(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setFehler(null);
                  }}
                  className="booking-input tnum mt-3 w-full tracking-[0.3em]"
                  placeholder="000000"
                />
                {fehler && (
                  <p className="t-small is-fail mt-3" role="alert">
                    {fehler}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy || codeWert.length !== 6}
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
      </div>

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
        <section className="panel mt-8 rounded-2xl p-6 sm:p-8">
          <p className="t-label">Ihr Fokus</p>
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
      )}

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

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Link
          href="/termin"
          className="panel block rounded-2xl p-6 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-bg-hover"
        >
          <p className="t-label">Ihr nächster Termin</p>
          <p className="t-h3 mt-3">Termin vereinbaren</p>
          <p className="t-body mt-2">Freien Slot wählen — die Bestätigung geht automatisch raus.</p>
          <span className="t-small mt-4 inline-block underline underline-offset-4">Zur Terminbuchung →</span>
        </Link>
        <div className="panel rounded-2xl p-6">
          <p className="t-label">Wochenbericht</p>
          <p className="t-h3 mt-3">Jeden Montag per Mail</p>
          <p className="t-body mt-2">
            Anfragen, Termine, Abschlüsse und die Änderung für die Woche danach — ohne dass Sie etwas abrufen müssen.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <p className="t-label">Ihre Anliegen</p>
        <div className="mt-4 space-y-3">
          {tickets.length === 0 && <p className="t-body">Noch keine Anliegen eingereicht.</p>}
          {tickets.map((ticket) => (
            <div key={ticket.id} className="panel flex items-start justify-between gap-4 rounded-xl p-4">
              <div>
                <p className="t-h3 !text-[15px]">{ticket.titel}</p>
                {ticket.detail && <p className="t-small mt-1">{ticket.detail}</p>}
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-line-subtle bg-bg-elevated px-3 py-1 text-[12px] font-medium text-ink-cream">
                {TICKET_STATUS_LABEL[ticket.status] ?? ticket.status}
              </span>
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
    </div>
  );
}

/* ── Hilfskomponenten (Wizard) ── */

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
        "rounded-full border px-6 py-4 text-left text-[15.5px] font-medium leading-snug",
        "transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)",
        aktiv
          ? "border-transparent bg-akzent text-ink-cream"
          : "border-line-medium bg-white text-ink-cream hover:border-transparent hover:bg-akzent-wash"
      )}
    >
      {children}
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
    </button>
  );
}
