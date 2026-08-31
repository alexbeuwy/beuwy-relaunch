import Image from "next/image";
import { vase } from "@/lib/cdn";
import stil from "./VasenTiefe.module.css";

/**
 * VasenTiefe — dekorative Tiefen-Parallax-Ebene aus den freigestellten
 * Kampagnen-Vasen (Mechanik: VasenTiefe.module.css). Rein dekorativ
 * (aria-hidden, pointer-events-none). Die Ebenen-Varianten liegen
 * UNTER dem Sektionsinhalt — die Sektion braucht position:relative
 * und ihr Inhalt z-10; "buehne" haengt dagegen direkt am Plate-Wrapper.
 *
 * Auftritte (Alex, 31.08, 4. Korrektur — jede Vase ÜBERLAPPT eine
 * Karte oder Plate, keine haengt mehr lose am Sektionsrand; Anker ist
 * immer ein relative-Wrapper des ueberlappten Elements, die Vase ist
 * dessen spaetes z-20-Kind):
 *  - "buehne": unscharfe Bokeh-Vase an der unteren Plate-Ecke des
 *    Spiegel-Videos, Raender per Maske ausgeblendet.
 *  - "karte-gelb": Craspedia-Strauss schneidet die obere rechte Ecke
 *    der gelben beuwy-Karte im Aha-Vergleich an.
 *  - "karte-prozess": Palmwedel-Vase schneidet die untere linke Ecke
 *    der gelben "Vier Termine"-Karte im Ablauf-Block an.
 *  - "showreel": Calla-Vase schneidet die obere rechte Ecke des
 *    Showreel-Rahmens im Danach-Block an.
 */
export function VasenTiefe({
  variante = "buehne",
}: {
  variante?: "buehne" | "karte-gelb" | "karte-prozess" | "showreel";
}) {
  if (variante === "karte-gelb") {
    return (
      <div
        aria-hidden
        className={`${stil.vase} ${stil.hinten} pointer-events-none -right-3 -top-12 z-20 w-[110px] rotate-2 lg:-right-7 lg:-top-16 lg:w-[150px]`}
      >
        <Image src={vase("01")} alt="" width={1045} height={1776} sizes="150px" className="h-auto w-full" />
      </div>
    );
  }

  if (variante === "karte-prozess") {
    // Tief genug haengen, dass nur die Wedel-Spitzen die Karten-Ecke
    // anschneiden — nie den Kartentext (Abnahme 31.08).
    return (
      <div
        aria-hidden
        className={`${stil.vase} ${stil.hinten} pointer-events-none -bottom-16 -left-10 z-20 w-[95px] -rotate-2 lg:-bottom-28 lg:-left-16 lg:w-[120px]`}
      >
        <Image src={vase("02")} alt="" width={1261} height={1699} sizes="120px" className="h-auto w-full" />
      </div>
    );
  }

  if (variante === "showreel") {
    // Untere rechte Ecke des Showreel-Rahmens — oben kollidiert die
    // Vase mit der Szenen-Reihe darueber (Abnahme 31.08).
    return (
      <div
        aria-hidden
        className={`${stil.vase} ${stil.hinten} pointer-events-none -bottom-10 -right-5 z-20 w-[110px] rotate-3 lg:-bottom-14 lg:-right-9 lg:w-[145px]`}
      >
        <Image src={vase("03")} alt="" width={1186} height={1799} sizes="145px" className="h-auto w-full" />
      </div>
    );
  }

  return (
    // Plate-Anker: Die Vase haengt DIREKT am relative-Wrapper der
    // Bild-Plate und schneidet als z-20-Kind deren untere linke Ecke
    // an. Bewusst kleiner als die Plate (3. Korrektur: die 400px-
    // Version ragte oben weit ueber das Video hinaus und wirkte
    // verloren) — so bleibt sie ueber die gesamte Parallax-Spanne
    // innerhalb der Plate-Hoehe. stil.weich blendet die harten
    // Beschnitt-Kanten des Assets aus.
    <div
      aria-hidden
      className={`${stil.vase} ${stil.vorn} ${stil.weich} pointer-events-none -bottom-10 -left-12 z-20 w-[190px] sm:w-[220px] lg:-bottom-12 lg:-left-[70px] lg:w-[250px]`}
    >
      <Image src={vase("02-blurry")} alt="" width={1261} height={1699} sizes="250px" className="h-auto w-full" />
    </div>
  );
}
