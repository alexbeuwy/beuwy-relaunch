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

      <Reveal className="bento-zelle bento-zelle--breit bento-zelle--hoch2" delay={180}>
        <div className="bento-karte bento-karte--schein bento-karte--aussage">
          <div className="bento-kopfzeile">
            <p className="bento-label">Vision Group · März 2022</p>
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
              Jahreszahl. Ohne sie liest es sich, als haette KKR in ein
              Dreierteam investiert. */}
          <p className="bento-aussage">
            Drei Leute in Mannheim.
            <br />
            Vier Jahre später Partner von <em>KKR</em>.
          </p>
          <p className="bento-text">
            KKR hält seit 1999 Beteiligungen an 29 Unternehmen im
            deutschsprachigen Raum — Axel Springer, Wella, Hensoldt. Über elf
            Milliarden Euro Eigenkapital. Seit März 2022 gehört ein Haus dazu,
            das 2018 aus zwei Gründern und einer Buchhalterin bestand.
          </p>
          <p className="bento-quelle">
            Handelsblatt · Pressemitteilungen der Beteiligten
          </p>
        </div>
      </Reveal>

      <Reveal className="bento-zelle bento-zelle--breit bento-zelle--hoch2" delay={220}>
        <Link href="/cases/riegel-immobilien" className="bento-karte bento-karte--link">
          <div>
            <p className="bento-label">RIEGEL · sechs Wochen nach dem Relaunch</p>
            <p className="bento-wert tnum">342.000 €</p>
            <p className="bento-text">
              Abschlussvolumen aus neun Abschlüssen. Das Projekt hatte sich nach
              drei Wochen bezahlt gemacht. Ein Familienunternehmen mit über
              zwanzig Jahren Erfahrung, dessen Auftritt davon nichts erzählte —
              bis Eigentümer beim Vergleich dreier Makler zuerst das fanden, was
              wir gebaut haben.
            </p>
            <span className="bento-mehr">Fallstudie lesen</span>
          </div>
          <span className="bento-pfeil" aria-hidden>
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
