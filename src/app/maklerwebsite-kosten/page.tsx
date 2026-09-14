import type { Metadata } from "next";
import { SektionsKopf } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * F2 — /maklerwebsite-kosten (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Echte Marktspannen, sonst rankt und hilft die Seite nicht (Leaf-Vorgabe).
 * Kein beuwy-Preis — BRIEF §5: nur Marktspannen, kein eigener Preis.
 *
 * R11 (14.09): jeder Text läuft über Studio-Keys s.maklerwebsite-kosten.*
 * (src/lib/texte/seiten/maklerwebsite-kosten.ts). Die FAQ-Rail-Texte und das
 * FAQPage-JSON-LD kommen jetzt aus derselben Liste statt zwei getrennten
 * Kopien. Die Preisstufen-Nummer (01–04) bleibt berechnet, kein Studio-Text.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "maklerwebsite-kosten");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

export default async function MaklerwebsiteKostenPage() {
  const c = await getContent();
  const t = seitenTexte(c, "maklerwebsite-kosten");
  const stufen = t.liste("stufen", ["name", "preis", "bekommt", "grenze", "versteckt"] as const);
  const stats = t.liste("stats", ["wert", "text"] as const);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ClusterHero
        eyebrow={t("hero.eyebrow")}
        titel={t("hero.titel")}
        sub={t("hero.sub")}
        primaryHref="/anfrage"
        ctaLabel2={t("hero.cta_label2")}
        ctaHref2="#preisstufen"
      />

      {/* ── Vier Preisstufen ────────────────────────────────────────── */}
      <section id="preisstufen" className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow={t("stufen.eyebrow")} titel={t("stufen.titel")} />
          <RailListe className="mt-8">
            {stufen.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <Rail>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-14">
                    <div>
                      <p className="t-data">{String(i + 1).padStart(2, "0")}</p>
                      <p className="t-h3 mt-2 max-w-[16ch]">{s.name}</p>
                      <p className="t-stat tnum mt-3 !text-[clamp(26px,2.6vw,36px)]">{s.preis}</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3 sm:gap-8">
                      <div>
                        <p className="t-label !text-[10.5px]">{t("stufen.kopf_bekommt")}</p>
                        <p className="t-body mt-2">{s.bekommt}</p>
                      </div>
                      <div>
                        <p className="t-label !text-[10.5px]">{t("stufen.kopf_grenze")}</p>
                        <p className="t-body mt-2">{s.grenze}</p>
                      </div>
                      <div>
                        <p className="t-label !text-[10.5px]">{t("stufen.kopf_versteckt")}</p>
                        <p className="t-body mt-2">{s.versteckt}</p>
                      </div>
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Reframe: die teuerste Website bringt keine Anfragen ─────── */}
      <section className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("reframe.eyebrow")} titel={t("reframe.titel")} />
            <p className="t-body mt-6 max-w-[62ch]">{t("reframe.text")}</p>
            <div className="mt-10 grid gap-8 border-t border-line-subtle pt-10 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.text}>
                  <p className="t-stat tnum">{stat.wert}</p>
                  <p className="t-body mt-2 max-w-[26ch]">{stat.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} />
          <RailListe className="mt-8 max-w-[62ch]">
            {faqs.map((f, i) => (
              <Reveal key={f.frage} delay={i * 60}>
                <Rail>
                  <p className="t-h3">{f.frage}</p>
                  <p className="t-body mt-3">{f.antwort}</p>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      <ClusterAbschluss
        karteLabel={t("abschluss.karte_label")}
        karteTitel={t("abschluss.karte_titel")}
        karteText={t("abschluss.karte_text")}
        schlussTitel={t("abschluss.schluss_titel")}
        schlussText={t("abschluss.schluss_text")}
        primaryHref="/anfrage"
        weitereLinks={[
          { label: t("abschluss.link1"), href: "/bottimmo-alternative" },
          { label: t("abschluss.link2"), href: "/maklersoftware-vergleich" },
          { label: t("abschluss.link3"), href: "/website-fuer-immobilienmakler" },
        ]}
      />
    </>
  );
}
