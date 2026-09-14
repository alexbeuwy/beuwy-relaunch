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

/**
 * Wissens-Seite — /makler-newsletter-beispiele (R3-SEITENPLAN.json, Cluster
 * C). Angle verlangt sieben konkrete Mail-Anlässe mit Betreff+Aufbau als
 * Hauptbaustein, deshalb hier eine nummerierte Liste statt Grid oder
 * Tabelle — jeder Punkt bekommt Raum für Betreffzeile und Aufbau. Die
 * geforderte Abgrenzung Massen-Newsletter vs. Datenmail läuft als
 * Zweispalter direkt danach. Beweis läuft als Text-Anriss (17 Jahre),
 * DSGVO-Frage landet vorsichtig gerahmt in der FAQ. Foto 8 laut Spec.
 *
 * R11: alle Texte laufen über Studio-Keys, siehe
 * src/lib/texte/seiten/makler-newsletter-beispiele.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "makler-newsletter-beispiele");
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

export default async function MaklerNewsletterBeispielePage() {
  const c = await getContent();
  const t = seitenTexte(c, "makler-newsletter-beispiele");
  const anlaesse = t.liste("anlaesse", ["titel", "betreff", "aufbau"] as const);
  const faqs = t.liste("faq", ["frage", "antwort"] as const);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
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
            <h1 className="t-display mt-4">
              {rich(t("hero.titel"))}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.sub_vor")}{" "}
              <Highlight>{t("hero.sub_highlight")}</Highlight>
              {t("hero.sub_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("cta.label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_hinweis")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(8)}
                alt="Person entwirft am Bildschirm eine Newsletter-Vorlage für Immobilienmakler"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die sieben Anlässe — nummerierte Liste mit Betreff+Aufbau ───── */}
      <section id="beispiele" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("beispiele.eyebrow")}
              titel={t("beispiele.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 space-y-10">
            {anlaesse.map((anlass, i) => (
              <Reveal key={anlass.titel} delay={i * 40}>
                <div className="grid gap-3 border-t border-line-subtle pt-6 sm:grid-cols-[3.5rem_1fr]">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{anlass.titel}</p>
                    <p className="t-small mt-2 !text-ink-dim">
                      {t("beispiele.betreff_praefix")}: „{anlass.betreff}“
                    </p>
                    <p className="t-body mt-3">{anlass.aufbau}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Abgrenzung — Zweispalter Massen-Newsletter vs. Datenmail ────── */}
      <section id="abgrenzung" className="bg-bg-base">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("abgrenzung.eyebrow")}
              titel={t("abgrenzung.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Reveal delay={40}>
              <div className="rounded-[24px] border border-line-subtle p-7">
                <p className="t-label !text-ink-dim">{t("abgrenzung.massen_label")}</p>
                <p className="t-body mt-4">
                  {t("abgrenzung.massen_text")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[24px] bg-akzent-wash p-7">
                <p className="t-label !text-ink-dim">{t("abgrenzung.daten_label")}</p>
                <p className="t-body mt-4">
                  {t("abgrenzung.daten_text")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
            {t("unterschied.text")}
          </GelbeKarte>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              {t("beweis.text")}
            </p>
          </Reveal>
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
            <FaqAccordion items={faqs.map((f) => ({ q: f.frage, a: f.antwort }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.satz_1")}{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                {t("finale.link_1")}
              </Link>
              {t("finale.satz_2")}{" "}
              <Link href="/verkaeufer-ansprechen" className="ref-link">
                {t("finale.link_2")}
              </Link>
              {t("finale.satz_3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_3")}
              </Link>
              {t("finale.satz_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("cta.label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_hinweis")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
