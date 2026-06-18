import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Das Angebot — Marke + Website, 8.900 €, in 10 Tagen",
  description:
    "Logo, Farben, Schriften, Texte, fertige Website — alles aus einer Hand. 8.900 € Festpreis, in 10 Werktagen live. Tag 10 oder Geld zurück. Heidelberg, seit 2017.",
  alternates: { canonical: "/system" },
  openGraph: {
    title: "Das Angebot — Marke + Website, 8.900 €, in 10 Tagen",
    description:
      "Fester Preis. Du redest direkt mit mir. Tag 10 live oder Geld zurück.",
    type: "article",
    url: "https://beuwy.com/system",
  },
  twitter: { card: "summary_large_image" },
};

/* ---------- Track-Record — every figure cite-able ---------- */
const trackRecord: {
  client: string;
  period: string;
  headline: string;
  detail: string;
  source: string;
  href: string;
}[] = [
  {
    client: "Vision Real Estate",
    period: "2019 → 2023",
    headline: "€160M",
    detail: "Joint Venture mit KKR. Wir bauten die Marke, vision.de und das Investor-Material.",
    source: "öffentlich · vision.de",
    href: "/work/vision",
  },
  {
    client: "Königswege",
    period: "2017 → live",
    headline: "170 → 2.240",
    detail: "Aus 170 Partnern wurden 2.240. Relaunch 2020 trug die Top-10-Hitliste. Wir bauten Marke, Website, Partner-Material.",
    source: "cash-online Hitliste 2024",
    href: "/work/koenigswege",
  },
  {
    client: "acta",
    period: "2023 → 2025",
    headline: "€48,4M",
    detail: "Volumen über einen Instagram-Funnel. 315 Wohnungen, Ø Ticket €153.842, ohne externes Marketing-Team.",
    source: "intern · Owner-led",
    href: "/work/acta",
  },
  {
    client: "PURELEI",
    period: "seit 2018",
    headline: "1M+",
    detail: "Follower seit Erstauftritt. Marke und Voice — gebaut, damit es ohne uns weiterläuft.",
    source: "Instagram public",
    href: "/work",
  },
];

/* ---------- Was im Angebot drin ist ---------- */
const contractTerms: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Fester Preis: 8.900 €",
    d: "Eine Zahl. Keine Tagessätze. Keine Nach-Berechnung. Du weißt vorher, was du bekommst und was du zahlst.",
  },
  {
    n: "02",
    t: "10 Werktage von Brief bis Live",
    d: "Marke und Website stehen am Tag 10 auf deiner Domain. Nicht in Figma. Nicht in Notion. Wirklich online.",
  },
  {
    n: "03",
    t: "14 Tage Begleitung nach dem Launch",
    d: "Wenn nach dem Launch etwas auffällt oder du eine kleine Änderung brauchst — bin ich da. Ohne Extra-Rechnung.",
  },
  {
    n: "04",
    t: "Du redest direkt mit mir",
    d: "Kein Account-Manager dazwischen. Keine Übergabe an einen Junior. Ein Brief, eine Antwort, eine Hand.",
  },
];

/* ---------- Für wen es passt — und für wen nicht ---------- */
const forYou: string[] = [
  "Du hast ein Geschäft, das gut ist. Deine Seite zeigt das nicht.",
  "Du bist Gründer oder ein kleines Team, das schnell entscheiden kann.",
  "Du willst eine ruhige, hochwertige Marke. Nicht das nächste laute Ding.",
  "Du willst, dass es schnell geht — und gut wird.",
];
const notForYou: string[] = [
  "Du betreibst einen Online-Shop mit Tausenden Produkten (das ist eigene Baustelle).",
  "Du suchst Performance-Marketing-Hacks oder SEO-Tricks.",
  "Du willst sechs Abstimmungsrunden, bevor etwas läuft.",
  "Du willst eine Agentur, die dir den Brief schreibt — ich arbeite mit Leuten, die wissen, was sie wollen.",
];

export default function SystemPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "System", href: "/system" }])} />

      {/* ============================================================
          01 — HERO — reframed: trust as the product
         ============================================================ */}
      <section className="pt-[140px] md:pt-[180px] pb-[88px] section-band section-band-base relative overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "8%", right: "-8%", width: 500, height: 500, opacity: 0.55 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 relative z-[1]">
          <Reveal>
            <span className="eyebrow-rule">
              <span className="num">/</span> Das Angebot · 8.900 € · 10 Werktage
            </span>
          </Reveal>
          <Reveal delay={80} variant="mask">
            <h1 className="h-display-xl mt-7 max-w-[1140px]">
              Eine Marke und Website.
              <br />
              <em className="gradient-text">Fest, fair, fertig.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 max-w-[720px] text-[19px] md:text-[21px] leading-[1.5]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Logo, Farben, Schriften, Texte, fertige Website — alles aus einer Hand.{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>8.900 € fester Preis.</em>{" "}
              In 10 Werktagen live auf deiner Domain. Oder du bekommst dein Geld zurück.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="#contract" className="btn-secondary">
                Was du genau bekommst
              </Link>
              <span
                className="ml-2 text-[12px] self-center"
                style={{
                  color: "var(--ink-dim)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Antwort in 6 Stunden · 2 Plätze frei Q3
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          02 — TRACK-RECORD mit Quellen — Tatsachen vor Versprechen
         ============================================================ */}
      <Section id="track-record" tone="raised">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Was wir bisher gebaut haben
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[1080px]">
            <em className="gradient-text">€300M+</em> in den Büchern unserer Kunden.
            <br />
            Echte Kunden, echte Zahlen.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[680px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Eine Website allein macht kein Wachstum — Produkt, Markt und Verkauf gehören auch dazu. Wir behaupten nicht, das alleine gemacht zu haben.
            {" "}<em style={{ color: "var(--ink-cream)" }}>Was in unserem Teil lag, zeigen wir mit Quellen. Jede Zahl überprüfbar.</em>
          </p>
        </Reveal>

        <div
          className="mt-12 rounded-[12px] overflow-hidden"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--line-subtle)",
          }}
        >
          {trackRecord.map((row, i) => (
            <Reveal key={row.client} delay={i * 60}>
              <Link
                href={row.href}
                className="grid grid-cols-12 gap-4 px-6 py-6 md:py-7 items-center group"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line-subtle)",
                  transition: "background var(--resize-dur) var(--resize-ease)",
                }}
              >
                <div className="col-span-12 md:col-span-3">
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {row.period}
                  </span>
                  <p
                    className="mt-2 font-display group-hover:text-[var(--ink-yellow)] transition-colors"
                    style={{
                      color: "var(--ink-cream)",
                      fontSize: 20,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                    }}
                  >
                    {row.client}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 36,
                      letterSpacing: "-0.025em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1,
                    }}
                  >
                    {row.headline}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.55 }}>
                    {row.detail}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    Quelle: {row.source}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          03 — DER OPERATOR — authority + a face
         ============================================================ */}
      <Section id="operator" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "30%", left: "-10%", width: 420, height: 420, opacity: 0.35 }}
        />
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Der Operator
          </span>
        </Reveal>

        <div className="mt-8 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            <Reveal delay={60}>
              <HeadlineDisplay size="lg" className="max-w-[680px]">
                Du redest mit dem,
                <br />
                der <em className="font-display italic">baut</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Ich bin Alex. Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2009</em> mache ich Marken —
                  zuerst für Konzerne wie Bosch, Continental und Michelin. Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2017</em>{" "}
                  mit beuwy für Gründer und kleine Firmen.
                </p>
                <p>
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2023</em> war ich selbst Unternehmer: 315 Wohnungen
                  über Instagram verkauft — mitten in der Zinskrise. €48,4M Volumen, Ø Ticket €153.842, ohne externes Marketing-Team.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Das heißt: Ich weiß, wie Kunden eine teure Entscheidung treffen — weil ich sie selbst auslöse.
                  Wenn ich dir sage, was an deiner Marke gerade nicht funktioniert, ist das keine Theorie. Das ist die letzte Verkaufsrunde.
                </p>
                <p>
                  Kein Account-Manager dazwischen. Keine Übergabe an einen Junior. Ein Brief, eine Antwort, eine Hand,
                  ein fester Preis. <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Das ist das ganze Modell.</em>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 space-y-5">
            <Reveal delay={140}>
              <AssetSlot
                src="/assets/operator/alexander-puetter.jpg"
                alt="Alexander Pütter — Founder & Operator von beuwy"
                aspect="4/3"
                caption="Alexander Pütter · Operator · Heidelberg"
                prompt="Editorial founder portrait, late-30s/40s German man, three-quarter angle, calm confident expression, looking slightly off-camera. Warm low-key studio light, deep bordeaux/oxblood background (#1A0404), soft golden rim light. Premium, cinematic, high-end magazine cover quality. Subtle film grain. Not corporate-stocky."
                priority
              />
            </Reveal>
            <Reveal delay={180}>
              <div className="glass p-7 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-display shrink-0"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--ink-yellow)",
                      fontSize: 24,
                      letterSpacing: "-0.02em",
                      border: "1px solid rgba(247,233,154,0.18)",
                    }}
                  >
                    AP
                  </div>
                  <div>
                    <p style={{ color: "var(--ink-cream)", fontSize: 15, fontWeight: 510 }}>
                      Alexander Pütter
                    </p>
                    <p style={{ color: "var(--ink-dim)", fontSize: 13, marginTop: 2 }}>
                      Macher · Heidelberg · seit 2009
                    </p>
                  </div>
                </div>
                <p
                  className="font-display"
                  style={{
                    fontSize: 19,
                    lineHeight: 1.4,
                    letterSpacing: "-0.015em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  &ldquo;Ich baue dir die Marke und die Website. Schnell. Zum festen Preis.
                  Und du redest die ganze Zeit mit mir, nicht mit einem Manager.&rdquo;
                </p>
                <div
                  className="mt-7 pt-5 grid grid-cols-3 gap-4"
                  style={{ borderTop: "1px solid var(--line-subtle)" }}
                >
                  {[
                    { v: "16+", l: "Jahre Erfahrung" },
                    { v: "4×", l: "Marken neu aufgebaut" },
                    { v: "€300M+", l: "im Kundenbuch" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p
                        className="font-display"
                        style={{
                          color: "var(--ink-yellow)",
                          fontSize: 22,
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {s.v}
                      </p>
                      <p
                        className="mt-2"
                        style={{
                          color: "var(--ink-dim)",
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          lineHeight: 1.3,
                        }}
                      >
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          04 — WAS DU AM TAG 10 HAST
         ============================================================ */}
      <Section id="deliverable" tone="base">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Was du am Tag 10 hast
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[980px]">
            Eine fertige Marke und eine{" "}
            <em className="font-display italic">live Website</em>{" "}
            auf deiner Domain.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[680px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Vorher: 14 Versionen eines Logos im Mailpostfach, drei verschiedene Stile auf der Seite, du erklärst jedem Mitarbeiter selbst, wie die Marke klingen soll.
            <br />
            <em style={{ color: "var(--ink-cream)", fontStyle: "italic" }}>
              Nachher: ein klares Marken-Handbuch, eine schnelle Seite, klare Texte. Alles aus einer Hand.
            </em>
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Marke",
                meta: "Logo · 5–6 Farben · Schriften",
                d: "Ein klarer Look, hell und dunkel. So, dass alles bei dir gleich aussieht — heute und nächstes Jahr.",
              },
              {
                t: "Website",
                meta: "schnell · mobil · deine Domain",
                d: "6–8 Sektionen, fertig zum Online-gehen. Modern wie die Seiten, die du selbst gerne ansiehst.",
              },
              {
                t: "Technik im Hintergrund",
                meta: "Google · KI · Geschwindigkeit",
                d: "Bei Google findbar, auf dem Handy schnell, gleich richtig aufgestellt für ChatGPT & Co. — falls das wichtig wird.",
              },
            ].map((d) => (
              <div key={d.t} className="card h-full">
                <p
                  className="font-display"
                  style={{
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.1,
                  }}
                >
                  {d.t}
                </p>
                <p
                  className="mt-2"
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                  }}
                >
                  {d.meta}
                </p>
                <p
                  className="mt-4"
                  style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.55 }}
                >
                  {d.d}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          05 — DER LIEFERVERTRAG — risk reversal, concrete terms
         ============================================================ */}
      <Section id="contract" tone="raised">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Was du genau bekommst
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[1000px]">
            Vier Sätze.
            <br />
            <em className="gradient-text">Kein Kleingedrucktes.</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[640px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Das hier gilt ab der ersten Antwort auf deinen Brief. Keine Überraschungen später.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {contractTerms.map((term, i) => (
            <Reveal key={term.n} delay={i * 60}>
              <div
                className="rounded-[14px] p-7 h-full relative"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                  }}
                >
                  Bedingung {term.n}
                </span>
                <p
                  className="mt-3 font-display"
                  style={{
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.15,
                  }}
                >
                  {term.t}
                </p>
                <p
                  className="mt-4 text-[15px] leading-[1.6]"
                  style={{ color: "var(--ink-cream)" }}
                >
                  {term.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Geld-zurück-Garantie — risk fully on us, tied to delivery (not results) */}
        <Reveal delay={240}>
          <div
            className="mt-8 rounded-[16px] p-8 md:p-10 grid md:grid-cols-12 gap-8 items-center"
            style={{
              background: "var(--ink-yellow)",
              color: "var(--bg-base)",
              boxShadow: "0 26px 60px -32px rgba(247,233,154,0.4)",
            }}
          >
            <div className="md:col-span-8">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  background: "var(--bg-base)",
                  color: "var(--ink-yellow)",
                  padding: "5px 12px",
                  borderRadius: 999,
                  textTransform: "uppercase",
                }}
              >
                Geld-zurück-Garantie
              </span>
              <p
                className="font-display mt-5"
                style={{
                  fontSize: 40,
                  letterSpacing: "-0.025em",
                  color: "var(--bg-base)",
                  lineHeight: 1.02,
                }}
              >
                Tag 10 — oder Geld zurück.
              </p>
              <p
                className="mt-4 max-w-[600px] text-[16px] leading-[1.6]"
                style={{ color: "rgba(33,6,6,0.82)" }}
              >
                Wenn die Marke und die Website nicht am 10. Werktag live auf deiner Domain stehen,
                bekommst du den vollen Preis zurück. Ohne Diskussion. Ohne Kleingedrucktes.
                <em style={{ fontStyle: "italic", color: "var(--bg-base)" }}> Das Risiko trage ich, nicht du.</em>
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <div
                className="rounded-full flex flex-col items-center justify-center text-center shrink-0"
                style={{
                  width: 148,
                  height: 148,
                  border: "2px solid var(--bg-base)",
                  color: "var(--bg-base)",
                }}
              >
                <span
                  className="font-display"
                  style={{ fontSize: 38, lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  Tag 10
                </span>
                <span
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(33,6,6,0.7)",
                  }}
                >
                  live oder 0 €
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p
            className="mt-8 max-w-[720px] text-[14px] leading-[1.6]"
            style={{
              color: "var(--ink-dim)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.01em",
            }}
          >
            Die Garantie gilt für die <em style={{ color: "var(--ink-cream)", fontStyle: "italic" }}>Lieferung</em>, nicht dafür,
            wie viele Kunden du danach bekommst. Wie viele Anfragen kommen, hängt von deinem Produkt, deinem Preis und deinem Verkauf ab.
            Ich garantiere, dass am Tag 10 alles fertig auf deiner Domain steht — und dass ich danach 14 Tage da bin, falls noch was ist.
            Wer mehr verspricht, lügt.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          06 — FÜR DICH WENN / NICHT FÜR DICH WENN
         ============================================================ */}
      <Section id="fit" tone="cream">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Passt das?
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-display-md mt-6 max-w-[1000px]">
            Ich nehme nicht viele Projekte gleichzeitig.
            <br />
            Hier ist, <em className="font-display italic">wann es passt</em> — und wann nicht.
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Reveal delay={80}>
            <div
              className="rounded-[14px] p-7 md:p-8 h-full"
              style={{
                background: "rgba(26,4,4,0.04)",
                border: "1px solid rgba(26,4,4,0.14)",
              }}
            >
              <p
                style={{
                  color: "#B23A48",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                ↗ Für dich, wenn
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {forYou.map((line, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "14px 0",
                      borderTop: i === 0 ? "none" : "1px solid rgba(26,4,4,0.10)",
                      display: "flex",
                      gap: 12,
                      color: "var(--bg-base)",
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        color: "#B23A48",
                        flexShrink: 0,
                        marginTop: 2,
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div
              className="rounded-[14px] p-7 md:p-8 h-full"
              style={{
                background: "rgba(26,4,4,0.02)",
                border: "1px dashed rgba(26,4,4,0.18)",
              }}
            >
              <p
                style={{
                  color: "rgba(26,4,4,0.55)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                ↙ Nicht für dich, wenn
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {notForYou.map((line, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "14px 0",
                      borderTop: i === 0 ? "none" : "1px solid rgba(26,4,4,0.08)",
                      display: "flex",
                      gap: 12,
                      color: "rgba(26,4,4,0.7)",
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        color: "rgba(26,4,4,0.4)",
                        flexShrink: 0,
                        marginTop: 2,
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                      }}
                    >
                      ×
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================================================
          07 — SLOT CTA — close
         ============================================================ */}
      <section
        className="relative pt-[112px] md:pt-[160px] pb-[112px] md:pb-[160px] section-divider section-band section-band-base overflow-hidden"
      >
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "20%", right: "-12%", width: 520, height: 520, opacity: 0.45 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 relative z-[1]">
          <Reveal>
            <span className="eyebrow-rule">
              <span className="num">/</span> 2 Plätze frei für Q3/2026
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display-md mt-6 max-w-[980px]">
              Schauen wir uns deine Seite erst mal an.
              <br />
              <em className="gradient-text">In 15 Sekunden</em> — gratis, ohne Login.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="/anfrage" className="btn-secondary">
                Oder direkt Brief schicken
              </Link>
              <span
                className="ml-2 text-[12px] self-center"
                style={{
                  color: "var(--ink-dim)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Mo–Fr 09–18 CET
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
