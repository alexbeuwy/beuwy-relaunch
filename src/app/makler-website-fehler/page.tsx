import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Wissens-Seite — /makler-website-fehler (R3-SEITENPLAN.json, Cluster C).
 * Angle verlangt 11 Fehler mit sichtbarem Beispielmuster + Kosten in
 * Anfragen, dazu einen Selbst-Audit in 10 Minuten — deshalb hier eine lange
 * Nummern-Liste (11 Fehler, vertikal statt Grid, weil die Menge ein
 * Spalten-Raster sprengen würde) gefolgt von einer kompakten
 * Selbst-Audit-Checkliste, die dieselben elf Punkte als Ja/Nein-Fragen
 * bündelt. Kosten-Angaben bleiben qualitativ (keine erfundenen Prozent- oder
 * Anfragenzahlen), wie im Rest der Seite. Foto 2 laut Spec.
 * Texte: src/lib/texte/seiten/makler-website-fehler.ts (Studio-Keys
 * s.makler-website-fehler.*).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "makler-website-fehler");
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

function HaekchenIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 text-ink-yellow"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.6 7.7l1.8 1.8 4-4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function MaklerWebsiteFehlerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "makler-website-fehler");

  const FEHLER = t.liste("fehler", ["titel", "muster", "kosten"] as const);
  const AUDIT = FEHLER.map((f) => `${f.titel}: ${t("audit.punkt_suffix")}`); // studio:ok — Template aus Studio-Keys, kein hartkodierter Satz
  const FAQS = t.liste("faq", ["frage", "antwort"] as const).map((f) => ({ q: f.frage, a: f.antwort }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
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
              {t("hero.intro")} <Highlight>{t("hero.intro_highlight")}</Highlight>.
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
                src={maklerAsset(2)}
                alt="Makler prüft die eigene Website auf Laptop und Smartphone nebeneinander"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — 11 Fehler, Muster + Kosten ──────────────────── */}
      <section id="fehler" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("fehler.eyebrow")}
              titel={t("fehler.titel")}
              sub={t("fehler.sub")}
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 space-y-10 border-t border-line-subtle pt-10">
            {FEHLER.map((fehler, i) => (
              <Reveal key={`fehler-${i}`} delay={(i % 6) * 40}>
                <div className="grid gap-3 sm:grid-cols-[64px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{fehler.titel}</p>
                    <p className="t-body mt-3 max-w-[62ch]">{fehler.muster}</p>
                    <p className="t-small mt-2 max-w-[62ch] !text-ink-dim">{fehler.kosten}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selbst-Audit — 11 Punkte in 10 Minuten ──────────────────────── */}
      <section id="audit" className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("audit.eyebrow")}
              titel={t("audit.titel")}
              sub={t("audit.sub")}
              className="max-w-[640px]"
            />
          </Reveal>
          <div className="mt-10 space-y-4">
            {AUDIT.map((punkt, i) => (
              <Reveal key={`audit-${i}`} delay={i * 30}>
                <div className="flex items-start gap-3 border-b border-line-subtle pb-4">
                  <span className="mt-0.5">
                    <HaekchenIcon />
                  </span>
                  <p className="t-body">{punkt}</p>
                </div>
              </Reveal>
            ))}
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

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
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
              {t("finale.text_vor")}{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mitte1")}{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link3")}
              </Link>
              .
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
