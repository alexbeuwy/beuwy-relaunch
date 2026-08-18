import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/lib/cases";

/* Fallstudien als Reise-Karten. Die Überschrift verrät den Weg, nicht die
   Leistung — das ist der Grund zu klicken. Der erste Fall läuft über die
   volle Breite mit Bild, die übrigen als ruhige Zeilen: eine Hierarchie
   statt fünf gleich lauter Kacheln. */
export function CaseGrid({ cases }: { cases: CaseStudy[] }) {
  const [erster, ...weitere] = cases;

  return (
    <div>
      {erster ? (
        <Reveal>
          <Link href={`/cases/${erster.slug}`} className="case-lead group/case">
            {erster.bild ? (
              <div className="case-frame">
                <div className="case-frame-bar" aria-hidden>
                  <span className="case-frame-dot" />
                  <span className="case-frame-dot" />
                  <span className="case-frame-dot" />
                  <span className="case-frame-url">
                    {erster.link?.label ?? erster.kunde}
                  </span>
                </div>
                <Image
                  src={erster.bild}
                  width={1280}
                  height={800}
                  alt={erster.bildAlt ?? erster.kunde}
                />
              </div>
            ) : null}
            <div>
              <p className="t-label">
                {erster.kunde} · {erster.branche}
              </p>
              <h3 className="t-h3 case-reise mt-3">{erster.reise}</h3>
              <p className="t-body mt-3">{erster.teaser}</p>
              <div className="case-fakten mt-6">
                {erster.fakten.map((f) => (
                  <div key={f.label}>
                    <p className="case-fakt-wert tnum">{f.wert}</p>
                    <p className="t-data mt-1">{f.label}</p>
                  </div>
                ))}
              </div>
              <span className="case-mehr mt-6">Fallstudie lesen →</span>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <div className="case-liste">
        {weitere.map((c, i) => (
          <Reveal key={c.slug} delay={i * 60}>
            <Link href={`/cases/${c.slug}`} className="case-zeile group/case">
              <div>
                <p className="t-label">
                  {c.kunde} · {c.branche}
                  {c.beispiel ? <span className="case-marke">Beispielprojekt</span> : null}
                </p>
                <h3 className="t-h3 case-reise mt-2">{c.reise}</h3>
                <p className="t-body mt-2 max-w-[62ch]">{c.teaser}</p>
              </div>
              <span className="case-mehr shrink-0">Fallstudie lesen →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
