import type { Metadata } from "next";

/**
 * Datenschutzerklärung — vollständiger Neubau (Leaf B5, R3).
 * Ruhiges Dokument-Layout ohne Marketing-Bausteine: nur Text, Struktur,
 * Anker-Navigation. Jeder Abschnitt beschreibt einen tatsächlichen
 * Datenfluss aus dem Code (Stand 26.08.2026), nichts Generisches:
 *
 * - Hosting/CDN/Fonts:  next.config.mjs, src/app/layout.tsx, src/lib/cdn.ts
 * - Formulare:          src/app/api/booking, src/app/api/tool-lead,
 *                       src/lib/validierung.ts, src/lib/rate-limit.ts
 * - Supabase:           src/lib/crm/db.ts, src/lib/audit-cache.ts,
 *                       src/lib/studio-auth.ts, supabase/crm-schema.sql
 * - Resend:             src/lib/email.ts
 * - Website-Check:      src/app/api/audit/*, src/lib/audit-share.ts,
 *                       src/app/check/[domain]/page.tsx
 * - Cookies:            src/lib/studio-auth.ts (STUDIO_COOKIE),
 *                       src/app/api/studio/login/route.ts (Cookie-Attribute)
 *
 * Es gibt im Repo genau EIN funktionales Cookie (studio_auth, geteilt
 * zwischen /studio und /os). Ein zweites „Konto-Session"-Cookie existiert
 * NICHT — die bw_konto*-RPCs in crm/db.ts sind vorbereitet, aber von
 * keiner Route/Seite verdrahtet. Deshalb taucht hier nur ein Cookie auf.
 */

const SITE_URL = "https://beuwy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Datenschutzerklärung | beuwy",
  description:
    "Welche Daten beuwy verarbeitet, wenn Sie diese Website nutzen: Hosting, Formulare, Rechner-Tools, Website-Check und die eingesetzten Auftragsverarbeiter.",
};

const ABSCHNITTE = [
  { id: "verantwortlicher", titel: "Verantwortlicher" },
  { id: "hosting", titel: "Hosting bei Vercel" },
  { id: "bunnycdn", titel: "Auslieferung von Bildern und Videos über BunnyCDN" },
  { id: "schriftarten", titel: "Schriftarten" },
  { id: "supabase", titel: "Supabase als Auftragsverarbeiter" },
  { id: "resend", titel: "Resend für Transaktions-E-Mails" },
  { id: "formulare", titel: "Kontakt- und Funnel-Formulare" },
  { id: "rechner", titel: "Rechner-Tools" },
  { id: "website-check", titel: "Website-Check" },
  { id: "cookies", titel: "Cookies" },
  { id: "rechte", titel: "Ihre Rechte" },
  { id: "beschwerde", titel: "Beschwerderecht" },
  { id: "stand", titel: "Stand dieser Erklärung" },
] as const;

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 lg:px-10 pt-32 pb-24">
      <p className="t-label">Rechtliches</p>
      <h1 className="t-h2 mt-4">Datenschutzerklärung</h1>
      <p className="t-data tnum mt-3">Stand: 26. August 2026</p>

      <p className="t-body-lg mt-8 max-w-[62ch]">
        Diese Erklärung listet jeden Dienst und jeden Datenfluss dieser
        Website einzeln auf: was passiert, mit welchen Daten, auf welcher
        Rechtsgrundlage und wie lange gespeichert wird. Kein Textbaustein
        über Dinge, die diese Website nicht tut.
      </p>

      {/* Inhaltsverzeichnis */}
      <nav aria-label="Inhaltsverzeichnis" className="mt-10 rounded-lg border hairline p-5 md:p-6">
        <p className="t-label">Inhalt</p>
        <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {ABSCHNITTE.map((a, i) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                className="flex items-baseline gap-3 text-ink-muted transition-[color] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
              >
                <span className="t-data tnum shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-small">{a.titel}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-12">
        <section id="verantwortlicher">
          <h2 className="t-h3">1. Verantwortlicher</h2>
          <p className="t-body mt-3">
            Verantwortlicher im Sinne von Art. 4 Nr. 7 DSGVO für die
            Datenverarbeitung im Zusammenhang mit dieser Website ist:
          </p>
          <p className="t-body mt-3">
            beuwy — Alexander Pütter
            <br />
            Max-Bill-Str. 3
            <br />
            67061 Ludwigshafen am Rhein
            <br />
            E-Mail:{" "}
            <a href="mailto:ap@beuwy.com" className="btn-link">
              ap@beuwy.com
            </a>
          </p>
          <p className="t-body mt-3">
            Bei Fragen zum Datenschutz erreichen Sie uns unter dieser
            E-Mail-Adresse. Ein gesonderter Datenschutzbeauftragter ist wegen
            der Unternehmensgröße nicht bestellt.
          </p>
        </section>

        <section id="hosting">
          <h2 className="t-h3">2. Hosting bei Vercel</h2>
          <p className="t-body mt-3">
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA gehostet. Jeder Seitenaufruf erzeugt
            automatisch ein Server-Logfile mit IP-Adresse, Datum und Uhrzeit
            des Zugriffs, der aufgerufenen URL, dem HTTP-Statuscode sowie
            Browser- und Betriebssystem-Kennung. Das ist rein technisch
            bedingt — ohne diese Daten kann kein Server eine Seite ausliefern.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Betrieb und
            Absicherung der Website).
          </p>
          <p className="t-body mt-3">
            Mit Vercel besteht ein Auftragsverarbeitungsvertrag; die
            Übermittlung in die USA erfolgt auf Grundlage der
            EU-Standardvertragsklauseln. Auf die genaue Speicherdauer dieser
            Logfiles bei Vercel haben wir keinen Einfluss — nach unserer
            Kenntnis werden sie nur kurzfristig vorgehalten und nicht mit
            anderen Datenbeständen zusammengeführt.
          </p>
        </section>

        <section id="bunnycdn">
          <h2 className="t-h3">3. Auslieferung von Bildern und Videos über BunnyCDN</h2>
          <p className="t-body mt-3">
            Bilder und Videos liefern wir nicht direkt von unserem Server aus,
            sondern über die Content-Delivery-Pull-Zone von bunny.net
            (beuwy-2.b-cdn.net). Beim Laden eines Bildes oder Videos
            verarbeitet BunnyCDN die IP-Adresse Ihres Geräts, um die Datei
            über den nächstgelegenen Auslieferungsserver auszuspielen —
            technisch notwendig, damit Medien schnell laden, unabhängig
            davon, wo Sie sich befinden. Rechtsgrundlage ist Art. 6 Abs. 1
            lit. f DSGVO. Mit BunnyCDN besteht ein
            Auftragsverarbeitungsvertrag.
          </p>
          <p className="t-body mt-3">
            Screenshots, die der Website-Check (Abschnitt 9) von öffentlich
            abrufbaren Startseiten erstellt, werden über dieselbe
            BunnyCDN-Zone als eigene Speicher-Zone ausgeliefert, sobald ein
            Gutachten gespeichert wird.
          </p>
        </section>

        <section id="schriftarten">
          <h2 className="t-h3">4. Schriftarten</h2>
          <p className="t-body mt-3">
            Alle Schriftarten dieser Website — Helvena für Überschriften und
            Fließtext, Geist Mono für tabellarische Zahlen — liegen als
            Dateien in dieser Website selbst und werden über die oben
            genannten Auslieferungswege ausgespielt. Es werden keine
            Schriftarten von Google Fonts oder einem anderen externen
            Font-Anbieter nachgeladen. Beim Aufruf dieser Seite baut Ihr
            Browser deshalb zu keinem Zeitpunkt eine Verbindung zu einem
            externen Font-Server auf, und es fließen in diesem Zusammenhang
            keine Daten an Dritte.
          </p>
        </section>

        <section id="supabase">
          <h2 className="t-h3">5. Supabase als Auftragsverarbeiter</h2>
          <p className="t-body mt-3">
            Für Funktionen, die Daten über einen einzelnen Seitenaufruf
            hinaus benötigen, setzen wir Supabase (Hosting-Region Europa) als
            Datenbank- und Backend-Dienst ein. Konkret verarbeiten wir darüber:
          </p>
          <ul className="mt-3 space-y-2 t-body list-disc pl-5 marker:text-ink-dim">
            <li>
              Anfragen aus den Rechner-Tools (Abschnitt 8): Name,
              E-Mail-Adresse, das genutzte Tool sowie Ihre Eingaben und das
              Rechenergebnis — nur, wenn Sie eine ausführliche Auswertung per
              E-Mail anfordern.
            </li>
            <li>
              Ergebnisse des Website-Checks (Abschnitt 9): die geprüfte
              Domain, die technischen Befunde und die KI-generierte
              Einschätzung, damit ein einmal erstelltes Gutachten unter einem
              festen Link abrufbar bleibt.
            </li>
            <li>
              Den Passwort-Hash für den internen Zugang zu Studio und
              Branding-OS (Abschnitt 10) — kein personenbezogenes Datum eines
              Website-Besuchers, sondern unser eigener Zugangsschutz.
            </li>
            <li>
              Einen anonymen Tageszähler, wie oft die KI-Analyse des
              Website-Checks insgesamt ausgelöst wurde, ausschließlich zum
              Schutz vor Kostenmissbrauch.
            </li>
          </ul>
          <p className="t-body mt-3">
            Der Zugriff läuft ausschließlich über serverseitige Funktionen
            mit einem serverseitigen Zugangsschlüssel; die Tabellen selbst
            sind für den öffentlichen Zugriff gesperrt. Mit Supabase besteht
            ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für die Bearbeitung
            Ihrer Anfrage, für den Tageszähler und den Zugangsschutz Art. 6
            Abs. 1 lit. f DSGVO.
          </p>
          <p className="t-body mt-3">
            Speicherdauer: Es läuft aktuell kein automatisierter
            Löschprozess. Anfragedaten bleiben gespeichert, bis wir Ihre
            Anfrage abschließend bearbeitet haben oder Sie die Löschung
            verlangen. Website-Check-Gutachten bleiben unter ihrem Link
            abrufbar, bis wir sie auf Anfrage entfernen.
          </p>
        </section>

        <section id="resend">
          <h2 className="t-h3">6. Resend für Transaktions-E-Mails</h2>
          <p className="t-body mt-3">
            Für den Versand der E-Mails, die aus den Formularen dieser
            Website entstehen — Terminbestätigungen, interne
            Benachrichtigungen an uns, Antworten auf Tool-Anfragen — setzen
            wir Resend Inc. (USA) als Versanddienstleister ein. Übermittelt
            werden dabei genau die Angaben, die Sie im jeweiligen Formular
            gemacht haben, etwa Name, E-Mail-Adresse und Nachricht.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
          </p>
          <p className="t-body mt-3">
            Mit Resend besteht ein Auftragsverarbeitungsvertrag; die
            Übermittlung in die USA erfolgt auf Grundlage der
            EU-Standardvertragsklauseln. Ist der Versanddienst technisch
            nicht verfügbar, wird Ihre Anfrage ausschließlich serverseitig
            protokolliert, und es wird keine E-Mail verschickt.
          </p>
        </section>

        <section id="formulare">
          <h2 className="t-h3">7. Kontakt- und Funnel-Formulare</h2>
          <p className="t-body mt-3">
            Diese Website bietet zwei Wege, direkt mit uns in Kontakt zu
            treten:
          </p>
          <ul className="mt-3 space-y-3 t-body list-disc pl-5 marker:text-ink-dim">
            <li>
              <span className="is-cream">Terminbuchung.</span> Sie geben Anlass,
              gewünschte Art (online/vor Ort), Datum, Uhrzeit, Namen,
              E-Mail-Adresse, optional Telefonnummer und eine Nachricht an.
              Wir nutzen diese Angaben, um den Termin zu bestätigen und das
              Gespräch zu führen.
            </li>
            <li>
              <span className="is-cream">„Zusammenarbeit anfragen".</span>{" "}
              Vorqualifizierungs-Funnel unter /anfrage: Sie beantworten vier
              Fragen zu Rolle, Abschlussvolumen, fachlichem Fokus und
              Zeithorizont und geben zusätzlich Name, E-Mail-Adresse,
              Telefonnummer (hier Pflichtfeld) und optional eine Nachricht
              an. Vor dem Absenden bestätigen Sie über eine Checkbox
              ausdrücklich, dass wir Ihre Angaben zur Bearbeitung verarbeiten
              dürfen.
            </li>
          </ul>
          <p className="t-body mt-3">
            Beide Formulare laufen serverseitig über dieselbe Route.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung Ihrer
            Anfrage bzw. vorvertragliche Maßnahme auf Ihren Wunsch), beim
            Vorqualifizierungs-Funnel zusätzlich Art. 6 Abs. 1 lit. a DSGVO
            (Ihre Einwilligung über die Checkbox, jederzeit mit Wirkung für
            die Zukunft widerrufbar).
          </p>
          <p className="t-body mt-3">
            Beide Formulare enthalten ein für Menschen unsichtbares
            Zusatzfeld (Honeypot): Ist es befüllt, werten wir die Anfrage als
            automatisiert und verwerfen sie kommentarlos — es wird weder eine
            E-Mail verschickt noch eine Ihrer Angaben weiterverarbeitet.
            Zusätzlich merken wir uns Ihre IP-Adresse ausschließlich im
            Arbeitsspeicher des Servers, um zu viele Anfragen von derselben
            Adresse kurzfristig zu bremsen; sie ist nur für das jeweilige
            Zehn-Minuten-Zeitfenster relevant, landet in keiner Datenbank und
            wird nicht mit Ihren übrigen Angaben verknüpft (Rechtsgrundlage
            Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="t-body mt-3">
            Ihre Angaben gehen per E-Mail an ap@beuwy.com (Abschnitt 6) und
            werden bei diesen beiden Formularen nicht zusätzlich in einer
            Datenbank gespeichert; sie verbleiben in diesem Postfach, bis der
            Zweck der Anfrage erledigt ist oder Sie die Löschung verlangen.
          </p>
        </section>

        <section id="rechner">
          <h2 className="t-h3">8. Rechner-Tools</h2>
          <p className="t-body mt-3">
            Unter /tools stehen Rechner zur Verfügung (Verkaufspreis-,
            Mietpreis- und AfA-/Restnutzungsdauer-Rechner). Die Berechnung
            selbst läuft vollständig in Ihrem Browser — solange Sie nur
            rechnen, verlässt keine Eingabe Ihr Gerät.
          </p>
          <p className="t-body mt-3">
            Erst wenn Sie über einen eigenen Button eine ausführliche
            Auswertung per E-Mail anfordern, übermitteln wir Ihren Namen,
            Ihre E-Mail-Adresse sowie Ihre Eingaben und das Rechenergebnis an
            unseren Server. Diese Daten speichern wir dauerhaft in unserem
            Kundenverwaltungssystem auf Supabase (Abschnitt 5) und verschicken
            zusätzlich eine Bestätigungs-E-Mail über Resend (Abschnitt 6).
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Honeypot- und
            IP-Schutz gelten wie in Abschnitt 7 beschrieben.
          </p>
        </section>

        <section id="website-check">
          <h2 className="t-h3">9. Website-Check</h2>
          <p className="t-body mt-3">
            Der Website-Check erstellt eine automatisierte Ersteinschätzung
            zu einer von Ihnen eingegebenen Domain. Dabei läuft Folgendes ab:
          </p>
          <ol className="mt-3 space-y-2 t-body list-decimal pl-5 marker:text-ink-dim marker:tnum">
            <li>
              Unser Server ruft die öffentlich erreichbare Startseite der
              eingegebenen Domain ab und prüft anhand öffentlich sichtbarer
              technischer Merkmale (u.&nbsp;a. robots.txt, llms.txt) neun
              Kriterien.
            </li>
            <li>Ein Screenshot der Startseite wird serverseitig erzeugt.</li>
            <li>
              Ein Auszug des öffentlich abrufbaren Seitentexts wird zusammen
              mit den technischen Befunden an Anthropic (Claude-API) als
              Auftragsverarbeiter übermittelt, damit eine inhaltliche
              Einschätzung entsteht.
            </li>
            <li>
              Das fertige Ergebnis — Domain, technische Befunde,
              KI-Einschätzung und Screenshot — speichern wir automatisch
              unter einem festen Link (/check/&#123;domain&#125;), damit Sie
              das Ergebnis später wiederfinden oder teilen können. Diese
              Seite trägt robots noindex, wird also nicht in Suchmaschinen
              gelistet und ist ausschließlich über den direkten Link
              erreichbar.
            </li>
          </ol>
          <p className="t-body mt-3">
            Wir prüfen dabei ausschließlich öffentlich zugängliche
            Seiteninhalte, keine passwortgeschützten Bereiche.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung der
            von Ihnen angeforderten Analyse), hilfsweise Art. 6 Abs. 1 lit. f
            DSGVO, soweit dabei Inhalte einer fremden Domain verarbeitet
            werden. Bitten Sie um Entfernung eines Gutachtens zu einer
            bestimmten Domain, schreiben Sie uns an ap@beuwy.com — wir
            löschen den Eintrag dann aus unserer Datenbank.
          </p>
          <p className="t-body mt-3">
            Zusätzlich zählen wir serverseitig, wie oft die KI-Analyse
            insgesamt pro Tag ausgelöst wird (kein Personenbezug, reiner
            Kostenschutz), und wenden denselben kurzfristigen IP-Schutz wie
            in Abschnitt 7 beschrieben an.
          </p>
        </section>

        <section id="cookies">
          <h2 className="t-h3">10. Cookies</h2>
          <p className="t-body mt-3">
            Diese Website setzt genau ein Cookie:{" "}
            <span className="t-data">studio_auth</span>. Es wird ausschließlich
            gesetzt, wenn sich jemand mit dem internen Passwort im Studio
            (Text-Redaktion) oder im Branding-OS-Dashboard anmeldet — beides
            interne Arbeitswerkzeuge, keine für Besucher bestimmten Bereiche.
            Das Cookie ist httpOnly (per JavaScript nicht auslesbar), auf 30
            Tage befristet und enthält keinen Klartext des Passworts, sondern
            einen Hashwert der aktuellen Zugangsdaten. Es lässt sich weder
            einer Person außerhalb des internen Teams zuordnen noch für
            Tracking verwenden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
            DSGVO (Absicherung interner Bereiche).
          </p>
          <div className="mt-4 rounded-lg bg-akzent-wash px-5 py-4">
            <p className="t-small is-cream">
              Darüber hinaus setzt diese Website keine Cookies. Es gibt kein
              Analyse-Tool, keinen Werbepixel, kein Social-Media-Plugin und
              keine Marketing-Cookies — weder von uns noch von den oben
              genannten Dienstleistern. Weil ausschließlich ein technisch
              notwendiges Cookie zum Einsatz kommt, ist nach § 25 Abs. 2
              TTDSG keine Einwilligung über einen Cookie-Banner erforderlich.
              Deshalb zeigen wir keinen.
            </p>
          </div>
        </section>

        <section id="rechte">
          <h2 className="t-h3">11. Ihre Rechte</h2>
          <p className="t-body mt-3">
            Ihnen stehen gegenüber uns als Verantwortlichem die folgenden
            Rechte zu:
          </p>
          <ul className="mt-3 space-y-2 t-body list-disc pl-5 marker:text-ink-dim">
            <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>
              Widerspruch gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. f
              DSGVO beruhen (Art. 21 DSGVO)
            </li>
            <li>
              Widerruf einer erteilten Einwilligung mit Wirkung für die
              Zukunft (Art. 7 Abs. 3 DSGVO), etwa der Einwilligung über die
              Checkbox im Vorqualifizierungs-Funnel
            </li>
          </ul>
          <p className="t-body mt-3">
            Zur Ausübung dieser Rechte genügt eine formlose E-Mail an{" "}
            <a href="mailto:ap@beuwy.com" className="btn-link">
              ap@beuwy.com
            </a>
            . Wir antworten innerhalb der gesetzlichen Frist von einem Monat.
          </p>
        </section>

        <section id="beschwerde">
          <h2 className="t-h3">12. Beschwerderecht</h2>
          <p className="t-body mt-3">
            Sie haben außerdem das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig für uns
            ist:
          </p>
          <p className="t-body mt-3">
            Der Landesbeauftragte für den Datenschutz und die
            Informationsfreiheit Rheinland-Pfalz
            <br />
            Hintere Bleiche 34, 55116 Mainz
            <br />
            poststelle@datenschutz.rlp.de
          </p>
        </section>

        <section id="stand">
          <h2 className="t-h3">13. Stand dieser Erklärung</h2>
          <p className="t-body mt-3 tnum">
            26. August 2026. Ändert sich die technische Grundlage dieser
            Website, aktualisieren wir diesen Text entsprechend.
          </p>
        </section>
      </div>
    </div>
  );
}
