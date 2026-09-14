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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/mietpreis-ermitteln.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * vertikale Nummern-Liste mit fünf Schritten (Mietspiegel, Vergleichsmiete,
 * Zu-/Abschläge mit Rechenweg, Mietpreisbremse, Rechner), danach eine
 * Häkchen-Checkliste der häufigsten Zu-/Abschläge. GelbeKarte als Pointe,
 * Beweis-Anriss über 17 Jahre Erfahrung im Bau von Rechenmodellen, FAQ +
 * FAQPage-JSON-LD. Foto 12 (hochkant) laut R3-SEITENPLAN.json, per
 * object-cover im 21:9-Band wie im geo-checkliste-Muster.
 *
 * R11 (14.09): jeder Text läuft über Studio-Keys s.wissen-mietpreis-ermitteln.*
 * (src/lib/texte/seiten/wissen-mietpreis-ermitteln.ts). Die Zu-/Abschlags-
 * Richtung (+/−) bleibt Struktur im Code (steuert Icon-Farbe), kein Text.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "wissen-mietpreis-ermitteln");
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

const ZUSCHLAEGE_RICHTUNG: Array<"+" | "−"> = ["+", "+", "+", "+", "+", "−", "−", "−"];

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

function ZuschlagIcon({ richtung }: { richtung: "+" | "−" }) {
  const positiv = richtung === "+";
  return (
    <span
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-bold tnum ${
        positiv ? "bg-akzent text-ink-cream" : "border border-line-medium text-ink-muted"
      }`}
      aria-hidden
    >
      {richtung}
    </span>
  );
}

export default async function MietpreisErmittelnPage() {
  const c = await getContent();
  const t = seitenTexte(c, "wissen-mietpreis-ermitteln");
  const schritte = t.liste("schritte", ["titel", "text"] as const);
  const zuschlaege = t.liste("zuschlaege", ["text"] as const);
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
            <h1 className="t-display mt-4">{rich(t("hero.titel"))}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              {t("hero.intro_vor")}{" "}
              <Highlight>{t("hero.intro_highlight")}</Highlight>
              {t("hero.intro_nach")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta label={t("hero.cta_label")} />
              <span className="t-small w-full sm:w-auto">{t("hero.cta_antwortzeit")}</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(12)}
                alt="Person prüft Mietspiegel und Vergleichsangebote auf einem Tablet am Wohnungsfenster"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Fünf Schritte — vertikale Nummern-Liste mit Rechenweg ───────────── */}
      <section id="schritte" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("schritte.eyebrow")}
              titel={t("schritte.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 divide-y divide-line-subtle border-t border-line-subtle">
            {schritte.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="grid gap-3 py-10 sm:grid-cols-[88px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{s.titel}</p>
                    <p className="t-body mt-3">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checkliste — häufigste Zu- und Abschläge ────────────────────────── */}
      <section id="zuschlaege" className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow={t("zuschlaege.eyebrow")}
              titel={t("zuschlaege.titel")}
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {zuschlaege.map((z, i) => (
              <Reveal key={z.text} delay={i * 40}>
                <div className="flex items-center gap-3">
                  <ZuschlagIcon richtung={ZUSCHLAEGE_RICHTUNG[i]} />
                  <p className="t-body">{z.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label={t("unterschied.label")} titel={t("unterschied.titel")} glyph>
              {t("unterschied.text")}
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — 17 Jahre Erfahrung im Bau von Rechenmodellen ────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">{t("beweis.label")}</p>
            <p className="t-h3 mt-3 max-w-[52ch]">{t("beweis.text")}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 4 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
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

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">{t("finale.label")}</p>
            <h2 className="t-h2 mt-4">{rich(t("finale.titel"))}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              {t("finale.text_1")}{" "}
              <Link href="/tools/mietpreisrechner" className="ref-link">
                {t("finale.link_mietpreisrechner")}
              </Link>{" "}
              {t("finale.text_2")}{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                {t("finale.link_bewerten")}
              </Link>
              {t("finale.text_3")}{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                {t("finale.link_hub")}
              </Link>
              {t("finale.text_4")}
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta label={t("finale.cta_label")} />
            </div>
            <p className="t-small mt-4">{t("finale.cta_antwortzeit")}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
