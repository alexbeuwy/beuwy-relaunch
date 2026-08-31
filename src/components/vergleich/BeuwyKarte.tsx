import Image from "next/image";
import { AiPille } from "@/components/AiPille";
import { Logo } from "@/components/Logo";
import { VasenTiefe } from "@/components/VasenTiefe";
import { maklerAsset } from "@/lib/cdn";
import { ExposeWechsler } from "./ExposeWechsler";
import { FaktenRotor } from "./FaktenRotor";
import { MailTipper } from "./MailTipper";
import { ReelKachel } from "./ReelKachel";
import drift from "./KachelDrift.module.css";

/**
 * Innenfläche der pastellgelben beuwy-Karte im Aha-Vergleich (Karte 2
 * von 2). R8-Umbau (Alex 31.08): schräge, überlappende Collage statt
 * braver Raster — jede Kachel minimal rotiert, in die Nachbarin
 * geschoben und mit eigener Scroll-Drift (KachelDrift.module.css,
 * "lenis-style"). Die beiden Reels kippen gegeneinander und
 * überlappen sich mit Schatten; die Mail-Kachel tippt fünf
 * verschiedene Makler-Mails; unten rotiert der FaktenRotor große
 * individuelle System-Sätze. beuwy-Wordmark oben rechts in der Karte
 * (Desktop) bzw. als Signatur unter der Collage (Mobil, oben hängt
 * dort die Vase an der Ecke).
 *
 * Rotationen/Überlappungen nur ab lg — mobil stapelt die Collage
 * gerade und ruhig. Server-Komponente, Studio-Texte über c[].
 */
export function BeuwyKarte({ c }: { c: Record<string, string> }) {
  const mailSaetze = [
    c["mk.vgl.bw.mail_satz"],
    c["mk.vgl.bw.mail_satz2"],
    c["mk.vgl.bw.mail_satz3"],
    c["mk.vgl.bw.mail_satz4"],
    c["mk.vgl.bw.mail_satz5"],
  ].filter(Boolean);
  const fakten = (c["mk.vgl.bw.fakten"] ?? "").split("|").map((f) => f.trim()).filter(Boolean);

  return (
    <div className="relative h-full p-8 md:p-12 lg:p-16">
      {/* Weicher Lichtfleck hinter der Collage — reine Tiefe, kein Inhalt */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-16 h-64 w-64 rounded-full bg-white/45 blur-3xl"
      />

      {/* beuwy-Wordmark oben rechts in der Karte (Desktop) — mobil
          hängt an dieser Ecke die Craspedia-Vase, dort wandert die
          Marke als Signatur unter die Collage. */}
      <div className="absolute right-10 top-10 hidden lg:block xl:right-16 xl:top-16">
        <Logo statisch height={20} />
      </div>

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
        <div
          className={`${drift.kachel} ${drift.c} relative col-span-12 min-h-[260px] overflow-hidden rounded-[24px] lg:col-span-7 lg:min-h-[340px] lg:-rotate-1 lg:shadow-[0_18px_50px_rgba(22,22,19,0.16)]`}
        >
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
        <div
          className={`${drift.kachel} ${drift.a} col-span-12 sm:col-span-6 lg:z-10 lg:col-span-5 lg:-ml-5 lg:mt-8 lg:rotate-[1.25deg] lg:shadow-[0_16px_44px_rgba(22,22,19,0.14)] lg:[border-radius:24px]`}
        >
          <ExposeWechsler titel={c["mk.vgl.bw.expose_titel"]} />
        </div>

        {/* Mail-Kachel: steigt in die Visual-Kachel hinein und tippt
            fuenf verschiedene Anlaesse im Loop */}
        <div
          className={`${drift.kachel} ${drift.b} col-span-12 lg:z-20 lg:col-span-7 lg:-mt-4 lg:self-start lg:-rotate-[0.75deg] lg:shadow-[0_20px_55px_rgba(22,22,19,0.2)] lg:[border-radius:24px]`}
        >
          <MailTipper titel={c["mk.vgl.bw.mail_titel"]} saetze={mailSaetze} />
        </div>

        {/* Reels: zwei echte Objekt-Reels, gegeneinander gekippt und
            ueberlappend — wie zwei Handy-Videos auf dem Tisch */}
        <div
          className={`${drift.kachel} ${drift.d} relative col-span-12 sm:col-span-6 lg:z-10 lg:col-span-5 lg:mt-6 lg:pl-4`}
        >
          <div className="relative mx-auto max-w-[420px] pb-10 pr-[34%] lg:mx-0 lg:max-w-none">
            <div className="-rotate-[3deg] shadow-[0_20px_50px_rgba(22,22,19,0.28)] [border-radius:20px]">
              <ReelKachel nummer="01" label={c["mk.vgl.bw.reel_label"]} />
            </div>
            <div className="absolute right-0 top-12 w-[58%] rotate-[4deg] shadow-[0_26px_60px_rgba(22,22,19,0.34)] [border-radius:20px]">
              <ReelKachel nummer="02" label={c["mk.vgl.bw.reel_label"]} />
            </div>
          </div>
        </div>
      </div>

      {/* Grosse Wechsel-Headline: Saetze, die nur ein System schreiben kann */}
      <div className="mt-12 border-t border-ink-cream/10 pt-10 lg:mt-16">
        <FaktenRotor label={c["mk.vgl.bw.fakten_label"] ?? ""} fakten={fakten} />
      </div>

      {/* Mobile Signatur: die Wortmarke, wo oben die Vase haengt */}
      <div className="mt-8 flex justify-end lg:hidden">
        <Logo statisch height={16} />
      </div>
    </div>
  );
}
