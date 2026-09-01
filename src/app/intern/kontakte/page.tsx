import type { Metadata } from "next";
import Link from "next/link";
import { crmKonfiguriert, kontakteListe, kontakt360, type BwKontakt } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_KONTAKTE_DEFAULTS } from "@/lib/texte/intern-kontakte";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { KontakteClient } from "./KontakteClient";

/**
 * /intern/kontakte — Kontaktliste (R5 Leaf G3 — Kontakte & 360-Akte;
 * LEAF U3, 27.08 — Kontakte-/Aufgaben-UX-Politur).
 *
 * Server-Komponente: lädt die deduplizierte Kontaktliste über die einzig
 * erlaubte Datenschicht (src/lib/crm/db.ts) und die Studio-Texte. Die
 * gesamte Interaktion — Suche, sortierbare Tabelle, Kontakt-Anlegen-Dialog,
 * Kontakt-Schnellansicht (Sheet) — wandert in die neue Geschwisterdatei
 * KontakteClient.tsx ("use client"), weil ui/dialog, ui/sheet und
 * useState/onClick zwingend Client-Komponenten sind (Muster: CommandPalette
 * .tsx neben layout.tsx aus Leaf U1 — eine neue "use client"-Datei INNERHALB
 * des eigenen Leaf-Verzeichnisses ist erlaubt, auch wenn sie nicht wörtlich
 * in der ursprünglichen Auftrags-Dateiliste stand). Diese Seite bleibt eine
 * reine Server-Komponente, weil kontakteListe()/kontakt360() serverseitige
 * Supabase-Secrets brauchen (siehe db.ts) und niemals in den Client-Bundle
 * dürfen.
 *
 * KONTAKT-SCHNELLANSICHT — Server Action statt Vorab-Fetch: kontaktVorschau()
 * unten trägt "use server" und wird als Prop an KontakteClient gereicht;
 * die Sheet-Chronik wird also erst beim Klick auf eine Zeile serverseitig
 * nachgeladen (kontakt360() pro Klick), NICHT für alle Kontakte beim
 * Seitenaufbau — das vermeidet N+1-RPC-Aufrufe beim reinen Listen-Rendern
 * und gibt der Sheet-Ladephase einen ehrlichen Sinn für den
 * ui/skeleton-Ladezustand im Client.
 */

export const metadata: Metadata = {
  title: "Kontakte — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* ── Demo-Daten (crmKonfiguriert()===false) — dieselben Kontakte tauchen
   mit passender 360-Historie in kontakte/[id]/page.tsx wieder auf, jede
   Datei hält ihr eigenes Demo-Set (Konvention: siehe DEMO_* in
   src/app/intern/page.tsx vs. .../pipeline/page.tsx, unabhängig
   gepflegt). ──────────────────────────────────────────────────────────── */
const TAG = 24 * 3_600_000;

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
    rolle: "Geschäftsführerin",
    notiz: "",
  },
  {
    id: "demo-k4",
    erstellt: new Date(Date.now() - 9 * TAG).toISOString(),
    email: "t.weiss@beispiel.de",
    name: "Thomas Weiss",
    telefon: "",
    firma: "Weiss & Sohn Immobilien",
    rolle: "",
    notiz: "",
  },
  {
    id: "demo-k5",
    erstellt: new Date(Date.now() - 3 * TAG).toISOString(),
    email: "nina.freitag@beispiel.de",
    name: "Nina Freitag",
    telefon: "",
    firma: "",
    rolle: "",
    notiz: "",
  },
];

/* ── Schnellansicht: Chronik-Vorschau (letzte 5 Einträge) ─────────────
   Schlanke, eigenständige Variante von zuAkte()/chronikAus() aus
   kontakte/[id]/page.tsx — bewusst dupliziert statt importiert (dortige
   Konvention, siehe Kopfkommentar dieser Datei): die Sheet-Vorschau
   braucht weder Ergebnis-Listen noch Intent-Chips, nur Typ/Titel/Zeit/
   Kurztext für fünf Zeilen. ─────────────────────────────────────────── */

export type VorschauTyp = "lead" | "mail" | "deal" | "notiz" | "konto";
export type VorschauEintrag = { key: string; typ: VorschauTyp; titel: string; erstellt: string; text?: string };

const QUELLE_LABEL: Record<string, string> = {
  funnel: "Funnel",
  booking: "Buchung",
  tool: "Tool",
  manuell: "Manuell",
};

const MAIL_STATUS_LABEL: Record<string, string> = {
  gesendet: "Gesendet",
  demo: "Demo",
  fehler: "Fehlgeschlagen",
};

function txt(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function objekt(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

function vorschauAusRaw(raw: Record<string, unknown> | null): VorschauEintrag[] {
  if (!raw) return [];
  const eintraege: VorschauEintrag[] = [];

  (Array.isArray(raw.leads) ? raw.leads : []).forEach((eintrag, i) => {
    const o = objekt(eintrag);
    const erstellt = txt(o.erstellt);
    if (!erstellt) return;
    eintraege.push({
      key: `lead-${txt(o.id, String(i))}`,
      typ: "lead",
      titel: QUELLE_LABEL[txt(o.quelle, "manuell")] ?? txt(o.quelle, "Anfrage"),
      erstellt,
      text: txt(o.nachricht) || undefined,
    });
  });

  (Array.isArray(raw.deals) ? raw.deals : []).forEach((eintrag, i) => {
    const o = objekt(eintrag);
    const erstellt = txt(o.erstellt);
    if (!erstellt) return;
    eintraege.push({
      key: `deal-${txt(o.id, String(i))}`,
      typ: "deal",
      titel: `Deal angelegt: „${txt(o.titel, "Ohne Titel")}“`,
      erstellt,
    });
  });

  (Array.isArray(raw.mails) ? raw.mails : []).forEach((eintrag, i) => {
    const o = objekt(eintrag);
    const erstellt = txt(o.erstellt);
    if (!erstellt) return;
    eintraege.push({
      key: `mail-${i}-${erstellt}`,
      typ: "mail",
      titel: txt(o.betreff) || txt(o.vorlage) || "E-Mail",
      erstellt,
      text: MAIL_STATUS_LABEL[txt(o.status)] ?? (txt(o.status) || undefined),
    });
  });

  (Array.isArray(raw.notizen) ? raw.notizen : []).forEach((eintrag, i) => {
    const o = objekt(eintrag);
    const erstellt = txt(o.erstellt);
    if (!erstellt) return;
    eintraege.push({
      key: `notiz-${txt(o.id, String(i))}`,
      typ: "notiz",
      titel: `Notiz von ${txt(o.autor, "alex")}`,
      erstellt,
      text: txt(o.text) || undefined,
    });
  });

  const kontoRoh = objekt(raw.konto);
  const kontoErstellt = txt(kontoRoh.erstellt);
  if (kontoErstellt) {
    eintraege.push({ key: "konto", typ: "konto", titel: "Kunde geworden", erstellt: kontoErstellt });
  }

  return eintraege
    .sort((a, b) => new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime())
    .slice(0, 5);
}

/* Eigenständiges Demo-Set für die Sheet-Vorschau — inhaltlich an die
   Demo-Akten in kontakte/[id]/page.tsx angelehnt (gleiche Namen/Ereignisse
   für ein stimmiges Demo-Erlebnis), aber unabhängig gepflegt (Konvention
   siehe oben) und auf das reduziert, was die Vorschau zeigt. */
const vorTagen = (tage: number) => new Date(Date.now() - tage * TAG).toISOString();

const DEMO_VORSCHAU: Record<string, VorschauEintrag[]> = {
  "demo-k1": [
    { key: "v1", typ: "notiz", titel: "Notiz von alex", erstellt: vorTagen(5), text: "Rückruf vereinbart für nächste Woche." },
    { key: "v2", typ: "deal", titel: "Deal angelegt: „Erweiterungsmandat — Zweitmarke“", erstellt: vorTagen(10) },
    { key: "v3", typ: "lead", titel: "Tool", erstellt: vorTagen(26), text: "Detaillierte Auswertung angefordert: Verkaufspreisrechner." },
    { key: "v4", typ: "mail", titel: "Willkommen bei beuwy", erstellt: vorTagen(27), text: "Gesendet" },
    { key: "v5", typ: "lead", titel: "Funnel", erstellt: vorTagen(30), text: "Interesse an Marke & Website." },
  ],
  "demo-k2": [
    { key: "v1", typ: "deal", titel: "Deal angelegt: „Website & Anfragen — Vogt & Partner“", erstellt: vorTagen(10) },
    { key: "v2", typ: "mail", titel: "Ihr Termin ist bestätigt", erstellt: vorTagen(11), text: "Gesendet" },
    { key: "v3", typ: "lead", titel: "Buchung", erstellt: vorTagen(12), text: "Terminwunsch: Erstgespräch." },
  ],
  "demo-k3": [
    { key: "v1", typ: "notiz", titel: "Notiz von alex", erstellt: vorTagen(15), text: "Erste Woche im Betrieb — läuft gut." },
    { key: "v2", typ: "konto", titel: "Kunde geworden", erstellt: vorTagen(20) },
    { key: "v3", typ: "mail", titel: "Willkommen im Kundenbereich", erstellt: vorTagen(20), text: "Gesendet" },
    { key: "v4", typ: "deal", titel: "Deal angelegt: „E-Mail & Nachfassen — Roth Immobilien“", erstellt: vorTagen(20) },
    { key: "v5", typ: "deal", titel: "Deal angelegt: „Kombipaket — Roth Immobilien“", erstellt: vorTagen(38) },
  ],
  "demo-k4": [{ key: "v1", typ: "lead", titel: "Funnel", erstellt: vorTagen(9), text: "Interesse an Vertriebssystem." }],
  "demo-k5": [],
};

/** Server Action (per-Klick, kein N+1 beim Listen-Rendern — siehe
 *  Datei-Kopf) — reicht als Prop an KontakteClient, das sie beim Öffnen
 *  der Schnellansicht aufruft. */
async function kontaktVorschau(id: string): Promise<VorschauEintrag[]> {
  "use server";
  if (!crmKonfiguriert()) {
    return DEMO_VORSCHAU[id] ?? [];
  }
  return vorschauAusRaw(await kontakt360(id));
}

export default async function KontaktePage({
  searchParams,
}: {
  searchParams: Promise<{ fehler?: string; neu?: string }>;
}) {
  const { fehler, neu } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_KONTAKTE_DEFAULTS[key] ?? key;

  const kontakteRoh = konfiguriert ? await kontakteListe() : DEMO_KONTAKTE;
  const kontakte = [...kontakteRoh].sort((a, b) =>
    (a.name || a.firma || a.email).localeCompare(b.name || b.firma || b.email, "de"),
  );

  const fehlerText = fehler === "email" ? t("intern.kontakte.fehler_email") : null;

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mb-8 max-w-[640px]">
              <GelbeKarte label={t("intern.kontakte.demo_label")} titel={t("intern.kontakte.demo_titel")}>
                {t("intern.kontakte.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        {fehlerText && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-[13px] text-destructive">{fehlerText}</p>
            <Link
              href="/intern/kontakte"
              className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2"
            >
              {t("intern.kontakte.fehler_schliessen")}
            </Link>
          </div>
        )}

        <KontakteClient
          kopf={
            <SektionsKopf
              eyebrow={t("intern.kontakte.eyebrow")}
              titel={t("intern.kontakte.titel")}
              sub={t("intern.kontakte.sub")}
            />
          }
          kontakte={kontakte}
          vorschauAction={kontaktVorschau}
          neuOffen={neu === "1"}
          texte={{
            neuButton: t("intern.kontakte.neu_button"),
            suchePlatzhalter: t("intern.kontakte.suche_placeholder"),
            spalteName: t("intern.kontakte.spalte_name"),
            spalteFirma: t("intern.kontakte.spalte_firma"),
            spalteRolle: t("intern.kontakte.spalte_rolle"),
            spalteEmail: t("intern.kontakte.spalte_email"),
            spalteSeit: t("intern.kontakte.spalte_seit"),
            keineTreffer: t("intern.kontakte.keine_treffer"),
            leerText: t("intern.kontakte.leer_text"),
            leerCta: t("intern.kontakte.leer_cta"),
            dialogTitel: t("intern.kontakte.dialog_titel"),
            dialogBeschreibung: t("intern.kontakte.dialog_beschreibung"),
            feldName: t("intern.kontakte.feld_name"),
            feldEmail: t("intern.kontakte.feld_email"),
            feldTelefon: t("intern.kontakte.feld_telefon"),
            feldFirma: t("intern.kontakte.feld_firma"),
            feldRolle: t("intern.kontakte.feld_rolle"),
            dialogSpeichern: t("intern.kontakte.dialog_speichern"),
            dialogAbbrechen: t("intern.kontakte.dialog_abbrechen"),
            dialogErfolg: t("intern.kontakte.dialog_erfolg"),
            dialogFehlerAllgemein: t("intern.kontakte.dialog_fehler_allgemein"),
            fehlerEmail: t("intern.kontakte.fehler_email"),
            sheetGanzeAkte: t("intern.kontakte.sheet.ganze_akte"),
            sheetLaedt: t("intern.kontakte.sheet.laedt"),
            akteKontaktSeit: t("intern.kontakte.akte.kontakt_seit"),
            akteKeineTelefon: t("intern.kontakte.akte.keine_telefon"),
            akteMailLabel: t("intern.kontakte.akte.mail_label"),
            akteTelLabel: t("intern.kontakte.akte.tel_label"),
            akteChronikTitel: t("intern.kontakte.akte.chronik_titel"),
            akteChronikLeer: t("intern.kontakte.akte.chronik_leer"),
          }}
        />
      </div>
    </div>
  );
}
