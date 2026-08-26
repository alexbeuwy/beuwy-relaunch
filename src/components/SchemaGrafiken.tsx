/**
 * SCHEMA-GRAFIKEN — zwei rein serverseitige Grafik-Komponenten für R2
 * (Repositionierung, BRIEF §9: Performance-Marketing-Fluss und das
 * No-Brainer-Schema Standard vs. beuwy). Reines HTML/Tailwind über
 * Tokens (Farben, Haarlinien, Typo-Leiter) — kein SVG-Import, keine
 * Icons-Grids, kein Schatten, kein Verlauf, ohne Client-Direktive am
 * Dateikopf. Beide Grafiken sind bewusst statisch; Reveal/Scroll-
 * Choreografie übernimmt die Sektion, die sie einbaut.
 *
 * Verwendung:
 *
 *   import { PerformanceFlow, ExposeVergleich } from "@/components/SchemaGrafiken";
 *
 *   // quote kommt aus dem Studio-Key mk.pm.quote (z. B. "5 %")
 *   <PerformanceFlow quote={content("mk.pm.quote")} />
 *
 *   <ExposeVergleich />
 */

/* ------------------------------------------------------------------
   1) PerformanceFlow — vier Stationen als Haarlinien-Raster (Grid statt
   Flex, Divide-Utilities statt eigener Verbindungslinien): Aufmerksamkeit
   → Marke → Anfragen → Endknoten mit der Quote. Mobil (Grid-Cols-1)
   stapelt sich die Reihe automatisch vertikal, die Haarlinien drehen mit
   (divide-y statt divide-x). Der einzige Gelb-Akzent ist die
   Wash-Fläche des Endknotens; die Quote selbst bleibt dunkle Tinte
   (Kontrakt: dunkler Text auf Gelb, nie weißer).
   ------------------------------------------------------------------ */

const PERFORMANCE_STUFEN = [
  { eyebrow: "Von außen", label: "Aufmerksamkeit" },
  { eyebrow: "Landet auf", label: "Der Marke" },
  { eyebrow: "Wird zu", label: "Anfragen" },
] as const;

export function PerformanceFlow({ quote }: { quote: string }) {
  return (
    <div className="grid grid-cols-1 divide-y divide-line-subtle overflow-hidden rounded-[20px] border border-line-subtle sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      {PERFORMANCE_STUFEN.map((stufe) => (
        <div key={stufe.label} className="flex flex-col justify-center gap-2 p-6 sm:p-7">
          <p className="t-label">{stufe.eyebrow}</p>
          <p className="t-h3">{stufe.label}</p>
        </div>
      ))}
      <div className="flex flex-col justify-center gap-2 bg-akzent-wash p-6 sm:p-7">
        <p className="t-label">Davon systematisch</p>
        <p className="font-mono text-[clamp(28px,4vw,38px)] font-medium leading-none tracking-[-0.01em] text-ink-cream tnum">
          <span className="mr-0.5 align-top text-[15px] font-normal text-ink-muted">~</span>
          {quote}
        </p>
        <p className="t-h3">Registrierte Kontakte</p>
        <p className="t-small">Mandanten, Kunden, Interessenten</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   2) ExposeVergleich — zwei Schema-Karten. Links drei identische
   Dokument-Silhouetten (immer gleiche Bauteile, immer gleiche
   Balkenbreiten) für "austauschbar". Rechts drei unterschiedlich
   aufgebaute Silhouetten (Bildplatte, Fließtext, Datenbalken) für
   "abgestimmt auf den Fall" — der Datenbalken trägt den einzigen
   Gelb-Akzent der Grafik. Reine Formen aus div/span, keine Fremdlogos,
   keine Screenshots.
   ------------------------------------------------------------------ */

const DOKUMENT_MASSE = "h-24 w-16 shrink-0 rounded-[6px] border p-2.5 sm:h-28 sm:w-[4.5rem]";

/** Immer dieselben Proportionen — dreimal identisch aufgerufen. */
function StandardDokument() {
  return (
    <div aria-hidden className={`${DOKUMENT_MASSE} flex flex-col gap-[6px] border-line-medium bg-white`}>
      <span className="h-4 w-full shrink-0 rounded-[2px] bg-bg-elevated" />
      <span className="h-[3px] w-full rounded-full bg-line-medium" />
      <span className="h-[3px] w-full rounded-full bg-line-medium" />
      <span className="h-[3px] w-4/5 rounded-full bg-line-medium" />
    </div>
  );
}

/** Bildplatte oben, eine kurze Zeile darunter. */
function BeuwyDokumentBild() {
  return (
    <div aria-hidden className={`${DOKUMENT_MASSE} flex flex-col gap-[6px] border-line-subtle bg-white`}>
      <span className="h-9 w-full shrink-0 rounded-[2px] bg-ink-cream/8" />
      <span className="h-[3px] w-3/5 rounded-full bg-ink-dim/50" />
    </div>
  );
}

/** Fließtext mit unterschiedlich langen Zeilen. */
function BeuwyDokumentText() {
  return (
    <div aria-hidden className={`${DOKUMENT_MASSE} flex flex-col justify-center gap-[6px] border-line-subtle bg-white`}>
      <span className="h-[3px] w-full rounded-full bg-ink-dim/50" />
      <span className="h-[3px] w-4/5 rounded-full bg-ink-dim/50" />
      <span className="h-[3px] w-full rounded-full bg-ink-dim/50" />
      <span className="h-[3px] w-2/3 rounded-full bg-ink-dim/50" />
    </div>
  );
}

/** Datenbalken — trägt den einzigen Gelb-Akzent der ganzen Grafik. */
function BeuwyDokumentDaten() {
  return (
    <div aria-hidden className={`${DOKUMENT_MASSE} flex flex-col justify-end gap-[6px] border-line-subtle bg-white`}>
      <span className="flex h-9 shrink-0 items-end gap-[4px]">
        <span className="w-[5px] rounded-t-[1px] bg-ink-dim/30" style={{ height: "45%" }} />
        <span className="w-[5px] rounded-t-[1px] bg-akzent" style={{ height: "100%" }} />
        <span className="w-[5px] rounded-t-[1px] bg-ink-dim/30" style={{ height: "65%" }} />
      </span>
      <span className="h-[3px] w-full rounded-full bg-ink-dim/50" />
    </div>
  );
}

export function ExposeVergleich() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
      <div className="rounded-[20px] border border-line-subtle bg-white p-7 sm:p-8">
        <p className="t-label">Der Standard</p>
        <p className="t-h3 mt-3">BOTTIMMO- und onOffice-Exposés</p>
        <div className="mt-6 flex items-end gap-3">
          <StandardDokument />
          <StandardDokument />
          <StandardDokument />
        </div>
        <p className="t-body mt-6">
          Sie wirken bei jedem Makler gleich und lassen sich kaum anpassen.
        </p>
      </div>

      <div className="rounded-[20px] border border-line-subtle bg-white p-7 sm:p-8">
        <p className="t-label">Mit beuwy</p>
        <p className="t-h3 mt-3">Maßarbeit für Ihr Unternehmen</p>
        <div className="mt-6 flex items-end gap-3">
          <BeuwyDokumentBild />
          <BeuwyDokumentText />
          <BeuwyDokumentDaten />
        </div>
        <p className="t-body mt-6">
          Sie bekommen maßgeschneiderte Dokumente und Kommunikation. Automatisierte
          Prozesse überzeugen und halten den Service auch mit kleinem Team einfach.
          Die Systeme denken an alles, Sie müssen es nicht. Der Fokus bleibt bei den Deals.
        </p>
      </div>
    </div>
  );
}
