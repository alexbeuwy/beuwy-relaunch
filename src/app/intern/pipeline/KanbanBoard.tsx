"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BwDeal, BwLead } from "@/lib/crm/db";

/**
 * KanbanBoard — der interaktive Teil von /intern/pipeline (R5 Leaf G2).
 * Client-Komponente, weil Drag & Drop, optimistische Updates und Dialoge
 * Browser-State brauchen; die Seite selbst (page.tsx) bleibt Server-
 * Komponente und liefert nur die geladenen Daten + Studio-Texte rein.
 *
 * Muster aus der Design-Direktive (docs/redesign/R5-PORTGUT.md):
 * optimistisches Update mit Rollback (Regel 9), Zwei-Klick/Dialog statt
 * window.confirm() für die destruktive "Verloren"-Entscheidung (Regel 10),
 * Leerzustand mit Icon+Satz+Aktion (Regel 7), Zahlen konsequent
 * GeistMono + tabular-nums (Regel 18), Motion nur über die bestehenden
 * Tokens (Regel 16).
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

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import (Konvention aus
   src/components/MaklerElemente.tsx) ─────────────────────────────────── */

function DreiPunkte() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="8" cy="3.2" r="1.35" />
      <circle cx="8" cy="8" r="1.35" />
      <circle cx="8" cy="12.8" r="1.35" />
    </svg>
  );
}

function Kreuz() {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M3.5 3.5l10 10M13.5 3.5l-10 10" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="var(--ink-dim)" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="7" width="9" height="26" rx="3" />
      <rect x="15.5" y="7" width="9" height="18" rx="3" />
      <rect x="27" y="7" width="9" height="22" rx="3" />
    </svg>
  );
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
  onDragStart,
  onDragEnd,
  onMenuOpen,
  onWertStart,
  onWertCommit,
  onWertCancel,
  tx,
}: {
  deal: KanbanDeal;
  dragging: boolean;
  wertEditing: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onMenuOpen: (e: MouseEvent, id: string) => void;
  onWertStart: (id: string) => void;
  onWertCommit: (id: string, wert: string) => void;
  onWertCancel: () => void;
  tx: (key: string) => string;
}) {
  const tage = tageAlt(deal.erstellt);
  const gestaut = AKTIVE_STATI.includes(deal.status) && tage >= STAU_SCHWELLE_TAGE;

  return (
    <div
      draggable={!wertEditing}
      onDragStart={(e) => onDragStart(e, deal.id)}
      onDragEnd={onDragEnd}
      className={`rounded-xl border border-line-subtle bg-white p-4 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/25 hover:bg-bg-elevated ${wertEditing ? "" : "cursor-grab active:cursor-grabbing"} ${dragging ? "opacity-40" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 truncate text-[14px] font-semibold text-ink-cream">{deal.titel || "Ohne Titel"}</p>
        <button
          type="button"
          aria-label={tx("intern.pipeline.karte_menu_label")}
          aria-haspopup="menu"
          onClick={(e) => onMenuOpen(e, deal.id)}
          className="-m-1 shrink-0 rounded-md p-1 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
        >
          <DreiPunkte />
        </button>
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
        <span className={`t-data tnum ${gestaut ? "!text-destructive" : "!text-ink-dim"}`}>
          {tage === 0 ? tx("intern.pipeline.heute") : `${tage} Tage`}
        </span>
      </div>
      {deal.status === "verloren" && deal.verlust_grund && (
        <p className="mt-2 truncate text-[11.5px] text-ink-dim">{deal.verlust_grund}</p>
      )}
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

/* ── Dialog: neuer Deal (auch für "Zu Deal machen" aus Unqualifiziert) ── */
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

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onAbbrechen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onAbbrechen]);

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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-cream/50 p-3 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pipeline-neu-titel"
        className="w-full max-w-md rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="pipeline-neu-titel" className="text-[15px] font-semibold text-ink-cream">
            {tx("intern.pipeline.dialog_neu_titel")}
          </h2>
          <button
            type="button"
            onClick={onAbbrechen}
            aria-label={tx("intern.pipeline.dialog_abbrechen")}
            className="-m-2 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <Kreuz />
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_titel")}</span>
            <input
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
              required
              autoFocus
              className="booking-input mt-1.5 w-full"
            />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_wert")}</span>
            <input
              value={wert}
              onChange={(e) => setWert(e.target.value)}
              type="number"
              min={0}
              step={100}
              placeholder="0"
              className="booking-input mt-1.5 w-full"
            />
          </label>
          <label className="block">
            <span className="t-label">{tx("intern.pipeline.feld_email")}</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="booking-input mt-1.5 w-full"
            />
          </label>
          {fehler && <p className="text-[12.5px] text-destructive">{fehler}</p>}
          <div className="mt-1 flex items-center gap-2">
            <button type="submit" disabled={speichert} className={`${BTN_PRIMARY} disabled:opacity-60`}>
              {tx("intern.pipeline.dialog_speichern")}
            </button>
            <button type="button" onClick={onAbbrechen} className={BTN_QUIET}>
              {tx("intern.pipeline.dialog_abbrechen")}
            </button>
          </div>
        </form>
      </div>
    </div>
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

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onAbbrechen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onAbbrechen]);

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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-cream/50 p-3 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pipeline-verloren-titel"
        className="w-full max-w-sm rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="pipeline-verloren-titel" className="text-[15px] font-semibold text-ink-cream">
              {tx("intern.pipeline.verloren_titel")}
            </h2>
            <p className="mt-1 text-[12.5px] text-ink-muted">{tx("intern.pipeline.verloren_sub")}</p>
          </div>
          <button
            type="button"
            onClick={onAbbrechen}
            aria-label={tx("intern.pipeline.dialog_abbrechen")}
            className="-m-2 shrink-0 rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            <Kreuz />
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            {VERLUST_GRUENDE.map((g) => (
              <label
                key={g.code}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line-subtle px-3 py-2 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-bg-elevated has-[:checked]:border-ink-cream/40 has-[:checked]:bg-akzent-wash"
              >
                <input
                  type="radio"
                  name="verlust-grund"
                  value={g.code}
                  checked={grund === g.code}
                  onChange={() => setGrund(g.code)}
                  style={{ accentColor: "var(--akzent)" }}
                  className="h-3.5 w-3.5"
                />
                <span className="text-[13.5px] text-ink-cream">{tx(g.labelKey)}</span>
              </label>
            ))}
          </div>
          <textarea
            value={notiz}
            onChange={(e) => setNotiz(e.target.value)}
            rows={2}
            placeholder={tx("intern.pipeline.verloren_notiz_platzhalter")}
            className="booking-input w-full resize-y"
          />
          {fehler && <p className="text-[12.5px] text-destructive">{fehler}</p>}
          <div className="mt-1 flex items-center gap-2">
            <button type="submit" className={BTN_PRIMARY}>
              {tx("intern.pipeline.verloren_speichern")}
            </button>
            <button type="button" onClick={onAbbrechen} className={BTN_QUIET}>
              {tx("intern.pipeline.dialog_abbrechen")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Kontextmenü: Tastatur-/Klick-Fallback fürs Drag & Drop ────────────── */
function VerschiebenMenu({
  x,
  y,
  aktuellerStatus,
  tx,
  onWaehlen,
  onSchliessen,
}: {
  x: number;
  y: number;
  aktuellerStatus: string;
  tx: (key: string) => string;
  onWaehlen: (status: Status) => void;
  onSchliessen: () => void;
}) {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onSchliessen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onSchliessen]);

  const optionen = STATUS_ORDER.filter((s) => s !== aktuellerStatus);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onSchliessen} />
      <div
        role="menu"
        style={{ top: y, left: x }}
        className="fixed z-50 w-52 overflow-hidden rounded-xl border border-line-medium bg-white py-1.5 shadow-[0_18px_45px_-18px_rgba(20,20,18,0.35)]"
      >
        <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-dim">
          {tx("intern.pipeline.menu_verschieben_nach")}
        </p>
        {optionen.map((status) => (
          <button
            key={status}
            role="menuitem"
            type="button"
            onClick={() => onWaehlen(status)}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-bg-elevated"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
            {STATUS_LABELS[status]}
          </button>
        ))}
      </div>
    </>
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

  const [menuAnchor, setMenuAnchor] = useState<{ id: string; x: number; y: number } | null>(null);
  const [wertEditFor, setWertEditFor] = useState<string | null>(null);
  const [verlorenDialogFor, setVerlorenDialogFor] = useState<string | null>(null);
  const [neuDialog, setNeuDialog] = useState<{ leadId: string | null; titel: string; email: string } | null>(null);

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

  /* ── Kontextmenü ──────────────────────────────────────────────────────── */
  function onMenuOpen(e: MouseEvent, dealId: string) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.min(rect.left, window.innerWidth - 224);
    const y = Math.min(rect.bottom + 4, window.innerHeight - 260);
    setMenuAnchor({ id: dealId, x, y });
  }

  /* ── Wert-Inline-Edit ─────────────────────────────────────────────────── */
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
    if (neu.leadId) {
      setUnqualifiziert((prev) => prev.filter((l) => l.id !== neu.leadId));
    }
    setNeuDialog(null);
  }

  const boardLeer = deals.length === 0 && unqualifiziert.length === 0;
  const menuDeal = menuAnchor ? deals.find((d) => d.id === menuAnchor.id) : null;

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
          <BoardIcon />
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
            return (
              <div key={status} className="w-[300px] shrink-0">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
                    <p className="t-label">{STATUS_LABELS[status]}</p>
                  </div>
                  <span className="flex items-baseline gap-1.5">
                    <span className="t-data tnum !text-ink-dim">{spaltenDeals.length}</span>
                    <span className="font-mono text-[11.5px] tabular-nums text-ink-dim">
                      · {EURO.format(summe)}
                    </span>
                  </span>
                </div>
                <div
                  onDragOver={(e) => onColumnDragOver(e, status)}
                  onDragLeave={() => onColumnDragLeave(status)}
                  onDrop={(e) => onColumnDrop(e, status)}
                  className={`flex min-h-20 flex-col gap-3 rounded-2xl p-1.5 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) ${
                    dragOverStatus === status ? "bg-akzent-wash/50 ring-1 ring-inset ring-akzent" : ""
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
                        onDragStart={onCardDragStart}
                        onDragEnd={onCardDragEnd}
                        onMenuOpen={onMenuOpen}
                        onWertStart={setWertEditFor}
                        onWertCommit={commitWert}
                        onWertCancel={() => setWertEditFor(null)}
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

      {menuAnchor && menuDeal && (
        <VerschiebenMenu
          x={menuAnchor.x}
          y={menuAnchor.y}
          aktuellerStatus={menuDeal.status}
          tx={tx}
          onWaehlen={(status) => {
            setMenuAnchor(null);
            requestMove(menuDeal.id, status);
          }}
          onSchliessen={() => setMenuAnchor(null)}
        />
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
