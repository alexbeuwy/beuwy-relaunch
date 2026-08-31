import Image from "next/image";
import { AiPille } from "@/components/AiPille";
import { VasenTiefe } from "@/components/VasenTiefe";
import { maklerAsset } from "@/lib/cdn";
import { ExposeWechsler } from "./ExposeWechsler";
import { MailTipper } from "./MailTipper";
import { ReelKachel } from "./ReelKachel";

/**
 * Innenfläche der pastellgelben beuwy-Karte im Aha-Vergleich (Karte 2
 * von 2). R8-Umbau (Alex 31.08): kein braver Kachel-Raster mehr,
 * sondern eine leicht schräge, überlappende Collage — jede Kachel
 * minimal rotiert und in die Nachbarin geschoben, dazu eine Bokeh-
 * Ebene, die per Scroll-Parallax über die Collage driftet, und ein
 * weicher weißer Blur-Fleck hinter den Reels. Der generische
 * Report-Chart ist raus; an seiner Stelle wischt der ExposeWechsler
 * alle ~3 s durch Objektname, Adresse und Luftbild.
 *
 * Rotationen/Überlappungen nur ab lg — mobil stapelt die Collage
 * gerade und ruhig. Server-Komponente, Studio-Texte über c[].
 */
export function BeuwyKarte({ c }: { c: Record<string, string> }) {
  return (
    <div className="relative h-full p-8 md:p-12 lg:p-16">
      {/* Weicher Lichtfleck hinter der Collage — reine Tiefe, kein Inhalt */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-16 h-64 w-64 rounded-full bg-white/45 blur-3xl"
      />

      <p className="t-label !text-ink-cream/60">{c["mk.vgl.bw.label"]}</p>
      {/* pr unterhalb lg: die Craspedia-Vase haengt an der Karten-Ecke
          und darf die Headline nie anschneiden (Abnahme mobil, 31.08) */}
      <h3 className="mt-3 max-w-[24ch] pr-16 font-display text-[clamp(26px,2.8vw,38px)] font-bold tracking-[-0.02em] text-ink-cream md:pr-28 lg:pr-0">
        {c["mk.vgl.bw.titel"]}
      </h3>
      <p className="t-body mt-4 max-w-[52ch]">{c["mk.vgl.bw.text"]}</p>

      <div className="relative mt-10 grid grid-cols-12 items-stretch gap-4 md:gap-5 lg:gap-0">
        {/* Bokeh-Ebene: driftet beim Scrollen ueber Mail- und Exposé-Kachel */}
        <VasenTiefe variante="bokeh-klein" />

        {/* Visual-Kachel: die Kampagnenwelt als "Wow"-Beweisbild */}
        <div className="relative col-span-12 min-h-[260px] overflow-hidden rounded-[24px] lg:col-span-7 lg:min-h-[340px] lg:-rotate-1 lg:shadow-[0_18px_50px_rgba(22,22,19,0.16)]">
          <Image
            src={maklerAsset(11)}
            alt="Kampagnenwelt von beuwy: Eigentümer-Report auf dem Tablet, Ergebnis eines verkauften Objekts"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          {/* Gradient-Overlay AUF dem Foto — bewusste Ausnahme vom
              Gradient-Verbot im Seiten-UI, hier trägt er nur die
              Lesbarkeit der weißen Headline unten. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <AiPille className="!bottom-auto !top-4 right-4" />
          <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
            <p className="font-display text-[clamp(22px,2.3vw,32px)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              {c["mk.vgl.bw.visual_headline"]}
            </p>
            <p className="mt-1.5 text-[13px] text-white/70">{c["mk.vgl.bw.visual_sub"]}</p>
          </div>
        </div>

        {/* Exposé-Wechsler: schiebt sich schraeg ueber die Visual-Ecke */}
        <div className="col-span-12 sm:col-span-6 lg:z-10 lg:col-span-5 lg:-ml-5 lg:mt-8 lg:rotate-[1.25deg] lg:shadow-[0_16px_44px_rgba(22,22,19,0.14)] lg:[border-radius:24px]">
          <ExposeWechsler titel={c["mk.vgl.bw.expose_titel"]} />
        </div>

        {/* Mail-Kachel: steigt in die Visual-Kachel hinein */}
        <div className="col-span-12 lg:z-20 lg:col-span-7 lg:-mt-4 lg:-rotate-[0.75deg] lg:shadow-[0_20px_55px_rgba(22,22,19,0.2)] lg:[border-radius:24px]">
          <MailTipper titel={c["mk.vgl.bw.mail_titel"]} satz={c["mk.vgl.bw.mail_satz"]} />
        </div>

        {/* Reel-Bereich: zwei echte Objekt-Reels aus dem RIEGEL-Projekt */}
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:col-span-6 lg:z-10 lg:col-span-5 lg:-ml-3 lg:mt-5 lg:rotate-[1deg] lg:pl-2">
          <ReelKachel nummer="01" label={c["mk.vgl.bw.reel_label"]} />
          <ReelKachel nummer="02" label={c["mk.vgl.bw.reel_label"]} />
        </div>
      </div>
    </div>
  );
}
