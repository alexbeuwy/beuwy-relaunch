import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — beuwy",
  description: "Anbieterkennzeichnung von beuwy, Alexander Pütter.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 lg:px-10 pt-32 pb-24">
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
          <h2 className="t-h3">Verantwortlich für den Inhalt</h2>
          <p className="t-body mt-3">
            Alexander Pütter (Anschrift wie oben), § 18 Abs. 2 MStV
          </p>
        </section>

        <section>
          <h2 className="t-h3">Streitbeilegung</h2>
          <p className="t-body mt-3">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  );
}
