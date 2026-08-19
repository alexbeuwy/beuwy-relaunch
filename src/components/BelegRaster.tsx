"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { KURVEN } from "@/lib/kunden-kurven";

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
 */

/* Der Umsatzstrang von Königswege trägt die große Kachel. */
const UMSATZ = KURVEN[0].straenge.find((s) => s.id === "provision")!;

function Sparkline() {
  const werte = UMSATZ.punkte.map((p) => p.wert);
  const max = Math.max(...werte);
  const min = Math.min(...werte);
  const spanne = max - min || 1;
  const d = werte
    .map((w, i) => `${(i / (werte.length - 1)) * 100},${34 - ((w - min) / spanne) * 30}`)
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

export function BelegRaster() {
  return (
    <div className="bento">
      {/* Groß: der Umsatzverlauf, der die Sektion traegt */}
      <Reveal className="bento-zelle bento-zelle--gross">
        <div className="bento-karte bento-karte--akzent">
          <p className="bento-label">Königswege · Provisionserlös</p>
          <p className="bento-wert tnum">34,78 Mio. €</p>
          <p className="bento-text">
            2024, Platz 10 der Cash-Hitliste — erstmals unter den Top Ten. 2021
            waren es 17,64 Mio.
          </p>
          <Sparkline />
          <p className="bento-quelle">Cash-Hitliste der Finanzvertriebe</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--hoch" delay={60}>
        <div className="bento-karte bento-karte--schein">
          <p className="bento-label">RIEGEL · ImmoScout24-Award 2025</p>
          <p className="bento-wert tnum">Platz 21</p>
          <p className="bento-text">von über 25.000 Maklern in Deutschland.</p>
          <p className="bento-quelle">ImmoScout24</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle" delay={100}>
        <div className="bento-karte">
          <p className="bento-label">Königswege · Vertriebspartner</p>
          <p className="bento-wert tnum">2.210</p>
          <p className="bento-text">an 85 Standorten. 2021 waren es 170.</p>
          <p className="bento-quelle">koenigswege.com</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle" delay={140}>
        <div className="bento-karte">
          <p className="bento-label">RIEGEL · Exposé-Aufrufe</p>
          <p className="bento-wert tnum">292.514</p>
          <p className="bento-text">rollierend über sechs Monate.</p>
          <p className="bento-quelle">ImmoScout24-Anbieterprofil</p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--breit" delay={180}>
        <div className="bento-karte bento-karte--zeile">
          <div>
            <p className="bento-label">Vision Group · Partnerschaft seit März 2022</p>
            <p className="bento-wert tnum">KKR</p>
            <p className="bento-text">
              Eines der größten Private-Equity-Häuser der Welt — seit 1999 über
              elf Milliarden Euro Eigenkapital in 29 Unternehmen im
              deutschsprachigen Raum, darunter Axel Springer, Wella und Hensoldt.
              2022 kam ein Haus dazu, das vier Jahre vorher aus drei Leuten
              bestand.
            </p>
            <p className="bento-quelle">
              Handelsblatt · Pressemitteilungen der Beteiligten
            </p>
          </div>
          <Image
            src="/kunden/vision.png"
            alt="Vision Group"
            width={132}
            height={28}
            className="bento-logo"
            unoptimized
          />
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--breit" delay={220}>
        <Link href="/cases/riegel-immobilien" className="bento-karte bento-karte--link">
          <div>
            <p className="bento-label">RIEGEL · sechs Wochen nach dem Relaunch</p>
            <p className="bento-wert tnum">342.000 €</p>
            <p className="bento-text">
              Abschlussvolumen aus neun Abschlüssen. Das Projekt hatte sich nach
              drei Wochen bezahlt gemacht.
            </p>
          </div>
          <span className="bento-pfeil" aria-hidden>
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
