import type { Metadata } from "next";

/**
 * Datenschutzerklärung — vollständiger Neubau (Leaf B5, R3), aktualisiert
 * im Rahmen des Livegang-Audits (14.09.2026, Auftrag 3). Ruhiges
 * Dokument-Layout ohne Marketing-Bausteine: nur Text, Struktur,
 * Anker-Navigation. Jeder Abschnitt beschreibt einen tatsächlichen
 * Datenfluss aus dem Code, nichts Generisches:
 *
 * - Hosting/CDN/Fonts:  next.config.mjs, src/app/layout.tsx, src/lib/cdn.ts
 * - Einblick-Tracking:  src/components/TrackBeacon.tsx,
 *                       src/lib/track-client.ts, src/app/api/track/route.ts
 * - Formulare:          src/app/api/booking, src/app/api/tool-lead,
 *                       src/lib/validierung.ts, src/lib/rate-limit.ts
 * - Rechner/Geodaten:   src/app/api/geocode, src/app/api/bodenrichtwert,
 *                       src/lib/bewertung/boris.ts
 * - Kundenkonto:        src/app/api/konto/route.ts, src/lib/konto-auth.ts
 *                       (Cookies KONTO_COOKIE + KONTO_DA_COOKIE)
 * - Supabase:           src/lib/crm/db.ts, src/lib/audit-cache.ts,
 *                       src/lib/studio-auth.ts, supabase/crm-schema.sql
 * - Resend:             src/lib/email.ts
 * - Website-Check:      src/app/api/audit/*, src/lib/audit-share.ts,
 *                       src/app/check/[domain]/page.tsx
 * - Cookies:            src/lib/studio-auth.ts (STUDIO_COOKIE),
 *                       src/app/api/studio/login/route.ts (Cookie-Attribute),
 *                       src/lib/konto-auth.ts (KONTO_COOKIE, KONTO_DA_COOKIE)
 *
 * Stand des Audits: Es gibt DREI funktionale Cookies — studio_auth
 * (geteilt zwischen /studio und /os), konto_auth und konto_da (beide
 * /konto, siehe src/lib/konto-auth.ts — der Login dort ist entgegen einer
 * älteren Fassung dieses Kommentars vollständig verdrahtet, /api/konto
 * ruft setzeKontoCookie()/leseKontoCookie() aktiv auf). Zusätzlich läuft
 * cookieloses Erstanbieter-Tracking („Einblick") auf allen öffentlichen
 * Seiten, siehe Abschnitt „Reichweitenmessung ohne Cookies" unten.
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
  { id: "einblick", titel: "Reichweitenmessung ohne Cookies („Einblick“)" },
  { id: "supabase", titel: "Supabase als Auftragsverarbeiter" },
  { id: "resend", titel: "Resend für Transaktions-E-Mails" },
  { id: "formulare", titel: "Kontakt- und Funnel-Formulare" },
  { id: "rechner", titel: "Rechner-Tools" },
  { id: "konto", titel: "Kundenkonto (/konto)" },
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
      <p className="t-data tnum mt-3">Stand: 14. September 2026</p>

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
            beuwy, Alexander Pütter
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
            bedingt: Ohne diese Daten kann kein Server eine Seite ausliefern.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Betrieb und
            Absicherung der Website).
          </p>
          <p className="t-body mt-3">
            Mit Vercel besteht ein Auftragsverarbeitungsvertrag; die
            Übermittlung in die USA erfolgt auf Grundlage der
            EU-Standardvertragsklauseln. Auf die genaue Speicherdauer dieser
            Logfiles bei Vercel haben wir keinen Einfluss. Nach unserer
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
            über den nächstgelegenen Auslieferungsserver auszuspielen
            (technisch notwendig, damit Medien schnell laden, unabhängig
            davon, wo Sie sich befinden). Rechtsgrundlage ist Art. 6 Abs. 1
            lit. f DSGVO. Mit BunnyCDN besteht ein
            Auftragsverarbeitungsvertrag.
          </p>
          <p className="t-body mt-3">
            Screenshots, die der Website-Check (Abschnitt 11) von öffentlich
            abrufbaren Startseiten erstellt, werden über dieselbe
            BunnyCDN-Zone als eigene Speicher-Zone ausgeliefert, sobald ein
            Gutachten gespeichert wird.
          </p>
        </section>

        <section id="schriftarten">
          <h2 className="t-h3">4. Schriftarten</h2>
          <p className="t-body mt-3">
            Alle Schriftarten dieser Website (Helvena für Überschriften und
            Fließtext, Geist Mono für tabellarische Zahlen) liegen als
            Dateien in dieser Website selbst und werden über die oben
            genannten Auslieferungswege ausgespielt. Es werden keine
            Schriftarten von Google Fonts oder einem anderen externen
            Font-Anbieter nachgeladen. Beim Aufruf dieser Seite baut Ihr
            Browser deshalb zu keinem Zeitpunkt eine Verbindung zu einem
            externen Font-Server auf, und es fließen in diesem Zusammenhang
            keine Daten an Dritte.
          </p>
        </section>

        <section id="einblick">
          <h2 className="t-h3">5. Reichweitenmessung ohne Cookies („Einblick“)</h2>
          <p className="t-body mt-3">
            Auf den öffentlichen Seiten dieser Website (nicht auf /studio,
            /os oder /konto) setzen wir ein selbst betriebenes,
            cookieloses Erstanbieter-Tracking namens „Einblick" ein, um zu
            verstehen, welche Inhalte genutzt werden. Dabei erfassen wir:
          </p>
          <ul className="mt-3 space-y-2 t-body list-disc pl-5 marker:text-ink-dim">
            <li>den aufgerufenen Seitenpfad (Seitenaufruf)</li>
            <li>
              Klicks, jeweils nur als grobe Position auf der Seite (ein
              Raster von 0,5&nbsp;% der Seitenbreite und -höhe, keine
              Pixelkoordinate) sowie den Bereich, in dem geklickt wurde
            </li>
            <li>die erreichte Scroll-Tiefe in den Stufen 25/50/75/100&nbsp;%</li>
            <li>
              eine grobe Geräteklasse (Desktop/Mobil, abgeleitet aus der
              Fensterbreite Ihres Browsers)
            </li>
          </ul>
          <p className="t-body mt-3">
            Jedem Seitenaufruf ordnen wir dafür eine zufällige Kennung
            (pageload_id) zu. Diese Kennung lebt ausschließlich im
            Arbeitsspeicher Ihres Browser-Tabs — sie wird nicht als Cookie
            und nicht in localStorage/sessionStorage abgelegt — und wird
            bei jeder neuen Seite oder jedem Neuladen verworfen. Eine
            Wiedererkennung über mehrere Seitenaufrufe oder Besuche hinweg
            ist damit technisch nicht möglich. Wir speichern in diesem
            Zusammenhang weder Ihre IP-Adresse noch Ihren
            Browser-Kennstring (User-Agent) noch die Adresse, von der Sie
            kamen (Referrer); die IP-Adresse nutzen wir serverseitig nur
            flüchtig im Arbeitsspeicher, um zu viele Ereignisse von
            derselben Adresse kurzfristig zu drosseln, und verwerfen sie
            danach.
          </p>
          <p className="t-body mt-3">
            Die erfassten Ereignisse speichern wir dauerhaft in unserer
            Supabase-Datenbank (Abschnitt 6). Rechtsgrundlage ist Art.&nbsp;6
            Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an einer
            datensparsamen Nutzungsanalyse ohne Wiedererkennung einzelner
            Personen über die Sitzung hinaus). Weil dabei keine
            Informationen auf Ihrem Gerät gespeichert oder von dort
            ausgelesen werden, ist nach § 25 Abs.&nbsp;2 Nr.&nbsp;2 TDDDG (vormals TTDSG)
            keine Einwilligung über einen Cookie-Banner erforderlich.
          </p>
          <p className="t-body mt-3">
            Speicherdauer: Für die Einblick-Ereignisse läuft aktuell kein
            automatisierter Löschprozess; sie bleiben in der Datenbank, bis
            wir sie manuell löschen. Möchten Sie der Verarbeitung
            widersprechen, schreiben Sie uns an ap@beuwy.com — da keine
            Kennung über den einzelnen Seitenaufruf hinaus gespeichert
            wird, können wir einzelne Ereignisse nicht gezielt einer Person
            zuordnen und löschen; wir können die Funktion aber für Sie
            technisch deaktivieren, wenn Sie uns das mitteilen.
          </p>
        </section>

        <section id="supabase">
          <h2 className="t-h3">6. Supabase als Auftragsverarbeiter</h2>
          <p className="t-body mt-3">
            Für Funktionen, die Daten über einen einzelnen Seitenaufruf
            hinaus benötigen, setzen wir Supabase (Hosting-Region Europa) als
            Datenbank- und Backend-Dienst ein. Konkret verarbeiten wir darüber:
          </p>
          <ul className="mt-3 space-y-2 t-body list-disc pl-5 marker:text-ink-dim">
            <li>
              Die Einblick-Ereignisse aus Abschnitt 5 (Seitenaufrufe,
              Klick-Positionen, Scroll-Tiefe, Geräteklasse, pageload_id).
            </li>
            <li>
              Anfragen aus den Rechner-Tools (Abschnitt 9): Name,
              E-Mail-Adresse, das genutzte Tool sowie Ihre Eingaben und das
              Rechenergebnis, jedoch nur, wenn Sie eine ausführliche Auswertung per
              E-Mail anfordern.
            </li>
            <li>
              Ihre Angaben im Kundenkonto (Abschnitt 10): E-Mail-Adresse,
              nach Abschluss des Onboardings zusätzlich Name, Firma, Rolle,
              Ihr Interesse, Teamgröße, Stadt sowie Titel, Inhalt und
              Antworten Ihrer Support-Anliegen (Tickets).
            </li>
            <li>
              Ergebnisse des Website-Checks (Abschnitt 11): die geprüfte
              Domain, die technischen Befunde und die KI-generierte
              Einschätzung, damit ein einmal erstelltes Gutachten unter einem
              festen Link abrufbar bleibt.
            </li>
            <li>
              Den Passwort-Hash für den internen Zugang zu Studio und
              Branding-OS (Abschnitt 12), kein personenbezogenes Datum eines
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
          <h2 className="t-h3">7. Resend für Transaktions-E-Mails</h2>
          <p className="t-body mt-3">
            Für den Versand der E-Mails, die aus den Formularen dieser
            Website entstehen (Terminbestätigungen, interne
            Benachrichtigungen an uns, Antworten auf Tool-Anfragen) setzen
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
          <h2 className="t-h3">8. Kontakt- und Funnel-Formulare</h2>
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
            automatisiert und verwerfen sie kommentarlos: Es wird weder eine
            E-Mail verschickt noch eine Ihrer Angaben weiterverarbeitet.
            Zusätzlich merken wir uns Ihre IP-Adresse ausschließlich im
            Arbeitsspeicher des Servers, um zu viele Anfragen von derselben
            Adresse kurzfristig zu bremsen; sie ist nur für das jeweilige
            Zehn-Minuten-Zeitfenster relevant, landet in keiner Datenbank und
            wird nicht mit Ihren übrigen Angaben verknüpft (Rechtsgrundlage
            Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="t-body mt-3">
            Ihre Angaben gehen per E-Mail an ap@beuwy.com (Abschnitt 7) und
            werden bei diesen beiden Formularen nicht zusätzlich in einer
            Datenbank gespeichert; sie verbleiben in diesem Postfach, bis der
            Zweck der Anfrage erledigt ist oder Sie die Löschung verlangen.
          </p>
        </section>

        <section id="rechner">
          <h2 className="t-h3">9. Rechner-Tools</h2>
          <p className="t-body mt-3">
            Unter /tools stehen Rechner zur Verfügung (Verkaufspreis-,
            Mietpreis- und AfA-/Restnutzungsdauer-Rechner). Die eigentliche
            Berechnung läuft vollständig in Ihrem Browser: Solange Sie nur
            rechnen, verlässt kein Eingabewert dafür Ihr Gerät.
          </p>
          <p className="t-body mt-3">
            Zwei Zwischenschritte laufen dagegen serverseitig über uns,
            damit Ihre eigene IP-Adresse nicht an Dritte geht: Tippen Sie
            eine Adresse ein, leiten wir Ihre Eingabe über unseren Server
            an den Geocoding-Dienst Photon (komoot GmbH) weiter, um
            Adressvorschläge mit Koordinaten zu liefern. Für den
            Bodenrichtwert fragt unser Server anschließend anhand dieser
            Koordinaten den amtlichen Geodatendienst des jeweiligen
            Bundeslands ab (VBORIS-WMS Rheinland-Pfalz bzw. BORIS-WFS
            Hessen). Beide Dienste sehen dabei nur die Anfrage unseres
            Servers, nicht Ihre eigene IP-Adresse; wir übermitteln keine
            weiteren Angaben aus dem Rechner an diese Dienste.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Durchführung der
            von Ihnen angeforderten Berechnung).
          </p>
          <p className="t-body mt-3">
            Erst wenn Sie über einen eigenen Button eine ausführliche
            Auswertung per E-Mail anfordern, übermitteln wir Ihren Namen,
            Ihre E-Mail-Adresse sowie Ihre Eingaben und das Rechenergebnis an
            unseren Server. Diese Daten speichern wir dauerhaft in unserem
            Kundenverwaltungssystem auf Supabase (Abschnitt 6) und verschicken
            zusätzlich eine Bestätigungs-E-Mail über Resend (Abschnitt 7).
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Honeypot- und
            IP-Schutz gelten wie in Abschnitt 8 beschrieben.
          </p>
        </section>

        <section id="konto">
          <h2 className="t-h3">10. Kundenkonto (/konto)</h2>
          <p className="t-body mt-3">
            Unter /konto bieten wir ein Kundenkonto an. Die Anmeldung läuft
            ohne Passwort über einen Code: Sie geben Ihre E-Mail-Adresse
            ein, wir schicken Ihnen per E-Mail (Resend, Abschnitt 7) einen
            sechsstelligen, 15 Minuten gültigen Code, den Sie anschließend
            eingeben (Magic-Code-Login).
          </p>
          <p className="t-body mt-3">
            Nach erfolgreicher Anmeldung setzen wir zwei Cookies auf Ihrem
            Gerät: <span className="t-data">konto_auth</span> (httpOnly,
            also per JavaScript nicht auslesbar, 30 Tage gültig) bestätigt
            die angemeldete Sitzung und enthält Ihre E-Mail-Adresse in
            signierter, aber nicht verschlüsselter Form. Zusätzlich setzen
            wir{" "}
            <span className="t-data">konto_da</span> (nicht httpOnly, ebenfalls
            30 Tage), ein reines Anzeige-Cookie ohne Inhalt außer dem Wert
            „1" — es dient ausschließlich dazu, das Konto-Symbol in der
            Navigation als angemeldet zu markieren, und lässt sich weder
            auslesen noch für eine Anmeldung verwenden. Rechtsgrundlage für
            beide Cookies ist Art. 6 Abs. 1 lit. b DSGVO (Erbringung des von
            Ihnen angeforderten Kundenkonto-Dienstes); eine Einwilligung ist
            nach § 25 Abs. 2 Nr. 2 TDDDG nicht erforderlich, weil die Cookies
            zur Bereitstellung des von Ihnen ausdrücklich gewünschten
            Diensts technisch notwendig sind.
          </p>
          <p className="t-body mt-3">
            Durchlaufen Sie beim ersten Login das Onboarding, speichern wir
            zusätzlich Ihren Namen, Ihre Firma, Ihre Rolle, Ihr Interesse,
            Ihre Teamgröße und Ihre Stadt. Legen Sie im Konto ein
            Support-Anliegen (Ticket) an oder antworten Sie in einem
            bestehenden Ticket, speichern wir Titel, Inhalt und den
            Antwortverlauf. All diese Daten liegen in unserer
            Supabase-Datenbank (Abschnitt 6). Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO.
          </p>
          <p className="t-body mt-3">
            Speicherdauer: Die Cookies laufen nach 30 Tagen automatisch ab.
            Für Ihre Kontodaten und Tickets in der Datenbank läuft aktuell
            kein automatisierter Löschprozess; sie bleiben gespeichert, bis
            Sie die Löschung Ihres Kontos verlangen. Zum Abmelden nutzen Sie
            die Abmelden-Funktion im Konto; dabei werden beide Cookies
            gelöscht.
          </p>
        </section>

        <section id="website-check">
          <h2 className="t-h3">11. Website-Check</h2>
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
              Das fertige Ergebnis (Domain, technische Befunde,
              KI-Einschätzung und Screenshot) speichern wir automatisch
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
            bestimmten Domain, schreiben Sie uns an ap@beuwy.com. Wir
            löschen den Eintrag dann aus unserer Datenbank.
          </p>
          <p className="t-body mt-3">
            Zusätzlich zählen wir serverseitig, wie oft die KI-Analyse
            insgesamt pro Tag ausgelöst wird (kein Personenbezug, reiner
            Kostenschutz), und wenden denselben kurzfristigen IP-Schutz wie
            in Abschnitt 8 beschrieben an.
          </p>
        </section>

        <section id="cookies">
          <h2 className="t-h3">12. Cookies</h2>
          <p className="t-body mt-3">
            Diese Website setzt drei Cookies, alle ausschließlich in
            internen bzw. angemeldeten Bereichen, nie für Besucher der
            öffentlichen Marketing-Seiten:
          </p>
          <ul className="mt-3 space-y-3 t-body list-disc pl-5 marker:text-ink-dim">
            <li>
              <span className="t-data">studio_auth</span> — gesetzt, wenn
              sich jemand mit dem internen Passwort im Studio
              (Text-Redaktion) oder im Branding-OS-Dashboard anmeldet, beides
              interne Arbeitswerkzeuge. httpOnly, 30 Tage befristet, enthält
              keinen Klartext des Passworts, sondern einen Hashwert der
              aktuellen Zugangsdaten.
            </li>
            <li>
              <span className="t-data">konto_auth</span> — gesetzt bei der
              Anmeldung im Kundenkonto (Abschnitt 10). httpOnly, 30 Tage
              befristet, enthält Ihre E-Mail-Adresse in signierter Form.
            </li>
            <li>
              <span className="t-data">konto_da</span> — begleitet
              konto_auth, ebenfalls 30 Tage befristet, nicht httpOnly, enthält
              nur den Wert „1" ohne Personenbezug und dient ausschließlich der
              Anzeige des Anmeldestatus in der Navigation.
            </li>
          </ul>
          <p className="t-body mt-3">
            Rechtsgrundlage für alle drei ist Art. 6 Abs. 1 lit. f bzw. lit. b
            DSGVO (Absicherung interner Bereiche bzw. Erbringung des von
            Ihnen angeforderten Kundenkonto-Dienstes). Keines der drei
            Cookies wird zur Reichweitenmessung, für Werbezwecke oder zur
            Wiedererkennung auf den öffentlichen Marketing-Seiten verwendet.
          </p>
          <div className="mt-4 rounded-lg bg-akzent-wash px-5 py-4">
            <p className="t-small is-cream">
              Darüber hinaus setzt diese Website keine Cookies. Es gibt
              keinen Werbepixel, kein Social-Media-Plugin und keine
              Marketing-Cookies, weder von uns noch von den oben genannten
              Dienstleistern. Unsere Reichweitenmessung (Abschnitt 5) läuft
              ohne jedes Cookie. Weil ausschließlich technisch notwendige
              Cookies zum Einsatz kommen und die Reichweitenmessung
              cookielos läuft, ist nach § 25 Abs. 2 TDDDG keine Einwilligung
              über einen Cookie-Banner erforderlich. Deshalb zeigen wir
              keinen.
            </p>
          </div>
        </section>

        <section id="rechte">
          <h2 className="t-h3">13. Ihre Rechte</h2>
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
          <h2 className="t-h3">14. Beschwerderecht</h2>
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
          <h2 className="t-h3">15. Stand dieser Erklärung</h2>
          <p className="t-body mt-3 tnum">
            14. September 2026. Ändert sich die technische Grundlage dieser
            Website, aktualisieren wir diesen Text entsprechend.
          </p>
        </section>
      </div>
    </div>
  );
}
