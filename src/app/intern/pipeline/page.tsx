import type { Metadata } from "next";
import {
  crmKonfiguriert,
  dealsListe,
  kontakteListe,
  leadsListe,
  type BwDeal,
  type BwKontakt,
  type BwLead,
} from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_PIPELINE_DEFAULTS } from "@/lib/texte/intern-pipeline";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { KanbanBoard, type KanbanDeal } from "./KanbanBoard";

/**
 * /intern/pipeline — der Deal-Kanban (R5 Leaf G2). Server-Komponente:
 * lädt Deals/Leads/Kontakte über die einzig erlaubte Datenschicht
 * (src/lib/crm/db.ts) und die Studio-Texte, löst pro Deal den lesbaren
 * Kontaktnamen auf (Kontakt zuerst, sonst der verknüpfte Lead) und
 * reicht alles fertig an <KanbanBoard> (Client) weiter — dort leben
 * Drag & Drop, Dialoge und optimistische Updates.
 *
 * Ohne angebundene Datenbank (crmKonfiguriert()===false) zeigt die Seite
 * ein kleines, in sich stimmiges Demo-Set (Kontakte, Leads, Deals über
 * mehrere Status inkl. eines verlorenen und eines gestauten Deals) statt
 * einer leeren Fläche — mit ehrlichem Hinweis darüber.
 */

export const metadata: Metadata = {
  title: "Pipeline — beuwy",
};

export const dynamic = "force-dynamic";

/* ── Demo-Daten ─────────────────────────────────────────────────────── */

const STD = 3_600_000;
const TAG = 24 * STD;

const DEMO_KONTAKTE: BwKontakt[] = [
  {
    id: "demo-k1",
    erstellt: new Date(Date.now() - 30 * TAG).toISOString(),
    email: "julia.berger@beispiel.de",
    name: "Julia Berger",
    telefon: "",
    firma: "Berger Immobilien",
    rolle: "Geschäftsführerin",
    notiz: "",
  },
  {
    id: "demo-k2",
    erstellt: new Date(Date.now() - 12 * TAG).toISOString(),
    email: "m.vogt@beispiel.de",
    name: "Markus Vogt",
    telefon: "+49 170 0000000",
    firma: "Vogt & Partner",
    rolle: "Inhaber",
    notiz: "",
  },
  {
    id: "demo-k3",
    erstellt: new Date(Date.now() - 60 * TAG).toISOString(),
    email: "sabine.roth@beispiel.de",
    name: "Sabine Roth",
    telefon: "",
    firma: "Roth Immobilien",
    rolle: "",
    notiz: "",
  },
];

const DEMO_LEADS: BwLead[] = [
  {
    id: "demo-l1",
    erstellt: new Date(Date.now() - 4 * TAG).toISOString(),
    quelle: "funnel",
    status: "kontaktiert",
    name: "Julia Berger",
    email: "julia.berger@beispiel.de",
    telefon: "",
    firma: "Berger Immobilien",
    nachricht: "Interesse an Marke & Website.",
    daten: {},
    score: 68,
  },
  {
    id: "demo-l2",
    erstellt: new Date(Date.now() - 2 * TAG).toISOString(),
    quelle: "booking",
    status: "termin",
    name: "Markus Vogt",
    email: "m.vogt@beispiel.de",
    telefon: "+49 170 0000000",
    firma: "Vogt & Partner",
    nachricht: "Terminwunsch Erstgespräch.",
    daten: {},
    score: 74,
  },
  {
    id: "demo-l3",
    erstellt: new Date(Date.now() - 3 * STD).toISOString(),
    quelle: "tool",
    status: "neu",
    name: "Peter Klein",
    email: "peter.klein@beispiel.de",
    telefon: "",
    firma: "Klein Immobilien",
    nachricht: "Detaillierte Auswertung angefordert: Verkaufspreisrechner.",
    daten: {},
    score: 55,
  },
  {
    id: "demo-l4",
    erstellt: new Date(Date.now() - 9 * TAG).toISOString(),
    quelle: "funnel",
    status: "neu",
    name: "Nina Freitag",
    email: "nina.freitag@beispiel.de",
    telefon: "",
    firma: "",
    nachricht: "Vorquali-Funnel abgeschlossen.",
    daten: {},
    score: 41,
  },
];

const DEMO_DEALS: BwDeal[] = [
  {
    id: "demo-d1",
    erstellt: new Date(Date.now() - 4 * TAG).toISOString(),
    kontakt_id: "demo-k1",
    lead_id: "demo-l1",
    titel: "Marke & Auftritt — Berger Immobilien",
    wert_eur: 6500,
    status: "neu",
    verlust_grund: "",
    erwartet: null,
  },
  {
    id: "demo-d2",
    erstellt: new Date(Date.now() - 20 * TAG).toISOString(),
    kontakt_id: "demo-k1",
    lead_id: null,
    titel: "Erweiterungsmandat — Zweitmarke",
    wert_eur: 4200,
    status: "kontaktiert",
    verlust_grund: "",
    erwartet: null,
  },
  {
    id: "demo-d3",
    erstellt: new Date(Date.now() - 2 * TAG).toISOString(),
    kontakt_id: "demo-k2",
    lead_id: "demo-l2",
    titel: "Website & Anfragen — Vogt & Partner",
    wert_eur: 12000,
    status: "termin",
    verlust_grund: "",
    erwartet: null,
  },
  {
    id: "demo-d4",
    erstellt: new Date(Date.now() - 18 * TAG).toISOString(),
    kontakt_id: "demo-k3",
    lead_id: null,
    titel: "Kombipaket — Roth Immobilien",
    wert_eur: 24000,
    status: "angebot",
    verlust_grund: "",
    erwartet: null,
  },
  {
    id: "demo-d5",
    erstellt: new Date(Date.now() - 40 * TAG).toISOString(),
    kontakt_id: "demo-k3",
    lead_id: null,
    titel: "E-Mail & Nachfassen — Roth Immobilien",
    wert_eur: 3000,
    status: "kunde",
    verlust_grund: "",
    erwartet: null,
  },
  {
    id: "demo-d6",
    erstellt: new Date(Date.now() - 60 * TAG).toISOString(),
    kontakt_id: null,
    lead_id: null,
    titel: "Automatisierung — Altmandat",
    wert_eur: 5000,
    status: "verloren",
    verlust_grund: "Zu teuer: Budget für dieses Jahr ausgeschöpft.",
    erwartet: null,
  },
];

/* ── Kontaktnamen auflösen: Kontakt zuerst, sonst der verknüpfte Lead ── */
function loeseKontakt(
  deal: BwDeal,
  kontakte: Map<string, BwKontakt>,
  leads: Map<string, BwLead>,
): { name: string; email: string } {
  const k = deal.kontakt_id ? kontakte.get(deal.kontakt_id) : undefined;
  if (k) return { name: k.name || k.firma || k.email, email: k.email };
  const l = deal.lead_id ? leads.get(deal.lead_id) : undefined;
  if (l) return { name: l.name || l.firma || l.email, email: l.email };
  return { name: "", email: "" };
}

export default async function InternPipelinePage() {
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();

  let deals: BwDeal[];
  let leads: BwLead[];
  let kontakte: BwKontakt[];
  if (konfiguriert) {
    [deals, leads, kontakte] = await Promise.all([dealsListe(), leadsListe(), kontakteListe()]);
  } else {
    deals = DEMO_DEALS;
    leads = DEMO_LEADS;
    kontakte = DEMO_KONTAKTE;
  }

  const t = (key: string) => content[key] ?? INTERN_PIPELINE_DEFAULTS[key] ?? key;
  const texte: Record<string, string> = {};
  for (const key of Object.keys(INTERN_PIPELINE_DEFAULTS)) {
    texte[key] = content[key] ?? INTERN_PIPELINE_DEFAULTS[key];
  }

  const kontaktMap = new Map(kontakte.map((k) => [k.id, k] as const));
  const leadMap = new Map(leads.map((l) => [l.id, l] as const));

  const kanbanDeals: KanbanDeal[] = deals.map((d) => {
    const { name, email } = loeseKontakt(d, kontaktMap, leadMap);
    return { ...d, kontaktName: name, kontaktEmail: email };
  });

  const leadIdsMitDeal = new Set(deals.map((d) => d.lead_id).filter((id): id is string => Boolean(id)));
  const unqualifiziert = leads.filter((l) => !leadIdsMitDeal.has(l.id));

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <SektionsKopf eyebrow={t("intern.pipeline.eyebrow")} titel={t("intern.pipeline.titel")} sub={t("intern.pipeline.sub")} />
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mt-8 max-w-[640px]">
              <GelbeKarte label={t("intern.pipeline.demo_label")} titel={t("intern.pipeline.demo_titel")}>
                {t("intern.pipeline.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <div className="mt-10">
            <KanbanBoard
              initialDeals={kanbanDeals}
              initialUnqualifiziert={unqualifiziert}
              konfiguriert={konfiguriert}
              texte={texte}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
