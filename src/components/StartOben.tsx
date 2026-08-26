import Image from "next/image";
import {
  AvatarReihe,
  GelbeKarte,
  Highlight,
  KreisDeko,
  LogoSlot,
  SektionsKopf,
  StempelBadge,
  slugifyMarke,
} from "./MaklerElemente";
import { AiPille } from "./AiPille";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { VslSlot } from "./VslSlot";
import { ExposeVergleich, PerformanceFlow } from "./SchemaGrafiken";
import { GRUENDER_FOTO, maklerAsset } from "@/lib/cdn";

/**
 * Startseite, Sektionen 2-5 (BRIEF §6): Spiegel → Abgrenzung Baukasten →
 * VSL-Slot + Kernversprechen → Mechanismus (4 Säulen). Ein Export für
 * page.tsx, intern vier lokale Sektions-Funktionen — jede mit genau einem
 * VSL-Job, abwechselnde Ausrichtung statt vier Mal Text-links-Bild-rechts.
 */
export function StartOben({ c }: { c: Record<string, string> }) {
  return (
    <>
      <Spiegel c={c} />
      <Abgrenzung c={c} />
      <VslKernversprechen c={c} />
      <Saeulen c={c} />
      <PerformanceMarketing c={c} />
    </>
  );
}

/* ── Block 5b — Performance-Marketing als Schema (BRIEF §9): wie aus
   Aufmerksamkeit von außen systematisch registrierte Kontakte werden.
   Die Quote ist Studio-editierbar (mk.pm.quote). ─────────────────── */
function PerformanceMarketing({ c }: { c: Record<string, string> }) {
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Performance-Marketing"
            titel="So werden Fremde zu *Mandaten*."
            sub="Anzeigen machen auf Ihre Marke aufmerksam. Das Portal übernimmt den Rest."
            ausrichtung="mitte"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="mx-auto mt-14 max-w-[880px]">
            <PerformanceFlow
              quote={c["mk.pm.quote"] ?? "5 %"}
              mandate={c["mk.pm.mandate"] ?? "5"}
              provision={c["mk.pm.provision"] ?? "31.285 €"}
              summe={c["mk.pm.summe"] ?? "156.425 €"}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Kleines Häkchen für die beuwy-Liste in Block 3 — eigene Kopie statt
 *  Import aus MaklerHero.tsx (dort nicht exportiert, Datei bleibt unangetastet). */
function Haken() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.4 8.6 11 1.4"
          stroke="#161613"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Grauer Strich für die Baukasten-Liste — bewusstes Gegenstück zum Haken. */
function Strich() {
  return (
    <span
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-hover"
      aria-hidden
    >
      <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
        <path d="M1 1h8" stroke="#8A8A84" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ── Block 2 — Spiegel: Ego + Problem ─────────────────────────────────
   Bild links (Referenz-3-Plate + StempelBadge auf der Ecke), Text rechts
   — bewusste Umkehr der Hero-Anordnung (dort Text links, Medium rechts). */
function Spiegel({ c }: { c: Record<string, string> }) {
  const integrationen = (c["mk.integrationen.namen"] ?? "")
    .split("|")
    .map((n) => n.trim())
    .filter(Boolean);

  return (
    <section className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:max-w-none">
            <KreisDeko className="-left-8 -top-8 hidden md:-left-12 md:-top-10 lg:block" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-line-subtle">
              <Image
                src={maklerAsset(2)}
                alt="Kampagnenwelt von beuwy: Makler-Ehepaar im Beratungsgespräch, Golden Hour"
                fill
                sizes="(min-width: 1024px) 46vw, 90vw"
                className="object-cover"
              />
              <AiPille />
            </div>
            <StempelBadge
              text="Erster Eindruck · Entscheidet"
              groesse={104}
              className="absolute -right-5 -top-5 z-10 md:-right-7 md:-top-7"
            />
          </Reveal>

          <Reveal delay={80}>
            <SektionsKopf
              eyebrow="Der Vergleich, den Sie nicht sehen"
              titel="Sie sind unter den Besten. *Sieht* man Ihnen das an?"
            />
            <div className="mt-9 space-y-6 border-t border-line-subtle pt-9">
              <p className="t-body-lg max-w-[42ch]">
                Empfehlungen bringen Ihnen die Anfrage. Doch wer Sie vorher googelt, sieht eine
                Website, die Ihrem Ruf hinterherhinkt.
              </p>
              <p className="t-body-lg max-w-[42ch]">
                Eigentümer vergleichen drei Makler, bevor sie anrufen. Heimlich, am Handy, abends
                auf dem Sofa.
              </p>
              <p className="t-body-lg max-w-[42ch]">
                Der Zweitplatzierte hat schlechter verkauft als Sie. Seine Website sah nur{" "}
                <Highlight>teurer aus</Highlight>.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Integrations-Band (Alex, 26.08): Pastellgelb mit dunklen
            Logos, direkt unter dem Spiegel-Argument — die Tools, die
            das Haus schon nutzt, docken hier an. Bewusste zweite
            Gelb-Fläche in diesem Block auf Alex' Wunsch. */}
        {integrationen.length > 0 && (
          <Reveal delay={140}>
            <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-5 rounded-[28px] bg-akzent px-7 py-6 md:px-9 md:py-7">
              <p className="t-label !text-[10.5px] !text-ink-cream/60">
                {c["mk.integrationen.label"]}
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {integrationen.map((name) => (
                  <LogoSlot key={name} name={name} slug={slugifyMarke(name)} dunkel />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── Block 3 — Feindbild Baukasten: Abgrenzung ────────────────────────
   Vollbreiten-Band bg-bg-elevated. Zwei nüchterne Listen statt Karten-
   Spam, kein Wettbewerbername (BRIEF §5). */
const BAUKASTEN_PUNKTE = [
  "Eine Website statt ein System — schicke Visitenkarte, kein Motor dahinter.",
  "Austauschbar — Exposés und Dokumente sehen bei jedem Makler gleich aus.",
  "Anpassung schwierig — jede Änderung landet in einer Warteschlange.",
  "Ohne Nachweis — niemand zeigt Ihnen, wie viele Mandate dabei herauskommen.",
];

const BEUWY_PUNKTE = [
  "Ein Portal, kein Template — gebaut für Ihre Marke und Ihren Markt.",
  "Exposés und Dokumente mit Ihrem Namen — nicht dem des Baukastens.",
  "Docken an Ihr CRM an — jede Anfrage landet dort, wo Sie ohnehin arbeiten.",
  "Mandate und Deals messbar — jede Zahl steht in Ihrem CRM.",
];

function Abgrenzung({ c }: { c: Record<string, string> }) {
  const jahre = c["mk.stats.s3_wert"] || "17";

  return (
    <section className="bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Die Abgrenzung"
            titel="Eine Website ist eine Visitenkarte. Ein *Portal* bringt Mandate."
            sub="Standardlösungen füllen Exposés und Dokumente, die bei jedem Makler gleich aussehen. Anpassen lässt sich davon wenig."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={60}>
            <p className="t-label">Baukasten</p>
            <ul className="mt-6 space-y-5 border-t border-line-subtle pt-6">
              {BAUKASTEN_PUNKTE.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3.5">
                  <Strich />
                  <span className="t-body pt-0.5 !text-ink-dim">{punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            {/* Eyebrow = Wortmarke statt Wort (Alex, 26.08) */}
            <Logo statisch height={17} />
            <div className="mt-1" />
            <ul className="mt-6 space-y-5 border-t border-line-medium pt-6">
              {BEUWY_PUNKTE.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3.5">
                  <Haken />
                  <span className="t-body pt-0.5 !text-ink-cream">{punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* No-Brainer-Schema (BRIEF §9): austauschbarer Standard links,
            Maßarbeit rechts — die Grafik trägt das Argument der Listen. */}
        <Reveal delay={140}>
          <div className="mt-16">
            <ExposeVergleich />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-16 max-w-[42ch] text-[20px] font-medium leading-snug tracking-[-0.012em] text-ink-cream md:mt-20 md:text-[24px]">
            Eine Website macht Sie sichtbar. Ein Portal bringt seit {jahre} Jahren{" "}
            <Highlight stark>Mandate</Highlight>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Block 4 — VSL-Slot + Kernversprechen ─────────────────────────────
   Links das 9:16-Video, rechts die gelbe Karte mit dem Versprechen, dem
   Play-Hinweis (springt per Anker zurück zum Video) und der Avatar-Reihe. */
function VslKernversprechen({ c }: { c: Record<string, string> }) {
  return (
    <section id="vsl" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          {/* VSL-Poster: maklerAsset(14) lädt intern in VslSlot.tsx über posterNummer. */}
          <Reveal className="mx-auto w-full max-w-[340px] lg:mx-0">
            <VslSlot posterNummer={14} videoUrl={c["mk.vsl.url"]} />
          </Reveal>

          <Reveal delay={90}>
            <GelbeKarte
              label="In 90 Sekunden"
              titel="Warum die besten Makler noch nicht die beste Website haben."
              glyph
              className="max-w-[34rem]"
            >
              Die meisten Maklerwebsites sehen aus wie die des Nachbarn — nur mit anderem Namen.
              Unsere sehen aus wie Sie: Ihre Fotos, Ihr Ton, Ihre Zahlen, und ein System dahinter,
              das Anfragen sortiert, bevor Sie sie überhaupt sehen. Wie das an einem echten
              Projekt aussieht, zeigt das Video daneben.
            </GelbeKarte>

            <a
              href="#vsl"
              className="group mt-8 inline-flex items-center gap-3"
              aria-label="Zum Video oben springen"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-subtle bg-white text-ink-cream transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-105">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="currentColor" aria-hidden>
                  <path d="M0 1.13C0 .27.95-.25 1.67.2l10.3 6.37c.68.42.68 1.4 0 1.82L1.67 14.76C.95 15.21 0 14.69 0 13.83V1.13Z" />
                </svg>
              </span>
              <span className="text-[14px] font-medium text-ink-cream">Video ansehen</span>
            </a>

            {/* Founder-Byline: echtes Porträt (GRUENDER_FOTO), deshalb ohne AiPille. */}
            <div className="mt-7 flex items-center gap-3.5">
              <Image
                src={GRUENDER_FOTO}
                alt="Alexander Pütter, Gründer von beuwy"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border border-line-subtle object-cover"
              />
              <p className="text-[13.5px] leading-snug text-ink-muted">
                <span className="font-medium text-ink-cream">Alexander Pütter</span> — Gründer
                beuwy, Ihr direkter Ansprechpartner im Projekt.
              </p>
            </div>

            <div className="mt-8 border-t border-line-subtle pt-8">
              <AvatarReihe text="Vertraut von führenden Maklern im DACH-Raum" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Block 5 — Mechanismus: 4 Säulen als Editorial-Rails ──────────────
   Nummer groß in GeistMono/tnum hellgrau (dieselbe Größenklasse wie
   .t-stat, aber Mono + gedämpfte Tinte statt Gold — bewusste, hier
   benannte Ausnahme von der Typo-Leiter, weil die Leiter keine
   Mono-Zifferngröße kennt). Rechts je Rail eine schmale Foto-Plate. */
type Saeule = {
  nr: string;
  titel: string;
  satz: string;
  hebel: string[];
  fotoSrc: string;
  position: string;
  alt: string;
};

const SAEULEN: Saeule[] = [
  {
    nr: "01",
    titel: "Marke & Design",
    satz: "Der Auftritt, der in drei Sekunden zeigt, in welcher Liga Sie spielen.",
    hebel: [
      "Bildsprache und Typografie laufen nach einem Styleguide — jedes Exposé sieht aus, als käme es von einer Marke, nicht von drei verschiedenen Praktikanten.",
      "Farbwelt und Ton sind auf Ihre Preisklasse kalibriert — der Eigentümer entscheidet in den ersten drei Sekunden, ob er weiterliest.",
      "Ein Markensystem statt Einzelauftrag: Logo, Visitenkarte, Exposé-Vorlage, Signatur — aus einer Hand, in einer Sprache.",
    ],
    fotoSrc: maklerAsset(3),
    position: "50% 32%",
    alt: "Kampagnenwelt von beuwy: Zwei Makler stimmen sich zu Marke und Design ab",
  },
  {
    nr: "02",
    titel: "Website & Experience",
    satz: "Die Seite, die lädt, bevor der Eigentümer zum nächsten Makler wechselt.",
    hebel: [
      "Ladezeit unter einer Sekunde — Eigentümer vergleichen drei Makler in fünf Minuten, wer zuerst da ist, wirkt wie das Büro, das sofort zurückruft.",
      "Exposés, die aussehen, wie das Objekt es verdient — und einen Alleinauftrag rechtfertigen, bevor Sie im Wohnzimmer sitzen.",
      "Immobilienbewertungs-Rechner qualifiziert Eigentümer nebenbei: Adresse rein, Ersteinschätzung raus, Lead mit Score im CRM.",
    ],
    fotoSrc: maklerAsset(4),
    position: "64% 42%",
    alt: "Kampagnenwelt von beuwy: Team plant eine Website-Struktur anhand von Grundrissen",
  },
  {
    nr: "03",
    titel: "E-Mail & Funnel",
    satz: "Keine Anfrage verhungert im Postfach, weil niemand zurückgerufen hat.",
    hebel: [
      "Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem CRM — kein Zettel, kein Copy-Paste, kein vergessener Rückruf.",
      "Follow-up-Automation: Wer heute nicht kauft, bekommt in sechs Monaten automatisch die richtige E-Mail.",
      "Personalisierte Datenmails zum konkreten Objekt — der Eigentümer bekommt eine Antwort, keine Massen-Mail.",
    ],
    fotoSrc: maklerAsset(5),
    position: "48% 38%",
    alt: "Kampagnenwelt von beuwy: Runde am Küchentresen bespricht Anfragen auf dem Tablet",
  },
  {
    nr: "04",
    titel: "Automatisierung",
    satz: "Modelle wechseln jede Woche, aber was bei Ihnen ankommt, bleibt einfach.",
    hebel: [
      "ChatGPT, Claude, Kimi, DeepSeek — jede Woche ein neues Modell, kaum einer hält Schritt, und ein Prompt liefert bestenfalls einen Text oder eine Mail, nie ein System.",
      "Terminanfragen sortieren sich selbst nach Dringlichkeit und Objektwert, bevor sie in Ihrem Kalender landen.",
      "Wöchentlicher Bericht statt Rätselraten: Anfragen, Quelle, Status — automatisch zusammengestellt, jeden Montag im Postfach.",
    ],
    fotoSrc: maklerAsset(6),
    position: "50% 40%",
    alt: "Kampagnenwelt von beuwy: Fünf Personen im Wohnraum, ein eingespieltes System",
  },
];

/* Der Integrations-Strip lebt seit 26.08 als gelbes Band im Spiegel-
   Block (Alex' Platzierung); Saeulen braucht c nur noch nicht mehr,
   behält die Prop aber für künftige Studio-Keys. */
function Saeulen({ c: _c }: { c: Record<string, string> }) {
  return (
    <section id="leistungen" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Der Mechanismus"
            titel="Vier Säulen tragen Ihren *Vorsprung*."
            sub="Marke, Website, E-Mail und Automatisierung — als ein System gebaut, nicht als vier separate Rechnungen."
          />
        </Reveal>

        <div className="mt-16 md:mt-20">
          {SAEULEN.map((saeule, i) => (
            <Reveal
              key={saeule.nr}
              delay={i * 40}
              className={`border-line-subtle py-12 first:pt-0 md:py-14 ${
                i > 0 ? "border-t" : ""
              }`}
            >
              <div className="grid gap-8 lg:grid-cols-[64px_1fr_300px] lg:items-start lg:gap-10">
                <p className="font-mono tnum text-[clamp(40px,5vw,60px)] font-medium leading-none tracking-[-0.01em] text-ink-dim/45">
                  {saeule.nr}
                </p>

                <div>
                  <h3 className="t-h3 text-[20px] md:text-[22px]">{saeule.titel}</h3>
                  <p className="t-body-lg mt-3 max-w-[46ch]">{saeule.satz}</p>
                  <ul className="mt-6 max-w-[54ch] space-y-3">
                    {saeule.hebel.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-dim/50"
                        />
                        <span className="t-body">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[20px] border border-line-subtle lg:mx-0">
                  <Image
                    src={saeule.fotoSrc}
                    alt={saeule.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 70vw"
                    className="object-cover"
                    style={{ objectPosition: saeule.position }}
                  />
                  <AiPille />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
