import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, serviceLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Ein Brief — von Alex an Gründer mit Website-Frust",
  description:
    "Eine ehrliche Rechnung, ein klarer Vorschlag. Marke + Website in 10 Werktagen, 8.900 € fester Preis. Tag 10 oder Geld zurück.",
  alternates: { canonical: "/sichtbar" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Ein Brief — von Alex an Gründer mit Website-Frust",
    description: "Marke + Website in 10 Werktagen, 8.900 € fester Preis. Tag 10 oder Geld zurück.",
    type: "article",
    url: "https://beuwy.com/go/tsl",
  },
  twitter: { card: "summary_large_image" },
};

export default function GoTslPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Brief von Alex", href: "/sichtbar" },
          ]),
          serviceLd,
        ]}
      />

      {/* Minimal top chrome */}
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
            Heidelberg · 2026
          </p>
        </Reveal>

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
            An den Gründer, der genervt ist, dass die eigene Website das Geschäft
            <br />
            <em className="font-display italic" style={{ color: "#B23A48" }}>kleiner aussehen lässt</em>{" "}
            als es ist.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p style={{ color: "rgba(26,4,4,0.6)", fontStyle: "italic", marginBottom: 40 }}>
            ~ 6 Minuten Lesezeit. Kein Video. Keine Tricks. Eine ehrliche Rechnung.
          </p>
        </Reveal>

        <div className="tsl-body" style={{ color: "rgba(26,4,4,0.92)" }}>
          <Reveal delay={140}>
            <p>Hi,</p>

            <p style={{ marginTop: 24 }}>
              wenn du das hier liest, hast du wahrscheinlich gerade einen Pitch gewonnen — und drei
              Tage später hat dir der Buyer nicht geantwortet.
            </p>

            <p>
              Du bist der Gründer. Du sitzt im Termin. Du erklärst in zwölf Minuten, warum dein
              Produkt anders ist. Es funktioniert.{" "}
              <strong>Drei Tage später schickt der Buyer den Link an seinen Mitgründer.</strong>
            </p>

            <p>
              Und genau da fällt es auseinander. Die Website zeigt nicht, was du im Termin gezeigt
              hast. Logo, Texte, das Aussehen — alles wirkt kleiner als das, was du im Gespräch
              gerade hattest. Der Mitgründer schaut zehn Sekunden drauf, geht weiter.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ marginTop: 36 }}>
              <em style={{ fontStyle: "italic", color: "#B23A48" }}>Ich will dir nichts verkaufen, was du nicht brauchst.</em>{" "}
              Ich erzähle dir, was ich genau anbiete, was es kostet, und was du dafür kriegst.
              Wenn das passt, sprechen wir. Wenn nicht — auch okay.
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
              Was die meisten machen — und warum es weh tut.
            </h2>

            <p>
              Du gehst zu einer Agentur. Die brauchen drei Monate. Sie wollen 12.000 €. Du kriegst
              drei Logo-Vorschläge, fünf Korrekturschleifen, und am Ende eine Seite, die zwar
              hübsch aussieht — aber bei der du selbst noch die Texte umschreiben musst.
            </p>

            <p>
              Oder du holst dir einen Freelancer für 3.500 €. Der kann gut Webflow. Aber das Logo
              kommt von woanders. Die Texte machst du selbst. Die Marken-Sprache erfindet jeder
              Mitarbeiter neu. Stilbruch zwischen Hero und Footer.
            </p>

            <p>
              Oder du machst es selbst, abends nach der Arbeit. Drei Monate später hast du
              irgendwas auf Squarespace stehen, mit dem du nicht zufrieden bist — und du hast
              drei Monate verloren, in denen du Geschäft hättest machen können.
            </p>

            <p style={{ marginTop: 28 }}>
              <em style={{ fontStyle: "italic", color: "#B23A48" }}>
                Mein Modell ist anders.
              </em>
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
              Was ich baue — und was es kostet.
            </h2>

            <p>
              Ich baue dir alles in einem: Logo, Farben, Schriften, fertige Website, klare Texte.
              In 10 Werktagen. Zum festen Preis: <strong>8.900 €.</strong>
            </p>

            <p>
              <strong>Logo, Farben, Schriften.</strong> 5–6 Brand-Farben, hell und dunkel.
              Schriften, die zueinander passen. Ein klarer Look, den du auch in zwei Jahren noch
              gerne benutzt.
            </p>

            <p>
              <strong>Eine fertige Website auf deiner Domain.</strong> 6–8 Sektionen, schnell, mobil,
              modern wie die Seiten, die du selbst gerne ansiehst. Bei Google findbar, auf dem
              Handy schnell.
            </p>

            <p>
              <strong>Klare deutsche Texte.</strong> Headlines, Hauptbotschaften, kleine Hinweise.
              Auf deine Stimme abgestimmt — ohne Marketing-Sprech, ohne englischen Slogan, ohne
              „kategorie-definierend".
            </p>

            <p>
              <strong>Technik im Hintergrund.</strong> Damit auch ChatGPT und Google AI deine
              Marke nennen können, wenn das wichtig wird. Heute noch ein kleiner Vorteil — wird
              in den nächsten Jahren wichtiger.
            </p>

            <p style={{ marginTop: 28 }}>
              Plus: <strong>14 Tage Begleitung nach dem Launch.</strong> Falls noch was auffällt
              oder eine kleine Änderung nötig ist — ohne Extra-Rechnung.
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

          <Reveal delay={420}>
            <div style={{ marginTop: 24, marginBottom: 32, maxWidth: 280 }}>
              <AssetSlot
                src="/assets/operator/alexander-puetter.jpg"
                alt="Alexander Pütter — Macher von beuwy"
                aspect="1/1"
                caption="Alexander Pütter · Heidelberg"
                prompt="Editorial founder portrait, square 1:1, late-30s/40s German man, three-quarter angle, calm confident expression, warm low-key studio light, cream/oxblood background, soft golden rim light. Magazine cover quality, subtle film grain, not corporate-stocky."
              />
            </div>
          </Reveal>

          <Reveal delay={460}>
            <p>
              Ich bin Alex. Mache seit 2009 Marken — zuerst für Konzerne wie Bosch, Continental,
              Michelin. Seit 2017 mit beuwy für Gründer und kleine Firmen. Aus Heidelberg.
            </p>

            <p>
              2023 wurde ich selbst Unternehmer:{" "}
              <strong>315 Wohnungen über Instagram verkauft</strong>, mitten in der Zinskrise.
              Volumen 48,4 Millionen Euro. Ø Ticket 153.842 €. Ohne externes Marketing-Team.
            </p>

            <p>
              Ich erzähle dir das, weil es zählt: Ich weiß, wie Kunden eine teure Entscheidung
              treffen — <em style={{ fontStyle: "italic", color: "#B23A48" }}>weil ich sie selbst auslöse.</em>{" "}
              Wenn ich dir sage, was an deiner Marke gerade nicht funktioniert, ist das keine Theorie.
            </p>

            <p>
              Du redest direkt mit mir. Kein Account-Manager dazwischen. Keine Übergabe an Junior-
              Mitarbeiter. Ein Brief, eine Antwort, eine Hand.
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
              Ich behaupte nicht, das Wachstum allein gemacht zu haben — Produkt, Markt und
              Verkauf gehören auch dazu. Aber hier ist, was in meinem Teil lag:
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
                note="Joint Venture mit KKR. Wir bauten Marke, vision.de und Pitch-Material — der Deal kam, nachdem die Marke stand."
                href="/work/vision"
              />
              <ProofLi
                kpi="2.240 Partner"
                client="Königswege"
                note="Von 170 in 2017. Heute Top-10 DE auf der cash-online-Hitliste 2024."
                href="/work/koenigswege"
              />
              <ProofLi
                kpi="315 Wohnungen / €48,4M"
                client="acta"
                note="Verkauft über Instagram-Funnel, mitten in der Zinskrise. Ø Ticket €153.842, ohne externes Marketing-Team."
                href="/work/acta"
              />
              <ProofLi
                kpi="1M+ Follower"
                client="PURELEI"
                note="Marke und Stimme. 20–30 Mio. Ø Umsatz pro Jahr — das System spricht weiter, wenn ich nicht im Raum bin."
                href="/work/purelei"
              />
            </ul>
          </Reveal>

          {/* GARANTIE */}
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
                Wenn die Marke und die Website nicht am 10. Werktag live auf deiner Domain stehen,
                bekommst du den vollen Preis zurück. Ohne Diskussion. Ohne Kleingedrucktes.
                <br />
                <em style={{ fontStyle: "italic", color: "rgba(247,233,154,0.7)", fontSize: 14 }}>
                  Die Garantie gilt für die Lieferung — nicht für Anfragen oder Umsatz. Das
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
              Zwei Gründe. Erstens: Ich nehme nicht viele Projekte gleichzeitig. Q3/2026 sind zwei
              Plätze frei, Q4 startet die Warteliste. Wenn ein Platz weg ist, ist er weg.
            </p>

            <p>
              Zweitens — und das ist der unbequeme: Jeden Monat, in dem deine alte Seite weiter
              läuft, lässt du Anfragen liegen. Du siehst es nicht. Sie kommen einfach nicht.
              Das ist ein stiller Verlust.
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
              Starte mit dem kostenlosen Audit. Du gibst deine Domain ein und bekommst in
              15 Sekunden eine klare Einschätzung: was funktioniert, was nicht, wo du Anfragen
              verlierst. Kein Login, kostenlos.
            </p>

            <p>
              Wenn das Ergebnis aussagt, dass deine Seite Anfragen liegen lässt, schick mir
              deinen Brief. Du bekommst die Antwort und einen Liefertermin in unter sechs Stunden —
              keine wochenlange Discovery, kein Verkaufsgespräch mit drei Folgeterminen.
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
                → Kostenlosen Audit jetzt starten
              </a>
            </p>
          </Reveal>

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
              Alexander Pütter · Macher · beuwy · Heidelberg
            </p>
          </Reveal>

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
                live auf deiner Domain, oder voller Preis zurück. Es gibt im{" "}
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
                kein Kleingedrucktes. Das Risiko trage ich, nicht du.
              </p>
              <p style={{ marginTop: 20 }}>
                <strong style={{ color: "#B23A48" }}>P.P.S. —</strong> Wenn du erst mal jemanden
                kennenlernen willst, bevor du den Brief schickst, geh auf{" "}
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
                — da steht mein Werdegang und mein Foto. Aber der Audit braucht keine Vorstellung.
                Mach ihn jetzt.
              </p>
            </div>
          </Reveal>

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
