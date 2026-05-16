import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Methode — Brand · Site · Agent-Layer in 10 Tagen | beuwy",
  description:
    "Vier Phasen, ein Operator, ein Festpreis. Frame · Shape · Ship · Compound. Ohne Discovery-Theater, ohne 19 Stakeholder-Interviews.",
};

export default function MethodPage() {
  return (
    <>
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Methode · 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display mt-7 text-[44px] sm:text-[64px] md:text-[88px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Drei bis fünf <em className="font-display italic">Tage</em>.
              <br />
              Nicht drei bis fünf <em className="font-display italic">Monate</em>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[640px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Ein Operator, ein Festpreis, ein Liefertag. Keine Discovery-Phase, keine
              Stakeholder-Karusselle, keine Mockup-Galerien. Wir bauen das System, das du in 10 Tagen
              live hast.
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

      <Section chapter="03 Pricing" title="Was es kostet" date="2026 / 03" tone="elevated">
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
      </Section>
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
