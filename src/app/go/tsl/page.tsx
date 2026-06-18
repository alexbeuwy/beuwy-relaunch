import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Ein Brief an den Founder, dessen Marke besser ist als seine Website",
  description:
    "Wenn du das liest, hast du wahrscheinlich gerade einen Pitch gewonnen, den deine Website verloren hätte. Ein Brief von Alexander Pütter — warum das gleich teurer wird, und was wir dagegen tun.",
  alternates: { canonical: "/sichtbar" },
  // Plain text sales letter — paid + DM channel, not for organic index.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Ein Brief an den Founder, dessen Marke besser ist als seine Website",
    description:
      "Warum bald niemand mehr sucht — sondern fragt. Und was du tun kannst, bevor es deinen Wettbewerber empfiehlt.",
    type: "article",
    url: "https://beuwy.com/go/tsl",
  },
  twitter: { card: "summary_large_image" },
};

/* ============================================================
   Plain text sales letter — Schwartz stage 4 long-form copy.
   Cream band, single column, narrow measure, one CTA repeated
   inline. Borrows the *structural* moves of high-converting
   text-sales-letters (1 column, monospace meta, founder anchor,
   open loop, named source proof, single goal) without the
   ecom-coaching aesthetic that repels DACH high-ACV buyers.
   ============================================================ */
export default function GoTslPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Sichtbar in der KI-Ära", href: "/sichtbar" },
          ]),
          serviceLd,
        ]}
      />

      {/* Minimal top chrome — date, location, nothing else */}
      <div
        className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "var(--ink-cream)", borderBottom: "1px solid rgba(26,4,4,0.08)" }}
      >
        <Link href="/" className="font-display" style={{ fontSize: 18, color: "var(--bg-base)", letterSpacing: "-0.02em" }}>
          beuwy
        </Link>
        <span
          style={{
            color: "rgba(26,4,4,0.55)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Brief · von Alex
        </span>
      </div>

      <article
        className="tsl-article mx-auto px-6 lg:px-8"
        style={{
          background: "var(--ink-cream)",
          color: "var(--bg-base)",
          maxWidth: 720,
          paddingTop: 120,
          paddingBottom: 80,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: 18,
          lineHeight: 1.7,
        }}
      >
        {/* Header — date + place, like a real letter */}
        <Reveal>
          <p
            style={{
              color: "rgba(26,4,4,0.55)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            Heidelberg · Werktagsbrief · 2026
          </p>
        </Reveal>

        {/* Title — letter-like, not headline-y */}
        <Reveal delay={60}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(34px, 5vw, 52px)",
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              color: "var(--bg-base)",
              marginBottom: 28,
            }}
          >
            An den Founder, dessen Marke besser ist
            <br />
            als seine{" "}
            <em className="font-display italic" style={{ color: "#B23A48" }}>
              Website.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p style={{ color: "rgba(26,4,4,0.6)", fontStyle: "italic", marginBottom: 40 }}>
            ~ 9 Minuten Lesezeit. Kein Video. Keine Tricks. Eine ehrliche Rechnung.
          </p>
        </Reveal>

        {/* Letter body — sequential persuasion */}
        <div className="tsl-body" style={{ color: "rgba(26,4,4,0.92)" }}>
          <Reveal delay={140}>
            <p>Hi,</p>

            <p style={{ marginTop: 24 }}>
              wenn du das hier liest, hast du wahrscheinlich gerade einen Pitch gewonnen, den deine
              Website verloren hätte.
            </p>

            <p>
              Du bist der Founder. Du sitzt im Termin. Du erklärst in zwölf Minuten, warum dein
              Produkt anders ist. Es funktioniert.{" "}
              <strong>Drei Tage später schickt der Buyer den Link an seinen Mitgründer.</strong>
            </p>

            <p>
              Und genau da fällt es auseinander. Die Website zeigt nicht, was du im Termin gezeigt
              hast. Der Stilbruch zwischen Hero und Footer liest sich wie zwei verschiedene Firmen.
              Die KI, die er nebenbei fragt — Claude, ChatGPT, Perplexity —, kennt dich nicht und
              empfiehlt jemand anderen.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ marginTop: 36 }}>
              <em style={{ fontStyle: "italic", color: "#B23A48" }}>Ich will dir keinen Hype verkaufen.</em>{" "}
              Ich will dir drei Zahlen zeigen, die in den letzten 18 Monaten erschienen sind. Du
              kannst sie alle selbst nachprüfen — die Quellen stehen darunter.
            </p>
          </Reveal>

          {/* Three proof stats — letterhead style, not card grid */}
          <Reveal delay={220}>
            <div
              style={{
                marginTop: 36,
                padding: "28px 28px",
                borderLeft: "3px solid #B23A48",
                background: "rgba(178,58,72,0.04)",
              }}
            >
              <p style={{ marginTop: 0 }}>
                <strong style={{ color: "#B23A48", fontSize: 22, letterSpacing: "-0.02em" }}>
                  → 8 %.
                </strong>
                <br />
                So oft wird heute auf ein Suchergebnis geklickt, sobald oben eine KI-Antwort steht.
                Ohne KI: 15 %. <em>Halbierung.</em>{" "}
                <span style={{ color: "rgba(26,4,4,0.55)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                  Pew Research, Juli 2025
                </span>
              </p>

              <p>
                <strong style={{ color: "#B23A48", fontSize: 22, letterSpacing: "-0.02em" }}>
                  → 64 %.
                </strong>
                <br />
                So viele deutsche Unternehmen nennen sich selbst Digital-Nachzügler. Nur jedes
                fünfte nutzt KI überhaupt. Bei kleinen Firmen sind es 17 %.{" "}
                <span style={{ color: "rgba(26,4,4,0.55)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                  Bitkom + Destatis, 2024–2025
                </span>
              </p>

              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#B23A48", fontSize: 22, letterSpacing: "-0.02em" }}>
                  → −25 %.
                </strong>
                <br />
                Um so viel sinkt das klassische Suchvolumen bis Ende 2026, weil KI-Chatbots die
                Antworten direkt liefern.{" "}
                <span style={{ color: "rgba(26,4,4,0.55)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                  Gartner, Februar 2024
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p style={{ marginTop: 36 }}>
              Jede einzelne dieser Zahlen für sich ist erklärbar. Übereinander gelegt sind sie eine
              Verschiebung. <strong>Der Kanal, auf den du jahrelang gebaut hast, schrumpft strukturell.</strong>
            </p>

            <p>
              Und die Antwort, die der Agent gibt, hat — im Gegensatz zu Google — keinen zweiten
              Platz. Es gibt einen Empfohlenen. Den Rest hat der Buyer nie gesehen.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Du hast nichts falsch gemacht. Die Regeln haben sich geändert.
            </h2>

            <p>
              Die Website, die für Google gebaut wurde, ist für einen Agenten unsichtbar. Er liest
              keine schönen Bilder. Er liest Struktur, Quellen, maschinenlesbare Bedeutung — und
              davon hat eine klassische Seite nichts.
            </p>

            <p>
              Die Agentur, die dir drei Monate und einen fünfstelligen Betrag berechnet, kennt das
              Wort Agent-Layer nicht. Sie diskutiert noch die Farbpalette, während deine Kategorie
              gerade neu sortiert wird.
            </p>

            <p>
              <em style={{ fontStyle: "italic", color: "#B23A48" }}>
                Das ist keine Schuld. Das ist Timing.
              </em>{" "}
              Und Timing ist das Einzige, was man bei diesem Thema nicht nachkaufen kann.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Was wir bauen — in drei Sätzen.
            </h2>

            <p>
              Es ist kein Geheim-System. Du sollst es verstehen, bevor du eine Anfrage schickst.
            </p>

            <p>
              <strong>Eine Datei</strong> — wir nennen sie DESIGN.md. Maschinenlesbar. Wenn ein Agent
              über deine Marke spricht, redet er aus dieser Datei. Tokens, Voice, Vocabulary,
              Forbidden Phrases. Eine Quelle, kein Stilbruch.
            </p>

            <p>
              <strong>Eine Website</strong> — auf deiner Domain, schnell, indizierbar, mobil. Der
              Standard, den Google seit Jahren belohnt. Sie trägt den Rest.
            </p>

            <p>
              <strong>Ein Agent-Layer</strong> — schema.org-Struktur, llms.txt, ein Cluster-Brief.
              Lesbar für Claude, GPT, Gemini, Perplexity. Plus ein GPT-Audit deiner aktuellen
              Sichtbarkeit, damit du schwarz auf weiß siehst, wo du heute stehst.
            </p>

            <p style={{ marginTop: 28 }}>
              Am Tag 10 steht das alles live auf deiner Domain.{" "}
              <em style={{ fontStyle: "italic", color: "#B23A48" }}>Nicht in Figma. Nicht in Notion.</em>
            </p>
          </Reveal>

          <Reveal delay={380}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Wer das macht.
            </h2>
          </Reveal>

          {/* Founder anchor — letter-format, small portrait */}
          <Reveal delay={420}>
            <div style={{ marginTop: 24, marginBottom: 32, maxWidth: 280 }}>
              <AssetSlot
                src="/assets/operator/alexander-puetter.jpg"
                alt="Alexander Pütter — Founder & Operator von beuwy"
                aspect="1/1"
                caption="Alexander Pütter · Heidelberg"
                prompt="Editorial founder portrait, square 1:1, late-30s/40s German man, three-quarter angle, calm confident expression, warm low-key studio light, cream/oxblood background, soft golden rim light. Magazine cover quality, subtle film grain, not corporate-stocky."
              />
            </div>
          </Reveal>

          <Reveal delay={460}>
            <p>
              Ich bin Alex. Brand-Arbeit seit 2009, erst für Konzerne (Bosch, Continental,
              Michelin), seit 2017 mit beuwy als Operator-Studio. Heidelberg.
            </p>

            <p>
              2023 wurde ich selbst Unternehmer:{" "}
              <strong>315 Wohnungen über Instagram verkauft</strong>, mitten in der Zinskrise.
              Volumen €48,4M. Ø Ticket €153.842. Ohne externes Marketing-Team. Drei
              Geschäftspartner, owner-led, gegen die Marktstimmung.
            </p>

            <p>
              Ich erzähle dir das, weil es zählt: ich kenne Kaufentscheidungen bei hohem Ticket
              nicht aus einer Studie. <em style={{ fontStyle: "italic", color: "#B23A48" }}>
              Ich löse sie selbst aus.</em> Wenn ich dir sage, was in deiner Marke nicht funktioniert,
              ist das keine Theorie. Das ist die letzte Cohort.
            </p>

            <p>
              Du redest mit dem, der baut. Kein Account-Manager dazwischen, keine Junior-Übergabe
              nach dem Kickoff, keine 19 Stakeholder.
            </p>
          </Reveal>

          <Reveal delay={500}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Was schon im Buch steht.
            </h2>

            <p>
              Wir behaupten nicht, das Wachstum allein gemacht zu haben — Produkt, Markttiming und
              Sales sind die anderen Faktoren. Aber hier ist, was in unserem Lieferumfang lag, mit
              Quelle:
            </p>

            <ul
              style={{
                marginTop: 24,
                paddingLeft: 0,
                listStyle: "none",
                fontSize: 17,
                lineHeight: 1.65,
              }}
            >
              <ProofLi
                kpi="€160M"
                client="Vision Real Estate"
                note="KKR-Joint-Venture. Wir bauten Brand, vision.de und Investor-Narrativ — der Deal kam, nachdem die Marke stand."
                href="/work/vision"
              />
              <ProofLi
                kpi="2.240 Partner"
                client="Königswege"
                note="Von 170 in 2017. Cited Top-10 DE auf der cash-online Hitliste 2024."
                href="/work/koenigswege"
              />
              <ProofLi
                kpi="315 Wohnungen / €48,4M"
                client="acta"
                note="Verkauft über einen Instagram-Funnel, mitten in der Zinskrise. Ø Ticket €153.842, owner-led."
                href="/work/acta"
              />
              <ProofLi
                kpi="1M+ Follower"
                client="PURELEI"
                note="Brand-Sprache und Voice-System. 20–30 Mio. Ø Umsatz pro Jahr — das System spricht weiter, wenn die Founder nicht im Raum sind."
                href="/work/purelei"
              />
            </ul>
          </Reveal>

          <Reveal delay={540}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Was es kostet, und was du bekommst.
            </h2>

            <p>
              Das ganze Paket — DESIGN.md, Live-Site, Agent-Layer, plus 30 Tage Begleitung nach
              Launch — läuft als <strong>Festpreis pro Slot</strong>. Eine Zahl. Kein Tagessatz. Kein
              Scope-Creep. Du bekommst sie ≤ 6 Stunden nach Brief-Eingang — nicht nach einem
              sechswöchigen, bezahlten Discovery-Sprint.
            </p>

            <p>
              Es gibt einen Sprint-Tarif für eine einzelne Sektion (fünf Tage) und einen
              Compound-Tarif als Monats-Retainer für die Zeit nach Launch. Aber wer den Brief schickt,
              sucht meistens das System.
            </p>
          </Reveal>

          {/* Guarantee — letter style, not seal */}
          <Reveal delay={580}>
            <div
              style={{
                marginTop: 36,
                padding: "28px 28px",
                background: "var(--bg-base)",
                color: "var(--ink-yellow)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  marginTop: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(247,233,154,0.7)",
                  marginBottom: 12,
                }}
              >
                Die Garantie
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.022em",
                  color: "var(--ink-yellow)",
                  marginBottom: 12,
                  lineHeight: 1.15,
                }}
              >
                Tag 10 — oder Geld zurück.
              </p>
              <p style={{ color: "var(--ink-cream)", fontSize: 16, lineHeight: 1.6, marginBottom: 0 }}>
                Stehen Marke, Site und Agent-Layer nicht am zehnten Werktag live auf deiner Domain,
                bekommst du den vollen Festpreis zurück. Ohne Diskussion, ohne Kleingedrucktes.
                <br />
                <em style={{ fontStyle: "italic", color: "rgba(247,233,154,0.7)", fontSize: 14 }}>
                  Die Garantie gilt für die Auslieferung — nicht für Rankings oder Umsatz. Die
                  garantiert niemand seriös.
                </em>
              </p>
            </div>
          </Reveal>

          <Reveal delay={620}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Warum jetzt — und nicht in sechs Monaten.
            </h2>

            <p>
              Drei Gründe. Erstens: die Agents werden gerade trainiert. Was sie heute lesen, prägt,
              wen sie morgen empfehlen. Späte Indexierung ist nicht „nachgeholt" — sie ist verloren.
            </p>

            <p>
              Zweitens: wir nehmen <strong>sechs Mandate pro Jahr.</strong> Kein Funnel-Trick, kein
              blinkender Countdown. Ein Operator hat genau so viel Kapazität. Q3/2026 sind zwei
              Slots offen, Q4 startet die Warteliste.
            </p>

            <p>
              Drittens — und das ist der unbequemste: wer in der Flaute modernisiert, gewinnt im
              Aufschwung. Wer in der Flaute wartet, wartet allein.
            </p>
          </Reveal>

          <Reveal delay={660}>
            <h2
              className="font-display"
              style={{
                fontSize: 28,
                letterSpacing: "-0.02em",
                marginTop: 56,
                marginBottom: 20,
                lineHeight: 1.15,
                color: "var(--bg-base)",
              }}
            >
              Was als Nächstes passiert.
            </h2>

            <p>
              Starte mit dem kostenlosen Audit. In 15 Sekunden siehst du, was Claude, GPT, Gemini
              und Perplexity heute über deine Marke wissen — und was sie nicht wissen. Keine
              Kreditkarte, kein Login, DSGVO-konform.
            </p>

            <p>
              Wenn das Ergebnis aussagt, dass dein Wettbewerber an deiner Stelle empfohlen wird,
              schick uns deinen Brief. Du bekommst die Zahl und einen Liefertermin in unter sechs
              Stunden — keine Discovery-Schleife, kein Verkaufsgespräch mit drei Folgeterminen.
            </p>

            <p style={{ marginTop: 28 }}>
              <a
                href="/audit"
                style={{
                  color: "#B23A48",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  fontWeight: 510,
                  fontSize: 19,
                }}
              >
                → Kostenlosen KI-Audit jetzt starten
              </a>
            </p>
          </Reveal>

          {/* Sign-off */}
          <Reveal delay={700}>
            <p style={{ marginTop: 56 }}>Bis dahin —</p>
            <p
              className="font-display italic"
              style={{
                fontSize: 34,
                letterSpacing: "-0.02em",
                color: "#B23A48",
                marginTop: 12,
                lineHeight: 1,
              }}
            >
              Alex
            </p>
            <p
              style={{
                color: "rgba(26,4,4,0.55)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                marginTop: 8,
              }}
            >
              Alexander Pütter · Founder, Operator · beuwy · Heidelberg
            </p>
          </Reveal>

          {/* P.S. — direct response convention, double down on the seal */}
          <Reveal delay={740}>
            <div
              style={{
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid rgba(26,4,4,0.16)",
              }}
            >
              <p>
                <strong style={{ color: "#B23A48" }}>P.S. —</strong> Die Garantie ist echt. Tag 10
                live auf deiner Domain, oder voller Festpreis zurück. Es gibt im{" "}
                <Link
                  href="/system#contract"
                  style={{
                    color: "#B23A48",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Liefervertrag
                </Link>{" "}
                kein Kleingedrucktes. Die Deadline ist unser Risiko.
              </p>
              <p style={{ marginTop: 20 }}>
                <strong style={{ color: "#B23A48" }}>P.P.S. —</strong> Wenn du noch lieber jemanden
                kennenlernst, bevor du den Brief schickst, geh auf{" "}
                <Link
                  href="/system#operator"
                  style={{
                    color: "#B23A48",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  /system#operator
                </Link>{" "}
                — da steht der Track-Record mit Quellen und mein Foto in groß. Aber das Audit
                braucht keine Vorstellung. Mach es jetzt.
              </p>
            </div>
          </Reveal>

          {/* Final CTA button — single goal, one action */}
          <Reveal delay={780}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-7"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--ink-yellow)",
                  height: 56,
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 510,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                Audit jetzt starten
                <span aria-hidden>→</span>
              </Link>
              <p
                style={{
                  marginTop: 14,
                  color: "rgba(26,4,4,0.55)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                15 Sek · keine Kreditkarte · DSGVO-konform
              </p>
            </div>
          </Reveal>

          {/* Footer — letter-foot, minimal */}
          <Reveal delay={820}>
            <div
              style={{
                marginTop: 64,
                paddingTop: 24,
                borderTop: "1px solid rgba(26,4,4,0.12)",
                color: "rgba(26,4,4,0.5)",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              beuwy · Heidelberg · Mannheim · Berlin · seit 2017
              <br />
              <a href="mailto:hi@beuwy.com" style={{ color: "rgba(26,4,4,0.55)" }}>
                hi@beuwy.com
              </a>
              <span aria-hidden style={{ margin: "0 10px" }}>·</span>
              <Link href="/" style={{ color: "rgba(26,4,4,0.55)" }}>
                beuwy.com
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}

function ProofLi({
  kpi,
  client,
  note,
  href,
}: {
  kpi: string;
  client: string;
  note: string;
  href: string;
}) {
  return (
    <li
      style={{
        padding: "16px 0",
        borderBottom: "1px solid rgba(26,4,4,0.1)",
      }}
    >
      <Link
        href={href}
        style={{
          color: "var(--bg-base)",
          textDecoration: "none",
          display: "block",
        }}
      >
        <span
          style={{
            color: "#B23A48",
            fontWeight: 600,
            fontSize: 17,
            display: "inline-block",
            minWidth: 200,
          }}
        >
          {kpi}
        </span>
        <strong style={{ marginLeft: 4 }}>{client}.</strong>{" "}
        <span style={{ color: "rgba(26,4,4,0.72)" }}>{note}</span>{" "}
        <span style={{ color: "#B23A48", textDecoration: "underline", textUnderlineOffset: 3, fontSize: 14 }}>
          Case lesen →
        </span>
      </Link>
    </li>
  );
}
