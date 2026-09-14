import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { SektionsKopf, Highlight } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";

/**
 * F1 — /bottimmo-alternative (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Sachlich-fairer Vergleich: Baukasten-Systeme wie BOTTIMMO sind für den
 * Einstieg stark, die Grenze ist die geteilte Vorlage. Keine Behauptung
 * über BOTTIMMO, die nicht allgemein bekannt/unstrittig ist — im Zweifel
 * weggelassen (Leaf-Vorgabe).
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * bottimmo-alternative.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "bottimmo-alternative");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

export default async function BottimmoAlternativePage() {
  const t = seitenTexte(await getContent(), "bottimmo-alternative");
  const rails = t.liste("rails", ["thema", "linksLabel", "linksText", "rechtsLabel", "rechtsText"] as const);

  return (
    <>
      <ClusterHero
        eyebrow={t("hero.eyebrow")}
        titel={t("hero.titel")}
        sub={t("hero.sub")}
        primaryHref="/anfrage"
        ctaLabel2={t("hero.cta2")}
        ctaHref2="#einordnung"
      />

      {/* ── Einordnung fair ─────────────────────────────────────────── */}
      <section id="einordnung" className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("einordnung.eyebrow")}
              titel={t("einordnung.titel")}
            />
            <div className="mt-8 max-w-[62ch] space-y-5">
              <p className="t-body">{t("einordnung.text1")}</p>
              <p className="t-body">
                {t("einordnung.text2_vor")}{" "}
                <Highlight>{t("einordnung.text2_mark")}</Highlight>{" "}
                {t("einordnung.text2_nach")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gegenüberstellung ───────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow={t("gegenueberstellung.eyebrow")} titel={t("gegenueberstellung.titel")} />
          <RailListe className="mt-8">
            {rails.map((r, i) => (
              <Reveal key={r.thema} delay={i * 60}>
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

      {/* ── Für wen bleibt BOTTIMMO richtig / Für wen beuwy ────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("ehrlich.eyebrow")} titel={t("ehrlich.titel")} />
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">{t("ehrlich.bottimmo_titel")}</p>
                <p className="t-body mt-3 max-w-[40ch]">{t("ehrlich.bottimmo_text")}</p>
              </div>
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">{t("ehrlich.beuwy_titel")}</p>
                <p className="t-body mt-3 max-w-[40ch]">{t("ehrlich.beuwy_text")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClusterAbschluss
        karteLabel={t("abschluss.karte_label")}
        karteTitel={t("abschluss.karte_titel")}
        karteText={t("abschluss.karte_text")}
        schlussTitel={t("abschluss.schluss_titel")}
        schlussText={t("abschluss.schluss_text")}
        primaryHref="/anfrage"
        footnote={t("abschluss.footnote")}
        weitereLinks={[
          { label: t("abschluss.link_kosten"), href: "/maklerwebsite-kosten" },
          { label: t("abschluss.link_software"), href: "/maklersoftware-vergleich" },
          { label: t("abschluss.link_website"), href: "/website-fuer-immobilienmakler" },
        ]}
      />
    </>
  );
}
