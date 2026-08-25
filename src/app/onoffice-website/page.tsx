import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { SektionsKopf, GelbeKarte, Highlight, StempelBadge, KreisDeko } from "@/components/MaklerElemente";

/**
 * /onoffice-website — Leaf D4 (docs/redesign/PLAN.md, Gates in
 * docs/redesign/gates/D4.md). onOffice ist eine fremde Marke: die Seite
 * spricht durchgehend von Andocken/Kompatibilität, nie von Partnerschaft
 * (Alex' Partner-Bewerbung läuft noch, s. Leaf-Auftrag). Foto 13 ist die
 * für diese Seite reservierte, einzige Bilddatei (GOAL Asset-Zuteilung).
 */

export const metadata: Metadata = {
  title: "onOffice Website: Premium-Auftritt direkt am CRM | beuwy",
  description:
    "Websites, die an onOffice andocken: Exposés im Markenlook, Anfragen mit Score direkt im CRM, automatisches Nachfassen. Kein Wechsel, kein Umweg — in vier Wochen live.",
  openGraph: {
    title: "onOffice Website: Premium-Auftritt direkt am CRM | beuwy",
    description:
      "Websites, die an onOffice andocken: Objekt-Sync im Markenlook, Anfragen mit Score direkt im CRM, automatisches Nachfassen.",
    type: "website",
    locale: "de_DE",
  },
};

function Pfeil() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-1 shrink-0 text-ink-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-open:rotate-45"
      aria-hidden
    >
      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const RAILS = [
  {
    nr: "01",
    label: "Objekt-Sync",
    kurz: "Exposés im Marken-Look statt Portal-Look.",
    text: "Ihre Objekte laufen aus onOffice direkt auf die Website — im Layout Ihrer Marke, nicht im Raster eines Portals. Ändern Sie den Preis im CRM, ändert sich die Website mit.",
  },
  {
    nr: "02",
    label: "Anfragen mit Quelle & Score",
    kurz: "Direkt im CRM, nicht im Postfach.",
    text: "Jede Anfrage landet mit Quelle und Score sofort in Ihrem onOffice — kein Copy-Paste, kein Zettel, kein vergessener Rückruf.",
  },
  {
    nr: "03",
    label: "Bewertungsrechner",
    kurz: "Eigentümer-Leads als Kontakt mit Aktivität.",
    text: "Der Rechner qualifiziert, während Sie besichtigen: Adresse rein, Ersteinschätzung raus — der Eigentümer-Lead liegt als Kontakt mit Aktivität im CRM, bevor Sie zurück im Büro sind.",
  },
  {
    nr: "04",
    label: "Automatisches Nachfassen",
    kurz: "Aus dem CRM heraus, nicht aus dem Kopf.",
    text: "Wer heute nicht kauft, bekommt in sechs Monaten die passende Nachricht — automatisch ausgelöst aus onOffice, ohne dass jemand daran denken muss.",
  },
];

const WOCHEN = [
  { nr: "Woche 1", titel: "Zugang & Analyse", text: "CRM-Zugang, bestehende Objektstruktur und Marke sichten." },
  { nr: "Woche 2", titel: "Design", text: "Website, Exposé- und Rechner-Vorlagen im Markenlook." },
  { nr: "Woche 3", titel: "Anbindung", text: "Objekt-Sync, Anfrage-Routing und Score-Logik ans CRM." },
  { nr: "Woche 4", titel: "Livegang", text: "Test mit echten Objekten, Freigabe, live." },
];

export default function OnOfficeWebsitePage() {
  return (
    <>
      {/* ── 1. Hero (~70vh): Text links, Foto 13 als Hochformat-Plate rechts ── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <Reveal className="relative mt-4 aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[40vw]">
            <div className="relative h-full w-full overflow-hidden rounded-[28px] lg:rounded-l-none lg:rounded-bl-[48px]">
              <Image
                src={maklerAsset(13)}
                alt="Premium-Büroszene aus der beuwy-Kampagnenwelt für Immobilienmakler"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 14%" }}
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-bg-base to-transparent lg:block" />
              <AiPille className="!bottom-auto !top-4 right-4" />

              {/* Floating Card auf dem Foto (Referenz 1) */}
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 p-4 pr-5 backdrop-blur-sm lg:bottom-10 lg:left-8">
                <p className="t-label !text-[10px]">Direkt am CRM</p>
                <p className="mt-1 font-display text-[36px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                  4–6
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-muted">Wochen bis Livegang</p>
              </div>
            </div>

            {/* Stempel-Badge überlappt die obere Bildecke (Referenz 3) */}
            <StempelBadge
              text="ANGEBUNDEN · MARKENSTARK"
              groesse={100}
              className="!absolute -top-5 right-6 z-10 lg:-top-6 lg:right-10"
            />
          </Reveal>

          {/* Gelber Kreis + Kreislinie im Übergang (Referenz 2) */}
          <span
            className="pointer-events-none absolute bottom-[24%] right-[38vw] z-0 hidden h-24 w-24 rounded-full bg-akzent/45 lg:block"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-[30%] right-[35vw] z-0 hidden h-40 w-40 rounded-full border border-ink-yellow/20 lg:block"
            aria-hidden
          />

          {/* Textspalte */}
          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-16 pt-32 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[43vw] lg:pt-28">
            <Link
              href="/immobilienmarketing"
              className="t-label !text-ink-dim inline-flex w-fit items-center gap-1.5 transition-colors duration-[var(--duration-quick)] hover:!text-ink-cream"
            >
              ← Immobilienmarketing-Hub
            </Link>
            <Reveal>
              <p className="t-label !text-ink-yellow mt-6">Website · Objekt-Sync · CRM-Anbindung</p>
              <h1 className="mt-5 font-display text-[clamp(36px,4.4vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
                {rich("Ihre onOffice-Website — endlich so stark wie Ihr *Vertrieb*.")}
              </h1>
              <p className="t-body-lg mt-6 max-w-[34rem]">
                onOffice hält Objekte, Kontakte und Abläufe zuverlässig zusammen. Nur der erste Eindruck — Ihre
                Website — zeigt davon fast nichts. Wir bauen den Auftritt, der zu dem passt, was in Ihrem System
                längst funktioniert.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/anfrage"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
                >
                  Zusammenarbeit anfragen
                  <Pfeil />
                </Link>
                <a
                  href="#andocken"
                  className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
                >
                  So docken wir an
                </a>
              </div>
              <p className="t-small mt-5">Antwort innerhalb von 24 Stunden</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Problem: onOffice stark, Auftritt sieht nicht danach aus ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,42rem)] lg:gap-16">
          <Reveal>
            <SektionsKopf eyebrow="Der Unterschied" titel="onOffice ist stark. Ihre Website sieht das *nicht*." />
          </Reveal>
          <div className="space-y-5">
            <Reveal>
              <p className="t-body-lg">
                onOffice hält im Hintergrund zusammen, was bei den meisten Maklerbüros auseinanderfällt: Objekte,
                Kontakte, Anfragen, Abläufe. Das ist die eigentliche Stärke — ein System, das seit Jahren
                zuverlässig läuft und das Ihr Team kennt.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p className="t-body">
                Nur sieht man das der Website meistens nicht an. Das mitgelieferte Template macht aus einem
                Marktführer eine Verwaltungsseite: gleiche Struktur, gleiche Bausteine, gleiche Distanz zum Kunden
                wie bei jedem anderen Büro mit derselben Software.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-body">
                Ein Eigentümer vergleicht drei Makler in wenigen Minuten — und entscheidet nach dem, was er sieht,
                nicht nach dem, was in Ihrem CRM passiert.{" "}
                <Highlight>Verliert die Website, verliert am Ende auch das beste System dahinter.</Highlight>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. Vier Rails direkt ans CRM ── */}
      <section id="andocken" className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Anbindung"
              titel="Vier Rails direkt an Ihr *CRM*."
              sub="Kein neues System, keine Schulung fürs Team — vier Verbindungen zwischen Ihrer Website und dem onOffice, das Sie schon nutzen."
            />
          </Reveal>
          <div className="mt-12 border-t border-line-subtle">
            {RAILS.map((r, i) => (
              <Reveal key={r.nr} delay={i * 40}>
                <div className="grid gap-3 border-b border-line-subtle py-8 sm:grid-cols-[56px_1fr] sm:gap-8 md:grid-cols-[56px_15rem_1fr] md:gap-10">
                  <span className="font-mono text-[13px] text-ink-dim tnum">{r.nr}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-cream">{r.label}</p>
                    <p className="mt-1 text-[13px] text-ink-muted">{r.kurz}</p>
                  </div>
                  <p className="t-body max-w-[36rem]">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Gelbe Karte — die eine Beruhigung ── */}
      <section className="relative overflow-hidden">
        <KreisDeko className="left-[6%] top-[18%] hidden md:block" />
        <div className="relative mx-auto max-w-[640px] px-6 py-24 md:py-28">
          <Reveal>
            <GelbeKarte label="Kein Wechsel nötig" titel="Sie wechseln nichts. Ihr onOffice bleibt." glyph>
              Es sieht nur zum ersten Mal so aus, wie Sie verkaufen.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── 5a. Prozess — vier Wochen ── */}
      <section className="border-t border-line-subtle">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf
              eyebrow="Ablauf"
              titel="Vier Wochen bis zur *Anbindung*."
              sub="Von der Analyse bis zum Livegang — ohne dass im Tagesgeschäft etwas stillsteht."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {WOCHEN.map((w, i) => (
              <Reveal key={w.nr} delay={i * 40}>
                <div className="border-t border-line-subtle pt-5">
                  <p className="t-label">{w.nr}</p>
                  <p className="mt-2 text-[15px] font-semibold text-ink-cream">{w.titel}</p>
                  <p className="t-body mt-2">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5b. FAQ ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-24 md:py-28">
          <Reveal>
            <SektionsKopf eyebrow="Häufige Fragen" titel="Was Sie vorher *wissen* wollen." />
          </Reveal>

          <div className="mt-10 border-t border-line-subtle">
            <Reveal>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  Muss ich onOffice wechseln?
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">
                  Nein. Ihr CRM bleibt exakt so, wie es ist — wir docken an, wir ersetzen nichts.
                </p>
              </details>
            </Reveal>
            <Reveal delay={40}>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  Was ist mit meinen Objektdaten?
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">
                  Sie bleiben in onOffice, wo sie heute schon liegen. Die Website liest sie über die bestehende
                  Schnittstelle — nichts wird doppelt gepflegt, nichts verlässt Ihr System.
                </p>
              </details>
            </Reveal>
            <Reveal delay={80}>
              <details className="group border-b border-line-subtle py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink-cream [&::-webkit-details-marker]:hidden">
                  Geht das auch mit FLOWFACT oder Propstack?
                  <FaqIcon />
                </summary>
                <p className="t-body mt-3 max-w-[54ch]">
                  Ja. Das Prinzip ist bei jedem CRM dasselbe — welche Anbindung sich für Sie lohnt, sehen Sie im{" "}
                  <Link
                    href="/maklersoftware-vergleich"
                    className="text-ink-cream underline decoration-line-medium underline-offset-4"
                  >
                    Maklersoftware-Vergleich
                  </Link>
                  .
                </p>
              </details>
            </Reveal>
          </div>

          <p className="t-small mt-10 max-w-[54ch]">
            onOffice ist eine Marke der onOffice GmbH. beuwy ist ein unabhängiger Dienstleister.
          </p>
        </div>
      </section>

      {/* ── 6. Finale CTA ── */}
      <section className="bg-akzent-wash">
        <div className="mx-auto max-w-[860px] px-6 py-24 text-center md:py-28">
          <Reveal>
            <p className="t-label">Nächster Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Ihr CRM funktioniert. Jetzt sieht man es *auch*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[38rem]">
              Ein Systemgespräch von 30 Minuten reicht, um zu sehen, wie Ihr onOffice und Ihre Website zusammen
              aussehen könnten.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/anfrage"
                className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
              >
                Zusammenarbeit anfragen
                <Pfeil />
              </Link>
            </div>
            <p className="t-small mt-4">Antwort innerhalb von 24 Stunden</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-line-subtle pt-8">
              <Link
                href="/immobilienmarketing"
                className="t-small underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
              >
                Zum Immobilienmarketing-Hub
              </Link>
              <Link
                href="/website-fuer-immobilienmakler"
                className="t-small underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
              >
                Mehr zur Website für Makler
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
