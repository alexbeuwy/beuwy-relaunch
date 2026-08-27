import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { crmKonfiguriert, tageskommando, kontakteListe } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_AUFGABEN_DEFAULTS } from "@/lib/texte/intern-aufgaben";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { AufgabenClient, type AufgabeItem, type KontaktOption } from "./AufgabenClient";

/**
 * /intern/aufgaben — Aufgaben + Follow-ups (R5 Leaf G6, R5-FUNKTIONEN.md
 * Modul 9; LEAF U3, 27.08 — Kontakte-/Aufgaben-UX-Politur).
 *
 * Server-Komponente: lädt/gruppiert Aufgaben wie zuvor, reicht die drei
 * offenen Gruppen + die Kontaktliste (für den Select-Kontakt-Picker im
 * "Aufgabe anlegen"-Dialog) an die neue Geschwisterdatei AufgabenClient
 * .tsx ("use client") — Dialog-State und der animierte Checkbox-Mikro-
 * Moment (motion/react) brauchen zwingend eine Client-Komponente (Muster:
 * CommandPalette.tsx aus Leaf U1 bzw. KontakteClient.tsx im selben Leaf).
 *
 * Die bisher permanent sichtbare Schnell-Anlage-Leiste ist damit weg —
 * ein "+ Aufgabe anlegen"-Button öffnet stattdessen ui/dialog, konsistent
 * zu Kontakte und zum bestehenden "?neu=1"-Sprungziel der CommandPalette.
 *
 * Die "Erledigt (letzte 7 Tage)"-Historie bleibt server-gerendert (natives
 * <details>, kein Mikro-Moment gefordert) — nur die drei offenen Gruppen
 * wandern in die Client-Komponente.
 *
 * LESE-QUELLE — dokumentierte Einschränkung (unverändert seit R5 G6):
 * src/lib/crm/db.ts kennt für Aufgaben aktuell nur aufgabeSpeichern()
 * (Schreiben) und liest hier weiterhin über tageskommando() (RPC
 * bw_tageskommando, siehe Vertrags-Kommentar in src/app/intern/page.tsx).
 * Zwei optionale Felder — "erledigt"/"erledigt_am" — werden defensiv
 * mitgelesen, falls eine künftige Migration sie liefert.
 */

export const metadata: Metadata = {
  title: "Aufgaben — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TAG_MS = 86_400_000;

type AufgabeZeile = {
  id: string;
  titel: string;
  faelligAm: string | null;
  bezugTyp: string | null;
  erledigt: boolean;
  erledigtAm: string | null;
};

function zuAufgaben(raw: Record<string, unknown> | null): AufgabeZeile[] {
  const roh = raw && Array.isArray(raw.aufgaben) ? raw.aufgaben : [];
  return roh.map((eintrag, i) => {
    const o = eintrag && typeof eintrag === "object" ? (eintrag as Record<string, unknown>) : {};
    return {
      id: typeof o.id === "string" || typeof o.id === "number" ? String(o.id) : `aufgabe-${i}`,
      titel: typeof o.titel === "string" && o.titel ? o.titel : "Ohne Titel",
      faelligAm: typeof o.faellig_am === "string" ? o.faellig_am : null,
      bezugTyp: typeof o.bezug_typ === "string" ? o.bezug_typ : null,
      erledigt: o.erledigt === true,
      erledigtAm: typeof o.erledigt_am === "string" ? o.erledigt_am : null,
    };
  });
}

/* ── Demo-Daten (crmKonfiguriert()===false) — eigenes Set, unabhängig von
   den DEMO_*-Konstanten in src/app/intern/page.tsx und .../kontakte/
   page.tsx gepflegt (Konvention: siehe Kommentar dort). Deckt alle vier
   Gruppen ab, damit der Demo-Modus sein volles Bild zeigt. ─────────────── */
const JETZT = Date.now();

const DEMO_AUFGABEN: AufgabeZeile[] = [
  {
    id: "demo-a1",
    titel: "Julia Berger zurückrufen — Termin bestätigen",
    faelligAm: new Date(JETZT - 3 * TAG_MS).toISOString(),
    bezugTyp: "lead",
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a2",
    titel: "Angebot für Vogt & Partner nachfassen",
    faelligAm: new Date(JETZT - 1 * TAG_MS).toISOString(),
    bezugTyp: "deal",
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a3",
    titel: "Ticket #482 beantworten",
    faelligAm: new Date(JETZT).toISOString(),
    bezugTyp: "ticket",
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a4",
    titel: "Vorbereitung Erstgespräch Nina Freitag",
    faelligAm: new Date(JETZT + 1 * TAG_MS).toISOString(),
    bezugTyp: "lead",
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a5",
    titel: "Exposé-Vorlage für Weiss & Sohn abstimmen",
    faelligAm: new Date(JETZT + 9 * TAG_MS).toISOString(),
    bezugTyp: "deal",
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a6",
    titel: "Referenzliste für neue Website zusammenstellen",
    faelligAm: null,
    bezugTyp: null,
    erledigt: false,
    erledigtAm: null,
  },
  {
    id: "demo-a7",
    titel: "Sabine Roth: Auswertung Verkaufspreisrechner besprochen",
    faelligAm: new Date(JETZT - 2 * TAG_MS).toISOString(),
    bezugTyp: "lead",
    erledigt: true,
    erledigtAm: new Date(JETZT - 1 * TAG_MS).toISOString(),
  },
  {
    id: "demo-a8",
    titel: "Onboarding-Unterlagen an Andrea Lang gesendet",
    faelligAm: new Date(JETZT - 5 * TAG_MS).toISOString(),
    bezugTyp: "deal",
    erledigt: true,
    erledigtAm: new Date(JETZT - 3 * TAG_MS).toISOString(),
  },
];

/* Eigenständiges Demo-Set für den Kontakt-Picker im "Aufgabe anlegen"-
   Dialog — inhaltlich an die Demo-Kontakte in kontakte/page.tsx angelehnt
   (gleiche Namen für ein stimmiges Demo-Erlebnis), aber unabhängig
   gepflegt (Konvention siehe Kopfkommentar). */
const DEMO_KONTAKT_OPTIONEN: KontaktOption[] = [
  { email: "julia.berger@beispiel.de", label: "Julia Berger — Berger Immobilien" },
  { email: "m.vogt@beispiel.de", label: "Markus Vogt — Vogt & Partner" },
  { email: "sabine.roth@beispiel.de", label: "Sabine Roth — Roth Immobilien" },
  { email: "t.weiss@beispiel.de", label: "Thomas Weiss — Weiss & Sohn Immobilien" },
  { email: "nina.freitag@beispiel.de", label: "Nina Freitag" },
];

/** Kurze relative Zeitangabe (deutsch) — dieselbe kleine Implementierung
 *  wie in src/app/intern/page.tsx und .../kontakte/page.tsx, bewusst
 *  dupliziert statt geteilt (Konvention dort dokumentiert). */
function zeitRelativ(iso: string): string {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return "";
  const minuten = Math.round((Date.now() - dann) / 60_000);
  if (minuten < 1) return "gerade eben";
  if (minuten < 60) return `vor ${minuten} Min.`;
  const stunden = Math.round(minuten / 60);
  if (stunden < 24) return `vor ${stunden} Std.`;
  const tage = Math.round(stunden / 24);
  return `vor ${tage} Tag${tage === 1 ? "" : "en"}`;
}

/* Die frühere faelligLabel()-Implementierung ("Heute fällig"/"Morgen
   fällig"/"Überfällig seit X Tagen"/TT.MM.) lebt jetzt nur noch in
   AufgabenClient.tsx (dieselbe Logik dupliziert) — sie wurde bislang
   ausschließlich von den offenen Zeilen gebraucht, die komplett dorthin
   gewandert sind. Die Erledigt-Historie hier zeigt wie zuvor nur
   zeitRelativ(erledigtAm) + Bezug, kein Fälligkeitsdatum. */

type Gruppe = "ueberfaellig" | "heute_morgen" | "spaeter";

function gruppenSchluessel(a: AufgabeZeile): Gruppe {
  if (!a.faelligAm) return "spaeter";
  const d = new Date(a.faelligAm);
  if (Number.isNaN(d.getTime())) return "spaeter";
  const heuteTag = new Date().toISOString().slice(0, 10);
  const morgenTag = new Date(Date.now() + TAG_MS).toISOString().slice(0, 10);
  const faelligTag = d.toISOString().slice(0, 10);
  if (faelligTag < heuteTag) return "ueberfaellig";
  if (faelligTag === heuteTag || faelligTag === morgenTag) return "heute_morgen";
  return "spaeter";
}

function byFaellig(a: AufgabeZeile, b: AufgabeZeile): number {
  if (!a.faelligAm && !b.faelligAm) return 0;
  if (!a.faelligAm) return 1;
  if (!b.faelligAm) return -1;
  return new Date(a.faelligAm).getTime() - new Date(b.faelligAm).getTime();
}

/** Nur Aufgaben, die als erledigt markiert UND (falls bekannt) innerhalb
 *  der letzten 7 Tage erledigt wurden — ohne erledigt_am lieber sichtbar
 *  zeigen als eine erledigte Aufgabe lautlos verschwinden lassen. */
function kuerzlichErledigt(a: AufgabeZeile): boolean {
  if (!a.erledigt) return false;
  if (!a.erledigtAm) return true;
  const dann = new Date(a.erledigtAm).getTime();
  if (Number.isNaN(dann)) return true;
  return Date.now() - dann <= 7 * TAG_MS;
}

const BEZUG_KEYS: Record<string, string> = {
  lead: "intern.aufgaben.bezug.lead",
  deal: "intern.aufgaben.bezug.deal",
  ticket: "intern.aufgaben.bezug.ticket",
};

function bezugLabel(typ: string | null, t: (key: string) => string): string | null {
  if (!typ) return null;
  const key = BEZUG_KEYS[typ];
  return t(key ?? "") || typ;
}

function zuItem(a: AufgabeZeile, t: (key: string) => string): AufgabeItem {
  return { id: a.id, titel: a.titel, faelligAm: a.faelligAm, bezug: bezugLabel(a.bezugTyp, t) };
}

function AufgabeErledigtRow({
  aufgabe,
  bezug,
  t,
}: {
  aufgabe: AufgabeZeile;
  bezug: string | null;
  t: (key: string) => string;
}) {
  const meta = [aufgabe.erledigtAm ? zeitRelativ(aufgabe.erledigtAm) : null, bezug].filter(Boolean).join(" · ");
  return (
    <div className="flex items-center gap-3 border-b border-line-subtle py-3 last:border-0">
      <form action="/api/intern-aufgaben" method="POST">
        <input type="hidden" name="aktion" value="wieder-oeffnen" />
        <input type="hidden" name="id" value={aufgabe.id} />
        <input type="hidden" name="zurueck" value="/intern/aufgaben" />
        <button
          type="submit"
          aria-label={`„${aufgabe.titel}“ wieder öffnen`}
          title={t("intern.aufgaben.wieder_oeffnen")}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-akzent bg-akzent text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
        >
          <Check size={11} strokeWidth={2.2} aria-hidden />
        </button>
      </form>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium !text-ink-dim line-through decoration-line-medium">
          {aufgabe.titel}
        </p>
        {meta && <p className="t-data tnum mt-0.5 !text-ink-dim">{meta}</p>}
      </div>
    </div>
  );
}

export default async function AufgabenPage({
  searchParams,
}: {
  searchParams: Promise<{ fehler?: string; neu?: string }>;
}) {
  const { fehler, neu } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_AUFGABEN_DEFAULTS[key] ?? key;

  const aufgaben = konfiguriert ? zuAufgaben(await tageskommando()) : DEMO_AUFGABEN;
  const kontaktOptionen: KontaktOption[] = konfiguriert
    ? (await kontakteListe()).map((k) => ({
        email: k.email,
        label: [k.name || k.email, k.firma].filter(Boolean).join(" — "),
      }))
    : DEMO_KONTAKT_OPTIONEN;

  const offene = aufgaben.filter((a) => !a.erledigt);
  const erledigte = [...aufgaben.filter(kuerzlichErledigt)].sort((a, b) => {
    const at = a.erledigtAm ? new Date(a.erledigtAm).getTime() : 0;
    const bt = b.erledigtAm ? new Date(b.erledigtAm).getTime() : 0;
    return bt - at;
  });

  const gruppen = {
    ueberfaellig: offene.filter((a) => gruppenSchluessel(a) === "ueberfaellig").sort(byFaellig).map((a) => zuItem(a, t)),
    heuteMorgen: offene.filter((a) => gruppenSchluessel(a) === "heute_morgen").sort(byFaellig).map((a) => zuItem(a, t)),
    spaeter: offene.filter((a) => gruppenSchluessel(a) === "spaeter").sort(byFaellig).map((a) => zuItem(a, t)),
  };

  const FEHLER_TEXT: Record<string, string> = {
    titel: t("intern.aufgaben.fehler_titel"),
    email: t("intern.aufgaben.fehler_email"),
  };
  const fehlerText = fehler ? (FEHLER_TEXT[fehler] ?? null) : null;

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[820px]">
        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mb-8">
              <GelbeKarte label={t("intern.aufgaben.demo_label")} titel={t("intern.aufgaben.demo_titel")}>
                {t("intern.aufgaben.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        {fehlerText && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-[13px] text-destructive">{fehlerText}</p>
            <Link
              href="/intern/aufgaben"
              className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2"
            >
              {t("intern.aufgaben.fehler_schliessen")}
            </Link>
          </div>
        )}

        <AufgabenClient
          kopf={
            <SektionsKopf
              eyebrow={t("intern.aufgaben.eyebrow")}
              titel={t("intern.aufgaben.titel")}
              sub={t("intern.aufgaben.sub")}
            />
          }
          gruppen={gruppen}
          kontakte={kontaktOptionen}
          neuOffen={neu === "1"}
          texte={{
            trigger: t("intern.aufgaben.neu.trigger"),
            dialogTitel: t("intern.aufgaben.dialog_titel"),
            dialogBeschreibung: t("intern.aufgaben.dialog_beschreibung"),
            titelLabel: t("intern.aufgaben.neu.titel_label"),
            titelPlatzhalter: t("intern.aufgaben.neu.titel_placeholder"),
            faelligLabelText: t("intern.aufgaben.neu.faellig_label"),
            kontaktLabel: t("intern.aufgaben.neu.kontakt_label"),
            kontaktKein: t("intern.aufgaben.neu.kontakt_kein"),
            kontaktSelectPlatzhalter: t("intern.aufgaben.neu.kontakt_select_placeholder"),
            dialogAbbrechen: t("intern.aufgaben.dialog_abbrechen"),
            button: t("intern.aufgaben.neu.button"),
            dialogErfolg: t("intern.aufgaben.dialog_erfolg"),
            dialogFehlerAllgemein: t("intern.aufgaben.dialog_fehler_allgemein"),
            fehlerTitel: t("intern.aufgaben.fehler_titel"),
            fehlerEmail: t("intern.aufgaben.fehler_email"),
            checkFehler: t("intern.aufgaben.check_fehler"),
            gruppeUeberfaellig: t("intern.aufgaben.gruppe.ueberfaellig"),
            gruppeHeuteMorgen: t("intern.aufgaben.gruppe.heute_morgen"),
            gruppeSpaeter: t("intern.aufgaben.gruppe.spaeter"),
            leerUeberfaellig: t("intern.aufgaben.leer.ueberfaellig"),
            leerHeuteMorgen: t("intern.aufgaben.leer.heute_morgen"),
            leerSpaeter: t("intern.aufgaben.leer.spaeter"),
            leerGesamt: t("intern.aufgaben.leer.gesamt"),
          }}
        />

        {/* ── Erledigt, letzte 7 Tage — server-gerendert, nativ einklappbar,
             kein Mikro-Moment gefordert (Auftragspunkt 3 gilt nur für die
             drei offenen Gruppen in AufgabenClient.tsx). ────────────────── */}
        <Reveal delay={160}>
          <details className="group mt-5 rounded-2xl border border-line-subtle p-6">
            <summary className="flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
              <p className="t-label">{t("intern.aufgaben.gruppe.erledigt")}</p>
              <span className="t-data tnum !text-ink-dim">{erledigte.length}</span>
              <ChevronDown
                size={14}
                aria-hidden
                className="ml-auto shrink-0 text-ink-dim transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-open:rotate-180"
              />
            </summary>
            <div className="mt-3">
              {erledigte.length === 0 ? (
                <p className="t-small !text-ink-dim py-1.5">{t("intern.aufgaben.leer.erledigt")}</p>
              ) : (
                erledigte.map((a) => (
                  <AufgabeErledigtRow key={a.id} aufgabe={a} bezug={bezugLabel(a.bezugTyp, t)} t={t} />
                ))
              )}
            </div>
          </details>
        </Reveal>
      </div>
    </div>
  );
}
