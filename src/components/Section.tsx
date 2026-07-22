import { ReactNode } from "react";
import { ChapterLabel } from "./ChapterLabel";

type Tone = "base" | "raised" | "elevated" | "bright";

export function Section({
  id,
  chapter,
  title,
  date,
  children,
  className = "",
  divider = true,
  tone = "base",
}: {
  id?: string;
  chapter?: string;
  title?: string;
  date?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
  tone?: Tone;
}) {
  const chapterNum = chapter ? chapter.split(" ")[0] : "";
  const chapterRest = chapter ? chapter.split(" ").slice(1).join(" ") : "";

  return (
    <section
      id={id}
      data-tone={tone}
      className={`section-band section-band-${tone} relative ${
        divider ? "section-divider" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24">
        {(chapter || title || date) && (
          <div className="flex flex-wrap items-center gap-3 mb-[36px]">
            {chapter && <ChapterLabel num={chapterNum} rest={chapterRest} />}
            {title && (
              <span className="eyebrow" style={{ color: "var(--ink-cream)" }}>
                · {title}
              </span>
            )}
            {date && (
              <span className="eyebrow" style={{ marginLeft: "auto" }}>
                {date}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function HeadlineDisplay({
  size = "lg",
  children,
  className = "",
}: {
  size?: "xl" | "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
}) {
  const sizes: Record<string, string> = {
    xl: "t-display",
    lg: "t-h2",
    md: "t-h2",
    sm: "t-h3",
  };
  return <h2 className={`${sizes[size]} ${className}`}>{children}</h2>;
}
