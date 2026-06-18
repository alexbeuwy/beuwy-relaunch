import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Mehr Anfragen über deine Website — in 10 Werktagen",
  description:
    "Eine Marke und Website, die seriös aussieht, bei Google gefunden wird und mehr Anfragen bringt. Logo, Farben, Schriften, Texte und Website — alles aus einer Hand. 8.900 € Festpreis. Tag 10 oder Geld zurück.",
  alternates: { canonical: "/sichtbar" },
  openGraph: {
    title: "Mehr Anfragen über deine Website — in 10 Werktagen",
    description:
      "Marke + Website + klare Texte, aus einer Hand. 8.900 € Festpreis. Tag 10 live oder Geld zurück.",
    type: "website",
    url: "https://beuwy.com/sichtbar",
  },
  twitter: { card: "summary_large_image" },
};

const faq: { q: string; a: string }[] = [
  {
    q: "Was kostet das genau?",
    a: "8.900 €. Fester Preis. Eine Zahl, kein Tagessatz, keine versteckten Kosten. Du weißt vorher, was du bekommst und was du zahlst.",
  },
  {
    q: "Wirklich in 10 Werktagen?",
    a: "Ja. Zwei Wochen, dann steht alles auf deiner Domain. Das geht, weil ich an einem Projekt zur Zeit arbeite und mit einem eingespielten System starte — nicht bei null.",
  },
  {
    q: "Garantierst du, dass ich mehr Kunden bekomme?",
    a: "Nein — und wer das tut, lügt. Wie viele Kunden kommen, hängt von deinem Produkt, deinem Preis und deinem Verkauf ab. Ich garantiere, dass die Marke und die Seite am Tag 10 fertig auf deiner Domain stehen — oder du bekommst dein Geld zurück.",
  },
  {
    q: "Ich habe schon eine Website. Fangen wir bei null an?",
    a: "Nein. Was gut ist, übernehmen wir. Texte, Bilder, alles was funktioniert, fließt ein. Was nicht passt, fliegt raus. Du verlierst nichts Gutes.",
  },
  {
    q: "Wer arbeitet an meinem Projekt?",
    a: "Ich. Alexander. Kein Account-Manager dazwischen, keine Übergabe an einen Junior. Du redest mit dem, der auch baut.",
  },
  {
    q: "Was ist mit ChatGPT, Google AI und so?",
    a: "Baue ich gleich richtig mit ein. Heißt: deine Seite ist so aufgestellt, dass auch KI dich nennt, wenn jemand sie fragt. Ist heute ein kleiner Vorteil — wird in den nächsten Jahren wichtiger.",
  },
  {
    q: "Können wir später selbst Sachen ändern?",
    a: "Ja. Die Seite hat einen einfachen Editor — du kannst Texte und Bilder selbst tauschen. Keine Geiselhaft beim Dienstleister, keine Stundenrechnung für jede Komma-Änderung.",
  },
];

const proof: { prefix?: string; value: number; suffix?: string; label: string; source: string }[] = [
  { prefix: "€", value: 160, suffix: "M", label: "Vision · Joint Venture mit KKR", source: "vision.de" },
  { value: 2240, suffix: "", label: "Königswege · von 170 Partnern", source: "cash-online 2024" },
  { prefix: "€", value: 48.4, suffix: "M", label: "acta · 315 Wohnungen verkauft", source: "intern, 2023–2025" },
  { prefix: "", value: 1, suffix: "M+", label: "PURELEI · Follower seit 2018", source: "Instagram public" },
];

export default function SichtbarPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Mehr Anfragen über deine Website", href: "/sichtbar" },
          ]),
          serviceLd,
          faqPageLd(faq)!,
        ]}
      />

      {/* ============================================================
          HERO — customer pain, not AI hype
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
              <span className="num">/</span> Marke + Website · 8.900 € · in 10 Werktagen
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 max-w-[1080px]">
              Eine Marke und Website,
              <br />
              die <em className="font-display italic">seriös aussieht</em> —{" "}
              <em className="gradient-text">und mehr Anfragen bringt.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Logo, Farben, Schriften, Texte und Website. Alles aus einer Hand. Du redest direkt mit mir.
              In 10 Werktagen live auf deiner Domain. Oder du bekommst dein Geld zurück.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen Audit starten
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
              8.900 € Festpreis · in 10 Werktagen live · Tag 10 oder Geld zurück
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          01 — DIAGNOSE — was wir immer wieder hören
         ============================================================ */}
      <Section chapter="01 Was wir hören" title="Was Kunden im ersten Gespräch sagen" date="" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Wenn du dich
            <br />
            <em className="font-display italic">hier wiedererkennst</em>, sind wir richtig für dich.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Das sind die Sätze, die wir aus jedem ersten Gespräch mitnehmen. In deinen Worten, nicht in
            unseren. Wenn du an einer Stelle nickst, sind wir wahrscheinlich richtig für dich.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              h: "Wenig Anfragen",
              big: "01",
              bigLabel: "Meine Seite bringt fast keine.",
              body: "Du gehst aus guten Gesprächen, der Buyer schickt den Link an seinen Partner — und dann passiert nichts mehr. Die Seite schließt das Gespräch nicht.",
            },
            {
              h: "Google",
              big: "02",
              bigLabel: "Werde bei Google kaum gefunden.",
              body: "Wer dich nicht über eine Empfehlung kennt, findet dich nicht. Du verlierst die Leute, die dich gerade jetzt brauchen würden.",
            },
            {
              h: "Aussehen",
              big: "03",
              bigLabel: "Sieht aus wie von 2012.",
              body: "Du weißt, dass deine Seite nicht zeigt, wer du heute bist. Und dass das deine Kunden auf dem Handy genauso sehen wie du.",
            },
          ].map((c) => (
            <Reveal key={c.h}>
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
                  style={{ fontSize: 44, letterSpacing: "-0.03em", color: "var(--ink-yellow)", lineHeight: 1 }}
                >
                  {c.big}
                </p>
                <p className="mt-3" style={{ color: "var(--ink-cream)", fontSize: 16, fontWeight: 510, lineHeight: 1.4 }}>
                  {c.bigLabel}
                </p>
                <p className="mt-4 flex-1" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          02 — DAS PROBLEM IST NICHT DU
         ============================================================ */}
      <Section chapter="02 Diagnose" title="Es liegt nicht an dir" date="" tone="base">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[640px]">
                Du hast nichts falsch gemacht.
                <br />
                Deine <em className="gradient-text">Seite</em> arbeitet einfach nicht für dich.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Die meisten Websites sehen aus wie ein Lebenslauf. Sie listen auf, was die Firma macht.
                  Sie überzeugen niemanden. Eine gute Seite ist anders: sie führt den Buyer
                  Schritt für Schritt zu der Antwort <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>„ja, das passt zu uns".</em>
                </p>
                <p>
                  Und die Agentur, die dir drei Monate und eine fünfstellige Summe berechnet, hat oft drei
                  Junioren, die parallel an deinem Projekt knabbern. Du wartest, korrigierst, wartest wieder.
                  Am Ende stehen drei Logos und ein Stilbruch zwischen Hero und Footer.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Mein Modell ist anders: ich arbeite an einem Projekt zur Zeit. Ich habe ein eingespieltes System,
                  das ich auf dich kalibriere. Du bekommst eine Marke und eine Seite, die zueinander passen.
                  In zwei Wochen. Zum festen Preis.
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
                  { a: "Veraltete Seite", b: "verliert Anfragen ohne dass du es merkst" },
                  { a: "Agentur-Projekt", b: "8–16 Wochen, fünfstellig, viele Schleifen" },
                  { a: "Eigener Mitarbeiter", b: "Gehalt + Nebenkosten + Monate Einarbeitung" },
                  { a: "beuwy", b: "10 Werktage, 8.900 € fester Preis, alles aus einer Hand" },
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
          03 — DER MACHER
         ============================================================ */}
      <Section id="operator" chapter="03 Vertrauen" title="Wer das baut" date="" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "20%", left: "-12%", width: 440, height: 440, opacity: 0.32 }}
        />
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[640px]">
                Ich weiß, wie Kunden eine teure Entscheidung treffen —
                <br />
                weil ich sie selbst <em className="font-display italic">auslöse</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Ich bin Alex. Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2009</em> mache ich
                  Marken — zuerst für Konzerne wie Bosch, Continental und Michelin. Seit{" "}
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2017</em> mit beuwy für Gründer
                  und kleine Firmen.
                </p>
                <p>
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2023</em> war ich selbst Unternehmer:
                  315 Wohnungen über Instagram verkauft, mitten in der Zinskrise. €48,4M Volumen,
                  ohne externes Marketing-Team.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Wenn ich dir sage, was an deiner Marke gerade nicht funktioniert, ist das keine Theorie.
                  Das ist die letzte Verkaufsrunde. Kein Account-Manager dazwischen, keine Übergabe an
                  einen Junior — ein Brief, eine Antwort, eine Hand.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 space-y-5">
            <Reveal delay={120}>
              <AssetSlot
                src="/assets/operator/alexander-puetter.jpg"
                alt="Alexander Pütter — Macher von beuwy"
                aspect="4/3"
                caption="Alexander Pütter · Heidelberg"
                prompt="Editorial founder portrait, late-30s/40s German man, three-quarter angle, calm confident expression. Warm low-key studio light, deep bordeaux/oxblood background (#1A0404), soft golden rim light. Magazine cover quality, subtle film grain. Not corporate-stocky."
                priority
              />
            </Reveal>
            <Reveal delay={180}>
              <div className="glass p-7">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: "16+", l: "Jahre Erfahrung" },
                    { v: "4×", l: "Marken neu aufgebaut" },
                    { v: "€300M+", l: "im Kundenbuch" },
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
          04 — WAS DRIN IST
         ============================================================ */}
      <Section chapter="04 Angebot" title="Was du am Tag 10 hast" date="" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            Eine fertige Marke und eine{" "}
            <em className="gradient-text">live Website</em> auf deiner Domain.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Vier Sachen sind drin. Aus einer Hand. Zum festen Preis.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            {
              n: "01",
              t: "Marke",
              meta: "Logo · 5–6 Farben · Schriften",
              d: "Ein klarer Look, hell und dunkel. So, dass alles bei dir gleich aussieht — heute und nächstes Jahr.",
            },
            {
              n: "02",
              t: "Website",
              meta: "schnell · mobil · deine Domain",
              d: "6–8 Sektionen, fertig zum Online-gehen. Modern wie die Seiten, die du selbst gerne ansiehst.",
            },
            {
              n: "03",
              t: "Texte",
              meta: "klar · deutsch · auf den Punkt",
              d: "Headlines, Hauptbotschaften, kleine Hinweise. Ohne Marketing-Sprech, ohne englischen Slogan.",
            },
            {
              n: "04",
              t: "Technik im Hintergrund",
              meta: "Google · KI · Tempo",
              d: "Bei Google findbar, auf dem Handy schnell. Plus: gleich richtig aufgestellt, damit auch ChatGPT & Co. dich nennen, wenn das wichtig wird.",
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
            Wirklich online.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          05 — BEWEIS
         ============================================================ */}
      <Section chapter="05 Beweis" title="Was wir bisher gebaut haben" date="" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "8%", right: "-10%", width: 520, height: 520, opacity: 0.5 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Echte Kunden.
            <br />
            Echte Zahlen. <em className="font-display italic">Prüfbare Quellen.</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Vier Mal eine Marke neu aufgebaut. Jede Zahl ist nachprüfbar — keine anonymen
            „10.000 zufriedenen Kunden".
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
            Alle Cases mit Vorher / Nachher
            <span aria-hidden className="group-hover:translate-x-1 transition-transform" style={{ color: "var(--ink-yellow)" }}>
              →
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ============================================================
          06 — DER PREIS
         ============================================================ */}
      <Section chapter="06 Preis" title="Was es kostet" date="" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            Eine Zahl. Ein Paket.
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
                  DAS PAKET
                </span>
                <p
                  className="font-display mt-5"
                  style={{ fontSize: 44, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 1 }}
                >
                  Marke + Website + Texte.
                </p>
                <p className="mt-3 max-w-[480px]" style={{ color: "rgba(33,6,6,0.78)", fontSize: 15, lineHeight: "24px" }}>
                  Alles aus einer Hand, live am Tag 10. Plus 14 Tage Begleitung nach dem Launch.
                </p>
              </div>
              <div className="md:col-span-5">
                <p
                  className="font-display tnum"
                  style={{ fontSize: 60, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 0.95 }}
                >
                  8.900&nbsp;€
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
                  Fester Preis · 10 Werktage
                </p>
              </div>
              <div className="md:col-span-12">
                <div
                  className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pt-6 mt-2"
                  style={{ borderTop: "1px solid rgba(33,6,6,0.18)" }}
                >
                  {[
                    "Logo · 5–6 Farben · Schriften (hell + dunkel)",
                    "Website (6–8 Sektionen, deine Domain)",
                    "Klare deutsche Texte ohne Marketing-Sprech",
                    "Technik für Google + KI + Tempo",
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
                    href="/audit"
                    className="btn-secondary"
                    style={{ background: "var(--bg-base)", color: "var(--ink-yellow)", boxShadow: "none" }}
                  >
                    Kostenlosen Audit starten
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/anfrage"
                    style={{
                      color: "rgba(33,6,6,0.78)",
                      fontSize: 13,
                      textDecoration: "underline",
                      textDecorationColor: "rgba(33,6,6,0.32)",
                      textUnderlineOffset: 4,
                    }}
                  >
                    Oder Brief schicken
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================================================
          07 — GARANTIE
         ============================================================ */}
      <Section chapter="07 Garantie" title="Das Risiko trage ich" date="" tone="base">
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
                Wenn die Marke und die Website nicht am 10. Werktag live auf deiner Domain stehen,
                bekommst du den vollen Preis zurück. Ohne Diskussion. Ohne Kleingedrucktes.
              </p>
              <p className="mt-4 max-w-[600px] text-[13px] leading-[1.6]" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}>
                Die Garantie gilt für die Lieferung — nicht für Anzahl der Anfragen oder Umsatz. Das verspricht niemand seriös.
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
          08 — FAQ
         ============================================================ */}
      <Section chapter="08 Fragen" title="Was du jetzt denkst" date="" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Die Fragen, die du
            <br />
            <em className="font-display italic">gerade im Kopf hast</em>.
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
          09 — VERFÜGBARKEIT
         ============================================================ */}
      <Section chapter="09 Verfügbarkeit" title="Wie viele Projekte gleichzeitig" date="" tone="elevated">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[600px]">
                Ich arbeite an einem Projekt zur Zeit.
                <br />
                Damit es <em className="gradient-text">schnell</em> wird und gut.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-[17px] leading-[1.55] max-w-[560px]" style={{ color: "var(--ink-muted)" }}>
                Kein Funnel-Trick, kein blinkender Countdown. Ich habe genau so viel Kapazität wie ich
                habe. Wenn ein Platz weg ist, ist er weg — und der nächste ist ein paar Wochen später.
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
                  Plätze frei · Q3/2026
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
          FINAL CTA
         ============================================================ */}
      <section className="py-[100px] md:py-[128px]" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 text-center">
          <Reveal>
            <HeadlineDisplay size="xl" className="mx-auto max-w-[900px]">
              Schauen wir uns deine Seite mal an —
              <br />
              <em className="gradient-text">in 15 Sekunden, ohne Login.</em>
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-7 mx-auto max-w-[600px] text-[18px] leading-[1.55]" style={{ color: "var(--ink-cream)" }}>
              Du gibst deine Domain ein und bekommst eine kurze, klare Einschätzung: was funktioniert,
              was nicht, wo du gerade Anfragen verlierst. Wenn das passt, sprechen wir.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="/anfrage" className="btn-secondary">
                Oder Brief schicken
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
              8.900 € fester Preis · Tag 10 oder Geld zurück · DSGVO-konform
              <br />
              Vision · Königswege · acta · PURELEI · seit 2017 · Heidelberg
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
