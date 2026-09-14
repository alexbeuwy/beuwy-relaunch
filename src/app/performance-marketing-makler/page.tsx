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
 * Wissensseite (R3 Welle 2, Cluster W) — /performance-marketing-makler.
 * Kanonische Erklärseite der 5%-Kette: kompakter Wissens-Kopf beantwortet
 * die Suchfrage wörtlich, danach ein 4-Stufen-Rail mit den mk.pm.*-Studio-
 * Werten (Quote/Mandate/Provision, dieselben wie auf /eigentuemer-leads-
 * generieren) und eine beispielhafte Wochenbericht-Tabelle als Rechenweg.
 * GelbeKarte, textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD.
 * Foto 12 laut R3-SEITENPLAN.json (Hochformat, per object-cover im
 * 21:9-Band beschnitten).
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * performance-marketing-makler.ts, die mk.pm.*-Keys bleiben.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "performance-marketing-makler");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    openGraph: {
      title: t("meta.og_titel"),
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

export default async function PerformanceMarketingMaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "performance-marketing-makler");
  const quote = c["mk.pm.quote"] ?? "5 %";
  const mandate = c["mk.pm.mandate"] ?? "5";
  const provision = c["mk.pm.provision"] ?? "31.285 €";
  const riegel = caseBySlug("riegel-immobilien");
  const stufen = t.liste("stufen", ["anteil", "titel", "text"] as const);
  const wochenbericht = t.liste("wochenbericht", ["woche", "gesehen", "klicks", "rechner", "registriert"] as const);
  const faqs = t.liste("faq", ["q", "a"] as const);

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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("kopf.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("kopf.text_vor")}{" "}
              <Highlight>{t("kopf.text_mark")}</Highlight>
              {t("kopf.text_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("cta.label")} />
              <span className="t-small w-full sm:w-auto">{t("kopf.hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(12)}
                alt="Makler wertet einen Wochenbericht zu laufenden Anzeigen aus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stufen-Rail — die 5%-Kette als vierteiliges Rail ────────────────── */}
      <section id="kette" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("kette.eyebrow")}
              titel={t("kette.titel")}
              sub={t("kette.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {stufen.map((stufe, i) => (
              <Reveal key={stufe.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-ink-yellow tnum">
                    {stufe.anteil}
                  </p>
                  <p className="t-h3 mt-4">{stufe.titel}</p>
                  <p className="t-body mt-3">{stufe.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div className="mt-14 max-w-[560px] rounded-[28px] border border-line-subtle bg-bg-base p-8">
              <p className="t-label">{t("kette.card_titel")}</p>
              <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {quote}
              </p>
              <p className="t-body mt-2">{t("kette.card_text")}</p>
              <div className="mt-8 border-t border-line-subtle pt-6">
                <p className="t-data !text-ink-cream tnum">
                  {mandate} {t("kette.mandate_suffix")}
                </p>
                <p className="t-small mt-1">
                  {t("kette.provision_vor")} {provision} {t("kette.provision_nach")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Wochenbericht — beispielhafter Rechenweg statt Bauchgefühl ──────── */}
      <section id="wochenbericht" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("wochenbericht.eyebrow")}
              titel={t("wochenbericht.titel")}
              sub={t("wochenbericht.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">
                      {t("wochenbericht.spalte_zeitraum")}
                    </th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.spalte_gesehen")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.spalte_klicks")}</th>
                    <th className="t-label py-3 pr-6 font-semibold">{t("wochenbericht.spalte_rechner")}</th>
                    <th className="t-label py-3 font-semibold">{t("wochenbericht.spalte_registriert")}</th>
                  </tr>
                </thead>
                <tbody>
                  {wochenbericht.map((row) => (
                    <tr key={row.woche} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.woche}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.gesehen}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.klicks}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.rechner}</td>
                      <td className="t-body py-4 tnum">{row.registriert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-8 max-w-[680px]">{t("wochenbericht.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Rechner als lebende Kette ────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              {t("beweis.link")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_mid1")}{" "}
              <Link href="/leadgenerierung-immobilienmakler" className="ref-link">
                {t("finale.link_lead")}
              </Link>{" "}
              {t("finale.text_mid2")}{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                {t("finale.link_eigentuemer")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("cta.label")} />
            </div>
            <p className="t-small mt-4">{t("finale.hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
