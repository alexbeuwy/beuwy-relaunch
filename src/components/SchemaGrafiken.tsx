import { Logo } from "./Logo";

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
      <div className="rounded-[20px] border border-line-subtle bg-bg-elevated p-7 sm:p-8">
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

      {/* Die beuwy-Seite darf Farbe tragen (Alex, 26.08): Glas-Karte
          mit weichem Gold-Glow hinter der Kante, waehrend die
          Standard-Seite bewusst flach und grau bleibt. Der Kontrast
          zwischen den beiden Karten IST das Argument. */}
      <div className="relative rounded-[20px] p-7 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 0%, rgba(243, 226, 127, 0.55) 0%, rgba(243, 226, 127, 0.12) 45%, rgba(255,255,255,0) 75%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] border"
          style={{
            borderColor: "rgba(194, 161, 60, 0.35)",
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(14px) saturate(1.1)",
            WebkitBackdropFilter: "blur(14px) saturate(1.1)",
            boxShadow: "0 10px 34px rgba(194, 161, 60, 0.14)",
          }}
        />
        <div className="relative">
        {/* Eyebrow = Wortmarke statt Wort (Alex, 26.08) */}
        <p className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-dim">
          Mit <Logo statisch height={14} />
        </p>
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
    </div>
  );
}

/* ------------------------------------------------------------------
   3) WirkungsSpuren — was nach dem Umbau messbar passiert ist.

   FORM-ENTSCHEIDUNG (dataviz-Skill, Schritt 1): Die drei belegten
   Fälle messen in verschiedenen Einheiten — Partner, Wohneinheiten,
   Euro. Ein gemeinsames Achsensystem wäre eine Scheinordnung
   (Dual-Axis ist das meistgemachte Chart-Fehlurteil), deshalb SMALL
   MULTIPLES: je eine Spur mit eigener Skala, der Faktor als Label.
   Wo ein echter Startwert existiert, steht ein Dumbbell (vorher →
   nachher); wo es keinen gibt, steht ehrlich nur der Zeitraum.

   FARBE (Schritt 2/3): Emphasis statt kategorial — ein Hue
   (--chart-akzent) für den beuwy-Wert, De-Emphasis-Grau
   (--chart-kontext) für den Ausgangswert. Beide mit dem Paletten-
   Validator geprüft (ΔE 26.1 normal, 25.4 unter CVD).

   HOVER (Schritt 5): Bewusst keiner. Beide Datenpunkte jeder Spur
   sind direkt gelabelt — ein Tooltip würde nur wiederholen, was
   schon dasteht, und die Komponente ohne Not zur Client-Komponente
   machen. Das ist die im Skill genannte Ausnahme, kein Versäumnis.
   ------------------------------------------------------------------ */

type Spur = {
  kunde: string;
  einheit: string;
  vorher?: { wert: number; label: string };
  nachher: { wert: number; label: string };
  faktor?: string;
  zeitraum: string;
  fussnote?: string;
};

const WIRKUNGS_SPUREN: Spur[] = [
  {
    kunde: "Königswege",
    einheit: "Partner unter der Marke",
    vorher: { wert: 60, label: "60" },
    nachher: { wert: 2300, label: "2.300+" },
    faktor: "38×",
    zeitraum: "seit dem Relaunch",
  },
  {
    kunde: "acta",
    einheit: "Wohneinheiten verkauft",
    vorher: { wert: 0, label: "0" },
    nachher: { wert: 380, label: "380" },
    zeitraum: "in drei Jahren",
    fussnote: "Vertrieb über Instagram-Anzeigen, selbst aufgebaut",
  },
  {
    kunde: "RIEGEL Immobilien",
    einheit: "Abschlussvolumen",
    nachher: { wert: 342000, label: "342.000 €" },
    zeitraum: "in den ersten sechs Wochen",
    fussnote: "neun Abschlüsse in diesem Zeitraum",
  },
];

/** Eine Spur: Balkenpaar mit eigener Skala, beide Enden direkt gelabelt. */
function SpurGrafik({ spur }: { spur: Spur }) {
  // Eigene Skala je Spur — nie eine gemeinsame über verschiedene Einheiten.
  const max = spur.nachher.wert;
  const vorherAnteil = spur.vorher ? Math.max(spur.vorher.wert / max, 0) : null;

  return (
    <div className="flex flex-col gap-4">
      {spur.vorher && (
        <div className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.1em] text-ink-dim">
            Vorher
          </span>
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
            {/* Beim Wert 0 wird KEIN Balken gezeichnet — ein Mindest-
                balken für "nichts" wäre eine falsche Aussage. */}
            {spur.vorher.wert > 0 && (
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${Math.max((vorherAnteil ?? 0) * 100, 2)}%`,
                  background: "var(--chart-kontext)",
                }}
              />
            )}
          </span>
          <span className="w-20 shrink-0 text-right font-mono text-[13px] text-ink-muted tnum">
            {spur.vorher.label}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.1em] text-ink-dim">
          {spur.vorher ? "Heute" : "Ergebnis"}
        </span>
        <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: "100%",
              background: "var(--chart-akzent)",
              boxShadow: "0 0 14px var(--chart-akzent-glow)",
            }}
          />
        </span>
        <span
          className="w-20 shrink-0 text-right font-mono text-[13px] font-medium tnum"
          style={{ color: "var(--chart-akzent)" }}
        >
          {spur.nachher.label}
        </span>
      </div>
    </div>
  );
}

export function WirkungsSpuren() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {WIRKUNGS_SPUREN.map((spur) => (
        <figure
          key={spur.kunde}
          className="flex h-full flex-col rounded-[24px] border border-line-subtle bg-white p-7"
        >
          <figcaption className="mb-6">
            <p className="t-label !text-[10.5px]">{spur.kunde}</p>
            <p className="mt-2 text-[15px] font-medium leading-snug text-ink-cream">
              {spur.einheit}
            </p>
            <p className="mt-1 text-[13px] text-ink-muted">{spur.zeitraum}</p>
          </figcaption>

          <SpurGrafik spur={spur} />

          <p className="mt-6 border-t border-line-subtle pt-4 text-[13px] leading-snug text-ink-muted">
            {spur.faktor ? (
              <>
                <span
                  className="font-mono text-[15px] font-medium tnum"
                  style={{ color: "var(--chart-akzent)" }}
                >
                  {spur.faktor}
                </span>{" "}
                so viele wie vorher.
              </>
            ) : (
              spur.fussnote
            )}
          </p>
        </figure>
      ))}
    </div>
  );
}
