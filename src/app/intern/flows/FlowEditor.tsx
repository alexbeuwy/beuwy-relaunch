"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  mailFunnelBestaetigung,
  mailTerminBestaetigung,
  mailTerminErinnerung,
  mailNachfass,
  mailToolErgebnis,
  mailKontoCode,
} from "@/lib/email-vorlagen";
import { emailLayout } from "@/lib/email";

/**
 * FlowEditor — der komplette interaktive Teil von /intern/flows (R5 Leaf
 * G4). Eine Datei für Übersicht UND Editor (kein Router-Wechsel, kein
 * eigener [id]-Route-Ordner — außerhalb der für dieses Leaf zugewiesenen
 * Dateiliste), weil beides denselben Client-State teilt: im Demo-Modus
 * (konfiguriert=false) bleiben neu angelegte/geänderte Flows sichtbar,
 * solange die Seite nicht neu geladen wird — ein echter Seitenwechsel
 * würde das serverseitig gerenderte Demo-Set zurückholen und die
 * Änderung verschlucken (KanbanBoard.tsx macht es aus demselben Grund
 * genauso: alles bleibt eine Client-Komponente ohne Navigation).
 *
 * Design-Direktive (docs/redesign/R5-PORTGUT.md): optimistisches Update
 * + Rollback für den Status-Umschalter auf der Karte (Regel 9),
 * Zwei-Klick-Bestätigung statt window.confirm() beim Schritt-Entfernen
 * (Regel 10), Leerzustand mit Icon+Satz+Aktion (Regel 7), Motion nur
 * über bestehende Tokens (Regel 16), eine primäre Aktion pro Ansicht
 * (Regel 4: „Flow anlegen“ in der Übersicht, „Flow speichern“ im Editor).
 *
 * VORLAGEN-KONTRAKT: email-vorlagen.ts hat sechs Exporte mit
 * unterschiedlichen Pflichtparametern (Name allein reicht nur bei
 * mailNachfass — die anderen fünf brauchen Termin-/Tool-/Code-Daten, die
 * ein generischer Flow-Lauf nicht automatisch hat). Die Vorschau hier
 * rendert deshalb mit denselben Demo-Werten wie /intern/mails, DEMO_KTX
 * unten — identisch zur Logik in src/app/api/cron/flows/route.ts, die
 * beim echten Versand nur Name/E-Mail hat und die übrigen Felder leer
 * lässt (dort ausführlich kommentiert). Beide Stellen müssen bei einer
 * Erweiterung der Vorlagen-Liste zusammen angepasst werden.
 */

export type FlowStatus = "entwurf" | "aktiv" | "pausiert";
export type Ausloeser = "lead_neu" | "tool_lead" | "booking" | "konto_neu" | "manuell";
export type VorlageId =
  | "funnel_bestaetigung"
  | "termin_bestaetigung"
  | "termin_erinnerung"
  | "nachfass"
  | "tool_ergebnis"
  | "konto_code";

export type MailKonfig =
  | { modus: "vorlage"; vorlageId: VorlageId }
  | { modus: "frei"; betreff: string; text: string };
export type WartenKonfig = { stunden: number };
export type BedingungKonfig = { feld: "status"; wert: string };

export type FlowSchritt =
  | { typ: "mail"; konfig: MailKonfig }
  | { typ: "warten"; konfig: WartenKonfig }
  | { typ: "bedingung"; konfig: BedingungKonfig };

export type FlowEintrag = {
  id: string;
  name: string;
  status: FlowStatus;
  ausloeser: Ausloeser;
  schritte: FlowSchritt[];
  laufendeAnzahl: number;
};

const AUSLOESER_ORDER: Ausloeser[] = ["lead_neu", "tool_lead", "booking", "konto_neu", "manuell"];
const AUSLOESER_KEY: Record<Ausloeser, string> = {
  lead_neu: "intern.flows.ausloeser_lead_neu",
  tool_lead: "intern.flows.ausloeser_tool_lead",
  booking: "intern.flows.ausloeser_booking",
  konto_neu: "intern.flows.ausloeser_konto_neu",
  manuell: "intern.flows.ausloeser_manuell",
};

const STATUS_ORDER: FlowStatus[] = ["entwurf", "aktiv", "pausiert"];
const STATUS_KEY: Record<FlowStatus, string> = {
  entwurf: "intern.flows.status_entwurf",
  aktiv: "intern.flows.status_aktiv",
  pausiert: "intern.flows.status_pausiert",
};
const STATUS_DOT: Record<FlowStatus, string> = {
  entwurf: "bg-ink-dim",
  aktiv: "bg-akzent",
  pausiert: "bg-ink-muted",
};

/* Feste Domain-Vokabel, kein Studio-Text — analog STATUS_LABELS in
   KanbanBoard.tsx: die sechs Lead-/Deal-Status-Namen sind überall im CRM
   identisch benannt. Für BEDINGUNG genügt aktuell "status" als einziges
   wählbares Feld (das einzige, das flowFaellige() aus dem Lead ableiten
   kann — siehe Kontrakt-Kommentar in api/cron/flows/route.ts). */
const BEDINGUNG_STATUS_WERTE = ["neu", "kontaktiert", "termin", "angebot", "kunde", "verloren"] as const;
const BEDINGUNG_STATUS_LABEL: Record<string, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  termin: "Termin",
  angebot: "Angebot",
  kunde: "Kunde",
  verloren: "Verloren",
};

const VORLAGE_ORDER: VorlageId[] = [
  "nachfass",
  "funnel_bestaetigung",
  "termin_bestaetigung",
  "termin_erinnerung",
  "tool_ergebnis",
  "konto_code",
];
const VORLAGE_KEY: Record<VorlageId, string> = {
  funnel_bestaetigung: "intern.flows.vorlage_funnel_bestaetigung",
  termin_bestaetigung: "intern.flows.vorlage_termin_bestaetigung",
  termin_erinnerung: "intern.flows.vorlage_termin_erinnerung",
  nachfass: "intern.flows.vorlage_nachfass",
  tool_ergebnis: "intern.flows.vorlage_tool_ergebnis",
  konto_code: "intern.flows.vorlage_konto_code",
};

const WARTEN_PILLS: Array<{ stunden: number; key: string }> = [
  { stunden: 1, key: "intern.flows.warten_1h" },
  { stunden: 4, key: "intern.flows.warten_4h" },
  { stunden: 24, key: "intern.flows.warten_1t" },
  { stunden: 72, key: "intern.flows.warten_3t" },
  { stunden: 168, key: "intern.flows.warten_1w" },
];

/** Vorschau-Kontext — identische Werte wie die Beispieldaten in
 *  /intern/mails/page.tsx, damit dieselbe Vorlage überall gleich aussieht. */
const DEMO_KTX = {
  name: "Julia Berger",
  wunsch: "Marke & Auftritt, Website & Anfragen",
  datum: "2026-09-14",
  uhrzeit: "10:30",
  tool: "Verkaufspreisrechner",
  ergebnisZeilen: [
    { label: "Orientierungswert", value: "612.000 €" },
    { label: "Preis je m²", value: "4.850 €" },
    { label: "Vergleichsobjekte", value: "14" },
  ],
  code: "482913",
};

function renderVorlagenVorschau(vorlageId: VorlageId): { betreff: string; html: string } {
  switch (vorlageId) {
    case "funnel_bestaetigung":
      return mailFunnelBestaetigung(DEMO_KTX.name, DEMO_KTX.wunsch);
    case "termin_bestaetigung":
      return mailTerminBestaetigung(DEMO_KTX.name, DEMO_KTX.datum, DEMO_KTX.uhrzeit);
    case "termin_erinnerung":
      return mailTerminErinnerung(DEMO_KTX.name, DEMO_KTX.datum, DEMO_KTX.uhrzeit);
    case "nachfass":
      return mailNachfass(DEMO_KTX.name);
    case "tool_ergebnis":
      return mailToolErgebnis(DEMO_KTX.name, DEMO_KTX.tool, DEMO_KTX.ergebnisZeilen);
    case "konto_code":
      return mailKontoCode(DEMO_KTX.code);
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Freitext → emailLayout: erster Absatz wird zur Intro-Zeile, der Rest
 *  zu Fließtext-Absätzen — dieselbe Heading/Intro/Body-Form wie die sechs
 *  festen Vorlagen, ohne dass der Editor ein drittes Feld verlangt. */
function renderFreitextVorschau(betreff: string, text: string): { betreff: string; html: string } {
  const absaetze = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => esc(p).replace(/\n/g, "<br/>"));
  const [intro, ...rest] = absaetze;
  const bodyHtml = rest
    .map((p) => `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#141414;">${p}</p>`)
    .join("");
  const html = emailLayout({ heading: betreff || "…", intro: intro || "", bodyHtml });
  return { betreff, html };
}

function vorschauFuer(mail: MailKonfig): { betreff: string; html: string } {
  return mail.modus === "vorlage" ? renderVorlagenVorschau(mail.vorlageId) : renderFreitextVorschau(mail.betreff, mail.text);
}

function erzeugeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `tmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultSchritt(typ: FlowSchritt["typ"]): FlowSchritt {
  if (typ === "mail") return { typ: "mail", konfig: { modus: "vorlage", vorlageId: "nachfass" } };
  if (typ === "warten") return { typ: "warten", konfig: { stunden: 24 } };
  return { typ: "bedingung", konfig: { feld: "status", wert: "kontaktiert" } };
}

async function postFlow(body: Record<string, unknown>): Promise<{ ok: boolean; id?: string | null; error?: string }> {
  try {
    const res = await fetch("/api/intern-flows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string | null; error?: string };
    if (!res.ok || !data.ok) return { ok: false, error: typeof data.error === "string" ? data.error : undefined };
    return { ok: true, id: data.id ?? null };
  } catch {
    return { ok: false, error: undefined };
  }
}

const BTN_PRIMARY =
  "rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98] disabled:opacity-60";
const BTN_QUIET =
  "rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream";
const PILL = "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-(--duration-quick) ease-(--ease-smooth-out)";
const PILL_AKTIV = "border-ink-cream/40 bg-akzent-wash text-ink-cream";
const PILL_INAKTIV = "border-line-subtle text-ink-muted hover:border-ink-cream/25 hover:text-ink-cream";

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import ─────────────── */
function PlusGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M7 1.5v11M1.5 7h11" />
    </svg>
  );
}
function PfeilHoch() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8l3.5-4L10 8" />
    </svg>
  );
}
function PfeilRunter() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5l3.5 4L10 5" />
    </svg>
  );
}
function KetteGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="var(--ink-dim)" strokeWidth="1.6" aria-hidden>
      <circle cx="9" cy="9" r="4.5" />
      <circle cx="27" cy="18" r="4.5" />
      <circle cx="9" cy="27" r="4.5" />
      <path d="M12.5 11.5l11 4.5M23.5 20.5l-11 4.5" strokeLinecap="round" />
    </svg>
  );
}

/** M/W/B-Punkte mit Verbindungslinie — die Mini-Kette auf der Übersichtskarte. */
function MiniKette({ schritte }: { schritte: FlowSchritt[] }) {
  if (schritte.length === 0) return null;
  const LETTER: Record<FlowSchritt["typ"], string> = { mail: "M", warten: "W", bedingung: "B" };
  return (
    <div className="flex items-center gap-1">
      {schritte.map((s, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-medium text-[9.5px] font-semibold text-ink-muted">
            {LETTER[s.typ]}
          </span>
          {i < schritte.length - 1 && <span className="h-px w-3 shrink-0 bg-line-medium" aria-hidden />}
        </span>
      ))}
    </div>
  );
}

/* ── Übersicht: eine Flow-Karte ────────────────────────────────────────── */
function FlowKarte({
  flow,
  tx,
  onOeffnen,
  onStatusAendern,
}: {
  flow: FlowEintrag;
  tx: (key: string) => string;
  onOeffnen: () => void;
  onStatusAendern: (status: FlowStatus) => void;
}) {
  return (
    <div className="rounded-2xl border border-line-subtle bg-white p-5 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/25">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-ink-cream">{flow.name || "Ohne Namen"}</p>
          <span className="mt-1.5 inline-flex items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted">
            {tx(AUSLOESER_KEY[flow.ausloeser])}
          </span>
        </div>
        <button
          type="button"
          onClick={onOeffnen}
          className="shrink-0 text-[12.5px] font-medium text-ink-muted underline decoration-transparent underline-offset-2 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream hover:decoration-line-medium"
        >
          {tx("intern.flows.karte_bearbeiten")}
        </button>
      </div>

      <div className="mt-4">
        {flow.schritte.length === 0 ? (
          <p className="t-small !text-ink-dim">{tx("intern.flows.karte_schritte_leer")}</p>
        ) : (
          <MiniKette schritte={flow.schritte} />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line-subtle pt-4">
        <div className="flex items-center gap-1.5">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusAendern(s)}
              aria-pressed={flow.status === s}
              className={`${PILL} ${flow.status === s ? PILL_AKTIV : PILL_INAKTIV}`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[s]}`} aria-hidden />
                {tx(STATUS_KEY[s])}
              </span>
            </button>
          ))}
        </div>
        <span className="t-data tnum shrink-0 !text-ink-dim">
          {flow.laufendeAnzahl} {tx("intern.flows.laeufe_label")}
        </span>
      </div>
    </div>
  );
}

/* ── Editor: ein Schritt-Kärtchen ──────────────────────────────────────── */
function SchrittKarte({
  schritt,
  index,
  gesamt,
  tx,
  onUpdate,
  onMove,
  onRemove,
}: {
  schritt: FlowSchritt;
  index: number;
  gesamt: number;
  tx: (key: string) => string;
  onUpdate: (schritt: FlowSchritt) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const [entfernenArm, setEntfernenArm] = useState(false);
  const armTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (armTimer.current) clearTimeout(armTimer.current);
    };
  }, []);

  function arm() {
    setEntfernenArm(true);
    if (armTimer.current) clearTimeout(armTimer.current);
    armTimer.current = setTimeout(() => setEntfernenArm(false), 4000);
  }

  const TYP_LABEL: Record<FlowSchritt["typ"], string> = {
    mail: tx("intern.flows.schritt_typ_mail"),
    warten: tx("intern.flows.schritt_typ_warten"),
    bedingung: tx("intern.flows.schritt_typ_bedingung"),
  };

  return (
    <div className="relative rounded-2xl border border-line-subtle bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-akzent-wash text-[11px] font-bold text-ink-cream">
            {index + 1}
          </span>
          <p className="text-[13.5px] font-semibold text-ink-cream">{TYP_LABEL[schritt.typ]}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            aria-label={tx("intern.flows.schritt_hoch_label")}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream disabled:opacity-30 disabled:hover:text-ink-dim"
          >
            <PfeilHoch />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === gesamt - 1}
            aria-label={tx("intern.flows.schritt_runter_label")}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream disabled:opacity-30 disabled:hover:text-ink-dim"
          >
            <PfeilRunter />
          </button>
          {!entfernenArm ? (
            <button
              type="button"
              onClick={arm}
              className="ml-1 rounded-full px-2.5 py-1 text-[11.5px] font-medium text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-destructive/10 hover:text-destructive"
            >
              {tx("intern.flows.schritt_entfernen_label")}
            </button>
          ) : (
            <span className="ml-1 flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-1">
              <span className="text-[11px] text-destructive">{tx("intern.flows.schritt_entfernen_bestaetigen")}</span>
              <button type="button" onClick={onRemove} className="text-[11px] font-semibold text-destructive underline underline-offset-2">
                {tx("intern.flows.schritt_entfernen_ja")}
              </button>
              <button type="button" onClick={() => setEntfernenArm(false)} className="text-[11px] text-ink-dim underline underline-offset-2">
                {tx("intern.flows.schritt_entfernen_nein")}
              </button>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        {schritt.typ === "mail" && (
          <MailFelder mail={schritt.konfig} tx={tx} onChange={(konfig) => onUpdate({ typ: "mail", konfig })} />
        )}
        {schritt.typ === "warten" && (
          <WartenFelder warten={schritt.konfig} tx={tx} onChange={(konfig) => onUpdate({ typ: "warten", konfig })} />
        )}
        {schritt.typ === "bedingung" && (
          <BedingungFelder bedingung={schritt.konfig} tx={tx} onChange={(konfig) => onUpdate({ typ: "bedingung", konfig })} />
        )}
      </div>
    </div>
  );
}

function MailFelder({
  mail,
  tx,
  onChange,
}: {
  mail: MailKonfig;
  tx: (key: string) => string;
  onChange: (m: MailKonfig) => void;
}) {
  const vorschau = useMemo(() => vorschauFuer(mail), [mail]);

  return (
    <div>
      <div className="flex items-center gap-2">
        {(["vorlage", "frei"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m === "vorlage" ? { modus: "vorlage", vorlageId: "nachfass" } : { modus: "frei", betreff: "", text: "" })}
            className={`${PILL} ${mail.modus === m ? PILL_AKTIV : PILL_INAKTIV}`}
          >
            {tx(m === "vorlage" ? "intern.flows.mail_modus_vorlage" : "intern.flows.mail_modus_frei")}
          </button>
        ))}
      </div>

      {mail.modus === "vorlage" ? (
        <div className="mt-3.5">
          <label className="block">
            <span className="t-label">{tx("intern.flows.mail_vorlage_label")}</span>
            <select
              value={mail.vorlageId}
              onChange={(e) => onChange({ modus: "vorlage", vorlageId: e.target.value as VorlageId })}
              className="booking-input mt-1.5 w-full"
            >
              {VORLAGE_ORDER.map((v) => (
                <option key={v} value={v}>
                  {tx(VORLAGE_KEY[v])}
                </option>
              ))}
            </select>
          </label>
          <p className="t-small mt-2 !text-ink-dim">{tx("intern.flows.mail_vorlage_hinweis")}</p>
        </div>
      ) : (
        <div className="mt-3.5 flex flex-col gap-3">
          <label className="block">
            <span className="t-label">{tx("intern.flows.mail_betreff_label")}</span>
            <input
              value={mail.betreff}
              onChange={(e) => onChange({ modus: "frei", betreff: e.target.value, text: mail.text })}
              placeholder={tx("intern.flows.mail_betreff_platzhalter")}
              className="booking-input mt-1.5 w-full"
            />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.flows.mail_text_label")}</span>
            <textarea
              value={mail.text}
              onChange={(e) => onChange({ modus: "frei", betreff: mail.betreff, text: e.target.value })}
              rows={5}
              placeholder={tx("intern.flows.mail_text_platzhalter")}
              className="booking-input mt-1.5 w-full resize-y"
            />
          </label>
        </div>
      )}

      <div className="mt-4">
        <p className="t-label">{tx("intern.flows.mail_vorschau_label")}</p>
        <div className="hairline mt-2 overflow-hidden rounded-xl border bg-white">
          <iframe title={tx("intern.flows.mail_vorschau_label")} srcDoc={vorschau.html} sandbox="" className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  );
}

function WartenFelder({ warten, tx, onChange }: { warten: WartenKonfig; tx: (key: string) => string; onChange: (w: WartenKonfig) => void }) {
  return (
    <div>
      <p className="t-label">{tx("intern.flows.warten_label")}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {WARTEN_PILLS.map((p) => (
          <button
            key={p.stunden}
            type="button"
            onClick={() => onChange({ stunden: p.stunden })}
            className={`${PILL} ${warten.stunden === p.stunden ? PILL_AKTIV : PILL_INAKTIV}`}
          >
            {tx(p.key)}
          </button>
        ))}
      </div>
    </div>
  );
}

function BedingungFelder({
  bedingung,
  tx,
  onChange,
}: {
  bedingung: BedingungKonfig;
  tx: (key: string) => string;
  onChange: (b: BedingungKonfig) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
      <label className="block">
        <span className="t-label">{tx("intern.flows.bedingung_feld_label")}</span>
        <select value="status" disabled className="booking-input mt-1.5 w-full sm:w-40">
          <option value="status">{tx("intern.flows.bedingung_feld_status")}</option>
        </select>
      </label>
      <span className="pb-2.5 text-[13px] text-ink-dim">=</span>
      <label className="block flex-1">
        <span className="t-label">{tx("intern.flows.bedingung_wert_label")}</span>
        <select
          value={bedingung.wert}
          onChange={(e) => onChange({ feld: "status", wert: e.target.value })}
          className="booking-input mt-1.5 w-full"
        >
          {BEDINGUNG_STATUS_WERTE.map((w) => (
            <option key={w} value={w}>
              {BEDINGUNG_STATUS_LABEL[w]}
            </option>
          ))}
        </select>
      </label>
      <p className="t-small !text-ink-dim sm:pb-2.5">{tx("intern.flows.bedingung_hinweis")}</p>
    </div>
  );
}

/* ── "+" -Einfüger zwischen zwei Schritt-Karten ────────────────────────── */
function SchrittEinfueger({
  offen,
  onToggle,
  onWaehlen,
  tx,
}: {
  offen: boolean;
  onToggle: () => void;
  onWaehlen: (typ: FlowSchritt["typ"]) => void;
  tx: (key: string) => string;
}) {
  return (
    <div className="relative flex items-center justify-center gap-2 py-1">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-medium" aria-hidden />
      {/* "+" bleibt immer sichtbar und dreht sich zum "×" — klar erkennbarer
         Umschalter statt eines Zustands, aus dem man nur per Auswahl
         wieder herauskommt. */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={tx("intern.flows.schritt_hinzufuegen_label")}
        aria-expanded={offen}
        className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-white transition-[transform,color,border-color] duration-(--duration-quick) ease-(--ease-smooth-out) ${
          offen ? "rotate-45 border-ink-cream/40 text-ink-cream" : "border-line-medium text-ink-muted hover:border-ink-cream/40 hover:text-ink-cream"
        }`}
      >
        <PlusGlyph />
      </button>
      {offen && (
        <span className="relative z-10 flex items-center gap-1.5 rounded-full border border-line-medium bg-white p-1 shadow-[0_10px_28px_-14px_rgba(20,20,18,0.35)]">
          {(["mail", "warten", "bedingung"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onWaehlen(t)}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-wash"
            >
              {tx(t === "mail" ? "intern.flows.schritt_typ_mail" : t === "warten" ? "intern.flows.schritt_typ_warten" : "intern.flows.schritt_typ_bedingung")}
            </button>
          ))}
        </span>
      )}
    </div>
  );
}

type FlowEntwurf = { id: string | null; name: string; status: FlowStatus; ausloeser: Ausloeser; schritte: FlowSchritt[] };
type View = { modus: "liste" } | { modus: "editor"; entwurf: FlowEntwurf };

export function FlowsClient({
  initialFlows,
  konfiguriert,
  texte,
}: {
  initialFlows: FlowEintrag[];
  konfiguriert: boolean;
  texte: Record<string, string>;
}) {
  const tx = (key: string) => texte[key] ?? key;

  const [flows, setFlows] = useState<FlowEintrag[]>(initialFlows);
  const [view, setView] = useState<View>({ modus: "liste" });
  const [fehler, setFehler] = useState<string | null>(null);
  const [speichert, setSpeichert] = useState(false);
  const [einfuegerBei, setEinfuegerBei] = useState<number | null>(null);

  function oeffneNeu() {
    setFehler(null);
    setView({ modus: "editor", entwurf: { id: null, name: "", status: "entwurf", ausloeser: "lead_neu", schritte: [] } });
  }

  function oeffneBearbeiten(flow: FlowEintrag) {
    setFehler(null);
    setView({
      modus: "editor",
      entwurf: { id: flow.id, name: flow.name, status: flow.status, ausloeser: flow.ausloeser, schritte: flow.schritte },
    });
  }

  function schliesseEditor() {
    setEinfuegerBei(null);
    setView({ modus: "liste" });
  }

  /* ── Status auf einer Karte ändern: optimistisch, mit Rollback ──────── */
  function statusAendern(flowId: string, status: FlowStatus) {
    const vorher = flows;
    const ziel = flows.find((f) => f.id === flowId);
    if (!ziel || ziel.status === status) return;
    setFlows((prev) => prev.map((f) => (f.id === flowId ? { ...f, status } : f)));
    setFehler(null);
    if (!konfiguriert) return;
    void (async () => {
      const res = await postFlow({ aktion: "status", id: flowId, status });
      if (!res.ok) {
        setFlows(vorher);
        setFehler(res.error ?? tx("intern.flows.fehler_speichern"));
      }
    })();
  }

  /* ── Editor: Schritte bearbeiten ─────────────────────────────────────── */
  function mitEntwurf(fn: (e: FlowEntwurf) => FlowEntwurf) {
    setView((v) => (v.modus === "editor" ? { modus: "editor", entwurf: fn(v.entwurf) } : v));
  }

  function schrittEinfuegen(index: number, typ: FlowSchritt["typ"]) {
    mitEntwurf((e) => {
      const schritte = [...e.schritte];
      schritte.splice(index, 0, defaultSchritt(typ));
      return { ...e, schritte };
    });
    setEinfuegerBei(null);
  }

  function schrittAktualisieren(index: number, schritt: FlowSchritt) {
    mitEntwurf((e) => ({ ...e, schritte: e.schritte.map((s, i) => (i === index ? schritt : s)) }));
  }

  function schrittEntfernen(index: number) {
    mitEntwurf((e) => ({ ...e, schritte: e.schritte.filter((_, i) => i !== index) }));
  }

  function schrittVerschieben(index: number, dir: -1 | 1) {
    mitEntwurf((e) => {
      const ziel = index + dir;
      if (ziel < 0 || ziel >= e.schritte.length) return e;
      const schritte = [...e.schritte];
      [schritte[index], schritte[ziel]] = [schritte[ziel], schritte[index]];
      return { ...e, schritte };
    });
  }

  /* ── Speichern ────────────────────────────────────────────────────────── */
  async function speichern() {
    if (view.modus !== "editor") return;
    const { entwurf } = view;
    const name = entwurf.name.trim();
    if (!name) {
      setFehler(tx("intern.flows.fehler_name_leer"));
      return;
    }
    if (entwurf.schritte.length === 0) {
      setFehler(tx("intern.flows.fehler_kein_schritt"));
      return;
    }
    for (const s of entwurf.schritte) {
      if (s.typ === "mail" && s.konfig.modus === "frei" && (!s.konfig.betreff.trim() || !s.konfig.text.trim())) {
        setFehler(tx("intern.flows.fehler_mail_unvollstaendig"));
        return;
      }
    }

    setFehler(null);

    if (!konfiguriert) {
      const id = entwurf.id ?? erzeugeId();
      const neuerEintrag: FlowEintrag = { id, name, status: entwurf.status, ausloeser: entwurf.ausloeser, schritte: entwurf.schritte, laufendeAnzahl: 0 };
      setFlows((prev) => {
        const bestehtSchon = prev.some((f) => f.id === id);
        return bestehtSchon ? prev.map((f) => (f.id === id ? { ...neuerEintrag, laufendeAnzahl: f.laufendeAnzahl } : f)) : [neuerEintrag, ...prev];
      });
      schliesseEditor();
      return;
    }

    setSpeichert(true);
    const res = await postFlow({
      aktion: "speichern",
      id: entwurf.id,
      name,
      status: entwurf.status,
      ausloeser: entwurf.ausloeser,
      schritte: entwurf.schritte,
    });
    setSpeichert(false);
    if (!res.ok) {
      setFehler(res.error ?? tx("intern.flows.fehler_speichern"));
      return;
    }
    const id = res.id ?? entwurf.id ?? erzeugeId();
    const neuerEintrag: FlowEintrag = { id, name, status: entwurf.status, ausloeser: entwurf.ausloeser, schritte: entwurf.schritte, laufendeAnzahl: 0 };
    setFlows((prev) => {
      const bestehend = prev.find((f) => f.id === id);
      return bestehend
        ? prev.map((f) => (f.id === id ? { ...neuerEintrag, laufendeAnzahl: f.laufendeAnzahl } : f))
        : [{ ...neuerEintrag, laufendeAnzahl: 0 }, ...prev];
    });
    schliesseEditor();
  }

  if (view.modus === "editor") {
    const { entwurf } = view;
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={schliesseEditor}
            className="text-[13px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            {tx("intern.flows.zurueck_button")}
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-line-subtle bg-white p-5 sm:flex-row sm:items-end sm:gap-6">
          <label className="block flex-1">
            <span className="t-label">{tx("intern.flows.feld_name")}</span>
            <input
              value={entwurf.name}
              onChange={(e) => mitEntwurf((prev) => ({ ...prev, name: e.target.value }))}
              placeholder={tx("intern.flows.feld_name_platzhalter")}
              autoFocus
              className="booking-input mt-1.5 w-full"
            />
          </label>
          <label className="block sm:w-56">
            <span className="t-label">{tx("intern.flows.feld_ausloeser")}</span>
            <select
              value={entwurf.ausloeser}
              onChange={(e) => mitEntwurf((prev) => ({ ...prev, ausloeser: e.target.value as Ausloeser }))}
              className="booking-input mt-1.5 w-full"
            >
              {AUSLOESER_ORDER.map((a) => (
                <option key={a} value={a}>
                  {tx(AUSLOESER_KEY[a])}
                </option>
              ))}
            </select>
          </label>
        </div>

        {fehler && (
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-[13px] text-destructive">{fehler}</p>
            <button type="button" onClick={() => setFehler(null)} className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2">
              {tx("intern.flows.fehler_schliessen")}
            </button>
          </div>
        )}

        <div className="mt-8 max-w-[640px]">
          {entwurf.schritte.length === 0 && (
            <p className="t-small mb-3 !text-ink-dim">{tx("intern.flows.kette_leer_text")}</p>
          )}

          <SchrittEinfueger
            offen={einfuegerBei === 0}
            onToggle={() => setEinfuegerBei((v) => (v === 0 ? null : 0))}
            onWaehlen={(t) => schrittEinfuegen(0, t)}
            tx={tx}
          />

          {entwurf.schritte.map((schritt, i) => (
            <div key={i}>
              <SchrittKarte
                schritt={schritt}
                index={i}
                gesamt={entwurf.schritte.length}
                tx={tx}
                onUpdate={(s) => schrittAktualisieren(i, s)}
                onMove={(dir) => schrittVerschieben(i, dir)}
                onRemove={() => schrittEntfernen(i)}
              />
              <SchrittEinfueger
                offen={einfuegerBei === i + 1}
                onToggle={() => setEinfuegerBei((v) => (v === i + 1 ? null : i + 1))}
                onWaehlen={(t) => schrittEinfuegen(i + 1, t)}
                tx={tx}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2.5">
          <button type="button" onClick={speichern} disabled={speichert} className={BTN_PRIMARY}>
            {tx("intern.flows.speichern_button")}
          </button>
          <button type="button" onClick={schliesseEditor} className={BTN_QUIET}>
            {tx("intern.flows.abbrechen_button")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
        <button type="button" onClick={oeffneNeu} className={BTN_PRIMARY}>
          {tx("intern.flows.neu_button")}
        </button>
      </div>

      {fehler && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-[13px] text-destructive">{fehler}</p>
          <button type="button" onClick={() => setFehler(null)} className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2">
            {tx("intern.flows.fehler_schliessen")}
          </button>
        </div>
      )}

      {flows.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
          <KetteGlyph />
          <p className="t-body mt-4 max-w-[26rem]">{tx("intern.flows.liste_leer_text")}</p>
          <button type="button" onClick={oeffneNeu} className={`${BTN_PRIMARY} mt-5`}>
            {tx("intern.flows.liste_leer_cta")}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flows.map((flow) => (
            <FlowKarte
              key={flow.id}
              flow={flow}
              tx={tx}
              onOeffnen={() => oeffneBearbeiten(flow)}
              onStatusAendern={(status) => statusAendern(flow.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
