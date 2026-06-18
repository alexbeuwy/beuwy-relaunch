import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Manifest — 2026 → 2030. Agent-Ära.",
  description:
    "Die Kategorie wird in den drei Sekunden entschieden, bevor die Demo lädt. Unser Manifest für die Agent-Ära.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "Manifest — 2026 → 2030. Agent-Ära.",
    description: "Die Kategorie wird in den drei Sekunden entschieden, bevor die Demo lädt.",
    type: "article",
    url: "https://beuwy.com/manifesto",
  },
  twitter: { card: "summary_large_image" },
};

export default function ManifestoPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Manifest", href: "/manifesto" }])} />
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Manifest · 2026 → 2030</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              2030: Alle haben denselben Agent.
              <br />
              Kategorie gewinnt, wer die{" "}
              <em className="gradient-text">Sprache</em> setzt.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 max-w-[720px] text-[19px] md:text-[22px] leading-[1.5]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Was Menschen heute googeln, fragen sie morgen ihren KI-Agenten. Er empfiehlt, vergleicht, kauft.
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}> Wen der Agent empfiehlt, wird Kategorie.</em>{" "}
              Wer nicht, wird unsichtbar.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 These" title="Worum es geht" date="2026 / 01" tone="raised">
        {[
          {
            t: "Feature-Krise",
            b: "&quot;Du hast DEN revolutionären Agenten gebaut?&quot; Claude auch. OpenAI auch. Anthropic auch. Feature-Level-Differenzierung ist tot — am Tag, an dem du shippst. Dein Moat lebt eine Ebene drüber. In der Brand. In der Sprache. In der Story.",
          },
          {
            t: "Investor Pattern-Match",
            b: "Du läufst in den Pitch. Sie matchen dich gegen die letzten 50 Decks der Woche. Brand IST der erste Filter — bevor das Produkt lädt. Wenn du aussiehst wie der 329.954te GPT-Wrapper, bist du auch einer.",
          },
          {
            t: "Trust Wall",
            b: "&quot;Existiert ihr in 12 Monaten? Halluziniert es? Sind unsere Daten sicher? Warum sollen wir Enterprise-Budget auf drei Gründer in einem Notion-Doc setzen?&quot; Jeder Buyer fragt das. Die meisten AI-Startups haben keine Brand-Level-Antwort.",
          },
          {
            t: "Pricing-Erosion",
            b: "Cursor kostet 20 €/Mo. Du auch. Premium-Preis braucht Premium-Brand — sonst ist es ein Race-to-Zero. Die Seat-Price-Decke setzt deine Landing-Page, nicht dein Modell.",
          },
          {
            t: "Storytelling-Death",
            b: "&quot;The Stripe for X&quot; ist tot. Investoren wollen eine These, eine Weltanschauung, eine Founder-Story, die sie im Partner-Meeting weitererzählen. Die meisten haben ein Produkt, keine Geschichte. Wer die Kategorie besitzt, besitzt zuerst die Sprache.",
          },
        ].map((row, i) => (
          <Reveal key={row.t} delay={i * 60}>
            <article
              className="grid md:grid-cols-12 gap-6 py-9"
              style={{
                borderBottom: "1px solid var(--line-subtle)",
              }}
            >
              <div className="md:col-span-2">
                <span
                  className="font-display"
                  style={{
                    fontSize: 38,
                    letterSpacing: "-0.025em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </span>
              </div>
              <div className="md:col-span-10">
                <p
                  className="font-display"
                  style={{
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.1,
                  }}
                >
                  {row.t}
                </p>
                <p
                  className="mt-3 max-w-[760px]"
                  style={{
                    color: "var(--ink-muted)",
                    fontSize: 16,
                    lineHeight: "26px",
                  }}
                  dangerouslySetInnerHTML={{ __html: row.b }}
                />
              </div>
            </article>
          </Reveal>
        ))}
      </Section>

      <Section chapter="02 Praxis" title="Wie wir es lösen" date="2026 / 02" tone="bright">
        <Reveal>
          <blockquote
            className="font-display max-w-[1000px]"
            style={{
              fontSize: 36,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: "var(--ink-yellow)",
            }}
          >
            &ldquo;Wir pitchen keine Decks, die so tun. Wir geben Gründern ein laufendes System und
            einen Graphen, der schon{" "}
            <em className="font-display italic">klettert</em> — bevor die nächste Agentur ihr
            Notion-Doc fertig hat.&rdquo;
          </blockquote>
          <p
            className="mt-6"
            style={{ color: "var(--ink-muted)", fontSize: 14, letterSpacing: "0.02em" }}
          >
            Alexander Pütter · Founder · beuwy
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="/audit" className="btn-primary">
              Kostenlosen Audit starten
              <span aria-hidden>→</span>
            </Link>
            <Link href="/anfrage" className="btn-secondary">
              Oder Brief schicken
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
