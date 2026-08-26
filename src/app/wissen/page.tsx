import type { Metadata } from "next";
import Link from "next/link";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import plan from "../../../docs/redesign/R3-SEITENPLAN.json";

/**
 * Wissens-Hub (R3) — datengetrieben aus R3-SEITENPLAN.json: die 50
 * Ratgeber nach Clustern gruppiert, dazu die drei Tools. Neue Seiten
 * erscheinen hier automatisch, sobald der Plan wächst.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-Wissen: Akquise, Marketing, KI und Zahlen | beuwy",
  description:
    "Das Wissens-Archiv von beuwy: 50 Ratgeber zu Akquise, Marke, KI, Conversion und Immobilien-Zahlen — jede Seite beantwortet ihre Frage im ersten Absatz.",
  openGraph: {
    title: "Makler-Wissen: Akquise, Marketing, KI und Zahlen | beuwy",
    description:
      "50 Ratgeber zu Akquise, Marke, KI, Conversion und Immobilien-Zahlen — ohne Floskeln, mit Rechenwegen.",
    type: "website",
    locale: "de_DE",
  },
};

const CLUSTER: Record<string, { titel: string; sub: string }> = {
  W: { titel: "Akquise & Alleinauftrag", sub: "Wie aus Eigentümern Mandate werden." },
  V: { titel: "Vergleiche & Werkzeuge", sub: "Baukästen, CRMs und Portale — ehrlich eingeordnet." },
  K: { titel: "KI & Sichtbarkeit", sub: "Von ChatGPT im Alltag bis zur Zitierfähigkeit in KI-Antworten." },
  C: { titel: "Auftritt & Conversion", sub: "Was aus Besuchern Anfragen macht." },
  T: { titel: "Immobilien-Zahlen", sub: "Bewertung, Miete, AfA — mit Rechenwegen statt Bauchgefühl." },
  P: { titel: "Büro & Prozesse", sub: "Provision, Team, Kennzahlen." },
};

const REIHENFOLGE = ["W", "C", "K", "V", "T", "P"] as const;

const TOOLS = [
  { titel: "Verkaufspreis-Rechner", href: "/tools/verkaufspreisrechner" },
  { titel: "Mietpreis-Rechner", href: "/tools/mietpreisrechner" },
  { titel: "AfA- & Restnutzungsdauer-Rechner", href: "/tools/afa-rechner" },
] as const;

export default function WissenPage() {
  const gruppen = REIHENFOLGE.map((k) => ({
    key: k,
    ...CLUSTER[k],
    seiten: plan.seiten.filter((s) => s.cluster === k),
  })).filter((g) => g.seiten.length > 0);

  return (
    <>
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-32 lg:px-10 lg:pt-40">
          <Reveal>
            <p className="t-label !text-ink-yellow">Wissen</p>
            <h1 className="mt-5 font-display text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Alles, was ein Makler über *Sichtbarkeit* wissen muss.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[40rem]">
              {plan.seiten.length} Ratgeber, sechs Themenfelder, drei Rechner. Jede Seite
              beantwortet ihre Frage im ersten Absatz — zum Nachschlagen gebaut, nicht zum
              Scrollen.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10 lg:pb-32">
          {gruppen.map((g, gi) => (
            <Reveal key={g.key} delay={Math.min(gi * 40, 120)}>
              <div className={gi === 0 ? "" : "mt-16"}>
                <div className="border-t border-line-subtle pt-10">
                  <h2 className="t-h3">{g.titel}</h2>
                  <p className="t-small mt-1.5">{g.sub}</p>
                </div>
                <ul className="mt-7 grid gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.seiten.map((s) => (
                    <li key={s.route}>
                      <Link
                        href={`/${s.route}`}
                        className="group inline-flex items-baseline gap-2 text-[14.5px] leading-snug text-ink-muted transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
                      >
                        <span aria-hidden className="text-[11px] text-ink-yellow">→</span>
                        <span>{s.frage}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_360px]">
              <GelbeKarte label="Zum Ausprobieren" titel="Drei Rechner, sofort nutzbar." glyph>
                Verkaufspreis, Mietpreis, AfA mit Restnutzungsdauer — dieselben Werkzeuge, die
                in beuwy-Portalen Eigentümer registrieren, hier offen im Browser.
              </GelbeKarte>
              <div className="flex flex-col justify-center gap-3">
                {TOOLS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="rounded-full border border-line-subtle bg-white px-6 py-3.5 text-center text-[14.5px] font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] hover:border-line-medium"
                  >
                    {t.titel}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
