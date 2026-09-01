import type { Metadata } from "next";
import Link from "next/link";
import { CaseGrid } from "@/components/CaseGrid";
import { GelbeKarte, Highlight } from "@/components/MaklerElemente";
import { orderedCases } from "@/lib/cases";

/**
 * Fallstudien-Übersicht — schlicht, Light Makler Style. Foto-Plates kommen
 * ausschließlich aus den Case-Daten selbst (CaseGrid → c.bild), keine
 * Kampagnen-Fotos neben echten Kundennamen. Immobilien-Cases zuerst
 * (orderedCases()), am Ende der eine CTA-Wortlaut zum Vorquali-Funnel.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fallstudien — Referenzen für Immobilienmakler | beuwy",
  description:
    "Reale Projekte, echte Zahlen: wie beuwy Marke, Portal und Vertriebssystem für führende Immobilienmakler und Unternehmen gebaut hat.",
};

export default function CasesUebersichtPage() {
  const cases = orderedCases();

  return (
    <>
      <section className="section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-20">
          <p className="t-label flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-akzent" />
            Fallstudien
          </p>
          <h1 className="t-display mt-4 max-w-[760px]">
            Was passiert, wenn Marke und System zusammenpassen.
          </h1>
          <p className="t-body-lg mt-5 max-w-[560px]">
            Reale Projekte, reale Zahlen: <Highlight>kein Fall ohne Beleg</Highlight>.
            17 Jahre Markenarbeit, messbar an echten Ergebnissen statt an
            Behauptungen. Beispielprojekte sind sichtbar markiert und tragen
            keine echten Referenzen.
          </p>
        </div>
      </section>

      <section className="section-band-base border-t border-line-subtle">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
          <CaseGrid cases={cases} />
        </div>
      </section>

      {/* ── Abschluss — GelbeKarte als Ganzes ist der eine CTA ───────── */}
      <section className="section-band-elevated border-t border-line-subtle">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-20 md:py-28">
          <Link
            href="/anfrage"
            className="group mx-auto block max-w-[640px] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--line-strong)]"
          >
            <GelbeKarte
              label="Nächster Schritt"
              titel="Wenn Ihr Projekt die nächste Fallstudie werden soll, sprechen wir."
              glyph
              className="text-center"
            >
              <p className="mx-auto max-w-[46ch]">
                30 Minuten, kein Pitch. Wir sagen ehrlich, ob Ihr Auftritt so
                ein Ergebnis tragen kann.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-cream">
                Zusammenarbeit anfragen
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-1"
                  aria-hidden
                >
                  <path
                    d="M1 7h11M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </GelbeKarte>
          </Link>
        </div>
      </section>
    </>
  );
}
