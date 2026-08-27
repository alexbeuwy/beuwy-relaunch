import type { Metadata } from "next";
import Link from "next/link";
import { crmKonfiguriert, kontakteListe, type BwKontakt } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_KONTAKTE_DEFAULTS } from "@/lib/texte/intern-kontakte";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * /intern/kontakte — Kontaktliste (R5 Leaf G3 — Kontakte & 360-Akte).
 * Server-Komponente: lädt die dedupliizierte Kontaktliste über die einzig
 * erlaubte Datenschicht (src/lib/crm/db.ts) und die Studio-Texte, rendert
 * eine kompakte Tabelle (Desktop) bzw. gestapelte Karten (Mobile, Design-
 * Direktive Regel 6) und reicht jede Zeile per Link auf die 360-Akte unter
 * /intern/kontakte/[id] weiter.
 *
 * Zwei Interaktionen laufen bewusst OHNE React-Client-Komponente, weil die
 * für dieses Leaf erlaubte Dateiliste keine eigene Client-Datei vorsieht
 * (nur die vier Dateien im Auftrag) — beide folgen bereits im Repo
 * etablierten, JS-armen Mustern:
 *  - "Kontakt anlegen": Checkbox-Hack (wie das mobile Sidebar-Overlay in
 *    src/app/intern/layout.tsx) öffnet/schließt den Dialog rein über CSS,
 *    das Formular selbst ist ein klassischer POST gegen /api/intern-kontakte
 *    (Muster: /intern/leads/[id]/page.tsx).
 *  - Suchfeld: ein minimales, Framework-loses Vanilla-JS-Snippet (Muster:
 *    NAV_SYNC_SCRIPT in layout.tsx) filtert Tabellenzeilen/Karten über ein
 *    data-suche-Attribut. Ohne JS bleiben alle Kontakte sichtbar — fail
 *    open, kein leerer Bildschirm.
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

const BTN_PRIMARY =
  "inline-flex shrink-0 items-center rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98] cursor-pointer";
const BTN_QUIET =
  "inline-flex shrink-0 items-center rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream cursor-pointer";

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import (Konvention aus
   src/components/MaklerElemente.tsx / KanbanBoard.tsx) ─────────────────── */

function SucheGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="7" cy="7" r="5" />
      <path d="M11 11l3.5 3.5" strokeLinecap="round" />
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

function KontakteGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink-dim)" strokeWidth="1.6" aria-hidden>
      <circle cx="15" cy="14" r="6" />
      <path d="M4 34c1-7 5.5-11 11-11s10 4 11 11" strokeLinecap="round" />
      <circle cx="29" cy="12" r="4.5" />
      <path d="M25 21c4-.8 8.3.6 10.8 5.4" strokeLinecap="round" />
    </svg>
  );
}

/** Kurze relative Zeitangabe (deutsch) — keine externe Library nötig
 *  (dieselbe kleine Implementierung wie in src/app/intern/page.tsx und
 *  .../leads/[id]/page.tsx, bewusst dupliziert statt geteilt). */
function zeitRelativ(iso: string): string {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return "–";
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

function sucheText(k: BwKontakt): string {
  return [k.name, k.firma, k.rolle, k.email].filter(Boolean).join(" ").toLowerCase();
}

/* Vanilla-JS-Filter — Muster: NAV_SYNC_SCRIPT in src/app/intern/layout.tsx.
   Setzt inline style.display nur beim Verstecken; beim Zeigen wird die
   Inline-Property geleert, danach entscheidet wieder die Tailwind-Klasse
   ("hidden lg:table-row" / "lg:hidden") über Desktop/Mobile-Sichtbarkeit —
   Suche und responsives Layout überschreiben sich so nicht gegenseitig. */
const SUCHE_SCRIPT = `(function(){
  var eingabe = document.getElementById('kontakte-suche');
  if (!eingabe) return;
  var zeilen = Array.prototype.slice.call(document.querySelectorAll('[data-kontakt-zeile]'));
  var leer = document.getElementById('kontakte-keine-treffer');
  function filtern(){
    var q = eingabe.value.trim().toLowerCase();
    var treffer = 0;
    zeilen.forEach(function(zeile){
      var text = zeile.getAttribute('data-suche') || '';
      var passt = !q || text.indexOf(q) !== -1;
      zeile.style.display = passt ? '' : 'none';
      if (passt) treffer++;
    });
    if (leer) leer.hidden = treffer !== 0;
  }
  eingabe.addEventListener('input', filtern);
})();`;

function KontaktZeileDesktop({ k, href }: { k: BwKontakt; href: string }) {
  return (
    <tr
      data-kontakt-zeile
      data-suche={sucheText(k)}
      className="relative border-b border-line-subtle transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated"
    >
      {/* Absolut positioniert relativ zur <tr> (position:relative oben) —
          macht die GANZE Zeile klickbar, nicht nur diese Zelle. */}
      <td className="px-4 py-3">
        <Link href={href} className="absolute inset-0 z-10" aria-label={k.name || k.email} />
        <span className="relative truncate text-[13.5px] font-medium text-ink-cream">{k.name || "Ohne Namen"}</span>
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-muted">{k.firma || "–"}</td>
      <td className="px-4 py-3 text-[13px] text-ink-muted">{k.rolle || "–"}</td>
      <td className="px-4 py-3 text-[13px] text-ink-muted">{k.email}</td>
      <td className="t-data tnum px-4 py-3 text-right !text-ink-dim">{zeitRelativ(k.erstellt)}</td>
    </tr>
  );
}

function KontaktKarteMobil({ k, href }: { k: BwKontakt; href: string }) {
  return (
    <div
      data-kontakt-zeile
      data-suche={sucheText(k)}
      className="relative rounded-xl border border-line-subtle bg-white p-4"
    >
      <Link href={href} className="absolute inset-0" aria-label={k.name || k.email} />
      <div className="flex items-start justify-between gap-3">
        <p className="truncate text-[14px] font-semibold text-ink-cream">{k.name || "Ohne Namen"}</p>
        <span className="t-data tnum shrink-0 !text-ink-dim">{zeitRelativ(k.erstellt)}</span>
      </div>
      {(k.firma || k.rolle) && (
        <p className="mt-1 truncate text-[12.5px] text-ink-muted">
          {[k.firma, k.rolle].filter(Boolean).join(" · ")}
        </p>
      )}
      <p className="mt-1.5 truncate text-[12.5px] text-ink-dim">{k.email}</p>
    </div>
  );
}

export default async function KontaktePage({
  searchParams,
}: {
  searchParams: Promise<{ fehler?: string }>;
}) {
  const { fehler } = await searchParams;
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
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SektionsKopf
              eyebrow={t("intern.kontakte.eyebrow")}
              titel={t("intern.kontakte.titel")}
              sub={t("intern.kontakte.sub")}
            />
            <label htmlFor="kontakte-neu" className={BTN_PRIMARY}>
              {t("intern.kontakte.neu_button")}
            </label>
          </div>
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mt-8 max-w-[640px]">
              <GelbeKarte label={t("intern.kontakte.demo_label")} titel={t("intern.kontakte.demo_titel")}>
                {t("intern.kontakte.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        {fehlerText && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-[13px] text-destructive">{fehlerText}</p>
            <Link
              href="/intern/kontakte"
              className="shrink-0 text-[12px] font-medium text-destructive underline underline-offset-2"
            >
              {t("intern.kontakte.fehler_schliessen")}
            </Link>
          </div>
        )}

        <Reveal delay={80}>
          <div className="mt-8">
            <div className="relative max-w-[360px]">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim">
                <SucheGlyph />
              </span>
              <input
                id="kontakte-suche"
                type="search"
                placeholder={t("intern.kontakte.suche_placeholder")}
                /* Inline statt Tailwind-Utility für padding-left: .booking-input
                   lebt selbst in @layer utilities (globals.css) und würde eine
                   Klassen-Utility gleicher Spezifität sonst per Quellreihenfolge
                   schlagen — inline gewinnt garantiert. */
                style={{ paddingLeft: "2.25rem" }}
                className="booking-input w-full"
              />
            </div>

            {kontakte.length === 0 ? (
              <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
                <KontakteGlyph />
                <p className="t-body mt-4 max-w-[26rem]">{t("intern.kontakte.leer_text")}</p>
                <label htmlFor="kontakte-neu" className={`${BTN_PRIMARY} mt-5`}>
                  {t("intern.kontakte.leer_cta")}
                </label>
              </div>
            ) : (
              <>
                <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-line-subtle lg:block">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-line-subtle bg-bg-elevated">
                        <th className="t-label px-4 py-3 font-medium">{t("intern.kontakte.spalte_name")}</th>
                        <th className="t-label px-4 py-3 font-medium">{t("intern.kontakte.spalte_firma")}</th>
                        <th className="t-label px-4 py-3 font-medium">{t("intern.kontakte.spalte_rolle")}</th>
                        <th className="t-label px-4 py-3 font-medium">{t("intern.kontakte.spalte_email")}</th>
                        <th className="t-label px-4 py-3 text-right font-medium">{t("intern.kontakte.spalte_seit")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kontakte.map((k) => (
                        <KontaktZeileDesktop key={k.id} k={k} href={`/intern/kontakte/${k.id}`} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 flex flex-col gap-3 lg:hidden">
                  {kontakte.map((k) => (
                    <KontaktKarteMobil key={k.id} k={k} href={`/intern/kontakte/${k.id}`} />
                  ))}
                </div>

                <div id="kontakte-keine-treffer" hidden className="mt-5 rounded-2xl border border-dashed border-line-subtle px-8 py-12 text-center">
                  <p className="t-small !text-ink-dim">{t("intern.kontakte.keine_treffer")}</p>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>

      {/* ── Dialog: Kontakt anlegen — Checkbox-Hack, kein Client-JS ─────── */}
      <input type="checkbox" id="kontakte-neu" className="peer sr-only" aria-label={t("intern.kontakte.dialog_titel")} />
      <label
        htmlFor="kontakte-neu"
        aria-hidden
        className="fixed inset-0 z-[60] hidden bg-ink-cream/50 backdrop-blur-sm peer-checked:block"
      />
      <div className="pointer-events-none fixed inset-0 z-[70] hidden items-center justify-center p-3 peer-checked:flex">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="kontakte-neu-titel"
          className="pointer-events-auto w-full max-w-md rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)]"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id="kontakte-neu-titel" className="text-[15px] font-semibold text-ink-cream">
              {t("intern.kontakte.dialog_titel")}
            </h2>
            <label
              htmlFor="kontakte-neu"
              aria-label={t("intern.kontakte.dialog_abbrechen")}
              className="-m-2 shrink-0 cursor-pointer rounded-md p-2 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
            >
              <Kreuz />
            </label>
          </div>
          <form action="/api/intern-kontakte" method="POST" className="mt-4 flex flex-col gap-3">
            <input type="hidden" name="aktion" value="anlegen" />
            <label className="block">
              <span className="t-label">{t("intern.kontakte.feld_name")}</span>
              <input name="name" className="booking-input mt-1.5 w-full" />
            </label>
            <label className="block">
              <span className="t-label">{t("intern.kontakte.feld_email")}</span>
              <input name="email" type="email" required className="booking-input mt-1.5 w-full" />
            </label>
            <label className="block">
              <span className="t-label">{t("intern.kontakte.feld_telefon")}</span>
              <input name="telefon" className="booking-input mt-1.5 w-full" />
            </label>
            <label className="block">
              <span className="t-label">{t("intern.kontakte.feld_firma")}</span>
              <input name="firma" className="booking-input mt-1.5 w-full" />
            </label>
            <label className="block">
              <span className="t-label">{t("intern.kontakte.feld_rolle")}</span>
              <input name="rolle" className="booking-input mt-1.5 w-full" />
            </label>
            <div className="mt-1 flex items-center gap-2">
              <button type="submit" className={BTN_PRIMARY}>
                {t("intern.kontakte.dialog_speichern")}
              </button>
              <label htmlFor="kontakte-neu" className={BTN_QUIET}>
                {t("intern.kontakte.dialog_abbrechen")}
              </label>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: SUCHE_SCRIPT }} />
    </div>
  );
}
