import type { Metadata } from "next";
import Link from "next/link";
import { crmKonfiguriert, kontakt360, type BwKontakt } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_KONTAKTE_DEFAULTS } from "@/lib/texte/intern-kontakte";
import { GelbeKarte } from "@/components/MaklerElemente";

/**
 * /intern/kontakte/[id] — 360-Akte (R5 Leaf G3 — Kontakte & 360-Akte).
 * Server-Komponente: lädt bw_kontakt_360(id) über die einzig erlaubte
 * Datenschicht (src/lib/crm/db.ts::kontakt360), parst defensiv (Muster:
 * zuTageskommando() in src/app/intern/page.tsx) und rendert Kopf +
 * Dreispalter (Chronik · Deals · Aufgaben+Notiz).
 *
 * RPC-Vertrag von bw_kontakt_360(p_id) (bislang ohne SQL-Migration im
 * Repo — dieses Leaf legt die erwarteten Antwort-Schlüssel fest, genau
 * wie src/app/intern/page.tsx es für bw_tageskommando() vormacht):
 *   {
 *     kontakt: { id, erstellt, email, name, telefon, firma, rolle, notiz },
 *     leads:   [{ id, erstellt, quelle, nachricht, daten, score }],
 *     deals:   [{ id, erstellt, titel, wert_eur, status, verlust_grund }],
 *     mails:   [{ erstellt, vorlage, betreff, status }],
 *     notizen: [{ id, erstellt, autor, text }],
 *     aufgaben:[{ id, titel, faellig_am, erledigt }],  // roh, wird hier
 *                                                        // auf "offen" gefiltert
 *     konto:   { erstellt, projekt_status, daten } | null
 *   }
 * Jeder Schlüssel wird defensiv mit Fallback gelesen — fehlt die
 * Migration noch, liefert die RPC null (Standard-rpc()-Verhalten in
 * db.ts) und die Seite zeigt den "Kein Kontakt gefunden"-Zustand statt
 * zu crashen, exakt wie .../leads/[id]/page.tsx es heute schon tut.
 *
 * Chronik mischt Leads + Mails + Deals + Notizen chronologisch (Auftrag);
 * ein Konto-Eintrag kommt als fünfter, synthetischer Timeline-Punkt dazu,
 * sobald aus dem Kontakt ein Kunde wurde — dessen Intent-Onboarding-
 * Antworten (bw_konto.daten: Rolle/Ziele/Team/Stadt) erscheinen dort als
 * Chips, exakt wie für "Konto-Leads" im Auftrag beschrieben. Tool-Leads
 * (quelle="tool") klappen zusätzlich ihr Rechenergebnis
 * (lead.daten.ergebnis) als kompakte Definition-List auf.
 *
 * Schnell-Notiz: POST an /api/intern-kontakte (Aktion "notiz") — die
 * Route wählt serverseitig den jüngsten Lead dieses Kontakts und ruft
 * leadNotizAnlegen(); Design-Entscheidung für Kontakte ohne Lead siehe
 * Kommentar in src/app/api/intern-kontakte/route.ts.
 */

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ fehler?: string }>;

export const metadata: Metadata = {
  title: "Kontakt-Akte — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* ── Feste Domain-Vokabeln — dupliziert statt geteilt, exakt das in
   src/lib/texte/intern-pipeline.ts dokumentierte Muster (siehe dortiger
   Kommentar): Status/Quellen/Mail-Status sind Code-Konstanten, keine
   Studio-Texte. ─────────────────────────────────────────────────────── */
const QUELLE_LABEL: Record<string, string> = {
  funnel: "Funnel",
  booking: "Buchung",
  tool: "Tool",
  manuell: "Manuell",
};

const STATUS_LABELS: Record<string, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  termin: "Termin",
  angebot: "Angebot",
  kunde: "Kunde",
  verloren: "Verloren",
};

const STATUS_DOT: Record<string, string> = {
  neu: "bg-ink-dim",
  kontaktiert: "bg-ink-muted",
  termin: "bg-ink-muted",
  angebot: "bg-ink-muted",
  kunde: "bg-akzent",
  verloren: "bg-destructive",
};

const MAIL_STATUS_LABEL: Record<string, string> = {
  gesendet: "Gesendet",
  demo: "Demo",
  fehler: "Fehlgeschlagen",
};

const INTENT_LABELS: Record<string, string> = {
  rolle: "Rolle",
  ziele: "Ziele",
  ziel: "Ziel",
  teamgroesse: "Team",
  team: "Team",
  stadt: "Stadt",
  zeithorizont: "Zeithorizont",
  fokus: "Fokus",
};

const EURO = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/* ── Typen für die geparste 360-Antwort ──────────────────────────────── */

type Lead360 = {
  id: string;
  erstellt: string;
  quelle: string;
  nachricht: string;
  daten: Record<string, unknown>;
  score: number;
};

type Deal360 = {
  id: string;
  erstellt: string;
  titel: string;
  wertEur: number;
  status: string;
  verlustGrund: string;
};

type Mail360 = { erstellt: string; vorlage: string; betreff: string; status: string };
type Notiz360 = { id: string; erstellt: string; autor: string; text: string };
type Aufgabe360 = { id: string; titel: string; faelligAm: string | null };
type Konto360 = { erstellt: string; projektStatus: string; daten: Record<string, unknown> };

type KontaktAkte = {
  kontakt: BwKontakt;
  leads: Lead360[];
  deals: Deal360[];
  mails: Mail360[];
  notizen: Notiz360[];
  aufgaben: Aufgabe360[];
  konto: Konto360 | null;
};

function txt(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function zahl(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0;
}
function objekt(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

/** Defensives Parsen der RPC-Antwort — jeder Schlüssel einzeln mit Fallback,
 *  fehlende Migration führt zu null statt zu einem Crash (siehe Datei-Kopf). */
function zuAkte(raw: Record<string, unknown> | null): KontaktAkte | null {
  if (!raw) return null;
  const kRoh = objekt(raw.kontakt);
  const id = txt(kRoh.id);
  if (!id) return null;

  const kontakt: BwKontakt = {
    id,
    erstellt: txt(kRoh.erstellt),
    email: txt(kRoh.email),
    name: txt(kRoh.name),
    telefon: txt(kRoh.telefon),
    firma: txt(kRoh.firma),
    rolle: txt(kRoh.rolle),
    notiz: txt(kRoh.notiz),
  };

  const leads: Lead360[] = (Array.isArray(raw.leads) ? raw.leads : []).map((eintrag, i) => {
    const o = objekt(eintrag);
    return {
      id: txt(o.id, `lead-${i}`),
      erstellt: txt(o.erstellt),
      quelle: txt(o.quelle, "manuell"),
      nachricht: txt(o.nachricht),
      daten: objekt(o.daten),
      score: zahl(o.score),
    };
  });

  const deals: Deal360[] = (Array.isArray(raw.deals) ? raw.deals : []).map((eintrag, i) => {
    const o = objekt(eintrag);
    return {
      id: txt(o.id, `deal-${i}`),
      erstellt: txt(o.erstellt),
      titel: txt(o.titel, "Ohne Titel"),
      wertEur: zahl(o.wert_eur),
      status: txt(o.status, "neu"),
      verlustGrund: txt(o.verlust_grund),
    };
  });

  const mails: Mail360[] = (Array.isArray(raw.mails) ? raw.mails : []).map((eintrag) => {
    const o = objekt(eintrag);
    return { erstellt: txt(o.erstellt), vorlage: txt(o.vorlage), betreff: txt(o.betreff), status: txt(o.status) };
  });

  const notizen: Notiz360[] = (Array.isArray(raw.notizen) ? raw.notizen : []).map((eintrag, i) => {
    const o = objekt(eintrag);
    return { id: txt(o.id, `notiz-${i}`), erstellt: txt(o.erstellt), autor: txt(o.autor, "alex"), text: txt(o.text) };
  });

  const aufgaben: Aufgabe360[] = (Array.isArray(raw.aufgaben) ? raw.aufgaben : [])
    .map((eintrag, i) => {
      const o = objekt(eintrag);
      return {
        id: txt(o.id, `aufgabe-${i}`),
        titel: txt(o.titel, "Ohne Titel"),
        faelligAm: typeof o.faellig_am === "string" ? o.faellig_am : null,
        erledigt: o.erledigt === true,
      };
    })
    .filter((a) => !a.erledigt)
    .map(({ id: aid, titel, faelligAm }) => ({ id: aid, titel, faelligAm }));

  const kontoRoh = raw.konto && typeof raw.konto === "object" ? objekt(raw.konto) : null;
  const konto: Konto360 | null =
    kontoRoh && txt(kontoRoh.erstellt)
      ? { erstellt: txt(kontoRoh.erstellt), projektStatus: txt(kontoRoh.projekt_status), daten: objekt(kontoRoh.daten) }
      : null;

  return { kontakt, leads, deals, mails, notizen, aufgaben, konto };
}

/* ── Zeit-/Textformatierung — dieselbe kleine Implementierung wie in
   .../leads/[id]/page.tsx und src/app/intern/page.tsx, bewusst dupliziert
   statt geteilt (Konvention dieses Moduls). ─────────────────────────── */

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

function faelligLabel(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const heuteTag = new Date().toISOString().slice(0, 10);
  const faelligTag = d.toISOString().slice(0, 10);
  if (faelligTag === heuteTag) return "Heute fällig";
  const diffTage = Math.round((new Date(heuteTag).getTime() - new Date(faelligTag).getTime()) / 86_400_000);
  if (diffTage > 0) return `Überfällig seit ${diffTage} Tag${diffTage === 1 ? "" : "en"}`;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

/** "leistungPaket" / "start_datum" → "Leistung paket" / "Start datum" —
 *  reicht für eine lesbare Definition-List/Chip-Reihe ohne Wörterbuchpflege. */
function humanKey(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  if (!spaced) return key;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

type Chip = { label: string; wert: string };

function intentChips(daten: Record<string, unknown>): Chip[] {
  return Object.entries(daten)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .slice(0, 8)
    .map(([k, v]) => ({
      label: INTENT_LABELS[k] ?? humanKey(k),
      wert: Array.isArray(v) ? v.map(String).join(", ") : typeof v === "object" ? JSON.stringify(v) : String(v),
    }));
}

/* ── Chronik: Leads + Deals + Mails + Notizen (+ synthetischer
   Konto-Eintrag) chronologisch gemischt ─────────────────────────────── */

type ChronikTyp = "lead" | "mail" | "deal" | "notiz" | "konto";
type ChronikEintrag = {
  key: string;
  erstellt: string;
  typ: ChronikTyp;
  titel: string;
  text?: string;
  ergebnis?: Record<string, unknown> | null;
  chips?: Chip[];
};

const ART_LABEL: Record<ChronikTyp, string> = {
  lead: "Anfrage",
  mail: "Mail",
  deal: "Deal",
  notiz: "Notiz",
  konto: "Konto",
};

function chronikAus(akte: KontaktAkte): ChronikEintrag[] {
  const eintraege: ChronikEintrag[] = [];

  akte.leads.forEach((l) => {
    const ergebnisRoh = l.daten.ergebnis;
    const ergebnis =
      l.quelle === "tool" && ergebnisRoh && typeof ergebnisRoh === "object" && !Array.isArray(ergebnisRoh)
        ? (ergebnisRoh as Record<string, unknown>)
        : null;
    eintraege.push({
      key: `lead-${l.id}`,
      erstellt: l.erstellt,
      typ: "lead",
      titel: QUELLE_LABEL[l.quelle] ?? l.quelle,
      text: l.nachricht || undefined,
      ergebnis,
    });
  });

  akte.deals.forEach((d) => {
    eintraege.push({ key: `deal-${d.id}`, erstellt: d.erstellt, typ: "deal", titel: `Deal angelegt: „${d.titel}“` });
  });

  akte.mails.forEach((m, i) => {
    eintraege.push({
      key: `mail-${i}-${m.erstellt}`,
      erstellt: m.erstellt,
      typ: "mail",
      titel: m.betreff || m.vorlage || "E-Mail",
      text: MAIL_STATUS_LABEL[m.status] ?? m.status,
    });
  });

  akte.notizen.forEach((n) => {
    eintraege.push({ key: `notiz-${n.id}`, erstellt: n.erstellt, typ: "notiz", titel: `Notiz von ${n.autor}`, text: n.text });
  });

  if (akte.konto) {
    eintraege.push({
      key: "konto",
      erstellt: akte.konto.erstellt,
      typ: "konto",
      titel: "Kunde geworden",
      chips: intentChips(akte.konto.daten),
    });
  }

  return eintraege.sort((a, b) => new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime());
}

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import ───────────── */

function MailGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="1.5" y="3" width="13" height="10" rx="2" />
      <path d="M2 4l6 5 6-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TelefonGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
    </svg>
  );
}

function LeerGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="9" cy="9" r="7.6" />
      <path d="M6 9h6" strokeLinecap="round" />
    </svg>
  );
}

/* ── Bausteine ────────────────────────────────────────────────────────── */

function ErgebnisListe({ daten }: { daten: Record<string, unknown> }) {
  const eintraege = Object.entries(daten).filter(([, v]) => v !== null && v !== undefined && v !== "");
  if (eintraege.length === 0) return null;
  return (
    <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-akzent-wash/60 p-3 sm:grid-cols-3">
      {eintraege.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[10px] font-medium uppercase tracking-[0.04em] text-ink-muted">{humanKey(k)}</dt>
          <dd className="tnum truncate font-mono text-[12.5px] font-semibold text-ink-cream">
            {Array.isArray(v) ? v.map(String).join(", ") : String(v)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ChipReihe({ chips }: { chips: Chip[] }) {
  if (chips.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <span
          key={c.label}
          className="inline-flex items-center gap-1 rounded-full border border-line-subtle bg-bg-elevated px-2.5 py-1 text-[11.5px] text-ink-muted"
        >
          <span className="font-medium text-ink-cream">{c.label}:</span>
          {c.wert}
        </span>
      ))}
    </div>
  );
}

function TypBadge({ typ }: { typ: ChronikTyp }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-ink-muted">
      {ART_LABEL[typ]}
    </span>
  );
}

function ChronikZeile({ eintrag, tx }: { eintrag: ChronikEintrag; tx: (key: string) => string }) {
  return (
    <div className="border-b border-line-subtle py-3.5 last:border-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="t-data tnum w-16 shrink-0 !text-ink-dim">{zeitRelativ(eintrag.erstellt)}</span>
        <TypBadge typ={eintrag.typ} />
        <p className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink-cream">{eintrag.titel}</p>
      </div>
      {eintrag.text && <p className="t-small mt-1 pl-[4.75rem]">{eintrag.text}</p>}
      {eintrag.ergebnis && Object.keys(eintrag.ergebnis).length > 0 && (
        <div className="pl-[4.75rem]">
          <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-dim">
            {tx("intern.kontakte.akte.ergebnis_titel")}
          </p>
          <ErgebnisListe daten={eintrag.ergebnis} />
        </div>
      )}
      {eintrag.chips && eintrag.chips.length > 0 && (
        <div className="pl-[4.75rem]">
          <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-dim">
            {tx("intern.kontakte.akte.intent_titel")}
          </p>
          <ChipReihe chips={eintrag.chips} />
        </div>
      )}
    </div>
  );
}

function DealZeile({ deal }: { deal: Deal360 }) {
  return (
    <div className="border-b border-line-subtle py-3 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink-cream">{deal.titel}</p>
        <span className="tnum shrink-0 font-mono text-[13px] font-semibold text-ink-cream">{EURO.format(deal.wertEur)}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[deal.status] ?? "bg-ink-dim"}`} aria-hidden />
        <span className="text-[11.5px] text-ink-muted">{STATUS_LABELS[deal.status] ?? deal.status}</span>
      </div>
      {deal.status === "verloren" && deal.verlustGrund && (
        <p className="mt-1 truncate text-[11px] text-ink-dim">{deal.verlustGrund}</p>
      )}
    </div>
  );
}

function AufgabeZeile({ aufgabe }: { aufgabe: Aufgabe360 }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line-subtle py-2.5 last:border-0">
      <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-cream">{aufgabe.titel}</p>
      {aufgabe.faelligAm && <span className="t-data tnum shrink-0 !text-ink-dim">{faelligLabel(aufgabe.faelligAm)}</span>}
    </div>
  );
}

function SpaltenLeer({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line-subtle px-4 py-8 text-center">
      <LeerGlyph />
      <p className="t-small mt-2.5 !text-ink-dim">{text}</p>
    </div>
  );
}

/* ── Demo-Daten (crmKonfiguriert()===false) — dieselben Kontakt-IDs wie in
   .../kontakte/page.tsx, hier mit voller 360-Historie ausgestattet, damit
   "Zeile → Akte" auch im Demo-Modus vollständig durchspielbar bleibt
   (Konvention: unabhängig gepflegte DEMO_*-Sets je Datei, siehe dortiger
   Kommentar). ─────────────────────────────────────────────────────────── */
const TAG = 24 * 3_600_000;
const jetzt = Date.now();
const vor = (ms: number) => new Date(jetzt - ms).toISOString();

const DEMO_AKTEN: Record<string, KontaktAkte> = {
  "demo-k1": {
    kontakt: {
      id: "demo-k1",
      erstellt: vor(30 * TAG),
      email: "julia.berger@beispiel.de",
      name: "Julia Berger",
      telefon: "",
      firma: "Berger Immobilien",
      rolle: "Geschäftsführerin",
      notiz: "",
    },
    leads: [
      {
        id: "demo-l1a",
        erstellt: vor(30 * TAG),
        quelle: "funnel",
        nachricht: "Interesse an Marke & Website.",
        daten: {
          rolle: "Geschäftsführerin",
          fokus: "Marke & Auftritt, Website & Anfragen",
          abschluesse_jahr: "12–20",
          zeithorizont: "So schnell wie möglich",
        },
        score: 68,
      },
      {
        id: "demo-l1b",
        erstellt: vor(26 * TAG),
        quelle: "tool",
        nachricht: "Detaillierte Auswertung angefordert: Verkaufspreisrechner.",
        daten: {
          tool: "verkaufspreis",
          ergebnis: { orientierungswert_eur: 428_000, preis_pro_qm_eur: 3120, vergleichsobjekte: 6 },
        },
        score: 91,
      },
    ],
    deals: [
      { id: "demo-d1a", erstellt: vor(28 * TAG), titel: "Marke & Auftritt — Berger Immobilien", wertEur: 6500, status: "neu", verlustGrund: "" },
      { id: "demo-d1b", erstellt: vor(10 * TAG), titel: "Erweiterungsmandat — Zweitmarke", wertEur: 4200, status: "kontaktiert", verlustGrund: "" },
    ],
    mails: [{ erstellt: vor(27 * TAG), vorlage: "willkommen", betreff: "Willkommen bei beuwy", status: "gesendet" }],
    notizen: [{ id: "demo-n1a", erstellt: vor(5 * TAG), autor: "alex", text: "Rückruf vereinbart für nächste Woche." }],
    aufgaben: [{ id: "demo-a1a", titel: "Julia Berger zurückrufen — Termin bestätigen", faelligAm: vor(0) }],
    konto: null,
  },
  "demo-k2": {
    kontakt: {
      id: "demo-k2",
      erstellt: vor(12 * TAG),
      email: "m.vogt@beispiel.de",
      name: "Markus Vogt",
      telefon: "+49 170 0000000",
      firma: "Vogt & Partner",
      rolle: "Inhaber",
      notiz: "",
    },
    leads: [
      {
        id: "demo-l2a",
        erstellt: vor(12 * TAG),
        quelle: "booking",
        nachricht: "Terminwunsch: Erstgespräch.",
        daten: { typ: "Erstgespräch" },
        score: 74,
      },
    ],
    deals: [{ id: "demo-d2a", erstellt: vor(10 * TAG), titel: "Website & Anfragen — Vogt & Partner", wertEur: 12_000, status: "termin", verlustGrund: "" }],
    mails: [{ erstellt: vor(11 * TAG), vorlage: "termin_bestaetigung", betreff: "Ihr Termin ist bestätigt", status: "gesendet" }],
    notizen: [],
    aufgaben: [{ id: "demo-a2a", titel: "Angebot für Vogt & Partner nachfassen", faelligAm: vor(2 * TAG) }],
    konto: null,
  },
  "demo-k3": {
    kontakt: {
      id: "demo-k3",
      erstellt: vor(60 * TAG),
      email: "sabine.roth@beispiel.de",
      name: "Sabine Roth",
      telefon: "",
      firma: "Roth Immobilien",
      rolle: "Geschäftsführerin",
      notiz: "",
    },
    leads: [
      {
        id: "demo-l3a",
        erstellt: vor(60 * TAG),
        quelle: "tool",
        nachricht: "Auswertung Mietpreisrechner angefordert.",
        daten: { tool: "mietpreis", ergebnis: { marktmiete_eur_qm: 11.8, empfohlene_miete_eur: 980, vergleichsobjekte: 9 } },
        score: 47,
      },
      { id: "demo-l3b", erstellt: vor(40 * TAG), quelle: "manuell", nachricht: "Manuell angelegt nach Telefonat.", daten: {}, score: 80 },
    ],
    deals: [
      { id: "demo-d3a", erstellt: vor(38 * TAG), titel: "Kombipaket — Roth Immobilien", wertEur: 24_000, status: "angebot", verlustGrund: "" },
      { id: "demo-d3b", erstellt: vor(20 * TAG), titel: "E-Mail & Nachfassen — Roth Immobilien", wertEur: 3000, status: "kunde", verlustGrund: "" },
    ],
    mails: [{ erstellt: vor(20 * TAG), vorlage: "onboarding", betreff: "Willkommen im Kundenbereich", status: "gesendet" }],
    notizen: [{ id: "demo-n3a", erstellt: vor(15 * TAG), autor: "alex", text: "Erste Woche im Betrieb — läuft gut." }],
    aufgaben: [],
    konto: {
      erstellt: vor(20 * TAG),
      projektStatus: "betrieb",
      daten: { rolle: "Geschäftsführerin", ziele: "Mehr qualifizierte Anfragen pro Monat", teamgroesse: "2–5", stadt: "Leipzig" },
    },
  },
  "demo-k4": {
    kontakt: {
      id: "demo-k4",
      erstellt: vor(9 * TAG),
      email: "t.weiss@beispiel.de",
      name: "Thomas Weiss",
      telefon: "",
      firma: "Weiss & Sohn Immobilien",
      rolle: "",
      notiz: "",
    },
    leads: [{ id: "demo-l4a", erstellt: vor(9 * TAG), quelle: "funnel", nachricht: "Interesse an Vertriebssystem.", daten: { fokus: "Automatisierung" }, score: 55 }],
    deals: [],
    mails: [],
    notizen: [],
    aufgaben: [],
    konto: null,
  },
  "demo-k5": {
    kontakt: {
      id: "demo-k5",
      erstellt: vor(3 * TAG),
      email: "nina.freitag@beispiel.de",
      name: "Nina Freitag",
      telefon: "",
      firma: "",
      rolle: "",
      notiz: "",
    },
    leads: [],
    deals: [],
    mails: [],
    notizen: [],
    aufgaben: [],
    konto: null,
  },
};

export default async function KontaktAktePage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const { fehler } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_KONTAKTE_DEFAULTS[key] ?? key;

  const akte = konfiguriert ? zuAkte(await kontakt360(id)) : DEMO_AKTEN[id] ?? null;

  if (!akte) {
    return (
      <div className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="t-label">Intern · Kontakte</p>
          <h1 className="t-h2 mt-4">{t("intern.kontakte.akte.nicht_gefunden_titel")}</h1>
          <p className="t-body mt-4">{t("intern.kontakte.akte.nicht_gefunden_text")}</p>
          <Link href="/intern/kontakte" className="ref-link mt-6 inline-block">
            {t("intern.kontakte.akte.zurueck")}
          </Link>
        </div>
      </div>
    );
  }

  const { kontakt } = akte;
  const chronik = chronikAus(akte);

  const notizFehlerText =
    fehler === "kein_lead"
      ? t("intern.kontakte.akte.notiz_kein_lead")
      : fehler === "leer"
        ? t("intern.kontakte.akte.notiz_leer")
        : null;

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Link
          href="/intern/kontakte"
          className="t-small !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
        >
          {t("intern.kontakte.akte.zurueck")}
        </Link>

        {!konfiguriert && (
          <div className="mt-5 max-w-[640px]">
            <GelbeKarte label={t("intern.kontakte.demo_label")} titel={t("intern.kontakte.demo_titel")}>
              {t("intern.kontakte.demo_text")}
            </GelbeKarte>
          </div>
        )}

        {/* ── Kopf: Name/Firma/Rolle + Kanäle ─────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="t-label">Intern · Kontakt</p>
            <h1 className="t-h2 mt-3">{kontakt.name || "Ohne Namen"}</h1>
            {(kontakt.firma || kontakt.rolle) && (
              <p className="t-body-lg mt-2">{[kontakt.firma, kontakt.rolle].filter(Boolean).join(" · ")}</p>
            )}
            <p className="t-small mt-2">
              {t("intern.kontakte.akte.kontakt_seit")} {zeitRelativ(kontakt.erstellt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${kontakt.email}`}
              aria-label={t("intern.kontakte.akte.mail_label")}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-subtle px-3.5 py-2 text-[12.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
            >
              <MailGlyph /> {kontakt.email || "–"}
            </a>
            {kontakt.telefon ? (
              <a
                href={`tel:${kontakt.telefon}`}
                aria-label={t("intern.kontakte.akte.tel_label")}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-subtle px-3.5 py-2 text-[12.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
              >
                <TelefonGlyph /> {kontakt.telefon}
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-dashed border-line-subtle px-3.5 py-2 text-[12.5px] text-ink-dim">
                {t("intern.kontakte.akte.keine_telefon")}
              </span>
            )}
          </div>
        </div>

        {/* ── Dreispalter ──────────────────────────────────────────────── */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* (1) Chronik */}
          <section className="rounded-2xl border border-line-subtle p-6">
            <p className="t-label">{t("intern.kontakte.akte.chronik_titel")}</p>
            <div className="mt-4">
              {chronik.length === 0 ? (
                <SpaltenLeer text={t("intern.kontakte.akte.chronik_leer")} />
              ) : (
                chronik.map((eintrag) => <ChronikZeile key={eintrag.key} eintrag={eintrag} tx={t} />)
              )}
            </div>
          </section>

          {/* (2) Deals */}
          <section className="rounded-2xl border border-line-subtle p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="t-label">{t("intern.kontakte.akte.deals_titel")}</p>
              <Link
                href="/intern/pipeline"
                className="t-small shrink-0 !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
              >
                {t("intern.kontakte.akte.deals_alle_link")} →
              </Link>
            </div>
            <div className="mt-4">
              {akte.deals.length === 0 ? (
                <SpaltenLeer text={t("intern.kontakte.akte.deals_leer")} />
              ) : (
                [...akte.deals]
                  .sort((a, b) => new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime())
                  .map((deal) => <DealZeile key={deal.id} deal={deal} />)
              )}
            </div>
          </section>

          {/* (3) Aufgaben + Schnell-Notiz */}
          <section className="rounded-2xl border border-line-subtle p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="t-label">{t("intern.kontakte.akte.aufgaben_titel")}</p>
              <Link
                href="/intern/aufgaben"
                className="t-small shrink-0 !text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:!text-ink-cream"
              >
                {t("intern.kontakte.akte.aufgaben_alle_link")} →
              </Link>
            </div>
            <div className="mt-4">
              {akte.aufgaben.length === 0 ? (
                <SpaltenLeer text={t("intern.kontakte.akte.aufgaben_leer")} />
              ) : (
                akte.aufgaben.map((aufgabe) => <AufgabeZeile key={aufgabe.id} aufgabe={aufgabe} />)
              )}
            </div>

            <div className="mt-6 border-t border-line-subtle pt-5">
              <p className="t-label">{t("intern.kontakte.akte.notiz_titel")}</p>
              {notizFehlerText && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5">
                  <p className="text-[12.5px] text-destructive">{notizFehlerText}</p>
                  <Link
                    href={`/intern/kontakte/${kontakt.id}`}
                    className="shrink-0 text-[11.5px] font-medium text-destructive underline underline-offset-2"
                  >
                    {t("intern.kontakte.fehler_schliessen")}
                  </Link>
                </div>
              )}
              <form action="/api/intern-kontakte" method="POST" className="mt-3 flex flex-col gap-2.5">
                <input type="hidden" name="aktion" value="notiz" />
                <input type="hidden" name="kontaktId" value={kontakt.id} />
                <textarea
                  name="text"
                  required
                  rows={3}
                  placeholder={t("intern.kontakte.akte.notiz_platzhalter")}
                  className="booking-input w-full resize-y text-[13px]"
                />
                <button
                  type="submit"
                  className="self-start rounded-full bg-akzent px-5 py-2 text-[12.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
                >
                  {t("intern.kontakte.akte.notiz_speichern")}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
