import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Editor } from "@/components/Editor";
import { EmailMockup } from "@/components/EmailMockup";
import { LogoWall, Testimonials } from "@/components/LogoWall";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          01 — HOOK
         ============================================================ */}
      <section className="relative pt-[112px] md:pt-[160px] pb-[72px] md:pb-[120px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <span className="chip">
                <span className="dot" />
                <span>Q3/2026 · 2 Slots offen</span>
              </span>
              <span
                style={{
                  color: "var(--ink-dim)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Operator-led Studio · seit 2017
              </span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <p
              className="max-w-[820px] text-[17px] md:text-[19px] leading-[1.45] mb-6"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Weißt du, warum manche Marken von ChatGPT, Claude &amp; Co. empfohlen werden — und
              manche frühere Marktführer{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>unsichtbar</em>{" "}
              werden?
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1
              className="h-display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              2026: Dein nächster Kunde fragt nicht{" "}
              <em className="font-display italic">Google</em>.
              <br />
              Er fragt <em className="font-display italic">Claude</em>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[660px] text-[17px] md:text-[19px] leading-[1.55]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Empfehlungen, SEO, Paid — alles trägt weiter. Aber die Antwort, die ein Agent gibt,
              wird zur ersten Filterstufe. Wir bauen die Marke, die ein Agent{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>versteht</em>.
              Brand · Site · Agent-Layer — ein System, in{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>10 Tagen</em> live.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/anfrage" className="btn-primary">
                Brief schicken
                <span aria-hidden>→</span>
              </Link>
              <Link href="#mechanismus" className="btn-secondary">
                Wie funktioniert das
                <span aria-hidden>↓</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p
              className="mt-12 text-[12px]"
              style={{ color: "var(--ink-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              €300M+ Client Outcomes · 4× Kategorie-Sieger · Ø Reply &lt; 6h
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          02 — PAIN AGITATE (Diagnose-Tabelle)
         ============================================================ */}
      <Section id="pain" chapter="01 Pain" title="Wo es weh tut" date="2026 / 01">
        <Reveal>
          <p
            className="mb-5 max-w-[680px] text-[16px] leading-[1.5]"
            style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
          >
            Frag dich ehrlich: Wie viele deiner letzten zehn Kunden kamen über{" "}
            <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Zufall</em>?
          </p>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="max-w-[1100px]">
            Dein bester Monat: <em className="font-display italic">eine</em> Empfehlung.
            <br />
            Dein Q3 stirbt, weil <em className="font-display italic">zwei</em> ausblieben.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            85 % deiner Pipeline lebt von Zufall. Den Rest hält ein CRM zusammen, das kein Agent
            lesen kann. Eine Diagnose mit fünf Punkten —{" "}
            <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>ehrlich</em>:
          </p>
        </Reveal>

        <div
          className="mt-10 rounded-[12px] overflow-hidden"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--line-subtle)",
          }}
        >
          {[
            {
              k: "Pipeline-Herkunft",
              now: "85 % Empfehlung + Zufall",
              after: "Inbound aus Suche + Agent + Voice",
            },
            {
              k: "Sichtbarkeit in LLMs",
              now: "Du tauchst nicht auf",
              after: "Cited in Top-3 für deine Kategorie",
            },
            {
              k: "Brand-Quelle",
              now: "Figma-Datei · 14 Versionen",
              after: "DESIGN.md · machine-readable",
            },
            {
              k: "Pricing-Druck",
              now: "Race-to-zero gegen GPT-Wrapper",
              after: "Premium-Preis getragen von Premium-Brand",
            },
            {
              k: "Founder-Story",
              now: "&quot;The Stripe for X&quot;",
              after: "Eine These, die im Partner-Meeting reisst",
            },
          ].map((row, i) => (
            <Reveal key={row.k} delay={i * 60}>
              <div
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--line-subtle)",
                }}
              >
                <div className="col-span-12 md:col-span-4">
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="mt-1"
                    style={{
                      color: "var(--ink-cream)",
                      fontSize: 15,
                      fontWeight: 510,
                    }}
                  >
                    {row.k}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span
                    style={{
                      color: "var(--accent-red,#FF5A67)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                    }}
                  >
                    JETZT
                  </span>
                  <p
                    className="mt-1"
                    style={{ color: "var(--ink-muted)", fontSize: 14 }}
                    dangerouslySetInnerHTML={{ __html: row.now }}
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span
                    style={{
                      color: "var(--ink-yellow)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                    }}
                  >
                    NACH BEUWY
                  </span>
                  <p
                    className="mt-1"
                    style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
                  >
                    {row.after}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          03 — DREAM STATE
         ============================================================ */}
      <Section
        id="dream"
        chapter="02 Dream"
        title="So sieht es aus, wenn es funktioniert"
        date="2026 / 02"
      >
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <Reveal>
              <EmailMockup />
            </Reveal>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <Reveal delay={80}>
              <HeadlineDisplay size="lg">
                Diese Mail landet <em className="font-display italic">jede Woche</em> in deinem
                Postfach.
                <br />
                Nicht in <em className="font-display italic">seinem</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={160}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[460px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Wenn deine Marke <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>maschinen-lesbar</em> ist, antwortet ein
                Agent auf die Frage &quot;Wer macht das in DACH?&quot; mit deinem Namen. Vor dem Wettbewerber.
                Vor der Demo. Vor dem Pitch.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          04 — MECHANISM
         ============================================================ */}
      <Section
        id="mechanismus"
        chapter="03 Mechanism"
        title="Wie wir das bauen"
        date="2026 / 03"
      >
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[920px]">
            <em className="font-display italic">Ein</em> System.{" "}
            <em className="font-display italic">Drei</em> Layer.{" "}
            <em className="font-display italic">Zehn</em> Tage.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            Keine 6-Wochen-Discovery. Keine 19 Stakeholder-Interviews. Keine Folie 23. Ein Operator,
            ein Festpreis, drei Auslieferungen — live, nicht in Figma.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <MechanismFlow />
        </Reveal>
      </Section>

      {/* ============================================================
          05 — PROOF STACK
         ============================================================ */}
      <Section
        id="proof"
        chapter="04 Proof"
        title="Was im Maschinenraum lief"
        date="2026 / 04"
      >
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1100px]">
            Wir bauten die <em className="font-display italic">Brand-Systeme</em>, die
            <br />
            den <em className="font-display italic">Skalierungsweg</em> trugen.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={60}>
          <p
            className="mt-6 max-w-[700px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Brand-Arbeit ist ein Faktor. Produkt, Markttiming, Sales — auch. Wir behaupten nicht,
            den Wachstum allein gemacht zu haben. Wir zeigen, was in unserem Lieferumfang lag.
          </p>
        </Reveal>

        {/* Counter wall — replaces 3 generic cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {[
            { n: "€160M", l: "KKR Joint Venture (Vision · 2023)", src: "öffentlich, vision.de" },
            { n: "2.240", l: "Königswege Partner (vs. 170 in 2017)", src: "cash-online 2024" },
            { n: "315", l: "Wohnungen (acta · 2023–2025)", src: "intern, Ø Ticket €153.842" },
            { n: "1M+", l: "PURELEI Follower (seit 2018)", src: "Instagram public" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div
                className="p-6 h-full rounded-[12px]"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: 48,
                    letterSpacing: "-0.025em",
                    color: "var(--ink-yellow)",
                    lineHeight: 0.95,
                  }}
                >
                  {s.n}
                </p>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--ink-cream)",
                    fontSize: 14,
                    fontWeight: 510,
                    lineHeight: 1.4,
                  }}
                >
                  {s.l}
                </p>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                  }}
                >
                  Quelle · {s.src}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Inline cases */}
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <Reveal delay={80}>
            <CaseCard
              client="Vision Real Estate"
              years="2019 → 2023"
              kpi="€160M"
              kpiLabel="KKR Joint Venture"
              note="Wir bauten Brand-Architektur, vision.de und Investor-Narrativ. Drei Gründer wurden 70 Köpfe — der KKR-Deal kam, nachdem die Brand stand."
              href="/work#vision"
            />
          </Reveal>
          <Reveal delay={160}>
            <CaseCard
              client="Königswege"
              years="2017 → live"
              kpi="170 → 2.240"
              kpiLabel="Partner · cited Top-10 DE"
              note="Relaunch 2020 trug die Skalierung. cash-online Hitliste 2024. Wir bauten Brand, Web-System, Partner-Materialien."
              href="/work#koenigswege"
            />
          </Reveal>
          <Reveal delay={240}>
            <CaseCard
              client="acta"
              years="2023 → 2025"
              kpi="€48,4M"
              kpiLabel="Volumen über Instagram-Funnel"
              note="Brand-Identität, Paid-Social-System, Funnel. Owner-led, ohne Outside Marketing Team. Ø Ticket €153.842."
              href="/work#acta"
            />
          </Reveal>
        </div>

        {/* Logo wall — 10 brands as typographic representation */}
        <Reveal delay={320}>
          <div className="mt-16">
            <LogoWall />
          </div>
        </Reveal>

        {/* External testimonials — 3 customer quotes */}
        <Reveal delay={400}>
          <div className="mt-12">
            <p
              className="eyebrow mb-5"
            >
              <span className="num">/</span> Stimmen aus dem Maschinenraum
            </p>
            <Testimonials />
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          06 — AUTHORITY
         ============================================================ */}
      <Section
        id="authority"
        chapter="05 Authority"
        title="Kein Account Manager. Kein Pitch-Deck-Theater."
        date="2026 / 05"
      >
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <p
                className="mb-5 max-w-[600px] text-[16px] leading-[1.5]"
                style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
              >
                Hand aufs Herz: Wann hast du das letzte Mal mit dem geredet, der dein Brand-Projekt{" "}
                <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>
                  selbst gebaut hat
                </em>{" "}
                — und nicht mit dem Account-Manager dazwischen?
              </p>
            </Reveal>
            <Reveal delay={60}>
              <HeadlineDisplay size="lg">
                Du sprichst mit dem, der es{" "}
                <em className="font-display italic">baut</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.6] max-w-[600px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Alexander Pütter. Seit 2009 in Werbeagenturen — Bosch-Gruppe Rebranding,
                Continental, Michelin. 2017 beuwy als Operator-Studio. 2023 selbst Unternehmer:
                acta gegründet, in der Spitze 15 Mitarbeitende, 315 Wohnungen verkauft —{" "}
                <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>
                  über Instagram-Werbung, mitten in der Zinskrise
                </em>
                . Wir kennen Kaufentscheidungen, weil wir sie selbst auslösen.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <ul className="mt-8 space-y-3 max-w-[560px]">
                {[
                  "13 Jahre Brand-Arbeit für Konzerne und Mittelstand",
                  "Selbst skaliert: 50 Mio. € Volumen mit 10 Köpfen",
                  "Heute: AI-, Agent-, Fintech-, Proptech-, Longevity-Briefs",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[15px] leading-[1.5]"
                    style={{ color: "var(--ink-cream)" }}
                  >
                    <span
                      className="mt-[7px] shrink-0"
                      style={{
                        width: 6,
                        height: 6,
                        background: "var(--ink-yellow)",
                        borderRadius: 1,
                      }}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div
                className="rounded-[12px] p-7"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--ink-yellow)",
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    AP
                  </div>
                  <div>
                    <p
                      style={{
                        color: "var(--ink-cream)",
                        fontSize: 14,
                        fontWeight: 510,
                      }}
                    >
                      Alexander Pütter
                    </p>
                    <p style={{ color: "var(--ink-dim)", fontSize: 12 }}>
                      Founder · Operator seit 2009
                    </p>
                  </div>
                </div>
                <p
                  className="font-display"
                  style={{
                    fontSize: 22,
                    lineHeight: "1.25",
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  &ldquo;Wir pitchen keine Decks, die so tun. Wir geben Gründern ein laufendes
                  System und einen Graphen, der schon{" "}
                  <em className="font-display italic">klettert</em> — bevor die nächste Agentur
                  ihr Notion-Doc fertig hat.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          07 — OFFER
         ============================================================ */}
      <Section
        id="offer"
        chapter="06 Offer"
        title="Was du in 10 Tagen bekommst"
        date="2026 / 06"
      >
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Ein Festpreis. Ein Operator. Drei Auslieferungen —{" "}
            <em className="font-display italic">live, nicht in Figma</em>.
          </HeadlineDisplay>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 mt-10 items-start">
          <div className="md:col-span-7">
            <Reveal delay={80}>
              <Editor height={420} />
            </Reveal>
          </div>
          <div className="md:col-span-5 space-y-5">
            {[
              {
                t: "DESIGN.md",
                d: "Brand-Tokens, Voice, Vocabulary, Forbidden Phrases. Maschinenlesbar.",
              },
              { t: "Live-Site", d: "Next.js, Vercel, deine Domain. Diese 12 Sektionen — auf dich angepasst." },
              {
                t: "Agent-Layer",
                d: "schema.org · llms.txt · Cluster-Brief · GPT-Audit deiner aktuellen Sichtbarkeit.",
              },
              {
                t: "30 Tage Compounding",
                d: "Nach Launch: Experimente, Cohort-Receipts, ein Operator auf Standby.",
              },
            ].map((row, i) => (
              <Reveal key={row.t} delay={120 + i * 60}>
                <div
                  className="flex items-start gap-4 pb-5"
                  style={{
                    borderBottom: "1px solid var(--line-subtle)",
                  }}
                >
                  <span
                    className="font-display shrink-0"
                    style={{
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      width: 28,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p
                      style={{
                        color: "var(--ink-cream)",
                        fontSize: 16,
                        fontWeight: 510,
                        marginBottom: 4,
                      }}
                    >
                      {row.t}
                    </p>
                    <p style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
                      {row.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          08 — SCARCITY
         ============================================================ */}
      <Section
        id="scarcity"
        chapter="07 Scarcity"
        title="Verfügbarkeit"
        date="2026 / 07"
        divider={true}
      >
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg">
                <em className="font-display italic">6</em> Projekte pro Jahr.{" "}
                <em className="font-display italic">2</em> Slots offen für Q3/2026.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[560px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Q4/2026 startet die Warteliste. Wir nehmen bewusst wenige — weil ein Operator nicht
                skaliert, indem er 17 Briefs gleichzeitig hält.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link href="/anfrage" className="btn-primary mt-8">
                Slot sichern
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <SlotGrid />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          09 — DISQUALIFIER
         ============================================================ */}
      <Section
        id="disqualifier"
        chapter="08 Disqualifier"
        title="Was wir nicht machen"
        date="2026 / 08"
      >
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Spar dir die Zeit, wenn du <em className="font-display italic">Folgendes</em>{" "}
            erwartest.
          </HeadlineDisplay>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mt-10 max-w-[920px]">
          {[
            {
              h: "Logo-Varianten in einem Pitch",
              s: "Wir bauen Systeme — nicht Mockups. Drei Logos präsentieren ist Schauspiel, kein Handwerk. Wenn du das willst, sind wir die falsche Adresse.",
            },
            {
              h: "Stundensätze, Discovery-Phasen, AGB-Anhänge",
              s: "Festpreis. Festumfang. Fester Liefertag. Procurement-Pingpong, 19 Stakeholder-Interviews, sechs-Wochen-Discovery — machen wir nicht.",
            },
          ].map((item, i) => (
            <Reveal key={item.h} delay={80 + i * 80}>
              <div
                className="card h-full"
                style={{
                  background: "transparent",
                  border: "1px solid var(--line-subtle)",
                  padding: "28px",
                }}
              >
                <span
                  style={{
                    color: "var(--accent-red,#FF5A67)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                  }}
                >
                  ✕ NICHT
                </span>
                <p
                  className="font-display mt-3"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                    lineHeight: 1.2,
                  }}
                >
                  {item.h}
                </p>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--ink-muted)",
                    fontSize: 14,
                    lineHeight: "22px",
                  }}
                >
                  {item.s}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          10 — MULTIPLE CTAs
         ============================================================ */}
      <Section
        id="paths"
        chapter="09 Paths"
        title="Wo willst du starten"
        date="2026 / 09"
      >
        <Reveal>
          <HeadlineDisplay size="md" className="max-w-[840px]">
            Drei Türen. Such dir <em className="font-display italic">eine</em> aus.
          </HeadlineDisplay>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <Reveal delay={80}>
            <PathCard
              tag="60 Sek · kostenlos · live"
              title="GPT-Audit starten"
              body="Was sagt Claude gerade über deine Marke? Domain rein, Score + Schwächen + Sofort-Fixes raus."
              cta="Audit starten"
              href="/audit"
            />
          </Reveal>
          <Reveal delay={160}>
            <PathCard
              tag="3 Min · async"
              title="Brief schicken"
              body="Drei Felder. Ein Submit. Wir antworten in &lt; 6h mit Termin oder Ja/Nein-Match."
              cta="Brief öffnen"
              href="/anfrage"
              primary
            />
          </Reveal>
          <Reveal delay={240}>
            <PathCard
              tag="42 Sek · live"
              title="Voice-Note hören"
              body="Alexanders Take auf die Agent-Ära und warum 2026 → 2030 anders läuft als 2017 → 2023."
              cta="Reinhören"
              href="/manifesto"
            />
          </Reveal>
        </div>
      </Section>

      {/* ============================================================
          11 — LEAD MAGNET
         ============================================================ */}
      <Section
        id="magnet"
        chapter="10 Magnet"
        title="Kostenlos · 60 Sekunden"
        date="2026 / 10"
      >
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg">
                Was sagt ChatGPT über{" "}
                <em className="font-display italic">deine</em> Marke?
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[560px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Trag deine Domain ein. Du bekommst zurück, was Claude, ChatGPT und Perplexity{" "}
                <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>live</em> über
                dich sagen — und wo der Cluster in deiner Kategorie gerade kippt.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <AuditForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          12 — BIG CTA
         ============================================================ */}
      <section className="relative pt-[112px] md:pt-[160px] pb-[112px] md:pb-[160px] section-divider">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">11</span> Close · 2026 / 11
            </span>
          </Reveal>
          <Reveal delay={60}>
            <p
              className="mt-7 max-w-[820px] text-[17px] md:text-[19px] leading-[1.45]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Was glaubst du — wie viele deiner Wettbewerber lesen das hier gerade auch?
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h2
              className="h-display mt-5 text-[44px] sm:text-[68px] md:text-[100px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Dein nächster Kunde fragt jetzt gerade einen Agenten.
              <br />
              <em className="font-display italic">Was antwortet er?</em>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/anfrage" className="btn-primary">
                Brief schicken
                <span aria-hidden>→</span>
              </Link>
              <a href="mailto:hi@beuwy.com" className="btn-secondary">
                hi@beuwy.com
              </a>
              <span
                className="ml-2 text-[12px]"
                style={{
                  color: "var(--ink-dim)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Ø Reply &lt; 6h · Mo–Fr 09–18 CET
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- subcomponents ---------- */

function AuditForm() {
  return (
    <form
      action="/audit"
      method="get"
      className="rounded-[12px] p-2"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          name="domain"
          required
          placeholder="deine-marke.de"
          className="flex-1 px-4 py-3 rounded-[10px]"
          style={{
            background: "transparent",
            color: "var(--ink-cream)",
            fontSize: 14,
            outline: "none",
            border: "1px solid var(--line-subtle)",
            fontFamily: "var(--font-mono)",
          }}
        />
        <button type="submit" className="btn-primary" style={{ height: 44 }}>
          Audit
          <span aria-hidden>→</span>
        </button>
      </div>
      <p
        className="px-2 py-3"
        style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.04em" }}
      >
        60 Sek · kein Login · Antwort direkt von Claude · live
      </p>
    </form>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div
      className="p-4 rounded-[10px]"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <p
        className="font-display"
        style={{
          fontSize: 32,
          letterSpacing: "-0.02em",
          color: "var(--ink-yellow)",
          lineHeight: 1,
        }}
      >
        {n}
      </p>
      <p
        className="mt-2"
        style={{
          color: "var(--ink-muted)",
          fontSize: 12,
          letterSpacing: "0.02em",
          lineHeight: 1.4,
        }}
      >
        {l}
      </p>
    </div>
  );
}

function MechanismFlow() {
  const layers = [
    {
      num: "01",
      t: "Brand-System",
      sub: "DESIGN.md · Voice · Forbidden Phrases",
      out: "Maschinenlesbar",
    },
    {
      num: "02",
      t: "Live-Site",
      sub: "Next.js · Vercel · deine TLD",
      out: "12 Sektionen, indizierbar",
    },
    {
      num: "03",
      t: "Agent-Layer",
      sub: "schema.org · llms.txt · Cluster-Brief",
      out: "Lesbar für Claude · GPT · Perplexity",
    },
  ];
  return (
    <div
      className="mt-12 rounded-[16px] p-6 md:p-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-raised) 0%, #1F0606 100%)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="chip"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--ink-cream)",
          }}
        >
          <span className="dot" />
          INPUT · dein Brief, deine Marke, dein Markt
        </span>
      </div>

      {/* 3 Layer */}
      <div className="grid md:grid-cols-3 gap-0 md:gap-6 relative">
        {layers.map((l, i) => (
          <div key={l.num} className="relative">
            <div
              className="rounded-[12px] p-6 h-full"
              style={{
                background: "var(--bg-base)",
                border: "1px solid var(--line-subtle)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-display"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  {l.num}
                </span>
                <span
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  LAYER
                </span>
              </div>
              <p
                className="font-display mt-4"
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  color: "var(--ink-yellow)",
                  lineHeight: 1.1,
                }}
              >
                {l.t}
              </p>
              <p
                className="mt-3"
                style={{
                  color: "var(--ink-muted)",
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.005em",
                }}
              >
                {l.sub}
              </p>
              <div
                className="mt-5 pt-4"
                style={{ borderTop: "1px solid var(--line-subtle)" }}
              >
                <span
                  style={{
                    color: "var(--ink-yellow)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  → OUTPUT
                </span>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
                >
                  {l.out}
                </p>
              </div>
            </div>
            {/* Arrow between */}
            {i < layers.length - 1 && (
              <div
                className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 items-center justify-center w-12 h-12 z-10"
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 32,
                    color: "var(--ink-yellow)",
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Output row */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span
          className="chip"
          style={{
            background: "var(--ink-yellow)",
            color: "var(--bg-base)",
            border: "1px solid var(--ink-yellow)",
            fontWeight: 510,
          }}
        >
          OUTPUT · ein System, Tag 10 live
        </span>
        <span
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
          }}
        >
          inkl. 30 Tage Compound-Standby
        </span>
      </div>
    </div>
  );
}

function MechCard({
  num,
  title,
  tag,
  body,
}: {
  num: string;
  title: string;
  tag: string;
  body: string;
}) {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between">
        <span
          className="font-display"
          style={{
            fontSize: 22,
            letterSpacing: "-0.02em",
            color: "var(--ink-yellow)",
          }}
        >
          {num}
        </span>
        <span
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
          }}
        >
          {tag}
        </span>
      </div>
      <p
        className="font-display mt-4"
        style={{
          fontSize: 26,
          letterSpacing: "-0.02em",
          color: "var(--ink-yellow)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </p>
      <p
        className="mt-3"
        style={{
          color: "var(--ink-muted)",
          fontSize: 14,
          lineHeight: "22px",
        }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}

function CaseCard({
  client,
  years,
  kpi,
  kpiLabel,
  note,
  href,
}: {
  client: string;
  years: string;
  kpi: string;
  kpiLabel: string;
  note: string;
  href: string;
}) {
  return (
    <Link href={href} className="card block h-full group">
      <span
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        {client.toUpperCase()} · {years}
      </span>
      <p
        className="font-display mt-4"
        style={{
          fontSize: 44,
          letterSpacing: "-0.025em",
          color: "var(--ink-yellow)",
          lineHeight: 1,
        }}
      >
        {kpi}
      </p>
      <p
        className="mt-2"
        style={{
          color: "var(--ink-cream)",
          fontSize: 14,
          fontWeight: 510,
        }}
      >
        {kpiLabel}
      </p>
      <p
        className="mt-4"
        style={{
          color: "var(--ink-muted)",
          fontSize: 14,
          lineHeight: "22px",
        }}
      >
        {note}
      </p>
      <span
        className="inline-block mt-6 text-[13px] group-hover:text-[var(--ink-yellow)] transition-colors"
        style={{ color: "var(--ink-cream)" }}
      >
        Case lesen →
      </span>
    </Link>
  );
}

function SlotGrid() {
  const slots = [
    { q: "Q1/2026", state: "shipped" },
    { q: "Q2/2026", state: "shipped" },
    { q: "Q3/2026", state: "open" },
    { q: "Q3/2026", state: "open" },
    { q: "Q4/2026", state: "waitlist" },
    { q: "Q4/2026", state: "waitlist" },
  ];
  const stateMeta: Record<string, { label: string; color: string }> = {
    shipped: { label: "shipped", color: "var(--ink-dim)" },
    open: { label: "open", color: "var(--ink-yellow)" },
    waitlist: { label: "waitlist", color: "var(--ink-muted)" },
  };
  return (
    <div
      className="rounded-[12px] p-5"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <p
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        SLOT-PLAN · 6 / Jahr
      </p>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((s, i) => {
          const m = stateMeta[s.state];
          return (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-3 rounded-[8px]"
              style={{
                background: s.state === "open" ? "rgba(247,233,154,0.06)" : "transparent",
                border:
                  s.state === "open"
                    ? "1px solid rgba(247,233,154,0.32)"
                    : "1px solid var(--line-subtle)",
              }}
            >
              <span
                style={{
                  color: "var(--ink-cream)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                }}
              >
                {s.q}
              </span>
              <span
                style={{
                  color: m.color,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                }}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PathCard({
  tag,
  title,
  body,
  cta,
  href,
  primary,
}: {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className="card block h-full group"
      style={
        primary
          ? {
              background: "var(--ink-yellow)",
              color: "var(--bg-base)",
              border: "1px solid var(--ink-yellow)",
            }
          : undefined
      }
    >
      <span
        style={{
          color: primary ? "var(--bg-base)" : "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          opacity: primary ? 0.7 : 1,
        }}
      >
        {tag}
      </span>
      <p
        className="font-display mt-4"
        style={{
          fontSize: 26,
          letterSpacing: "-0.02em",
          color: primary ? "var(--bg-base)" : "var(--ink-yellow)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </p>
      <p
        className="mt-3"
        style={{
          color: primary ? "rgba(33,6,6,0.78)" : "var(--ink-muted)",
          fontSize: 14,
          lineHeight: "22px",
        }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <span
        className="inline-block mt-6 text-[13px] font-[510]"
        style={{
          color: primary ? "var(--bg-base)" : "var(--ink-cream)",
        }}
      >
        {cta} →
      </span>
    </Link>
  );
}
