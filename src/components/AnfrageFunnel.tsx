"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import stil from "./AnfrageFunnel.module.css";

/**
 * Vorquali-Funnel für /anfrage — das Konversionsziel der ganzen Seite
 * (GOAL). 4 Fragen qualifizieren, bevor Kontaktdaten überhaupt gefragt
 * werden — jede beantwortete Frage ist ein Mini-Commitment (Zeigarnik/
 * IKEA-Effekt: wer schon geklickt hat, tippt auch die letzten Felder
 * fertig). Einzelauswahl springt per Klick automatisch weiter, Mehrfach-
 * auswahl (Fokus) braucht einen expliziten Weiter-Klick. Die vier
 * Antworten wandern strukturiert ins Nachricht-Feld von POST
 * /api/booking (Vertrag siehe Route — NICHT verändert): die Route
 * verlangt Datum/Uhrzeit im Terminbuchungs-Format, das hier keine echte
 * Bedeutung als Wunschtermin hat, deshalb ehrlich der Einreichungs-
 * Zeitpunkt statt eines erfundenen Slots.
 */

const ROLLEN = [
  "Inhaber/Geschäftsführer eines Maklerhauses",
  "Selbstständiger Makler",
  "Etwas anderes",
] as const;

const GROESSEN = ["unter 10", "10–30", "30–100", "über 100"] as const;

const FOKUSSE = [
  "Marke & Auftritt",
  "Website & Anfragen",
  "E-Mail & Nachfassen",
  "Automatisierung/CRM",
] as const;

const ZEITEN = [
  "So schnell wie möglich",
  "In den nächsten 3 Monaten",
  "Ich sondiere noch",
] as const;

const SONDIEREN = "Ich sondiere noch";

type SchrittKey = "rolle" | "groesse" | "fokus" | "zeit" | "kontakt";
const SCHRITTE: SchrittKey[] = ["rolle", "groesse", "fokus", "zeit", "kontakt"];

// Mirrort --duration-quick (150ms) aus globals.css: kurze Pause, damit die
// Auswahl sichtbar aufleuchtet, bevor der Schritt weiterspringt — bei
// Änderung des Tokens bitte hier mitziehen.
const AUTOWEITER_PAUSE = 150;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const pad = (n: number) => String(n).padStart(2, "0");

export function AnfrageFunnel() {
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
  const sondiert = zeit === SONDIEREN;

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
    if (!name.trim()) return setError("Bitte Ihren Namen angeben.");
    if (!EMAIL_RE.test(email)) return setError("Bitte eine gültige E-Mail-Adresse angeben.");
    if (!sondiert && !phone.trim())
      return setError("Für eine schnelle Rückmeldung brauchen wir Ihre Telefonnummer.");
    if (!consent) return setError("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

    setError(null);
    setBusy(true);

    const antworten = [
      `Rolle: ${rolle ?? "–"}`,
      `Abschlüsse/Jahr: ${groesse ?? "–"}`,
      `Fokus: ${fokus.length ? fokus.join(", ") : "–"}`,
      `Zeithorizont: ${zeit ?? "–"}`,
    ].join("\n");
    const message = notiz.trim() ? `${antworten}\n\nNachricht:\n${notiz.trim()}` : antworten;

    const jetzt = new Date();
    const payload = {
      type: "Zusammenarbeit anfragen",
      mode: "Anfrage-Funnel",
      duration: "",
      date: `${jetzt.getFullYear()}-${pad(jetzt.getMonth() + 1)}-${pad(jetzt.getDate())}`,
      time: `${pad(jetzt.getHours())}:${pad(jetzt.getMinutes())}`,
      name,
      email,
      phone,
      message,
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
        return setError(
          "Zu viele Anfragen kurz hintereinander. Bitte in ein paar Minuten erneut versuchen."
        );
      }
      if (res.status === 422) {
        setBusy(false);
        return setError("Bitte prüfen Sie Namen und E-Mail-Adresse — eine Angabe fehlt oder ist ungültig.");
      }
      if (!res.ok) throw new Error("request failed");
      const j = (await res.json()) as { demo?: boolean };
      setBusy(false);
      setErgebnis({ demo: Boolean(j.demo) });
    } catch {
      setBusy(false);
      setError(
        "Die Anfrage konnte technisch nicht zugestellt werden. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben."
      );
    }
  }

  const gesamt = SCHRITTE.length;
  const fortschritt = ergebnis ? 100 : Math.round(((index + 1) / gesamt) * 100);

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
        <h2 className="t-h2 mt-6">Anfrage angekommen.</h2>
        <p className="t-body-lg mt-4 max-w-[420px]">
          Wir melden uns innerhalb von 24 Stunden — persönlich, an{" "}
          <span className="is-cream font-medium">{email}</span>. Kein Pitch, keine Massenmail.
        </p>
        {ergebnis.demo && (
          <p className="t-data is-fail mt-4">
            Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert — bitte
            zusätzlich direkt an ap@beuwy.com schreiben.
          </p>
        )}
        <Link
          href="/cases"
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
        >
          Ergebnisse ansehen
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
          <Schritt headingId={headingId} titel="Wie viele Abschlüsse macht Ihr Haus im Jahr?">
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-labelledby={headingId}>
              {GROESSEN.map((g) => (
                <Pille key={g} aktiv={groesse === g} onClick={() => waehleEinzeln(setGroesse, g)}>
                  {g}
                </Pille>
              ))}
            </div>
          </Schritt>
        )}

        {/* 3 · Fokus (Mehrfachauswahl) */}
        {index === 2 && (
          <Schritt headingId={headingId} titel="Wo soll es zuerst spürbar werden?">
            <p className="t-small mt-2">Mehrfachauswahl möglich.</p>
            <div className="mt-6 flex flex-wrap gap-3" role="group" aria-labelledby={headingId}>
              {FOKUSSE.map((f) => (
                <Pille key={f} aktiv={fokus.includes(f)} onClick={() => toggleFokus(f)}>
                  {f}
                </Pille>
              ))}
            </div>
            <button
              type="button"
              onClick={weiter}
              disabled={fokus.length === 0}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-akzent"
            >
              Weiter
              <Pfeil />
            </button>
          </Schritt>
        )}

        {/* 4 · Zeithorizont */}
        {index === 3 && (
          <Schritt headingId={headingId} titel="Wann wollen Sie starten?">
            <div className="mt-6 grid gap-3 sm:grid-cols-3" role="group" aria-labelledby={headingId}>
              {ZEITEN.map((z) => (
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
            titel={
              sondiert
                ? "Fast geschafft — wohin schicken wir die Unterlagen?"
                : "Fast geschafft — wie erreichen wir Sie?"
            }
          >
            <p className="t-body mt-3">
              {sondiert
                ? "Wir schicken Ihnen erst einmal die richtigen Unterlagen. Wenn es passt, sprechen wir danach in Ruhe."
                : "Sie wollen zügig starten. Damit wir Sie schnell erreichen, brauchen wir Ihre Telefonnummer."}
            </p>

            <div className="mt-6 space-y-4">
              <Feld label="Name" htmlFor="anfrage-name">
                <input
                  id="anfrage-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Vor- und Nachname"
                  autoComplete="name"
                  className="booking-input w-full"
                />
              </Feld>
              <Feld label="E-Mail" htmlFor="anfrage-email">
                <input
                  id="anfrage-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  type="email"
                  placeholder="name@firma.de"
                  autoComplete="email"
                  className="booking-input w-full"
                />
              </Feld>
              <Feld label={sondiert ? "Telefon (optional)" : "Telefon"} htmlFor="anfrage-telefon">
                <input
                  id="anfrage-telefon"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  type="tel"
                  placeholder={sondiert ? "Optional" : "Für den Rückruf"}
                  autoComplete="tel"
                  className="booking-input w-full"
                />
              </Feld>
              <Feld label="Nachricht (optional)" htmlFor="anfrage-notiz">
                <textarea
                  id="anfrage-notiz"
                  value={notiz}
                  onChange={(e) => setNotiz(e.target.value)}
                  rows={3}
                  placeholder="Noch etwas, das wir wissen sollten?"
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
                style={{ accentColor: "var(--gold)" }}
                className="mt-0.5 h-4 w-4"
              />
              <span className="t-small">
                Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet
                werden. Jederzeit widerrufbar (siehe{" "}
                <Link href="/datenschutz" className="btn-link">
                  Datenschutz
                </Link>
                ).
              </span>
            </label>

            {error && (
              <p className="t-small is-fail mt-4" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={absenden}
              disabled={busy}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-akzent px-7 py-4 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Wird gesendet…" : "Zusammenarbeit anfragen"}
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
      <label htmlFor={htmlFor} className="t-label mb-2 block">
        {label}
      </label>
      {children}
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
