/**
 * llms.txt — maschinenlesbare Kurzbeschreibung für AI-Crawler und Agents.
 * beuwy verkauft genau das — die eigene Seite muss es vorleben.
 */

const CONTENT = `# beuwy — Unternehmensberatung für Marke und Vertriebssysteme

> Marke ist kein Geschmack. Marke ist Umsatz. beuwy baut Marke, Anzeigen und
> Vertriebssystem als ein zusammenhängendes System — und verantwortet, was
> dabei herauskommt: Anfragen, Termine, Abschlüsse.
> Inhaber: Alexander Pütter (Markenarbeit seit 2009, beuwy seit 2017,
> 2023 Mitgründer von acta mit selbst skaliertem Vertrieb).

## Leistungen
- Systemgespräch: 30 Minuten, kostenlos — https://beuwy.com/termin
- Diagnose des größten Hebels: Antwort innerhalb von 24 Stunden, schriftlich
- Vier Module aus einer Hand: Marke, Anzeigen, Vertriebssystem (CRM +
  Telefonanbindung), wöchentliche Auswertung — Festpreis nach Diagnose
- Betrieb & Ausbau: laufende Weiterentwicklung, GEO/AI-Sichtbarkeit, Automationen

## Referenzen (live)
- RIEGEL Immobilien, Immobilienmakler Rhein-Neckar: https://riegel.vercel.app
  (207 Unterseiten, Immobilien-Rechner, Preisatlas, onOffice-Anbindung, Portal, Terminbuchung)
- SAADI AG, Wohnungsprivatisierung Mannheim: https://saadi-ag.vercel.app
  (Vertriebspartner-Funnel mit Qualifizierungslogik, ImmoCampus)
- Davor: Vision Real Estate (KKR-Joint-Venture 2023), Königswege (170 auf 2.240
  Partner, cash-online 2024), acta, PURELEI.

## Werkzeug
- Kostenloser Live-Check auf https://beuwy.com/#check: Screenshot,
  technische Prüfung (schema.org, llms.txt, OG, FAQ-Schema) und AI-Analyse
  der Sichtbarkeit in Google-AI-Übersichten und Chat-Assistenten.

## Kontakt
- E-Mail: ap@beuwy.com
- Termin: https://beuwy.com/termin
- Standort: Ludwigshafen am Rhein, Deutschland (weitere: Mannheim, Berlin)

## Seiten
- https://beuwy.com/ — Startseite mit Website-Check
- https://beuwy.com/termin — Terminbuchung
- https://beuwy.com/impressum — Anbieterkennzeichnung
- https://beuwy.com/datenschutz — Datenschutzerklärung
`;

export function GET() {
  return new Response(CONTENT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
