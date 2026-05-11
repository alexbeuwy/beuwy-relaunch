import { ReactNode } from "react";

export function Section({
  id,
  chapter,
  title,
  date,
  children,
  className = "",
  divider = true,
}: {
  id?: string;
  chapter?: string;
  title?: string;
  date?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${divider ? "section-divider" : ""} ${className}`}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[72px] md:py-[112px]">
        {(chapter || title || date) && (
          <div className="flex flex-wrap items-center gap-3 mb-[36px]">
            {chapter && (
              <span className="eyebrow">
                <span className="num">{chapter.split(" ")[0]}</span>{" "}
                {chapter.split(" ").slice(1).join(" ")}
              </span>
            )}
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
    xl: "text-[44px] md:text-[80px] leading-[0.96]",
    lg: "text-[36px] md:text-[64px] leading-[1.0]",
    md: "text-[28px] md:text-[44px] leading-[1.05]",
    sm: "text-[22px] md:text-[32px] leading-[1.1]",
  };
  return (
    <h2
      className={`h-display ${sizes[size]} ${className}`}
      style={{ letterSpacing: "-0.02em", color: "var(--ink-yellow)" }}
    >
      {children}
    </h2>
  );
}
