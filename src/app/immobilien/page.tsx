import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Objektvermarktung — von einem, der selbst 315 Wohnungen verkauft hat",
  description:
    "Marke, Website und Exposé für dein nächstes Projekt. Ab 10.000 € netto. Launch-ready in 4 Wochen oder 50% zurück. Bauträger und Projektentwickler, seit 2017.",
  alternates: { canonical: "/immobilien" },
  openGraph: {
    title: "Objektvermarktung — von einem, der selbst 315 Wohnungen verkauft hat",
    description:
      "Marke, Website und Exposé. Ab 10k netto. Launch-ready in 4 Wochen oder 50% zurück.",
    type: "website",
    url: "https://beuwy.com/immobilien",
  },
  twitter: { card: "summary_large_image" },
};

const faq: { q: string; a: string }[] = [
  {
    q: "Was kostet die Vermarktung genau?",
    a: "Festpreise je nach Projektgröße: 10.000 € netto für Projekte bis 8 Wohneinheiten, 12.000 € für 8–12 WE, 20.000 € für 12+ WE (inklusive Verkaufsvideo). Alle drei beinhalten Objekt-Marke, Landingpage und Exposé. Keine Tagessätze, keine versteckten Kosten.",
  },
  {
    q: "Wirklich in 4 Wochen launch-ready?",
    a: "Ja. Ich arbeite an einem Projekt zur Zeit und starte nicht bei null — ich habe eingespielte Vorlagen für Bauträger-Material, die ich auf dein Projekt zuschneide. Du siehst in der zweiten Woche den ersten klickbaren Stand.",
  },
  {
    q: "Was passiert, wenn ihr nicht in 4 Wochen liefert?",
    a: "50% des Festpreises zurück. Das Risiko trage ich, nicht du. Voraussetzung: du lieferst die Inhalte (Grundrisse, Visualisierungen, Texte oder Briefing) wie vereinbart. Wenn du verzögerst, verschiebt sich die Deadline mit.",
  },
  {
    q: "Wir haben noch keine Visualisierungen — geht das trotzdem?",
    a: "Ja. Für das 20k-Paket sind hochwertige Verkaufs-Videos enthalten. Wenn du nur Fotos hast oder mit Renovierung arbeitest, kommen wir auch ohne Render-Studio aus — wir setzen die vorhandenen Assets in das Beste mögliche Licht.",
  },
  {
    q: "Macht ihr auch die Anzeigen-Schaltung selbst?",
    a: "Nein, nicht im Standard-Paket. Ich liefere die Anzeigen-Materialien (Bilder, Texte, Funnel-Aufbau) — die Schaltung übernimmst du oder deine Performance-Agentur. Wer keine hat, dem empfehle ich zwei Leute, mit denen wir gut zusammenarbeiten.",
  },
  {
    q: "Wer arbeitet an meinem Projekt?",
    a: "Ich. Alexander. Kein Account-Manager, keine Übergabe an einen Junior. Du redest mit dem, der auch baut. Du kennst den Stand jederzeit, weil es eine Person ist, die ihn dir sagt.",
  },
  {
    q: "Können wir nur die Website oder nur das Exposé bestellen?",
    a: "Lieber nicht. Das funktioniert nur zusammen — eine Landingpage, die anders aussieht als das Exposé, ist schlechter als beides aus einem Guss. Wenn dein Bedarf wirklich nur ein Teil ist, lass uns kurz reden.",
  },
  {
    q: "Was, wenn wir nicht sicher sind, ob wir starten?",
    a: "Mach den kostenlosen Vermarktungs-Check. Du schickst Exposé und Landingpage von einem laufenden oder geplanten Projekt rein. Du bekommst in 48 Stunden ein 15-Min-Video-Feedback: was zieht, was bremst, wo du Leads verlierst. Ohne Verkaufsdruck danach.",
  },
];

/* ---------- The three project tiers ---------- */
const tiers: {
  name: string;
  price: string;
  size: string;
  highlight?: boolean;
  what: string[];
}[] = [
  {
    name: "Light",
    price: "10.000 €",
    size: "bis 8 Wohneinheiten",
    what: [
      "Objekt-Marke (Logo, Farben, Look)",
      "Landingpage auf deiner Domain",
      "Verkaufsexposé (PDF + Web)",
      "Launch-ready in 4 Wochen",
    ],
  },
  {
    name: "Standard",
    price: "12.000 €",
    size: "8 bis 12 Wohneinheiten",
    highlight: true,
    what: [
      "Objekt-Marke (Logo, Farben, Look)",
      "Landingpage auf deiner Domain",
      "Verkaufsexposé (PDF + Web)",
      "Erweiterte Anzeigen-Materialien (Social + Print)",
      "Launch-ready in 4 Wochen",
    ],
  },
  {
    name: "Premium",
    price: "20.000 €",
    size: "über 12 Wohneinheiten",
    what: [
      "Alles aus Standard",
      "Hochwertiges Verkaufs-Video (Imagefilm)",
      "Vollständige Anzeigen-Kampagnen-Bilder",
      "Lead-Funnel-Setup (Instagram + Routing)",
      "Launch-ready in 4 Wochen",
    ],
  },
];

export default function ImmobilienPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Objektvermarktung", href: "/immobilien" },
          ]),
          serviceLd,
          faqPageLd(faq)!,
        ]}
      />

      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative pt-[140px] md:pt-[180px] pb-[72px] overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "-8%", right: "-10%", width: 580, height: 580, opacity: 0.5 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> Objektvermarktung · für Bauträger und Projektentwickler
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 max-w-[1100px]">
              Die Marketing-Agentur,
              <br />
              die <em className="font-display italic">selbst</em>{" "}
              <em className="gradient-text">315 Wohnungen</em> verkauft hat.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Marke, Landingpage und Exposé für dein nächstes Projekt.{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Ab 10.000 € netto.</em>{" "}
              Launch-ready in 4 Wochen — oder 50% zurück. Du redest direkt mit mir.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#check" className="btn-primary">
                Kostenlosen Vermarktungs-Check starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="#pakete" className="btn-secondary">
                Pakete ansehen
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
              €48,4M selbst verkauft · 315 Wohnungen · Ø Ticket €153.842
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          01 — WAS BAUTRÄGER SAGEN
         ============================================================ */}
      <Section chapter="01 Diagnose" title="Was wir aus jedem Gespräch mitnehmen" date="" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Du sitzt vor dem Projekt, das du jetzt verkaufen musst —
            <br />
            <em className="font-display italic">und kennst alle vier Sätze unten</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Wenn du an einer Stelle nickst, sind wir wahrscheinlich richtig für dich.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            {
              n: "01",
              t: "Vermarktung dauert länger als der Bau.",
              b: "Du wartest auf Visualisierungen, wartest auf Texte, wartest auf die Agentur. Die Bagger stehen schon, die Verkaufsphase verzögert sich — und jeder Monat ohne Anfragen ist verlorenes Geld.",
            },
            {
              n: "02",
              t: "Das Exposé sieht aus wie 2010.",
              b: "Du weißt, dass dein Verkaufsmaterial nicht zeigt, wie hochwertig das Projekt wirklich ist. Aber du hast keine Zeit, das selbst zu lösen — und die letzte Agentur hat es auch nicht besser hingekriegt.",
            },
            {
              n: "03",
              t: "Die Marketing-Agentur kennt unser Geschäft nicht.",
              b: "Sie sind super in Social Ads für E-Commerce, aber von Immobilien-Verkauf haben sie keine Ahnung. Sie reden über Conversion-Rate-Optimierung, du erklärst ihnen, was eine WEG-Aufteilung ist.",
            },
            {
              n: "04",
              t: "Die Lead-Qualität ist Müll.",
              b: "Zu 80% sind das Schaulustige oder Leute ohne Eigenkapital. Du bezahlst Anzeigen, deine Vertriebler bearbeiten Bullshit-Anfragen, am Ende verkaufst du trotzdem über Empfehlungen.",
            },
          ].map((c) => (
            <Reveal key={c.n}>
              <div className="card h-full">
                <span
                  className="font-display"
                  style={{ fontSize: 36, color: "var(--ink-yellow)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {c.n}
                </span>
                <p
                  className="font-display mt-4"
                  style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.2 }}
                >
                  {c.t}
                </p>
                <p className="mt-3" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
                  {c.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          02 — DER OPERATOR (acta als Held)
         ============================================================ */}
      <Section id="operator" chapter="02 Vertrauen" title="Wer das macht" date="" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "20%", left: "-12%", width: 440, height: 440, opacity: 0.32 }}
        />
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[680px]">
                Ich weiß, wie ein Wohnungskäufer eine Entscheidung trifft —
                <br />
                weil ich sie selbst <em className="font-display italic">315 Mal ausgelöst</em> habe.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Ich bin Alex. Seit <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2009</em> baue ich
                  Marken — zuerst für Konzerne wie Bosch, Continental und Michelin, seit 2017 für Gründer und kleine Firmen.
                </p>
                <p>
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>2023</em> habe ich aufgehört, nur darüber
                  zu reden. Ich bin selbst Bauträger geworden und habe mit{" "}
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>acta</em> 315 Wohnungen über Instagram verkauft.
                  €48,4M Volumen. Ø Ticket €153.842. Mitten in der Zinskrise. Ohne externes Marketing-Team.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Wenn ich dir sage, was in deinem Exposé nicht funktioniert, ist das keine Theorie. Das ist die letzte
                  Verkaufsrunde, in der ich genau das Material in der Hand hatte. Ich kenne nicht nur die Marketing-Mechanik —
                  ich kenne den Käufer.
                </p>
                <p>
                  Vor 2023 habe ich für{" "}
                  <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Vision Real Estate</em> gearbeitet —
                  die Marke und Website, mit der das Unternehmen sein €160M-Joint-Venture mit KKR an den Tisch gebracht hat.
                  Immobilie ist nicht mein Nebenfach. Es ist der Hauptbeleg meines Portfolios.
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
                    { v: "315", l: "Wohnungen selbst verkauft" },
                    { v: "€48,4M", l: "Verkaufsvolumen acta" },
                    { v: "€160M", l: "Vision-Marke gebaut" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p
                        className="font-display"
                        style={{ color: "var(--ink-yellow)", fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1 }}
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
          03 — DIE PAKETE (3 Tier)
         ============================================================ */}
      <Section id="pakete" chapter="03 Pakete" title="Drei Pakete nach Projektgröße" date="" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Drei Festpreise.
            <br />
            <em className="font-display italic">Je nach Projektgröße</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[680px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Alle drei beinhalten Objekt-Marke, Landingpage und Verkaufsexposé.
            Die Zahl ist netto. Lieferung in 4 Wochen oder 50% zurück.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <Reveal key={tier.name}>
              <div
                className="rounded-[14px] p-7 h-full flex flex-col"
                style={{
                  background: tier.highlight ? "var(--ink-yellow)" : "var(--bg-raised)",
                  color: tier.highlight ? "var(--bg-base)" : "var(--ink-cream)",
                  border: "1px solid " + (tier.highlight ? "var(--ink-yellow)" : "var(--line-subtle)"),
                  boxShadow: tier.highlight
                    ? "0 26px 60px -32px rgba(247,233,154,0.35)"
                    : "none",
                }}
              >
                <div className="flex items-baseline justify-between">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 26,
                      letterSpacing: "-0.02em",
                      color: tier.highlight ? "var(--bg-base)" : "var(--ink-yellow)",
                    }}
                  >
                    {tier.name}
                  </p>
                  {tier.highlight && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        background: "var(--bg-base)",
                        color: "var(--ink-yellow)",
                        padding: "4px 9px",
                        borderRadius: 999,
                        textTransform: "uppercase",
                      }}
                    >
                      Häufigste Wahl
                    </span>
                  )}
                </div>
                <p
                  className="font-display tnum mt-3"
                  style={{
                    fontSize: 44,
                    letterSpacing: "-0.025em",
                    color: tier.highlight ? "var(--bg-base)" : "var(--ink-yellow)",
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </p>
                <p
                  className="mt-2"
                  style={{
                    color: tier.highlight ? "rgba(33,6,6,0.6)" : "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  netto · {tier.size}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.what.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-3"
                      style={{
                        color: tier.highlight ? "var(--bg-base)" : "var(--ink-cream)",
                        fontSize: 14,
                        lineHeight: "22px",
                      }}
                    >
                      <span
                        className="mt-[7px] shrink-0"
                        style={{
                          width: 5,
                          height: 5,
                          background: tier.highlight ? "var(--bg-base)" : "var(--ink-yellow)",
                          borderRadius: 1,
                        }}
                      />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#check"
                  className={tier.highlight ? "btn-secondary mt-7" : "btn-primary mt-7"}
                  style={
                    tier.highlight
                      ? { background: "var(--bg-base)", color: "var(--ink-yellow)", boxShadow: "none" }
                      : undefined
                  }
                >
                  Anfragen
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="mt-10 text-[14px] leading-[1.6] max-w-[680px]" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }}>
            Größeres Projekt (40+ Einheiten, mehrere Bauphasen, internationales Marketing)? Schick uns einen Brief, wir nennen
            dir eine konkrete Zahl in 6 Stunden.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          04 — GARANTIE
         ============================================================ */}
      <Section chapter="04 Garantie" title="Das Risiko trage ich" date="" tone="raised">
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
                Liefertermin-Garantie
              </span>
              <p
                className="font-display mt-5"
                style={{ fontSize: 40, letterSpacing: "-0.025em", color: "var(--bg-base)", lineHeight: 1.02 }}
              >
                Launch-ready in 4 Wochen —
                <br />
                oder 50% zurück.
              </p>
              <p
                className="mt-4 max-w-[560px] text-[16px] leading-[1.6]"
                style={{ color: "rgba(33,6,6,0.82)" }}
              >
                Wenn die Marke, die Landingpage und das Exposé nicht nach 4 Wochen launch-ready stehen,
                bekommst du 50% des Festpreises zurück. Voraussetzung: du lieferst die Inhalte
                (Grundrisse, Visualisierungen, Briefing) wie vereinbart.
              </p>
              <p
                className="mt-3 text-[13px] leading-[1.55]"
                style={{ color: "rgba(33,6,6,0.55)", fontFamily: "var(--font-mono)" }}
              >
                Die Garantie gilt für die Lieferung — nicht für Anzahl der Verkäufe.
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
                  4 Wo.
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
                  live oder 50%
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          05 — BEWEIS / CASES
         ============================================================ */}
      <Section chapter="05 Beweis" title="Cases mit Quellen" date="" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Drei Projekte. Drei Größen.
            <br />
            <em className="font-display italic">Jede Zahl mit Quelle</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[17px] leading-[1.55] max-w-[680px]" style={{ color: "var(--ink-muted)" }}>
            Eine Vermarktung allein macht kein Projekt. Lage, Preis, Bauqualität, Vertriebsteam gehören auch dazu.
            Wir behaupten nicht, das alleine gemacht zu haben — wir zeigen, was in unserem Teil lag.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12">
          {[
            { prefix: "€", value: 48.4, suffix: "M", label: "acta · 315 Wohnungen über Instagram, ohne externes Marketing-Team", source: "intern, 2023–2025" },
            { prefix: "€", value: 160, suffix: "M", label: "Vision Real Estate · Joint Venture mit KKR", source: "öffentlich, vision.de" },
            { prefix: "", value: 2240, suffix: "", label: "Königswege · Partner-Skalierung, Top-10 DE Finance", source: "cash-online 2024" },
          ].map((s, i) => (
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

        <Reveal delay={300}>
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
          06 — FAQ
         ============================================================ */}
      <Section chapter="06 Fragen" title="Was du jetzt denkst" date="" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Die Fragen, die jeder Bauträger
            <br />
            an dieser Stelle <em className="font-display italic">stellt</em>.
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
          07 — VERMARKTUNGS-CHECK (Lead-Magnet)
         ============================================================ */}
      <Section id="check" chapter="07 Einstieg" title="Erst mal schauen, was geht" date="" tone="elevated">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[640px]">
                Du musst nicht direkt buchen.
                <br />
                Schick mir ein <em className="gradient-text">Projekt</em> — ich schaue rein.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Schick mir das Exposé und die Landingpage von einem laufenden oder geplanten Projekt.
                  Du bekommst in <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>48 Stunden</em> ein
                  15-Minuten-Video von mir: was zieht, was bremst, wo du Leads verlierst.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Gratis. Kein Verkaufsdruck danach. Wenn du nach dem Video sagst &bdquo;passt nicht&ldquo;, schreibst du
                  mir das, und wir lassen es. Wenn es zieht, sprechen wir über dein nächstes Projekt.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/anfrage?quelle=immobilien-check" className="btn-primary">
                  Vermarktungs-Check anfragen
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/anfrage?quelle=immobilien" className="btn-secondary">
                  Oder direkt Projekt besprechen
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="glass p-7 md:p-8">
                <p className="eyebrow mb-5">
                  <span className="num">/</span> Was ich von dir brauche
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Exposé (PDF reicht)",
                    "Link zur aktuellen Landingpage",
                    "Ein, zwei Sätze zum Projekt (Lage, Einheiten, Stand der Vermarktung)",
                    "Deine E-Mail für die Antwort",
                  ].map((line, i, arr) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 py-3"
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid var(--line-subtle)",
                        color: "var(--ink-cream)",
                        fontSize: 15,
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--ink-yellow)",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.06em",
                          minWidth: 22,
                          marginTop: 3,
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
          </div>
        </div>
      </Section>

      {/* ============================================================
          08 — VERFÜGBARKEIT
         ============================================================ */}
      <Section chapter="08 Verfügbarkeit" title="Wie viele Projekte gleichzeitig" date="" tone="base">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg" className="max-w-[600px]">
                Ich arbeite an einem Projekt zur Zeit.
                <br />
                Damit es <em className="gradient-text">schnell</em> geht und gut wird.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-[17px] leading-[1.55] max-w-[560px]" style={{ color: "var(--ink-muted)" }}>
                Kein blinkender Countdown, kein Verkaufstrick. Ich habe genau so viel Kapazität, wie ich habe. Wenn
                ein Platz weg ist, ist er weg.
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
                  Projekte frei · Q3/2026
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
              Dein nächstes Projekt
              <br />
              <em className="gradient-text">verkauft sich schneller</em>, wenn das Marketing steht.
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-7 mx-auto max-w-[600px] text-[18px] leading-[1.55]" style={{ color: "var(--ink-cream)" }}>
              Schick mir Exposé und Landingpage von einem laufenden Projekt. In 48 Stunden bekommst du ein
              15-Min-Video von mir, was geht und was nicht. Gratis. Kein Verkaufsdruck.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/anfrage?quelle=immobilien-check" className="btn-primary">
                Vermarktungs-Check anfragen
                <span aria-hidden>→</span>
              </Link>
              <Link href="/anfrage?quelle=immobilien" className="btn-secondary">
                Oder Projekt besprechen →
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
              Ab 10.000 € netto · Launch-ready in 4 Wochen oder 50% zurück
              <br />
              acta · Vision · Königswege · seit 2017 · Heidelberg
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
