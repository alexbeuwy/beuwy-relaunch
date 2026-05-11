import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Editor } from "@/components/Editor";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "System — DESIGN.md, gelesen von Agenten | beuwy",
  description:
    "Ein machine-readable Brand-System. DESIGN.md, Voice Charter, Tokens, llms.txt. Claude, ChatGPT, Cursor, v0 und Perplexity lesen dieselbe Quelle.",
};

export default function SystemPage() {
  return (
    <>
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> System · v1.0</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display mt-7 text-[44px] sm:text-[64px] md:text-[88px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Brands, die <em className="font-display italic">Agenten</em> verstehen.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Bis 2030 wird jede Seite deiner Website von einem Modell entworfen — und so auch der
              nächste Deck, die nächste E-Mail, der nächste Produkt-Screen. Andere Agenturen wählen
              noch Hochglanz-Papier. Wir liefern ein{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>DESIGN.md</em>{" "}
              mit jedem Engagement: maschinenlesbare Tokens, Voice Charter, Forbidden Phrases,
              Motion Rules.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/anfrage" className="btn-primary">
                System bauen
                <span aria-hidden>→</span>
              </Link>
              <Link href="/method" className="btn-secondary">
                Methode lesen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Editor" title="So sieht's aus" date="2026 / 01">
        <Reveal>
          <Editor height={520} interactive />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid md:grid-cols-4 gap-5">
            {[
              { n: "1", l: "Contract", v: "DESIGN.md" },
              { n: "5+", l: "Agents reading", v: "" },
              { n: "0", l: "PDF guidelines", v: "" },
              { n: "2026", l: "Spec generation", v: "not 2024" },
            ].map((s) => (
              <div
                key={s.l}
                className="p-5 rounded-[12px]"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: 38,
                    letterSpacing: "-0.025em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </p>
                <p style={{ color: "var(--ink-cream)", fontSize: 13, marginTop: 8 }}>{s.l}</p>
                {s.v && (
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      marginTop: 4,
                    }}
                  >
                    {s.v}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section chapter="02 Layer" title="Was die Agenten lesen" date="2026 / 02">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[920px]">
            Eine Quelle. <em className="font-display italic">Fünf</em> Konsumenten.
          </HeadlineDisplay>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-3 mt-10">
          {[
            { n: "Claude", what: "Brand-Tokens, Voice" },
            { n: "ChatGPT", what: "Vocabulary, Persona" },
            { n: "Cursor", what: "Frontend-Klassen" },
            { n: "v0", what: "Komponenten-Bibliothek" },
            { n: "Perplexity", what: "Schema, llms.txt" },
          ].map((a) => (
            <Reveal key={a.n}>
              <div
                className="p-5 rounded-[12px] h-full"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  {a.n}
                </p>
                <p
                  style={{
                    color: "var(--ink-muted)",
                    fontSize: 13,
                    lineHeight: "20px",
                    marginTop: 6,
                  }}
                >
                  {a.what}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
