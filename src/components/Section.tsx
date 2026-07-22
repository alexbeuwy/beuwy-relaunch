import { ReactNode } from "react";

type Tone = "base" | "raised" | "elevated" | "bright";

export function Section({
  id,
  children,
  className = "",
  divider = true,
  tone = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  tone?: Tone;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`section-band section-band-${tone} relative ${
        divider ? "section-divider" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24">
        {children}
      </div>
    </section>
  );
}

/* Einheitlicher Sektionskopf — Rhythmus nach DESIGN-DIRECTION 2.2:
   Eyebrow → 16px → H2 → 20px → Intro → 48px → visuelles Element (children der Sektion) */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-12">
      <p className="t-label">{eyebrow}</p>
      <h2 className="t-h2 mt-4 max-w-[760px]">{title}</h2>
      {intro && <p className="t-body-lg mt-5 max-w-[560px]">{intro}</p>}
    </div>
  );
}
