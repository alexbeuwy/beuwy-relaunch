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
    <div aria-hidden className={stil.ebene}>
      {/* hinten: scharfe Craspedia-Vase, klein und traege */}
      <div className={`${stil.vase} ${stil.hinten} right-[4%] top-[6%] hidden w-[150px] md:block lg:w-[190px]`}>
        <Image src={vase("01")} alt="" width={1045} height={1776} sizes="190px" className="h-auto w-full" />
      </div>
      {/* mitte: Palmwedel-Vase scharf, driftet leicht */}
      <div className={`${stil.vase} ${stil.mitte} bottom-[4%] right-[16%] hidden w-[120px] lg:block`}>
        <Image src={vase("02")} alt="" width={1261} height={1699} sizes="120px" className="h-auto w-full" />
      </div>
      {/* vorn: die UNSCHARFE Vase, gross angeschnitten — Fahrt macht Tiefe */}
      <div className={`${stil.vase} ${stil.vorn} -left-16 bottom-[-6%] w-[240px] sm:w-[300px] lg:-left-10 lg:w-[380px]`}>
        <Image src={vase("02-blurry")} alt="" width={1261} height={1699} sizes="380px" className="h-auto w-full" />
      </div>
    </div>
  );
}
