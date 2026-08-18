import { Reveal } from "@/components/Reveal";

/**
 * Zitatplatte mit Kante + Marken-Chips darunter. Farben/Kante kommen aus den CSS-Klassen.
 */
export function AuthorityBlock({
  text,
  brandsLabel,
  brands,
}: {
  text: string;
  brandsLabel: string;
  brands: string[];
}) {
  return (
    <Reveal>
      <div className="auth-plate">
        <p className="t-body-lg">{text}</p>
      </div>
      <p className="t-label mt-8">{brandsLabel}</p>
      <div className="auth-brands">
        {brands.map((brand) => (
          <span key={brand} className="auth-chip">
            {brand}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
