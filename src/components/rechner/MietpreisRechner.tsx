"use client";

import { useMemo, useState } from "react";
import {
  type Ausstattung,
  type MietwertEingaben,
  type Objekttyp,
  type StadtGroesse,
  type Zustand,
  OBJEKTTYPEN,
  OBJEKTTYP_LABEL,
  STADTGROESSEN,
  STADTGROESSE_LABEL,
  DREI_STUFEN,
  DREI_STUFEN_LABEL,
  ZUSTAENDE,
  ZUSTAND_LABEL,
  RechnerFehler,
  aktuellesJahr,
  formatEuro,
  formatEuroProM2,
} from "@/lib/rechner/typen";
import { berechneMietwert } from "@/lib/rechner/mietwert";

/**
 * Mietpreisrechner — B3 (R3-PLAN.md, Abschnitt "Verträge"). Reine UI,
 * importiert die Rechenlogik ausschließlich aus src/lib/rechner/*.ts.
 * Live: jede Eingabe rechnet sofort neu (useMemo), kein Absenden-Button,
 * kein Gate vor dem Ergebnis. Der Rechenweg ist aufklappbar, der
 * Mietpreisbremse-Hinweis (falls die Stadtgröße betroffen ist) steht
 * immer offen neben dem Ergebnis — das ist ein rechtlich relevanter
 * Hinweis, kein Debug-Detail, das im Aufklapper verschwinden darf.
 * Die optionale E-Mail-Auswertung postet gegen /api/tool-lead (Route
 * entsteht in einer parallelen Welle) — Honeypot-Feld "website".
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function parseWohnflaeche(raw: string): number {
  return Number(raw.trim().replace(",", "."));
}

type MailPhase = "idle" | "busy" | "done" | "error";

export function MietpreisRechner() {
  const [wohnflaecheStr, setWohnflaecheStr] = useState("70");
  const [baujahrStr, setBaujahrStr] = useState(() => String(aktuellesJahr() - 20));
  const [objekttyp, setObjekttyp] = useState<Objekttyp>("ETW");
  const [zustand, setZustand] = useState<Zustand>("gepflegt");
  const [ausstattung, setAusstattung] = useState<Ausstattung>("mittel");
  const [stadtgroesse, setStadtgroesse] = useState<StadtGroesse>("grossstadt");
  const [rechenwegOffen, setRechenwegOffen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot — bleibt bei Menschen leer
  const [mailPhase, setMailPhase] = useState<MailPhase>("idle");
  const [mailFehler, setMailFehler] = useState<string | null>(null);

  const eingaben = useMemo<MietwertEingaben>(
    () => ({
      wohnflaeche: parseWohnflaeche(wohnflaecheStr),
      baujahr: Number(baujahrStr.trim()),
      objekttyp,
      zustand,
      ausstattung,
      stadtgroesse,
    }),
    [wohnflaecheStr, baujahrStr, objekttyp, zustand, ausstattung, stadtgroesse]
  );

  const ergebnis = useMemo(() => {
    try {
      return { ok: true as const, wert: berechneMietwert(eingaben) };
    } catch (e) {
      return {
        ok: false as const,
        fehler: e instanceof RechnerFehler ? e.message : "Bitte Eingaben prüfen.",
      };
    }
  }, [eingaben]);

  const proM2 = ergebnis.ok ? ergebnis.wert.mittelwertEuro / eingaben.wohnflaeche : 0;
  const bremseHinweis = ergebnis.ok
    ? ergebnis.wert.schritte.find((s) => s.label === "Hinweis Mietpreisbremse")?.wert
    : undefined;

  async function auswertungSenden(e: React.FormEvent) {
    e.preventDefault();
    if (mailPhase === "busy" || !ergebnis.ok) return;
    if (!name.trim()) return setMailFehler("Bitte Ihren Namen angeben.");
    if (!EMAIL_RE.test(email)) return setMailFehler("Bitte eine gültige E-Mail-Adresse angeben.");

    setMailFehler(null);
    setMailPhase("busy");
    try {
      const res = await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "mietpreis",
          eingaben,
          ergebnis: ergebnis.wert,
          name,
          email,
          website,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setMailPhase("done");
    } catch {
      setMailPhase("error");
      setMailFehler("Der Versand hat technisch nicht geklappt. Bitte später erneut versuchen.");
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-line-subtle bg-white lg:grid lg:grid-cols-[1fr_380px]">
      {/* ── Eingaben ─────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="t-label">Ihr Objekt</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="t-label mb-2.5">Objekttyp</p>
            <div className="grid grid-cols-3 gap-2.5">
              {OBJEKTTYPEN.map((o) => (
                <Pille key={o} aktiv={objekttyp === o} onClick={() => setObjekttyp(o)}>
                  {OBJEKTTYP_LABEL[o]}
                </Pille>
              ))}
            </div>
          </div>

          <div>
            <p className="t-label mb-2.5">Stadtgröße</p>
            <div className="grid grid-cols-2 gap-2.5">
              {STADTGROESSEN.map((s) => (
                <Pille key={s} aktiv={stadtgroesse === s} onClick={() => setStadtgroesse(s)}>
                  {STADTGROESSE_LABEL[s]}
                </Pille>
              ))}
            </div>
          </div>

          <Feld label="Wohnfläche" htmlFor="mp-flaeche">
            <div className="relative">
              <input
                id="mp-flaeche"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={wohnflaecheStr}
                onChange={(ev) => setWohnflaecheStr(ev.target.value)}
                placeholder="70"
                className="booking-input w-full pr-11"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-ink-dim">
                m²
              </span>
            </div>
          </Feld>

          <Feld label="Baujahr" htmlFor="mp-baujahr">
            <input
              id="mp-baujahr"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={baujahrStr}
              onChange={(ev) => setBaujahrStr(ev.target.value)}
              placeholder="2005"
              className="booking-input w-full"
            />
          </Feld>

          <div>
            <p className="t-label mb-2.5">Zustand</p>
            <div className="grid grid-cols-3 gap-2.5">
              {ZUSTAENDE.map((z) => (
                <Pille key={z} aktiv={zustand === z} onClick={() => setZustand(z)}>
                  {ZUSTAND_LABEL[z]}
                </Pille>
              ))}
            </div>
          </div>

          <div>
            <p className="t-label mb-2.5">Ausstattung</p>
            <div className="grid grid-cols-3 gap-2.5">
              {DREI_STUFEN.map((a) => (
                <Pille key={a} aktiv={ausstattung === a} onClick={() => setAusstattung(a)}>
                  {DREI_STUFEN_LABEL[a]}
                </Pille>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Ergebnis ─────────────────────────────────────────────────── */}
      <div className="border-t border-line-subtle bg-bg-elevated p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        {ergebnis.ok ? (
          <>
            <p className="t-label">Kaltmiete, monatlich</p>
            <p className="mt-3 font-display text-[clamp(26px,2.8vw,34px)] font-bold leading-[1.08] tracking-[-0.02em] text-ink-cream tnum [text-wrap:balance]">
              {formatEuro(ergebnis.wert.vonEuro, 0)} – {formatEuro(ergebnis.wert.bisEuro, 0)}
            </p>
            <p className="t-small mt-2 tnum">
              Mittelwert {formatEuro(ergebnis.wert.mittelwertEuro, 0)} · Ø{" "}
              {formatEuroProM2(proM2, 2)}
            </p>

            {bremseHinweis && (
              <div className="mt-5 rounded-r-lg border-l-2 border-akzent bg-akzent-wash py-3 pl-4 pr-3">
                <p className="t-small text-ink-cream">{bremseHinweis}</p>
              </div>
            )}

            <p className="t-small mt-5 text-ink-dim">{ergebnis.wert.hinweis}</p>

            {/* Rechenweg — aufklappbar, grid-rows-Technik (Motion-Tokens) */}
            <div className="mt-6 border-t border-line-subtle pt-5">
              <button
                type="button"
                onClick={() => setRechenwegOffen((v) => !v)}
                aria-expanded={rechenwegOffen}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="t-label">Rechenweg</span>
                <Chevron offen={rechenwegOffen} />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)]"
                style={{ gridTemplateRows: rechenwegOffen ? "1fr" : "0fr" }}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="mt-4 space-y-2.5">
                    {ergebnis.wert.schritte.map((s, i) => (
                      <li key={i} className="flex items-baseline justify-between gap-4 text-[13px]">
                        <span className="text-ink-muted">{s.label}</span>
                        <span className="whitespace-nowrap font-medium text-ink-cream tnum">
                          {s.wert}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* E-Mail-Auswertung — optional, ohne Gate vor dem Ergebnis */}
            <div className="mt-6 border-t border-line-subtle pt-5">
              {mailPhase === "done" ? (
                <p className="t-small text-ink-cream">
                  Auswertung ist unterwegs an <span className="font-medium">{email}</span>.
                </p>
              ) : (
                <form onSubmit={auswertungSenden}>
                  <p className="t-label">Auswertung per E-Mail</p>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(ev) => {
                        setName(ev.target.value);
                        setMailFehler(null);
                      }}
                      placeholder="Ihr Name"
                      aria-label="Ihr Name"
                      className="booking-input w-full"
                    />
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(ev) => {
                        setEmail(ev.target.value);
                        setMailFehler(null);
                      }}
                      placeholder="name@firma.de"
                      aria-label="Ihre E-Mail-Adresse"
                      className="booking-input w-full"
                    />
                    {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus. */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={website}
                      onChange={(ev) => setWebsite(ev.target.value)}
                      className="hidden"
                    />
                    {mailFehler && (
                      <p className="t-small text-(--accent-red)" role="alert">
                        {mailFehler}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={mailPhase === "busy"}
                      className="inline-flex items-center justify-center rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {mailPhase === "busy" ? "Wird gesendet…" : "Auswertung senden"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          <p className="t-small text-(--accent-red)" role="alert">
            {ergebnis.fehler}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Hilfskomponenten ── */

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

function Pille({
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
      className={`rounded-full border px-3 py-2.5 text-center text-[13px] font-medium transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
        aktiv
          ? "border-transparent bg-akzent text-ink-cream"
          : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
      }`}
    >
      {children}
    </button>
  );
}

function Chevron({ offen }: { offen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden
      className={`shrink-0 transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${
        offen ? "rotate-180" : ""
      }`}
    >
      <path
        d="M6 10l6 5 6-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
