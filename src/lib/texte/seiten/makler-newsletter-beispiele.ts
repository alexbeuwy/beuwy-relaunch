import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-newsletter-beispiele — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "makler-newsletter-beispiele",
  titel: "Makler-Newsletter Beispiele",
  route: "/makler-newsletter-beispiele",
};
const S = "s.makler-newsletter-beispiele.";

const anlaesse = listeRegistrieren(
  "makler-newsletter-beispiele",
  "anlaesse",
  "Anlass",
  [
    {
      titel: "Marktbericht zum Quartal",
      betreff: "Ihr Markt in Zahlen: drittes Quartal 2026",
      aufbau:
        "Drei Kennzahlen aus Ihrer Region (Anzahl Verkäufe, Preisentwicklung, durchschnittliche Vermarktungsdauer), je mit einem Satz Einordnung. Am Ende ein Link zur eigenen Ersteinschätzung, kein Verkaufsdruck.",
    },
    {
      titel: "Neuer Bodenrichtwert",
      betreff: "Der neue Bodenrichtwert für Ihren Stadtteil ist da",
      aufbau:
        "Kurz erklären, was sich geändert hat und was das für Eigentümer in der Praxis bedeutet. Direkt darunter der Rechner, damit der Empfänger die neue Zahl für die eigene Adresse sieht, statt nur eine allgemeine Aussage zu lesen.",
    },
    {
      titel: "Zinsschritt der EZB",
      betreff: "Was der jüngste Zinsschritt für Ihren Verkaufspreis bedeutet",
      aufbau:
        "Ein Absatz Kontext, ein Absatz Wirkung auf die Finanzierungskraft von Käufern, kein Prognose-Versprechen. Diese Mail funktioniert besonders gut, wenn sie innerhalb weniger Tage nach der Zinsentscheidung verschickt wird.",
    },
    {
      titel: "Neues Exposé, exklusiv vorab",
      betreff: "Vorab für Sie: Reihenhaus in Ihrer Wunschlage, bevor es online geht",
      aufbau:
        "Kurzer Teaser mit einem Foto, klare Ansage, dass Empfänger dieser Mail das Objekt vor der Portalveröffentlichung sehen. Ein Klick führt direkt zur Terminanfrage, keine lange Objektbeschreibung im E-Mail-Text selbst.",
    },
    {
      titel: "Erfolgsgeschichte eines Verkäufers",
      betreff: "Wie Familie K. in sechs Wochen verkauft hat",
      aufbau:
        "Ausgangslage in zwei Sätzen, Vorgehen in drei Punkten, Ergebnis als Zahl. Diese Mail verkauft nichts, sie baut Vertrauen auf, bevor der nächste Eigentümer überhaupt eine Anfrage stellt.",
    },
    {
      titel: "Jahreswechsel-Dank",
      betreff: "Danke für ein Jahr Vertrauen und ein kurzer Ausblick",
      aufbau:
        "Persönlicher Ton, ein kurzer Rückblick auf die Region, keine Verkaufsabsicht. Diese Mail hält den Kontakt warm bei allen, die aktuell nicht verkaufen wollen, aber es in zwei Jahren vielleicht tun.",
    },
    {
      titel: "Dank nach dem Notartermin",
      betreff: "Geschafft, dazu eine kurze Bitte",
      aufbau:
        "Drei Tage nach dem Notartermin verschickt, nicht am selben Tag. Dank für die Zusammenarbeit, dazu die Bitte um eine Google-Bewertung. Der richtige Zeitpunkt entscheidet hier mehr als der Text.",
    },
  ],
  { titel: "Titel", betreff: "Betreffzeile", aufbau: "Aufbau" },
);

const faq = listeRegistrieren(
  "makler-newsletter-beispiele",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie oft sollte ich einen Newsletter verschicken?",
      antwort:
        "Ein fester Marktbericht einmal im Monat reicht als Grundrhythmus, dazu kommen anlassbezogene Mails wie ein neuer Bodenrichtwert oder ein Zinsschritt. Wer wöchentlich verschickt, ohne dass sich wöchentlich etwas Relevantes ändert, kassiert vor allem Abmeldungen.",
    },
    {
      frage: "Brauche ich für jede dieser sieben Mails eine eigene Vorlage?",
      antwort:
        "Ja, aber jede Vorlage bauen Sie einmal und nutzen sie dauerhaft wieder. Wie eine vollständige Sequenz aus mehreren Vorlagen technisch aufgesetzt wird, zeigt E-Mail-Marketing für Immobilienmakler.",
    },
    {
      frage: "Ist der Versand an Bestandskontakte DSGVO-konform?",
      antwort:
        "Das hängt vom Einzelfall ab: Grundsätzlich brauchen Sie eine Einwilligung, für werbliche Mails an bestehende Kundenbeziehungen gelten enge gesetzliche Ausnahmen. Das ist keine Rechtsberatung. Lassen Sie Ihren konkreten Versandprozess von einer Fachperson prüfen, bevor Sie eine Liste anschreiben.",
    },
    {
      frage: "Was, wenn ich noch keine E-Mail-Liste habe?",
      antwort:
        "Dann beginnt der Aufbau über ein Formular mit echtem Nutzen für den Absender, etwa eine Ersteinschätzung zum eigenen Objekt. Verkäufer ansprechen, bevor sie suchen zeigt, wie sich diese Liste schon vor dem Verkaufsentschluss füllt.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Makler-Newsletter, die geöffnet werden: 7 Beispiele zum Übernehmen | beuwy",
  [`${S}meta.beschreibung`]:
    "Makler-Newsletter, die geöffnet werden: sieben Mail-Anlässe mit Betreff und Aufbau zum Übernehmen, plus die Abgrenzung Massen-Newsletter gegen die Datenmail.",
  [`${S}meta.og_titel`]: "Makler-Newsletter, die geöffnet werden: 7 Beispiele zum Übernehmen | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Sieben wiederkehrende Mail-Anlässe mit Betreffzeile und Aufbau, direkt zum Übernehmen, und warum eine Datenmail meist mehr bringt als der Massen-Newsletter.",
  [`${S}hero.eyebrow`]: "Newsletter-Beispiele",
  [`${S}hero.titel`]: "Makler-Newsletter, die *geöffnet* werden: 7 Beispiele zum Übernehmen.",
  [`${S}hero.sub_vor`]:
    "Im Makler-Newsletter schreiben Sie über sieben wiederkehrende Anlässe, die einen echten Öffnungsgrund liefern: der Marktbericht zum Quartal, ein neuer Bodenrichtwert, ein Zinsschritt, ein neues Exposé, eine Erfolgsgeschichte, der Jahreswechsel und der Dank nach dem Notartermin.",
  [`${S}hero.sub_highlight`]:
    "Jede Mail beantwortet eine Frage, die der Empfänger gerade hat, statt allgemein für sich zu werben",
  [`${S}hero.sub_nach`]:
    ". Ein Massen-Newsletter mit gleichem Inhalt an alle Kontakte bringt dabei weniger als eine Datenmail, die auf ein einzelnes Ereignis reagiert.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}beispiele.eyebrow`]: "Sieben Anlässe",
  [`${S}beispiele.titel`]: "Jede Mail hat einen *Grund*, keine läuft einfach nur mit.",
  [`${S}beispiele.betreff_praefix`]: "Betreff",
  ...anlaesse.defaults,
  [`${S}abgrenzung.eyebrow`]: "Die Abgrenzung",
  [`${S}abgrenzung.titel`]: "Massen-Newsletter und *Datenmail* sind nicht dasselbe Werkzeug.",
  [`${S}abgrenzung.massen_label`]: "Massen-Newsletter",
  [`${S}abgrenzung.massen_text`]:
    "Ein Inhalt geht an die gesamte Liste, meist im festen Rhythmus. Gut für Markenpräsenz und Kontinuität, aber jeder Empfänger bekommt dieselbe Zahl, egal ob sie ihn gerade betrifft oder nicht: Die Relevanz je Empfänger bleibt niedrig.",
  [`${S}abgrenzung.daten_label`]: "Datenmail",
  [`${S}abgrenzung.daten_text`]:
    "Ausgelöst durch ein Ereignis oder ein Datenmerkmal: ein Objekt in der Region, ein Fristablauf, eine Bewertungsanfrage. Automatisiert versendet, aber persönlich in der Sache: Öffnungs- und Klickrate liegen deutlich über dem Massenversand.",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Newsletter ohne Anlass ist Rauschen.",
  [`${S}unterschied.text`]:
    "Sieben Vorlagen, einmal gebaut, ersetzen den wöchentlichen Griff zur leeren Seite. Jede trägt einen konkreten Anlass, keine ist ein weiterer Rundruf ohne Grund. Genau das unterscheidet einen Newsletter, der geöffnet wird, von einem, der zwischen Werbung und Spam landet.",
  [`${S}beweis.label`]: "Beweis, kein Textbaustein",
  [`${S}beweis.text`]:
    "17 Jahre Markenarbeit, davor für Bosch, Continental und Michelin. Vorlagen, die einmal sauber gebaut sind, laufen Monate ohne neuen Aufwand. Das ist der Unterschied zwischen einem System und einem einzelnen Newsletter.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Versand wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Sequenz*, keinen weiteren Rundruf.",
  [`${S}finale.satz_1`]: "Wie eine vollständige Sequenz technisch aufgesetzt wird, zeigt",
  [`${S}finale.link_1`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}finale.satz_2`]: ", wie Sie Eigentümer schon vor dem Verkaufsentschluss erreichen",
  [`${S}finale.link_2`]: "Verkäufer ansprechen, bevor sie suchen",
  [`${S}finale.satz_3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_3`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_4`]: ".",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline (Teil vor dem Highlight)",
  [`${S}hero.sub_highlight`]: "Hero · Subline (hervorgehobener Teil)",
  [`${S}hero.sub_nach`]: "Hero · Subline (Teil nach dem Highlight)",
  [`${S}cta.label`]: "CTA · Button-Beschriftung",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem CTA",
  [`${S}beispiele.eyebrow`]: "Sieben Anlässe · Eyebrow",
  [`${S}beispiele.titel`]: "Sieben Anlässe · Titel",
  [`${S}beispiele.betreff_praefix`]: "Sieben Anlässe · Vorspann vor der Betreffzeile",
  ...anlaesse.labels,
  [`${S}abgrenzung.eyebrow`]: "Abgrenzung · Eyebrow",
  [`${S}abgrenzung.titel`]: "Abgrenzung · Titel",
  [`${S}abgrenzung.massen_label`]: "Abgrenzung · Karte links Label",
  [`${S}abgrenzung.massen_text`]: "Abgrenzung · Karte links Text",
  [`${S}abgrenzung.daten_label`]: "Abgrenzung · Karte rechts Label",
  [`${S}abgrenzung.daten_text`]: "Abgrenzung · Karte rechts Text",
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: E-Mail-Marketing für Immobilienmakler)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: Verkäufer ansprechen, bevor sie suchen)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
