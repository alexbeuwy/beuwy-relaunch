import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — beuwy",
  description: "Datenschutzerklärung von beuwy, Alexander Pütter.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 lg:px-10 pt-32 pb-24">
      <p className="t-label">Rechtliches</p>
      <h1 className="t-h2 mt-4">Datenschutzerklärung</h1>
      <p className="t-data mt-3">Stand: Juli 2026</p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="t-h3">1. Verantwortlicher</h2>
          <p className="t-body mt-3">
            beuwy — Alexander Pütter, Mendelssohnstraße 52, 67061 Ludwigshafen
            am Rhein, E-Mail:{" "}
            <a href="mailto:ap@beuwy.com" className="btn-link">
              ap@beuwy.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="t-h3">2. Hosting</h2>
          <p className="t-body mt-3">
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA gehostet. Beim Aufruf der Seite verarbeitet
            Vercel technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit,
            aufgerufene Seite, Browser-Informationen) in Server-Logs, um die
            Website auszuliefern und die Sicherheit des Betriebs zu
            gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein
            Auftragsverarbeitungsvertrag; die Übermittlung in die USA erfolgt
            auf Grundlage der EU-Standardvertragsklauseln.
          </p>
        </section>

        <section>
          <h2 className="t-h3">3. Website-Check (Analyse-Werkzeug)</h2>
          <p className="t-body mt-3">
            Wenn Sie im Website-Check eine Domain eingeben, ruft unser Server
            die öffentlich erreichbare Startseite dieser Domain ab, erstellt
            einen Screenshot und prüft öffentlich sichtbare technische Merkmale.
            Auszüge des öffentlich abrufbaren Seiteninhalts werden zur Bewertung
            an die Anthropic Ireland Ltd. (Claude-API) als Auftragsverarbeiter
            übermittelt. Die eingegebene Domain und die Ergebnisse werden nicht
            über die Beantwortung Ihrer Anfrage hinaus gespeichert.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung der
            von Ihnen angeforderten Analyse).
          </p>
        </section>

        <section>
          <h2 className="t-h3">3a. Terminbuchung</h2>
          <p className="t-body mt-3">
            Wenn Sie über unser Buchungstool einen Termin anfragen, verarbeiten
            wir die von Ihnen angegebenen Daten (Anlass, Wunschtermin, Name,
            E-Mail, ggf. Telefonnummer und Nachricht) zur Vereinbarung und
            Durchführung des Gesprächs (Art. 6 Abs. 1 lit. b DSGVO). Für den
            Versand der Bestätigungs-E-Mails setzen wir Resend Inc. (USA) als
            Auftragsverarbeiter ein; die Übermittlung erfolgt auf Grundlage der
            EU-Standardvertragsklauseln.
          </p>
        </section>

        <section>
          <h2 className="t-h3">4. Kontakt per E-Mail</h2>
          <p className="t-body mt-3">
            Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben
            zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Die Daten
            verbleiben bei uns, bis der Zweck entfällt oder Sie die Löschung
            verlangen.
          </p>
        </section>

        <section>
          <h2 className="t-h3">5. Keine Cookies, kein Tracking</h2>
          <p className="t-body mt-3">
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken
            und verwendet keine Tracking- oder Analysedienste.
          </p>
        </section>

        <section>
          <h2 className="t-h3">6. Ihre Rechte</h2>
          <p className="t-body mt-3">
            Sie haben gegenüber uns das Recht auf Auskunft (Art. 15 DSGVO),
            Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
            Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
            Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
            Interessen (Art. 21). Außerdem können Sie sich bei einer
            Datenschutz-Aufsichtsbehörde beschweren, z.&nbsp;B. beim
            Landesbeauftragten für den Datenschutz Rheinland-Pfalz.
          </p>
        </section>
      </div>
    </div>
  );
}
