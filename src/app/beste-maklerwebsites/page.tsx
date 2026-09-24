import type { Metadata } from "next";
import Link from "next/link";
import { RiPaletteLine, RiRouteLine, RiTimerFlashLine } from "@remixicon/react";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";
import { GelbeKarte, Highlight, KreisDeko, SektionsKopf, Wortmarke } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * /beste-maklerwebsites — das Ranking-Asset (Leaf E1, docs/redesign/gates/E1.md).
 * Doppelte Funktion: SEO-Magnet für „beste Maklerwebsites" UND Ego-Loop —
 * gelistete Häuser verlinken zurück, nicht gelistete rufen an.
 *
 * INTEGRITÄTS-REGEL (hart, GOAL/BRIEF): keine erfundenen Scores oder
 * Bewertungstexte für echte Unternehmen. Jeder Wertungs-Slot zeigt „–" mit
 * Label „Bewertung läuft"/„Wird derzeit geprüft" — ausnahmslos, auch bei den
 * acht großen Netzwerken oben. Die Reihenfolge der großen Acht ist keine
 * Qualitätsaussage (Disclaimer direkt über der Liste) — sie stehen zuerst,
 * weil sie zuerst geprüft werden. Keine Herabwürdigung: kein negatives
 * Urteil über ein benanntes Haus, nirgends auf der Seite.
 *
 * R11 (14.09): alle Fließtexte laufen jetzt über Studio-Keys
 * src/lib/texte/seiten/beste-maklerwebsites.ts, inkl. GROSSE_ACHT — unter
 * einem eigenen Präfix (s.beste-maklerwebsites.grosse-acht.*), bewusst
 * NICHT über mk.trust.namen: eine Umbenennung der Hero-Vertrauensleiste
 * soll nicht ungewollt auch die Rangliste verändern (zwei verschiedene
 * Jobs, ein Namensraum wäre eine versteckte Kopplung). Platzierungen 9–30
 * bleiben Platzhalter im Code (keine echten Namen, siehe Integritätsregel).
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "beste-maklerwebsites");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

const PLAETZE_9_BIS_30 = Array.from({ length: 22 }, (_, i) => i + 9);

const KRITERIEN_ICONS = [RiPaletteLine, RiTimerFlashLine, RiRouteLine] as const;

function RedaktionsPille({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full bg-akzent-wash px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-cream ${className}`}
    >
      {text}
    </span>
  );
}

/*
 * Die acht großen Netzwerke: eigene Zeile, Wortmarke-Typo, sichtbar
 * prominenter als die 22 Prüf-Slots darunter — der Ego-Loop lebt vom
 * Kontrast zwischen „gelistet" und „noch nicht".
 */
function RangzeileGross({
  nr,
  name,
  bundesweit,
  metriken,
  bewertungLaeuft,
}: {
  nr: number;
  name: string;
  bundesweit: string;
  metriken: readonly string[];
  bewertungLaeuft: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-5">
        <span className="w-9 shrink-0 font-mono text-[13px] text-ink-dim tnum">
          {String(nr).padStart(2, "0")}
        </span>
        <div>
          <Wortmarke name={name} />
          <p className="mt-1.5 text-[12px] text-ink-dim">{bundesweit}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:justify-end">
        <div className="flex items-center gap-6">
          {metriken.map((k) => (
            <div key={k} className="text-center">
              <p className="font-mono text-[15px] text-ink-dim tnum">–</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.06em] text-ink-dim/70">{k}</p>
            </div>
          ))}
        </div>
        <span className="t-label !text-[9.5px] shrink-0 whitespace-nowrap rounded-full bg-bg-elevated px-3 py-1.5 !text-ink-dim">
          {bewertungLaeuft}
        </span>
      </div>
    </div>
  );
}

/* Plätze 9–30: kompakt, zwei Spalten, bewusst zurückhaltender als die
   großen Acht — die Verknappung, die den Anruf auslöst. */
function RangzeileKlein({ nr, geprueft, standort }: { nr: number; geprueft: string; standort: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line-subtle py-4">
      <div className="flex items-center gap-4">
        <span className="w-8 shrink-0 font-mono text-[12px] text-ink-dim/70 tnum">
          {String(nr).padStart(2, "0")}
        </span>
        <div>
          <p className="text-[13.5px] font-medium text-ink-dim">{geprueft}</p>
          <p className="text-[11px] text-ink-dim/60">{standort}</p>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-ink-dim/50 tnum">– / – / –</span>
    </div>
  );
}

export default async function BesteMaklerwebsitenPage() {
  const t = seitenTexte(await getContent(), "beste-maklerwebsites");
  const kriterien = t.liste("kriterien", ["gewicht", "titel", "text"] as const);
  const grosseAcht = t.liste("grosse-acht", ["name"] as const);
  const faqs = t.liste("faq", ["q", "a"] as const);
  const metriken = [t("ranking.spalte_design"), t("ranking.spalte_ladezeit"), t("ranking.spalte_conversion")];

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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ── 1. Hero — kompakt, typografisch, KreisDeko statt Foto ── */}
      <section className="relative flex min-h-[60dvh] items-center overflow-hidden bg-bg-base px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <KreisDeko className="right-[6%] top-[22%] hidden lg:block" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="t-label text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="t-display mt-5 max-w-[780px]">{rich(t("hero.titel"))}</h1>
          <p className="t-body-lg mt-6 max-w-[36rem]">
            {t("hero.sub_vor")} <Highlight>{t("hero.sub_mark")}</Highlight>
            {t("hero.sub_nach")}
          </p>
        </div>
      </section>

      {/* ── 2. Methodik — macht das Ranking glaubwürdig ── */}
      <section className="border-t border-line-subtle bg-bg-elevated px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf
              eyebrow={t("methodik.eyebrow")}
              titel={t("methodik.titel")}
              sub={t("methodik.sub")}
            />
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0">
            {kriterien.map((k, i) => {
              const Icon = KRITERIEN_ICONS[i];
              return (
                <Reveal key={k.titel} delay={i * 70}>
                  <div className={i > 0 ? "md:border-l md:border-line-subtle md:pl-10" : ""}>
                    <Icon size={22} className="text-ink-yellow" aria-hidden />
                    <p className="t-stat mt-5 tnum">{k.gewicht}</p>
                    <h3 className="t-h3 mt-2">{k.titel}</h3>
                    <p className="t-body mt-3 max-w-[32ch]">{k.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={220}>
            <p className="t-small mt-14 max-w-[58ch] border-t border-line-subtle pt-8">
              {t("methodik.footnote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Die Liste — Plätze 1 bis 30 ── */}
      <section className="border-t border-line-subtle bg-bg-base px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf
              eyebrow={t("ranking.eyebrow")}
              titel={t("ranking.titel")}
              sub={t("ranking.sub")}
            />
            <RedaktionsPille text={t("ranking.redaktionsstand")} className="mt-6" />
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <p className="t-label !text-ink-dim">{t("ranking.grosse_acht_label")}</p>
              <div className="mt-4">
                {grosseAcht.map((haus, i) => (
                  <RangzeileGross
                    key={haus.name}
                    nr={i + 1}
                    name={haus.name}
                    bundesweit={t("ranking.bundesweit")}
                    metriken={metriken}
                    bewertungLaeuft={t("ranking.bewertung_laeuft")}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="t-label mt-14 !text-ink-dim">{t("ranking.klein_label")}</p>
              <div className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {PLAETZE_9_BIS_30.map((nr) => (
                  <RangzeileKlein
                    key={nr}
                    nr={nr}
                    geprueft={t("ranking.klein_geprueft")}
                    standort={t("ranking.klein_standort")}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Ego-Loop — der Grund anzurufen ── */}
      <section className="border-t border-line-subtle bg-bg-elevated px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <GelbeKarte
              glyph
              label={t("ego.label")}
              titel={t("ego.titel")}
              className="mx-auto max-w-[640px]"
            >
              <p>{t("ego.text")}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-cream px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-ink-cream/85"
                >
                  {t("ego.cta1")}
                </Link>
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-cream/25 px-6 py-3 text-[14px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-ink-cream/50"
                >
                  {t("ego.cta2")}
                </Link>
              </div>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="border-t border-line-subtle bg-bg-base px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf eyebrow={t("faq.eyebrow")} titel={t("faq.titel")} />
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div>
                  <h3 className="t-h3">{f.q}</h3>
                  <p className="t-body mt-3">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="t-small mt-16 border-t border-line-subtle pt-8">
              {t("footer.text")}{" "}
              <Link
                href="/immobilienmarketing"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-muted"
              >
                {t("footer.link_marketing")}
              </Link>{" "}
              ·{" "}
              <Link
                href="/website-fuer-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-muted"
              >
                {t("footer.link_website")}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
