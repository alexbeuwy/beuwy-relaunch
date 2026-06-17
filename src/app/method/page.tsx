import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Methode — 10 Tage, 4 Phasen, ein Operator",
  description:
    "Vier Phasen, ein Operator, ein Festpreis. Frame · Shape · Ship · Compound. Ohne Discovery-Theater, ohne 19 Stakeholder-Interviews.",
  alternates: { canonical: "/method" },
  openGraph: {
    title: "Methode — 10 Tage, 4 Phasen, ein Operator",
    description: "Frame · Shape · Ship · Compound. Festpreis, ein Operator, drei Auslieferungen.",
    type: "article",
    url: "https://beuwy.com/method",
  },
  twitter: { card: "summary_large_image" },
};

export default function MethodPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Methode", href: "/method" }])} />
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Methode · 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              10 Tage. <em>Festpreis</em>.
              <br />
              <em className="gradient-text">Live.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Ein Operator, ein Preis, ein Liefertag. <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Du machst Q4</em>,
              wir bauen Marke + Website + Agent-Sichtbarkeit. Kein Discovery-Theater.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Phasen" title="Wie es läuft" date="2026 / 01" tone="raised">
        <div className="space-y-3">
          {[
            {
              n: "01",
              ph: "Frame",
              wk: "Tag 1–2",
              h: "Eine Frage, zwei Tage.",
              s: "Wo liegt die Hebel-Wirkung? Kein Miro-Theater. Kein Discovery-Workshop. Wir kommen mit einer Hypothese, du sagst Ja oder Nein.",
            },
            {
              n: "02",
              ph: "Shape",
              wk: "Tag 3–6",
              h: "End-to-End-Prototyp.",
              s: "DESIGN.md. Live-Site auf Staging. Voice & Tonalität. Klickbar, opinionated, kein Wireframe-Bullshit. Du siehst Donnerstag, was Donnerstag wird.",
            },
            {
              n: "03",
              ph: "Ship",
              wk: "Tag 7–10",
              h: "Bauen. Launchen. Instrumentieren.",
              s: "Auf deine Domain. Mit Analytics, Cohort-Tracking, Agent-Layer. Deine Wettbewerber diskutieren noch die Farbpalette.",
            },
            {
              n: "04",
              ph: "Compound",
              wk: "Tag 11+",
              h: "Du am Strand.",
              s: "Laptop offen, Graph klettert. Wir halten den Retainer — Experimente, Lifecycle, Kohorten-Receipts. Auf Wunsch.",
            },
          ].map((row) => (
            <Reveal key={row.n}>
              <div
                className="grid grid-cols-12 gap-6 items-start py-9 px-6 rounded-[12px]"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <div className="col-span-12 md:col-span-2">
                  <span
                    className="font-display"
                    style={{
                      fontSize: 56,
                      letterSpacing: "-0.025em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1,
                    }}
                  >
                    {row.n}
                  </span>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--ink-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {row.ph} · {row.wk}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-10">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 32,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.1,
                    }}
                  >
                    {row.h}
                  </p>
                  <p
                    className="mt-3 max-w-[720px]"
                    style={{ color: "var(--ink-muted)", fontSize: 16, lineHeight: "26px" }}
                  >
                    {row.s}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section chapter="02 Plan" title="Tag für Tag, was passiert" date="2026 / 02" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[920px]">
            Zehn Tage. Zehn{" "}
            <em className="font-display italic">Liefergegenstände</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Damit du das deinem Vorstand zeigen kannst — und damit du am elften Tag exakt weißt,
            was du in der Hand hast.
          </p>
        </Reveal>

        <div className="mt-12">
          {[
            { d: "Tag 01", t: "Frame-Call", x: "30 Min Async-Loom oder Live. Wir kommen mit einer Hypothese.", g: "Frame" },
            { d: "Tag 02", t: "Kategorie-These", x: "Eine Seite: Wer du bist, wer dich kaufen muss, was den Buyer abhält. Zur Freigabe.", g: "Frame" },
            { d: "Tag 03", t: "Brand-Vokabular", x: "Voice-Charter + 12 Forbidden Phrases. Maschinenlesbar.", g: "Shape" },
            { d: "Tag 04", t: "DESIGN.md v0.1", x: "Tokens, Tonalität, Motion-Rules. In deinem Repo.", g: "Shape" },
            { d: "Tag 05", t: "Section-Logik", x: "Welche 12 Sektionen deine Landing trägt. Mit AHA-Punkt pro Sektion.", g: "Shape" },
            { d: "Tag 06", t: "Live-Site Staging", x: "Klickbar auf Vercel. Inkl. Hero, Proof, Offer. Du siehst Donnerstag, was Donnerstag wird.", g: "Shape" },
            { d: "Tag 07", t: "Agent-Layer", x: "schema.org, llms.txt, Cluster-Brief. Damit Claude & Co. dich verstehen.", g: "Ship" },
            { d: "Tag 08", t: "Content-Pass", x: "Final-Copy auf Headlines, Subheads, Microcopy. Auf deine Stimme kalibriert.", g: "Ship" },
            { d: "Tag 09", t: "Instrumentierung", x: "Plausible/PostHog, Lead-Routing, Calendar-Bridge. Analytics ab Launch.", g: "Ship" },
            { d: "Tag 10", t: "Launch", x: "DNS-Cutover. Wir bleiben am Standby. 24h-Hypercare.", g: "Ship" },
          ].map((day, i) => (
            <Reveal key={day.d} delay={i * 30}>
              <div
                className="grid grid-cols-12 gap-6 py-5 items-start"
                style={{ borderBottom: "1px solid var(--line-subtle)" }}
              >
                <div className="col-span-3 md:col-span-2">
                  <span
                    style={{
                      color: "var(--ink-yellow)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {day.d}
                  </span>
                  <p
                    className="mt-1"
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {day.g}
                  </p>
                </div>
                <div className="col-span-9 md:col-span-3">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.1,
                    }}
                  >
                    {day.t}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: "24px" }}>
                    {day.x}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section chapter="03 Tempo" title="Warum 10 Tage kein Risiko sind" date="2026 / 03" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[960px]">
            Schnell heißt nicht hektisch.
            <br />
            Schnell heißt <em className="font-display italic">vorbereitet</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[680px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Agenturen sind langsam, weil sie bei null anfangen, im Komitee entscheiden und nach dem
            Kickoff an Junioren übergeben. Wir sind schnell aus den umgekehrten Gründen — nicht trotz
            Qualität, sondern wegen ihr.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            {
              t: "Kein Discovery-Theater",
              d: "Kein sechswöchiger, bezahlter Workshop, an dessen Ende ein Foliensatz steht. Wir kommen am Tag 1 mit einer Hypothese — du sagst Ja oder Nein.",
            },
            {
              t: "Ein Operator baut",
              d: "Keine Übergabe an Junioren, kein Account-Manager als Telefonzentrale. Der, der den ersten Call führt, schreibt auch die letzte Zeile Code.",
            },
            {
              t: "System statt Nullpunkt",
              d: "Tokens, Motion-Rules, Agent-Layer-Patterns existieren. Wir kalibrieren sie auf deine Marke — wir erfinden sie nicht jedes Mal neu.",
            },
            {
              t: "Entscheidung in einer Hand",
              d: "Keine 19 Stakeholder, keine Freigabe-Schleifen über drei Wochen. Founder-led entscheidet in Stunden, nicht in Sprints.",
            },
          ].map((r) => (
            <Reveal key={r.t}>
              <div className="card h-full">
                <p
                  className="font-display"
                  style={{
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.1,
                  }}
                >
                  {r.t}
                </p>
                <p
                  className="mt-3"
                  style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: "24px" }}
                >
                  {r.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Decision matrix — beuwy vs. the alternatives */}
        <Reveal delay={120}>
          <p
            className="mt-16 mb-5 eyebrow"
            style={{ color: "var(--ink-dim)" }}
          >
            <span className="num">/</span> Der ehrliche Vergleich
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table
              className="w-full border-collapse"
              style={{ minWidth: 720, fontSize: 14 }}
            >
              <thead>
                <tr>
                  {["", "beuwy", "Klassische Agentur", "Freelancer", "Inhouse-Hire"].map((h, i) => (
                    <th
                      key={h || "crit"}
                      className="text-left align-bottom py-4 px-4"
                      style={{
                        borderBottom: "1px solid var(--line-medium)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        color: i === 1 ? "var(--ink-yellow)" : "var(--ink-dim)",
                        fontWeight: i === 1 ? 600 : 400,
                        background: i === 1 ? "rgba(247,233,154,0.06)" : "transparent",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "Zeit bis live", v: ["10 Werktage", "8–16 Wochen", "Unklar, oft offen", "3–6 Monate Ramp-up"] },
                  { c: "Preis", v: ["Festpreis, vorab", "Tagessatz + Scope-Creep", "Günstig, aber Risiko", "Gehalt + Lohnnebenkosten"] },
                  { c: "Wer baut", v: ["Senior-Operator direkt", "Junior nach Kickoff", "Eine Person, ein Skill", "Du musst führen"] },
                  { c: "Agent-Layer", v: ["Inklusive", "Kennt den Begriff selten", "Selten Thema", "Aufbau-Projekt"] },
                  { c: "Wer trägt das Risiko", v: ["Wir — Tag 10 oder Geld zurück", "Du", "Du", "Fehlbesetzung kostet dich"] },
                ].map((row) => (
                  <tr key={row.c}>
                    <td
                      className="py-4 px-4 align-top"
                      style={{
                        borderBottom: "1px solid var(--line-subtle)",
                        color: "var(--ink-cream)",
                        fontWeight: 510,
                      }}
                    >
                      {row.c}
                    </td>
                    {row.v.map((cell, i) => (
                      <td
                        key={i}
                        className="py-4 px-4 align-top"
                        style={{
                          borderBottom: "1px solid var(--line-subtle)",
                          color: i === 0 ? "var(--ink-yellow)" : "var(--ink-muted)",
                          background: i === 0 ? "rgba(247,233,154,0.06)" : "transparent",
                          fontWeight: i === 0 ? 510 : 400,
                          lineHeight: 1.4,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section chapter="04 Pricing" title="Was es kostet" date="2026 / 04" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[940px]">
            Festpreis. Festumfang. Fester{" "}
            <em className="font-display italic">Liefertag</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Drei Pakete. Keine Stundensätze. Keine Discovery-Aufschläge. Du bekommst die Zahl, die du
            an deinen CFO weiterreichst, in 6h nach Brief-Eingang.
          </p>
        </Reveal>

        {/* Asymmetric pricing: System dominant, Sprint + Compound flanking smaller */}
        <div
          className="mt-10 grid gap-5"
          style={{
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Hero: System */}
          <Reveal>
            <PricingHero />
          </Reveal>

          {/* Two flanking lighter packages */}
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={80}>
              <PricingFlank
                name="Sprint"
                price="ab 12.500 €"
                dur="5 Tage"
                cta="Sprint anfragen"
                what={[
                  "Eine Sektion (Brand · Site · Agent-Layer)",
                  "Audit + 1 Pivot-Empfehlung",
                  "Async Loom + 1 Working Session",
                ]}
              />
            </Reveal>
            <Reveal delay={160}>
              <PricingFlank
                name="Compound"
                price="ab 6.500 € / Mo"
                dur="monatlich"
                cta="Retainer anfragen"
                what={[
                  "Experimente · Lifecycle · Paid",
                  "Cohort-Receipts · Launch-Calendar",
                  "Operator-Standby (≤ 6h Reply)",
                ]}
              />
            </Reveal>
          </div>
        </div>

        {/* Guarantee echo — the risk reversal, linked to the full contract */}
        <Reveal delay={200}>
          <Link
            href="/system#contract"
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[14px] px-6 py-5 group"
            style={{
              background: "rgba(247,233,154,0.06)",
              border: "1px solid var(--line-medium)",
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink-yellow)" }}
            >
              Tag 10 — oder Geld zurück.
            </span>
            <span style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: 1.5 }}>
              Live am zehnten Werktag, sonst voller Festpreis zurück. Die Deadline ist unser Risiko.
            </span>
            <span
              className="ml-auto group-hover:text-[var(--ink-yellow)] transition-colors"
              style={{ color: "var(--ink-cream)", fontSize: 13 }}
            >
              Liefervertrag lesen →
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-[100px] md:py-[128px]" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 text-center">
          <Reveal>
            <HeadlineDisplay size="lg" className="mx-auto max-w-[840px]">
              Dein Q4 läuft.
              <br />
              <em className="gradient-text">Soll deine Marke mitlaufen?</em>
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-6 mx-auto max-w-[560px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Schick uns deinen Brief. Du bekommst die Zahl und einen Liefertermin in ≤ 6 Stunden —
              keine Discovery-Schleife, kein Verkaufsgespräch mit drei Folgeterminen.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/anfrage" className="btn-primary">
                Slot sichern
                <span aria-hidden>→</span>
              </Link>
              <Link href="/audit" className="btn-secondary">
                Erst Audit ansehen
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="mt-7"
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
              }}
            >
              2 Slots offen · Q3/2026 · Antwort in ≤ 6h
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- pricing sub-components (asymmetric layout) ---------- */

function PricingHero() {
  const includes = [
    "DESIGN.md · Tokens · Voice · Forbidden Phrases",
    "Live-Site (12 Sektionen, deine Domain, Vercel)",
    "Agent-Layer · schema.org · llms.txt · Cluster-Brief",
    "30 Tage Compound-Standby nach Launch",
  ];
  return (
    <div
      className="rounded-[16px] p-7 md:p-10 grid md:grid-cols-12 gap-8 items-end"
      style={{
        background: "var(--ink-yellow)",
        color: "var(--bg-base)",
        border: "1px solid var(--ink-yellow)",
        boxShadow: "0 26px 60px -32px rgba(247,233,154,0.35)",
      }}
    >
      <div className="md:col-span-7">
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              background: "var(--bg-base)",
              color: "var(--ink-yellow)",
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            EMPFOHLEN
          </span>
          <span
            style={{
              color: "rgba(33,6,6,0.6)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            2 Slots offen · Q3/2026
          </span>
        </div>
        <p
          className="font-display mt-5"
          style={{
            fontSize: 44,
            letterSpacing: "-0.025em",
            color: "var(--bg-base)",
            lineHeight: 1,
          }}
        >
          System.
        </p>
        <p
          className="mt-3 max-w-[480px]"
          style={{
            color: "rgba(33,6,6,0.78)",
            fontSize: 15,
            lineHeight: "24px",
          }}
        >
          Das ganze Paket. Brand · Site · Agent-Layer. Ein Operator, ein Festpreis, ein Liefertag —
          live am Tag 10.
        </p>
      </div>
      <div className="md:col-span-5">
        <p
          className="font-display tnum"
          style={{
            fontSize: 64,
            letterSpacing: "-0.025em",
            color: "var(--bg-base)",
            lineHeight: 0.95,
          }}
        >
          ab 38.000&nbsp;€
        </p>
        <p
          style={{
            color: "rgba(33,6,6,0.6)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            marginTop: 6,
          }}
        >
          10 Tage · Festpreis
        </p>
      </div>

      <div className="md:col-span-12">
        <div
          className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pt-6 mt-2"
          style={{
            borderTop: "1px solid rgba(33,6,6,0.18)",
          }}
        >
          {includes.map((line, i) => (
            <div
              key={line}
              className="flex items-start gap-3"
              style={{
                color: "var(--bg-base)",
                fontSize: 15,
                lineHeight: "22px",
              }}
            >
              <span
                style={{
                  color: "rgba(33,6,6,0.6)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  minWidth: 22,
                  marginTop: 3,
                }}
              >
                0{i + 1}
              </span>
              <span style={{ fontWeight: 510 }}>{line}</span>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/anfrage"
            className="btn-secondary"
            style={{
              background: "var(--bg-base)",
              color: "var(--ink-yellow)",
              boxShadow: "none",
            }}
          >
            Slot sichern
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/audit"
            style={{
              color: "rgba(33,6,6,0.78)",
              fontSize: 13,
              textDecoration: "underline",
              textDecorationColor: "rgba(33,6,6,0.32)",
              textUnderlineOffset: 4,
            }}
          >
            Erst Audit ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}

function PricingFlank({
  name,
  price,
  dur,
  what,
  cta,
}: {
  name: string;
  price: string;
  dur: string;
  what: string[];
  cta: string;
}) {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-baseline justify-between">
        <p
          className="font-display"
          style={{
            fontSize: 26,
            letterSpacing: "-0.02em",
            color: "var(--ink-yellow)",
          }}
        >
          {name}
        </p>
        <span
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
          }}
        >
          {dur}
        </span>
      </div>
      <p
        className="font-display tnum mt-3"
        style={{
          fontSize: 36,
          letterSpacing: "-0.025em",
          color: "var(--ink-yellow)",
          lineHeight: 1,
        }}
      >
        {price}
      </p>

      <ul className="mt-6 space-y-2 flex-1">
        {what.map((w) => (
          <li
            key={w}
            className="flex items-start gap-3"
            style={{
              color: "var(--ink-cream)",
              fontSize: 14,
              lineHeight: "22px",
            }}
          >
            <span
              className="mt-[7px] shrink-0"
              style={{
                width: 5,
                height: 5,
                background: "var(--ink-yellow)",
                borderRadius: 1,
              }}
            />
            {w}
          </li>
        ))}
      </ul>

      <Link href="/anfrage" className="btn-secondary mt-7">
        {cta}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
