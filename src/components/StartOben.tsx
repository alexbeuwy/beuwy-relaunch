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
import { PerformanceStory } from "./PerformanceStory";
import { rich } from "./RichText";
import { GRUENDER_FOTO, LOFT_VIDEO, maklerAsset } from "@/lib/cdn";
import { AmbientVideo } from "./AmbientVideo";
import { VasenTiefe } from "./VasenTiefe";
import { SpiegelFokus } from "./motion/SpiegelFokus";
import { VergleichBuehne } from "./vergleich/VergleichBuehne";
import { StandardKarte } from "./vergleich/StandardKarte";
import { BeuwyKarte } from "./vergleich/BeuwyKarte";

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

/**
 * Block 5b — Performance-Marketing als Schema (BRIEF §9): wie aus
 * Aufmerksamkeit von außen systematisch registrierte Kontakte werden.
 * Alle Texte inkl. der Stationen/Visuals in PerformanceStory und der
 * Endlos-Zahl in MandateLoop laufen über die mk.pm.*-Keys.
 */
function PerformanceMarketing({ c }: { c: Record<string, string> }) {
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={c["mk.pm.eyebrow"]}
            titel={c["mk.pm.titel"]}
            sub={c["mk.pm.sub"]}
            ausrichtung="mitte"
          />
        </Reveal>
        <div className="mt-14">
          <PerformanceStory
            quote={c["mk.pm.quote"]}
            mandate={c["mk.pm.mandate"]}
            provision={c["mk.pm.provision"]}
            stationen={[
              {
                schritt: c["mk.pm.station.1.schritt"],
                titel: c["mk.pm.station.1.titel"],
                satz: c["mk.pm.station.1.satz"],
              },
              {
                schritt: c["mk.pm.station.2.schritt"],
                titel: c["mk.pm.station.2.titel"],
                satz: c["mk.pm.station.2.satz"],
              },
              {
                schritt: c["mk.pm.station.3.schritt"],
                titel: c["mk.pm.station.3.titel"],
                satz: c["mk.pm.station.3.satz"],
              },
            ]}
            adLabel={c["mk.pm.ad_label"]}
            funnelLabels={[c["mk.pm.funnel_label1"], c["mk.pm.funnel_label2"], c["mk.pm.funnel_label3"]]}
            funnelCaption={c["mk.pm.funnel_caption"]}
            kontaktLabel={c["mk.pm.kontakt_label"]}
            kontaktTitel={c["mk.pm.kontakt_titel"]}
            kontaktText={c["mk.pm.kontakt_text"]}
            dreamVor={c["mk.pm.dream_vor"]}
            dreamNach={c["mk.pm.dream_nach"]}
            dreamLabel={c["mk.pm.dream_label"]}
            loopLabel={c["mk.pm.loop_label"]}
            faktorVor={c["mk.pm.loop_faktor_vor"]}
            faktorNach={c["mk.pm.loop_faktor_nach"]}
            summeText={c["mk.pm.loop_summe_text"]}
          />
        </div>
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

/**
 * Block 2 — Spiegel: Ego + Problem. Bild links (Referenz-3-Plate +
 * StempelBadge auf der Ecke), Text rechts — bewusste Umkehr der
 * Hero-Anordnung (dort Text links, Medium rechts).
 */
function Spiegel({ c }: { c: Record<string, string> }) {
  const integrationen = (c["mk.integrationen.namen"] ?? "")
    .split("|")
    .map((n) => n.trim())
    .filter(Boolean);

  return (
    <section className="relative bg-bg-base py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* SpiegelFokus (R7): Die Headline steht sofort scharf im Fokus,
            Plate und Folgetext (data-fokus="spaet") starten unscharf/
            gedimmt und decken sich beim Scrollen gestaffelt auf. */}
        <SpiegelFokus>
          <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div data-fokus="spaet" className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:max-w-none">
              <KreisDeko className="-left-8 -top-8 hidden md:-left-12 md:-top-10 lg:block" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-line-subtle">
                {/* Loft-Video als Ambient-Plate — Poster steht sofort,
                    die 5,2 MB laden erst kurz vorm Viewport (BRIEF §9) */}
                <AmbientVideo
                  videoSrc={LOFT_VIDEO}
                  posterSrc={maklerAsset(2)}
                  alt="Kampagnenwelt von beuwy: Loft-Szene in der Golden Hour"
                  sizes="(min-width: 1024px) 46vw, 90vw"
                />
                <AiPille />
              </div>
              <StempelBadge
                text={c["mk.spiegel.badge"]}
                groesse={104}
                className="absolute -right-5 -top-5 z-10 md:-right-7 md:-top-7"
              />
              {/* Bokeh-Vase ueberlappt die Plate-Ecke (Anker am Wrapper) */}
              <VasenTiefe />
            </div>

            <div>
              <SektionsKopf eyebrow={c["mk.spiegel.eyebrow"]} titel={c["mk.spiegel.titel"]} />
              <div className="mt-9 space-y-6 border-t border-line-subtle pt-9">
                <p data-fokus="spaet" className="t-body-lg max-w-[42ch]">
                  {c["mk.spiegel.p1"]}
                </p>
                <p data-fokus="spaet" className="t-body-lg max-w-[42ch]">
                  {c["mk.spiegel.p2"]}
                </p>
                <p data-fokus="spaet" className="t-body-lg max-w-[42ch]">
                  {c["mk.spiegel.p3_vor"]} <Highlight>{c["mk.spiegel.p3_stark"]}</Highlight>.
                </p>
              </div>
            </div>
          </div>
        </SpiegelFokus>

        {/* Integrations-Band (Alex, 26.08): Pastellgelb mit dunklen
         * Logos, direkt unter dem Spiegel-Argument — die Tools, die
         * das Haus schon nutzt, docken hier an. Bewusste zweite
         * Gelb-Fläche in diesem Block auf Alex' Wunsch. */}
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

/**
 * Block 3 — Feindbild Baukasten: Abgrenzung. Vollbreiten-Band
 * bg-bg-elevated. Zwei nüchterne Listen statt Karten-Spam, kein
 * Wettbewerbername (BRIEF §5). Listen-Texte: mk.abgrenzung.baukasten.*
 * / mk.abgrenzung.beuwy.* (von Hand nummeriert, vier Einträge je Liste).
 */
function baukastenPunkte(c: Record<string, string>): string[] {
  return [1, 2, 3, 4].map((n) => c[`mk.abgrenzung.baukasten.${n}.text`]); // studio:ok (Key-Template, kein Text)
}

function beuwyPunkte(c: Record<string, string>): string[] {
  return [1, 2, 3, 4].map((n) => c[`mk.abgrenzung.beuwy.${n}.text`]); // studio:ok (Key-Template, kein Text)
}

function Abgrenzung({ c }: { c: Record<string, string> }) {
  return (
    <section className="relative bg-bg-elevated py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={c["mk.vgl.abgr.eyebrow"]}
            titel={c["mk.vgl.abgr.titel"]}
            sub={c["mk.vgl.abgr.sub"]}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={60}>
            <p className="t-label">{c["mk.abgrenzung.baukasten_label"]}</p>
            <ul className="mt-6 space-y-5 border-t border-line-subtle pt-6">
              {baukastenPunkte(c).map((punkt) => (
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
              {beuwyPunkte(c).map((punkt) => (
                <li key={punkt} className="flex items-start gap-3.5">
                  <Haken />
                  <span className="t-body pt-0.5 !text-ink-cream">{punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

      </div>

      {/* DER Aha-Moment (R7, Alex 31.08): zwei volle-Breite-Karten je
          ~55vh — die graue Standard-Realitaet bleibt sticky stehen, die
          pastellgelbe beuwy-Welt schiebt sich beim Scrollen darueber.
          Bewusst BREITER als der 1200er-Content (eigene Buehne). */}
      <div className="relative z-10 mx-auto mt-16 max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={c["mk.vgl.eyebrow"]}
            titel={c["mk.vgl.titel"]}
            sub={c["mk.vgl.sub"]}
          />
        </Reveal>
      </div>
      <div className="mx-auto mt-12 w-full max-w-[1520px] px-4 sm:px-6 lg:px-8">
        <VergleichBuehne karteA={<StandardKarte c={c} />} karteB={<BeuwyKarte c={c} />} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal delay={160}>
          <p className="mt-16 max-w-[42ch] text-[20px] font-medium leading-snug tracking-[-0.012em] text-ink-cream md:mt-20 md:text-[24px]">
            {rich(c["mk.vgl.punchline"])}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Block 4 — VSL-Slot + Kernversprechen. Links das 9:16-Video, rechts
 * die gelbe Karte mit dem Versprechen, dem Play-Hinweis (springt per
 * Anker zurück zum Video) und der Avatar-Reihe.
 */
function VslKernversprechen({ c }: { c: Record<string, string> }) {
  return (
    <section id="vsl" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          {/* VSL-Poster: maklerAsset(14) lädt intern in VslSlot.tsx über posterNummer. */}
          <Reveal className="mx-auto w-full max-w-[340px] lg:mx-0">
            <VslSlot posterNummer={14} videoUrl={c["mk.vsl.url"]} platzhalterText={c["mk.vsl.platzhalter"]} />
          </Reveal>

          <Reveal delay={90}>
            <GelbeKarte
              label={c["mk.vsl.karte_label"]}
              titel={c["mk.vsl.karte_titel"]}
              glyph
              className="max-w-[34rem]"
            >
              {c["mk.vsl.karte_text"]}
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
              <span className="text-[14px] font-medium text-ink-cream">{c["mk.vsl.link_text"]}</span>
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
                <span className="font-medium text-ink-cream">{c["mk.vsl.byline_name"]}</span>{" "}
                {c["mk.vsl.byline_rolle"]}
              </p>
            </div>

            <div className="mt-8 border-t border-line-subtle pt-8">
              <AvatarReihe text={c["mk.vsl.avatar_text"]} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Block 5 — Mechanismus: 4 Säulen als Editorial-Rails. Nummer groß in
 * GeistMono/tnum hellgrau (dieselbe Größenklasse wie .t-stat, aber
 * Mono + gedämpfte Tinte statt Gold — bewusste, hier benannte Ausnahme
 * von der Typo-Leiter, weil die Leiter keine Mono-Zifferngröße kennt).
 * Rechts je Rail eine schmale Foto-Plate. Texte: mk.saeulen.1..4.* —
 * fotoSrc/position/alt bleiben strukturell im Code (kein Studio-Text).
 */
type Saeule = {
  nr: string;
  titel: string;
  satz: string;
  hebel: string[];
  fotoSrc: string;
  position: string;
  alt: string;
};

function saeulen(c: Record<string, string>): Saeule[] {
  return [
    {
      nr: c["mk.saeulen.1.nr"],
      titel: c["mk.saeulen.1.titel"],
      satz: c["mk.saeulen.1.satz"],
      hebel: [c["mk.saeulen.1.hebel1"], c["mk.saeulen.1.hebel2"], c["mk.saeulen.1.hebel3"]],
      fotoSrc: maklerAsset(3),
      position: "50% 32%",
      alt: "Kampagnenwelt von beuwy: Zwei Makler stimmen sich zu Marke und Design ab",  // studio:ok (alt-Text, kein Studio-Key)
    },
    {
      nr: c["mk.saeulen.2.nr"],
      titel: c["mk.saeulen.2.titel"],
      satz: c["mk.saeulen.2.satz"],
      hebel: [c["mk.saeulen.2.hebel1"], c["mk.saeulen.2.hebel2"], c["mk.saeulen.2.hebel3"]],
      fotoSrc: maklerAsset(4),
      position: "64% 42%",
      alt: "Kampagnenwelt von beuwy: Team plant eine Website-Struktur anhand von Grundrissen",  // studio:ok (alt-Text, kein Studio-Key)
    },
    {
      nr: c["mk.saeulen.3.nr"],
      titel: c["mk.saeulen.3.titel"],
      satz: c["mk.saeulen.3.satz"],
      hebel: [c["mk.saeulen.3.hebel1"], c["mk.saeulen.3.hebel2"], c["mk.saeulen.3.hebel3"]],
      fotoSrc: maklerAsset(5),
      position: "48% 38%",
      alt: "Kampagnenwelt von beuwy: Runde am Küchentresen bespricht Anfragen auf dem Tablet",  // studio:ok (alt-Text, kein Studio-Key)
    },
    {
      nr: c["mk.saeulen.4.nr"],
      titel: c["mk.saeulen.4.titel"],
      satz: c["mk.saeulen.4.satz"],
      hebel: [c["mk.saeulen.4.hebel1"], c["mk.saeulen.4.hebel2"], c["mk.saeulen.4.hebel3"]],
      fotoSrc: maklerAsset(6),
      position: "50% 40%",
      alt: "Kampagnenwelt von beuwy: Fünf Personen im Wohnraum, ein eingespieltes System",  // studio:ok (alt-Text, kein Studio-Key)
    },
  ];
}

/* Der Integrations-Strip lebt seit 26.08 als gelbes Band im Spiegel-
   Block (Alex' Platzierung). */
function Saeulen({ c }: { c: Record<string, string> }) {
  return (
    <section id="leistungen" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow={c["mk.saeulen.eyebrow"]}
            titel={c["mk.saeulen.titel"]}
            sub={c["mk.saeulen.sub"]}
          />
        </Reveal>

        <div className="mt-16 md:mt-20">
          {saeulen(c).map((saeule, i) => (
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
