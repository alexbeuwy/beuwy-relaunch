"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

/**
 * Client-Teil von /konto (R3 Leaf B9). Ein Bauteil für beide Zustände:
 * ohne Sitzung die zweistufige Login-Karte (E-Mail → Code anfordern →
 * Code eingeben), mit Sitzung das Dashboard (Stepper, Termin-Karte,
 * Wochenbericht-Karte, Ticket-Liste + Formular). Server-Daten kommen als
 * Props aus page.tsx (dieselbe Aufteilung wie StudioPage/StudioEditor);
 * Formulare sprechen ausschließlich mit /api/konto.
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
  if (!authed || !email || !konto) {
    return <LoginKarte />;
  }
  return <Dashboard email={email} konto={konto} demoDaten={demoDaten} />;
}

function LoginKarte() {
  const [schritt, setSchritt] = useState<"email" | "code">("email");
  const [emailWert, setEmailWert] = useState("");
  const [codeWert, setCodeWert] = useState("");
  const [busy, setBusy] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [demoCode, setDemoCode] = useState<string | null>(null);

  async function codeAnfordern(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !emailWert.trim()) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "code", email: emailWert.trim() });
    setBusy(false);
    if (ok && daten?.ok) {
      setDemoCode(daten.demoCode ?? null);
      setSchritt("code");
      return;
    }
    setFehler(daten?.error || "Der Code konnte nicht verschickt werden — bitte erneut versuchen.");
  }

  async function zurueckZuEmail() {
    setSchritt("email");
    setCodeWert("");
    setFehler(null);
    setDemoCode(null);
  }

  async function einloesen(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || codeWert.length !== 6) return;
    setBusy(true);
    setFehler(null);
    const { ok, daten } = await anKonto({ aktion: "einloesen", email: emailWert.trim(), code: codeWert });
    if (ok && daten?.ok) {
      // Voller Reload, damit der Server das frische Cookie sieht.
      window.location.reload();
      return;
    }
    setBusy(false);
    setFehler(daten?.error || "Der Code ist ungültig oder abgelaufen.");
  }

  return (
    <div className="mx-auto max-w-[420px] px-6 pt-36 pb-32">
      <p className="t-label">Ihr Konto</p>
      <h1 className="t-h2 mt-4">Anmelden</h1>
      <p className="t-body mt-4">
        Projektstatus, Termine und Ihre Anliegen an einem Ort — ein Code per E-Mail genügt, kein Passwort zum Merken.
      </p>

      <div className="panel mt-8 rounded-2xl p-6 sm:p-8">
        {schritt === "email" ? (
          <form onSubmit={codeAnfordern} noValidate>
            <label htmlFor="konto-email" className="t-label">
              E-Mail-Adresse
            </label>
            <input
              id="konto-email"
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
            <p className="t-small">
              Code verschickt an <span className="is-cream">{emailWert.trim()}</span>. Er ist 15 Minuten gültig.
            </p>
            {demoCode && (
              <p className="t-small mt-3 rounded-lg bg-akzent-wash px-3 py-2.5">
                Demo-Modus: Auf diesem Deployment ist kein E-Mail-Versand konfiguriert. Ihr Code lautet{" "}
                <span className="tnum font-semibold">{demoCode}</span>.
              </p>
            )}
            <label htmlFor="konto-code" className="t-label mt-5 block">
              Code
            </label>
            <input
              id="konto-code"
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
            <button
              type="button"
              onClick={zurueckZuEmail}
              className="t-small mt-4 underline underline-offset-4"
            >
              Andere E-Mail-Adresse verwenden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Dashboard({ email, konto, demoDaten }: { email: string; konto: KontoDaten; demoDaten: boolean }) {
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

      <section className="panel mt-10 rounded-2xl p-6 sm:p-8">
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
