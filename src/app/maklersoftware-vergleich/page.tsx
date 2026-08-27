import type { Metadata } from "next";
import Link from "next/link";
import { SektionsKopf, Wortmarke } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";

/**
 * F3 — /maklersoftware-vergleich (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Perspektive bewusst NICHT "welches CRM ist das beste" (entscheidet der
 * Makler), sondern: jede Plattform kann mehr, als ihr Standard-Auftritt
 * zeigt. Aussagen zu den Systemen bleiben allgemein bekannt/unstrittig —
 * im Zweifel weggelassen (Leaf-Vorgabe). Link auf /onoffice-website
 * bewusst prominent (onOffice-Rail + Quervernetzung unten).
 */

export const metadata: Metadata = {
  title: "Maklersoftware im Vergleich: onOffice, FLOWFACT, Propstack & Co. | beuwy",
  description:
    "Maklersoftware Vergleich 2026: onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne. Jede kann mehr, als ihr Standard-Auftritt zeigt. Der Überblick, und wie beuwy dort andockt, wo Ihr CRM aufhört.",
};

const SYSTEME: {
  nr: string;
  name: string;
  satz1: string;
  satz2: string;
  andock: string;
  link?: { label: string; href: string };
}[] = [
  {
    nr: "01",
    name: "onOffice",
    satz1:
      "Eines der am weitesten verbreiteten Maklerverwaltungssysteme im deutschsprachigen Raum, im Einsatz vom Einzelmakler bis zum großen Maklerhaus.",
    satz2:
      "Bekannt für Objektverwaltung, Kontaktmanagement und eine breite Schnittstellenlandschaft zu Portalen und Zusatztools.",
    andock:
      "Wir docken Ihre Website direkt an onOffice an: Anfragen landen mit Quelle und nächstem Schritt im System, nicht im Postfach.",
    link: { label: "Website-Lösung für onOffice ansehen", href: "/onoffice-website" },
  },
  {
    nr: "02",
    name: "FLOWFACT",
    satz1:
      "Eine der am längsten etablierten Maklersoftware-Marken in Deutschland, verbreitet vor allem bei größeren Büros und Maklernetzwerken.",
    satz2:
      "Deckt Objekt-, Kontakt- und Vorgangsverwaltung ab, mit Fokus auf Prozesssteuerung im Tagesgeschäft.",
    andock:
      "Wir bauen den Auftritt drumherum: Exposés und Formulare, die direkt in Ihre FLOWFACT-Vorgänge einlaufen.",
  },
  {
    nr: "03",
    name: "Propstack",
    satz1:
      "Eine jüngere, cloudbasierte Maklersoftware, die zunehmend Verbreitung findet, auch bei technikaffinen Büros und im gewerblichen Segment.",
    satz2: "Bekannt für ein modernes Bedienkonzept und eine offene Schnittstellenphilosophie.",
    andock:
      "Wir nutzen genau diese Offenheit: Website-Leads und Exposé-Anfragen fließen strukturiert in Ihr Propstack.",
  },
  {
    nr: "04",
    name: "JUSTIMMO",
    satz1:
      "Eine cloudbasierte Maklersoftware mit Ursprung in Österreich, zunehmend auch im deutschen Markt vertreten.",
    satz2: "Deckt CRM, Objektverwaltung und Portalanbindung in einem System ab.",
    andock:
      "Wir binden Rechner und Anfrageformulare so an, dass jeder Lead mit Score direkt in Ihrem JUSTIMMO landet.",
  },
  {
    nr: "05",
    name: "CasaOne",
    satz1:
      "Eine Maklersoftware für Objektverwaltung, Kontaktmanagement und CRM-Prozesse im deutschsprachigen Maklermarkt.",
    satz2:
      "Wie bei den anderen Systemen zeigt der Standard-Auftritt selten das volle Potenzial der Anbindung nach außen.",
    andock:
      "Wir sorgen dafür, dass Ihre Website genauso direkt an CasaOne andockt, wie sich die Software selbst bedienen lässt.",
  },
];

export default function MaklersoftwareVergleichPage() {
  return (
    <>
      <ClusterHero
        eyebrow="CRM-Vergleich"
        titel="Maklersoftware im Vergleich: *jede* kann mehr, als sie zeigt."
        sub="Welches CRM zu Ihrem Haus passt, entscheiden Sie, nicht wir. Was wir sehen: Bei jeder dieser Plattformen bleibt der Standard-Auftritt weit hinter dem zurück, was das System eigentlich könnte."
        primaryHref="/anfrage"
        ctaLabel2="Zu den Systemen ↓"
        ctaHref2="#systeme"
      />

      {/* ── Perspektive ─────────────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Unsere Position"
              titel="Das *beste* CRM gibt es nicht, nur das beste für Ihr Haus."
            />
            <p className="t-body mt-6 max-w-[62ch]">
              onOffice, FLOWFACT, Propstack, JUSTIMMO, CasaOne: alle fünf haben sich am
              deutschsprachigen Maklermarkt etabliert, jedes mit eigenem Schwerpunkt. Diese Seite
              bewertet nicht, welches System &bdquo;gewinnt&ldquo;. Sie zeigt, wo bei jedem
              System ungenutztes Potenzial liegt: zwischen dem, was die Software kann, und dem,
              was ihr Standard-Auftritt zeigt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Software-Rails ──────────────────────────────────────────── */}
      <section id="systeme" className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow="Die Systeme" titel="Fünf CRMs. Fünf ungenutzte *Andockstellen*." />
          <RailListe className="mt-8">
            {SYSTEME.map((s, i) => (
              <Reveal key={s.nr} delay={i * 60}>
                <Rail>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-14">
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <span className="t-data">{s.nr}</span>
                      <Wortmarke name={s.name} />
                    </div>
                    <div className="max-w-[52rem]">
                      <p className="t-body">{s.satz1}</p>
                      <p className="t-body mt-2">{s.satz2}</p>
                      <p className="t-body mt-4 border-l-2 border-akzent pl-4 text-ink-cream">
                        {s.andock}
                      </p>
                      {s.link && (
                        <Link
                          href={s.link.href}
                          className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line-medium px-4 py-2 text-[13px] font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-ink-cream"
                        >
                          {s.link.label}
                          <span className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Motor / Schaufenster ────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Warum beides zählt"
              titel="Das CRM ist der *Motor*. Der Auftritt ist das Schaufenster."
            />
            <p className="t-body mt-6 max-w-[62ch]">
              Ein starkes CRM organisiert, was im Hintergrund passiert. Ob ein Eigentümer anruft,
              entscheidet sich am Schaufenster davor: an der Website, die zeigt, was im Motor
              steckt. Wir bauen das Schaufenster und die Leitung dazwischen: Jede Anfrage kommt
              mit Quelle und nächstem Schritt direkt in Ihrem System an, unabhängig davon, welches
              der fünf Systeme oben Sie einsetzen.
            </p>
          </Reveal>
        </div>
      </section>

      <ClusterAbschluss
        karteLabel="Unabhängig vom System"
        karteTitel="Ihr CRM bleibt, wie es ist. Ihr Auftritt wird, was er sein sollte."
        karteText="Wir bauen keine neue Software. Wir bauen seit 17 Jahren das Portal, das Ihr bestehendes System endlich ausnutzt."
        schlussTitel="Nennen Sie uns Ihr System, wir zeigen Ihnen, was ungenutzt bleibt."
        schlussText="Im ersten Gespräch schauen wir uns Ihre CRM-Anbindung und Ihren Auftritt gemeinsam an."
        primaryHref="/anfrage"
        footnote="onOffice, FLOWFACT, Propstack, JUSTIMMO und CasaOne sind Marken der jeweiligen Anbieter. beuwy ist unabhängiger Dienstleister ohne Gesellschafterbindung an diese Anbieter."
        weitereLinks={[
          { label: "onOffice-Websites", href: "/onoffice-website" },
          { label: "BOTTIMMO-Alternative", href: "/bottimmo-alternative" },
          { label: "Was kostet eine Maklerwebsite?", href: "/maklerwebsite-kosten" },
        ]}
      />
    </>
  );
}
