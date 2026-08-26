import type { Metadata } from "next";
import Link from "next/link";
import { crmKonfiguriert, leadsListe, type BwLead } from "@/lib/crm/db";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * /intern — die Lead-Pipeline (R3 Leaf B8). Ein Board mit sechs
 * Status-Spalten, gruppiert aus leadsListe() (src/lib/crm/db.ts, die
 * einzige erlaubte Datenquelle für dieses Leaf). Ohne angebundene
 * Datenbank (crmKonfiguriert()===false) zeigt die Seite drei
 * Beispiel-Karten mit einem ehrlichen Demo-Hinweis statt eine leere
 * Fläche vorzutäuschen.
 */

export const metadata: Metadata = {
  title: "Pipeline — beuwy",
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

const STATUS_DOT: Record<Status, string> = {
  neu: "bg-ink-dim",
  kontaktiert: "bg-ink-muted",
  termin: "bg-ink-muted",
  angebot: "bg-ink-muted",
  kunde: "bg-akzent",
  verloren: "bg-(--accent-red)",
};

const QUELLE_LABEL: Record<string, string> = {
  funnel: "Funnel",
  booking: "Buchung",
  tool: "Tool",
  manuell: "Manuell",
};

/** Drei Beispiel-Karten für den Demo-Modus — deutlich als Beispiel erkennbar,
 *  aber im echten Datenformat, damit das Board sein volles Bild zeigt. */
const DEMO_LEADS: BwLead[] = [
  {
    id: "demo-1",
    erstellt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
    quelle: "funnel",
    status: "neu",
    name: "Julia Berger",
    email: "julia.berger@beispiel.de",
    telefon: "",
    firma: "Berger Immobilien",
    nachricht: "Interesse an Marke & Website.",
    daten: { leistung: "Marke & Auftritt, Website & Anfragen" },
    score: 68,
  },
  {
    id: "demo-2",
    erstellt: new Date(Date.now() - 26 * 3_600_000).toISOString(),
    quelle: "booking",
    status: "termin",
    name: "Markus Vogt",
    email: "m.vogt@beispiel.de",
    telefon: "+49 170 0000000",
    firma: "Vogt & Partner",
    nachricht: "Terminwunsch: Erstgespräch am 2026-09-02 um 10:00 Uhr.",
    daten: { type: "Erstgespräch", date: "2026-09-02", time: "10:00" },
    score: 74,
  },
  {
    id: "demo-3",
    erstellt: new Date(Date.now() - 12 * 86_400_000).toISOString(),
    quelle: "tool",
    status: "kunde",
    name: "Sabine Roth",
    email: "sabine.roth@beispiel.de",
    telefon: "",
    firma: "Roth Immobilien",
    nachricht: "Detaillierte Auswertung angefordert: Verkaufspreisrechner.",
    daten: { tool: "verkaufspreis" },
    score: 91,
  },
];

/** Kurze relative Zeitangabe (deutsch) — keine externe Library nötig. */
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

function StatTile({ label, wert }: { label: string; wert: number }) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-elevated px-4 py-3.5">
      <p className="t-label">{label}</p>
      <p className="tnum mt-1.5 font-display text-[26px] font-bold leading-none text-ink-cream">
        {wert}
      </p>
    </div>
  );
}

function QuelleBadge({ quelle }: { quelle: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted">
      {QUELLE_LABEL[quelle] ?? quelle}
    </span>
  );
}

function LeadKarte({ lead }: { lead: BwLead }) {
  return (
    <Link
      href={`/intern/leads/${lead.id}`}
      className="group block rounded-xl border border-line-subtle bg-white p-4 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/25 hover:bg-bg-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 truncate text-[14px] font-semibold text-ink-cream">
          {lead.name || "Ohne Namen"}
        </p>
        <span className="tnum shrink-0 text-[12px] font-semibold text-ink-dim">{lead.score}</span>
      </div>
      {lead.firma && <p className="mt-0.5 truncate text-[12.5px] text-ink-muted">{lead.firma}</p>}
      <div className="mt-3 flex items-center justify-between gap-2">
        <QuelleBadge quelle={lead.quelle} />
        <span className="t-data !text-ink-dim">{zeitRelativ(lead.erstellt)}</span>
      </div>
    </Link>
  );
}

function Spalte({ status, leads }: { status: Status; leads: BwLead[] }) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
          <p className="t-label">{STATUS_LABELS[status]}</p>
        </div>
        <span className="t-data tnum !text-ink-dim">{leads.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {leads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line-subtle px-4 py-8 text-center">
            <p className="t-small !text-ink-dim">Keine Leads</p>
          </div>
        ) : (
          leads.map((lead) => <LeadKarte key={lead.id} lead={lead} />)
        )}
      </div>
    </div>
  );
}

export default async function InternPipelinePage() {
  const konfiguriert = crmKonfiguriert();
  const leads = konfiguriert ? await leadsListe() : DEMO_LEADS;

  const WOCHE_MS = 7 * 24 * 60 * 60 * 1000;
  const gesamt = leads.length;
  const neuDieseWoche = leads.filter(
    (l) => Date.now() - new Date(l.erstellt).getTime() <= WOCHE_MS,
  ).length;
  const offene = leads.filter((l) => l.status !== "kunde" && l.status !== "verloren").length;

  const spalten = STATUS_ORDER.map((status) => ({
    status,
    leads: leads.filter((l) => l.status === status),
  }));

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SektionsKopf
            eyebrow="Intern · CRM"
            titel="Die *Pipeline* auf einen Blick."
            sub="Jeder Lead aus Funnel, Terminbuchung und Tools landet automatisch hier — mit Quelle, Score und voller Historie."
          />
        </Reveal>

        <Reveal delay={40}>
          <div className="mt-10 grid max-w-[560px] grid-cols-3 gap-4">
            <StatTile label="Leads gesamt" wert={gesamt} />
            <StatTile label="Neu diese Woche" wert={neuDieseWoche} />
            <StatTile label="Offen" wert={offene} />
          </div>
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={80}>
            <div className="mt-10 max-w-[640px]">
              <GelbeKarte label="Demo-Modus" titel="Diese Ansicht zeigt Beispieldaten.">
                Auf diesem Deployment ist keine CRM-Datenbank angebunden. Die drei Karten unten
                zeigen das Format — sobald Supabase eingerichtet ist, ersetzen echte Leads sie
                automatisch.
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4">
          {spalten.map((spalte, i) => (
            <Reveal key={spalte.status} delay={i * 40} className="w-[280px] shrink-0">
              <Spalte status={spalte.status} leads={spalte.leads} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
