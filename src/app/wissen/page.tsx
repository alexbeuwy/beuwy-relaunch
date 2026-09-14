import type { Metadata } from "next";
import Link from "next/link";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import plan from "../../../docs/redesign/R3-SEITENPLAN.json";

/**
 * Wissens-Hub (R3) — datengetrieben aus R3-SEITENPLAN.json: die 50
 * Ratgeber nach Clustern gruppiert, dazu die drei Tools. Neue Seiten
 * erscheinen hier automatisch, sobald der Plan wächst.
 */

export const revalidate = 60;

/* Struktur (welcher Cluster-Buchstabe, welche Rechner-Route) bleibt im Code — Titel/Sub kommen aus dem Studio, in dieser Reihenfolge. */
const REIHENFOLGE = ["W", "C", "K", "V", "T", "P"] as const;
const TOOLS_STRUKTUR = [
  { href: "/tools/verkaufspreisrechner" },
  { href: "/tools/mietpreisrechner" },
  { href: "/tools/afa-rechner" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    openGraph: {
      title: t("meta.titel"),
      description: t("meta.og_beschreibung"),
      type: "website",
      locale: "de_DE",
    },
  };
}

export default async function WissenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "wissen");
  const clusterTexte = t.liste("cluster", ["titel", "sub"] as const);
  const toolsTexte = t.liste("tools", ["titel"] as const);

  const gruppen = REIHENFOLGE.map((k, i) => ({
    key: k,
    titel: clusterTexte[i]?.titel ?? "",
    sub: clusterTexte[i]?.sub ?? "",
    seiten: plan.seiten.filter((s) => s.cluster === k),
  })).filter((g) => g.seiten.length > 0);

  const tools = TOOLS_STRUKTUR.map((s, i) => ({ ...s, titel: toolsTexte[i]?.titel ?? "" }));

  return (
    <>
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-32 lg:px-10 lg:pt-40">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 font-display text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[40rem]">
              {plan.seiten.length}
              {t("hero.sub_nach")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10 lg:pb-32">
          {gruppen.map((g, gi) => (
            <Reveal key={g.key} delay={Math.min(gi * 40, 120)}>
              <div className={gi === 0 ? "" : "mt-16"}>
                <div className="border-t border-line-subtle pt-10">
                  <h2 className="t-h3">{g.titel}</h2>
                  <p className="t-small mt-1.5">{g.sub}</p>
                </div>
                <ul className="mt-7 grid gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.seiten.map((s) => (
                    <li key={s.route}>
                      <Link
                        href={`/${s.route}`}
                        className="group inline-flex items-baseline gap-2 text-[14.5px] leading-snug text-ink-muted transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
                      >
                        <span aria-hidden className="text-[11px] text-ink-yellow">→</span>
                        <span>{s.frage}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_360px]">
              <GelbeKarte label={t("ausprobieren.label")} titel={t("ausprobieren.titel")} glyph>
                {t("ausprobieren.text")}
              </GelbeKarte>
              <div className="flex flex-col justify-center gap-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-full border border-line-subtle bg-white px-6 py-3.5 text-center text-[14.5px] font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] hover:border-line-medium"
                  >
                    {tool.titel}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
