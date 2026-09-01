import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { crmKonfiguriert, leadsListe, tageskommando, type BwLead } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_SHELL_DEFAULTS } from "@/lib/texte/intern-shell";
import { GelbeKarte } from "@/components/MaklerElemente";

/**
 * /intern — „Tageskommando" (R5 Leaf G1). Löst die alte Pipeline-Board-
 * Startseite ab (das Board selbst zieht laut R5-FUNKTIONEN.md Modul 2 auf
 * /intern/pipeline um, gebaut von einem Nachbar-Leaf — nicht Teil dieser
 * Datei). Vier Kennzahl-Kacheln, zweispaltig „Fällige Aufgaben" +
 * „Zuletzt eingegangen", darunter eine schmale „Läuft gerade"-Zeile.
 *
 * RPC-Vertrag von bw_tageskommando() (src/lib/crm/db.ts::tageskommando,
 * bislang ohne SQL-Migration im Repo — dieses Leaf legt die erwarteten
 * Antwort-Schlüssel fest, damit die Migration sie treffen kann):
 *   { neue_leads, leads_woche, deal_wert_offen, tickets_offen,
 *     flows_laufend, aufgaben: [{ id, titel, faellig_am, bezug_typ }] }
 * zuTageskommando() liest jeden Schlüssel defensiv mit Zahl/String-
 * Fallback — fehlt die Migration noch, liefert die RPC einfach null
 * (Standard-rpc()-Verhalten in db.ts) und jede Kachel zeigt ehrlich 0
 * statt zu raten. Der große Demo-Hinweis erscheint ausschließlich bei
 * crmKonfiguriert()===false, nicht bei dieser Teil-Lücke.
 *
 * ABHÄNGIGKEIT (dokumentiert, nicht Teil dieses Leafs): das Abhaken einer
 * fälligen Aufgabe postet an /api/intern-aufgaben (aktion=erledigen,
 * id=<Aufgaben-ID>, optional zurueck=/intern) — diese Route baut
 * Nachbar-Leaf G6 (/intern/aufgaben). Bis dahin liefert der Button einen
 * 404; die Panel-Kopfzeile verlinkt zusätzlich fest auf /intern/aufgaben
 * als Fallback, damit Alex Aufgaben auch ohne die Inline-Aktion erledigen
 * kann.
 */

export const metadata: Metadata = {
  title: "Heute — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const QUELLE_LABEL: Record<string, string> = {
  funnel: "Funnel",
  booking: "Buchung",
  tool: "Tool",
  manuell: "Manuell",
};

type AufgabeZeile = {
  id: string;
  titel: string;
  faelligAm: string | null;
  bezugTyp: string | null;
};

type Tageskommando = {
  neueLeads: number;
  leadsWoche: number;
  dealWertOffen: number;
  ticketsOffen: number;
  flowsLaufend: number;
  aufgaben: AufgabeZeile[];
};

function zahl(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0;
}

function zuTageskommando(raw: Record<string, unknown> | null): Tageskommando {
  const roh = raw ?? {};
  const aufgabenRoh = Array.isArray(roh.aufgaben) ? roh.aufgaben : [];
  return {
    neueLeads: zahl(roh.neue_leads),
    leadsWoche: zahl(roh.leads_woche),
    dealWertOffen: zahl(roh.deal_wert_offen),
    ticketsOffen: zahl(roh.tickets_offen),
    flowsLaufend: zahl(roh.flows_laufend),
    aufgaben: aufgabenRoh.map((eintrag, i) => {
      const o = eintrag && typeof eintrag === "object" ? (eintrag as Record<string, unknown>) : {};
      return {
        id: typeof o.id === "string" || typeof o.id === "number" ? String(o.id) : `aufgabe-${i}`,
        titel: typeof o.titel === "string" && o.titel ? o.titel : "Ohne Titel",
        faelligAm: typeof o.faellig_am === "string" ? o.faellig_am : null,
        bezugTyp: typeof o.bezug_typ === "string" ? o.bezug_typ : null,
      };
    }),
  };
}

/** Beispieldaten für den Demo-Modus (crmKonfiguriert()===false) — deutlich
 *  erkennbar, aber im echten Format, damit das Dashboard sein volles Bild zeigt. */
const DEMO_TAGESKOMMANDO: Tageskommando = {
  neueLeads: 3,
  leadsWoche: 11,
  dealWertOffen: 184_500,
  ticketsOffen: 2,
  flowsLaufend: 3,
  aufgaben: [
    {
      id: "demo-a1",
      titel: "Julia Berger zurückrufen — Termin bestätigen",
      faelligAm: new Date().toISOString(),
      bezugTyp: "lead",
    },
    {
      id: "demo-a2",
      titel: "Angebot für Vogt & Partner nachfassen",
      faelligAm: new Date(Date.now() - 2 * 86_400_000).toISOString(),
      bezugTyp: "deal",
    },
    {
      id: "demo-a3",
      titel: "Ticket #482 beantworten",
      faelligAm: new Date().toISOString(),
      bezugTyp: "ticket",
    },
  ],
};

const DEMO_LEADS: BwLead[] = [
  {
    id: "demo-1",
    erstellt: new Date(Date.now() - 40 * 60_000).toISOString(),
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
    erstellt: new Date(Date.now() - 3 * 3_600_000).toISOString(),
    quelle: "booking",
    status: "termin",
    name: "Markus Vogt",
    email: "m.vogt@beispiel.de",
    telefon: "+49 170 0000000",
    firma: "Vogt & Partner",
    nachricht: "Terminwunsch: Erstgespräch.",
    daten: { type: "Erstgespräch" },
    score: 74,
  },
  {
    id: "demo-3",
    erstellt: new Date(Date.now() - 9 * 3_600_000).toISOString(),
    quelle: "tool",
    status: "neu",
    name: "Sabine Roth",
    email: "sabine.roth@beispiel.de",
    telefon: "",
    firma: "Roth Immobilien",
    nachricht: "Detaillierte Auswertung angefordert: Verkaufspreisrechner.",
    daten: { tool: "verkaufspreis" },
    score: 91,
  },
  {
    id: "demo-4",
    erstellt: new Date(Date.now() - 22 * 3_600_000).toISOString(),
    quelle: "funnel",
    status: "kontaktiert",
    name: "Thomas Weiss",
    email: "t.weiss@beispiel.de",
    telefon: "",
    firma: "Weiss & Sohn Immobilien",
    nachricht: "Interesse an Vertriebssystem.",
    daten: {},
    score: 55,
  },
  {
    id: "demo-5",
    erstellt: new Date(Date.now() - 1.5 * 86_400_000).toISOString(),
    quelle: "booking",
    status: "termin",
    name: "Nadine Krüger",
    email: "n.krueger@beispiel.de",
    telefon: "",
    firma: "Krüger Wohnwerte",
    nachricht: "Terminwunsch: Systemgespräch.",
    daten: {},
    score: 63,
  },
  {
    id: "demo-6",
    erstellt: new Date(Date.now() - 2.3 * 86_400_000).toISOString(),
    quelle: "tool",
    status: "neu",
    name: "Oliver Fuchs",
    email: "o.fuchs@beispiel.de",
    telefon: "",
    firma: "Fuchs Immobilien",
    nachricht: "Auswertung Mietpreisrechner angefordert.",
    daten: { tool: "mietpreis" },
    score: 47,
  },
  {
    id: "demo-7",
    erstellt: new Date(Date.now() - 4 * 86_400_000).toISOString(),
    quelle: "manuell",
    status: "angebot",
    name: "Sabine Roth",
    email: "sabine.roth@beispiel.de",
    telefon: "",
    firma: "Roth Immobilien",
    nachricht: "Manuell angelegt nach Telefonat.",
    daten: {},
    score: 80,
  },
  {
    id: "demo-8",
    erstellt: new Date(Date.now() - 6 * 86_400_000).toISOString(),
    quelle: "funnel",
    status: "kunde",
    name: "Andrea Lang",
    email: "a.lang@beispiel.de",
    telefon: "",
    firma: "Lang Immobilien",
    nachricht: "Interesse an Marke & Auftritt.",
    daten: {},
    score: 88,
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

/** "Heute fällig" / "Überfällig seit X Tagen" / TT.MM — Tages-genauer Vergleich. */
function faelligLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const heuteTag = new Date().toISOString().slice(0, 10);
  const faelligTag = d.toISOString().slice(0, 10);
  if (faelligTag === heuteTag) return "Heute fällig";
  const diffTage = Math.round(
    (new Date(heuteTag).getTime() - new Date(faelligTag).getTime()) / 86_400_000,
  );
  if (diffTage > 0) return `Überfällig seit ${diffTage} Tag${diffTage === 1 ? "" : "en"}`;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

const EURO = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function KpiKarte({ label, wert }: { label: string; wert: ReactNode }) {
  return (
    <div className="rounded-xl border border-line-subtle bg-white px-5 py-4">
      <p className="t-label">{label}</p>
      <p className="tnum mt-2 font-display text-[26px] font-bold leading-none text-ink-cream">
        {wert}
      </p>
    </div>
  );
}

function QuelleBadge({ quelle }: { quelle: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted">
      {QUELLE_LABEL[quelle] ?? quelle}
    </span>
  );
}

/** Generischer Leerzustand-Glyph — ein Kreis mit Haken, selbst gezeichnet
 *  (Muster: Funke/PlayDreieck in MaklerElemente.tsx, kein Icon-Import). */
function LeerGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="9" cy="9" r="7.6" />
      <path d="M5.6 9.2l2.2 2.2 4.6-4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeerZustand({
  text,
  aktionHref,
  aktionLabel,
}: {
  text: string;
  aktionHref: string;
  aktionLabel: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line-subtle px-5 py-9 text-center">
      <span className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-bg-elevated text-ink-dim">
        <LeerGlyph />
      </span>
      <p className="t-small !text-ink-dim">{text}</p>
      <Link
        href={aktionHref}
        className="mt-3 inline-block text-[13px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-muted"
      >
        {aktionLabel} →
      </Link>
    </div>
  );
}

function AufgabeZeileRow({ aufgabe }: { aufgabe: AufgabeZeile }) {
  return (
    <div className="flex items-center gap-3 border-b border-line-subtle py-3 last:border-0">
      <form action="/api/intern-aufgaben" method="POST">
        <input type="hidden" name="aktion" value="erledigen" />
        <input type="hidden" name="id" value={aufgabe.id} />
        <input type="hidden" name="zurueck" value="/intern" />
        <button
          type="submit"
          aria-label={`„${aufgabe.titel}“ als erledigt markieren`}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-line-medium transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream hover:bg-akzent-wash"
        />
      </form>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink-cream">{aufgabe.titel}</p>
        {aufgabe.faelligAm && (
          <p className="t-data tnum mt-0.5 !text-ink-dim">{faelligLabel(aufgabe.faelligAm)}</p>
        )}
      </div>
    </div>
  );
}

function LeadZeileRow({ lead }: { lead: BwLead }) {
  return (
    <Link
      href={`/intern/leads/${lead.id}`}
      className="-mx-2 flex items-center justify-between gap-3 rounded-lg border-b border-line-subtle px-2 py-3 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated"
    >
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-medium text-ink-cream">{lead.name || "Ohne Namen"}</p>
        {lead.firma && <p className="t-small truncate">{lead.firma}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <QuelleBadge quelle={lead.quelle} />
        <span className="t-data tnum !text-ink-dim">{zeitRelativ(lead.erstellt)}</span>
      </div>
    </Link>
  );
}

export default async function InternDashboardPage() {
  const konfiguriert = crmKonfiguriert();
  const c = await getContent();
  const t = (key: string) => c[key] ?? INTERN_SHELL_DEFAULTS[key] ?? key;

  let kommandoRoh: Record<string, unknown> | null = null;
  let leads: BwLead[] = DEMO_LEADS;
  if (konfiguriert) {
    [kommandoRoh, leads] = await Promise.all([tageskommando(), leadsListe()]);
  }
  const kommando = konfiguriert ? zuTageskommando(kommandoRoh) : DEMO_TAGESKOMMANDO;

  const neuesteLeads = [...leads]
    .sort((a, b) => new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime())
    .slice(0, 8);

  return (
    <div className="px-5 py-7 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1200px]">
        {!konfiguriert && (
          <div className="mb-8 max-w-[640px]">
            <GelbeKarte label={t("intern.shell.demo.label")} titel={t("intern.shell.demo.titel")}>
              {t("intern.shell.demo.text")}
            </GelbeKarte>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiKarte label={t("intern.shell.kpi.neue_leads")} wert={kommando.neueLeads} />
          <KpiKarte label={t("intern.shell.kpi.leads_woche")} wert={kommando.leadsWoche} />
          <KpiKarte label={t("intern.shell.kpi.deal_wert")} wert={EURO.format(kommando.dealWertOffen)} />
          <KpiKarte label={t("intern.shell.kpi.tickets_offen")} wert={kommando.ticketsOffen} />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-line-subtle p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="t-label">{t("intern.shell.aufgaben.titel")}</p>
              <Link
                href="/intern/aufgaben"
                className="t-small shrink-0 !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
              >
                {t("intern.shell.aufgaben.alle_link")} →
              </Link>
            </div>
            <div className="mt-4">
              {kommando.aufgaben.length === 0 ? (
                <LeerZustand
                  text={t("intern.shell.aufgaben.leer")}
                  aktionHref="/intern/aufgaben"
                  aktionLabel={t("intern.shell.aufgaben.alle_link")}
                />
              ) : (
                kommando.aufgaben.map((aufgabe) => (
                  <AufgabeZeileRow key={aufgabe.id} aufgabe={aufgabe} />
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-line-subtle p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="t-label">{t("intern.shell.leads.titel")}</p>
              <Link
                href="/intern/pipeline"
                className="t-small shrink-0 !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
              >
                {t("intern.shell.leads.alle_link")} →
              </Link>
            </div>
            <div className="mt-4">
              {neuesteLeads.length === 0 ? (
                <LeerZustand
                  text={t("intern.shell.leads.leer")}
                  aktionHref="/intern/pipeline"
                  aktionLabel={t("intern.shell.leads.leer_aktion")}
                />
              ) : (
                neuesteLeads.map((lead) => <LeadZeileRow key={lead.id} lead={lead} />)
              )}
            </div>
          </section>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line-subtle bg-bg-elevated px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-akzent" aria-hidden />
            <p className="t-small !text-ink-muted">
              {t("intern.shell.laeuft.titel")} ·{" "}
              <span className="tnum font-semibold !text-ink-cream">{kommando.flowsLaufend}</span>{" "}
              Flow{kommando.flowsLaufend === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/intern/flows"
            className="t-small !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
          >
            {t("intern.shell.laeuft.link")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
