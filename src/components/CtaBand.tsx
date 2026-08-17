import Link from "next/link";
import { Button } from "@/components/ui/button";

/* CTA-Band — der invertierte Farbblock zwischen Sektionen: eine Zeile,
   ein Weg. Ton „sky" (Ultramarin) oder „hill" (Hügel-Grün) — beide nutzen
   die .on-sky-Button-Inversion (Schnee-Fläche, Ultramarin-Text). */
export function CtaBand({
  tone = "sky",
  title,
  note,
  buttonLabel,
  href = "/termin",
}: {
  tone?: "sky" | "hill";
  title: string;
  note?: string;
  buttonLabel: string;
  href?: string;
}) {
  return (
    <section
      className={`${tone === "sky" ? "section-band-bright" : "band-hill"} on-sky`}
    >
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-12 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="t-h3 max-w-[560px]">{title}</p>
          {note ? <p className="t-small mt-1.5">{note}</p> : null}
        </div>
        <Button render={<Link href={href} />}>
          {buttonLabel}
          <span aria-hidden>→</span>
        </Button>
      </div>
    </section>
  );
}
