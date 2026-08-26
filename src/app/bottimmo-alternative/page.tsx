import type { Metadata } from "next";
import { SektionsKopf, Highlight } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";

/**
 * F1 — /bottimmo-alternative (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Sachlich-fairer Vergleich: Baukasten-Systeme wie BOTTIMMO sind für den
 * Einstieg stark, die Grenze ist die geteilte Vorlage. Keine Behauptung
 * über BOTTIMMO, die nicht allgemein bekannt/unstrittig ist — im Zweifel
 * weggelassen (Leaf-Vorgabe).
 */

export const metadata: Metadata = {
  title: "BOTTIMMO Alternative: Maßarbeit statt Baukasten | beuwy",
  description:
    "Der faire Vergleich zwischen Baukasten-Systemen wie BOTTIMMO und einer eigenen Marke für Immobilienmakler: was jede Lösung wirklich bringt — und für wen sie richtig ist.",
};

const RAILS: {
  thema: string;
  linksLabel: string;
  linksText: string;
  rechtsLabel: string;
  rechtsText: string;
}[] = [
  {
    thema: "Vorlagen vs. eigene Marke",
    linksLabel: "Vorlage",
    linksText:
      "Design und Struktur stammen aus dem Baukasten — dasselbe Grundgerüst läuft parallel bei anderen Kunden desselben Anbieters.",
    rechtsLabel: "Eigene Marke",
    rechtsText:
      "Typografie, Farbwelt und Sprache werden für Ihr Haus entwickelt. Wiedererkennbar, auch ohne Logo im Bild.",
  },
  {
    thema: "Gemietete Inhalte vs. eigenes System",
    linksLabel: "Gemietete Inhalte",
    linksText:
      "Texte, Bilder und Funnel gehören zur Lizenz — sie laufen, solange Sie zahlen, und stehen mit der Kündigung still.",
    rechtsLabel: "Eigenes System",
    rechtsText:
      "Website, Inhalte und Funnel gehören Ihnen. Sie bleiben, auch wenn sich die Zusammenarbeit irgendwann ändert.",
  },
  {
    thema: "Selbstbedienung vs. done for you",
    linksLabel: "Selbstbedienung",
    linksText:
      "Einrichtung, Pflege und Anpassungen übernehmen Sie selbst, im Dashboard des Baukastens — neben dem Tagesgeschäft.",
    rechtsLabel: "Done for you",
    rechtsText:
      "Aufbau, Pflege und Weiterentwicklung übernehmen wir. Sie bekommen Ergebnisse zu sehen, keine Aufgabenliste.",
  },
  {
    thema: "Monatliche Lizenz vs. eigener Vermögenswert",
    linksLabel: "Monatliche Lizenz",
    linksText: "Sie zahlen für die Nutzung. Endet die Lizenz, endet auch die Website.",
    rechtsLabel: "Eigener Vermögenswert",
    rechtsText: "Sie bezahlen für ein System, das Ihnen gehört und mit Ihrem Haus mitwächst.",
  },
];

export default function BottimmoAlternativePage() {
  return (
    <>
      <ClusterHero
        eyebrow="Vergleich · BOTTIMMO"
        titel="Die BOTTIMMO-Alternative für Makler, die *auffallen* wollen."
        sub="BOTTIMMO baut ein bewährtes Marketing-Paket für den Einstieg. Wer schon zu den führenden Häusern seiner Stadt zählt, braucht mehr als das Paket, das auch der Mitbewerber zwei Straßen weiter nutzt — hier lesen Sie den fairen Vergleich."
        primaryHref="/anfrage"
        ctaLabel2="Was BOTTIMMO gut kann →"
        ctaHref2="#einordnung"
      />

      {/* ── Einordnung fair ─────────────────────────────────────────── */}
      <section id="einordnung" className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Einordnung"
              titel="Baukasten-Systeme sind für den Einstieg gebaut — nicht für den *Vorsprung*."
            />
            <div className="mt-8 max-w-[62ch] space-y-5">
              <p className="t-body">
                Anbieter wie BOTTIMMO liefern ein bewährtes Marketing-Paket: eigene Website,
                vorgefertigte Anzeigen, ein Funnel, der grundsätzlich funktioniert. Für ein Büro,
                das gerade erst online sichtbar werden will, ist das ein schneller, solider Start
                — ohne dass jemand bei null anfängt.
              </p>
              <p className="t-body">
                Die Grenze liegt im System selbst:{" "}
                <Highlight>gleiche Vorlagen, gleiche Funnels, gleiche Ratgeber</Highlight> laufen
                parallel bei vielen anderen Maklern im selben Markt. Was für den Einstieg reicht,
                wird zur Bremse, sobald zwei Häuser in derselben Stadt mit demselben Baukasten
                werben.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gegenüberstellung ───────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow="Der Unterschied" titel="Standard-Paket. Oder *Maßarbeit*." />
          <RailListe className="mt-8">
            {RAILS.map((r, i) => (
              <Reveal key={r.thema} delay={i * 60}>
                <Rail>
                  <p className="t-label !text-[10.5px]">{r.thema}</p>
                  <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-12">
                    <div>
                      <p className="t-h3">{r.linksLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.linksText}</p>
                    </div>
                    <div className="md:border-l md:border-line-subtle md:pl-12">
                      <p className="t-h3">{r.rechtsLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.rechtsText}</p>
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Für wen bleibt BOTTIMMO richtig / Für wen beuwy ────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ehrlich gesagt"
              titel="Nicht jedes Haus braucht *Maßarbeit* — noch nicht."
            />
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">Für wen BOTTIMMO die richtige Wahl bleibt</p>
                <p className="t-body mt-3 max-w-[40ch]">
                  Für den ersten eigenen Online-Auftritt, ein kleines Marketingbudget im
                  dreistelligen Monatsbereich — oder wenn Website und Anzeigen einfach nur
                  laufen sollen, ohne dass die Marke im Mittelpunkt steht. Eine vernünftige
                  Entscheidung, keine Notlösung.
                </p>
              </div>
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">Für wen beuwy richtig ist</p>
                <p className="t-body mt-3 max-w-[40ch]">
                  Für Häuser, die bereits einen Marktanteil verteidigen oder ausbauen — deren
                  nächster Wettbewerber nicht der Baukasten-Nachbar ist, sondern das führende
                  Büro der Stadt. Hier zahlt sich ein eigenes System aus, weil der Unterschied im
                  Auftritt direkt den Unterschied im Alleinauftrag macht. 17 Jahre Markenarbeit
                  stecken in jedem System, das wir bauen, kein Pilotprojekt.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClusterAbschluss
        karteLabel="Für Häuser mit Anspruch"
        karteTitel="Sie haben den Baukasten längst hinter sich gelassen."
        karteText="Ein Vorlagen-System bringt Sie online. Ein eigenes System bringt Sie an die Spitze Ihres Markts — und bleibt, wenn sich sonst etwas ändert."
        schlussTitel="Lassen Sie uns über Ihren Auftritt sprechen — nicht über eine Vorlage."
        schlussText="In einem kurzen Gespräch sehen wir, wo Ihr aktueller Auftritt Sie unter Wert verkauft — und was ein eigenes System dagegen tut."
        primaryHref="/anfrage"
        footnote="BOTTIMMO ist eine Marke der BOTTIMMO AG. beuwy steht in keiner Verbindung zu BOTTIMMO."
        weitereLinks={[
          { label: "Was kostet eine Maklerwebsite?", href: "/maklerwebsite-kosten" },
          { label: "Maklersoftware im Vergleich", href: "/maklersoftware-vergleich" },
          { label: "Website für Makler", href: "/website-fuer-immobilienmakler" },
        ]}
      />
    </>
  );
}
