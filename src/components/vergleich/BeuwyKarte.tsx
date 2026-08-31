import Image from "next/image";
import { AiPille } from "@/components/AiPille";
import { maklerAsset } from "@/lib/cdn";
import { ReportKarte } from "./ReportKarte";
import { MailTipper } from "./MailTipper";
import { ReelKachel } from "./ReelKachel";

/**
 * Innenfläche der pastellgelben beuwy-Karte im neuen Aha-Vergleich
 * (Karte 2 von 2, DER Aha-Moment der Startseite): das kunterbunte,
 * geile Gegenstück zur grauen Massenware links. Rendert nur die
 * Innenfläche — Chassis, Hintergrund (bg-akzent) und Rahmen setzt der
 * Orchestrator. Server-Komponente, alle Studio-Texte kommen über c[].
 */
export function BeuwyKarte({ c }: { c: Record<string, string> }) {
  return (
    <div className="h-full p-8 md:p-12 lg:p-16">
      <p className="t-label !text-ink-cream/60">{c["mk.vgl.bw.label"]}</p>
      <h3 className="mt-3 font-display text-[clamp(26px,2.8vw,38px)] font-bold tracking-[-0.02em] text-ink-cream">
        {c["mk.vgl.bw.titel"]}
      </h3>
      <p className="t-body mt-4 max-w-[52ch]">{c["mk.vgl.bw.text"]}</p>

      <div className="mt-10 grid grid-cols-12 items-stretch gap-4 md:gap-5">
        {/* Visual-Kachel: die Kampagnenwelt als "Wow"-Beweisbild */}
        <div className="relative col-span-12 min-h-[260px] overflow-hidden rounded-[24px] lg:col-span-7 lg:min-h-[340px]">
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

        {/* Report-Kachel: der automatisierte Eigentümer-Report */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
          <ReportKarte
            titel={c["mk.vgl.bw.report_titel"]}
            sub={c["mk.vgl.bw.report_sub"]}
          />
        </div>

        {/* Mail-Kachel: die personalisierte Mail, live getippt */}
        <div className="col-span-12 lg:col-span-7">
          <MailTipper titel={c["mk.vgl.bw.mail_titel"]} satz={c["mk.vgl.bw.mail_satz"]} />
        </div>

        {/* Reel-Bereich: zwei echte Objekt-Reels aus dem RIEGEL-Projekt */}
        <div className="col-span-12 grid grid-cols-2 gap-4 sm:col-span-6 lg:col-span-5">
          <ReelKachel nummer="01" label={c["mk.vgl.bw.reel_label"]} />
          <ReelKachel nummer="02" label={c["mk.vgl.bw.reel_label"]} />
        </div>
      </div>
    </div>
  );
}
