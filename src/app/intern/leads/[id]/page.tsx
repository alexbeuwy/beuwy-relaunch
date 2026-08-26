import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { leadDetail, type BwLeadDetail } from "@/lib/crm/db";

/**
 * /intern/leads/[id] — Lead-Detail (R3 Leaf B8). Stammdaten,
 * Funnel-Antworten (das jsonb-Feld "daten" aus src/lib/crm/db.ts als
 * Definition-List), eine Timeline aus Events/Mails/Notizen und die
 * beiden Mutationen (Status wechseln, Notiz anlegen) als klassische
 * form-POSTs gegen /api/intern — kein Client-JS nötig.
 */

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Lead-Details — beuwy",
};

export const dynamic = "force-dynamic";

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

const QUELLE_LABEL: Record<string, string> = {
  funnel: "Funnel",
  booking: "Buchung",
  tool: "Tool",
  manuell: "Manuell",
};

const EVENT_LABEL: Record<string, string> = {
  status: "Status geändert",
  mail: "E-Mail",
  "notiz-system": "System-Notiz",
  termin: "Termin",
};

const MAIL_STATUS_LABEL: Record<string, string> = {
  gesendet: "Gesendet",
  demo: "Demo",
  fehler: "Fehlgeschlagen",
};

function zeitRelativ(iso: string): string {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return "";
  const minuten = Math.round((Date.now() - dann) / 60_000);
  if (minuten < 1) return "gerade eben";
  if (minuten < 60) return `vor ${minuten} Min.`;
  const stunden = Math.round(minuten / 60);
  if (stunden < 24) return `vor ${stunden} Std.`;
  const tage = Math.round(stunden / 24);
  if (tage < 7) return `vor ${tage} Tag${tage === 1 ? "" : "en"}`;
  const wochen = Math.round(tage / 7);
  if (wochen < 5) return `vor ${wochen} Woche${wochen === 1 ? "" : "n"}`;
  const monate = Math.round(tage / 30);
  return `vor ${monate} Monat${monate === 1 ? "" : "en"}`;
}

function zeitAbsolut(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "leistungPaket" / "start_datum" → "Leistung paket" / "Start datum" — reicht
 *  für eine lesbare Definition-List, ohne ein Wörterbuch pflegen zu müssen. */
function humanKey(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  if (!spaced) return key;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function renderWert(wert: unknown): ReactNode {
  if (wert === null || wert === undefined || wert === "") {
    return <span className="text-ink-dim">–</span>;
  }
  if (Array.isArray(wert)) {
    if (wert.length === 0) return <span className="text-ink-dim">–</span>;
    return (
      <>
        {wert
          .map((eintrag) => (typeof eintrag === "object" ? JSON.stringify(eintrag) : String(eintrag)))
          .join(", ")}
      </>
    );
  }
  if (typeof wert === "object") {
    return <DatenListe daten={wert as Record<string, unknown>} tief />;
  }
  return <>{String(wert)}</>;
}

function DatenListe({
  daten,
  tief = false,
}: {
  daten: Record<string, unknown>;
  tief?: boolean;
}) {
  const eintraege = Object.entries(daten);
  if (eintraege.length === 0) {
    return <p className="t-small !text-ink-dim">Keine Angaben.</p>;
  }
  return (
    <dl className={tief ? "mt-2 space-y-2 border-l border-line-subtle pl-4" : "grid gap-x-8 gap-y-4 sm:grid-cols-2"}>
      {eintraege.map(([key, wert]) => (
        <div key={key}>
          <dt className="t-label">{humanKey(key)}</dt>
          <dd className="t-body mt-1 !text-ink-cream">{renderWert(wert)}</dd>
        </div>
      ))}
    </dl>
  );
}

type TimelineArt = "event" | "mail" | "notiz";
type TimelineEintrag = { key: string; erstellt: string; art: TimelineArt; titel: string; text?: string };

function timelineAus(detail: BwLeadDetail): TimelineEintrag[] {
  const eintraege: TimelineEintrag[] = [];
  detail.events.forEach((e, i) => {
    eintraege.push({
      key: `event-${i}`,
      erstellt: e.erstellt,
      art: "event",
      titel: EVENT_LABEL[e.typ] ?? e.typ,
      text: e.detail || undefined,
    });
  });
  detail.mails.forEach((m, i) => {
    eintraege.push({
      key: `mail-${i}`,
      erstellt: m.erstellt,
      art: "mail",
      titel: m.betreff,
      text: `${m.vorlage} → ${m.empfaenger} · ${MAIL_STATUS_LABEL[m.status] ?? m.status}`,
    });
  });
  detail.notizen.forEach((n) => {
    eintraege.push({
      key: `notiz-${n.id}`,
      erstellt: n.erstellt,
      art: "notiz",
      titel: `Notiz von ${n.autor}`,
      text: n.text,
    });
  });
  return eintraege.sort((a, b) => new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime());
}

const ART_LABEL: Record<TimelineArt, string> = {
  event: "Event",
  mail: "Mail",
  notiz: "Notiz",
};

function ArtBadge({ art }: { art: TimelineArt }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-ink-muted">
      {ART_LABEL[art]}
    </span>
  );
}

export default async function LeadDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const detail = await leadDetail(id);

  if (!detail) {
    return (
      <div className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="t-label">Intern · Lead</p>
          <h1 className="t-h2 mt-4">Kein Lead gefunden.</h1>
          <p className="t-body mt-4">
            {id.startsWith("demo-")
              ? "Diese Karte ist ein Demo-Beispiel aus dem Board — sie hat keine echte Datenbank-Historie."
              : "Entweder stimmt die ID nicht, oder der Lead wurde gelöscht."}
          </p>
          <Link href="/intern" className="ref-link mt-6 inline-block">
            ← Zurück zur Pipeline
          </Link>
        </div>
      </div>
    );
  }

  const { lead } = detail;
  const timeline = timelineAus(detail);

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/intern"
          className="t-small !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
        >
          ← Zurück zur Pipeline
        </Link>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="t-label">
              {QUELLE_LABEL[lead.quelle] ?? lead.quelle} · {zeitAbsolut(lead.erstellt)}
            </p>
            <h1 className="t-h2 mt-3">{lead.name || "Ohne Namen"}</h1>
            {lead.firma && <p className="t-body-lg mt-2">{lead.firma}</p>}
          </div>
          <div className="rounded-xl border border-line-subtle bg-bg-elevated px-5 py-3.5 text-right">
            <p className="t-label">Score</p>
            <p className="tnum mt-1 font-display text-[28px] font-bold leading-none text-ink-cream">
              {lead.score}
            </p>
          </div>
        </div>

        {/* ── Stammdaten ─────────────────────────────────────────────── */}
        <section className="mt-10 rounded-2xl border border-line-subtle p-6">
          <p className="t-label">Stammdaten</p>
          <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="t-label">E-Mail</dt>
              <dd className="t-body mt-1 !text-ink-cream">{lead.email || "–"}</dd>
            </div>
            <div>
              <dt className="t-label">Telefon</dt>
              <dd className="t-body mt-1 !text-ink-cream">{lead.telefon || "–"}</dd>
            </div>
            <div>
              <dt className="t-label">Firma</dt>
              <dd className="t-body mt-1 !text-ink-cream">{lead.firma || "–"}</dd>
            </div>
            <div>
              <dt className="t-label">Nachricht</dt>
              <dd className="t-body mt-1 !text-ink-cream">{lead.nachricht || "–"}</dd>
            </div>
          </dl>
        </section>

        {/* ── Status-Wechsel ─────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-line-subtle p-6">
          <p className="t-label">Status</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STATUS_ORDER.map((status) => {
              const aktiv = status === lead.status;
              return (
                <form action="/api/intern" method="POST" key={status}>
                  <input type="hidden" name="aktion" value="status" />
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="wert" value={status} />
                  <button
                    type="submit"
                    disabled={aktiv}
                    className={
                      aktiv
                        ? "rounded-full bg-akzent px-4 py-2 text-[13px] font-semibold text-ink-cream"
                        : "rounded-full border border-line-subtle px-4 py-2 text-[13px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
                    }
                  >
                    {STATUS_LABELS[status]}
                  </button>
                </form>
              );
            })}
          </div>
        </section>

        {/* ── Funnel-Antworten ───────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-line-subtle p-6">
          <p className="t-label">Funnel-Antworten</p>
          <div className="mt-4">
            {Object.keys(lead.daten ?? {}).length === 0 ? (
              <p className="t-small !text-ink-dim">Keine Funnel-Antworten hinterlegt.</p>
            ) : (
              <DatenListe daten={lead.daten} />
            )}
          </div>
        </section>

        {/* ── Timeline ───────────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-line-subtle p-6">
          <p className="t-label">Timeline</p>
          <div className="mt-4">
            {timeline.length === 0 ? (
              <p className="t-small !text-ink-dim">Noch keine Ereignisse.</p>
            ) : (
              timeline.map((eintrag) => (
                <div
                  key={eintrag.key}
                  className="flex gap-4 border-b border-line-subtle py-3 last:border-0"
                >
                  <span className="t-data tnum w-20 shrink-0 !text-ink-dim">
                    {zeitRelativ(eintrag.erstellt)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <ArtBadge art={eintrag.art} />
                      <p className="text-[14px] font-medium text-ink-cream">{eintrag.titel}</p>
                    </div>
                    {eintrag.text && <p className="t-small mt-1">{eintrag.text}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Notiz-Formular ─────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-line-subtle p-6">
          <p className="t-label">Neue Notiz</p>
          <form action="/api/intern" method="POST" className="mt-4 flex flex-col gap-3">
            <input type="hidden" name="aktion" value="notiz" />
            <input type="hidden" name="id" value={lead.id} />
            <textarea
              name="wert"
              required
              rows={3}
              placeholder="Was ist der Stand?"
              className="booking-input w-full resize-y"
            />
            <button
              type="submit"
              className="self-start rounded-full bg-akzent px-6 py-2.5 text-[14px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
            >
              Notiz speichern
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
