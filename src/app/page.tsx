import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* Strukturierte Daten — einzige erlaubte dangerouslySetInnerHTML-Stelle
          (JSON.stringify über statische Daten, kein Nutzer-Input). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* 01 — HERO + TOOL */}
      <section className="section-band section-band-base relative overflow-hidden">
        <div className="hero-lamp" aria-hidden />
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-24 relative z-[1]">
          <div className="mx-auto max-w-[880px] text-center">
            <Reveal>
              <p className="t-label">
                Digitale Vertriebssysteme · Finance &amp; Real Estate
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="t-display mt-4">
                Die erste <em>Empfehlung</em> kommt heute von Google und ChatGPT.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-body-lg mt-5 mx-auto max-w-[560px]">
                Wir bauen Finanz- und Immobilienunternehmen das Vertriebssystem,
                das dafür sorgt, dass beide auf Sie zeigen.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-12">
              <AuditTool />
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="t-data text-center mt-8">
              Systeme hinter RIEGEL Immobilien · SAADI AG · Königswege · acta
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 — STATUS-QUO-KOSTEN */}
      <Section id="kosten" tone="raised">
        <SectionHead
          eyebrow="01 · Was sich geändert hat"
          title={
            <>
              Der Weg zum Auftrag beginnt nicht mehr auf Ihrer{" "}
              <em>Website</em>.
            </>
          }
          intro="Eigentümer und Anleger prüfen Anbieter zuerst in Google-AI-Übersichten und Chat-Assistenten. Wer dort nicht vorkommt, verliert Aufträge unbemerkt."
        />
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <ol className="space-y-4">
              {[
                {
                  k: "Früher",
                  v: "Suche → zehn blaue Links → Ihre Website → Anruf.",
                },
                {
                  k: "Heute",
                  v: "Frage an Google oder ChatGPT → eine Antwort mit zwei, drei Namen → Anruf beim Erstgenannten.",
                },
                {
                  k: "Konsequenz",
                  v: "Die Antwort der Maschine ist die neue erste Filterstufe. Sie findet statt, bevor Sie vom Interessenten erfahren.",
                },
              ].map((row) => (
                <li key={row.k} className="flex gap-4 pb-4 border-b hairline">
                  <span className="t-label shrink-0 w-28 pt-1">{row.k}</span>
                  <p className="t-body is-cream">{row.v}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-5">
            <div className="panel rounded-2xl p-6">
              <p className="t-score">58,5&nbsp;%</p>
              <p className="t-body mt-3 is-cream">
                der Google-Suchen enden bereits ohne Klick auf eine Website.
              </p>
              <p className="t-data mt-4">Quelle · SparkToro/Datos, 2024</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — PROOF */}
      <Section id="proof" tone="base">
        <SectionHead
          eyebrow="02 · Referenzen"
          title={
            <>
              Zwei Systeme, die es <em>beweisen</em>.
            </>
          }
          intro="Beide live, beide im Vertrieb im Einsatz, beide von einem Operator gebaut."
        />
        <div className="grid md:grid-cols-2 gap-5">
          <CaseCard
            client="RIEGEL Immobilien"
            branch="Immobilienmakler · Rhein-Neckar"
            href="https://riegel.vercel.app"
            facts={[
              "207 Unterseiten · Preisatlas für 33 Städte",
              "Immobilien-Rechner: Bewertung in 60 Sekunden",
              "onOffice-Anbindung · Portal · Terminbuchung",
            ]}
            mechanic="Der Rechner holt die Eigentümer-Anfrage, die Standortseiten machen Riegel zur zitierbaren Antwort, onOffice macht daraus einen Vertriebsprozess."
          />
          <CaseCard
            client="SAADI AG"
            branch="Wohnungsprivatisierung · Mannheim"
            href="https://saadi-ag.vercel.app"
            facts={[
              "Vertriebspartner-Funnel mit Qualifizierungslogik",
              "Produkt-Strecken mit Gutachten & Prospekt-Standards",
              "ImmoCampus als zweite Rekrutierungs-Rampe",
            ]}
            mechanic="Die Partner-Strecke qualifiziert Vertriebe, disqualifiziert früh — und rekrutiert dadurch planbar statt zufällig."
          />
        </div>
        <p className="t-data mt-8">
          Davor · Vision Real Estate (KKR-Joint-Venture 2023, vision.de) ·
          Königswege (170 → 2.240 Partner, cash-online 2024) · acta (48,4 M€
          Volumen über Social-Funnel, intern)
        </p>
      </Section>

      {/* 04 — DAS SYSTEM */}
      <Section id="system" tone="raised">
        <SectionHead
          eyebrow="03 · Das System"
          title={
            <>
              Eine Website verkauft nicht. Ein <em>System</em> schon.
            </>
          }
          intro="Vier Ebenen, die ineinandergreifen — gedacht von Ihrem Vertriebsprozess her, nicht von der Startseite."
        />
        <div className="space-y-4">
          {[
            {
              num: "01",
              t: "Marke",
              d: "Eine Positionierung, die ein Kunde nachsprechen und eine Maschine zitieren kann.",
              ex: "SAADI · „Produktgeber, keine Verkäufer“ — ein Satz, den Partner weitertragen",
            },
            {
              num: "02",
              t: "Website + Werkzeuge",
              d: "Rechner, Portale, Buchung: Werkzeuge, die dem Besucher sofort etwas geben — und Ihnen die Anfrage.",
              ex: "RIEGEL · Immorechner, 60 Sekunden, ohne Anmeldung",
            },
            {
              num: "03",
              t: "AI-Sichtbarkeit",
              d: "Strukturierte Daten und zitierfähige Inhalte, damit Google-AI und Chat-Assistenten Sie als Antwort verwenden.",
              ex: "RIEGEL · Preisatlas + 200 Standortseiten als zitierbare Datenquelle",
            },
            {
              num: "04",
              t: "Prozess + CRM",
              d: "Jede Anfrage landet dort, wo Ihr Vertrieb arbeitet — nicht in einem Posteingang.",
              ex: "RIEGEL · onOffice-Anbindung · SAADI · Partner-Qualifizierungsstrecke",
            },
          ].map((l) => (
            <Reveal key={l.num}>
              <div className="grid md:grid-cols-12 gap-3 md:gap-6 items-baseline py-5 border-b hairline">
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="t-data">{l.num}</span>
                  <h3 className="t-h3">{l.t}</h3>
                </div>
                <p className="t-body md:col-span-5">{l.d}</p>
                <p className="t-data md:col-span-3">{l.ex}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 — PROZESS */}
      <Section id="prozess" tone="base">
        <SectionHead
          eyebrow="04 · Prozess"
          title={
            <>
              Erst die <em>Diagnose</em>, dann das System.
            </>
          }
          intro="Festpreis, fester Umfang, ein Ansprechpartner — der, der es baut."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              num: "01",
              t: "Systemgespräch",
              meta: "30 Minuten · kostenlos",
              d: "Ihr Vertriebsweg, der Check Ihrer Website, eine ehrliche Einschätzung. Danach wissen Sie, ob eine Diagnose sinnvoll ist — auch wenn wir nie zusammenarbeiten.",
            },
            {
              num: "02",
              t: "Diagnose",
              meta: "1.990 € · voll angerechnet",
              d: "Ein Dokument über Ihren digitalen Vertriebsweg: wo Anfragen entstehen, wo sie verloren gehen, was das System leisten muss. Es gehört Ihnen — samt Systemvorschlag in drei Ausbaustufen.",
            },
            {
              num: "03",
              t: "Systembau",
              meta: "3–5 Wochen · ab 16.000 €",
              d: "Marke, Website, Werkzeuge, CRM-Anbindung, AI-Sichtbarkeit — live, nicht als Konzept. Danach Betrieb und Ausbau, wenn Sie wollen.",
            },
          ].map((s) => (
            <Reveal key={s.num}>
              <div className="panel rounded-2xl p-6 h-full">
                <div className="flex items-baseline justify-between">
                  <span className="t-data">{s.num}</span>
                  <span className="t-label">{s.meta}</span>
                </div>
                <h3 className="t-h3 mt-4">{s.t}</h3>
                <p className="t-body mt-3">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="t-body mt-8 max-w-[560px] is-cream">
          Jedes System baut Alexander Pütter selbst. Sie sprechen zu keinem
          Zeitpunkt mit einem Account-Manager.
        </p>
      </Section>

      {/* 06 — FOUNDER */}
      <Section id="founder" tone="raised">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <SectionHead
              eyebrow="05 · Wer baut"
              title={
                <>
                  Sie sprechen mit dem, der es <em>baut</em>.
                </>
              }
            />
            <p className="t-body-lg max-w-[560px]">
              Alexander Pütter arbeitet seit 2009 an Marken — erst für
              Bosch-Gruppe, Continental und Michelin, seit 2017 mit beuwy für
              inhabergeführte Unternehmen. 2023 hat er acta mitgegründet und den
              Vertrieb selbst skaliert: 315 verkaufte Wohnungen über einen
              Social-Media-Funnel, mitten in der Zinskrise.
            </p>
            <p className="t-body-lg mt-5 max-w-[560px] is-cream">
              Wir kennen Kaufentscheidungen, weil wir sie{" "}
              <em className="font-display italic is-accent">selbst</em> auslösen.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="panel rounded-2xl p-6 space-y-4">
              {[
                { k: "2009–2017", v: "Markenarbeit · Bosch-Gruppe, Continental, Michelin" },
                { k: "seit 2017", v: "beuwy · Systeme für Finance & Real Estate" },
                { k: "2023–2025", v: "acta · 315 Wohnungen, Ø Ticket 153.842 € (intern)" },
              ].map((row) => (
                <div key={row.k} className="flex gap-4 pb-4 border-b hairline last:border-b-0 last:pb-0">
                  <span className="t-data shrink-0 w-24">{row.k}</span>
                  <p className="t-small is-cream">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 07 — FAQ */}
      <Section id="faq" tone="base">
        <SectionHead
          eyebrow="06 · Fragen"
          title={
            <>
              Die Fragen, die im ersten Gespräch <em>immer</em> kommen.
            </>
          }
        />
        <div className="max-w-[760px]">
          {FAQ_ITEMS.map((f) => (
            <details key={f.q} className="faq-item group border-b hairline py-5">
              <summary className="t-h3 cursor-pointer list-none flex items-baseline justify-between gap-6">
                {f.q}
                <span className="t-data shrink-0" aria-hidden>
                  +
                </span>
              </summary>
              <p className="t-body mt-3 max-w-[560px]">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 08 — CTA (einzige invertierte Gelb-Sektion) */}
      <section id="kontakt" className="cta-invert">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24 text-center">
          <Reveal>
            <h2 className="t-h2 cta-invert-ink mx-auto max-w-[640px]">
              Der nächste Schritt ist ein Gespräch, kein Pitch.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body-lg cta-invert-ink mt-5 mx-auto max-w-[480px]">
              30 Minuten, Video oder Telefon. Sie gehen mit einer ehrlichen
              Einschätzung raus — auch wenn wir nie zusammenarbeiten.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/termin" className="btn-inverse">
                Systemgespräch buchen
                <span aria-hidden>→</span>
              </Link>
              <Link href="/#tool" className="cta-invert-ink t-small underline underline-offset-4">
                Oder zuerst den Website-Check machen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://beuwy.com/#org",
      name: "beuwy",
      description:
        "Digitale Vertriebssysteme für Finanz- und Immobilienunternehmen: Marke, Website, Werkzeuge, CRM-Anbindung und AI-Sichtbarkeit — als ein System, zum Festpreis.",
      url: "https://beuwy.com",
      email: "ap@beuwy.com",
      founder: { "@type": "Person", name: "Alexander Pütter" },
      foundingDate: "2017",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mendelssohnstraße 52",
        postalCode: "67061",
        addressLocality: "Ludwigshafen am Rhein",
        addressCountry: "DE",
      },
      areaServed: "DE",
      priceRange: "ab 16.000 €",
      knowsAbout: [
        "Digitale Vertriebssysteme",
        "AI-Sichtbarkeit / Generative Engine Optimization",
        "Websites für Immobilienmakler",
        "Websites für Finanzvertriebe",
        "CRM-Anbindung (onOffice)",
        "Markenpositionierung",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://beuwy.com/#website",
      url: "https://beuwy.com",
      name: "beuwy",
      inLanguage: "de",
      publisher: { "@id": "https://beuwy.com/#org" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://beuwy.com/#faq",
      mainEntity: [
        {
          q: "Was kostet ein Vertriebssystem?",
          a: "Projekte beginnen bei 16.000 € — als Festpreis mit drei Ausbaustufen, Zahlungsplan 40/40/20. Zum Vergleich: weniger als ein halbes Jahresgehalt eines Vertriebsmitarbeiters, für ein System, das nicht kündigt.",
        },
        {
          q: "Wie lange dauert der Bau?",
          a: "Drei bis fünf Wochen vom Kickoff bis zum Livegang — inklusive Inhalte, Werkzeuge und CRM-Anbindung, dank AI-gestützter Produktion und erprobter Systembibliothek.",
        },
        {
          q: "Warum keine klassische Agentur?",
          a: "Agenturen verkaufen Kampagnen und Stunden. beuwy denkt wie ein Berater — erst die Diagnose des Vertriebsprozesses — und liefert wie ein Produkt: Festpreis, fester Umfang, live. Sie sprechen mit dem, der es baut.",
        },
        {
          q: "Was heißt AI konkret?",
          a: "Sichtbarkeit in AI-Antworten (strukturierte Daten, zitierfähige Inhalte), AI-gestützte Produktion (deshalb der Festpreis) und Automationen im Vertriebsprozess.",
        },
      ].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Was kostet ein Vertriebssystem?",
    a: "Projekte beginnen bei 16.000 € — als Festpreis mit drei Ausbaustufen, Zahlungsplan 40/40/20. Zum Vergleich: weniger als ein halbes Jahresgehalt eines Vertriebsmitarbeiters, für ein System, das nicht kündigt.",
  },
  {
    q: "Wie lange dauert der Bau?",
    a: "Drei bis fünf Wochen vom Kickoff bis zum Livegang — inklusive Inhalte, Werkzeuge und CRM-Anbindung. Möglich ist das, weil wir mit AI-gestützter Produktion arbeiten und auf eine erprobte Systembibliothek aufsetzen.",
  },
  {
    q: "Warum keine klassische Agentur?",
    a: "Agenturen verkaufen Kampagnen und Stunden. Wir denken wie Berater — erst die Diagnose Ihres Vertriebsprozesses — und liefern wie ein Produkt: Festpreis, fester Umfang, live. Und Sie sprechen mit dem, der es baut.",
  },
  {
    q: "Was heißt „AI“ hier konkret?",
    a: "Drei Dinge. Erstens Sichtbarkeit: strukturierte Daten und zitierfähige Inhalte, damit Google-AI und Chat-Assistenten Sie als Antwort verwenden. Zweitens Produktion: AI-gestützter Bau — deshalb der Festpreis. Drittens Prozesse: Automationen dort, wo Ihr Vertrieb Zeit verliert.",
  },
  {
    q: "Was passiert im Systemgespräch?",
    a: "30 Minuten, Video oder Telefon. Wir schauen gemeinsam auf Ihren Vertriebsweg und den Check Ihrer Website. Danach wissen Sie, ob eine Diagnose sinnvoll ist — es ist ein Gespräch, kein getarnter Pitch.",
  },
  {
    q: "Und die Diagnose?",
    a: "Ein bezahltes Dokument (1.990 €), das Ihnen gehört: Ihr digitaler Vertriebsweg, die Lücken, der Systemvorschlag in drei Ausbaustufen. Beauftragen Sie das System, wird die Diagnose voll angerechnet.",
  },
];

/* quote bleibt leer, bis die O-Töne über Kanal B (Masterplan §4) vorliegen —
   keine erfundenen Kundenstimmen (Anti-Slop-Regel 1). */
function CaseCard({
  client,
  branch,
  href,
  facts,
  mechanic,
  quote,
}: {
  client: string;
  branch: string;
  href: string;
  facts: string[];
  mechanic: string;
  quote?: { text: string; name: string };
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card block h-full group"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="t-h3">{client}</h3>
        <span className="t-data">live ↗</span>
      </div>
      <p className="t-data mt-1">{branch}</p>
      <ul className="mt-5 space-y-2">
        {facts.map((f) => (
          <li key={f} className="t-small is-cream flex gap-2">
            <span className="t-data shrink-0">·</span>
            {f}
          </li>
        ))}
      </ul>
      <p className="t-body mt-5">{mechanic}</p>
      {quote && (
        <blockquote className="mt-5 border-t hairline pt-5">
          <p className="t-body is-cream">„{quote.text}“</p>
          <footer className="t-data mt-2">— {quote.name}</footer>
        </blockquote>
      )}
    </a>
  );
}
