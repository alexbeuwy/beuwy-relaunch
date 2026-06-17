import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Sichtbar in der KI-Ära — oder unsichtbar",
  description:
    "Bald sucht niemand mehr — man fragt. Empfiehlt die KI dann dich oder deinen Wettbewerber? Marke, Site und Agent-Layer, live in 10 Tagen. Festpreis. Tag 10 oder Geld zurück.",
  alternates: { canonical: "/sichtbar" },
  openGraph: {
    title: "Bald sucht niemand mehr. Man fragt.",
    description:
      "Empfiehlt die KI dich — oder deinen Wettbewerber? Marke · Site · Agent-Layer, live in 10 Tagen. Festpreis, Tag 10 oder Geld zurück.",
    type: "website",
    url: "https://beuwy.com/sichtbar",
  },
  twitter: { card: "summary_large_image" },
};

/* ---------- FAQ — the skeptical buyer's real objections ---------- */
const faq: { q: string; a: string }[] = [
  {
    q: "10 Tage — geht da Qualität nicht flöten?",
    a: "Umgekehrt. Schnell heißt vorbereitet, nicht hektisch. Kein bezahltes Discovery-Theater, keine Junior-Übergabe, kein Komitee. Ein Senior-Operator baut direkt auf einem System, das schon existiert. Die Wochen, die Agenturen verbrauchen, sind Abstimmung — nicht Arbeit.",
  },
  {
    q: "Garantiert ihr Rankings oder Umsatz?",
    a: "Nein — und wer das tut, lügt. Brand ist ein Faktor neben Produkt, Timing und Sales. Wir garantieren die Auslieferung am Tag 10 und 30 Tage Begleitung danach. Was wir gebaut haben, zeigen wir mit Quellen. Was wir nicht beeinflusst haben, behaupten wir nicht.",
  },
  {
    q: "Warum kostet das ab 38.000 €?",
    a: "Weil ein Operator mit 16 Jahren Brand-Arbeit baut, nicht ein Team aus Junioren. Rechne gegen: eine Agentur über 3 Monate, ein Inhouse-Hire mit Gehalt plus Lohnnebenkosten plus Ramp-up, oder eine veraltete Site, die dich gerade Anfragen kostet. Der Festpreis ist die einzige Zahl, die du an deinen CFO weiterreichst.",
  },
  {
    q: "Was, wenn die KI-Suche doch nicht so schnell kommt?",
    a: "Dann hast du trotzdem eine schnelle, moderne, indizierbare Website auf deiner Domain — den Standard, den Google seit Jahren belohnt. Der Agent-Layer ist die Versicherung obendrauf, nicht die einzige Wette. Du verlierst nichts, wenn du früh dran bist. Du verlierst alles, wenn du zu spät bist.",
  },
  {
    q: "Können wir danach selbst Änderungen machen?",
    a: "Ja. Die Site liegt in deinem Repo, der Content ist über einen visuellen Editor pflegbar. Keine Geiselhaft beim Dienstleister, kein Stundensatz für jede Komma-Änderung.",
  },
  {
    q: "Ist das DSGVO-konform aufgesetzt?",
    a: "Von Anfang an: Impressum, Datenschutz, sichere Hosting-Basis auf Vercel, keine Tracker-Schleudern. Compliance ist eingebauter Standard, keine Dauerbaustelle.",
  },
];

/* ---------- Proof — every figure cite-able ---------- */
const proof: { prefix?: string; value: number; suffix?: string; label: string; source: string }[] = [
  { prefix: "€", value: 160, suffix: "M", label: "Vision — Markenarchitektur über Jahre", source: "Mandat" },
  { value: 2240, suffix: "", label: "Königswege — von 170 auf 2.240 Partner", source: "Mandat" },
  { prefix: "€", value: 48.4, suffix: "M", label: "acta — 315 Wohnungen, Ø Ticket €153.842", source: "2023" },
  { prefix: "", value: 1, suffix: "M+", label: "PURELEI — Follower seit Erstauftritt", source: "Instagram" },
];

export default function SichtbarPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Sichtbar in der KI-Ära", href: "/sichtbar" },
          ]),
          serviceLd,
          faqPageLd(faq)!,
        ]}
      />

      {/* ============================================================
          HERO — the hook + open loop (Angle 9: "KI frisst die Suche")
         ============================================================ */}
      <section className="relative pt-[140px] md:pt-[180px] pb-[72px] overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "-6%", right: "-8%", width: 560, height: 560, opacity: 0.5 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> Für Marken, die in der KI-Ära gefunden werden wollen
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 max-w-[1080px]">
              Bald sucht niemand mehr.
              <br />
              <em className="font-display italic">Man fragt.</em>{" "}
              <em className="gradient-text">Wirst du empfohlen?</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              In 18 Monaten entscheidet nicht mehr eine Liste blauer Links, wer dich findet — sondern
              ein Agent, der <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>eine</em> Antwort gibt.
              Und in dieser Antwort gibt es keinen zweiten Platz. Die Frage ist nur, mit wessen Marke
              er trainiert wird.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen KI-Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="#operator" className="btn-secondary">
                Wer dahinter steht
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p
              className="mt-7"
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
              }}
            >
              Festpreis · live in 10 Werktagen · Tag 10 oder Geld zurück
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          01 — DIE VERSCHIEBUNG — proportionate, proof-backed agitation
         ============================================================ */}
      <Section chapter="01 Lage" title="Drei Verschiebungen, gleichzeitig" date="2026 / 01" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Der Boden bewegt sich.
            <br />
            <em className="font-display italic">Mit Zahlen, nicht mit Meinung.</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Kein Weltuntergang, keine Panik. Nur drei Entwicklungen, die belegt sind — und die sich
            gerade überlagern. Wer sie zusammen liest, sieht das Fenster.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              h: "Die Suche kippt",
              big: "8 %",
              bigLabel: "Klickrate, sobald eine KI-Antwort oben steht — ohne KI sind es 15 %.",
              body: "Der Kanal, auf den du jahrelang gebaut hast, schrumpft strukturell. Die Antwort steht im Ergebnis, der Klick bleibt aus.",
              src: "Pew Research · Juli 2025 · Gartner prognostiziert −25 % Suchvolumen bis 2026",
            },
            {
              h: "Die KI-Lücke",
              big: "64 %",
              bigLabel: "der deutschen Unternehmen nennen sich selbst Digitalisierungs-Nachzügler.",
              body: "Nur jedes fünfte Unternehmen nutzt KI — bei kleinen Firmen 17 %. Die größte Hürde ist nicht Geld, sondern fehlendes Wissen.",
              src: "Bitkom · März 2025 · Destatis · November 2024",
            },
            {
              h: "Die Flaute",
              big: "+10,3 %",
              bigLabel: "mehr Unternehmensinsolvenzen 2025 — höchster Stand seit 2014.",
              body: "Zwei Rezessionsjahre in Folge. Wer jetzt modernisiert, steht beim Aufschwung vorn. Wer wartet, wartet allein.",
              src: "Destatis · 2025/2026",
            },
          ].map((c, i) => (
            <Reveal key={c.h} delay={80 + i * 80}>
              <div className="card h-full flex flex-col">
                <span
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.h}
                </span>
                <p
                  className="font-display mt-4"
                  style={{ fontSize: 52, letterSpacing: "-0.03em", color: "var(--ink-yellow)", lineHeight: 1 }}
                >
                  {c.big}
                </p>
                <p className="mt-3" style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510, lineHeight: 1.4 }}>
                  {c.bigLabel}
                </p>
                <p className="mt-4 flex-1" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
                  {c.body}
                </p>
                <p
                  className="mt-5"
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.04em",
                    lineHeight: 1.5,
                  }}
                >
                  Quelle · {c.src}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          02 — ES LIEGT NICHT AN DIR — reframe + agency pain
         ============================================================ */}
      <Section chapter="02 Diagnose" title="Warum die alte Lösung nicht mehr greift" date="2026 / 02" tone="base">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[640px]">
                Du hast nichts falsch gemacht.
                <br />
                Die <em className="gradient-text">Regeln</em> haben sich geändert.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Die Website, die für Google gebaut wurde, ist für einen Agenten unsichtbar. Er liest
                  keine schönen Bilder. Er liest Struktur, Quellen, maschinenlesbare Bedeutung — und
                  davon hat eine klassische Seite nichts.
                </p>
                <p>
                  Und die Agentur, die dir <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>drei Monate</em> und
                  einen fünfstelligen Betrag berechnet, kennt das Wort Agent-Layer nicht. Sie diskutiert
                  noch die Farbpalette, während deine Kategorie gerade neu sortiert wird.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Das ist keine Schuld. Das ist Timing. Und Timing ist das Einzige, was man bei diesem
                  Thema nicht nachkaufen kann.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="glass p-7 md:p-8">
                <p className="eyebrow mb-5">
                  <span className="num">/</span> Der ehrliche Vergleich
                </p>
                {[
                  { a: "Veraltete Site", b: "von Agenten nicht lesbar" },
                  { a: "Agentur-Projekt", b: "8–16 Wochen, fünfstellig, du kannst nichts selbst ändern" },
                  { a: "Inhouse-Hire", b: "Gehalt + Lohnnebenkosten + Monate Ramp-up" },
                  { a: "beuwy", b: "10 Werktage, Festpreis, Agent-Layer inklusive" },
                ].map((row, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <div
                      key={row.a}
                      className="flex items-baseline justify-between gap-4 py-3"
                      style={{
                        borderBottom: i < arr.length - 1 ? "1px solid var(--line-subtle)" : "none",
                      }}
                    >
                      <span
                        style={{
                          color: isLast ? "var(--ink-yellow)" : "var(--ink-cream)",
                          fontSize: 15,
                          fontWeight: isLast ? 600 : 510,
                        }}
                      >
                        {row.a}
                      </span>
                      <span
                        className="text-right"
                        style={{ color: isLast ? "var(--ink-yellow)" : "var(--ink-dim)", fontSize: 13, lineHeight: 1.4 }}
                      >
                        {row.b}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          03 — DER OPERATOR — credibility bridge, moved EARLY
         ============================================================ */}
      <Section id="operator" chapter="03 Vertrauen" title="Wer das baut" date="2026 / 03" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "20%", left: "-12%", width: 440, height: 440, opacity: 0.32 }}
        />
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[640px]">
                Ich kenne Kauf­entscheidungen bei hohem Ticket nicht aus einer{" "}
                <em className="font-display italic">Studie</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2009</em> Brand-Arbeit für
                  Konzerne — Bosch, Continental, Michelin. Seit{" "}
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2017</em> beuwy als Operator-Studio.
                </p>
                <p>
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2023</em> selbst Unternehmer:
                  315 Wohnungen über Instagram verkauft — mitten in der Zinskrise. Volumen €48,4M, ohne
                  externes Marketing-Team.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Wenn ich dir sage, was in deiner Marke nicht funktioniert, ist das nicht Theorie. Das
                  ist die letzte Cohort. Kein Account-Manager dazwischen, keine Junior-Übergabe — ein
                  Brief, eine Antwort, eine Hand.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 space-y-5">
            <Reveal delay={120}>
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
              <div className="glass p-7">
                <div
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { v: "16+", l: "Jahre Brand" },
                    { v: "4×", l: "von 0 zur Kategorie" },
                    { v: "€300M+", l: "Kunden-Volumen" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p
                        className="font-display"
                        style={{ color: "var(--ink-yellow)", fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1 }}
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
          04 — WIE ES FUNKTIONIERT — transparent mechanism, no "secret"
         ============================================================ */}
      <Section chapter="04 Mechanismus" title="Kein Geheim-System. Drei Schichten." date="2026 / 04" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            Damit ein Agent dich empfiehlt, muss er dich erst{" "}
            <em className="gradient-text">verstehen</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Wir bauen genau das — in drei Schichten, jede maschinenlesbar. Nichts davon ist Magie. Es
            ist Struktur, die die meisten noch nicht legen.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              n: "01",
              t: "DESIGN.md",
              meta: "Tokens · Voice · Forbidden Phrases",
              d: "Eine maschinenlesbare Quelle für Identität und Sprache. Wenn ein Agent über deine Marke spricht, redet er aus dieser Datei — nicht aus dem, was er zufällig findet.",
            },
            {
              n: "02",
              t: "Live-Site",
              meta: "Next.js · Vercel · deine Domain",
              d: "Schnell, indizierbar, mobil, auf deiner TLD. Der Standard, den Google seit Jahren belohnt — und die Basis, auf der der Agent-Layer überhaupt greift.",
            },
            {
              n: "03",
              t: "Agent-Layer",
              meta: "schema.org · llms.txt · Cluster-Brief",
              d: "Lesbar für Claude, GPT, Perplexity, Google AI Overviews. Plus ein GPT-Audit deiner aktuellen Sichtbarkeit — du siehst schwarz auf weiß, wo du heute stehst.",
            },
          ].map((d) => (
            <Reveal key={d.t}>
              <div className="card h-full">
                <span
                  className="font-display"
                  style={{ fontSize: 28, color: "var(--ink-yellow)", letterSpacing: "-0.025em", lineHeight: 1 }}
                >
                  {d.n}
                </span>
                <p
                  className="font-display mt-4"
                  style={{ fontSize: 24, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.1 }}
                >
                  {d.t}
                </p>
                <p
                  className="mt-2"
                  style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em" }}
                >
                  {d.meta}
                </p>
                <p className="mt-4" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.55 }}>
                  {d.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-[15px] leading-[1.6] max-w-[640px]" style={{ color: "var(--ink-cream)" }}>
            Am Tag 10 steht das alles live auf deiner Domain.{" "}
            <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Nicht in Figma. Nicht in Notion.</em>{" "}
            Live, indizierbar, agentenlesbar.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          05 — DER BEWEIS — the proof stack that carries the page
         ============================================================ */}
      <Section chapter="05 Beweis" title="Track-Record mit Quellen" date="2026 / 05" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "8%", right: "-10%", width: 520, height: 520, opacity: 0.5 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Wir antworten mit Tatsachen,
            <br />
            nicht mit <em className="font-display italic">Adjektiven</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Vier Mal von null zur Kategorie. Jede Zahl ist nachprüfbar — keine anonymen „10.000
            zufriedenen Kunden".
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {proof.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass p-6 h-full">
                <p className="stat-num-display">
                  <CountUp prefix={s.prefix ?? ""} to={s.value} suffix={s.suffix ?? ""} duration={1700} />
                </p>
                <p className="mt-3" style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510, lineHeight: 1.4 }}>
                  {s.label}
                </p>
                <p
                  className="mt-3"
                  style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em" }}
                >
                  Quelle · {s.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 mt-10 group"
            style={{ color: "var(--ink-cream)", fontSize: 15 }}
          >
            Alle Cases mit Vorher/Nachher
            <span aria-hidden className="group-hover:translate-x-1 transition-transform" style={{ color: "var(--ink-yellow)" }}>
              →
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ============================================================
          06 — DAS ANGEBOT — reasoned value, not hyped anchoring
         ============================================================ */}
      <Section chapter="06 Angebot" title="Was du bekommst" date="2026 / 06" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            Ein Operator. Ein Festpreis.
            <br />
            Ein <em className="gradient-text">Liefertag</em>.
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <div
              className="rounded-[16px] p-7 md:p-10 grid md:grid-cols-12 gap-8 items-end"
              style={{
                background: "var(--ink-yellow)",
                color: "var(--bg-base)",
                boxShadow: "0 26px 60px -32px rgba(247,233,154,0.35)",
              }}
            >
              <div className="md:col-span-7">
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
                  DAS SYSTEM
                </span>
                <p
                  className="font-display mt-5"
                  style={{ fontSize: 44, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 1 }}
                >
                  Brand · Site · Agent-Layer.
                </p>
                <p className="mt-3 max-w-[480px]" style={{ color: "rgba(33,6,6,0.78)", fontSize: 15, lineHeight: "24px" }}>
                  Das ganze Paket, live am Tag 10. Plus 30 Tage Compound-Standby nach Launch.
                </p>
              </div>
              <div className="md:col-span-5">
                <p
                  className="font-display tnum"
                  style={{ fontSize: 60, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 0.95 }}
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
                  10 Werktage · Festpreis
                </p>
              </div>
              <div className="md:col-span-12">
                <div
                  className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pt-6 mt-2"
                  style={{ borderTop: "1px solid rgba(33,6,6,0.18)" }}
                >
                  {[
                    "DESIGN.md · Tokens · Voice · Forbidden Phrases",
                    "Live-Site (12 Sektionen, deine Domain, Vercel)",
                    "Agent-Layer · schema.org · llms.txt · Cluster-Brief",
                    "GPT-Audit + 30 Tage Compound-Standby",
                  ].map((line, i) => (
                    <div
                      key={line}
                      className="flex items-start gap-3"
                      style={{ color: "var(--bg-base)", fontSize: 15, lineHeight: "22px" }}
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
                    style={{ background: "var(--bg-base)", color: "var(--ink-yellow)", boxShadow: "none" }}
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
          </Reveal>
        </div>
      </Section>

      {/* ============================================================
          07 — DIE GARANTIE — risk reversal, tied to delivery
         ============================================================ */}
      <Section chapter="07 Garantie" title="Das Risiko der Deadline tragen wir" date="2026 / 07" tone="base">
        <Reveal>
          <div
            className="rounded-[16px] p-8 md:p-12 grid md:grid-cols-12 gap-8 items-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--line-medium)",
            }}
          >
            <div className="md:col-span-8">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--ink-yellow)",
                  textTransform: "uppercase",
                }}
              >
                Geld-zurück-Garantie
              </span>
              <p
                className="font-display mt-5"
                style={{ fontSize: 44, letterSpacing: "-0.025em", color: "var(--ink-yellow)", lineHeight: 1.02 }}
              >
                Tag 10 — oder Geld zurück.
              </p>
              <p className="mt-4 max-w-[600px] text-[16px] leading-[1.6]" style={{ color: "var(--ink-cream)" }}>
                Stehen Marke, Site und Agent-Layer nicht am zehnten Werktag live auf deiner Domain,
                bekommst du den vollen Festpreis zurück. Ohne Diskussion, ohne Kleingedrucktes.
              </p>
              <p className="mt-4 max-w-[600px] text-[13px] leading-[1.6]" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}>
                Gilt für die Auslieferung — nicht für Rankings oder Umsatz. Die garantiert niemand seriös.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <div
                className="rounded-full flex flex-col items-center justify-center text-center shrink-0"
                style={{ width: 156, height: 156, border: "2px solid var(--ink-yellow)", color: "var(--ink-yellow)" }}
              >
                <span className="font-display" style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  Tag 10
                </span>
                <span
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-dim)",
                  }}
                >
                  live oder 0 €
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          08 — EINWÄNDE — the objection handling FAQ
         ============================================================ */}
      <Section chapter="08 Einwände" title="Was du jetzt denkst" date="2026 / 08" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Die Fragen, die du gerade
            <br />
            <em className="font-display italic">im Kopf hast</em>.
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-10 max-w-[860px]">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details
                className="group py-5"
                style={{ borderBottom: "1px solid var(--line-subtle)" }}
              >
                <summary
                  className="flex items-start justify-between gap-6 cursor-pointer list-none"
                  style={{ color: "var(--ink-cream)" }}
                >
                  <span
                    className="font-display"
                    style={{ fontSize: 20, letterSpacing: "-0.015em", color: "var(--ink-yellow)", lineHeight: 1.25 }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform group-open:rotate-45"
                    style={{ color: "var(--ink-dim)", fontSize: 24, lineHeight: 1, marginTop: 2 }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[720px] text-[15px] leading-[1.65]" style={{ color: "var(--ink-muted)" }}>
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          09 — SCARCITY — real, not fake
         ============================================================ */}
      <Section chapter="09 Verfügbarkeit" title="Sechs Mandate pro Jahr" date="2026 / 09" tone="elevated">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[600px]">
                Wir nehmen sechs Mandate.
                <br />
                Pro <em className="gradient-text">Jahr</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-[17px] leading-[1.55] max-w-[560px]" style={{ color: "var(--ink-muted)" }}>
                Kein Funnel-Trick, kein blinkender Countdown. Ein Operator hat genau so viel Kapazität.
                Wenn der Slot weg ist, ist er weg — und der nächste ist ein Quartal entfernt.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="glass p-8 text-center">
                <p className="font-display" style={{ fontSize: 72, color: "var(--ink-yellow)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  2
                </p>
                <p className="mt-3" style={{ color: "var(--ink-cream)", fontSize: 15, fontWeight: 510 }}>
                  Slots offen · Q3/2026
                </p>
                <p
                  className="mt-2"
                  style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em" }}
                >
                  Q4/2026 · Warteliste
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          FINAL CTA — + trust signals (Seriosität carries the close)
         ============================================================ */}
      <section className="py-[100px] md:py-[128px]" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 text-center">
          <Reveal>
            <HeadlineDisplay size="xl" className="mx-auto max-w-[900px]">
              Der Agent für deine Kategorie
              <br />
              wird <em className="gradient-text">gerade trainiert</em>.
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-7 mx-auto max-w-[600px] text-[18px] leading-[1.55]" style={{ color: "var(--ink-cream)" }}>
              Die Frage ist nur, mit wessen Marke. Starte mit dem kostenlosen Audit — du siehst in
              Minuten, wie sichtbar du heute für Claude, GPT &amp; Perplexity bist.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen KI-Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="/anfrage" className="btn-secondary">
                Brief schicken
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="mt-8 mx-auto max-w-[640px]"
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.05em",
                lineHeight: 1.7,
              }}
            >
              Festpreis · Tag 10 oder Geld zurück · DSGVO-konform · keine Kreditkarte für den Audit
              <br />
              Referenzen mit Namen: Vision · Königswege · acta · PURELEI · seit 2017 · Heidelberg
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-9 mx-auto max-w-[680px] text-[15px] leading-[1.7] italic" style={{ color: "var(--ink-muted)" }}>
              P.S. — Es gibt bei einer KI-Antwort keinen zweiten Platz. Wer dort steht, wenn dein
              Kunde fragt, gewinnt die Anfrage, bevor dein Wettbewerber merkt, dass die Suche sich
              verschoben hat. Früh dran zu sein kostet wenig. Zu spät kostet die Kategorie.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
