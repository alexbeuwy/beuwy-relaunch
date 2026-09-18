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
 * W-Cluster — /verkaeufer-ansprechen (R3-SEITENPLAN.json). Antwort auf
 * "Wie erreiche ich Eigentümer vor dem Verkaufsentschluss?" direkt im
 * Kopf. Hauptbaustein: eine Nummern-Liste von sechs Lebensereignissen
 * (Frühsignale statt Kaufsignale), je mit einem DSGVO-sauberen
 * Content-Anker, gerahmt von einem Zweispalter Reaktiv/Früh. Beweis:
 * RIEGEL-Bewertungsrechner als Frühanker-Beispiel. Kompakter
 * Wissens-Kopf statt 70vh-Hero, Foto 8.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "verkaeufer-ansprechen");
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

export default async function VerkaeuferAnsprechenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "verkaeufer-ansprechen");
  const signale = t.liste("signale", ["titel", "signal", "anker"] as const);
  const faqs = t.liste("faq", ["q", "a"] as const);
  const riegel = caseBySlug("riegel-immobilien");

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
          <p className="t-label !text-ink-yellow">{t("kopf.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[22ch]">
            {rich(t("kopf.titel"))}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            {t("kopf.text_vor")}{" "}
            <Highlight>{t("kopf.text_hervor")}</Highlight>
            {t("kopf.text_nach")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta label={t("kopf.cta")} />
            <span className="t-small w-full sm:w-auto">{t("kopf.cta_note")}</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(8)}
              alt="Eigentümer liest am Küchentisch einen Ratgeber-Artikel auf dem Tablet"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Reaktiv vs. Früh — Zweispalter ───────────────────────────── */}
      <section id="unterschied" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("unterschied.eyebrow")}
              titel={t("unterschied.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-label">{t("unterschied.reaktiv_label")}</p>
              <p className="t-h3 mt-3">{t("unterschied.reaktiv_titel")}</p>
              <p className="t-body mt-3">{t("unterschied.reaktiv_text")}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label">{t("unterschied.frueh_label")}</p>
              <p className="t-h3 mt-3">{t("unterschied.frueh_titel")}</p>
              <p className="t-body mt-3">{t("unterschied.frueh_text")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Sechs Frühsignale — Nummern-Liste ────────────────────────── */}
      <section id="signale" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("signale.eyebrow")}
              titel={t("signale.titel")}
              sub={t("signale.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 divide-y divide-line-subtle border-t border-line-subtle">
            {signale.map((f, i) => (
              <Reveal key={f.titel} delay={i * 60}>
                <div className="grid gap-4 py-8 md:grid-cols-[3rem_14rem_1fr] md:gap-10">
                  <span className="font-display text-[22px] font-bold text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="t-h3">{f.titel}</p>
                    <p className="t-body mt-2 md:hidden">{f.signal}</p>
                  </div>
                  <div>
                    <p className="t-body hidden md:block">{f.signal}</p>
                    <p className="t-body mt-2 border-l-2 border-akzent pl-4 text-ink-cream md:mt-3">
                      {f.anker}
                    </p>
                  </div>
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
            <GelbeKarte
              label={t("unterschied2.label")}
              titel={t("unterschied2.titel")}
              glyph
            >
              {t("unterschied2.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL-Rechner als Frühanker ────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{t("beweis.text")}</p>
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
              {t("finale.text_vor")}{" "}
              <Link href="/tools/mietpreisrechner" className="ref-link">
                {t("finale.link_rechner")}
              </Link>{" "}
              {t("finale.text_mitte")}{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                {t("finale.link_email")}
              </Link>{" "}
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_nach")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_note")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
