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
 * Wissensseite (R3 Welle 2, Cluster K) — /chatgpt-fuer-makler. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil: 12 konkrete
 * Anwendungen als zweispaltige Nummern-Liste (löst das Titel-Versprechen
 * ein), ein konkretes Vorher/Nachher-Beispiel zur Einwand-Vorbereitung
 * (bewusst NICHT das Exposé-Beispiel, das lebt auf der Schwesterseite
 * /ki-expose-texte), GelbeKarte zur Abgrenzung "Systeme statt Chat",
 * Beweis-Anriss, FAQ inkl. DSGVO-Hinweis + FAQPage-JSON-LD. Foto 9 laut
 * R3-SEITENPLAN.json.
 * Texte: src/lib/texte/seiten/chatgpt-fuer-makler.ts (Studio-Keys
 * s.chatgpt-fuer-makler.*).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "chatgpt-fuer-makler");
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

export default async function ChatgptFuerMaklerPage() {
  const c = await getContent();
  const t = seitenTexte(c, "chatgpt-fuer-makler");

  const ANWENDUNGEN = t.liste("anwendungen", ["titel", "text"] as const);
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("hero.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.intro_vor")}{" "}
              <Highlight>{t("hero.intro_highlight")}</Highlight> {t("hero.intro_nach")}
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
                src={maklerAsset(9)}
                alt="Makler tippt einen Textentwurf am Laptop, Objektunterlagen liegen daneben auf dem Tisch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 12 Anwendungen — zweispaltige Nummern-Liste ─────────────────────── */}
      <section id="anwendungen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("anwendungen.eyebrow")}
              titel={t("anwendungen.titel")}
              sub={t("anwendungen.sub")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 border-t border-line-subtle sm:grid-cols-2">
            {ANWENDUNGEN.map((a, i) => (
              <Reveal key={`anwendung-${i}`} delay={(i % 6) * 40}>
                <div className="border-b border-line-subtle py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="t-data shrink-0 tnum">{String(i + 1).padStart(2, "0")}</span>
                    <p className="t-h3 !text-[17px]">{a.titel}</p>
                  </div>
                  <p className="t-body mt-2 pl-9">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ein Beispiel — Einwand-Vorbereitung, konkret ────────────────────── */}
      <section id="beispiel" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("beispiel.eyebrow")}
              titel={t("beispiel.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">{t("beispiel.situation_label")}</p>
                <p className="t-body mt-4">{t("beispiel.situation_text")}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">{t("beispiel.vorbereitung_label")}</p>
                <p className="t-body mt-4">{t("beispiel.vorbereitung_text")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Die Grenze — GelbeKarte, Systeme statt Chat ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("grenze.label")} titel={t("grenze.titel")} glyph>
              {t("grenze.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[46ch]">{rich(t("beweis.titel"))}</p>
            <p className="t-body mt-4 max-w-[52ch]">{t("beweis.text")}</p>
            <Link href="/ki-fuer-immobilienmakler" className="ref-link mt-6 inline-block">
              {t("beweis.link")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — inkl. DSGVO-Hinweis, sauber eingeordnet ───────────────────── */}
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              {t("finale.text_vor")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.text_link1")}
              </Link>
              {t("finale.text_mitte1")}{" "}
              <Link href="/ki-fuer-immobilienmakler" className="ref-link">
                {t("finale.text_link2")}
              </Link>
              {t("finale.text_mitte2")}{" "}
              <Link href="/ki-expose-texte" className="ref-link">
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
