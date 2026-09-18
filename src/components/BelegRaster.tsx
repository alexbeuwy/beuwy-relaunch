"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { KURVEN } from "@/lib/kunden-kurven";
import { START_BLOECKE_DEFAULTS as D } from "@/lib/texte/start-bloecke";

/**
 * Beleg-Raster — die Proof-Stufe als Bento.
 *
 * Ersetzt das alte Zahlenband aus drei nackten Werten. Kacheln
 * unterschiedlicher Größe, weil die Belege unterschiedliches Gewicht
 * haben: der Umsatzverlauf trägt die Sektion, eine Auszeichnung braucht
 * eine Zeile, eine Zahl braucht ein Feld.
 *
 * REGEL: Auf jeder Kachel steht nur, was belegt ist, und jede nennt ihre
 * Herkunft. Keine erfundenen Benachrichtigungen, keine Geldeingänge, die
 * es nicht gab — das Vokabular von Coaching-Trichtern ist genau das,
 * wovon sich diese Seite absetzt.
 *
 * BelegRaster wird aktuell von keiner Seite aufgerufen (R11, 14.09,
 * grep bestätigt) — StartOben/StartUnten binden diese Kachel nicht ein.
 * Jede Kachel-Zeile ist trotzdem als optionaler Prop mit Default aus den
 * mk.belege.*-Keys (START_BLOECKE_DEFAULTS) ausgeführt: ohne Aufrufer
 * rendert `<BelegRaster />` zeichengenau wie bisher; verdrahtet ein
 * künftiger Server-Aufrufer `c` aus getContent(), werden die Kacheln
 * live Studio-editierbar, ohne dass diese Datei sich ändern muss.
 */

/* Der Umsatzstrang von Königswege trägt die große Kachel. */
const UMSATZ = KURVEN[0].straenge.find((s) => s.id === "provision")!;

function Sparkline() {
  const werte = UMSATZ.punkte.map((p) => p.wert);
  const max = Math.max(...werte);
  const min = Math.min(...werte);
  const spanne = max - min || 1;
  const d = werte
    .map((w, i) => `${(i / (werte.length - 1)) * 100},${34 - ((w - min) / spanne) * 30}`) // studio:ok (SVG-Punkte, kein Text)
    .join(" ");
  return (
    <svg className="bento-spark" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function BelegRaster({
  umsatzLabel = D["mk.belege.umsatz_label"],
  umsatzWert = D["mk.belege.umsatz_wert"],
  umsatzText = D["mk.belege.umsatz_text"],
  umsatzQuelle = D["mk.belege.umsatz_quelle"],
  awardLabel = D["mk.belege.award_label"],
  awardWert = D["mk.belege.award_wert"],
  awardText = D["mk.belege.award_text"],
  awardQuelle = D["mk.belege.award_quelle"],
  partnerLabel = D["mk.belege.partner_label"],
  partnerWert = D["mk.belege.partner_wert"],
  partnerText = D["mk.belege.partner_text"],
  partnerQuelle = D["mk.belege.partnerquelle"],
  exposeLabel = D["mk.belege.expose_label"],
  exposeWert = D["mk.belege.expose_wert"],
  exposeText = D["mk.belege.expose_text"],
  exposeQuelle = D["mk.belege.expose_quelle"],
  visionLabel = D["mk.belege.vision_label"],
  visionAussage1 = D["mk.belege.visionsatzeins"],
  visionAussage2Vor = D["mk.belege.visionsatzzweivor"],
  visionAussage2Em = D["mk.belege.visionsatzzweiem"],
  visionText = D["mk.belege.vision_text"],
  visionQuelle = D["mk.belege.vision_quelle"],
  riegelLabel = D["mk.belege.riegel_label"],
  riegelWert = D["mk.belege.riegel_wert"],
  riegelText = D["mk.belege.riegel_text"],
  riegelMehr = D["mk.belege.riegel_mehr"],
}: {
  umsatzLabel?: string;
  umsatzWert?: string;
  umsatzText?: string;
  umsatzQuelle?: string;
  awardLabel?: string;
  awardWert?: string;
  awardText?: string;
  awardQuelle?: string;
  partnerLabel?: string;
  partnerWert?: string;
  partnerText?: string;
  partnerQuelle?: string;
  exposeLabel?: string;
  exposeWert?: string;
  exposeText?: string;
  exposeQuelle?: string;
  visionLabel?: string;
  visionAussage1?: string;
  visionAussage2Vor?: string;
  visionAussage2Em?: string;
  visionText?: string;
  visionQuelle?: string;
  riegelLabel?: string;
  riegelWert?: string;
  riegelText?: string;
  riegelMehr?: string;
} = {}) {
  return (
    <div className="bento">
      {/* Groß: der Umsatzverlauf, der die Sektion traegt */}
      <Reveal className="bento-zelle bento-zelle--gross">
        <div className="bento-karte bento-karte--akzent">
          <p className="bento-label">{umsatzLabel}</p>
          <p className="bento-wert tnum">{umsatzWert}</p>
          <p className="bento-text">{umsatzText}</p>
          <Sparkline />
          <p className="bento-quelle">{umsatzQuelle}</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--hoch" delay={60}>
        <div className="bento-karte bento-karte--schein">
          <p className="bento-label">{awardLabel}</p>
          <p className="bento-wert tnum">{awardWert}</p>
          <p className="bento-text">{awardText}</p>
          <p className="bento-quelle">{awardQuelle}</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle" delay={100}>
        <div className="bento-karte">
          <p className="bento-label">{partnerLabel}</p>
          <p className="bento-wert tnum">{partnerWert}</p>
          <p className="bento-text">{partnerText}</p>
          <p className="bento-quelle">{partnerQuelle}</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle" delay={140}>
        <div className="bento-karte">
          <p className="bento-label">{exposeLabel}</p>
          <p className="bento-wert tnum">{exposeWert}</p>
          <p className="bento-text">{exposeText}</p>
          <p className="bento-quelle">{exposeQuelle}</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--breit bento-zelle--hoch2" delay={180}>
        <div className="bento-karte bento-karte--schein bento-karte--aussage">
          <div className="bento-kopfzeile">
            <p className="bento-label">{visionLabel}</p>
            <Image
              src="/kunden/vision.png"
              alt="Vision Group"
              width={132}
              height={28}
              className="bento-logo"
              unoptimized
            />
          </div>
          {/* Der Kontrast ist die Aussage — und er stimmt nur mit der
           * Jahreszahl. Ohne sie liest es sich, als haette KKR in ein
           * Dreierteam investiert. */}
          <p className="bento-aussage">
            {visionAussage1}
            <br />
            {visionAussage2Vor} <em>{visionAussage2Em}</em>.
          </p>
          <p className="bento-text">{visionText}</p>
          <p className="bento-quelle">{visionQuelle}</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--breit bento-zelle--hoch2" delay={220}>
        <Link href="/cases/riegel-immobilien" className="bento-karte bento-karte--link">
          <div>
            <p className="bento-label">{riegelLabel}</p>
            <p className="bento-wert tnum">{riegelWert}</p>
            <p className="bento-text">{riegelText}</p>
            <span className="bento-mehr">{riegelMehr}</span>
          </div>
          <span className="bento-pfeil" aria-hidden>
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
