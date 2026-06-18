import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Bald sucht niemand mehr. Man fragt. — Wirst du empfohlen?",
  description:
    "Marke, Site und Agent-Layer für die KI-Ära. Live in 10 Werktagen, Festpreis. Tag 10 oder Geld zurück. Für Founder mit Produkt, das eine Empfehlung verdient.",
  // Paid-traffic landing — don't dilute /sichtbar's canonical or index this variant.
  alternates: { canonical: "/sichtbar" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Bald sucht niemand mehr. Man fragt.",
    description:
      "Marke · Site · Agent-Layer, live in 10 Werktagen. Festpreis, Tag 10 oder Geld zurück. Empfiehlt die KI dich — oder deinen Wettbewerber?",
    type: "website",
    url: "https://beuwy.com/go/sichtbar",
  },
  twitter: { card: "summary_large_image" },
};

/* ---------- Focused FAQ — only the call-blockers ---------- */
const faq: { q: string; a: string }[] = [
  {
    q: "10 Tage — geht da Qualität nicht flöten?",
    a: "Umgekehrt. Schnell heißt vorbereitet, nicht hektisch. Kein bezahltes Discovery-Theater, kein Komitee, keine Junior-Übergabe. Ein Senior-Operator baut direkt auf einem System, das schon existiert. Die Wochen, die Agenturen verbrauchen, sind Abstimmung — nicht Arbeit.",
  },
  {
    q: "Was kostet ein Engagement?",
    a: "Festpreis pro Slot, ab 38.000 €. Eine Zahl, kein Tagessatz, kein Scope-Creep. Wir nennen sie nach dem ersten Call — nicht nach einem sechswöchigen, bezahlten Discovery-Sprint.",
  },
  {
    q: "Garantiert ihr Rankings oder Umsatz?",
    a: "Nein — und wer das tut, lügt. Wir garantieren die Auslieferung am Tag 10 und 30 Tage Begleitung danach. Brand ist ein Faktor neben Produkt, Timing und Sales. Was wir gebaut haben, zeigen wir mit Quellen.",
  },
  {
    q: "Was passiert nach dem Audit?",
    a: "Du bekommst in 15 Sekunden einen Score über alle relevanten KI-Assistenten — Claude, ChatGPT, Gemini, Perplexity. Keine Kreditkarte, kein Login. Wenn er aussagt, dass dein Wettbewerber empfohlen wird statt dir, sprechen wir.",
  },
];

export default function GoSichtbarPage() {
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

      {/* Minimal top chrome — logo only, no nav. Single anchor link to skip. */}
      <header
        className="fixed top-0 inset-x-0 z-40"
        style={{
          background: "linear-gradient(to bottom, rgba(26,4,4,0.7), rgba(26,4,4,0))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10 h-[56px] flex items-center justify-between">
          <Link href="/" className="font-display" style={{ fontSize: 18, color: "var(--ink-yellow)", letterSpacing: "-0.02em" }}>
            beuwy
          </Link>
          <a
            href="#cta"
            className="hidden sm:inline-flex btn-primary"
            style={{ height: 34, padding: "0 14px", fontSize: 12 }}
          >
            Audit starten
            <span aria-hidden>→</span>
          </a>
        </div>
      </header>

      {/* ============================================================
          HERO — single open-loop, single CTA
         ============================================================ */}
      <section className="relative pt-[120px] md:pt-[160px] pb-[64px] overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "-8%", right: "-12%", width: 620, height: 620, opacity: 0.5 }}
        />
        <div className="mx-auto max-w-[920px] px-6 lg:px-10 text-center">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(247,233,154,0.08)",
                border: "1px solid var(--line-medium)",
                color: "var(--ink-yellow)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, background: "var(--ink-yellow)", borderRadius: 999 }} />
              Für Founder mit Produkt, das empfohlen werden sollte
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 mx-auto max-w-[820px]">
              Bald sucht niemand mehr.
              <br />
              <em className="font-display italic">Man fragt.</em>
              <br />
              <em className="gradient-text">Wirst du empfohlen?</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 mx-auto max-w-[640px] text-[18px] md:text-[20px] leading-[1.55]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              In 18 Monaten entscheidet nicht mehr eine Liste blauer Links, wer dich findet — sondern
              ein Agent, der <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>eine</em> Antwort gibt.
              Und in dieser Antwort gibt es keinen zweiten Platz.
            </p>
          </Reveal>

          {/* Founder video/portrait slot — the "person who built it" anchor */}
          <Reveal delay={240}>
            <div className="mt-12 mx-auto max-w-[720px]">
              <AssetSlot
                src="/assets/operator/alexander-puetter-vsl.mp4"
                alt="Alexander Pütter erklärt den Agent-Layer"
                type="video"
                aspect="16/9"
                caption="Alexander Pütter · Operator · 2 Min."
                prompt="Editorial founder VSL — Alexander Pütter (Heidelberg) direct-to-camera, warm key light, deep bordeaux (#1A0404) background, soft golden rim. 1080p, talking head, two-minute version: 'Hier ist, was sich verschiebt — und wie wir es lösen.' Cinematic, magazine-cover quality, no corporate stockiness."
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary" style={{ minWidth: 220 }}>
                Kostenlosen KI-Audit starten
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <p
              className="mt-6"
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
              }}
            >
              15 Sek · keine Kreditkarte · DSGVO-konform
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          THE SHIFT — three proof-backed stats, then mechanism reveal
         ============================================================ */}
      <section className="py-[64px] md:py-[96px]" style={{ background: "var(--bg-raised)" }}>
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
          <Reveal>
            <p
              className="text-center mx-auto max-w-[680px] font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.022em",
                color: "var(--ink-yellow)",
                lineHeight: 1.1,
              }}
            >
              Drei Verschiebungen, <em className="font-display italic">gleichzeitig</em>.
              <br />
              Mit Zahlen, nicht mit Meinung.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                big: "8 %",
                bigLabel: "Klickrate, sobald oben eine KI-Antwort steht — ohne KI: 15 %.",
                src: "Pew Research · 07/2025",
              },
              {
                big: "64 %",
                bigLabel: "der deutschen Unternehmen nennen sich selbst Digital-Nachzügler.",
                src: "Bitkom · 03/2025",
              },
              {
                big: "+10,3 %",
                bigLabel: "mehr Unternehmens-Insolvenzen 2025 — Höchststand seit 2014.",
                src: "Destatis · 2026",
              },
            ].map((s, i) => (
              <Reveal key={s.big} delay={i * 80}>
                <div className="glass p-7 h-full">
                  <p
                    className="font-display"
                    style={{ fontSize: 56, letterSpacing: "-0.03em", color: "var(--ink-yellow)", lineHeight: 1 }}
                  >
                    {s.big}
                  </p>
                  <p
                    className="mt-3 text-[14px] leading-[1.5]"
                    style={{ color: "var(--ink-cream)", fontWeight: 510 }}
                  >
                    {s.bigLabel}
                  </p>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Quelle · {s.src}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MECHANISM — what we actually do, three layers
         ============================================================ */}
      <section className="py-[80px] md:py-[112px]">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
          <Reveal>
            <p
              className="text-center mx-auto max-w-[820px] font-display"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.025em",
                color: "var(--ink-yellow)",
                lineHeight: 1.05,
              }}
            >
              Damit ein Agent dich empfiehlt,
              <br />
              muss er dich erst <em className="gradient-text">verstehen</em>.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-7 mx-auto max-w-[640px] text-center text-[16px] leading-[1.6]"
              style={{ color: "var(--ink-muted)" }}
            >
              Wir bauen genau das — drei Schichten, jede maschinenlesbar. Nichts davon ist Magie. Es
              ist Struktur, die die meisten noch nicht legen.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                t: "DESIGN.md",
                meta: "Tokens · Voice · Forbidden Phrases",
                d: "Eine maschinenlesbare Quelle für Identität und Sprache. Wenn ein Agent über deine Marke spricht, redet er aus dieser Datei.",
              },
              {
                n: "02",
                t: "Live-Site",
                meta: "Next.js · Vercel · deine Domain",
                d: "Schnell, indizierbar, mobil. Der Standard, den Google seit Jahren belohnt — und die Basis, auf der der Agent-Layer überhaupt greift.",
              },
              {
                n: "03",
                t: "Agent-Layer",
                meta: "schema.org · llms.txt · Cluster-Brief",
                d: "Lesbar für Claude, GPT, Perplexity, Google AI Overviews. Plus GPT-Audit deiner aktuellen Sichtbarkeit.",
              },
            ].map((row) => (
              <Reveal key={row.t}>
                <div className="card h-full">
                  <span
                    className="font-display"
                    style={{ fontSize: 26, color: "var(--ink-yellow)", letterSpacing: "-0.025em", lineHeight: 1 }}
                  >
                    {row.n}
                  </span>
                  <p
                    className="font-display mt-4"
                    style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.1 }}
                  >
                    {row.t}
                  </p>
                  <p
                    className="mt-2"
                    style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em" }}
                  >
                    {row.meta}
                  </p>
                  <p className="mt-4" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.55 }}>
                    {row.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p
              className="mt-10 mx-auto max-w-[640px] text-center text-[16px] leading-[1.6]"
              style={{ color: "var(--ink-cream)" }}
            >
              Am Tag 10 steht das alles <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>live</em> auf
              deiner Domain. Nicht in Figma. Nicht in Notion.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PROOF — counters
         ============================================================ */}
      <section className="py-[64px] md:py-[96px]" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
          <Reveal>
            <p
              className="text-center mx-auto max-w-[760px] font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.022em",
                color: "var(--ink-yellow)",
                lineHeight: 1.05,
              }}
            >
              Wir antworten mit <em className="font-display italic">Tatsachen</em>,
              <br />
              nicht mit Adjektiven.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {[
              { prefix: "€", value: 160, suffix: "M", label: "Vision · KKR JV (2023)", source: "vision.de" },
              { prefix: "", value: 2240, suffix: "", label: "Königswege Partner (vs. 170)", source: "cash-online 2024" },
              { prefix: "€", value: 48.4, suffix: "M", label: "acta · 315 Wohnungen", source: "2023–2025" },
              { prefix: "", value: 1, suffix: "M+", label: "PURELEI Follower", source: "Instagram" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="glass p-6 h-full">
                  <p className="stat-num-display">
                    <CountUp prefix={s.prefix} to={s.value} suffix={s.suffix} duration={1700} />
                  </p>
                  <p className="mt-3" style={{ color: "var(--ink-cream)", fontSize: 13, fontWeight: 510, lineHeight: 1.4 }}>
                    {s.label}
                  </p>
                  <p
                    className="mt-3"
                    style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.04em" }}
                  >
                    Quelle · {s.source}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          GUARANTEE — risk reversal
         ============================================================ */}
      <section className="py-[80px] md:py-[112px]">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
          <Reveal>
            <div
              className="rounded-[16px] p-8 md:p-12 grid md:grid-cols-12 gap-8 items-center"
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
                    letterSpacing: "0.12em",
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
                  style={{ fontSize: 40, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 1.02 }}
                >
                  Tag 10 — oder Geld zurück.
                </p>
                <p
                  className="mt-4 max-w-[560px] text-[16px] leading-[1.6]"
                  style={{ color: "rgba(33,6,6,0.82)" }}
                >
                  Stehen Marke, Site und Agent-Layer nicht am zehnten Werktag live auf deiner Domain,
                  bekommst du den vollen Festpreis zurück. Ohne Diskussion, ohne Kleingedrucktes.
                </p>
                <p
                  className="mt-3 text-[13px] leading-[1.55]"
                  style={{ color: "rgba(33,6,6,0.55)", fontFamily: "var(--font-mono)" }}
                >
                  Gilt für die Auslieferung — nicht für Rankings oder Umsatz.
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
                  <span className="font-display" style={{ fontSize: 38, lineHeight: 1, letterSpacing: "-0.03em" }}>
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
        </div>
      </section>

      {/* ============================================================
          FAQ — the call-blocker objections only
         ============================================================ */}
      <section className="py-[64px] md:py-[96px]" style={{ background: "var(--bg-raised)" }}>
        <div className="mx-auto max-w-[860px] px-6 lg:px-10">
          <Reveal>
            <p
              className="text-center font-display mx-auto max-w-[640px]"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                letterSpacing: "-0.022em",
                color: "var(--ink-yellow)",
                lineHeight: 1.1,
              }}
            >
              Was du gerade <em className="font-display italic">denkst</em>.
            </p>
          </Reveal>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 40}>
                <details
                  className="group py-5"
                  style={{ borderBottom: "1px solid var(--line-subtle)" }}
                >
                  <summary
                    className="flex items-start justify-between gap-6 cursor-pointer list-none"
                  >
                    <span
                      className="font-display"
                      style={{ fontSize: 19, letterSpacing: "-0.015em", color: "var(--ink-yellow)", lineHeight: 1.25 }}
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
                  <p
                    className="mt-4 text-[15px] leading-[1.65]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — qualifier first, application second
         ============================================================ */}
      <section id="cta" className="py-[80px] md:py-[120px]" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-[820px] px-6 lg:px-10 text-center">
          <Reveal>
            <p
              className="font-display mx-auto max-w-[760px]"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.025em",
                color: "var(--ink-yellow)",
                lineHeight: 1.02,
              }}
            >
              Der Agent für deine Kategorie
              <br />
              wird <em className="gradient-text">gerade trainiert</em>.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-7 mx-auto max-w-[560px] text-[17px] leading-[1.6]"
              style={{ color: "var(--ink-cream)" }}
            >
              Starte mit dem kostenlosen Audit — du siehst in 15 Sekunden, wie sichtbar du heute für
              Claude, GPT &amp; Perplexity bist. Wenn das passt, sprechen wir.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary" style={{ minWidth: 240 }}>
                Kostenlosen KI-Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/anfrage"
                className="text-[14px] underline-offset-4 hover:underline"
                style={{ color: "var(--ink-cream)" }}
              >
                Oder direkt Brief schicken →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="mt-9 mx-auto max-w-[560px]"
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                letterSpacing: "0.05em",
                lineHeight: 1.7,
              }}
            >
              Festpreis · Tag 10 oder Geld zurück · DSGVO-konform
              <br />
              Vision · Königswege · acta · PURELEI · seit 2017 · Heidelberg
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div
              className="mt-12 mx-auto max-w-[680px] pt-8 text-[12px] leading-[1.7]"
              style={{ borderTop: "1px solid var(--line-subtle)", color: "var(--ink-dim)" }}
            >
              <Link href="/" style={{ color: "var(--ink-dim)" }} className="hover:text-[var(--ink-yellow)]">
                beuwy · Heidelberg · Mannheim · Berlin
              </Link>
              <span aria-hidden style={{ margin: "0 10px" }}>·</span>
              <a href="mailto:hi@beuwy.com" style={{ color: "var(--ink-dim)" }} className="hover:text-[var(--ink-yellow)]">
                hi@beuwy.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          STICKY MOBILE CTA — paid traffic norm
         ============================================================ */}
      <div
        className="md:hidden fixed bottom-4 inset-x-4 z-40 rounded-full"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--line-medium)",
          boxShadow: "0 20px 50px -20px rgba(0,0,0,0.6)",
        }}
      >
        <Link
          href="/audit"
          className="btn-primary w-full justify-center"
          style={{ height: 52, fontSize: 14, borderRadius: 999 }}
        >
          Kostenlosen KI-Audit starten
          <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
