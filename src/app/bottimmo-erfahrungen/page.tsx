import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster V) — /bottimmo-erfahrungen. Fairer
 * Erfahrungsbericht: Stärken (Tempo, Themenwelt, Wartung inklusive) gegen
 * die Grenze (Vorlagen-Design, gemietete Inhalte, Austauschbarkeit unter
 * Wettbewerbern desselben Systems). Kompakter Wissens-Kopf beantwortet die
 * Suchfrage wörtlich, Nummern-Liste der Stärken, Vergleichstabelle "wann
 * reicht der Baukasten", GelbeKarte, Beweis-Anriss RIEGEL, FAQ +
 * FAQPage-JSON-LD. Foto 18 laut R3-SEITENPLAN.json. Keine Behauptung über
 * BOTTIMMO, die nicht bereits auf /bottimmo-alternative belegt ist.
 * Texte über Studio-Keys (R11).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "bottimmo-erfahrungen");
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

function PfeilRechts({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZusammenarbeitCta({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover ${className}`}
    >
      {label}
      <PfeilRechts className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function BottimmoErfahrungenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "bottimmo-erfahrungen");
  const riegel = caseBySlug("riegel-immobilien");

  const staerken = t.liste("staerken", ["titel", "text"] as const);
  const vergleich = t.liste("vergleich", ["kriterium", "reicht", "grenze"] as const);
  const faqs = t
    .liste("faq", ["frage", "antwort"] as const)
    .map((f) => ({ q: f.frage, a: f.antwort }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("hero.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.text_vor")}{" "}
              <Highlight>{t("hero.text_mitte")}</Highlight>
              {t("hero.text_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(18)}
                alt={t("hero.bild_alt")}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — Stärken, ehrlich benannt ────────────────────── */}
      <section id="staerken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("staerken.eyebrow")}
              titel={t("staerken.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {staerken.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{s.titel}</p>
                  <p className="t-body mt-3">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vergleichstabelle — wann reicht der Baukasten, wann nicht ───── */}
      <section id="vergleich" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("vergleich.eyebrow")}
              titel={t("vergleich.titel")}
              sub={t("vergleich.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("vergleich.kopf_nr")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("vergleich.kopf_kriterium")}</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">{t("vergleich.kopf_reicht")}</th>
                  <th className="py-3 t-label !text-[10.5px]">{t("vergleich.kopf_grenze")}</th>
                </tr>
              </thead>
              <tbody>
                {vergleich.map((z, i) => (
                  <tr key={z.kriterium} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 font-mono text-[13px] text-ink-muted tnum">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {z.kriterium}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[17rem]">{z.reicht}</td>
                    <td className="py-4 t-body max-w-[17rem]">{z.grenze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, eigenes Portal statt Baukasten ──────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.titel")}</p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("faq.eyebrow")}
              titel={t("faq.titel")}
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
          <p className="t-small mt-10 max-w-[54ch]">{t("faq.hinweis")}</p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_a")}{" "}
              <Link href="/bottimmo-alternative" className="ref-link">
                {t("finale.link_alternative")}
              </Link>
              {t("finale.text_b")}{" "}
              <Link href="/maklerwebsite-kosten" className="ref-link">
                {t("finale.link_kosten")}
              </Link>
              {t("finale.text_c")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_d")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
