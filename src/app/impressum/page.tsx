import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | beuwy",
  description: "Anbieterkennzeichnung von beuwy, Alexander Pütter.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 lg:px-10 pt-32 pb-24">
      <p className="t-label">Rechtliches</p>
      <h1 className="t-h2 mt-4">Impressum</h1>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="t-h3">Angaben gemäß § 5 DDG</h2>
          <p className="t-body mt-3 is-cream">
            beuwy — Alexander Pütter
            <br />
            Max-Bill-Str. 3
            <br />
            67061 Ludwigshafen am Rhein
          </p>
          <p className="t-body mt-3">
            Weitere Standorte: Memeler Str. 99, 68307 Mannheim · Genter Str. 5,
            13353 Berlin
          </p>
        </section>

        <section>
          <h2 className="t-h3">Kontakt</h2>
          <p className="t-body mt-3">
            E-Mail:{" "}
            <a href="mailto:ap@beuwy.com" className="btn-link">
              ap@beuwy.com
            </a>
            <br />
            Termin vereinbaren:{" "}
            <a href="/termin" className="btn-link">
              beuwy.com/termin
            </a>
          </p>
        </section>

        <section>
          <h2 className="t-h3">Steuern</h2>
          <p className="t-body mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE317660011
            <br />
            Steuernummer: 27/131/82863
          </p>
        </section>

        <section>
          <h2 className="t-h3">Verantwortlich i. S. d. § 18 Abs. 2 MStV</h2>
          <p className="t-body mt-3">
            Alexander Pütter (Anschrift wie oben)
          </p>
        </section>

        <section>
          <h2 className="t-h3">EU-Streitschlichtung</h2>
          <p className="t-body mt-3">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Unsere E-Mail-Adresse finden Sie oben unter Kontakt. Zur
            Teilnahme an dieser Streitbeilegung sind wir nicht verpflichtet.
          </p>
        </section>

        <section>
          <h2 className="t-h3">Verbraucherstreitbeilegung</h2>
          <p className="t-body mt-3">
            Wir sind nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen (§ 36 VSBG).
          </p>
        </section>

        <section>
          <h2 className="t-h3">Haftung für Inhalte</h2>
          <p className="t-body mt-3">
            Die Inhalte dieser Seite wurden mit Sorgfalt erstellt. Für ihre
            Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine
            Gewähr. Als Diensteanbieter sind wir für eigene Inhalte nach den
            allgemeinen Gesetzen verantwortlich, nicht aber verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu
            überwachen. Verpflichtungen zur Entfernung oder Sperrung bei
            Kenntnis einer Rechtsverletzung bleiben unberührt.
          </p>
        </section>

        <section>
          <h2 className="t-h3">Haftung für Links</h2>
          <p className="t-body mt-3">
            Diese Seite verlinkt auf Angebote Dritter. Auf deren Inhalte haben
            wir keinen Einfluss, für sie übernehmen wir keine Haftung. Zum
            Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
            Bei bekannt werdenden Rechtsverletzungen entfernen wir betroffene
            Links umgehend.
          </p>
        </section>

        <section>
          <h2 className="t-h3">Urheberrecht</h2>
          <p className="t-body mt-3">
            Die auf dieser Seite erstellten Inhalte unterliegen dem
            deutschen Urheberrecht. Vervielfältigung, Bearbeitung,
            Verbreitung und jede Verwertung außerhalb der Grenzen des
            Urheberrechts bedürfen unserer schriftlichen Zustimmung.
          </p>
        </section>

        <section>
          <h2 className="t-h3">Bild- und Markennachweise</h2>
          <p className="t-body mt-3">
            Die auf dieser Seite gezeigte Kampagnenwelt ist KI-generiert und
            als solche mit der Kennzeichnung „AI Visual" markiert; sie wird
            über BunnyCDN ausgeliefert. Fotografien mit Alexander Pütter sind
            echte Aufnahmen. Auf dieser Seite gezeigte Logos Dritter sind
            Marken ihrer jeweiligen Inhaber und dienen ausschließlich der
            Referenz- bzw. Kompatibilitätsnennung; eine Verbindung zu beuwy
            besteht dadurch nicht.
          </p>
        </section>
      </div>
    </div>
  );
}
