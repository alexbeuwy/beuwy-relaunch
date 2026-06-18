import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Warum beuwy — ein paar klare Sätze",
  description:
    "Was ich glaube, wie ich arbeite, was du von mir bekommst. Ohne Marketing-Sprech, ohne englische Slogans.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "Warum beuwy — ein paar klare Sätze",
    description: "Was ich glaube, wie ich arbeite, was du von mir bekommst.",
    type: "article",
    url: "https://beuwy.com/manifesto",
  },
  twitter: { card: "summary_large_image" },
};

export default function ManifestoPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Warum beuwy", href: "/manifesto" }])} />
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Warum beuwy</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              Eine gute Website ist
              <br />
              <em className="gradient-text">kein Schmuck</em>. Sie arbeitet für dich.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-8 max-w-[720px] text-[19px] md:text-[22px] leading-[1.5]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Hier stehen ein paar Sätze, wie ich arbeite und was du dir davon erwarten kannst.
              Ohne Buzzwords. Ohne „kategorie-definierend". Wenn die Sätze für dich passen, sind wir
              wahrscheinlich richtig für dich.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Was ich glaube" title="Sechs einfache Sätze" date="" tone="raised">
        {[
          {
            t: "Klar schlägt clever.",
            b: "Wenn ein Satz nur zwei Leute verstehen, ist es der falsche Satz. Deine Website redet in deutlichen Worten. Dein 14-jähriger Cousin versteht jeden Punkt — und dein bester Kunde fühlt sich ernst genommen.",
          },
          {
            t: "Eine Person, eine Hand.",
            b: "Du redest die ganze Zeit mit mir. Kein Account-Manager, keine Übergabe an einen Junior. Ich frage, ich entwerfe, ich baue, ich liefere. Das hält die Qualität hoch und das Tempo schnell.",
          },
          {
            t: "Zehn Werktage.",
            b: "Ein Projekt zur Zeit. Festes Anfangs- und Endedatum. Du weißt von Tag 1 an, wann es live geht. Kein 'wir melden uns nächste Woche', kein offenes Ende.",
          },
          {
            t: "Ein fester Preis.",
            b: "8.900 €. Vorher klar. Keine Tagessätze. Keine Nach-Berechnung. Wenn der Umfang sich ändert, reden wir das vorher — nicht in der Schlussrechnung.",
          },
          {
            t: "Ich verspreche nur, was ich halten kann.",
            b: "Ich kann dir nicht versprechen, dass du nach dem Launch zehn neue Kunden bekommst — das hängt von deinem Produkt und Verkauf ab. Ich verspreche, dass am Tag 10 alles fertig auf deiner Domain steht. Wenn nicht, bekommst du dein Geld zurück.",
          },
          {
            t: "Was schon gut ist, bleibt.",
            b: "Wenn deine alte Seite Texte hat, die funktionieren, übernehmen wir sie. Wenn dein Logo gut ist, frischen wir es nur auf. Ich baue keine Neuanfänge aus Prinzip — ich baue das, was deinem Geschäft hilft.",
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
                >
                  {row.b}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </Section>

      <Section chapter="02 Versprechen" title="Was ich dir gebe" date="" tone="bright">
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
            &ldquo;Ich baue dir die Marke und die Website. Schnell.
            Zum festen Preis. Und du redest die ganze Zeit{" "}
            <em className="font-display italic">mit mir</em>, nicht mit einem Manager.&rdquo;
          </blockquote>
          <p
            className="mt-6"
            style={{ color: "var(--ink-muted)", fontSize: 14, letterSpacing: "0.02em" }}
          >
            Alexander Pütter · Heidelberg · seit 2009
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
