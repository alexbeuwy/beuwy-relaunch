"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  GitBranch,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Workflow,
  X,
} from "lucide-react";
import {
  mailFunnelBestaetigung,
  mailTerminBestaetigung,
  mailTerminErinnerung,
  mailNachfass,
  mailToolErgebnis,
  mailKontoCode,
} from "@/lib/email-vorlagen";
import { emailLayout } from "@/lib/email";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * FlowEditor — der komplette interaktive Teil von /intern/flows (R5 Leaf
 * G4, CRM-UX-Politur Leaf U4). Eine Datei für Übersicht UND Editor (kein
 * Router-Wechsel, kein eigener [id]-Route-Ordner — außerhalb der für
 * dieses Leaf zugewiesenen Dateiliste), weil beides denselben Client-State
 * teilt: im Demo-Modus (konfiguriert=false) bleiben neu angelegte/
 * geänderte Flows sichtbar, solange die Seite nicht neu geladen wird — ein
 * echter Seitenwechsel würde das serverseitig gerenderte Demo-Set
 * zurückholen und die Änderung verschlucken (KanbanBoard.tsx macht es aus
 * demselben Grund genauso: alles bleibt eine Client-Komponente ohne
 * Navigation).
 *
 * LEAF U4 (27.08) — shadcn-Fundament auf Flows angewendet:
 * - Der Status-Umschalter auf der Übersichtskarte ist jetzt ui/switch
 *   (an = aktiv, aus = pausiert — "Entwurf" bleibt als Punkt+Label neben
 *   dem Switch sichtbar, ihn per Switch zu setzen ergäbe kein sinnvolles
 *   Boolean; ein "Entwurf"-Flow lässt sich direkt auf aktiv/pausiert
 *   schalten, exakt wie zuvor über die Pillen). Der Auslöser ist jetzt
 *   ui/badge.
 * - "Flow anlegen" öffnet zuerst NeuFlowDialog (ui/dialog, Name +
 *   Auslöser) — erst danach entsteht der Editor mit der leeren
 *   Schritt-Kette. Eine bestehende Karte "Bearbeiten" geht weiterhin
 *   direkt in den vollen Editor (Name/Auslöser bleiben dort inline
 *   änderbar, der Dialog ist nur das freundlichere Einstiegstor für neue
 *   Flows).
 * - Jeder Schritt ist jetzt eine kompakte Zusammenfassungs-Karte;
 *   "Bearbeiten" öffnet SchrittBearbeitenDialog (ui/dialog) mit den
 *   vollen Feldern (Mail/Warten/Bedingung) + Live-Vorschau, "Übernehmen"
 *   schreibt zurück in die Kette.
 * - Der "+"-Einfüger zwischen zwei Schritten bietet den Typ jetzt als
 *   ui/select statt drei Pillen an.
 * - Die Mail-Vorschau (im Bearbeiten-Dialog) ist ui/tabs: Vorschau
 *   (iframe, wie bisher) / Rohtext (das erzeugte HTML als <pre>).
 * - Schritt-Karten animieren über motion/react: Hinzufügen poppt rein
 *   (--duration-fast, --ease-bounce — ein kleiner Erfolgsmoment),
 *   Entfernen ist spürbar schneller und ohne Überschwingen
 *   (--duration-quick, --ease-smooth-out), Umsortieren federt über
 *   layout (--duration-slow). useReducedMotion() schaltet alle
 *   Transform-Animationen ab. Stabile Schritt-Keys (SchrittMitKey, siehe
 *   unten) statt Array-Index, sonst würde AnimatePresence beim Entfernen
 *   die falsche Karte für die Exit-Animation halten.
 * - Handgezeichnete Pfeil-/Plus-/Ketten-Glyphen sind lucide-react
 *   gewichen (Chevron/Plus/Workflow), Schritt-Typen tragen ihr Icon
 *   (Mail/Clock/GitBranch), SLA-freie CRM-Konvention aus KanbanBoard.tsx.
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

/** Motion-Tokens (globals.css) als Werte für motion/react — dieselbe
 *  Übersetzung wie EASE_SMOOTH_OUT in KanbanBoard.tsx. */
const EASE_SMOOTH_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_BOUNCE: [number, number, number, number] = [0.34, 1.36, 0.64, 1];

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

function typLabel(typ: FlowSchritt["typ"], tx: (key: string) => string): string {
  if (typ === "mail") return tx("intern.flows.schritt_typ_mail");
  if (typ === "warten") return tx("intern.flows.schritt_typ_warten");
  return tx("intern.flows.schritt_typ_bedingung");
}

/** Kurze Ein-Zeilen-Zusammenfassung für die Schritt-Karte, seit die vollen
 *  Felder in den Bearbeiten-Dialog gewandert sind. */
function schrittZusammenfassung(schritt: FlowSchritt, tx: (key: string) => string): string {
  if (schritt.typ === "mail") {
    return schritt.konfig.modus === "vorlage"
      ? tx(VORLAGE_KEY[schritt.konfig.vorlageId])
      : schritt.konfig.betreff.trim() || tx("intern.flows.schritt_zusammenfassung_ohne_betreff");
  }
  if (schritt.typ === "warten") {
    const treffer = WARTEN_PILLS.find((p) => p.stunden === schritt.konfig.stunden);
    return treffer ? tx(treffer.key) : `${schritt.konfig.stunden} Std.`;
  }
  return `${tx("intern.flows.bedingung_feld_status")} = ${BEDINGUNG_STATUS_LABEL[schritt.konfig.wert] ?? schritt.konfig.wert}`;
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
          <Badge
            variant="outline"
            className="mt-1.5 border-line-subtle bg-bg-elevated text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted"
          >
            {tx(AUSLOESER_KEY[flow.ausloeser])}
          </Badge>
        </div>
        <button
          type="button"
          onClick={onOeffnen}
          className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-medium text-ink-muted underline decoration-transparent underline-offset-2 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream hover:decoration-line-medium"
        >
          <Pencil size={12} aria-hidden />
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
        <div className="flex items-center gap-2.5">
          <Switch
            checked={flow.status === "aktiv"}
            onCheckedChange={(checked) => onStatusAendern(checked ? "aktiv" : "pausiert")}
            aria-label={tx(STATUS_KEY[flow.status])}
          />
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[flow.status]}`} aria-hidden />
            {tx(STATUS_KEY[flow.status])}
          </span>
        </div>
        <span className="t-data tnum shrink-0 !text-ink-dim">
          {flow.laufendeAnzahl} {tx("intern.flows.laeufe_label")}
        </span>
      </div>
    </div>
  );
}

/* ── Editor: ein Schritt-Kärtchen (Zusammenfassung, volle Felder leben
   jetzt im SchrittBearbeitenDialog) ─────────────────────────────────── */
function SchrittTypIcon({ typ }: { typ: FlowSchritt["typ"] }) {
  if (typ === "mail") return <Mail size={14} aria-hidden />;
  if (typ === "warten") return <Clock size={14} aria-hidden />;
  return <GitBranch size={14} aria-hidden />;
}

function SchrittKarte({
  schritt,
  index,
  gesamt,
  tx,
  onEdit,
  onMove,
  onRemove,
}: {
  schritt: FlowSchritt;
  index: number;
  gesamt: number;
  tx: (key: string) => string;
  onEdit: () => void;
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

  return (
    <div className="rounded-2xl border border-line-subtle bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onEdit} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-akzent-wash text-[11px] font-bold text-ink-cream">
            {index + 1}
          </span>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-subtle text-ink-muted">
            <SchrittTypIcon typ={schritt.typ} />
          </span>
          <span className="min-w-0">
            <span className="block text-[13.5px] font-semibold text-ink-cream">{typLabel(schritt.typ, tx)}</span>
            <span className="block truncate text-[12px] text-ink-muted">{schrittZusammenfassung(schritt, tx)}</span>
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            aria-label={tx("intern.flows.schritt_hoch_label")}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream disabled:opacity-30 disabled:hover:text-ink-dim"
          >
            <ChevronUp size={15} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === gesamt - 1}
            aria-label={tx("intern.flows.schritt_runter_label")}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream disabled:opacity-30 disabled:hover:text-ink-dim"
          >
            <ChevronDown size={15} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onEdit}
            aria-label={tx("intern.flows.schritt_bearbeiten_button")}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <Pencil size={14} aria-hidden />
          </button>
          {!entfernenArm ? (
            <button
              type="button"
              onClick={arm}
              aria-label={tx("intern.flows.schritt_entfernen_label")}
              className="grid h-7 w-7 place-items-center rounded-md text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 size={14} aria-hidden />
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
        <Tabs defaultValue="vorschau" className="mt-2 gap-2">
          <TabsList className="h-8">
            <TabsTrigger value="vorschau" className="text-[12px]">
              {tx("intern.flows.mail_tab_vorschau")}
            </TabsTrigger>
            <TabsTrigger value="rohtext" className="text-[12px]">
              {tx("intern.flows.mail_tab_rohtext")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="vorschau">
            <div className="hairline overflow-hidden rounded-xl border bg-white">
              <iframe title={tx("intern.flows.mail_vorschau_label")} srcDoc={vorschau.html} sandbox="" className="h-[280px] w-full" />
            </div>
          </TabsContent>
          <TabsContent value="rohtext">
            <pre className="h-[280px] overflow-auto rounded-xl border border-line-subtle bg-bg-elevated p-3 text-[11px] leading-relaxed text-ink-muted">
              <code>{vorschau.html}</code>
            </pre>
          </TabsContent>
        </Tabs>
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

/* ── Dialog: ein Schritt bearbeiten ──────────────────────────────────── */
function SchrittBearbeitenDialog({
  schritt,
  tx,
  onAbbrechen,
  onSpeichern,
}: {
  schritt: FlowSchritt;
  tx: (key: string) => string;
  onAbbrechen: () => void;
  onSpeichern: (schritt: FlowSchritt) => void;
}) {
  const [entwurf, setEntwurf] = useState<FlowSchritt>(schritt);
  const [fehler, setFehler] = useState<string | null>(null);

  function uebernehmen() {
    if (entwurf.typ === "mail" && entwurf.konfig.modus === "frei" && (!entwurf.konfig.betreff.trim() || !entwurf.konfig.text.trim())) {
      setFehler(tx("intern.flows.fehler_mail_unvollstaendig"));
      return;
    }
    onSpeichern(entwurf);
  }

  return (
    <Dialog
      open
      onOpenChange={(offen) => {
        if (!offen) onAbbrechen();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-lg gap-0 rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)] sm:max-w-lg"
      >
        <DialogHeader className="flex-row items-start justify-between gap-4 text-left">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-cream">
              <SchrittTypIcon typ={entwurf.typ} />
            </span>
            <DialogTitle className="text-[15px] font-semibold text-ink-cream">
              {tx("intern.flows.schritt_dialog_titel")} · {typLabel(entwurf.typ, tx)}
            </DialogTitle>
          </div>
          <DialogClose
            aria-label={tx("intern.flows.schritt_dialog_abbrechen")}
            className="-m-2 -mt-1 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <X size={16} aria-hidden />
          </DialogClose>
        </DialogHeader>

        <div className="mt-4 max-h-[65vh] overflow-y-auto pr-0.5">
          {entwurf.typ === "mail" && (
            <MailFelder mail={entwurf.konfig} tx={tx} onChange={(konfig) => setEntwurf({ typ: "mail", konfig })} />
          )}
          {entwurf.typ === "warten" && (
            <WartenFelder warten={entwurf.konfig} tx={tx} onChange={(konfig) => setEntwurf({ typ: "warten", konfig })} />
          )}
          {entwurf.typ === "bedingung" && (
            <BedingungFelder bedingung={entwurf.konfig} tx={tx} onChange={(konfig) => setEntwurf({ typ: "bedingung", konfig })} />
          )}
        </div>

        {fehler && <p className="mt-3 text-[12.5px] text-destructive">{fehler}</p>}

        <div className="mt-5 flex items-center gap-2">
          <button type="button" onClick={uebernehmen} className={BTN_PRIMARY}>
            {tx("intern.flows.schritt_dialog_speichern")}
          </button>
          <DialogClose asChild>
            <button type="button" className={BTN_QUIET}>
              {tx("intern.flows.schritt_dialog_abbrechen")}
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── "+" -Einfüger zwischen zwei Schritt-Karten — Typ-Wahl als ui/select ── */
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
  const reduceMotion = useReducedMotion();
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
        <Plus size={14} aria-hidden />
      </button>
      <AnimatePresence>
        {offen && (
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, transition: reduceMotion ? { duration: 0 } : { duration: 0.15, ease: EASE_SMOOTH_OUT } }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, transition: { duration: 0.1, ease: EASE_SMOOTH_OUT } }}
            className="relative z-10"
          >
            <Select onValueChange={(t) => onWaehlen(t as FlowSchritt["typ"])}>
              <SelectTrigger className="h-8 w-[180px] rounded-full border-line-medium bg-white text-[12.5px]">
                <SelectValue placeholder={tx("intern.flows.schritt_typ_platzhalter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mail">
                  <Mail size={14} aria-hidden />
                  {tx("intern.flows.schritt_typ_mail")}
                </SelectItem>
                <SelectItem value="warten">
                  <Clock size={14} aria-hidden />
                  {tx("intern.flows.schritt_typ_warten")}
                </SelectItem>
                <SelectItem value="bedingung">
                  <GitBranch size={14} aria-hidden />
                  {tx("intern.flows.schritt_typ_bedingung")}
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Dialog: neuer Flow (Name + Auslöser), bevor der Editor mit der leeren
   Schritt-Kette aufgeht. Eine bestehende Karte "Bearbeiten" umgeht diesen
   Dialog und geht direkt in den Editor (Name/Auslöser bleiben dort inline
   änderbar). ─────────────────────────────────────────────────────────── */
function NeuFlowDialog({
  tx,
  onAbbrechen,
  onWeiter,
}: {
  tx: (key: string) => string;
  onAbbrechen: () => void;
  onWeiter: (name: string, ausloeser: Ausloeser) => void;
}) {
  const [name, setName] = useState("");
  const [ausloeser, setAusloeser] = useState<Ausloeser>("lead_neu");
  const [fehler, setFehler] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    if (!n) {
      setFehler(tx("intern.flows.fehler_name_leer"));
      return;
    }
    onWeiter(n, ausloeser);
  }

  return (
    <Dialog
      open
      onOpenChange={(offen) => {
        if (!offen) onAbbrechen();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)] sm:max-w-md"
      >
        <DialogHeader className="flex-row items-start justify-between gap-4 text-left">
          <DialogTitle className="text-[15px] font-semibold text-ink-cream">{tx("intern.flows.dialog_neu_titel")}</DialogTitle>
          <DialogClose
            aria-label={tx("intern.flows.dialog_abbrechen")}
            className="-m-2 -mt-1 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <X size={16} aria-hidden />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="t-label">{tx("intern.flows.feld_name")}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tx("intern.flows.feld_name_platzhalter")}
              autoFocus
              className="booking-input mt-1.5 w-full"
            />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.flows.feld_ausloeser")}</span>
            <select value={ausloeser} onChange={(e) => setAusloeser(e.target.value as Ausloeser)} className="booking-input mt-1.5 w-full">
              {AUSLOESER_ORDER.map((a) => (
                <option key={a} value={a}>
                  {tx(AUSLOESER_KEY[a])}
                </option>
              ))}
            </select>
          </label>
          {fehler && <p className="text-[12.5px] text-destructive">{fehler}</p>}
          <div className="mt-1 flex items-center gap-2">
            <button type="submit" className={BTN_PRIMARY}>
              {tx("intern.flows.dialog_weiter")}
            </button>
            <DialogClose asChild>
              <button type="button" className={BTN_QUIET}>
                {tx("intern.flows.dialog_abbrechen")}
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ── Ein animierter Block: Schritt-Karte + der Einfüger direkt danach.
   Stabiler Key (SchrittMitKey.key) statt Array-Index, sonst hielte
   AnimatePresence beim Entfernen die falsche Karte für die Exit-Animation. ── */
function SchrittBlock({
  schritt,
  index,
  gesamt,
  offenEinfueger,
  tx,
  onEdit,
  onMove,
  onRemove,
  onToggleEinfueger,
  onWaehlenEinfueger,
}: {
  schritt: FlowSchritt;
  index: number;
  gesamt: number;
  offenEinfueger: boolean;
  tx: (key: string) => string;
  onEdit: () => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onToggleEinfueger: () => void;
  onWaehlenEinfueger: (typ: FlowSchritt["typ"]) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_BOUNCE } }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: EASE_SMOOTH_OUT } }}
      transition={{ layout: { duration: 0.4, ease: EASE_SMOOTH_OUT } }}
    >
      <SchrittKarte schritt={schritt} index={index} gesamt={gesamt} tx={tx} onEdit={onEdit} onMove={onMove} onRemove={onRemove} />
      <SchrittEinfueger offen={offenEinfueger} onToggle={onToggleEinfueger} onWaehlen={onWaehlenEinfueger} tx={tx} />
    </motion.div>
  );
}

/* ── Interner Entwurfs-Typ: Schritte tragen im Editor eine stabile Id für
   React-/AnimatePresence-Keys. Nach außen (Speichern, initiale Übernahme
   aus einem bestehenden Flow) bleibt FlowSchritt[] ohne Id die einzige
   Form — der Kontrakt mit page.tsx/API bleibt unverändert. ─────────────── */
type SchrittMitKey = { key: string; schritt: FlowSchritt };
type FlowEntwurf = { id: string | null; name: string; status: FlowStatus; ausloeser: Ausloeser; schritte: SchrittMitKey[] };
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
  const [neuDialogOffen, setNeuDialogOffen] = useState(false);
  const [bearbeiteIndex, setBearbeiteIndex] = useState<number | null>(null);

  function oeffneNeu() {
    setFehler(null);
    setNeuDialogOffen(true);
  }

  function neuWeiter(name: string, ausloeser: Ausloeser) {
    setNeuDialogOffen(false);
    setView({ modus: "editor", entwurf: { id: null, name, status: "entwurf", ausloeser, schritte: [] } });
  }

  function oeffneBearbeiten(flow: FlowEintrag) {
    setFehler(null);
    setView({
      modus: "editor",
      entwurf: {
        id: flow.id,
        name: flow.name,
        status: flow.status,
        ausloeser: flow.ausloeser,
        schritte: flow.schritte.map((schritt) => ({ key: erzeugeId(), schritt })),
      },
    });
  }

  function schliesseEditor() {
    setEinfuegerBei(null);
    setBearbeiteIndex(null);
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
      schritte.splice(index, 0, { key: erzeugeId(), schritt: defaultSchritt(typ) });
      return { ...e, schritte };
    });
    setEinfuegerBei(null);
  }

  function schrittAktualisieren(index: number, schritt: FlowSchritt) {
    mitEntwurf((e) => ({ ...e, schritte: e.schritte.map((s, i) => (i === index ? { ...s, schritt } : s)) }));
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
    const schritte = entwurf.schritte.map((s) => s.schritt);
    for (const s of schritte) {
      if (s.typ === "mail" && s.konfig.modus === "frei" && (!s.konfig.betreff.trim() || !s.konfig.text.trim())) {
        setFehler(tx("intern.flows.fehler_mail_unvollstaendig"));
        return;
      }
    }

    setFehler(null);

    if (!konfiguriert) {
      const id = entwurf.id ?? erzeugeId();
      const neuerEintrag: FlowEintrag = { id, name, status: entwurf.status, ausloeser: entwurf.ausloeser, schritte, laufendeAnzahl: 0 };
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
      schritte,
    });
    setSpeichert(false);
    if (!res.ok) {
      setFehler(res.error ?? tx("intern.flows.fehler_speichern"));
      return;
    }
    const id = res.id ?? entwurf.id ?? erzeugeId();
    const neuerEintrag: FlowEintrag = { id, name, status: entwurf.status, ausloeser: entwurf.ausloeser, schritte, laufendeAnzahl: 0 };
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
    const bearbeiteterSchritt = bearbeiteIndex !== null ? entwurf.schritte[bearbeiteIndex] : null;
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

          <AnimatePresence initial={false}>
            {entwurf.schritte.map((s, i) => (
              <SchrittBlock
                key={s.key}
                schritt={s.schritt}
                index={i}
                gesamt={entwurf.schritte.length}
                offenEinfueger={einfuegerBei === i + 1}
                tx={tx}
                onEdit={() => setBearbeiteIndex(i)}
                onMove={(dir) => schrittVerschieben(i, dir)}
                onRemove={() => schrittEntfernen(i)}
                onToggleEinfueger={() => setEinfuegerBei((v) => (v === i + 1 ? null : i + 1))}
                onWaehlenEinfueger={(t) => schrittEinfuegen(i + 1, t)}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-2.5">
          <button type="button" onClick={speichern} disabled={speichert} className={BTN_PRIMARY}>
            {tx("intern.flows.speichern_button")}
          </button>
          <button type="button" onClick={schliesseEditor} className={BTN_QUIET}>
            {tx("intern.flows.abbrechen_button")}
          </button>
        </div>

        {bearbeiteterSchritt && (
          <SchrittBearbeitenDialog
            schritt={bearbeiteterSchritt.schritt}
            tx={tx}
            onAbbrechen={() => setBearbeiteIndex(null)}
            onSpeichern={(neu) => {
              if (bearbeiteIndex !== null) schrittAktualisieren(bearbeiteIndex, neu);
              setBearbeiteIndex(null);
            }}
          />
        )}
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
          <Workflow size={34} className="text-ink-dim" aria-hidden />
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

      {neuDialogOffen && <NeuFlowDialog tx={tx} onAbbrechen={() => setNeuDialogOffen(false)} onWeiter={neuWeiter} />}
    </div>
  );
}
