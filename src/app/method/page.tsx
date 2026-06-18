import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "So läuft das ab — 10 Werktage, einer baut",
  description:
    "Was an welchem Tag passiert. Vier Phasen, einer baut, ein fester Preis. Ohne wochenlange Workshops, ohne 19 Stakeholder-Termine.",
  alternates: { canonical: "/method" },
  openGraph: {
    title: "So läuft das ab — 10 Werktage, einer baut",
    description: "Vier Phasen, einer baut. Fester Preis. Tag 10 live oder Geld zurück.",
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
            <span className="eyebrow"><span className="num">/</span> So läuft das ab</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              10 Werktage. <em>Fester Preis</em>.
              <br />
              <em className="gradient-text">Live auf deiner Domain.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Einer baut. Ein Preis. Ein Liefertag. <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Du machst dein Geschäft</em>,
              ich baue die neue Marke und Website. Keine wochenlangen Workshops.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Ablauf" title="Wie es läuft" date="" tone="raised">
        <div className="space-y-3">
          {[
            {
              n: "01",
              ph: "Briefing",
              wk: "Tag 1–2",
              h: "Eine Frage, zwei Tage.",
              s: "Wo liegt der Hebel für dich? Kein Workshop, keine Miro-Boards. Ich komme mit einem Vorschlag, du sagst ja oder nein.",
            },
            {
              n: "02",
              ph: "Entwurf",
              wk: "Tag 3–6",
              h: "Erster klickbarer Entwurf.",
              s: "Logo-Richtung. Farben. Schriften. Live-Seite auf einer Test-Adresse. Klickbar, mit Meinung. Du siehst Donnerstag, was Donnerstag wird — kein langes Konzept-Papier.",
            },
            {
              n: "03",
              ph: "Bauen + Launch",
              wk: "Tag 7–10",
              h: "Bauen. Live schalten. Messen.",
              s: "Auf deine Domain. Mit einfacher Statistik (Plausible), Mobil-Tempo geprüft, Google + KI sauber eingestellt.",
            },
            {
              n: "04",
              ph: "14 Tage danach",
              wk: "Tag 11+",
              h: "Ich bleibe noch da.",
              s: "Falls nach dem Launch noch was auffällt oder du eine kleine Änderung brauchst — bin ich noch 14 Tage erreichbar. Ohne Extra-Rechnung.",
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

      <Section chapter="02 Plan" title="Was an welchem Tag passiert" date="" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[920px]">
            Zehn Tage. Zehn{" "}
            <em className="font-display italic">konkrete Sachen</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Damit du jederzeit weißt, wo wir gerade stehen — und am 11. Tag genau weißt, was du
            in der Hand hast.
          </p>
        </Reveal>

        <div className="mt-12">
          {[
            { d: "Tag 01", t: "Briefing-Gespräch", x: "30 Minuten, am Telefon oder als Video. Du erzählst mir, was du machst. Ich komme mit einem ersten Vorschlag.", g: "Briefing" },
            { d: "Tag 02", t: "Positionierung", x: "Eine Seite: wer du bist, wer dich kaufen soll, warum dich. In klaren deutschen Worten, zur Freigabe.", g: "Briefing" },
            { d: "Tag 03", t: "Tonalität", x: "Wie deine Marke redet. Beispielsätze, No-Go-Wörter, ein Pitch-Satz. So, dass es auch jemand übernehmen kann, der nicht du ist.", g: "Entwurf" },
            { d: "Tag 04", t: "Logo + Farben", x: "Erster Entwurf für Logo, Farbpalette (5–6 Farben), Schriften. Hell + dunkel, alles aufeinander abgestimmt.", g: "Entwurf" },
            { d: "Tag 05", t: "Seitenaufbau", x: "Welche Abschnitte trägt deine Seite? Hero, Beweis, Angebot, FAQ — jeder mit klarem Zweck.", g: "Entwurf" },
            { d: "Tag 06", t: "Erste klickbare Seite", x: "Live auf einer Test-Adresse. Klickbar, mit ersten Inhalten. Du siehst Donnerstag, was Donnerstag wird.", g: "Entwurf" },
            { d: "Tag 07", t: "Google + KI vorbereiten", x: "Technik im Hintergrund: damit Google dich findet und ChatGPT & Co. dich nennen können.", g: "Launch" },
            { d: "Tag 08", t: "Texte feilen", x: "Headlines, Hauptbotschaften, kleine Hinweise — auf deine Stimme abgestimmt. Klares Deutsch, keine Floskeln.", g: "Launch" },
            { d: "Tag 09", t: "Statistik einrichten", x: "Plausible einbauen, damit du siehst, was auf der Seite passiert. Datenschutzkonform, ohne Cookie-Banner-Stress.", g: "Launch" },
            { d: "Tag 10", t: "Live schalten", x: "Domain umschalten. Ich bleibe am Tag bereit, falls noch etwas auffällt. 24 Stunden Hypercare.", g: "Launch" },
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

      <Section chapter="03 Tempo" title="Warum 10 Tage kein Risiko sind" date="" tone="raised">
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
            Agenturen sind langsam, weil sie jedes Mal bei null anfangen, im Team entscheiden und nach dem
            ersten Termin an Junioren weitergeben. Ich bin schnell aus den umgekehrten Gründen — nicht trotz
            Qualität, sondern wegen ihr.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            {
              t: "Keine wochenlangen Workshops",
              d: "Kein sechswöchiger, bezahlter Workshop, an dessen Ende ein PDF steht. Ich komme am Tag 1 mit einem Vorschlag — du sagst ja oder nein.",
            },
            {
              t: "Einer baut",
              d: "Keine Übergabe an Junioren, kein Account-Manager als Telefonzentrale. Der, der den ersten Call führt, baut auch die Seite.",
            },
            {
              t: "Eingespieltes System statt Nullpunkt",
              d: "Layouts, Bausteine, Technik im Hintergrund — alles vorhanden. Ich kalibriere es auf deine Marke. Ich erfinde es nicht jedes Mal neu.",
            },
            {
              t: "Du entscheidest, nicht ein Komitee",
              d: "Keine 19 Stakeholder, keine Freigabe-Schleifen über drei Wochen. Du entscheidest in Stunden, nicht in Sprints.",
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
                  { c: "Zeit bis live", v: ["10 Werktage", "8–16 Wochen", "Unklar, oft offen", "3–6 Monate Einarbeitung"] },
                  { c: "Preis", v: ["8.900 €, vorab", "Tagessatz + Mehrkosten", "Günstig, aber Risiko", "Gehalt + Nebenkosten"] },
                  { c: "Wer baut", v: ["Ich, von Anfang bis Ende", "Junior nach dem ersten Call", "Eine Person, eine Stärke", "Du musst führen"] },
                  { c: "KI + Google", v: ["Gleich richtig drin", "Selten Thema", "Selten Thema", "Du musst es selbst aufbauen"] },
                  { c: "Wer trägt das Risiko", v: ["Ich — Tag 10 oder Geld zurück", "Du", "Du", "Fehl­besetzung kostet dich"] },
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
            Eine Zahl. Ein Paket.
            <br />
            Ein <em className="font-display italic">Liefertag</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Keine Tagessätze. Keine versteckten Kosten. Du weißt vorher, was du bekommst und was du zahlst.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <PricingHero />
          </Reveal>
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
              Live am 10. Werktag, sonst voller Preis zurück. Das Risiko trage ich, nicht du.
            </span>
            <span
              className="ml-auto group-hover:text-[var(--ink-yellow)] transition-colors"
              style={{ color: "var(--ink-cream)", fontSize: 13 }}
            >
              Details lesen →
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-[100px] md:py-[128px]" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 text-center">
          <Reveal>
            <HeadlineDisplay size="lg" className="mx-auto max-w-[840px]">
              Dein Geschäft läuft.
              <br />
              <em className="gradient-text">Soll deine Seite mitlaufen?</em>
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-6 mx-auto max-w-[560px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Schauen wir uns deine Seite erst mal an — in 15 Sekunden, gratis, ohne Login.
              Du kriegst eine klare Einschätzung: was geht, was nicht. Wenn das passt, sprechen wir.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audit" className="btn-primary">
                Kostenlosen Audit starten
                <span aria-hidden>→</span>
              </Link>
              <Link href="/anfrage" className="btn-secondary">
                Oder direkt Brief schicken
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
              2 Plätze frei · Q3/2026 · Antwort in 6 Stunden
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
    "Logo · 5–6 Farben · Schriften (hell + dunkel)",
    "Website (6–8 Sektionen, deine Domain)",
    "Klare deutsche Texte ohne Marketing-Sprech",
    "Technik für Google + KI + Mobil-Tempo",
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
            DAS PAKET
          </span>
          <span
            style={{
              color: "rgba(33,6,6,0.6)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            2 Plätze frei · Q3/2026
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
          Marke + Website.
        </p>
        <p
          className="mt-3 max-w-[480px]"
          style={{
            color: "rgba(33,6,6,0.78)",
            fontSize: 15,
            lineHeight: "24px",
          }}
        >
          Logo, Farben, Schriften, Texte, Website. Alles aus einer Hand. In 10 Werktagen live auf deiner Domain.
        </p>
      </div>
      <div className="md:col-span-5">
        <p
          className="font-display tnum"
          style={{
            fontSize: 60,
            letterSpacing: "-0.025em",
            color: "var(--bg-base)",
            lineHeight: 0.95,
          }}
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
          Fester Preis · 10 Werktage · Tag 10 oder Geld zurück
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
            href="/audit"
            className="btn-secondary"
            style={{
              background: "var(--bg-base)",
              color: "var(--ink-yellow)",
              boxShadow: "none",
            }}
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
  );
}
