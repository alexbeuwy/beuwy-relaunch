import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { AnfrageCta, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { maklerAsset } from "@/lib/cdn";
import { getContent } from "@/lib/content";
import { seitenTexte, type SeitenTexte } from "@/lib/texte/lesen";

/**
 * R2-4 — /immobilienmarketing-agentur (Capture-Seite, Leaf-Auftrag R2-4).
 * Wer „Immobilienmarketing Agentur" googelt, landet hier. Kernlogik:
 * Agentur = Dienstleister für Kampagne/Design, Abrechnung nach Aufwand,
 * Ergebnis = Auftritt. beuwy = Unternehmensberatung, Analyse zuerst, Ergebnis
 * = System (Portal, Funnel, Automatisierung) mit messbaren Mandaten und
 * Deals (BRIEF §9). Fair bleiben wie /bottimmo-alternative: für eine
 * einzelne Kampagne oder reines Design ist eine Agentur die richtige Wahl,
 * das steht hier auch so. „Agentur" bezeichnet ausschließlich die andere
 * Kategorie — beuwy wird an keiner Stelle so genannt (Grep-Gate BRIEF §9).
 * Preisspanne im ersten Absatz stammt unverändert aus den Stufen 02/03 von
 * /maklerwebsite-kosten (Template-Agentur 2.000–8.000 €, individuelle
 * Agentur 8.000–25.000 €) — nichts erfunden, nichts eigenes für beuwy.
 * Foto 10 (Analyse-Szene am Tisch) passt zum „Analyse zuerst"-Argument
 * besser als Foto 2 (reines Porträt) und wird bereits auf dem Hub verwendet
 * — Wiederverwendung von Kampagnenfotos über mehrere Seiten ist im
 * bestehenden System üblich (z. B. Foto 18/19).
 * Texte: src/lib/texte/seiten/immobilienmarketing-agentur.ts (Studio-Keys
 * s.immobilienmarketing-agentur.*).
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "immobilienmarketing-agentur");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    alternates: { canonical: "/immobilienmarketing-agentur" },
    openGraph: {
      title: t("meta.og_titel"),
      description: t("meta.og_beschreibung"),
      type: "article",
      locale: "de_DE",
    },
  };
}

/* JSON-LD-Antwort weicht bewusst leicht vom sichtbaren Text ab (schema-
   taugliche Kurzform ohne Link-Markup) — spiegelt daher nicht dieselben
   Keys wie die Seite (Konvention: studio:aus/an). */
/* studio:aus */
const FAQ3_ANTWORT_JSONLD =
  "Klassische Agenturen liegen je nach Umfang zwischen 2.000 und 25.000 Euro pro Projekt, die realistischen Marktspannen dazu stehen auf unserer Seite zu den Maklerwebsite-Kosten. Der Preis für ein beuwy-System steht erst nach der Analyse fest, weil er von CRM-Anbindung, Objektzahl und Automatisierungsgrad abhängt, und wird schriftlich genannt, bevor ein Projekt startet.";
/* studio:an */

function Hero({ t }: { t: SeitenTexte }) {
  return (
    <header className="relative bg-bg-base">
      <div className="relative min-h-[70dvh] lg:min-h-[78dvh]">
        {/* Media-Plate: randlos rechts + oben, linke Kante fadet ins Weiß
            (gleiches Muster wie HubHero in /immobilienmarketing). */}
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
          <Image
            src={maklerAsset(10)}
            alt="Fünf Personen besprechen lachend einen Grundriss und Kennzahlen auf Tablets an einer Kücheninsel im Golden-Hour-Licht"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
          <AiPille />
        </div>

        {/* Textspalte */}
        <div className="relative z-10 mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[78dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1120px)/2))] lg:pr-[54vw] lg:pt-24">
          <Link
            href="/immobilienmarketing"
            className="t-small w-fit transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            ← {t("hero.zurueck")}
          </Link>
          <p className="t-label !text-ink-yellow mt-8">{t("hero.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[20ch]">{rich(t("hero.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[36rem]">{t("hero.intro")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <AnfrageCta href="/anfrage" label={t("hero.cta_label")} />
            <Link
              href="#einordnung"
              className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
            >
              {t("hero.scroll_link")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default async function ImmobilienmarketingAgenturPage() {
  const c = await getContent();
  const t = seitenTexte(c, "immobilienmarketing-agentur");

  const RAILS = t.liste(
    "rails",
    ["thema", "linksLabel", "linksText", "rechtsLabel", "rechtsText"] as const,
  );

  const FAQ_ITEMS: { q: string; a: ReactNode; aText: string }[] = [
    {
      q: t("faq.1.frage"),
      a: <>{t("faq.1.antwort")}</>,
      aText: t("faq.1.antwort"),
    },
    {
      q: t("faq.2.frage"),
      a: <>{t("faq.2.antwort")}</>,
      aText: t("faq.2.antwort"),
    },
    {
      q: t("faq.3.frage"),
      a: (
        <>
          {t("faq.3.antwort_vor")}{" "}
          <Link href="/maklerwebsite-kosten" className="btn-link">
            {t("faq.3.antwort_link")}
          </Link>
          {t("faq.3.antwort_nach")}
        </>
      ),
      aText: FAQ3_ANTWORT_JSONLD,
    },
  ];

  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.aText },
    })),
  };

  return (
    <>
      <Hero t={t} />

      {/* ── Einordnung: Suchfrage wörtlich beantwortet ─────────────── */}
      <section id="einordnung" className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("einordnung.eyebrow")}
              titel={t("einordnung.titel")}
              className="max-w-[720px]"
            />
            <div className="mt-8 max-w-[62ch] space-y-5">
              <p className="t-body">
                {t("einordnung.p1_vor")}{" "}
                <Link href="/maklerwebsite-kosten" className="btn-link">
                  {t("einordnung.p1_link")}
                </Link>
                {t("einordnung.p1_nach")}
              </p>
              <p className="t-body">
                {t("einordnung.p2_vor")} <Highlight>{t("einordnung.p2_highlight")}</Highlight>
                {t("einordnung.p2_nach")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gegenüberstellung ────────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <SektionsKopf eyebrow={t("unterschied.eyebrow")} titel={t("unterschied.titel")} />
          <RailListe className="mt-8">
            {RAILS.map((r, i) => (
              <Reveal key={`rail-${i}`} delay={i * 60}>
                <Rail>
                  <p className="t-label !text-[10.5px]">{r.thema}</p>
                  <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-12">
                    <div>
                      <p className="t-h3">{r.linksLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.linksText}</p>
                    </div>
                    <div className="md:border-l md:border-line-subtle md:pl-12">
                      <p className="t-h3">{r.rechtsLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.rechtsText}</p>
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Für wen eine Agentur reicht / für wen nicht ─────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("ehrlich.eyebrow")} titel={t("ehrlich.titel")} />
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">{t("ehrlich.agentur_titel")}</p>
                <p className="t-body mt-3 max-w-[40ch]">{t("ehrlich.agentur_text")}</p>
              </div>
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">{t("ehrlich.beuwy_titel")}</p>
                <p className="t-body mt-3 max-w-[40ch]">{t("ehrlich.beuwy_text")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ + FAQPage-JSON-LD ────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} />
          <div className="mt-12">
            <FaqAccordion items={FAQ_ITEMS.map(({ q, a }) => ({ q, a }))} />
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* ── GelbeKarte-Finale + CTA ───────────────────────────────────── */}
      <ClusterAbschluss
        karteLabel={t("abschluss.karte_label")}
        karteTitel={t("abschluss.karte_titel")}
        karteText={t("abschluss.karte_text")}
        schlussTitel={t("abschluss.schluss_titel")}
        schlussText={t("abschluss.schluss_text")}
        primaryHref="/anfrage"
        weitereLinks={[
          { label: t("abschluss.link1"), href: "/maklerwebsite-kosten" },
          { label: t("abschluss.link2"), href: "/website-fuer-immobilienmakler" },
          { label: t("abschluss.link3"), href: "/immobilienmarketing" },
        ]}
      />
    </>
  );
}
