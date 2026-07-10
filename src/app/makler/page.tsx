import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd, faqPageLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Makler-Portal: dein Portal für den nächsten Alleinauftrag",
  description:
    "Deine onOffice-Objekte laufen live auf deiner eigenen Domain, durchsuchbar wie bei den großen Portalen, mit Kunden-Login. 13.800 € netto, 7 Tage bis live.",
  alternates: { canonical: "/makler" },
  openGraph: {
    title: "Makler-Portal: dein Portal für den nächsten Alleinauftrag",
    description:
      "Objekte aus onOffice, durchsuchbar wie bei den großen Portalen, mit Kunden-Login. 13.800 € netto, 7 Tage bis live.",
    type: "website",
    url: "https://beuwy.com/makler",
  },
  twitter: { card: "summary_large_image" },
};

/* ---------- Problem-Zitate ---------- */
const quotes: { size: "lg" | "sm"; q: string; b: string }[] = [
  {
    size: "lg",
    q: "Ich sitz da als dritter Makler an dem Tisch.",
    b: "Der Eigentümer hatte schon zwei andere da. Alle erzählen dasselbe. Den Unterschied macht am Ende, was er sieht. Und meistens sieht er nur ein Exposé auf Papier.",
  },
  {
    size: "sm",
    q: "Ich zahl ImmoScout jeden Monat vierstellig. Und häng direkt neben meiner Konkurrenz.",
    b: "Deine Objekte stehen in derselben Liste wie die von drei anderen Büros. Du bezahlst dafür, dass Käufer dich vergleichen können.",
  },
  {
    size: "sm",
    q: "Meine Website ist von 2015, und das weiß ich.",
    b: "IVD-Template, Baukasten-Look, ein Kontaktformular, das keiner abschickt. Du hattest nur nie sechs Wochen Zeit, dich drum zu kümmern.",
  },
  {
    size: "lg",
    q: "Ich zahl für onOffice, aber auf meiner Website siehst du davon nichts.",
    b: "Die Objekte liegen sauber gepflegt im System. Auf deiner Website: eine graue Liste, wenn überhaupt. Genau die Seite ruft der Eigentümer auf, bevor du klingelst.",
  },
];

/* ---------- Leistungen ---------- */
const bigServices: { n: string; t: string; b: string }[] = [
  {
    n: "01",
    t: "Eigenes Immobilienportal",
    b: "Käufer suchen und filtern auf deiner Seite, nicht nur auf ImmoScout. Auf deiner Domain, unter deiner Marke.",
  },
  {
    n: "02",
    t: "Kompletter Website-Relaunch",
    b: "Deine neue Seite steht, bevor der nächste Eigentümer-Termin ansteht.",
  },
];

const smallServices: { t: string; b: string }[] = [
  {
    t: "onOffice-Anbindung",
    b: "Was du in onOffice pflegst, steht automatisch online. Du tippst nichts doppelt.",
  },
  {
    t: "Kunden-Login",
    b: "Deine Kunden merken sich Objekte und sehen Neues zuerst bei dir.",
  },
  {
    t: "High-End-Visuals",
    b: "Deine Objekte sehen aus wie vom Profi-Shooting, ohne dass du eins bezahlst.",
  },
];

/* ---------- Ablauf ---------- */
const milestones: { tag: string; h: string; b: string }[] = [
  {
    tag: "Tag 1 bis 2",
    h: "Kickoff und Anbindung",
    b: "Du schickst onOffice-Zugang oder Objektliste, dazu Logo und Fotos. Wir binden dein System an und ziehen deine echten Objekte rein.",
  },
  {
    tag: "Tag 3 bis 4",
    h: "Design und Portal",
    b: "Startseite, Objektliste, Objektseiten. Mit deinen echten Daten, nicht mit Platzhaltern.",
  },
  {
    tag: "Tag 5 bis 6",
    h: "Login und Feinschliff",
    b: "Der Kunden-Login geht live, Texte und Details werden fertig.",
  },
  {
    tag: "Tag 7",
    h: "Go-Live",
    b: "Deine Seite geht auf deine Domain. Fertig für den nächsten Eigentümer-Termin.",
  },
];

/* ---------- FAQ ---------- */
const faq: { q: string; a: string }[] = [
  {
    q: "Wem gehören meine Daten, wenn ich onOffice anbinde?",
    a: "Dir. Wir lesen deine Objekte aus onOffice aus und zeigen sie auf deiner Website. Wir besitzen nichts davon.",
  },
  {
    q: "Wem gehört die Seite am Ende?",
    a: "Dir. Code, Inhalte und Domain laufen auf dich. Wenn du irgendwann woanders hinwillst, nimmst du alles mit.",
  },
  {
    q: "Was kostet mich das laufend?",
    a: "Hosting und Objekt-Sync laufen über uns, dafür gibt es ein kleines monatliches Betreuungspaket, monatlich kündbar. Die genaue Zahl nennen wir dir im ersten Gespräch, bevor du irgendwas unterschreibst.",
  },
  {
    q: "Ich hab FlowFact, nicht onOffice. Geht das?",
    a: "Das System ist auf onOffice gebaut. Ob deine Anbindung geht, prüfen wir vorher und sagen dir ehrlich Bescheid, bevor du zusagst.",
  },
  {
    q: "Ist der Kunden-Login DSGVO-konform?",
    a: "Ja, das bauen wir von Anfang an so: Hosting in der EU, Auftragsverarbeitung sauber geregelt.",
  },
  {
    q: "Warum reicht nicht die Homepage-Funktion von ImmoScout24?",
    a: "Die läuft in deren Baukasten, mit deren Beschränkungen. Was wir bauen, gehört dir, läuft auf deiner Domain und macht dich unabhängig von einem einzelnen Portal.",
  },
];

export default function MaklerPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "beuwy", href: "/" },
            { name: "Makler-Portal", href: "/makler" },
          ]),
          faqPageLd(faq)!,
        ]}
      />

      {/* ============================================================
          HERO: asymmetrischer Split
         ============================================================ */}
      <section className="relative pt-[140px] md:pt-[180px] pb-[72px] overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "-10%", right: "-8%", width: 520, height: 520, opacity: 0.45 }}
        />
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-7">
              <Reveal>
                <span className="eyebrow">
                  <span className="num">/</span> Website und Portal für Immobilienmakler
                </span>
              </Reveal>
              <Reveal delay={80}>
                {/* Bewusst kleinerer Scale als h-display-xl: 11-Wort-Headline
                    muss im 7-Spalten-Split in 2-3 Zeilen passen, CTA above fold. */}
                <h1
                  className="h-display mt-7 max-w-[820px]"
                  style={{ fontSize: "clamp(34px, 4.1vw, 58px)", lineHeight: 1.04, letterSpacing: "-0.025em" }}
                >
                  Das Portal, das dir den nächsten Alleinauftrag holt.
                  <br />
                  In <em className="gradient-text">7 Tagen</em>.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p
                  className="mt-8 max-w-[560px] text-[18px] md:text-[20px] leading-[1.5]"
                  style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
                >
                  Deine onOffice-Objekte laufen live auf deiner eigenen Domain: durchsuchbar wie
                  bei den großen Portalen, mit Kunden-Login.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link href="/anfrage?quelle=makler" className="btn-primary">
                    Demo mit deinen Objekten anfragen
                    <span aria-hidden>→</span>
                  </Link>
                  <a
                    href="https://riegel.vercel.app"
                    target="_blank"
                    rel="noopener"
                    className="btn-secondary"
                  >
                    Riegel live ansehen
                  </a>
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
                  13.800 € netto, 7 Tage von Kickoff bis live. Beweis: riegel.vercel.app
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={120}>
                <AssetSlot
                  src="/assets/cases/riegel-storefront.webp"
                  alt="Riegel Immobilien, live auf eigener Domain"
                  aspect="4/3"
                  caption="Riegel Immobilien · live im Netz"
                  priority
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROBLEM: asymmetrisches Zitate-Grid
         ============================================================ */}
      <Section id="problem" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Du kennst diese vier Sätze.
            <br />
            <em className="font-display italic">Du hast sie diese Woche schon gedacht.</em>
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-6 md:gap-8">
          <div className="space-y-6 md:space-y-8">
            <Reveal delay={80}>
              <QuoteCard {...quotes[0]} />
            </Reveal>
            <Reveal delay={200}>
              <QuoteCard {...quotes[2]} />
            </Reveal>
          </div>
          <div className="space-y-6 md:space-y-8 md:mt-20">
            <Reveal delay={140}>
              <QuoteCard {...quotes[1]} />
            </Reveal>
            <Reveal delay={260}>
              <QuoteCard {...quotes[3]} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          BEWEIS: Showcase
         ============================================================ */}
      <Section id="beweis" tone="elevated">
        <Reveal>
          <span className="eyebrow">
            <span className="num">/</span> Beweis: Riegel Immobilien
          </span>
        </Reveal>
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[900px]">
            Kein Mockup.
            <br />
            <em className="font-display italic">Eine echte Maklerseite, live im Netz.</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[760px] text-[17px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
            Riegel Immobilien war das erste Projekt mit diesem System. Du musst uns nicht glauben,
            schau selbst: riegel.vercel.app. Kein Passwort, keine Warteliste. Startseite,
            Objektliste mit Filtern wie bei den großen Portalen, Objektseiten, Kunden-Login. Alles
            live, alles echt. Warum das in 7 Tagen ging: Wir fangen nicht bei null an. Das System
            aus dem Riegel-Projekt passen wir auf deine Marke, deine Farben und deine Objekte an.
          </p>
        </Reveal>

        <div className="mt-12">
          <Reveal delay={160}>
            <AssetSlot
              src="/assets/makler/portal-start.webp"
              alt="Riegel Immobilien Startseite mit Objekten aus onOffice"
              aspect="16/9"
              caption="Startseite: Objekte aus onOffice, automatisch synchronisiert"
              className="makler-hover-lift"
            />
          </Reveal>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <Reveal delay={220}>
              <AssetSlot
                src="/assets/makler/portal-liste.webp"
                alt="Objektliste mit Filtern, durchsuchbar wie bei großen Immobilienportalen"
                aspect="4/3"
                caption="Objektliste: durchsuchbar und filterbar wie bei den großen Portalen"
                className="makler-hover-lift"
              />
            </Reveal>
            <Reveal delay={280}>
              <AssetSlot
                src="/assets/makler/portal-objekt.webp"
                alt="Objektseite mit High-End-Visuals"
                aspect="4/3"
                caption="Objektseite: High-End-Visuals, denen man nicht ansieht, dass KI half"
                className="makler-hover-lift"
              />
            </Reveal>
            <Reveal delay={340}>
              <AssetSlot
                src="/assets/makler/portal-login.webp"
                alt="Kunden-Login-Bereich für Interessenten"
                aspect="4/3"
                caption="Kunden-Login: eigener Bereich für Interessenten"
                className="makler-hover-lift"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={400}>
          <a
            href="https://riegel.vercel.app"
            target="_blank"
            rel="noopener"
            className="btn-secondary mt-10"
          >
            Riegel live ansehen
          </a>
        </Reveal>
      </Section>

      {/* ============================================================
          LEISTUNGEN: 2 groß + 3 kompakt
         ============================================================ */}
      <Section id="leistungen" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Was du bekommst.
            <br />
            <em className="font-display italic">Alles zusammen, aus einer Hand.</em>
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {bigServices.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="card h-full" style={{ padding: 36 }}>
                <span
                  className="font-display"
                  style={{ fontSize: 36, color: "var(--ink-yellow)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <p
                  className="font-display mt-5"
                  style={{ fontSize: 28, letterSpacing: "-0.02em", color: "var(--ink-cream)", lineHeight: 1.15 }}
                >
                  {s.t}
                </p>
                <p className="mt-3" style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: "24px" }}>
                  {s.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-5">
          {smallServices.map((s, i) => (
            <Reveal key={s.t} delay={200 + i * 60}>
              <div className="card h-full">
                <p
                  className="font-display"
                  style={{ fontSize: 20, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.2 }}
                >
                  {s.t}
                </p>
                <p className="mt-3" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
                  {s.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          ABLAUF: vertikale Meilenstein-Liste
         ============================================================ */}
      <Section id="ablauf" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[760px]">
            7 Tage.
            <br />
            <em className="font-display italic">Vier Meilensteine.</em>
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-12 max-w-[640px] makler-timeline">
          <div className="makler-timeline-rail" aria-hidden />
          {milestones.map((m, i) => (
            <Reveal key={m.tag} delay={i * 80}>
              <div className="makler-timeline-item">
                <span className="makler-timeline-marker" aria-hidden />
                <span
                  style={{
                    color: "var(--ink-yellow)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                  }}
                >
                  {m.tag}
                </span>
                <p
                  className="font-display mt-1"
                  style={{ fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink-cream)", lineHeight: 1.2 }}
                >
                  {m.h}
                </p>
                <p className="mt-2" style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: "24px" }}>
                  {m.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============================================================
          PREIS: große Zahl + Anker-Absätze
         ============================================================ */}
      <Section id="preis" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[820px]">
            <CountUp to={13800} suffix=" € netto." />
            <br />
            Einmal gebaut, <em className="font-display italic">gehört dir</em>.
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-10 max-w-[680px] space-y-7">
          <Reveal delay={80}>
            <p style={{ color: "var(--ink-cream)", fontSize: 17, lineHeight: 1.6 }}>
              Viele Makler zahlen mehrere Hundert bis über tausend Euro im Monat an ImmoScout24, je
              nach Paket und Region. Aufs Jahr gerechnet ist das oft mehr, als dieses ganze Portal
              einmalig kostet. Und danach gehört dir: nichts.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-dim)",
                }}
              >
                Rechenbeispiel, keine Zusage
              </span>
              <p className="mt-3" style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: 1.65 }}>
                Rechenbeispiel: Bei einer Wohnung für 400.000 € sind 3,57 % Maklerseite rund
                14.280 € Courtage. Mehr, als die komplette Website kostet. Du brauchst keinen zehn
                neuen Aufträge. Ein einziger Alleinauftrag, den du sonst verloren hättest, zahlt
                das Ding.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================================================
          KNAPPHEIT: schmale Text-Sektion, ohne Karte
         ============================================================ */}
      <Section id="knappheit" tone="base">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[760px]">
            Ein Portal zur Zeit.
            <br />
            <em className="font-display italic">Nicht fünf vom Fließband.</em>
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
            Kein Countdown, kein Trick. Ich hab genau so viel Kapazität, wie ich hab. Sonst leidet
            die Qualität, und dann bringt dir das Ding nichts. Und: Dieselbe Technik verkaufe ich
            nicht zweimal in derselben Stadt. Wer zuerst bucht, hat sie im Landkreis für sich.
          </p>
        </Reveal>
      </Section>

      {/* ============================================================
          FAQ
         ============================================================ */}
      <Section id="faq" tone="raised">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[900px]">
            Die Fragen, die jeder Makler
            <br />
            <em className="font-display italic">an dieser Stelle stellt.</em>
          </HeadlineDisplay>
        </Reveal>

        <div className="mt-10 max-w-[860px]">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details className="group py-5" style={{ borderBottom: "1px solid var(--line-subtle)" }}>
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
          ABSCHLUSS: Split
         ============================================================ */}
      <Section id="demo" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "10%", left: "-10%", width: 460, height: 460, opacity: 0.32 }}
        />
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <span className="num">/</span> Bevor du zahlst
              </span>
            </Reveal>
            <Reveal delay={60}>
              <HeadlineDisplay size="lg" className="mt-6 max-w-[640px]">
                Bevor du einen Euro zahlst,
                <br />
                siehst du <em className="gradient-text">deine eigene Seite</em>.
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="mt-7 text-[17px] leading-[1.65] max-w-[600px] space-y-5"
                style={{ color: "var(--ink-cream)" }}
              >
                <p>
                  Schick uns deinen onOffice-Zugang, oder einfach deine Objektliste. Wir bauen dir
                  eine echte Demo: deine Objekte, dein Name, deine Fotos. Kein Mockup mit
                  Beispielwohnungen.
                </p>
                <p style={{ color: "var(--ink-muted)" }}>
                  Du siehst genau, wie deine Seite aussehen würde. Und entscheidest danach, nicht
                  davor.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/anfrage?quelle=makler" className="btn-primary">
                  Demo mit deinen Objekten anfragen
                  <span aria-hidden>→</span>
                </Link>
                <a href="mailto:hi@beuwy.com" className="btn-link">
                  Oder erst mit Alex reden
                </a>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={140}>
              <div className="glass p-7 md:p-8">
                <p
                  className="mb-5"
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Was wir von dir brauchen
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "onOffice-Zugang (Lesezugriff reicht) oder Objektliste als Excel/PDF",
                    "Logo und Fotos, falls vorhanden",
                    "Wunsch-Domain, falls schon vorhanden",
                    "Deine E-Mail für die Antwort",
                  ].map((line, i) => (
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
    </>
  );
}

function QuoteCard({ size, q, b }: { size: "lg" | "sm"; q: string; b: string }) {
  const big = size === "lg";
  return (
    <div className="card h-full">
      <span
        aria-hidden
        className="font-display"
        style={{ fontSize: big ? 52 : 36, color: "var(--ink-yellow)", lineHeight: 1, opacity: 0.4 }}
      >
        &ldquo;
      </span>
      <p
        className="font-display mt-2"
        style={{
          fontSize: big ? 26 : 19,
          letterSpacing: "-0.02em",
          color: "var(--ink-cream)",
          lineHeight: 1.28,
        }}
      >
        {q}
      </p>
      <p
        className="mt-4"
        style={{ color: "var(--ink-muted)", fontSize: big ? 15 : 14, lineHeight: big ? "24px" : "22px" }}
      >
        {b}
      </p>
    </div>
  );
}
