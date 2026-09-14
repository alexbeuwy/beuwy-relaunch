import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /makler-positionierung (R3-SEITENPLAN.json). Antwort auf
 * "Wie positioniere ich mich als Makler richtig?" direkt im Kopf.
 * Hauptbausteine: PainRows gegen den Bauchladen, dann eine Checkliste der
 * drei Positionierungs-Achsen (Zielgruppe, Objektklasse, Region) mit
 * konkreten Nischenbeispielen. Beweis: RIEGEL als regionaler Spezialist.
 * Kompakter Wissens-Kopf statt 70vh-Hero, Foto 9. Texte über Studio-Keys
 * (R11).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "makler-positionierung");
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

export default async function MaklerPositionierungPage() {
  const c = await getContent();
  const t = seitenTexte(c, "makler-positionierung");
  const riegel = caseBySlug("riegel-immobilien");

  const pains = t
    .liste("problem", ["quote", "antwort"] as const)
    .map((p) => ({ quote: p.quote, answer: p.antwort }));
  const achsen = t.liste("achsen", ["titel", "text", "beispiel_1", "beispiel_2", "beispiel_3"] as const);
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

      {/* ── Kompakter Wissens-Kopf ───────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[22ch]">{rich(t("hero.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">{t("hero.text")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta label={t("hero.cta_label")} />
            <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(9)}
              alt={t("hero.bild_alt")}
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Problem — Symptome des Bauchladens ──────────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("problem.eyebrow")}
              titel={t("problem.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={pains} />
          </div>
        </div>
      </section>

      {/* ── Drei Achsen — Checkliste ─────────────────────────────────── */}
      <section id="achsen" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("achsen.eyebrow")}
              titel={t("achsen.titel")}
              sub={t("achsen.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {achsen.map((a, i) => (
              <Reveal key={a.titel} delay={i * 60}>
                <div className="border-t border-line-medium pt-6">
                  <p className="t-h3">{a.titel}</p>
                  <p className="t-body mt-2">{a.text}</p>
                  <ul className="mt-5 space-y-3">
                    {[a.beispiel_1, a.beispiel_2, a.beispiel_3].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-akzent-wash">
                          <RiCheckLine className="h-3.5 w-3.5 text-ink-cream" />
                        </span>
                        <span className="text-[14px] leading-[1.5] text-ink-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL als regionaler Spezialist ────────── */}
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

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
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

      {/* ── Finale ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_a")}{" "}
              <Link href="/ueber-uns" className="ref-link">
                {t("finale.link_ueber")}
              </Link>{" "}
              {t("finale.text_b")}{" "}
              <Link href="/markenaufbau-makler" className="ref-link">
                {t("finale.link_marke")}
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
