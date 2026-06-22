/**
 * CasePlate — eine designte KPI-Tafel für Cases, zu denen es (noch) kein
 * echtes Foto gibt (acta, PURELEI, Snocks). Statt ein Stockfoto zu faken,
 * zeigen wir die eine harte Zahl groß — editorial, markenkonform, ehrlich.
 *
 * Server-Komponente (kein State). Selbe 16/9-Bühne wie AssetSlot, damit das
 * /work-Raster ruhig bleibt. Optional ein echtes Logo (z. B. PURELEI-SVG).
 */

type Props = {
  client: string;
  kpi: string;
  kpiLabel: string;
  cat: string;
  /** Optionaler echter Logo-Pfad (SVG/PNG) statt Wortmarke. */
  logoSrc?: string;
  caption?: string;
  className?: string;
};

export function CasePlate({ client, kpi, kpiLabel, cat, logoSrc, caption, className = "" }: Props) {
  // Manche Cases haben keine harte Zahl (kpi === "—"). Dann wird das Label
  // groß gesetzt, statt einen leeren Bindestrich zu zeigen.
  const hasNum = Boolean(kpi) && kpi.trim() !== "—" && kpi.trim() !== "";
  const bigText = hasNum ? kpi : kpiLabel;
  const subText = hasNum ? kpiLabel : null;

  return (
    <figure className={`caseplate ${className}`}>
      <div className="caseplate-stage" aria-hidden={false} role="img" aria-label={`${client}: ${kpi} ${kpiLabel}`}>
        <div className="caseplate-grid" aria-hidden />
        <div className="caseplate-glow" aria-hidden />

        <div className="caseplate-top">
          <span className="caseplate-eyebrow">{cat}</span>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="caseplate-logo" src={logoSrc} alt={`${client} Logo`} />
          ) : (
            <span className="caseplate-client">{client}</span>
          )}
        </div>

        <div className="caseplate-kpi" data-nonum={!hasNum}>
          <span className="caseplate-kpi-num">{bigText}</span>
          {subText && <span className="caseplate-kpi-label">{subText}</span>}
        </div>

        <span className="caseplate-watermark">beuwy · Beleg</span>
      </div>
      {caption && <figcaption className="asset-slot-caption">{caption}</figcaption>}
    </figure>
  );
}
