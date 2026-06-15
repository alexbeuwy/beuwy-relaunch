import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Editor } from "@/components/Editor";
import { EmailMockup } from "@/components/EmailMockup";
import { LogoWall, Testimonials } from "@/components/LogoWall";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { HeroGraphic } from "@/components/HeroGraphic";
import { ScrollScrubVideo } from "@/components/ScrollScrubVideo";
import { AssetSlot } from "@/components/AssetSlot";
import { AuditPreview } from "@/components/AuditPreview";

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          01 — HOOK
         ============================================================ */}
      <section className="scroll-scrub-wrap section-band section-band-base">
        <div className="scroll-scrub-sticky">
          {/* Scroll-scrubbed video — currentTime driven by scroll progress.
              mp4 is re-encoded with all-keyframes so seeking is buttery. */}
          <ScrollScrubVideo src="/assets/hero-scrub.mp4" />
          <div className="scroll-scrub-overlay" aria-hidden />

          {/* Glow orbs floating behind the headline */}
          <div
            aria-hidden
            className="glow-orb glow-orb-yellow"
            style={{ top: "12%", left: "-8%", width: 520, height: 520 }}
          />
          <div
            aria-hidden
            className="glow-orb glow-orb-red"
            style={{ top: "55%", right: "-12%", width: 460, height: 460, animationDelay: "-6s" }}
          />

          {/* Sneaky hero graphic — animated constellation, sits above the orbs. */}
          <HeroGraphic />

          <div className="scroll-scrub-content pt-[112px] md:pt-[160px] pb-[64px] md:pb-[80px]">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10 w-full relative z-[1]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <span className="chip">
                <span className="dot" />
                <span>Q3/2026 · noch 2 Slots</span>
              </span>
              <span className="chip" style={{ color: "var(--ink-yellow)" }}>
                Ab €25.000 · Festpreis
              </span>
              <span
                style={{
                  color: "var(--ink-dim)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                seit 2017
              </span>
            </div>
          </Reveal>

          <Reveal delay={140} variant="mask">
            <h1 className="h-display-xl max-w-[1100px]">
              Bald fragt dein Kunde nicht mehr <em>Google</em>.
              <br />
              Er fragt <em className="gradient-text">einen KI-Agenten</em>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Wir bauen die Marke, die der Agent <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>empfiehlt</em>.
              Brand, Website, KI-Sichtbarkeit — alles in <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>10 Tagen</em> live.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p
              className="mt-5 max-w-[640px] text-[15px] leading-[1.5]"
              style={{ color: "var(--ink-muted)" }}
            >
              Ein Festpreis. Ein Ansprechpartner. Drei Sachen, die du am Tag 10 in der Hand hast.
              Kein Discovery-Theater. Antwort auf deine Anfrage in &lt; 6 Stunden — auch ein ehrliches Nein.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/anfrage" className="btn-primary">
                Jetzt Slot sichern
                <span aria-hidden>→</span>
              </Link>
              <Link href="#mechanismus" className="btn-secondary">
                Wie das funktioniert
                <span aria-hidden>↓</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]"
              style={{ color: "var(--ink-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              <span>€300M+ Kunden-Outcome</span>
              <span>·</span>
              <span>4× Kategorie-Sieger</span>
              <span>·</span>
              <span>Ø Antwort &lt; 6h</span>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <div className="hero-scroll-hint" aria-hidden>
              <span className="hero-scroll-hint-text">Scroll</span>
              <span className="hero-scroll-hint-dot" />
            </div>
          </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 — PAIN AGITATE (Diagnose-Tabelle)
         ============================================================ */}
      <Section id="pain" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-red"
          style={{ top: "20%", right: "-12%", width: 420, height: 420, opacity: 0.35 }}
        />
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">85 %</span> deiner Pipeline = Zufall
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-display-xl max-w-[1100px] mt-6">
            Dein bester Monat: <em>eine</em> Empfehlung.
            <br />
            Dein Q3 stirbt, wenn <em className="gradient-text">zwei ausbleiben</em>.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-7 text-[19px] leading-[1.5] max-w-[640px]"
            style={{ color: "var(--ink-cream)" }}
          >
            85 % deiner Kunden kommen über Empfehlungen. Wenn die wegfallen — ist die Pipeline leer.
            <br />
            <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Hier sind die 5 Stellen, wo es brennt:</em>
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
          03 — DREAM STATE — the LIGHT editorial moment
         ============================================================ */}
      <Section id="dream" tone="cream">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Bald nennt der Agent <em className="font-display italic">dich</em> —
            <br />
            bevor dein Wettbewerber überhaupt auftaucht.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-[19px] leading-[1.5] max-w-[620px]">
            Frag dich: Was, wenn deine nächsten zehn Kunden nicht über Zufall kommen,
            sondern weil ein Agent auf <em>&quot;Wer macht das in DACH?&quot;</em> mit deinem
            Namen antwortet? Genau das baut maschinenlesbare Brand.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 items-center mt-12">
          <div className="md:col-span-7">
            <Reveal>
              <EmailMockup />
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <AssetSlot
                src="/assets/cases/agent-reads-brand.jpg"
                alt="3D-Robot liest ein Brand-DESIGN.md Panel"
                aspect="3/4"
                caption="Der Agent liest deine Marke wie eine Datei — und empfiehlt sie."
                prompt="Cinematic 3D render, matte bordeaux humanoid robot holding a frosted translucent glass UI panel reading 'DEAR AGENT, THIS IS WHY WE'RE THE BEST' in warm gold serif, soft warm key light, moody dark crimson background, octane render, 3:4"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          04 — MECHANISM
         ============================================================ */}
      <Section id="mechanismus" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "15%", left: "-10%", width: 480, height: 480, opacity: 0.4 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            Drei Layer, zehn Tage —
            <br />
            und der Agent <em className="gradient-text">versteht dich</em>.
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
      <Section id="proof" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "10%", right: "-10%", width: 540, height: 540, opacity: 0.55 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1100px]">
            <em className="gradient-text">€300M+</em> in den Büchern unserer Kunden.
            <br />
            Gebaut von einem, der selbst skaliert hat.
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

        {/* Counter wall — count-up on enter, sneaky-fast easeOutCubic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {[
            { prefix: "€", value: 160, suffix: "M", display: "€160M", l: "KKR Joint Venture (Vision · 2023)", src: "öffentlich, vision.de" },
            { prefix: "", value: 2240, suffix: "", display: "2.240", l: "Königswege Partner (vs. 170 in 2017)", src: "cash-online 2024" },
            { prefix: "", value: 315, suffix: "", display: "315", l: "Wohnungen (acta · 2023–2025)", src: "intern, Ø Ticket €153.842" },
            { prefix: "", value: 1, suffix: "M+", display: "1M+", l: "PURELEI Follower (seit 2018)", src: "Instagram public" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div className="glass p-6 h-full">
                <p
                  className="stat-num-display"
                  aria-label={s.display}
                >
                  <CountUp prefix={s.prefix} to={s.value} suffix={s.suffix} duration={1700} />
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
            <p className="eyebrow mb-5">
              <span className="num">/</span> Stimmen aus dem Maschinenraum
            </p>
            <Testimonials />
          </div>
        </Reveal>

        {/* Authority — merged into Proof: who builds it + founder quote */}
        <Reveal delay={120}>
          <div className="mt-16 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">
                <span className="num">/</span> Du sprichst mit dem, der baut
              </p>
              <p
                className="text-[17px] leading-[1.6] max-w-[600px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Alexander Pütter — seit 2009 Brand-Arbeit für Konzerne (Bosch, Continental,
                Michelin), seit 2017 beuwy als Operator-Studio, 2023 selbst Unternehmer:{" "}
                <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>
                  315 Wohnungen über Instagram verkauft, mitten in der Zinskrise
                </em>
                . Kein Account-Manager dazwischen. Wir kennen Kaufentscheidungen, weil wir sie
                selbst auslösen.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="glass p-7">
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
                    <p style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}>
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
                    fontSize: 20,
                    lineHeight: "1.3",
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  &ldquo;Wir geben Gründern ein laufendes System und einen Graphen, der schon{" "}
                  <em className="font-display italic">klettert</em> — bevor die nächste Agentur
                  ihr Notion-Doc fertig hat.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          07 — OFFER
         ============================================================ */}
      <Section id="offer" tone="cream">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Am Tag 10: Marke, Website und KI-Sichtbarkeit —{" "}
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
              { t: "Live-Site", d: "Next.js, Vercel, deine Domain. Eine Seite wie diese — auf dich angepasst." },
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
                    borderBottom: "1px solid rgba(26,4,4,0.12)",
                  }}
                >
                  <span
                    className="font-display shrink-0"
                    style={{
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "#B23A48",
                      width: 28,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p
                      style={{
                        color: "var(--bg-base)",
                        fontSize: 16,
                        fontWeight: 510,
                        marginBottom: 4,
                      }}
                    >
                      {row.t}
                    </p>
                    <p style={{ color: "rgba(26,4,4,0.7)", fontSize: 14, lineHeight: "22px" }}>
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
      <Section id="scarcity" divider={true} tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-red"
          style={{ top: "15%", right: "-10%", width: 460, height: 460, opacity: 0.4 }}
        />
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <HeadlineDisplay size="lg">
                6 Plätze im Jahr. <em className="gradient-text">2 frei</em> für Q3.
                <br />
                Danach Warteliste.
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
      <Section id="disqualifier" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            Wenn du Logo-Runden und Discovery-Phasen suchst,
            <br />
            sind wir die <em className="gradient-text">Falschen</em>.
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
          08 — LEAD MAGNET (free audit, low-friction entry)
         ============================================================ */}
      <Section id="magnet" tone="bright">
        <div
          aria-hidden
          className="glow-orb glow-orb-cream"
          style={{ top: "30%", right: "-8%", width: 420, height: 420, opacity: 0.7 }}
        />
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <HeadlineDisplay size="lg">
                In 15 Sekunden siehst du, was die{" "}
                <em className="font-display italic">Agenten</em> über dich sagen.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[460px]"
                style={{ color: "var(--ink-muted)" }}
              >
                Domain rein. Score, sechs Dimensionen, sofort-Fixes — die beuwy-Agenten prüfen quer
                über Claude, ChatGPT, Gemini, Grok, DeepSeek &amp; Perplexity. Kein Login, kostenlos.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-7">
                <AuditForm />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={120}>
              <AuditPreview />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          12 — BIG CTA
         ============================================================ */}
      <section className="relative pt-[112px] md:pt-[160px] pb-[112px] md:pb-[160px] section-divider section-band section-band-base">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <p
              className="max-w-[820px] text-[17px] md:text-[19px] leading-[1.45]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Was glaubst du — wie viele deiner Wettbewerber lesen das hier gerade auch?
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="h-display-xl mt-5 max-w-[1100px]">
              Dein nächster Kunde fragt jetzt gerade einen Agenten.
              <br />
              <em className="gradient-text">Was antwortet er?</em>
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
            <div className="glass p-6 h-full">
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
