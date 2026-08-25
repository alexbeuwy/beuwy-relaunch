import Image from "next/image";
import { maklerAsset } from "@/lib/cdn";
import { rich } from "./RichText";
import stil from "./MaklerElemente.module.css";

/**
 * Gemeinsame Element-Bibliothek im Referenz-Stil (REFERENZ-ANALYSE.md,
 * GOAL Kriterium 4). Jede spätere Sektion baut auf diesen Bausteinen auf,
 * statt Layering/Karten/Marker neu zu erfinden — Server-Komponenten, rein
 * über Tokens (bg-akzent, akzent-wash, line-subtle, var(--duration-*)).
 * LogoSlot ist die einzige Ausnahme (Client-Fallback) und lebt in einer
 * eigenen Datei — siehe Re-Export unten.
 */

let stempelSeq = 0;

/** Funken-Glyph: acht Strahlen + Kern, selbst gezeichneter SVG-Pfad statt Icon-Import. */
function Funke({ groesse, farbe = "var(--ink-cream)" }: { groesse: number; farbe?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={groesse}
      height={groesse}
      fill="none"
      stroke={farbe}
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5M5.7 5.7l3 3M15.3 15.3l3 3M18.3 5.7l-3 3M8.7 15.3l-3 3" />
      <circle cx="12" cy="12" r="2.6" fill={farbe} stroke="none" />
    </svg>
  );
}

/**
 * StempelBadge — runder Stempel mit Kreistext, wie in der Referenz-Analyse
 * beschrieben (Kreistext + Kompass/Funken-Glyph, gelbe Fläche). Der
 * Textring dreht endlos und sehr langsam (40s, bewusste Ausnahme von der
 * Duration-Skala, siehe MaklerElemente.module.css); der Glyph in der Mitte
 * bleibt fix, damit er lesbar bleibt statt mitzudrehen — wie ein Siegel.
 * Absolut positionierbar über die className-Prop des Aufrufers: bringt
 * die className eine eigene position-Utility mit, setzt der Badge kein
 * "relative" — Tailwind sortiert "relative" hinter "absolute", der
 * Default würde den Aufrufer sonst still überschreiben (H2-Fund).
 */
export function StempelBadge({
  text,
  groesse = 112,
  className = "",
}: {
  text: string;
  groesse?: number;
  className?: string;
}) {
  const pfadId = `stempel-ring-${stempelSeq++}`;
  const bringtPosition = /(?:^|\s)!?(?:absolute|fixed|sticky|relative)(?:\s|$)/.test(className);
  return (
    <div
      className={`pointer-events-none select-none ${bringtPosition ? "" : "relative"} ${className}`}
      style={{ width: groesse, height: groesse }}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        width={groesse}
        height={groesse}
        className={`${stil.dreh} motion-reduce:animate-none`}
      >
        <circle cx="50" cy="50" r="49" fill="var(--akzent)" />
        <path id={pfadId} d="M 50 8 A 42 42 0 1 1 49.99 8" fill="none" />
        <text fontSize="7.2" fontWeight="600" letterSpacing="0.05em" fill="var(--ink-cream)">
          <textPath href={`#${pfadId}`} className="uppercase">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Funke groesse={groesse * 0.32} />
      </span>
    </div>
  );
}

/**
 * GelbeKarte — die gelbe Text-Karte aus Referenz 3, die eine Bildkante
 * überlappt (Label, große Serif-nahe Titelzeile, Fließtext). glyph=true
 * setzt den Funken oben drüber wie im Vorbild.
 */
export function GelbeKarte({
  label,
  titel,
  children,
  glyph = false,
  className = "",
}: {
  label: string;
  titel: string;
  children: React.ReactNode;
  glyph?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-[28px] bg-akzent px-7 py-8 sm:px-8 sm:py-9 ${className}`}>
      {glyph && (
        <span className="mb-3 block">
          <Funke groesse={20} />
        </span>
      )}
      <p className="t-label !text-ink-cream/60">{label}</p>
      <p className="mt-3 font-display text-[26px] leading-[1.18] tracking-[-0.015em] text-ink-cream [font-weight:640] [text-wrap:balance]">
        {titel}
      </p>
      <div className="mt-3 text-[14.5px] leading-[1.6] text-ink-cream/80">{children}</div>
    </div>
  );
}

/**
 * Highlight — der Marker-Effekt aus der Subline in Referenz 3: eine
 * <mark>-Wortgruppe mit gelber Fläche statt Fettschrift. stark=true nimmt
 * die kräftigere Akzentfläche für einzelne Schlüsselwörter.
 */
export function Highlight({
  children,
  stark = false,
  className = "",
}: {
  children: React.ReactNode;
  stark?: boolean;
  className?: string;
}) {
  return (
    <mark
      className={`-mx-0.5 rounded-[4px] px-1 text-inherit box-decoration-clone ${
        stark ? "bg-akzent/60" : "bg-akzent-wash"
      } ${className}`}
    >
      {children}
    </mark>
  );
}

/** Play-Dreieck als eigener Pfad, kein Icon-Import. */
function PlayDreieck() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="currentColor" aria-hidden>
      <path d="M0 1.13C0 .27.95-.25 1.67.2l10.3 6.37c.68.42.68 1.4 0 1.82L1.67 14.76C.95 15.21 0 14.69 0 13.83V1.13Z" />
    </svg>
  );
}

/**
 * PlayCta — Sekundär-CTA aus Referenz 2 ("In 90 Sekunden verstehen"):
 * runder weißer Button mit Haarlinie + Play-Dreieck, Label daneben.
 * Rendert als <a> (href gesetzt) oder <button> (onClick). Der
 * Hover-scale-105 auf dem Kreis ist eine bewusste, im Leaf-Auftrag
 * benannte Ausnahme vom scale-Verbot — punktuelle Play-Affordance,
 * kein Hover-Spam über die Seite verteilt.
 */
export function PlayCta({
  label,
  href,
  onClick,
  className = "",
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inhalt = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-subtle bg-white text-ink-cream transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-105">
        <PlayDreieck />
      </span>
      <span className="text-[14px] font-medium text-ink-cream">{label}</span>
    </>
  );
  const klassen = `group inline-flex items-center gap-3 ${className}`;

  if (href) {
    return (
      <a href={href} className={klassen}>
        {inhalt}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={klassen}>
      {inhalt}
    </button>
  );
}

/* AvatarReihe: feste Auswahl aus den 4 vorgegebenen Fotos, je mit
   Gesicht per object-position getroffen (in docs/redesign/refs/fotos/
   gesichtet — jedes Foto ist eine Personengruppe im Querformat, ein
   32px-Rund-Crop schneidet dabei nur links/rechts, nie oben/unten, also
   steuert allein die X-Position, welcher Kopf im Kreis landet). */
const AVATAR_FOTOS = [
  { nr: 2, position: "72% 38%" },
  { nr: 5, position: "34% 32%" },
  { nr: 7, position: "82% 35%" },
  { nr: 9, position: "58% 29%" },
] as const;

/**
 * AvatarReihe — überlappende Köpfe + Vertrauens-Zeile aus Referenz 3.
 * KEINE AiPille auf den 32px-Crops (unlesbar) — title="AI Visual" trägt
 * die Kennzeichnung stattdessen.
 */
export function AvatarReihe({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex -space-x-2">
        {AVATAR_FOTOS.map((foto) => (
          <span
            key={foto.nr}
            title="AI Visual"
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
          >
            <Image
              src={maklerAsset(foto.nr)}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
              style={{ objectPosition: foto.position }}
            />
          </span>
        ))}
      </div>
      <p className="t-body !text-ink-muted">{text}</p>
    </div>
  );
}

/**
 * SektionsKopf — einheitlicher Sektionseinstieg (Eyebrow, H2 mit
 * *Wort*-Gold über rich(), optionale Subline). ausrichtung="mitte"
 * zentriert Eyebrow/Titel/Sub für Sektionen ohne Split-Layout.
 */
export function SektionsKopf({
  eyebrow,
  titel,
  sub,
  ausrichtung = "links",
  className = "",
}: {
  eyebrow: string;
  titel: string;
  sub?: string;
  ausrichtung?: "links" | "mitte";
  className?: string;
}) {
  const mitte = ausrichtung === "mitte";
  return (
    <div className={`${mitte ? "mx-auto text-center" : ""} ${className}`}>
      <p className="t-label">{eyebrow}</p>
      <h2 className="t-h2 mt-4">{rich(titel)}</h2>
      {sub && <p className={`t-body-lg mt-4 max-w-[38rem] ${mitte ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}

/**
 * KreisDeko — das gelbe Kreis/Kreislinien-Paar aus Referenz 2 (Vollkreis +
 * feine Ringlinie, die hinter einer Bild-Plate hervorschauen). Die Gruppe
 * wird als Ganzes über className positioniert (absolute Koordinaten des
 * Aufrufers); die beiden Kreise sitzen relativ zueinander fest.
 */
export function KreisDeko({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute z-0 ${className}`} aria-hidden>
      <span className="absolute h-28 w-28 rounded-full bg-akzent/45" />
      <span className="absolute -bottom-8 -right-12 h-48 w-48 rounded-full border border-ink-yellow/20" />
    </span>
  );
}

/** Name -> Datei-Slug unter public/logos/. Deckt die 8 Häuser aus BRIEF §5/GOAL Kriterium 5 ab.
 *  Reine Daten — bewusst hier statt in LogoSlot.tsx, weil ein Server-Component-Baum keine
 *  Funktion aus einem "use client"-Modul aufrufen darf (nur dessen Komponenten rendern). */
export const MARKEN_SLUGS: Record<string, string> = {
  "ENGEL & VÖLKERS": "engel-voelkers",
  "VON POLL IMMOBILIEN": "von-poll",
  "DAHLER & COMPANY": "dahler",
  KENSINGTON: "kensington",
  "RE/MAX": "remax",
  McMakler: "mcmakler",
  Homeday: "homeday",
  BETTERHOMES: "betterhomes",
};

/** Fallback-Slug für Namen außerhalb der festen Map (Studio-Content ist frei editierbar). */
export function slugifyMarke(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* LogoSlot lebt in einer eigenen "use client"-Datei (onError braucht
   einen Browser-Event-Handler) und wird hier nur re-exportiert, damit
   alle Bausteine der Bibliothek über einen Importpfad erreichbar sind,
   ohne dass diese Datei selbst zur Client-Komponente wird. */
export { LogoSlot, Wortmarke } from "./LogoSlot";
