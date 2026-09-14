import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * LEAF B2 — /tools Hub. Drei Rechner als Karten (Verkaufspreis live,
 * Miete/AfA folgen aus B3/B4 — Links stehen schon, Zielseiten entstehen
 * parallel) plus der dezente Makler-Pitch. "kostenlos" ist unter /tools/*
 * laut Vertrag (R3-PLAN.md) ausdrücklich erlaubt.
 */

export const revalidate = 60;

/* Struktur (Links, Reihenfolge) bleibt im Code — Texte kommen aus dem Studio. */
const TOOLS_STRUKTUR = [
  { href: "/tools/verkaufspreisrechner" },
  { href: "/tools/mietpreisrechner" },
  { href: "/tools/afa-rechner" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "tools");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    alternates: { canonical: "/tools" },
    openGraph: {
      title: t("meta.titel"),
      description: t("meta.beschreibung"),
      type: "website",
      locale: "de_DE",
    },
  };
}

export default async function ToolsHubPage() {
  const c = await getContent();
  const t = seitenTexte(c, "tools");
  const werkzeuge = t.liste("werkzeuge", ["titel", "text"] as const);
  const tools = TOOLS_STRUKTUR.map((s, i) => ({
    ...s,
    nr: String(i + 1).padStart(2, "0"),
    titel: werkzeuge[i]?.titel ?? "",
    text: werkzeuge[i]?.text ?? "",
  }));

  return (
    <>
      {/* ── Hero kompakt ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-10 pt-28 lg:px-10 lg:pb-14 lg:pt-32">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-[760px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich(t("hero.titel"))}
          </h1>
          <p className="t-body-lg mt-4 max-w-[620px]">{t("hero.sub")}</p>
        </div>
      </section>

      {/* ── Tool-Karten ──────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 60}>
                <Link
                  href={tool.href}
                  className="group block h-full rounded-[28px] border border-line-subtle bg-bg-base px-7 py-8 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-akzent-wash sm:px-8 sm:py-9"
                >
                  <p className="t-data tnum text-ink-yellow">{tool.nr}</p>
                  <p className="mt-3 font-display text-[22px] leading-[1.2] tracking-[-0.015em] text-ink-cream [font-weight:640] [text-wrap:balance]">
                    {tool.titel}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{tool.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-cream">
                    {t("karte.cta")}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-1"
                    >
                      <path
                        d="M1 7h11M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Makler-Pitch — dezent, kein Hard-Sell ───────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("pitch.eyebrow")} titel={t("pitch.titel")} ausrichtung="mitte" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10">
              <GelbeKarte label={t("pitch.karte_label")} titel={t("pitch.karte_titel")} glyph>
                {t("pitch.karte_text_vor")}{" "}
                <Link
                  href="/anfrage"
                  className="font-semibold text-ink-cream underline decoration-ink-cream/30 underline-offset-4"
                >
                  {t("pitch.karte_link")}
                </Link>
              </GelbeKarte>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
