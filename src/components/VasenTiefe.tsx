import Image from "next/image";
import { vase } from "@/lib/cdn";
import stil from "./VasenTiefe.module.css";

/**
 * VasenTiefe — dekorative Tiefen-Parallax-Ebene aus den freigestellten
 * Kampagnen-Vasen (Mechanik: VasenTiefe.module.css). Rein dekorativ
 * (aria-hidden, pointer-events-none), liegt UNTER dem Sektionsinhalt —
 * die Sektion braucht position:relative und ihr Inhalt z-10.
 *
 * Zwei Stimmungen:
 *  - "buehne": unscharfe Vase gross links angeschnitten (Vordergrund),
 *    scharfe Craspedia-Vase klein rechts hinten — der grosse Auftritt.
 *  - "rand": nur die Calla-Vase dezent rechts — leises Echo weiter
 *    unten auf der Seite, damit die Requisite als Motiv traegt.
 */
export function VasenTiefe({ variante = "buehne" }: { variante?: "buehne" | "rand" }) {
  if (variante === "rand") {
    return (
      <div aria-hidden className={stil.ebene}>
        <div className={`${stil.vase} ${stil.hinten} -right-10 top-[8%] w-[170px] opacity-80 lg:right-6 lg:w-[210px]`}>
          <Image src={vase("03")} alt="" width={1186} height={1799} sizes="210px" className="h-auto w-full" />
        </div>
      </div>
    );
  }

  return (
    // Reduktion (Alex, 27.08): NUR die unscharfe Vase — und sie liegt
    // ueber dem Sektionsinhalt (z-20 > Inhalt z-10), sodass sie die
    // Bild-Plate anschneidet. Bokeh vor der Fokusebene, ein Element.
    <div aria-hidden className={`${stil.ebene} z-20`}>
      <div className={`${stil.vase} ${stil.vorn} -left-16 bottom-[-6%] w-[240px] sm:w-[300px] lg:-left-8 lg:w-[400px]`}>
        <Image src={vase("02-blurry")} alt="" width={1261} height={1699} sizes="400px" className="h-auto w-full" />
      </div>
    </div>
  );
}
