import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASES, caseMitTexten, casesMitTexten } from "@/lib/cases";
import { VideoCard } from "@/components/VideoCard";
import { GelbeKarte } from "@/components/MaklerElemente";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * Fallstudien-Detailseite — Light Makler Style. Ruhig, dokumentarisch:
 * kein zweites Verkaufsgespräch, keine Kampagnen-Fotos neben einem
 * echten Kundennamen (BRIEF §7 — KI-Bilder nie als Kunde ausgeben).
 * Die Reise erzählt sich selbst, echte Screenshots/Video sind der
 * einzige Bildbeleg, die Zahlen tragen die Beweislast (Editorial,
 * kein Kartengrid). Am Ende trägt jede Seite den einen CTA-Wortlaut
 * als GelbeKarte, die als Ganzes zu /anfrage führt.
 *
 * Case-Inhalte kommen aus src/lib/cases.ts (Struktur) + den Studio-Keys
 * s.cases-detail.* — caseMitTexten()/casesMitTexten() legen die live aus
 * getContent() gelesenen Texte über die statische Struktur.
 */

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const t = seitenTexte(c, "cases-detail");
  const fall = caseMitTexten(c, slug);
  if (!fall) return {};
  return {
    title: `${fall.reise}${t("meta.titel_suffix")}`, // studio:ok (Titel-Zusammenbau, kein Fließtext)
    description: fall.teaser,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const c = await getContent();
  const t = seitenTexte(c, "cases-detail");
  const fall = caseMitTexten(c, slug);
  if (!fall) notFound();

  const domain = (fall.link?.label ?? fall.kunde).replace(/^https?:\/\//, "");
  const weitere = casesMitTexten(c)
    .filter((x) => x.slug !== fall.slug)
    .slice(0, 3);

  return (
    <>
      {/* ── Kopf — weißer Grund, die Reise als Überschrift ────────────── */}
      <section className="section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-20">
          <Link
            href="/cases"
            className="t-small inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
          >
            {t("ui.zurueck_link")}
          </Link>

          {fall.beispiel ? (
            <div className="mt-6">
              <span className="inline-block rounded-full border border-line-medium px-3 py-1 t-data">
                {t("ui.badge_beispiel")}
              </span>
            </div>
          ) : null}

          <p className="t-label mt-6">
            {fall.kunde} · {fall.branche} · {fall.jahr}
          </p>
          <h1 className="t-display mt-4 max-w-[820px]">{rich(fall.reise)}</h1>
          <p className="t-body-lg mt-5 max-w-[560px]">{fall.teaser}</p>

          {/* Ergebnis-Zahlen — Editorial, prominent, kein Kartengrid */}
          <div className="stat-band mt-14 max-w-[860px] border-t border-line-subtle pt-10">
            {fall.fakten.map((f) => (
              <div key={f.label} className="stat-cell">
                <p className="stat-num tnum">{f.wert}</p>
                <p className="stat-cap mt-2">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual — Bild im Browser-Rahmen, Video, oder nichts ──────── */}
      {fall.bild ? (
        <section className="section-band-base">
          <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-4 md:pt-8">
            <div className="case-frame">
              <div className="case-frame-bar" aria-hidden>
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-url">{domain}</span>
              </div>
              <Image
                src={fall.bild}
                width={1280}
                height={800}
                alt={fall.bildAlt ?? `Startseite von ${fall.kunde}`}
              />
            </div>
          </div>
        </section>
      ) : fall.video ? (
        <section className="section-band-base">
          <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-4 md:pt-8">
            <div className="max-w-[860px] mx-auto">
              <VideoCard src={fall.video} label={fall.videoLabel ?? fall.kunde} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Text-Teil — Ausgangslage, Aufbau, Ergebnis ───────────────── */}
      <section className="section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24">
          <div className="max-w-[760px]">
            <h2 className="t-h2">{t("ui.abschnitt_ausgangslage")}</h2>
            <p className="t-body mt-5">{fall.ausgangslage}</p>

            <h2 className="t-h2 mt-14">{t("ui.abschnitt_gebaut")}</h2>
            <div className="mt-5">
              {fall.gebaut.map((punkt, i) => (
                <div
                  key={punkt}
                  className="flex items-start gap-4 border-b border-line-subtle py-4"
                >
                  <span className="tnum t-data grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-yellow">
                    {i + 1}
                  </span>
                  <span className="t-body">{punkt}</span>
                </div>
              ))}
            </div>

            <h2 className="t-h2 mt-14">{t("ui.abschnitt_danach")}</h2>
            <p className="t-body mt-5">{fall.danach}</p>

            {fall.link ? (
              <a
                href={fall.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-[13.5px] font-medium text-ink-yellow border-b border-line-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:border-ink-yellow"
              >
                {fall.link.label} ↗
              </a>
            ) : null}

            <p className="t-small mt-10">
              {t("ui.quelle_vor")}{" "}
              <Link
                href="/immobilienmarketing"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-ink-yellow"
              >
                {t("ui.quelle_link")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Weitere Fallstudien — Immobilien-Cases zuerst ────────────── */}
      {weitere.length > 0 ? (
        <section className="section-band-elevated border-t border-line-subtle">
          <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
            <p className="t-label">{t("ui.weitere_label")}</p>
            <div className="mt-6">
              {weitere.map((w) => (
                <Link key={w.slug} href={`/cases/${w.slug}`} className="case-zeile group/case">
                  <div>
                    <p className="t-label">
                      {w.kunde} · {w.branche}
                      {w.beispiel ? <span className="case-marke">{t("ui.weitere_marke")}</span> : null}
                    </p>
                    <h3 className="t-h3 case-reise mt-2">{w.reise}</h3>
                  </div>
                  <span className="case-mehr shrink-0">{t("ui.weitere_lesen")}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Abschluss — GelbeKarte als Ganzes ist der eine CTA ───────── */}
      <section className="section-band-base border-t border-line-subtle">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-20 md:py-28">
          <Link
            href="/anfrage"
            className="group mx-auto block max-w-[640px] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--line-strong)]"
          >
            <GelbeKarte
              label={t("abschluss.label")}
              titel={t("abschluss.titel")}
              glyph
              className="text-center"
            >
              <p className="mx-auto max-w-[46ch]">{t("abschluss.text")}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-cream">
                {t("abschluss.cta")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-1"
                  aria-hidden
                >
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </GelbeKarte>
          </Link>
        </div>
      </section>
    </>
  );
}
