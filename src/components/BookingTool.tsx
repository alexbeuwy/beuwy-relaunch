"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DEFAULTS as TERMIN_DEFAULTS } from "@/lib/texte/seiten/termin";

/**
 * Terminbuchung — portiert aus dem Riegel-Projekt (booking-tool.tsx) und für
 * beuwy angepasst: nur Video/Telefon, Anlässe Systemgespräch/Diagnose/
 * Bestandskunde, Mono-Nummern statt Icon-Set, beuwy-Typo-Tokens.
 * Erhalten: Zusammenfassungs-Schiene, Progress, Honeypot, Consent,
 * .ics-Download + Google-Kalender, ehrliche Bestätigung erst nach Übermittlung.
 *
 * R11: sämtliche Anzeigetexte kommen als Studio-Key (s.termin.buchung.*,
 * src/lib/texte/seiten/termin.ts) über das `texte`-Prop aus der Page
 * (Server-Komponente). Die Defaults hier greifen nur, falls ein fremder
 * Aufrufer das Tool ohne Prop einbindet. Dauer (Minuten) und Uhrzeit-
 * Slots bleiben Code — sie sind Ablaufdaten, keine Anzeigetexte.
 */

type Mode = "video" | "telefon";

export type BookingToolTexte = {
  railMarke: string;
  railUntertitel: string;
  railDatumPlatzhalter: string;
  railUhrzeitPlatzhalter: string;
  minutenSuffix: string;
  disclaimer: string;
  frageAnlass: string;
  anlaesse: { label: string; sub: string }[];
  frageArt: string;
  arten: { label: string; sub: string }[];
  frageTag: string;
  morgenHinweis: string;
  frageUhrzeit: string;
  vormittag: string;
  nachmittag: string;
  frageKontakt: string;
  feldNamePlatzhalter: string;
  feldEmailPlatzhalter: string;
  feldTelefonPflicht: string;
  feldTelefonOptional: string;
  feldNachrichtPlatzhalter: string;
  domainVorschlagVor: string;
  domainVorschlagNach: string;
  consentVor: string;
  consentLink: string;
  consentNach: string;
  fehlerDatum: string;
  fehlerName: string;
  fehlerEmail: string;
  fehlerTelefon: string;
  fehlerConsent: string;
  fehlerTechnisch: string;
  absenden: string;
  absendenAktiv: string;
  erfolgTitel: string;
  erfolgVor: string;
  erfolgNameFallback: string;
  erfolgMitte: string;
  erfolgNach: string;
  erfolgDemoHinweis: string;
  summaryAnlass: string;
  summaryDatum: string;
  summaryUhrzeit: string;
  summaryArt: string;
  uhrSuffix: string;
  minSuffix: string;
  icsButton: string;
  gcalButton: string;
  startseiteButton: string;
};

const D = TERMIN_DEFAULTS;
const liste2 = (name: string, n: number) =>
  Array.from({ length: n }, (_, i) => ({
    label: D[`s.termin.buchung.${name}.${i + 1}.label`], // studio:ok
    sub: D[`s.termin.buchung.${name}.${i + 1}.sub`], // studio:ok
  }));

const BUCHUNG_TEXTE_STANDARD: BookingToolTexte = {
  railMarke: D["s.termin.buchung.rail_marke"], // studio:ok
  railUntertitel: D["s.termin.buchung.rail_untertitel"], // studio:ok
  railDatumPlatzhalter: D["s.termin.buchung.rail_datum_platzhalter"], // studio:ok
  railUhrzeitPlatzhalter: D["s.termin.buchung.rail_uhrzeit_platzhalter"], // studio:ok
  minutenSuffix: D["s.termin.buchung.minuten_suffix"], // studio:ok
  disclaimer: D["s.termin.buchung.disclaimer"],
  frageAnlass: D["s.termin.buchung.frage_anlass"], // studio:ok
  anlaesse: liste2("anlass", 3),
  frageArt: D["s.termin.buchung.frage_art"], // studio:ok
  arten: liste2("art", 2),
  frageTag: D["s.termin.buchung.frage_tag"], // studio:ok
  morgenHinweis: D["s.termin.buchung.morgen_hinweis"], // studio:ok
  frageUhrzeit: D["s.termin.buchung.frage_uhrzeit"], // studio:ok
  vormittag: D["s.termin.buchung.vormittag"],
  nachmittag: D["s.termin.buchung.nachmittag"],
  frageKontakt: D["s.termin.buchung.frage_kontakt"], // studio:ok
  feldNamePlatzhalter: D["s.termin.buchung.feld_name_platzhalter"], // studio:ok
  feldEmailPlatzhalter: D["s.termin.buchung.feld_email_platzhalter"], // studio:ok
  feldTelefonPflicht: D["s.termin.buchung.feld_telefon_pflicht"], // studio:ok
  feldTelefonOptional: D["s.termin.buchung.feld_telefon_optional"], // studio:ok
  feldNachrichtPlatzhalter: D["s.termin.buchung.feld_nachricht_platzhalter"], // studio:ok
  domainVorschlagVor: D["s.termin.buchung.domain_vorschlag_vor"], // studio:ok
  domainVorschlagNach: D["s.termin.buchung.domain_vorschlag_nach"], // studio:ok
  consentVor: D["s.termin.buchung.consent_vor"], // studio:ok
  consentLink: D["s.termin.buchung.consent_link"], // studio:ok
  consentNach: D["s.termin.buchung.consent_nach"], // studio:ok
  fehlerDatum: D["s.termin.buchung.fehler_datum"], // studio:ok
  fehlerName: D["s.termin.buchung.fehler_name"], // studio:ok
  fehlerEmail: D["s.termin.buchung.fehler_email"], // studio:ok
  fehlerTelefon: D["s.termin.buchung.fehler_telefon"], // studio:ok
  fehlerConsent: D["s.termin.buchung.fehler_consent"], // studio:ok
  fehlerTechnisch: D["s.termin.buchung.fehler_technisch"], // studio:ok
  absenden: D["s.termin.buchung.absenden"],
  absendenAktiv: D["s.termin.buchung.absenden_aktiv"], // studio:ok
  erfolgTitel: D["s.termin.buchung.erfolg_titel"], // studio:ok
  erfolgVor: D["s.termin.buchung.erfolg_vor"], // studio:ok
  erfolgNameFallback: D["s.termin.buchung.erfolg_name_fallback"], // studio:ok
  erfolgMitte: D["s.termin.buchung.erfolg_mitte"], // studio:ok
  erfolgNach: D["s.termin.buchung.erfolg_nach"], // studio:ok
  erfolgDemoHinweis: D["s.termin.buchung.erfolg_demo_hinweis"], // studio:ok
  summaryAnlass: D["s.termin.buchung.summary_anlass"], // studio:ok
  summaryDatum: D["s.termin.buchung.summary_datum"], // studio:ok
  summaryUhrzeit: D["s.termin.buchung.summary_uhrzeit"], // studio:ok
  summaryArt: D["s.termin.buchung.summary_art"], // studio:ok
  uhrSuffix: D["s.termin.buchung.uhr_suffix"], // studio:ok
  minSuffix: D["s.termin.buchung.min_suffix"], // studio:ok
  icsButton: D["s.termin.buchung.ics_button"], // studio:ok
  gcalButton: D["s.termin.buchung.gcal_button"], // studio:ok
  startseiteButton: D["s.termin.buchung.startseite_button"], // studio:ok
};

// Dauer je Anlass (Minuten) — Ablaufdatum für Termin-/.ics-Berechnung,
// bleibt Code (an Index der "anlass"-Liste gekoppelt, nicht am Text).
const ANLASS_DAUER = ["30", "45", "30"];

const MORNING = ["09:00", "10:00", "11:00"];
const AFTERNOON = ["14:00", "15:00", "16:00", "17:00"];

// ISO aus lokalen Datumsteilen — toISOString() wäre UTC und liefert in
// Europe/Berlin nach Mitternacht den Vortag (falscher Termin in Mail/.ics).
const toLocalIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; // studio:ok

interface Day {
  iso: string;
  weekday: string;
  day: string;
  month: string;
  hint?: string;
}

// useSearchParams verlangt eine Suspense-Grenze (Next-Build-Regel).
export function BookingTool({ texte }: { texte?: Partial<BookingToolTexte> }) {
  return (
    <Suspense>
      <BookingToolInner texte={texte} />
    </Suspense>
  );
}

function BookingToolInner({ texte }: { texte?: Partial<BookingToolTexte> }) {
  const tx = { ...BUCHUNG_TEXTE_STANDARD, ...texte };
  const TYPES = tx.anlaesse.map((a, i) => ({ ...a, duration: ANLASS_DAUER[i] }));
  const MODES: { value: Mode; label: string; sub: string }[] = tx.arten.map((a, i) => ({
    ...a,
    value: (i === 0 ? "video" : "telefon") as Mode,
  }));

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
          hint: added === 0 ? tx.morgenHinweis : undefined,
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
      prev ? prev : `${tx.domainVorschlagVor} ${domain} ${tx.domainVorschlagNach}` // studio:ok
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
    if (!date || !time) return setError(tx.fehlerDatum);
    if (!name.trim()) return setError(tx.fehlerName);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError(tx.fehlerEmail);
    if (mode === "telefon" && !phone.trim()) return setError(tx.fehlerTelefon);
    if (!consent) return setError(tx.fehlerConsent);
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
      setError(tx.fehlerTechnisch);
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
      "PRODID:-//beuwy//Termin//DE", // studio:ok
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${type} – beuwy`,
      `DESCRIPTION:${type} (${modeMeta.label}) für ${name}`, // studio:ok
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
      dates: `${fmt(start)}/${fmt(end)}`, // studio:ok
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
            <h2 className="t-h3 mt-4">{tx.erfolgTitel}</h2>
            <p className="t-small mt-2 max-w-[380px]">
              {tx.erfolgVor} {name.split(" ")[0] || tx.erfolgNameFallback}{tx.erfolgMitte}{" "} // studio:ok
              <span className="is-cream">{email}</span>{tx.erfolgNach}
            </p>
            {done.demo && (
              <p className="t-data is-fail mt-3">{tx.erfolgDemoHinweis}</p>
            )}
          </div>

          <div className="px-8 py-4">
            <SummaryRow label={tx.summaryAnlass} value={type} />
            <SummaryRow
              label={tx.summaryDatum}
              value={
                selectedDay
                  ? `${selectedDay.weekday}, ${selectedDay.day}. ${selectedDay.month}` // studio:ok
                  : date
              }
            />
            <SummaryRow label={tx.summaryUhrzeit} value={`${time} ${tx.uhrSuffix} · ${duration} ${tx.minSuffix}`} /> // studio:ok
            <SummaryRow label={tx.summaryArt} value={modeMeta.label} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 border-t hairline px-8 py-6">
            <button type="button" onClick={downloadIcs} className="btn-primary">
              {tx.icsButton}
            </button>
            <a
              href={gcalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {tx.gcalButton}
            </a>
            <Link href="/" className="btn-secondary">
              {tx.startseiteButton}
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
          <p className="t-h3">{tx.railMarke}</p>
          <p className="t-data mt-1">{tx.railUntertitel}</p>
        </div>
        <div className="space-y-3 pt-5">
          <RailRow value={type} active />
          <RailRow value={`${duration} ${tx.minutenSuffix}`} active />
          <RailRow value={modeMeta.label} active />
          <RailRow
            value={
              selectedDay
                ? `${selectedDay.weekday}, ${selectedDay.day}. ${selectedDay.month}` // studio:ok
                : tx.railDatumPlatzhalter
            }
            active={Boolean(selectedDay)}
          />
          <RailRow value={time ? `${time} ${tx.uhrSuffix}` : tx.railUhrzeitPlatzhalter} active={Boolean(time)} />
        </div>
        <p className="t-data mt-5 border-t hairline pt-4">{tx.disclaimer}</p>
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
        <Field n="01" label={tx.frageAnlass}>
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
        <Field n="02" label={tx.frageArt}>
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
        <Field n="03" label={tx.frageTag}>
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
        <Field n="04" label={tx.frageUhrzeit}>
          <div className="space-y-3">
            {[
              { label: tx.vormittag, slots: MORNING },
              { label: tx.nachmittag, slots: AFTERNOON },
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
        <Field n="05" label={tx.frageKontakt}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              aria-label={tx.feldNamePlatzhalter}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder={tx.feldNamePlatzhalter}
              className="booking-input"
            />
            <input
              aria-label={tx.feldEmailPlatzhalter}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              type="email"
              placeholder={tx.feldEmailPlatzhalter}
              className="booking-input"
            />
            <input
              aria-label={mode === "telefon" ? tx.feldTelefonPflicht : tx.feldTelefonOptional}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError(null);
              }}
              placeholder={mode === "telefon" ? tx.feldTelefonPflicht : tx.feldTelefonOptional}
              className="booking-input sm:col-span-2"
            />
            <textarea
              aria-label="Nachricht (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder={tx.feldNachrichtPlatzhalter}
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
            className="mt-0.5 h-4 w-4 accent-sky"
          />
          <span className="t-small">
            {tx.consentVor}{" "}
            <Link href="/datenschutz" className="btn-link">
              {tx.consentLink}
            </Link>
            {tx.consentNach}
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
            {busy ? tx.absendenAktiv : tx.absenden}
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
