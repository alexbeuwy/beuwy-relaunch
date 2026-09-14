import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { SektionsKopf, Wortmarke } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";

/**
 * F3 — /maklersoftware-vergleich (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Perspektive bewusst NICHT "welches CRM ist das beste" (entscheidet der
 * Makler), sondern: jede Plattform kann mehr, als ihr Standard-Auftritt
 * zeigt. Aussagen zu den Systemen bleiben allgemein bekannt/unstrittig —
 * im Zweifel weggelassen (Leaf-Vorgabe). Link auf /onoffice-website
 * bewusst prominent (onOffice-Rail + Quervernetzung unten).
 * R11: alle Fließtexte laufen über Studio-Keys src/lib/texte/seiten/
 * maklersoftware-vergleich.ts.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "maklersoftware-vergleich");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

export default async function MaklersoftwareVergleichPage() {
  const t = seitenTexte(await getContent(), "maklersoftware-vergleich");
  const systeme = t.liste("systeme", ["nr", "name", "satz1", "satz2", "andock", "linkLabel"] as const);

  return (
    <>
      <ClusterHero
        eyebrow={t("hero.eyebrow")}
        titel={t("hero.titel")}
        sub={t("hero.sub")}
        primaryHref="/anfrage"
        ctaLabel2={t("hero.cta2")}
        ctaHref2="#systeme"
      />

      {/* ── Perspektive ─────────────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("position.eyebrow")} titel={t("position.titel")} />
            <p className="t-body mt-6 max-w-[62ch]">{t("position.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Software-Rails ──────────────────────────────────────────── */}
      <section id="systeme" className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow={t("systeme.eyebrow")} titel={t("systeme.titel")} />
          <RailListe className="mt-8">
            {systeme.map((s, i) => (
              <Reveal key={s.nr} delay={i * 60}>
                <Rail>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-14">
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <span className="t-data">{s.nr}</span>
                      <Wortmarke name={s.name} />
                    </div>
                    <div className="max-w-[52rem]">
                      <p className="t-body">{s.satz1}</p>
                      <p className="t-body mt-2">{s.satz2}</p>
                      <p className="t-body mt-4 border-l-2 border-akzent pl-4 text-ink-cream">
                        {s.andock}
                      </p>
                      {i === 0 && s.linkLabel && (
                        <Link
                          href="/onoffice-website"
                          className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line-medium px-4 py-2 text-[13px] font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-ink-cream"
                        >
                          {s.linkLabel}
                          <span className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Motor / Schaufenster ────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow={t("motor.eyebrow")} titel={t("motor.titel")} />
            <p className="t-body mt-6 max-w-[62ch]">{t("motor.text")}</p>
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
          { label: t("abschluss.link_onoffice"), href: "/onoffice-website" },
          { label: t("abschluss.link_bottimmo"), href: "/bottimmo-alternative" },
          { label: t("abschluss.link_kosten"), href: "/maklerwebsite-kosten" },
        ]}
      />
    </>
  );
}
