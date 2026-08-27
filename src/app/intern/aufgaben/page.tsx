import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { crmKonfiguriert, tageskommando } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_AUFGABEN_DEFAULTS } from "@/lib/texte/intern-aufgaben";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * /intern/aufgaben — Aufgaben + Follow-ups (R5 Leaf G6, R5-FUNKTIONEN.md
 * Modul 9). Drei Gruppen offener Aufgaben (Überfällig — rot akzentuiert ·
 * Heute & morgen · Später & ohne Datum), eine Schnell-Anlage oben, eine
 * einklappbare "Erledigt (letzte 7 Tage)"-Historie unten.
 *
 * LESE-QUELLE — dokumentierte Einschränkung: src/lib/crm/db.ts kennt für
 * Aufgaben aktuell NUR aufgabeSpeichern() (Upsert/Schreiben). Die in
 * R5-FUNKTIONEN.md Modul 9 skizzierten Lese-RPCs (bw_aufgaben_liste,
 * bw_aufgaben_faellig_heute) haben in db.ts noch keinen Wrapper — und
 * db.ts liegt außerhalb der für dieses Leaf erlaubten Dateiliste, ein
 * eigener fetch/rpc-Aufruf ist ausdrücklich verboten. Einzig verfügbare
 * Lese-Quelle ist deshalb tageskommando() (RPC bw_tageskommando, ebenfalls
 * noch ohne SQL-Migration im Repo — siehe Vertrags-Kommentar in
 * src/app/intern/page.tsx, Leaf G1), deren "aufgaben"-Feld G1 bereits für
 * sein kleines "Fällige Aufgaben"-Panel nutzt: { id, titel, faellig_am,
 * bezug_typ }. Diese Seite liest dieselbe Liste und gruppiert sie clientlos
 * (Server-Komponente) selbst nach Datum. Zwei optionale Felder darüber
 * hinaus — "erledigt" (boolean) und "erledigt_am" (ISO-String) — werden
 * defensiv mitgelesen, falls eine künftige Migration sie liefert; fehlen
 * sie (heutiger Stand), gilt jede Zeile als offen und die
 * Erledigt-Historie bleibt ehrlich leer, statt etwas zu erfinden. FOLGE-
 * ARBEIT (außerhalb dieses Leafs): db.ts um einen echten
 * aufgabenListe()-Wrapper erweitern, der offene UND kürzlich erledigte
 * Aufgaben liefert — dann entfällt diese Einschränkung ersatzlos, ohne
 * dass sich an der Gruppierungs-/Render-Logik hier etwas ändern müsste.
 *
 * Schreiben läuft vollständig über /api/intern-aufgaben (dieses Leaf):
 * Schnell-Anlage (aktion=anlegen), Haken setzen (aktion=erledigen — Name
 * exakt wie im bereits bestehenden Formular auf src/app/intern/page.tsx,
 * siehe Kommentar dort), Erledigtes wieder öffnen (aktion=wieder-oeffnen).
 * Klassischer Form-POST, kein Client-JS nötig — "optimistisch" heißt hier
 * (Muster: AufgabeZeileRow in src/app/intern/page.tsx): sofortiges
 * visuelles Feedback beim Klick (Hover-/Active-Zustand) plus schneller
 * 303-Redirect zurück auf diese Seite, kein serverseitiges Warten mit
 * Ladezustand für eine einzelne Checkbox (Design-Direktive Regel 8:
 * Spinner nur für kompakte Inline-Aktionen, nicht für Seiteninhalte).
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

/** "Heute fällig" / "Morgen fällig" / "Überfällig seit X Tagen" / TT.MM.
 *  Erweiterung von faelligLabel() in src/app/intern/page.tsx um den
 *  Morgen-Fall, den diese Seite für ihre "Heute & morgen"-Gruppe explizit
 *  benennt. Tages-genauer Vergleich in UTC-Datumsteilen — dieselbe Technik
 *  wie im Vorbild, bewusst konsistent gehalten statt separat auf
 *  Europe/Berlin umzustellen. */
function faelligLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const heuteTag = new Date().toISOString().slice(0, 10);
  const faelligTag = d.toISOString().slice(0, 10);
  if (faelligTag === heuteTag) return "Heute fällig";
  const diffTage = Math.round(
    (new Date(heuteTag).getTime() - new Date(faelligTag).getTime()) / TAG_MS,
  );
  if (diffTage === -1) return "Morgen fällig";
  if (diffTage > 0) return `Überfällig seit ${diffTage} Tag${diffTage === 1 ? "" : "en"}`;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

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

const BTN_PRIMARY =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98] cursor-pointer";

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

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import (Konvention aus
   src/components/MaklerElemente.tsx). ──────────────────────────────────── */

function LeerGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="var(--ink-dim)" strokeWidth="1.4" aria-hidden>
      <circle cx="15" cy="15" r="12.6" />
      <path d="M9.5 15.3l3.7 3.7 7.6-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-auto shrink-0 text-ink-dim transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-open:rotate-180"
      aria-hidden
    >
      <path d="M3.5 5.25L7 8.75l3.5-3.5" />
    </svg>
  );
}

function HakGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7.2l2.8 2.8L11 4" />
    </svg>
  );
}

function AufgabeOffenRow({
  aufgabe,
  akzentDestruktiv,
  bezug,
}: {
  aufgabe: AufgabeZeile;
  akzentDestruktiv?: boolean;
  bezug: string | null;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line-subtle py-3 last:border-0">
      <form action="/api/intern-aufgaben" method="POST">
        <input type="hidden" name="aktion" value="erledigen" />
        <input type="hidden" name="id" value={aufgabe.id} />
        <input type="hidden" name="zurueck" value="/intern/aufgaben" />
        <button
          type="submit"
          aria-label={`„${aufgabe.titel}“ als erledigt markieren`}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-line-medium transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream hover:bg-akzent-wash"
        />
      </form>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink-cream">{aufgabe.titel}</p>
        {(aufgabe.faelligAm || bezug) && (
          <div className="mt-0.5 flex items-center gap-2">
            {aufgabe.faelligAm && (
              <span className={`t-data tnum ${akzentDestruktiv ? "!text-destructive" : "!text-ink-dim"}`}>
                {faelligLabel(aufgabe.faelligAm)}
              </span>
            )}
            {bezug && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted">
                {bezug}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
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
          <HakGlyph />
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

function GruppenPanel({
  titel,
  count,
  akzent = false,
  leer,
  leerText,
  children,
}: {
  titel: string;
  count: number;
  akzent?: boolean;
  leer: boolean;
  leerText: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line-subtle p-6">
      <div className="flex items-center gap-2.5">
        {akzent && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden />}
        <p className={`t-label ${akzent ? "!text-destructive" : ""}`}>{titel}</p>
        <span className="t-data tnum !text-ink-dim">{count}</span>
      </div>
      <div className="mt-3">{leer ? <p className="t-small !text-ink-dim py-1.5">{leerText}</p> : children}</div>
    </section>
  );
}

export default async function AufgabenPage({
  searchParams,
}: {
  searchParams: Promise<{ fehler?: string }>;
}) {
  const { fehler } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_AUFGABEN_DEFAULTS[key] ?? key;

  const aufgaben = konfiguriert ? zuAufgaben(await tageskommando()) : DEMO_AUFGABEN;

  const offene = aufgaben.filter((a) => !a.erledigt);
  const erledigte = [...aufgaben.filter(kuerzlichErledigt)].sort((a, b) => {
    const at = a.erledigtAm ? new Date(a.erledigtAm).getTime() : 0;
    const bt = b.erledigtAm ? new Date(b.erledigtAm).getTime() : 0;
    return bt - at;
  });

  const ueberfaellig = offene.filter((a) => gruppenSchluessel(a) === "ueberfaellig").sort(byFaellig);
  const heuteMorgen = offene.filter((a) => gruppenSchluessel(a) === "heute_morgen").sort(byFaellig);
  const spaeter = offene.filter((a) => gruppenSchluessel(a) === "spaeter").sort(byFaellig);

  const FEHLER_TEXT: Record<string, string> = {
    titel: t("intern.aufgaben.fehler_titel"),
    email: t("intern.aufgaben.fehler_email"),
  };
  const fehlerText = fehler ? (FEHLER_TEXT[fehler] ?? null) : null;

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[820px]">
        <Reveal>
          <SektionsKopf
            eyebrow={t("intern.aufgaben.eyebrow")}
            titel={t("intern.aufgaben.titel")}
            sub={t("intern.aufgaben.sub")}
          />
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mt-8">
              <GelbeKarte label={t("intern.aufgaben.demo_label")} titel={t("intern.aufgaben.demo_titel")}>
                {t("intern.aufgaben.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        {fehlerText && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-[13px] text-destructive">{fehlerText}</p>
            <Link
              href="/intern/aufgaben"
              className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2"
            >
              {t("intern.aufgaben.fehler_schliessen")}
            </Link>
          </div>
        )}

        {/* ── Schnell-Anlage ────────────────────────────────────────────── */}
        <Reveal delay={80}>
          <form
            action="/api/intern-aufgaben"
            method="POST"
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-line-subtle p-5 sm:flex-row sm:items-end"
          >
            <input type="hidden" name="aktion" value="anlegen" />
            <input type="hidden" name="zurueck" value="/intern/aufgaben" />
            <label className="block min-w-0 flex-1">
              <span className="t-label">{t("intern.aufgaben.neu.titel_label")}</span>
              <input
                name="titel"
                required
                maxLength={300}
                placeholder={t("intern.aufgaben.neu.titel_placeholder")}
                className="booking-input mt-1.5 w-full"
              />
            </label>
            <label className="block sm:w-[168px]">
              <span className="t-label">{t("intern.aufgaben.neu.faellig_label")}</span>
              <input name="faellig" type="date" className="booking-input mt-1.5 w-full" />
            </label>
            <label className="block sm:w-[240px]">
              <span className="t-label">{t("intern.aufgaben.neu.kontakt_label")}</span>
              <input
                name="kontaktEmail"
                type="email"
                placeholder={t("intern.aufgaben.neu.kontakt_placeholder")}
                className="booking-input mt-1.5 w-full"
              />
            </label>
            <button type="submit" className={BTN_PRIMARY}>
              {t("intern.aufgaben.neu.button")}
            </button>
          </form>
        </Reveal>

        {/* ── Offene Aufgaben: entweder drei Gruppen, oder ein einziger,
             klarer Leerzustand statt drei einzelner "nichts hier"-Zeilen
             (Design-Direktive Regel 7). ─────────────────────────────────── */}
        <Reveal delay={120}>
          {offene.length === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-14 text-center">
              <LeerGlyph />
              <p className="t-body mt-4 max-w-[26rem]">{t("intern.aufgaben.leer.gesamt")}</p>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-5">
              <GruppenPanel
                titel={t("intern.aufgaben.gruppe.ueberfaellig")}
                count={ueberfaellig.length}
                akzent
                leer={ueberfaellig.length === 0}
                leerText={t("intern.aufgaben.leer.ueberfaellig")}
              >
                {ueberfaellig.map((a) => (
                  <AufgabeOffenRow key={a.id} aufgabe={a} akzentDestruktiv bezug={bezugLabel(a.bezugTyp, t)} />
                ))}
              </GruppenPanel>

              <GruppenPanel
                titel={t("intern.aufgaben.gruppe.heute_morgen")}
                count={heuteMorgen.length}
                leer={heuteMorgen.length === 0}
                leerText={t("intern.aufgaben.leer.heute_morgen")}
              >
                {heuteMorgen.map((a) => (
                  <AufgabeOffenRow key={a.id} aufgabe={a} bezug={bezugLabel(a.bezugTyp, t)} />
                ))}
              </GruppenPanel>

              <GruppenPanel
                titel={t("intern.aufgaben.gruppe.spaeter")}
                count={spaeter.length}
                leer={spaeter.length === 0}
                leerText={t("intern.aufgaben.leer.spaeter")}
              >
                {spaeter.map((a) => (
                  <AufgabeOffenRow key={a.id} aufgabe={a} bezug={bezugLabel(a.bezugTyp, t)} />
                ))}
              </GruppenPanel>
            </div>
          )}
        </Reveal>

        {/* ── Erledigt, letzte 7 Tage — nativ einklappbar, kein JS nötig. ── */}
        <Reveal delay={160}>
          <details className="group mt-5 rounded-2xl border border-line-subtle p-6">
            <summary className="flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
              <p className="t-label">{t("intern.aufgaben.gruppe.erledigt")}</p>
              <span className="t-data tnum !text-ink-dim">{erledigte.length}</span>
              <ChevronGlyph />
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
