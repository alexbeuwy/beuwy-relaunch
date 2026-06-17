import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Editor } from "@/components/Editor";
import { InteractiveCode } from "@/components/InteractiveCode";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "System — Der Standard für Brands mit hohem Warenkorbwert",
  description:
    "Operator-led Studio für hochpreisige Marken. Festpreis · 10 Werktage · 30 Tage Standby. Track-Record mit Quellen — Vision €160M, Königswege 2.240 Partner, acta 315 Wohnungen, PURELEI 1M.",
  alternates: { canonical: "/system" },
  openGraph: {
    title: "System — Der Standard für Brands mit hohem Warenkorbwert",
    description:
      "Festpreis · Tag 10 live · ein Operator, kein Account-Manager. Track-Record mit Quellen.",
    type: "article",
    url: "https://beuwy.com/system",
  },
  twitter: { card: "summary_large_image" },
};

/* ---------- Track-Record data — every figure cite-able ---------- */
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
    detail: "KKR Joint Venture. Wir bauten Brand-Architektur, vision.de und Investor-Narrativ.",
    source: "öffentlich · vision.de",
    href: "/work#vision",
  },
  {
    client: "Königswege",
    period: "2017 → live",
    headline: "170 → 2.240",
    detail: "Partner-Skalierung. Relaunch 2020 trug die Hitliste. Brand, Web-System, Partner-Materialien.",
    source: "cash-online Hitliste 2024",
    href: "/work#koenigswege",
  },
  {
    client: "acta",
    period: "2023 → 2025",
    headline: "€48,4M",
    detail: "Volumen über Instagram-Funnel. 315 Wohnungen, Ø Ticket €153.842, ohne externes Marketing-Team.",
    source: "intern · Owner-led",
    href: "/work#acta",
  },
  {
    client: "PURELEI",
    period: "seit 2018",
    headline: "1M+",
    detail: "Follower seit Erstauftritt. Brand-Architektur und kategorie-prägende Voice in einem Massmarkt.",
    source: "Instagram public",
    href: "/work",
  },
];

/* ---------- Delivery contract terms — the risk reversal ---------- */
const contractTerms: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Festpreis pro Slot",
    d: "Eine Zahl, kein Tagessatz, kein Scope-Creep. Wir nennen sie nach dem ersten Call — nicht nach einem sechswöchigen, bezahlten Discovery-Sprint.",
  },
  {
    n: "02",
    t: "10 Werktage von Brief bis Live",
    d: "Marke, Site und Agent-Layer stehen am Tag 10 auf deiner Domain. Nicht in Figma, nicht in Notion. Live, indizierbar, agentenlesbar.",
  },
  {
    n: "03",
    t: "30 Tage Compound-Standby",
    d: "Nach Launch begleitet ein Operator. Experimente, Cohort-Receipts, schnelle Iterationen. Inklusive — kein Retainer dahinter.",
  },
  {
    n: "04",
    t: "Operator-led, eine Hand",
    d: "Du sprichst direkt mit dem, der baut. Kein Account-Manager als Telefonzentrale, keine Junior-Übergabe nach Kickoff, keine 19 Stakeholder.",
  },
];

/* ---------- Qualification — disqualifying is a trust signal ---------- */
const forYou: string[] = [
  "Du verkaufst etwas, das echtes Vertrauen braucht — Premium-Produkte, B2B-Services, Investments, regulierte Branchen.",
  "Du bist Founder-led oder kleines Team, das schnell entscheiden kann.",
  "Dein Pipeline-Wert hängt an Empfehlungen, und du willst dieses Glück durch ein System ersetzen.",
  "Du planst für die Agent-Ära — du willst die Marke sein, die Claude und ChatGPT zuerst nennen.",
];
const notForYou: string[] = [
  "Du verkaufst Volumen-Konsumgüter oder kleine Tickets im Onlineshop.",
  "Du suchst Performance-Marketing-Hacks oder einen SEO-Trick.",
  "Du willst sechs Stakeholder-Runden, bevor überhaupt etwas läuft.",
  "Du suchst eine Agentur, die dir den Brief schreibt — wir arbeiten mit Operatoren, die wissen, was sie wollen.",
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
              <span className="num">/</span> System · für Mandate ab 50k+
            </span>
          </Reveal>
          <Reveal delay={80} variant="mask">
            <h1 className="h-display-xl mt-7 max-w-[1140px]">
              Vertrauen ist ein Produkt.
              <br />
              <em className="gradient-text">So bauen wir es.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 max-w-[720px] text-[19px] md:text-[21px] leading-[1.5]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Bei hohem Warenkorbwert ist die Frage nicht <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>„kann der das?"</em>{" "}
              sondern <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>„kann ich dem hier mein Mandat anvertrauen?"</em>
              {" "}— Wir antworten mit Tatsachen, nicht mit Adjektiven: Festpreis, 10 Werktage, ein Operator, ein Track-Record mit Quellen.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/anfrage" className="btn-primary">
                Slot prüfen
                <span aria-hidden>→</span>
              </Link>
              <Link href="#contract" className="btn-secondary">
                Liefervertrag lesen
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
                Ø Reply &lt; 6h · 2 Slots frei Q3
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
            <span className="num">/</span> Track-Record mit Quellen
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[1080px]">
            <em className="gradient-text">€300M+</em> in den Büchern unserer Kunden.
            <br />
            Gebaut von einem, der selbst skaliert hat.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[680px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Brand-Arbeit ist ein Faktor. Produkt, Markttiming, Sales — auch. Wir behaupten nicht, das alleine gemacht zu haben.
            {" "}<em style={{ color: "var(--ink-cream)" }}>Was in unserem Lieferumfang lag, zeigen wir mit Quellen — jede Zahl überprüfbar.</em>
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
                Du sprichst mit dem,
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
                  Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2009</em> Brand-Arbeit für Konzerne —
                  Bosch, Continental, Michelin. Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2017</em>{" "}
                  beuwy als Operator-Studio.
                </p>
                <p>
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2023</em> selbst Unternehmer: 315 Wohnungen über Instagram verkauft —
                  mitten in der Zinskrise. Volumen €48,4M, Ø Ticket €153.842, ohne externes Marketing-Team.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Das heißt: Ich kenne Kaufentscheidungen bei hohem Ticket nicht aus einer Studie. Ich löse sie selbst aus.
                  Wenn ich dir sage, was in deiner Marke nicht funktioniert, ist das nicht Theorie — das ist die letzte Cohort.
                </p>
                <p>
                  Kein Account-Manager dazwischen. Keine Junior-Übergabe nach Kickoff. Ein Brief, eine Antwort, eine Hand,
                  ein Festpreis. <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Das ist das ganze Modell.</em>
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
                      Founder · Operator seit 2009
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
                  &ldquo;Wir geben Gründern ein laufendes System und einen Graphen, der schon{" "}
                  <em style={{ fontStyle: "italic" }}>klettert</em> — bevor die nächste Agentur ihr Notion-Doc fertig hat.&rdquo;
                </p>
                <div
                  className="mt-7 pt-5 grid grid-cols-3 gap-4"
                  style={{ borderTop: "1px solid var(--line-subtle)" }}
                >
                  {[
                    { v: "16+", l: "Jahre Brand" },
                    { v: "4×", l: "von 0 zur Kategorie" },
                    { v: "€300M+", l: "Kunden-Volumen" },
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
          04 — WAS DU AM TAG 10 HAST — the capability, contextualized
         ============================================================ */}
      <Section id="deliverable" tone="base">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Was du am Tag 10 hast
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[980px]">
            Eine Datei. Die <em className="font-display italic">Quelle</em>{" "}
            deiner Marke — für Menschen und Agenten gleichzeitig lesbar.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[680px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Vorher: 14 Versionen einer Voice-Datei in Figma, drei Logos, ein Stilbruch zwischen Hero und Footer.
            <br />
            <em style={{ color: "var(--ink-cream)", fontStyle: "italic" }}>
              Nachher: <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-yellow)" }}>DESIGN.md</code> —
              Brand-Tokens, Voice, Vocabulary, Forbidden Phrases. Eine Quelle.
            </em>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12">
            <Editor height={520} interactive />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12">
            <p
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Klick eine Zeile — die anderen dimmen weg, die Bedeutung wird sichtbar.
            </p>
            <div className="mt-5">
              <InteractiveCode height={560} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Brand-System",
                meta: "DESIGN.md · Voice · Forbidden Phrases",
                d: "Eine maschinenlesbare Quelle für Identität, Sprache, Tokens. Wenn ein Agent über deine Marke spricht, redet er aus dieser Datei.",
              },
              {
                t: "Live-Site",
                meta: "Next.js · Vercel · deine TLD",
                d: "12 Sektionen, indizierbar, auf deiner Domain. Eine Seite wie diese hier — auf deine Marke kalibriert.",
              },
              {
                t: "Agent-Layer",
                meta: "schema.org · llms.txt · Cluster-Brief",
                d: "Lesbar für Claude · GPT · Perplexity. GPT-Audit deiner aktuellen Sichtbarkeit inklusive.",
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
            <span className="num">/</span> Der Liefervertrag
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[1000px]">
            Was wir versprechen,
            <br />
            in <em className="gradient-text">vier Sätzen</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[640px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Kein Kleingedrucktes nach Mandatsannahme. Diese vier Bedingungen gelten von der ersten Antwort auf deinen Brief.
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
                Stehen Marke, Site und Agent-Layer nicht am zehnten Werktag live auf deiner Domain,
                bekommst du den vollen Festpreis zurück. Ohne Diskussion, ohne Kleingedrucktes.
                <em style={{ fontStyle: "italic", color: "var(--bg-base)" }}> Die Deadline ist unser Risiko — nicht deins.</em>
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
            Die Garantie gilt für die <em style={{ color: "var(--ink-cream)", fontStyle: "italic" }}>Auslieferung</em>, nicht für Rankings oder Umsatz.
            Brand-Arbeit ist ein Faktor neben Produkt, Markttiming und Sales. Wir garantieren das System,
            die Auslieferung am Tag 10 und die Begleitung danach — keine Rankings, keine Umsatzzahlen.
            Wer das tut, lügt.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          06 — FÜR DICH WENN / NICHT FÜR DICH WENN
         ============================================================ */}
      <Section id="fit" tone="cream">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> Pass-Check · in zwei Spalten
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-display-md mt-6 max-w-[1000px]">
            Wir nehmen sechs Mandate pro Jahr.
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
              <span className="num">/</span> 6 Plätze im Jahr · 2 frei für Q3
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display-md mt-6 max-w-[980px]">
              Schick einen Brief.
              <br />
              <em className="gradient-text">Wir antworten in &lt; 6h</em> mit Termin, Festpreis oder ehrlichem Ja/Nein-Match.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/anfrage" className="btn-primary">
                Brief schicken
                <span aria-hidden>→</span>
              </Link>
              <Link href="/audit" className="btn-secondary">
                Erst die Marke prüfen
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
