"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import {
  Clock,
  Contact,
  EllipsisVertical,
  Euro,
  GripVertical,
  Kanban as KanbanIcon,
  PencilLine,
  X,
} from "lucide-react";
import type { BwDeal, BwLead } from "@/lib/crm/db";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

/**
 * KanbanBoard — der interaktive Teil von /intern/pipeline (R5 Leaf G2,
 * Kanban-UX-Politur Leaf U2). Client-Komponente, weil Drag & Drop,
 * optimistische Updates und Dialoge Browser-State brauchen; die Seite
 * selbst (page.tsx) bleibt Server-Komponente und liefert nur die
 * geladenen Daten + Studio-Texte rein.
 *
 * Fundament aus dem neuen shadcn-Set (new-york, auf beuwy gemappt):
 * - "Deal anlegen" + der Verlustgrund-Dialog laufen über ui/dialog
 *   (Radix), inkl. eingebauter Escape-/Backdrop-/Fokus-Behandlung statt
 *   der vorherigen handgebauten Keydown-Listener.
 * - Der Verlustgrund selbst ist ui/select, Freitext- und Wertfelder sind
 *   ui/input.
 * - Das Karten-Kontextmenü (⋯) ist ui/dropdown-menu mit "Verschieben
 *   nach …" als echtem Untermenü (Radix übernimmt Positionierung/
 *   Kollisionserkennung, keine manuelle Koordinatenrechnung mehr nötig).
 * - Icons konsequent lucide-react, size/strokeWidth nach Konvention,
 *   Farbe erbt über currentColor.
 * - motion/react animiert Karten (layout + layoutId — layoutId ist der
 *   Teil, der eine Karte beim Spaltenwechsel tatsächlich "mitnimmt",
 *   weil sie dabei aus dem einen Spalten-.map() verschwindet und im
 *   anderen neu entsteht; layout allein federt nur Positionswechsel
 *   innerhalb derselben Spalte ab). Neue Karten poppen kurz rein.
 *   useReducedMotion() schaltet alle Transform-Animationen ab.
 * - toast() aus sonner meldet jeden Statuswechsel und jedes Anlegen,
 *   Statuswechsel mit Rückgängig-Action (erneuter Status-Call zurück).
 *
 * Native HTML5-Drag-&-Drop (draggable/onDragStart/onDragEnd) bleibt auf
 * einem schlichten <div>, NICHT auf dem motion.div: motion-Komponenten
 * überschreiben onDragStart/onDragEnd mit ihrer eigenen Pointer-Gesten-
 * Signatur (event, PanInfo), die mit nativen DragEvents nicht kompatibel
 * ist. Der motion.div sitzt deshalb innen und übernimmt nur die Optik +
 * die layout-Animation.
 *
 * Demo-Modus (konfiguriert=false): Änderungen bleiben rein im Browser-
 * State — kein Fetch, kein Rollback nötig, das Board fühlt sich trotzdem
 * voll bedienbar an. Die gelbe Karte auf der Seite erklärt das ehrlich.
 */

export type KanbanDeal = BwDeal & { kontaktName: string; kontaktEmail: string };

const STATUS_ORDER = ["neu", "kontaktiert", "termin", "angebot", "kunde", "verloren"] as const;
type Status = (typeof STATUS_ORDER)[number];

const STATUS_LABELS: Record<Status, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  termin: "Termin",
  angebot: "Angebot",
  kunde: "Kunde",
  verloren: "Verloren",
};

const STATUS_DOT: Record<Status, string> = {
  neu: "bg-ink-dim",
  kontaktiert: "bg-ink-muted",
  termin: "bg-ink-muted",
  angebot: "bg-ink-muted",
  kunde: "bg-akzent",
  verloren: "bg-destructive",
};

/** Ab dieser Standzeit in einer noch offenen Phase färbt sich das Alter-Badge
 *  als Stau-Warnung (Design-Direktive Regel 19: sparsamer Zusatz-Warnton,
 *  keine volle Ampel). "Kunde"/"Verloren" sind Endzustände, keine Warnung. */
const STAU_SCHWELLE_TAGE = 14;
const AKTIVE_STATI: readonly string[] = ["neu", "kontaktiert", "termin", "angebot"];

const VERLUST_GRUENDE = [
  { code: "zu_teuer", labelKey: "intern.pipeline.grund_zu_teuer" },
  { code: "keine_antwort", labelKey: "intern.pipeline.grund_keine_antwort" },
  { code: "wettbewerber", labelKey: "intern.pipeline.grund_wettbewerber" },
  { code: "kein_bedarf", labelKey: "intern.pipeline.grund_kein_bedarf" },
  { code: "anderes", labelKey: "intern.pipeline.grund_anderes" },
] as const;

const EURO = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** Motion-Token --ease-smooth-out (globals.css) als Bezier-Array für motion/react. */
const EASE_SMOOTH_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BTN_PRIMARY =
  "rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98]";
const BTN_QUIET =
  "rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream";

function tageAlt(iso: string): number {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return 0;
  return Math.max(0, Math.floor((Date.now() - dann) / 86_400_000));
}

function erzeugeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `tmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function postDeal(
  body: Record<string, unknown>,
): Promise<{ ok: boolean; id?: string | null; error?: string }> {
  try {
    const res = await fetch("/api/intern-deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string | null; error?: string };
    if (!res.ok || !data.ok) {
      return { ok: false, error: typeof data.error === "string" ? data.error : undefined };
    }
    return { ok: true, id: data.id ?? null };
  } catch {
    return { ok: false, error: undefined };
  }
}

/* ── Wert-Zelle: Klick macht die Karte zum Zahlenfeld, Enter/Blur speichert,
   Escape verwirft. Ein Ref-Flag verhindert Doppel-Commit, wenn Escape den
   Blur selbst auslöst. ─────────────────────────────────────────────────── */
function WertZelle({
  deal,
  editing,
  onStart,
  onCommit,
  onCancel,
}: {
  deal: KanbanDeal;
  editing: boolean;
  onStart: () => void;
  onCommit: (wert: string) => void;
  onCancel: () => void;
}) {
  const abgebrochen = useRef(false);

  if (editing) {
    return (
      <input
        type="number"
        min={0}
        step={100}
        autoFocus
        defaultValue={deal.wert_eur}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={(e) => {
          if (abgebrochen.current) {
            abgebrochen.current = false;
            onCancel();
            return;
          }
          onCommit(e.currentTarget.value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") {
            abgebrochen.current = true;
            e.currentTarget.blur();
          }
        }}
        className="w-24 rounded-md border border-line-medium bg-white px-1.5 py-0.5 font-mono text-[13.5px] tabular-nums text-ink-cream outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onStart}
      className="font-mono text-[13.5px] font-semibold tabular-nums text-ink-cream underline decoration-transparent underline-offset-2 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:decoration-line-medium"
    >
      {EURO.format(deal.wert_eur || 0)}
    </button>
  );
}

function DealKarte({
  deal,
  dragging,
  wertEditing,
  istNeu,
  onDragStart,
  onDragEnd,
  onWertStart,
  onWertCommit,
  onWertCancel,
  onVerschieben,
  onBearbeiten,
  tx,
}: {
  deal: KanbanDeal;
  dragging: boolean;
  wertEditing: boolean;
  istNeu: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onWertStart: (id: string) => void;
  onWertCommit: (id: string, wert: string) => void;
  onWertCancel: () => void;
  onVerschieben: (id: string, status: Status) => void;
  onBearbeiten: (id: string) => void;
  tx: (key: string) => string;
}) {
  const reduceMotion = useReducedMotion();
  const tage = tageAlt(deal.erstellt);
  const gestaut = AKTIVE_STATI.includes(deal.status) && tage >= STAU_SCHWELLE_TAGE;
  const zielStati = STATUS_ORDER.filter((s) => s !== deal.status);

  return (
    <div
      draggable={!wertEditing}
      onDragStart={(e) => onDragStart(e, deal.id)}
      onDragEnd={onDragEnd}
      className={wertEditing ? "" : "cursor-grab active:cursor-grabbing"}
    >
      {/* motion.div statt native onDrag*-Props: motion überschreibt
          onDragStart/onDragEnd mit seiner eigenen Pointer-Gesten-Signatur
          (event, PanInfo) — mit nativen DragEvents inkompatibel. Native
          Drag & Drop bleibt deshalb auf dem umschließenden <div>, dieser
          motion.div übernimmt nur Optik + layout-Animation. */}
      <motion.div
        layout={!reduceMotion}
        layoutId={reduceMotion ? undefined : deal.id}
        initial={istNeu && !reduceMotion ? { opacity: 0, scale: 0.96 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          layout: { duration: 0.4, ease: EASE_SMOOTH_OUT },
          opacity: { duration: 0.25, ease: EASE_SMOOTH_OUT },
          scale: { duration: 0.25, ease: EASE_SMOOTH_OUT },
        }}
        className={`rounded-xl border border-line-subtle bg-white p-4 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/25 hover:bg-bg-elevated ${dragging ? "opacity-40" : ""}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-1.5">
            <GripVertical size={14} className="mt-0.5 shrink-0 text-ink-dim/40" aria-hidden />
            <p className="min-w-0 truncate text-[14px] font-semibold text-ink-cream">{deal.titel || "Ohne Titel"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={tx("intern.pipeline.karte_menu_label")}
                className="-m-1 shrink-0 rounded-md p-1 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
              >
                <EllipsisVertical size={16} aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{tx("intern.pipeline.menu_verschieben_nach")}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {zielStati.map((status) => (
                    <DropdownMenuItem key={status} onSelect={() => onVerschieben(deal.id, status)}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
                      {STATUS_LABELS[status]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem onSelect={() => onBearbeiten(deal.id)}>
                <PencilLine aria-hidden />
                {tx("intern.pipeline.menu_bearbeiten")}
              </DropdownMenuItem>
              {deal.kontakt_id && (
                <DropdownMenuItem asChild>
                  <Link href={`/intern/kontakte/${deal.kontakt_id}`}>
                    <Contact aria-hidden />
                    {tx("intern.pipeline.menu_kontakt_oeffnen")}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-0.5 truncate text-[12.5px] text-ink-muted">
          {deal.kontaktName || tx("intern.pipeline.kein_kontakt")}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <WertZelle
            deal={deal}
            editing={wertEditing}
            onStart={() => onWertStart(deal.id)}
            onCommit={(wert) => onWertCommit(deal.id, wert)}
            onCancel={onWertCancel}
          />
          <span className={`inline-flex items-center gap-1 t-data tnum ${gestaut ? "!text-destructive" : "!text-ink-dim"}`}>
            {gestaut && <Clock size={12} aria-hidden />}
            {tage === 0 ? tx("intern.pipeline.heute") : `${tage} Tage`}
          </span>
        </div>
        {deal.status === "verloren" && deal.verlust_grund && (
          <p className="mt-2 truncate text-[11.5px] text-ink-dim">{deal.verlust_grund}</p>
        )}
      </motion.div>
    </div>
  );
}

function LeadKarte({ lead, onZuDeal, tx }: { lead: BwLead; onZuDeal: () => void; tx: (key: string) => string }) {
  return (
    <div className="rounded-xl border border-line-subtle bg-white p-3.5">
      <p className="truncate text-[13.5px] font-semibold text-ink-cream">
        {lead.name || lead.email || "Ohne Namen"}
      </p>
      {lead.firma && <p className="mt-0.5 truncate text-[12px] text-ink-muted">{lead.firma}</p>}
      <p className="t-data tnum mt-2 !text-ink-dim">{tageAlt(lead.erstellt)} Tage</p>
      <button
        type="button"
        onClick={onZuDeal}
        className="mt-3 w-full rounded-full border border-line-subtle px-3 py-1.5 text-[12px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:bg-bg-elevated hover:text-ink-cream"
      >
        {tx("intern.pipeline.zu_deal_button")}
      </button>
    </div>
  );
}

/* ── Dialog: neuer Deal (auch für "Zu Deal machen" aus Unqualifiziert) ──
   ui/dialog übernimmt Escape/Backdrop-Klick/Fokusfalle selbst — offen
   bleibt die Komponente immer (open), das Schließen läuft komplett über
   onOpenChange → onAbbrechen. ─────────────────────────────────────────── */
function NeuDealDialog({
  initial,
  konfiguriert,
  tx,
  onAbbrechen,
  onGespeichert,
}: {
  initial: { leadId: string | null; titel: string; email: string };
  konfiguriert: boolean;
  tx: (key: string) => string;
  onAbbrechen: () => void;
  onGespeichert: (d: { id: string; titel: string; wert: number; kontaktEmail: string; leadId: string | null }) => void;
}) {
  const [titel, setTitel] = useState(initial.titel);
  const [wert, setWert] = useState("");
  const [email, setEmail] = useState(initial.email);
  const [speichert, setSpeichert] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const titelTrim = titel.trim();
    const emailTrim = email.trim().toLowerCase();
    if (!titelTrim) {
      setFehler(tx("intern.pipeline.fehler_titel_leer"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      setFehler(tx("intern.pipeline.fehler_email"));
      return;
    }
    const wertZahl = Math.max(0, Number(wert.replace(",", ".")) || 0);

    if (!konfiguriert) {
      onGespeichert({ id: erzeugeId(), titel: titelTrim, wert: wertZahl, kontaktEmail: emailTrim, leadId: initial.leadId });
      return;
    }

    setSpeichert(true);
    setFehler(null);
    const res = await postDeal({
      aktion: "anlegen",
      titel: titelTrim,
      wert: wertZahl,
      kontaktEmail: emailTrim,
      leadId: initial.leadId,
    });
    if (!res.ok) {
      setFehler(res.error ?? tx("intern.pipeline.fehler_speichern"));
      setSpeichert(false);
      return;
    }
    onGespeichert({ id: res.id ?? erzeugeId(), titel: titelTrim, wert: wertZahl, kontaktEmail: emailTrim, leadId: initial.leadId });
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
          <DialogTitle className="text-[15px] font-semibold text-ink-cream">
            {tx("intern.pipeline.dialog_neu_titel")}
          </DialogTitle>
          <DialogClose
            aria-label={tx("intern.pipeline.dialog_abbrechen")}
            className="-m-2 -mt-1 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <X size={16} aria-hidden />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_titel")}</span>
            <Input value={titel} onChange={(e) => setTitel(e.target.value)} required autoFocus className="mt-1.5 w-full" />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_wert")}</span>
            <Input
              value={wert}
              onChange={(e) => setWert(e.target.value)}
              type="number"
              min={0}
              step={100}
              placeholder="0"
              className="mt-1.5 w-full"
            />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_email")}</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1.5 w-full" />
          </label>
          {fehler && <p className="text-[12.5px] text-destructive">{fehler}</p>}
          <div className="mt-1 flex items-center gap-2">
            <button type="submit" disabled={speichert} className={`${BTN_PRIMARY} disabled:opacity-60`}>
              {tx("intern.pipeline.dialog_speichern")}
            </button>
            <DialogClose asChild>
              <button type="button" className={BTN_QUIET}>
                {tx("intern.pipeline.dialog_abbrechen")}
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ── Dialog: Verlust-Grund vor dem Speichern in "Verloren" ─────────────── */
function VerlorenDialog({
  tx,
  onAbbrechen,
  onSpeichern,
}: {
  tx: (key: string) => string;
  onAbbrechen: () => void;
  onSpeichern: (grundCode: string, notiz: string) => void;
}) {
  const [grund, setGrund] = useState<string | null>(null);
  const [notiz, setNotiz] = useState("");
  const [fehler, setFehler] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!grund) {
      setFehler(tx("intern.pipeline.verloren_fehler_grund"));
      return;
    }
    if (grund === "anderes" && !notiz.trim()) {
      setFehler(tx("intern.pipeline.verloren_fehler_notiz"));
      return;
    }
    onSpeichern(grund, notiz.trim());
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
        className="w-full max-w-sm gap-0 rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)] sm:max-w-sm"
      >
        <DialogHeader className="flex-row items-start justify-between gap-4 text-left">
          <div>
            <DialogTitle className="text-[15px] font-semibold text-ink-cream">
              {tx("intern.pipeline.verloren_titel")}
            </DialogTitle>
            <DialogDescription className="mt-1 text-[12.5px] text-ink-muted">
              {tx("intern.pipeline.verloren_sub")}
            </DialogDescription>
          </div>
          <DialogClose
            aria-label={tx("intern.pipeline.dialog_abbrechen")}
            className="-m-2 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <X size={16} aria-hidden />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <Select value={grund ?? undefined} onValueChange={(wert) => setGrund(wert)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={tx("intern.pipeline.verloren_grund_platzhalter")} />
            </SelectTrigger>
            <SelectContent>
              {VERLUST_GRUENDE.map((g) => (
                <SelectItem key={g.code} value={g.code}>
                  {tx(g.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={notiz}
            onChange={(e) => setNotiz(e.target.value)}
            placeholder={tx("intern.pipeline.verloren_notiz_platzhalter")}
            className="w-full"
          />
          {fehler && <p className="text-[12.5px] text-destructive">{fehler}</p>}
          <div className="mt-1 flex items-center gap-2">
            <button type="submit" className={BTN_PRIMARY}>
              {tx("intern.pipeline.verloren_speichern")}
            </button>
            <DialogClose asChild>
              <button type="button" className={BTN_QUIET}>
                {tx("intern.pipeline.dialog_abbrechen")}
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function KanbanBoard({
  initialDeals,
  initialUnqualifiziert,
  konfiguriert,
  texte,
}: {
  initialDeals: KanbanDeal[];
  initialUnqualifiziert: BwLead[];
  konfiguriert: boolean;
  texte: Record<string, string>;
}) {
  const tx = (key: string) => texte[key] ?? key;

  const [deals, setDeals] = useState<KanbanDeal[]>(initialDeals);
  const [unqualifiziert, setUnqualifiziert] = useState<BwLead[]>(initialUnqualifiziert);
  const [fehler, setFehler] = useState<string | null>(null);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<Status | null>(null);

  const [wertEditFor, setWertEditFor] = useState<string | null>(null);
  const [verlorenDialogFor, setVerlorenDialogFor] = useState<string | null>(null);
  const [neuDialog, setNeuDialog] = useState<{ leadId: string | null; titel: string; email: string } | null>(null);
  /** Ids, die in DIESER Sitzung neu angelegt wurden — nur die bekommen
   *  den Pop-Effekt beim Mounten. Ohne dieses Flag würde beim ersten
   *  Rendern des Boards das ganze initiale Deal-Set gleichzeitig
   *  "reinpoppen", weil motion/react jedes erstmalige Mounten für einen
   *  echten Neuzugang hält. */
  const [neuIds, setNeuIds] = useState<Set<string>>(() => new Set());

  /* ── Status ändern (Drag & Drop oder Kontextmenü) ────────────────────── */
  function requestMove(dealId: string, neuerStatus: Status) {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal || deal.status === neuerStatus) return;
    if (neuerStatus === "verloren") {
      setVerlorenDialogFor(dealId);
      return;
    }
    commitStatus(dealId, neuerStatus);
  }

  function commitStatus(dealId: string, neuerStatus: Status, grundCode?: string, notiz?: string) {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;
    const vorherStatus = deal.status as Status;
    const vorher = deals;
    const grundLabel = grundCode
      ? VERLUST_GRUENDE.find((g) => g.code === grundCode)?.labelKey
      : undefined;
    const verlustText = grundLabel ? [tx(grundLabel), notiz].filter(Boolean).join(": ") : undefined;

    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, status: neuerStatus, verlust_grund: verlustText ?? d.verlust_grund } : d,
      ),
    );
    setFehler(null);

    if (vorherStatus !== neuerStatus) {
      const nachricht = tx("intern.pipeline.toast_verschoben")
        .replace("{titel}", deal.titel || "Deal")
        .replace("{status}", STATUS_LABELS[neuerStatus]);
      toast.success(nachricht, {
        action: {
          label: tx("intern.pipeline.toast_rueckgaengig"),
          onClick: () => commitStatus(dealId, vorherStatus),
        },
      });
    }

    if (!konfiguriert) return;

    void (async () => {
      const res = await postDeal({
        aktion: "status",
        id: dealId,
        status: neuerStatus,
        ...(grundCode ? { verlorenGrund: grundCode, verlorenNotiz: notiz ?? "" } : {}),
      });
      if (!res.ok) {
        setDeals(vorher);
        setFehler(res.error ?? tx("intern.pipeline.fehler_speichern"));
      }
    })();
  }

  /* ── Drag & Drop (nativ, HTML5) ──────────────────────────────────────── */
  function onCardDragStart(e: React.DragEvent, dealId: string) {
    e.dataTransfer.setData("text/plain", dealId);
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(dealId);
  }
  function onCardDragEnd() {
    setDraggingId(null);
    setDragOverStatus(null);
  }
  function onColumnDragOver(e: React.DragEvent, status: Status) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStatus((prev) => (prev === status ? prev : status));
  }
  function onColumnDragLeave(status: Status) {
    setDragOverStatus((prev) => (prev === status ? null : prev));
  }
  function onColumnDrop(e: React.DragEvent, status: Status) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    setDragOverStatus(null);
    setDraggingId(null);
    if (id) requestMove(id, status);
  }

  /* ── Wert-Inline-Edit — dient zugleich als "Bearbeiten" im Kontextmenü:
     Titel/E-Mail haben keine eigene Update-Aktion in /api/intern-deals
     (nur status/wert/anlegen), der Euro-Wert ist das einzige Feld eines
     bestehenden Deals, das sich wirklich ändern lässt. ─────────────────── */
  function commitWert(dealId: string, roh: string) {
    setWertEditFor(null);
    const deal = deals.find((d) => d.id === dealId);
    const wert = Math.max(0, Number(roh.replace(",", ".")) || 0);
    if (!deal || wert === deal.wert_eur) return;

    const vorher = deals;
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, wert_eur: wert } : d)));
    setFehler(null);

    if (!konfiguriert) return;

    void (async () => {
      const res = await postDeal({ aktion: "wert", id: dealId, wert });
      if (!res.ok) {
        setDeals(vorher);
        setFehler(res.error ?? tx("intern.pipeline.fehler_speichern"));
      }
    })();
  }

  /* ── Neuer Deal (manuell oder aus "Zu Deal machen") ──────────────────── */
  function handleNeuGespeichert(neu: { id: string; titel: string; wert: number; kontaktEmail: string; leadId: string | null }) {
    setDeals((prev) => [
      {
        id: neu.id,
        erstellt: new Date().toISOString(),
        kontakt_id: null,
        lead_id: neu.leadId,
        titel: neu.titel,
        wert_eur: neu.wert,
        status: "neu",
        verlust_grund: "",
        erwartet: null,
        kontaktName: neu.kontaktEmail,
        kontaktEmail: neu.kontaktEmail,
      },
      ...prev,
    ]);
    setNeuIds((prev) => new Set(prev).add(neu.id));
    if (neu.leadId) {
      setUnqualifiziert((prev) => prev.filter((l) => l.id !== neu.leadId));
    }
    setNeuDialog(null);
    toast.success(tx("intern.pipeline.toast_angelegt").replace("{titel}", neu.titel));
  }

  const boardLeer = deals.length === 0 && unqualifiziert.length === 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setNeuDialog({ leadId: null, titel: "", email: "" })}
          className={BTN_PRIMARY}
        >
          {tx("intern.pipeline.neu_deal_button")}
        </button>
      </div>

      {fehler && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-[13px] text-destructive">{fehler}</p>
          <button
            type="button"
            onClick={() => setFehler(null)}
            className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2"
          >
            {tx("intern.pipeline.fehler_schliessen")}
          </button>
        </div>
      )}

      {boardLeer ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
          <KanbanIcon size={36} className="text-ink-dim" aria-hidden />
          <p className="t-body mt-4 max-w-[26rem]">{tx("intern.pipeline.board_leer_text")}</p>
          <button
            type="button"
            onClick={() => setNeuDialog({ leadId: null, titel: "", email: "" })}
            className={`${BTN_PRIMARY} mt-5`}
          >
            {tx("intern.pipeline.board_leer_cta")}
          </button>
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-4">
          {/* ── Unqualifiziert: Leads ohne Deal ─────────────────────────── */}
          <div className="w-[220px] shrink-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="t-label">{tx("intern.pipeline.spalte_unqualifiziert")}</p>
              <span className="t-data tnum !text-ink-dim">{unqualifiziert.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {unqualifiziert.length === 0 ? (
                <div className="rounded-xl border border-dashed border-line-subtle px-3 py-8 text-center">
                  <p className="t-small !text-ink-dim">{tx("intern.pipeline.unqualifiziert_leer")}</p>
                </div>
              ) : (
                unqualifiziert.map((lead) => (
                  <LeadKarte
                    key={lead.id}
                    lead={lead}
                    onZuDeal={() =>
                      setNeuDialog({ leadId: lead.id, titel: lead.firma || lead.name || "", email: lead.email })
                    }
                    tx={tx}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── Sechs Deal-Spalten ───────────────────────────────────────── */}
          {STATUS_ORDER.map((status) => {
            const spaltenDeals = deals.filter((d) => d.status === status);
            const summe = spaltenDeals.reduce((s, d) => s + (d.wert_eur || 0), 0);
            const istOver = dragOverStatus === status;
            return (
              <div key={status} className="w-[300px] shrink-0">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
                    <p className="t-label">{STATUS_LABELS[status]}</p>
                  </div>
                  <span className="flex items-baseline gap-2">
                    <span className="t-data tnum !text-ink-dim">{spaltenDeals.length}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11.5px] tabular-nums text-ink-dim">
                      <Euro size={12} aria-hidden />
                      {EURO.format(summe)}
                    </span>
                  </span>
                </div>
                <div
                  onDragOver={(e) => onColumnDragOver(e, status)}
                  onDragLeave={() => onColumnDragLeave(status)}
                  onDrop={(e) => onColumnDrop(e, status)}
                  className={`flex min-h-20 flex-col gap-3 rounded-2xl p-1.5 transition-colors ease-(--ease-smooth-out) ${
                    // Asymmetrische Ein-/Ausblendzeit: Tailwind übernimmt für
                    // eine laufende Transition die Dauer aus der jeweils
                    // NEUEN (Ziel-)Klasse — dadurch wird das Highlight beim
                    // Reindraggen mit --duration-quick weich eingeblendet
                    // und beim Rausdraggen mit --duration-fast wieder aus.
                    istOver
                      ? "duration-(--duration-quick) bg-akzent-wash/50 ring-1 ring-inset ring-akzent"
                      : "duration-(--duration-fast)"
                  }`}
                >
                  {spaltenDeals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-line-subtle px-4 py-8 text-center">
                      <p className="t-small !text-ink-dim">{tx("intern.pipeline.spalte_leer")}</p>
                    </div>
                  ) : (
                    spaltenDeals.map((deal) => (
                      <DealKarte
                        key={deal.id}
                        deal={deal}
                        dragging={draggingId === deal.id}
                        wertEditing={wertEditFor === deal.id}
                        istNeu={neuIds.has(deal.id)}
                        onDragStart={onCardDragStart}
                        onDragEnd={onCardDragEnd}
                        onWertStart={setWertEditFor}
                        onWertCommit={commitWert}
                        onWertCancel={() => setWertEditFor(null)}
                        onVerschieben={requestMove}
                        onBearbeiten={setWertEditFor}
                        tx={tx}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {verlorenDialogFor && (
        <VerlorenDialog
          tx={tx}
          onAbbrechen={() => setVerlorenDialogFor(null)}
          onSpeichern={(grundCode, notiz) => {
            commitStatus(verlorenDialogFor, "verloren", grundCode, notiz);
            setVerlorenDialogFor(null);
          }}
        />
      )}

      {neuDialog && (
        <NeuDealDialog
          initial={neuDialog}
          konfiguriert={konfiguriert}
          tx={tx}
          onAbbrechen={() => setNeuDialog(null)}
          onGespeichert={handleNeuGespeichert}
        />
      )}
    </div>
  );
}
