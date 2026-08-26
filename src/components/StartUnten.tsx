import Image from "next/image";
import Link from "next/link";
import { AiPille } from "./AiPille";
import { rich } from "./RichText";
import { Reveal } from "./Reveal";
import { GelbeKarte, Highlight, KreisDeko, SektionsKopf, StempelBadge } from "./MaklerElemente";
import { TrustMeilensteine } from "./TrustMeilensteine";
import { PodcastSlot } from "./PodcastSlot";
import { ShowreelSlot } from "./ShowreelSlot";
import { WirkungsSpuren } from "./SchemaGrafiken";
import { caseBySlug, type CaseStudy } from "@/lib/cases";
import { makler9x16, maklerAsset } from "@/lib/cdn";
import stil from "./StartUnten.module.css";

/**
 * Startseite, Blöcke 6–10 (BRIEF §6): Beweis → Prozess → Qualifizierung →
 * FAQ → Finale. Reine Server-Komponente, ein Export. Baut ausschließlich
 * auf der Element-Bibliothek (MaklerElemente) und den Studio-Keys aus
 * MaklerHero (mk.stats.*, mk.hero.cta*) auf — neue Copy (Prozess-Schritte,
 * Quali-Listen, FAQ) ist bewusst hart im Code, siehe Report: das sind
 * Studio-Key-Wünsche, keine Content-Edits (Auftrag verbietet content.ts).
 */

/* ── kleine, selbst gezeichnete Glyphen — kein Icon-Import ── */

function Haken() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4.2 3.6 6.8 9 1.2" stroke="#161613" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Minus() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-medium" aria-hidden>
      <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
        <path d="M0 1h8" stroke="var(--ink-dim)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Pfeil({ groesse = 14 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ── Block 6 — Beweis: Case-Anriss (Feature → Hebel, BRIEF §8) ──
   Nur die immobiliennächsten, echten Fälle — RIEGEL zuerst, keine
   Beispielprojekte in dieser Rail. */
const CASE_ANRISS = [
  {
    slug: "riegel-immobilien",
    ergebnis:
      "Bewertungsrechner mit amtlichen Bodenrichtwerten, direkt an das Maklersystem angebunden. Jede Anfrage landet sofort im Ablauf, nicht im Postfach. Ergebnis: neun Abschlüsse, 342.000 € Volumen in sechs Wochen.",
  },
  {
    slug: "vision-group",
    ergebnis:
      "Auftritt und Pitch-Unterlagen, die eine Prüfung durch internationale Investoren bestehen. Aus dem Dreierteam wurden rund 70 Mitarbeiter. Die erste gemeinsame Transaktion mit KKR: 163 Wohneinheiten in Dingolfing.",
  },
] as const;

/* ── Block 7 — Prozess: vier Schritte, Marker in GeistMono ── */
const PROZESS_SCHRITTE = [
  {
    nr: "W1",
    titel: "Marke & Konzept",
    text: "In der ersten Woche stehen Positionierung, Bildsprache und die Wörter, die Ihren Preis rechtfertigen.",
  },
  {
    nr: "W2–3",
    titel: "Website & Funnel",
    text: "Ihr neuer Auftritt entsteht, samt Vorquali-Funnel und Terminbuchung. Er qualifiziert Anfragen, bevor Sie den Hörer in die Hand nehmen.",
  },
  {
    nr: "W4",
    titel: "Automationen & Anbindung",
    text: "CRM-Anbindung, Rückrufregel, Wochenbericht: Was bisher an Ihnen hing, läuft jetzt im System.",
  },
  {
    nr: "∞",
    titel: "Danach",
    text: "Anzeigen laufen, Anfragen landen im CRM, der Wochenbericht kommt von selbst. Ihre Aufgabe: die Termine wahrnehmen.",
  },
] as const;

/* ── Block 8 — Qualifizierung/Disqualifizierung, ehrlich ── */
const JA_LISTE = [
  "die absolute regionale Marktdominanz wollen — Omnipräsenz vom E-Mail-Postfach bis zur Social-Media-Story.",
  "die die Erste oder der Erste sein wollen, wenn jemand in ihrer Stadt an Immobilien denkt.",
  "die schnell entscheiden, sobald alle Informationen und Nachweise auf dem Tisch liegen.",
  "die Profis und Prozessen vertrauen — bewährte Abläufe, angepasst auf das eigene Haus.",
];
const NEIN_LISTE = [
  "Sie die billigste Lösung suchen.",
  "Systeme und Automatisierung Sie nicht interessieren.",
  "Ihnen egal ist, wie Ihr Auftritt wirkt.",
];

/* ── Block 9 — Einwände/FAQ ── */
const FAQ = [
  {
    q: "Was kostet das?",
    a: "Das hängt vom Umfang ab: Marke allein, oder Marke, Portal und Automationen zusammen. Wir klären das im ersten Gespräch, nicht vorher am Telefon mit einer Preisliste. Für die meisten Makler trägt sich die Investition über die Alleinaufträge, die dadurch entstehen.",
  },
  {
    q: "Wie schnell live?",
    a: "Vier bis sechs Wochen, je nach Umfang. Marke und Konzept stehen in Woche eins, Website und Funnel in Woche zwei und drei, Automationen und Anbindung in Woche vier.",
  },
  {
    q: "Muss ich Inhalte liefern?",
    a: "Texte, Struktur und die ersten Entwürfe kommen von uns. Sie liefern, was nur Sie haben: Ihre Zahlen und Ihre Objekte. Freigeben müssen Sie trotzdem, aber das dauert Minuten, keine Meetings.",
  },
  {
    q: "Funktioniert das mit onOffice/FLOWFACT?",
    a: "Ja. Portal, Rechner und Funnel docken an onOffice, FLOWFACT, Propstack, JUSTIMMO oder CasaOne an. Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem System. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf.",
  },
  {
    q: "Was passiert nach dem Livegang?",
    a: "Das System läuft weiter, nicht Sie hinterher. Anzeigen werden justiert, das CRM bleibt sauber, und Sie bekommen einen Wochenbericht statt eines Bauchgefühls.",
  },
];

/* ── Block 7b — „Und danach?": regionale Dominanz als Mockup-Streifen
   (Alex, 26.08). Vier cleane Silhouetten-Szenen mit einer „IHR LOGO"-
   Pill — Fahrzeug, Messestand, Stadionbande, Social-Story. Bewusst
   abstrakte Formen im Stil des ExposeVergleich-Schemas: kein Kitsch,
   keine Stockfotos; echte KI-Mockup-Fotos rüstet Alex als Assets nach. */
function LogoPill({ klein = false }: { klein?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-akzent font-semibold uppercase tracking-[0.08em] text-ink-cream ${
        klein ? "px-2 py-0.5 text-[8px]" : "px-2.5 py-1 text-[9.5px]"
      }`}
    >
      Ihr Logo
    </span>
  );
}

const DOMINANZ_SZENEN = [
  { titel: "Auf Ihren Fahrzeugen", Szene: SzeneFahrzeug },
  { titel: "Auf der Messe", Szene: SzeneMesse },
  { titel: "Im Stadion", Szene: SzeneStadion },
  { titel: "In jeder Story", Szene: SzeneStory },
] as const;

function SzeneFahrzeug() {
  return (
    <div aria-hidden className="relative flex h-28 items-end justify-center pb-3">
      <div className="relative h-16 w-40">
        {/* Transporter-Silhouette */}
        <div className="absolute bottom-2 left-0 right-0 top-0 rounded-[10px] rounded-tr-[22px] bg-bg-hover" />
        <div className="absolute bottom-2 right-1 top-2 w-10 rounded-tr-[18px] border-l border-white bg-bg-elevated" />
        <span className="absolute bottom-0 left-5 h-5 w-5 rounded-full border-[3px] border-bg-hover bg-white" />
        <span className="absolute bottom-0 right-7 h-5 w-5 rounded-full border-[3px] border-bg-hover bg-white" />
        <span className="absolute left-3 top-4">
          <LogoPill />
        </span>
      </div>
    </div>
  );
}

function SzeneMesse() {
  return (
    <div aria-hidden className="relative flex h-28 items-end justify-center gap-3 pb-3">
      {/* Rueckwand */}
      <div className="relative h-20 w-32 rounded-t-[10px] bg-bg-hover">
        <span className="absolute left-1/2 top-3 -translate-x-1/2">
          <LogoPill />
        </span>
        <span className="absolute bottom-3 left-4 right-4 h-[3px] rounded-full bg-white/70" />
        <span className="absolute bottom-6 left-4 right-10 h-[3px] rounded-full bg-white/70" />
      </div>
      {/* Theke */}
      <div className="relative h-12 w-14 rounded-t-[8px] bg-bg-elevated">
        <span className="absolute left-1/2 top-3 -translate-x-1/2">
          <LogoPill klein />
        </span>
      </div>
    </div>
  );
}

function SzeneStadion() {
  return (
    <div aria-hidden className="relative flex h-28 flex-col justify-end gap-1.5 pb-3">
      {/* Rasen-Andeutung + Bande in leichter Perspektive */}
      <div className="relative mx-2 flex h-9 items-center justify-around rounded-[6px] bg-bg-hover [transform:perspective(300px)_rotateX(18deg)]">
        <LogoPill klein />
        <span className="hidden h-[3px] w-10 rounded-full bg-white/70 sm:block" />
        <LogoPill klein />
      </div>
      <div className="mx-6 h-2 rounded-full bg-akzent-wash" />
    </div>
  );
}

function SzeneStory() {
  return (
    <div aria-hidden className="relative flex h-28 items-center justify-center">
      {/* Phone-Rahmen mit Story-Balken */}
      <div className="relative h-24 w-14 rounded-[10px] border-2 border-bg-hover bg-white p-1.5">
        <span className="absolute left-1.5 right-1.5 top-1.5 flex gap-1">
          <span className="h-[3px] flex-1 rounded-full bg-akzent" />
          <span className="h-[3px] flex-1 rounded-full bg-bg-hover" />
          <span className="h-[3px] flex-1 rounded-full bg-bg-hover" />
        </span>
        <span className="absolute inset-x-1.5 bottom-1.5 top-4 overflow-hidden rounded-[6px] bg-bg-elevated">
          <Image src={makler9x16("01")} alt="" fill sizes="56px" className="object-cover" />
        </span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LogoPill klein />
        </span>
      </div>
    </div>
  );
}

export function StartUnten({ c }: { c: Record<string, string> }) {
  const cases: { slug: string; ergebnis: string; fall: CaseStudy }[] = [];
  for (const eintrag of CASE_ANRISS) {
    const fall = caseBySlug(eintrag.slug);
    if (fall) cases.push({ ...eintrag, fall });
  }

  return (
    <>
      {/* ══ Block 6 — Beweis ══════════════════════════════════════ */}
      <section id="ergebnisse" className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <SektionsKopf
              eyebrow="Beweis"
              titel="Sie müssen uns nicht glauben. *Rechnen* Sie nach."
              sub="Drei Häuser, drei Größenordnungen — zum Nachlesen, nicht zum Glauben."
            />
          </Reveal>

          {/* Punchline statt Zahlengrab (Alex, 26.08) + Podcast-Beleg */}
          <Reveal delay={60}>
            <div className="mt-16 grid items-center gap-12 border-t border-line-subtle pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <p className="font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink-cream [text-wrap:balance]">
                  {rich("*17 Jahre* Markenarbeit. Und bei KI vorne dabei — nicht hinterher.")}
                </p>
                <p className="t-body-lg mt-5 max-w-[44ch]">
                  Was diese Woche an Modellen erscheint, steckt nächste Woche in unseren
                  Abläufen. Nicht als Experiment, sondern als Arbeit, die Ihr Team nicht
                  mehr machen muss.
                </p>
              </div>
              <PodcastSlot
                videoUrl={c["mk.podcast.url"]}
                titel={c["mk.podcast.titel"] ?? ""}
                sub={c["mk.podcast.sub"] ?? ""}
              />
            </div>
          </Reveal>

          {/* Meilenstein-Kacheln + Kundenlogos (BRIEF §9, Alex 26.08):
              die Größenordnungen, kein Personenkult. */}
          <Reveal delay={80}>
            <div className="mt-20">
              <TrustMeilensteine c={c} />
            </div>
          </Reveal>

          {/* Vorher/Nachher je Fall — eigene Skala pro Einheit, nur
              belegte Zahlen (die zwei als Beispielprojekt markierten
              Fallstudien stehen bewusst NICHT hier). */}
          <Reveal delay={90}>
            <div className="mt-14 border-t border-line-subtle pt-14">
              <p className="t-label !text-[10.5px]">Was danach messbar passiert ist</p>
              <div className="mt-8">
                <WirkungsSpuren />
              </div>
            </div>
          </Reveal>

          {cases.length > 0 && (
            <Reveal delay={100}>
              <div className="mt-24 grid gap-12 border-t border-line-subtle pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full">
                  <Image
                    src={maklerAsset(7)}
                    alt="Fünf Personen besprechen Baupläne an einer Kücheninsel — Symbolbild für ein beuwy-Projekt"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                  <AiPille />
                </div>

                <div className="flex flex-col divide-y divide-line-subtle">
                  {cases.map(({ slug, ergebnis, fall }) => (
                    <Link
                      key={slug}
                      href={`/cases/${slug}`}
                      className="group block py-8 first:pt-0 last:pb-0"
                    >
                      <p className="t-label">{fall.branche}</p>
                      <h3 className="mt-2 font-display text-[26px] font-bold tracking-[-0.015em] text-ink-cream">
                        {fall.kunde}
                      </h3>
                      <p className="mt-3 t-body max-w-[52ch]">{ergebnis}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:decoration-ink-cream">
                        Fallstudie ansehen
                        <span className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5">
                          <Pfeil groesse={12} />
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ Block 7 — Prozess (Einwand Zeit) ══════════════════════ */}
      <section id="ablauf" className="bg-bg-base border-t border-line-subtle">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="t-label">Vier Schritte, ein Zeitplan</p>
            <h2 className="mt-4 t-h2 max-w-[720px]">
              {rich("In *Wochen* liefern, was andere in Quartalen versprechen.")}
            </h2>
          </Reveal>

          <Reveal delay={60}>
            <div className="relative mt-12 aspect-[21/10] w-full overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(8)}
                alt="Drei Personen im Gespräch in einer hellen Küche — Symbolbild für die Zusammenarbeit mit beuwy"
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <AiPille />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-[13px] hidden h-px bg-line-subtle lg:block"
              />
              {PROZESS_SCHRITTE.map((schritt) => (
                <div key={schritt.titel} className="relative">
                  <span className="relative z-10 grid h-[26px] w-[26px] place-items-center rounded-full bg-akzent">
                    <span className="font-mono text-[10.5px] font-semibold text-ink-cream tnum">{schritt.nr}</span>
                  </span>
                  <h3 className="mt-5 t-h3">{schritt.titel}</h3>
                  <p className="mt-2 t-body">{schritt.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-16 max-w-[54ch] t-body-lg">
              Jedes Ihrer Anliegen läuft in einem Ticketsystem — nachweisbar, mit Status,
              bis es erledigt ist. Kein Wunsch bleibt offen, und niemand fragt nach zwei Wochen:
              Wie weit ist mein Dokument? Mein Rechner? Meine Anpassung?
            </p>
          </Reveal>

          <Reveal delay={210}>
            <GelbeKarte
              label="Ihr Aufwand"
              titel="Vier Termine reichen."
              glyph
              className="mt-16 max-w-[520px] ml-auto"
            >
              Den Rest liefern wir: Marke, Portal, Funnel, Automationen. Fertig in Wochen, nicht in Quartalen.
            </GelbeKarte>
          </Reveal>

          {/* „Und danach?" — die Wahrnehmung, für die das alles gebaut wird */}
          <Reveal delay={120}>
            <div className="mt-24 border-t border-line-subtle pt-16">
              <p className="t-label">Und danach?</p>
              <h3 className="mt-4 t-h2 max-w-[720px]">
                {rich("Dann sieht Ihre Stadt Sie *überall*.")}
              </h3>
              <p className="t-body-lg mt-5 max-w-[54ch]">
                Absolute regionale Dominanz: Ihre Marke im Postfach, in der Story, auf der
                Straße und am Spielfeldrand — bis der erste Gedanke bei „Immobilien" Ihr
                Name ist.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
                {DOMINANZ_SZENEN.map(({ titel, Szene }) => (
                  <div
                    key={titel}
                    className="rounded-[20px] border border-line-subtle bg-white px-4 pb-4 pt-2"
                  >
                    <Szene />
                    <p className="mt-2 border-t border-line-subtle pt-3 text-center text-[12.5px] font-medium text-ink-cream">
                      {titel}
                    </p>
                  </div>
                ))}
              </div>
              {/* Der große Kampagnen-Zusammenschnitt — 7,5 MB, deshalb
                  ausschließlich klick-initiiert (BRIEF §9) */}
              <ShowreelSlot className="mt-6" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Block 8 — Qualifizierung/Disqualifizierung ═══════════ */}
      <section id="passt-das" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <SektionsKopf eyebrow="Passt das zu Ihnen?" titel="beuwy passt nicht zu *jedem*." ausrichtung="mitte" />
            <p className="t-body-lg mx-auto mt-4 max-w-[38rem] text-center">
              Das ist <Highlight>Absicht</Highlight>, nicht Marketing.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr_260px] lg:gap-12">
              <div>
                <p className="t-label">Wir arbeiten mit Maklern, die …</p>
                <ul className="mt-6 flex flex-col divide-y divide-line-subtle">
                  {JA_LISTE.map((zeile) => (
                    <li key={zeile} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                      <Haken />
                      <span className="t-body !text-ink-cream">{zeile}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="t-label">Nicht die richtige Wahl, wenn …</p>
                <ul className="mt-6 flex flex-col divide-y divide-line-subtle">
                  {NEIN_LISTE.map((zeile) => (
                    <li key={zeile} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                      <Minus />
                      <span className="t-body">{zeile}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-[24px] lg:mx-0">
                <Image
                  src={maklerAsset(9)}
                  alt="Drei Personen auf einer Dachterrasse bei Sonnenuntergang — Symbolbild für Immobilienunternehmer, die mit beuwy arbeiten"
                  fill
                  sizes="260px"
                  className="object-cover"
                  style={{ objectPosition: "38% 30%" }}
                />
                <AiPille />
                <StempelBadge text="AUSGEWÄHLT · NICHT FÜR ALLE" groesse={92} className="absolute -right-6 -top-6" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Block 9 — Einwände/FAQ ════════════════════════════════ */}
      <section id="faq" className="bg-bg-base border-t border-line-subtle">
        <div className="mx-auto max-w-[760px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="t-label">Bevor Sie fragen</p>
            <h2 className="mt-4 t-h2">{rich("Die *Antworten*, die vorher kommen.")}</h2>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-12">
              {FAQ.map((item, i) => (
                <details key={item.q} className={stil.item} open={i === 0}>
                  <summary className={stil.summary}>
                    <span className="t-h3 pr-4">{item.q}</span>
                    <span className={stil.icon}>
                      <PlusIcon />
                    </span>
                  </summary>
                  <div className={stil.body}>
                    <p className="t-body">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Block 10 — Finale ═════════════════════════════════════ */}
      <section id="jetzt" className="relative overflow-hidden bg-bg-base">
        <KreisDeko className="left-[6%] top-4 lg:left-[10%] lg:top-0" />
        <div className="relative z-10 mx-auto max-w-[820px] px-6 py-32 text-center lg:py-44">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="mt-6 font-display text-[clamp(34px,4.6vw,60px)] font-bold leading-[1.05] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
              {rich("Ihr Ruf ist erstklassig. *Zeit*, dass man es sieht.")}
            </h2>
            <div className="mt-12 flex flex-col items-center gap-4">
              <Link
                href="/anfrage"
                className="group inline-flex items-center gap-3 rounded-full bg-akzent px-9 py-4 text-[16px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
              >
                {c["mk.hero.cta"]}
                <span className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5">
                  <Pfeil groesse={15} />
                </span>
              </Link>
              <span className="t-small">{c["mk.hero.cta_hinweis"]}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
