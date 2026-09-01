import type { Metadata } from "next";
import { crmKonfiguriert, flowsListe } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_FLOWS_DEFAULTS } from "@/lib/texte/intern-flows";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FlowsClient, type FlowEintrag, type FlowSchritt, type FlowStatus, type Ausloeser } from "./FlowEditor";

/**
 * /intern/flows — der E-Mail-Flow-Builder (R5 Leaf G4). Server-Komponente:
 * lädt die Flow-Liste über die einzig erlaubte Datenschicht
 * (src/lib/crm/db.ts) und die Studio-Texte, parst jede Zeile defensiv
 * (gleiches Muster wie zuTageskommando() in src/app/intern/page.tsx) und
 * reicht alles fertig an <FlowsClient> weiter — dort leben Übersicht UND
 * Editor als eine Client-Komponente (Begründung im Dateikopf von
 * FlowEditor.tsx).
 *
 * RPC-KONTRAKT von bw_flows_liste() (src/lib/crm/db.ts::flowsListe,
 * bislang ohne SQL-Migration im Repo — dieses Leaf legt die erwarteten
 * Antwort-Schlüssel fest, damit die Migration sie treffen kann):
 *
 *   [{
 *     id: string,
 *     name: string,
 *     status: "entwurf" | "aktiv" | "pausiert",
 *     ausloeser: "lead_neu" | "tool_lead" | "booking" | "konto_neu" | "manuell",
 *     schritte: [{ typ: "mail" | "warten" | "bedingung", konfig: {...} }],
 *     laufende_anzahl: number,
 *   }]
 *
 * "schritte" hat exakt die Form, die flowSpeichern() entgegennimmt — die
 * Karte editiert also ohne Zwischenformat weiter, was die Liste liefert.
 * Jedes Feld wird defensiv mit Fallback gelesen: fehlt die Migration noch,
 * liefert die RPC einfach null (Standard-rpc()-Verhalten in db.ts) und die
 * Übersicht zeigt ehrlich eine leere Liste statt zu raten. Der große
 * Demo-Hinweis erscheint ausschließlich bei crmKonfiguriert()===false.
 */

export const metadata: Metadata = {
  title: "Flows — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_WERTE: readonly FlowStatus[] = ["entwurf", "aktiv", "pausiert"];
const AUSLOESER_WERTE: readonly Ausloeser[] = ["lead_neu", "tool_lead", "booking", "konto_neu", "manuell"];
const SCHRITT_TYPEN: readonly FlowSchritt["typ"][] = ["mail", "warten", "bedingung"];

function zuStatus(v: unknown): FlowStatus {
  return STATUS_WERTE.includes(v as FlowStatus) ? (v as FlowStatus) : "entwurf";
}
function zuAusloeser(v: unknown): Ausloeser {
  return AUSLOESER_WERTE.includes(v as Ausloeser) ? (v as Ausloeser) : "manuell";
}
function zuSchritte(v: unknown): FlowSchritt[] {
  if (!Array.isArray(v)) return [];
  const out: FlowSchritt[] = [];
  for (const roh of v) {
    if (!roh || typeof roh !== "object") continue;
    const o = roh as Record<string, unknown>;
    const typ = o.typ;
    if (!SCHRITT_TYPEN.includes(typ as FlowSchritt["typ"])) continue;
    const konfig = o.konfig && typeof o.konfig === "object" ? (o.konfig as Record<string, unknown>) : {};
    out.push({ typ: typ as FlowSchritt["typ"], konfig } as FlowSchritt);
  }
  return out;
}
function zahl(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0;
}

function zuFlowEintrag(raw: Record<string, unknown>, index: number): FlowEintrag {
  return {
    id: typeof raw.id === "string" || typeof raw.id === "number" ? String(raw.id) : `flow-${index}`,
    name: typeof raw.name === "string" && raw.name ? raw.name : "Ohne Namen",
    status: zuStatus(raw.status),
    ausloeser: zuAusloeser(raw.ausloeser),
    schritte: zuSchritte(raw.schritte),
    laufendeAnzahl: zahl(raw.laufende_anzahl),
  };
}

/** Beispieldaten für den Demo-Modus (crmKonfiguriert()===false) — drei
 *  Flows über alle drei Status und alle drei Schritt-Typen hinweg, damit
 *  Übersicht und Mini-Kette ihr volles Bild zeigen. */
const DEMO_FLOWS: FlowEintrag[] = [
  {
    id: "demo-f1",
    name: "Nachfass nach Erstanfrage",
    status: "aktiv",
    ausloeser: "lead_neu",
    schritte: [
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "funnel_bestaetigung" } },
      { typ: "warten", konfig: { stunden: 24 } },
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "nachfass" } },
      { typ: "bedingung", konfig: { feld: "status", wert: "kontaktiert" } },
      { typ: "warten", konfig: { stunden: 72 } },
      {
        typ: "mail",
        konfig: {
          modus: "frei",
          betreff: "eine letzte Frage",
          text: "Kurz nachgehakt: Passt der Zeitpunkt gerade, oder sprechen wir besser in ein paar Wochen?",
        },
      },
    ],
    laufendeAnzahl: 4,
  },
  {
    id: "demo-f2",
    name: "Termin-Erinnerung",
    status: "aktiv",
    ausloeser: "booking",
    schritte: [
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "termin_bestaetigung" } },
      { typ: "warten", konfig: { stunden: 4 } },
      { typ: "mail", konfig: { modus: "vorlage", vorlageId: "termin_erinnerung" } },
    ],
    laufendeAnzahl: 2,
  },
  {
    id: "demo-f3",
    name: "Tool-Lead pflegen",
    status: "entwurf",
    ausloeser: "tool_lead",
    schritte: [{ typ: "mail", konfig: { modus: "vorlage", vorlageId: "tool_ergebnis" } }],
    laufendeAnzahl: 0,
  },
];

export default async function InternFlowsPage() {
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_FLOWS_DEFAULTS[key] ?? key;
  const texte: Record<string, string> = {};
  for (const key of Object.keys(INTERN_FLOWS_DEFAULTS)) {
    texte[key] = content[key] ?? INTERN_FLOWS_DEFAULTS[key];
  }

  let flows: FlowEintrag[];
  if (konfiguriert) {
    const roh = await flowsListe();
    flows = roh.map((r, i) => zuFlowEintrag(r, i));
  } else {
    flows = DEMO_FLOWS;
  }

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SektionsKopf eyebrow={t("intern.flows.eyebrow")} titel={t("intern.flows.titel")} sub={t("intern.flows.sub")} />
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mt-8 max-w-[640px]">
              <GelbeKarte label={t("intern.flows.demo_label")} titel={t("intern.flows.demo_titel")}>
                {t("intern.flows.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <div className="mt-10">
            <FlowsClient initialFlows={flows} konfiguriert={konfiguriert} texte={texte} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
