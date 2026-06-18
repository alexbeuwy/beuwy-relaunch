import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Marke + Website in 10 Werktagen — 8.900 € fester Preis",
  description:
    "Eine Marke und Website, die seriös aussieht und mehr Anfragen bringt. Logo, Farben, Schriften, Texte und Website aus einer Hand. 8.900 €. Tag 10 oder Geld zurück.",
  alternates: { canonical: "/sichtbar" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Marke + Website in 10 Werktagen — 8.900 €",
    description:
      "Alles aus einer Hand. Fester Preis. Tag 10 live oder Geld zurück.",
    type: "website",
    url: "https://beuwy.com/go/sichtbar",
  },
  twitter: { card: "summary_large_image" },
};

const faq: { q: string; a: string }[] = [
  {
    q: "10 Werktage — geht das wirklich?",
    a: "Ja. Ich arbeite an einem Projekt zur Zeit und starte nicht bei null — ich habe ein eingespieltes System, das ich auf dich kalibriere. Du siehst Donnerstag, was Donnerstag wird.",
  },
  {
    q: "Was kostet das genau?",
    a: "8.900 € fester Preis. Eine Zahl. Kein Tagessatz, keine Nach-Berechnung, keine versteckten Kosten.",
  },
  {
    q: "Garantierst du, dass ich mehr Kunden bekomme?",
    a: "Nein — wer das tut, lügt. Ich garantiere, dass am Tag 10 alles fertig auf deiner Domain steht. Oder du bekommst dein Geld zurück. Wie viele Kunden danach kommen, hängt von deinem Produkt, deinem Preis und deinem Verkauf ab.",
  },
  {
    q: "Was passiert nach dem Audit?",
    a: "Du gibst deine Domain ein und bekommst in 15 Sekunden eine klare Einschätzung: was funktioniert, was nicht, wo du Anfragen verlierst. Kein Login. Wenn das passt, sprechen wir.",
  },
];

export default function GoSichtbarPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Marke + Website", href: "/sichtbar" },
          ]),
          serviceLd,
          faqPageLd(faq)!,
        ]}
      />

      {/* Minimal top chrome */}
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

      {/* HERO */}
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
              Marke + Website · 10 Werktage · 8.900 €
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 mx-auto max-w-[820px]">
              Eine Marke und Website,
              <br />
              die <em className="font-display italic">seriös aussieht</em> —
              <br />
              <em className="gradient-text">und mehr Anfragen bringt.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 mx-auto max-w-[640px] text-[18px] md:text-[20px] leading-[1.55]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Logo, Farben, Schriften, Texte und Website. Alles aus einer Hand.
              In 10 Werktagen live auf deiner Domain. Oder du bekommst dein Geld zurück.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 mx-auto max-w-[720px]">
              <AssetSlot
                src="/assets/operator/alexander-puetter-vsl.mp4"
                alt="Alex erklärt das Angebot"
                type="video"
                aspect="16/9"
                caption="Alex · 2 Min. Erklärung"
                prompt="Editorial founder VSL — Alex (Heidelberg) direct-to-camera, warm key light, deep bordeaux (#1A0404) background, soft golden rim. 1080p, talking head, two-minute version: 'Hier ist, was du bekommst — und warum es 10 Tage dauert.' Cinematic, magazine-cover quality, no corporate stockiness."
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary" style={{ minWidth: 220 }}>
                Kostenlosen Audit starten
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
              15 Sekunden · keine Kreditkarte · DSGVO-konform
            </p>
          </Reveal>
        </div>
      </section>

      {/* WAS KUNDEN SAGEN */}
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
              Drei Sätze, die wir
              <br />
              <em className="font-display italic">in jedem ersten Gespräch hören</em>.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                big: "01",
                bigLabel: "Meine Seite bringt fast keine Anfragen.",
                body: "Du gehst aus guten Gesprächen, der Buyer schickt den Link an seinen Partner — und dann passiert nichts mehr.",
              },
              {
                big: "02",
                bigLabel: "Werde bei Google kaum gefunden.",
                body: "Wer dich nicht über eine Empfehlung kennt, findet dich nicht. Du verlierst die Leute, die dich gerade brauchen würden.",
              },
              {
                big: "03",
                bigLabel: "Sieht aus wie von 2012.",
                body: "Du weißt, dass deine Seite nicht zeigt, wer du heute bist. Und dass deine Kunden das auf dem Handy genauso sehen.",
              },
            ].map((s) => (
              <Reveal key={s.big}>
                <div className="glass p-7 h-full">
                  <p
                    className="font-display"
                    style={{ fontSize: 48, letterSpacing: "-0.03em", color: "var(--ink-yellow)", lineHeight: 1 }}
                  >
                    {s.big}
                  </p>
                  <p
                    className="mt-3 text-[15px] leading-[1.5]"
                    style={{ color: "var(--ink-cream)", fontWeight: 510 }}
                  >
                    {s.bigLabel}
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.55]" style={{ color: "var(--ink-muted)" }}>
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAS DU BEKOMMST */}
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
              Vier Sachen.
              <br />
              Alles <em className="gradient-text">aus einer Hand</em>.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
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
                meta: "Google · KI · Mobil-Tempo",
                d: "Bei Google findbar. Auf dem Handy schnell. Und gleich richtig aufgestellt, damit auch ChatGPT & Co. dich nennen, wenn das wichtig wird.",
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
        </div>
      </section>

      {/* BEWEIS */}
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
              Was wir <em className="font-display italic">bisher gebaut haben</em>.
              <br />
              Mit echten Zahlen.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {[
              { prefix: "€", value: 160, suffix: "M", label: "Vision · KKR Joint Venture", source: "vision.de" },
              { prefix: "", value: 2240, suffix: "", label: "Königswege · von 170 Partnern", source: "cash-online 2024" },
              { prefix: "€", value: 48.4, suffix: "M", label: "acta · 315 Wohnungen", source: "2023–2025" },
              { prefix: "", value: 1, suffix: "M+", label: "PURELEI · Follower", source: "Instagram" },
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

      {/* GARANTIE */}
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
                  Wenn die Marke und die Website nicht am 10. Werktag live auf deiner Domain stehen,
                  bekommst du den vollen Preis zurück. Ohne Diskussion. Ohne Kleingedrucktes.
                </p>
                <p
                  className="mt-3 text-[13px] leading-[1.55]"
                  style={{ color: "rgba(33,6,6,0.55)", fontFamily: "var(--font-mono)" }}
                >
                  Die Garantie gilt für die Lieferung — nicht für Anfragen oder Umsatz.
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

      {/* FAQ */}
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

      {/* FINAL CTA */}
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
              Schauen wir uns deine Seite
              <br />
              <em className="gradient-text">erst mal an</em>.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-7 mx-auto max-w-[560px] text-[17px] leading-[1.6]"
              style={{ color: "var(--ink-cream)" }}
            >
              Gratis, in 15 Sekunden. Du gibst deine Domain ein und bekommst eine klare Einschätzung:
              was funktioniert, was nicht, wo du gerade Anfragen verlierst.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary" style={{ minWidth: 240 }}>
                Kostenlosen Audit starten
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
              8.900 € fester Preis · Tag 10 oder Geld zurück · DSGVO-konform
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

      {/* STICKY MOBILE CTA */}
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
          Kostenlosen Audit starten
          <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
