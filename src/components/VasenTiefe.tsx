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
 * Vier Auftritte (Alex, 27.08, 3. Korrektur — klein und beilaeufig
 * statt ein Riesen-Blob):
 *  - "buehne": unscharfe Bokeh-Vase klein an der unteren Plate-Ecke,
 *    Raender per Maske ausgeblendet — schneidet die Ecke an, verdeckt
 *    das Video aber nicht.
 *  - "rand": Calla-Vase dezent rechts im Danach-Block.
 *  - "abgrenzung": Craspedia-Strauss klein unten rechts im
 *    Vergleichs-Band (Baukasten vs. beuwy).
 *  - "prozess": Palmwedel-Vase klein unten links im Ablauf-Block.
 */
export function VasenTiefe({
  variante = "buehne",
}: {
  variante?: "buehne" | "rand" | "abgrenzung" | "prozess";
}) {
  if (variante === "rand") {
    return (
      <div aria-hidden className={stil.ebene}>
        <div className={`${stil.vase} ${stil.hinten} -right-10 top-[8%] w-[170px] opacity-80 lg:right-6 lg:w-[210px]`}>
          <Image src={vase("03")} alt="" width={1186} height={1799} sizes="210px" className="h-auto w-full" />
        </div>
      </div>
    );
  }

  if (variante === "abgrenzung") {
    return (
      <div aria-hidden className={stil.ebene}>
        <div
          className={`${stil.vase} ${stil.hinten} -right-8 bottom-[4%] w-[120px] rotate-2 opacity-90 lg:right-10 lg:bottom-16 lg:w-[160px]`}
        >
          <Image src={vase("01")} alt="" width={1045} height={1776} sizes="160px" className="h-auto w-full" />
        </div>
      </div>
    );
  }

  if (variante === "prozess") {
    return (
      <div aria-hidden className={stil.ebene}>
        <div
          className={`${stil.vase} ${stil.hinten} -left-8 bottom-8 w-[120px] -rotate-2 opacity-90 lg:left-[2.5%] lg:bottom-12 lg:w-[150px]`}
        >
          <Image src={vase("02")} alt="" width={1261} height={1699} sizes="150px" className="h-auto w-full" />
        </div>
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
