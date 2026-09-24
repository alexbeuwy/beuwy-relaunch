import { listeRegistrieren } from "../lesen";

/** Studio-Texte /ki-expose-texte — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "ki-expose-texte", titel: "KI-Exposé-Texte", route: "/ki-expose-texte" };
const S = "s.ki-expose-texte.";

const leitplanken = listeRegistrieren("ki-expose-texte", "leitplanken", "Leitplanke", [
  { text: "Jede Zahl im Text stammt aus geprüften Objektunterlagen, nie aus einer Annahme der KI." },
  { text: "Zustand ehrlich beschreiben, auch Mängel wie fehlender Aufzug oder Sanierungsstau." },
  { text: "Keine Übertreibungen wie „Traumhaus“ oder „einmalig“ ohne einen Beleg dahinter." },
  { text: "Aktive, konkrete Sprache statt Floskeln, die jedes zweite Exposé auch verwendet." },
  { text: "Ein Mensch liest die Fassung laut, bevor sie online geht." },
], { text: "Text" });

const faq = listeRegistrieren("ki-expose-texte", "faq", "FAQ", [
  {
    q: "Erkennt Google KI-generierte Exposé-Texte und bestraft sie?",
    a: "Google bewertet nach Nutzen und Genauigkeit des Inhalts, nicht danach, wie er entstanden ist. Ein sauber geprüfter, korrekter Text hat keinen Nachteil. Ein erkennbar automatisch wirkender, ungeprüfter Text schadet eher dem Vertrauen des Lesers als dem Ranking.",
  },
  {
    q: "Haftet der Makler für Fehler in einem KI-generierten Text?",
    a: "Der Makler veröffentlicht das Exposé, also trägt er die Verantwortung für dessen Inhalt, unabhängig davon, welches Werkzeug den Text vorformuliert hat. Das ist eine allgemeine Einordnung, keine Rechtsberatung im Einzelfall.",
  },
  {
    q: "Wie viel Zeit spart das wirklich?",
    a: "Die Rohfassung steht in ein bis zwei Minuten statt in zwanzig. Die Prüfung und Veredelung braucht weiterhin Zeit, weil sie nicht entfallen darf. Unterm Strich bleibt trotzdem eine spürbare Zeitersparnis pro Exposé.",
  },
  {
    q: "Kann ich auch Fotos von KI beschreiben lassen?",
    a: "Technisch ja, inhaltlich mit Vorsicht. Eine KI erkennt sichtbare Merkmale wie einen Balkon oder eine offene Küche, aber nicht, ob eine Wand tatsächlich tragend ist oder ein Boden frisch verlegt wurde. Auch hier gilt: Rohfassung ja, letzte Prüfung durch eine Person.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "KI-Exposé-Texte: Gut genug für den Alleinauftrag? | beuwy",
  [`${S}meta.beschreibung`]:
    "KI-Exposé-Texte: gut für die Rohfassung, nicht für die Objektwahrheit. Stil-Leitplanken, ein Vorher/Nachher-Beispiel und die Haftungsfrage klar beantwortet.",
  [`${S}meta.og_titel`]: "KI-Exposé-Texte: Gut genug für den Alleinauftrag? | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Wo KI-Exposé-Texte eine gute Rohfassung liefern und wo die Objektwahrheit anfängt: Leitplanken, ein Beispiel und die Haftungsfrage.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "KI im Maklerbüro",
  [`${S}kopf.titel`]: "KI-Exposé-Texte: gut für den *Rohtext*, nicht für die Wahrheit.",
  [`${S}kopf.text_vor`]:
    "Ja, für die Rohfassung: KI verwandelt Eckdaten in Sekunden in einen ersten, lesbaren Fließtext. Nein, für die Objektwahrheit:",
  [`${S}kopf.text_mark`]:
    "sie kennt weder den echten Zustand des Bades noch, ob die „ruhige Lage“ stimmt",
  [`${S}kopf.text_nach`]:
    ", und erfindet plausible Details, wenn Angaben fehlen. Zwischen beidem liegt die Arbeit, die bei Ihnen bleibt: prüfen, korrigieren, veredeln, bevor der Text den Alleinauftrag rechtfertigt.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}leitplanken.eyebrow`]: "Die Leitplanken",
  [`${S}leitplanken.titel`]: "Fünf Regeln, bevor ein KI-Text online *geht*.",
  ...leitplanken.defaults,

  [`${S}beispiel.eyebrow`]: "Ein Beispiel",
  [`${S}beispiel.titel`]: "Dieselben Eckdaten, zwei sehr *unterschiedliche* Texte.",
  [`${S}beispiel.sub`]:
    "Objekt: 3-Zimmer-Altbauwohnung, 78 m², Balkon, Baujahr 1905, saniert 2018, dritter Stock ohne Aufzug.",
  [`${S}beispiel.roh_label`]: "KI-Rohtext, ungeprüft veröffentlicht",
  [`${S}beispiel.roh_text`]:
    "„Diese Wohnung ist ein wahres Schmuckstück mit traumhaftem Ausblick und bietet auf 78 m² alles, was das Herz begehrt. Eine Rarität für Liebhaber gepflegter Altbauten.“",
  [`${S}beispiel.roh_problem`]:
    "Problem: „traumhafter Ausblick“ ist unbelegt, der fehlende Aufzug fehlt ganz. Beides riskiert eine Diskussion beim Besichtigungstermin, im schlimmsten Fall eine irreführende Aussage im Exposé.",
  [`${S}beispiel.fassung_label`]: "Geprüfte, veredelte Fassung",
  [`${S}beispiel.fassung_text`]:
    "„Die 78 m² große Altbauwohnung im dritten Stock liegt in einem 1905 errichteten und 2018 sanierten Haus, mit Balkon zum ruhigen Innenhof. Ein Aufzug ist nicht vorhanden, die Deckenhöhe und die sanierte Bausubstanz prägen den Charakter der Wohnung.“",
  [`${S}beispiel.fassung_hinweis`]:
    "Jede Angabe stammt aus den Objektunterlagen, der fehlende Aufzug steht bewusst im Text statt im Kleingedruckten.",

  [`${S}grenze.label`]: "Die Grenze",
  [`${S}grenze.titel`]: "Ihre Unterschrift steht am Ende, nicht die der KI.",
  [`${S}grenze.text`]:
    "Ein Exposé mit einer erfundenen Eigenschaft ist keine kleine Ungenauigkeit, sondern ein Risiko für Vertrauen und im Zweifel für die Zulässigkeit der Werbung. KI liefert den Rohtext. Die Prüfung gegen die echten Objektunterlagen bleibt bei Ihnen, jedes einzelne Mal.",

  [`${S}beweis.label`]: "Beweis, kein Prompt-Versuch",
  [`${S}beweis.titel`]: "*Siebzehn* Jahre Markenarbeit — Texte, die einer Prüfung standhalten.",
  [`${S}beweis.text`]:
    "Dieselbe Sorgfalt, mit der wir Investorenunterlagen für die Vision Group aufgesetzt haben, wenden wir auf jedes Exposé an, das über unser System läuft.",
  [`${S}beweis.link`]: "Wie ein verkaufendes Exposé aufgebaut ist →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* KI-Exposé wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Exposés, die dem *Alleinauftrag* standhalten.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", die volle Dramaturgie eines verkaufenden Exposés auf",
  [`${S}finale.link_expose`]: "Exposés, die verkaufen",
  [`${S}finale.text_mid2`]: ", weitere Anwendungen rund um ChatGPT im Maklerbüro auf",
  [`${S}finale.link_chatgpt`]: "ChatGPT für Makler",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}cta.label`]: "Der CTA-Wortlaut (Kopf + Finale)",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (*Wort* = Hervorhebung)",
  [`${S}kopf.text_vor`]: "Wissens-Kopf · Antwortsatz · Teil vor dem Highlighter",
  [`${S}kopf.text_mark`]: "Wissens-Kopf · Antwortsatz · Highlighter-Teil",
  [`${S}kopf.text_nach`]: "Wissens-Kopf · Antwortsatz · Teil nach dem Highlighter",
  [`${S}kopf.hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}leitplanken.eyebrow`]: "Leitplanken · Eyebrow",
  [`${S}leitplanken.titel`]: "Leitplanken · Titel (*Wort* = Hervorhebung)",

  [`${S}beispiel.eyebrow`]: "Beispiel · Eyebrow",
  [`${S}beispiel.titel`]: "Beispiel · Titel (*Wort* = Hervorhebung)",
  [`${S}beispiel.sub`]: "Beispiel · Objektangaben",
  [`${S}beispiel.roh_label`]: "Beispiel · Rohtext · Label",
  [`${S}beispiel.roh_text`]: "Beispiel · Rohtext · Zitat",
  [`${S}beispiel.roh_problem`]: "Beispiel · Rohtext · Problem-Hinweis",
  [`${S}beispiel.fassung_label`]: "Beispiel · Veredelte Fassung · Label",
  [`${S}beispiel.fassung_text`]: "Beispiel · Veredelte Fassung · Zitat",
  [`${S}beispiel.fassung_hinweis`]: "Beispiel · Veredelte Fassung · Hinweis",

  [`${S}grenze.label`]: "Die Grenze · Label",
  [`${S}grenze.titel`]: "Die Grenze · Titel",
  [`${S}grenze.text`]: "Die Grenze · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel (*Wort* = Hervorhebung)",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.link`]: "Beweis · Link zum Exposé-Artikel",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_expose`]: "Finale · Link · Exposés, die verkaufen",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_chatgpt`]: "Finale · Link · ChatGPT für Makler",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...leitplanken.labels,
  ...faq.labels,
};
