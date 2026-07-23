"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Terminbuchung — portiert aus dem Riegel-Projekt (booking-tool.tsx) und für
 * beuwy angepasst: nur Video/Telefon, Anlässe Systemgespräch/Diagnose/
 * Bestandskunde, Mono-Nummern statt Icon-Set, beuwy-Typo-Tokens.
 * Erhalten: Zusammenfassungs-Schiene, Progress, Honeypot, Consent,
 * .ics-Download + Google-Kalender, ehrliche Bestätigung erst nach Übermittlung.
 */

type Mode = "video" | "telefon";

const MODES: { value: Mode; label: string; sub: string }[] = [
  { value: "video", label: "Video-Call", sub: "Link kommt per E-Mail" },
  { value: "telefon", label: "Telefonisch", sub: "Wir rufen Sie an" },
];

const TYPES: { label: string; sub: string; duration: string }[] = [
  { label: "Systemgespräch", sub: "30 min · kostenlos · kein Pitch", duration: "30" },
  { label: "Diagnose-Besprechung", sub: "45 min · für laufende Diagnosen", duration: "45" },
  { label: "Bestandskunde", sub: "30 min · laufendes Projekt", duration: "30" },
];

const MORNING = ["09:00", "10:00", "11:00"];
const AFTERNOON = ["14:00", "15:00", "16:00", "17:00"];

// ISO aus lokalen Datumsteilen — toISOString() wäre UTC und liefert in
// Europe/Berlin nach Mitternacht den Vortag (falscher Termin in Mail/.ics).
const toLocalIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

interface Day {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  hint?: string;
}

// useSearchParams verlangt eine Suspense-Grenze (Next-Build-Regel).
export function BookingTool() {
  return (
    <Suspense>
      <BookingToolInner />
    </Suspense>
  );
}

function BookingToolInner() {
  const searchParams = useSearchParams();
  const [days, setDays] = useState<Day[]>([]);
  const [mode, setMode] = useState<Mode>("video");
  const [type, setType] = useState(TYPES[0].label);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot — bleibt bei Menschen leer
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { demo: boolean }>(null);

  useEffect(() => {
    const out: Day[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    let added = 0;
    while (added < 10) {
      cursor.setDate(cursor.getDate() + 1);
      const wd = cursor.getDay();
      if (wd !== 0 && wd !== 6) {
        out.push({
          iso: toLocalIso(cursor),
          weekday: cursor.toLocaleDateString("de-DE", { weekday: "short" }),
          day: cursor.toLocaleDateString("de-DE", { day: "2-digit" }),
          month: cursor.toLocaleDateString("de-DE", { month: "short" }),
          hint: added === 0 ? "morgen" : undefined,
        });
        added += 1;
      }
    }
    // Werktags-Liste hängt von `new Date()` ab → bewusst erst nach Mount.
    setDays(out);
  }, []);

  useEffect(() => {
    // Vorbefüllung aus dem Website-Check (?domain=…) — nur solange die
    // Nachricht leer ist, keine Nutzereingabe überschreiben.
    const domain = searchParams.get("domain");
    if (!domain) return;
    setMessage((prev) =>
      prev ? prev : `Ich möchte die Check-Befunde für ${domain} besprechen.`
    );
  }, [searchParams]);

  const selectedDay = useMemo(() => days.find((d) => d.iso === date), [days, date]);
  const typeMeta = TYPES.find((t) => t.label === type) ?? TYPES[0];
  const modeMeta = MODES.find((m) => m.value === mode)!;
  const duration = typeMeta.duration;

  const filled = [
    Boolean(date),
    Boolean(time),
    Boolean(name),
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
  ];
  const progress = Math.round((filled.filter(Boolean).length / filled.length) * 100);

  async function submit() {
    if (busy) return;
    if (!date || !time) return setError("Bitte Datum und Uhrzeit wählen.");
    if (!name.trim()) return setError("Bitte Ihren Namen angeben.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Bitte eine gültige E-Mail angeben.");
    if (mode === "telefon" && !phone.trim())
      return setError("Für einen Rückruf brauchen wir Ihre Telefonnummer.");
    if (!consent) return setError("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");
    setError(null);
    setBusy(true);

    const payload = {
      type,
      mode: modeMeta.label,
      duration,
      date,
      time,
      name,
      email,
      phone,
      message,
      website,
    };

    // Erst nach erfolgreicher Übermittlung bestätigen — keine Schein-Bestätigung.
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("booking failed");
      const j = (await res.json()) as { demo?: boolean };
      setBusy(false);
      setDone({ demo: Boolean(j.demo) });
    } catch {
      setBusy(false);
      setError(
        "Der Termin konnte nicht übermittelt werden. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben."
      );
    }
  }

  function eventDates() {
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + Number(duration) * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    return { start, end, fmt };
  }

  function downloadIcs() {
    const { start, end, fmt } = eventDates();
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//beuwy//Termin//DE",
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${type} – beuwy`,
      `DESCRIPTION:${type} (${modeMeta.label}) für ${name}`,
      `LOCATION:${modeMeta.label}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "beuwy-termin.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  function gcalUrl() {
    const { start, end, fmt } = eventDates();
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${type} – beuwy`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: `${type} (${modeMeta.label})`,
      location: modeMeta.label,
    });
    return `https://calendar.google.com/calendar/render?${p.toString()}`;
  }

  /* ── Bestätigung ── */
  if (done) {
    return (
      <div className="mx-auto max-w-[560px]">
        <div className="panel rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center border-b hairline px-8 pb-7 pt-9 text-center">
            <span className="booking-check" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                width={28}
                height={28}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4 10-10" />
              </svg>
            </span>
            <h2 className="t-h3 mt-4">Termin angefragt</h2>
            <p className="t-small mt-2 max-w-[380px]">
              Vielen Dank, {name.split(" ")[0] || "und bis gleich"}! Wir
              bestätigen Ihren Wunschtermin in Kürze per E-Mail an{" "}
              <span className="is-cream">{email}</span>.
            </p>
            {done.demo && (
              <p className="t-data is-fail mt-3">
                Hinweis: Der Mail-Versand ist auf dieser Vorschau noch nicht
                aktiviert — bitte zusätzlich direkt an ap@beuwy.com schreiben.
              </p>
            )}
          </div>

          <div className="px-8 py-4">
            <SummaryRow label="Anlass" value={type} />
            <SummaryRow
              label="Datum"
              value={
                selectedDay
                  ? `${selectedDay.weekday}, ${selectedDay.day}. ${selectedDay.month}`
                  : date
              }
            />
            <SummaryRow label="Uhrzeit" value={`${time} Uhr · ${duration} Min.`} />
            <SummaryRow label="Art" value={modeMeta.label} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 border-t hairline px-8 py-6">
            <button type="button" onClick={downloadIcs} className="btn-primary">
              Kalender (.ics)
            </button>
            <a
              href={gcalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Google Kalender ↗
            </a>
            <Link href="/" className="btn-secondary">
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Buchung ── */
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Zusammenfassungs-Schiene (Calendly-Stil, aus Riegel übernommen) */}
      <aside className="panel h-fit rounded-2xl p-6 lg:sticky lg:top-24">
        <div className="border-b hairline pb-5">
          <p className="t-h3">beuwy</p>
          <p className="t-data mt-1">Systemgespräch &amp; Diagnose</p>
        </div>
        <div className="space-y-3 pt-5">
          <RailRow value={type} active />
          <RailRow value={`${duration} Minuten`} active />
          <RailRow value={modeMeta.label} active />
          <RailRow
            value={
              selectedDay
                ? `${selectedDay.weekday}, ${selectedDay.day}. ${selectedDay.month}`
                : "Datum wählen"
            }
            active={Boolean(selectedDay)}
          />
          <RailRow value={time ? `${time} Uhr` : "Uhrzeit wählen"} active={Boolean(time)} />
        </div>
        <p className="t-data mt-5 border-t hairline pt-4">
          Unverbindlich &amp; kostenlos. Bestätigung per E-Mail.
        </p>
      </aside>

      {/* Schritte */}
      <div className="panel space-y-7 rounded-2xl p-6 sm:p-8">
        {/* Fortschritt */}
        <div
          className="h-1 w-full overflow-hidden rounded-full border hairline"
          aria-hidden
        >
          <div
            className="booking-progress h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 1 · Anlass */}
        <Field n="01" label="Worum geht es?">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {TYPES.map((t) => {
              const on = type === t.label;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setType(t.label)}
                  aria-pressed={on}
                  className={`booking-option rounded-xl border p-3.5 text-left ${
                    on ? "is-on" : ""
                  }`}
                >
                  <span className="t-small is-cream block font-medium">{t.label}</span>
                  <span className="t-data block mt-1">{t.sub}</span>
                </button>
              );
            })}
          </div>
        </Field>

        {/* 2 · Art */}
        <Field n="02" label="Wie möchten Sie sprechen?">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {MODES.map((m) => {
              const on = mode === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  aria-pressed={on}
                  className={`booking-option rounded-xl border p-3.5 text-left ${
                    on ? "is-on" : ""
                  }`}
                >
                  <span className="t-small is-cream block font-medium">{m.label}</span>
                  <span className="t-data block mt-1">{m.sub}</span>
                </button>
              );
            })}
          </div>
        </Field>

        {/* 3 · Datum */}
        <Field n="03" label="An welchem Tag?">
          <div className="grid grid-cols-5 gap-2">
            {days.map((d) => {
              const on = date === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setDate(d.iso)}
                  aria-pressed={on}
                  className={`booking-option flex flex-col items-center rounded-xl border py-2.5 ${
                    on ? "is-on" : ""
                  }`}
                >
                  <span className="t-label">{d.weekday}</span>
                  <span className={`t-h3 ${on ? "is-accent" : ""}`}>{d.day}</span>
                  <span className="t-data">{d.hint ?? d.month}</span>
                </button>
              );
            })}
          </div>
        </Field>

        {/* 4 · Uhrzeit */}
        <Field n="04" label="Zu welcher Uhrzeit?">
          <div className="space-y-3">
            {[
              { label: "Vormittag", slots: MORNING },
              { label: "Nachmittag", slots: AFTERNOON },
            ].map((grp) => (
              <div key={grp.label}>
                <p className="t-label mb-2">{grp.label}</p>
                <div className="flex flex-wrap gap-2">
                  {grp.slots.map((t) => {
                    const on = time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        aria-pressed={on}
                        className={`booking-option min-w-[4.6rem] rounded-lg border px-4 py-2 font-mono text-[13px] ${
                          on ? "is-on is-cream" : ""
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Field>

        {/* 5 · Kontakt */}
        <Field n="05" label="Wie erreichen wir Sie?">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              aria-label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="Name"
              className="booking-input"
            />
            <input
              aria-label="E-Mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              type="email"
              placeholder="E-Mail"
              className="booking-input"
            />
            <input
              aria-label={mode === "telefon" ? "Telefon (für den Rückruf)" : "Telefon (optional)"}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError(null);
              }}
              placeholder={mode === "telefon" ? "Telefon (für den Rückruf)" : "Telefon (optional)"}
              className="booking-input sm:col-span-2"
            />
            <textarea
              aria-label="Nachricht (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Nachricht (optional) — z. B. Ihre Domain oder Ihr Anliegen"
              className="booking-input resize-none sm:col-span-2"
            />
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
        </Field>

        {/* Consent — Pflicht vor dem Absenden */}
        <label className="flex items-start gap-2.5 text-left">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setError(null);
            }}
            className="mt-0.5 h-4 w-4 accent-[#F7E99A]"
          />
          <span className="t-small">
            Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage
            verarbeitet werden. Jederzeit widerrufbar (siehe{" "}
            <Link href="/datenschutz" className="btn-link">
              Datenschutz
            </Link>
            ).
          </span>
        </label>

        {/* Absenden */}
        <div>
          {error && (
            <p className="t-small is-fail mb-3" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="btn-primary w-full justify-center h-14"
          >
            {busy ? "Wird gesendet…" : "Termin anfragen"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Hilfskomponenten ── */
function Field({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2.5">
        <span className="t-data">{n}</span>
        <span className="t-small is-cream font-medium">{label}</span>
      </div>
      {children}
    </div>
  );
}

function RailRow({ value, active }: { value: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
          active ? "bg-ink-yellow" : "bg-bg-hover"
        }`}
        aria-hidden
      />
      <span className={`t-small ${active ? "is-cream" : "is-dim"}`}>{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b hairline last:border-b-0">
      <span className="t-data">{label}</span>
      <span className="t-small is-cream text-right">{value}</span>
    </div>
  );
}
