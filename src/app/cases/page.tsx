import type { Metadata } from "next";
import Link from "next/link";
import { CaseGrid } from "@/components/CaseGrid";
import { GelbeKarte, Highlight } from "@/components/MaklerElemente";
import { casesMitTexten } from "@/lib/cases";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Fallstudien-Übersicht — schlicht, Light Makler Style. Foto-Plates kommen
 * ausschließlich aus den Case-Daten selbst (CaseGrid → c.bild), keine
 * Kampagnen-Fotos neben echten Kundennamen. Immobilien-Cases zuerst
 * (casesMitTexten() folgt orderedCases()), am Ende der eine CTA-Wortlaut
 * zum Vorquali-Funnel.
 */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "cases");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

export default async function CasesUebersichtPage() {
  const c = await getContent();
  const t = seitenTexte(c, "cases");
  const cases = casesMitTexten(c);

  return (
    <>
      <section className="section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-20">
          <p className="t-label flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-akzent" />
            {t("hero.eyebrow")}
          </p>
          <h1 className="t-display mt-4 max-w-[760px]">{t("hero.titel")}</h1>
          <p className="t-body-lg mt-5 max-w-[560px]">
            {t("hero.sub_vor")} <Highlight>{t("hero.sub_highlight")}</Highlight>
            {t("hero.sub_nach")}
          </p>
        </div>
      </section>

      <section className="section-band-base border-t border-line-subtle">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
          <CaseGrid cases={cases} />
        </div>
      </section>

      {/* ── Abschluss — GelbeKarte als Ganzes ist der eine CTA ───────── */}
      <section className="section-band-elevated border-t border-line-subtle">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-20 md:py-28">
          <Link
            href="/anfrage"
            className="group mx-auto block max-w-[640px] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--line-strong)]"
          >
            <GelbeKarte
              label={t("abschluss.label")}
              titel={t("abschluss.titel")}
              glyph
              className="text-center"
            >
              <p className="mx-auto max-w-[46ch]">{t("abschluss.text")}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-cream">
                {t("abschluss.cta")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-1"
                  aria-hidden
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
            </GelbeKarte>
          </Link>
        </div>
      </section>
    </>
  );
}
