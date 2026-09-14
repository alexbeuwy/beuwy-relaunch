import { listeRegistrieren } from "../lesen";

/** Studio-Texte /ki-richtlinien-maklerbuero — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "ki-richtlinien-maklerbuero", titel: "KI-Richtlinien fürs Maklerbüro", route: "/ki-richtlinien-maklerbuero" };
const S = "s.ki-richtlinien-maklerbuero.";

const pains = listeRegistrieren("ki-richtlinien-maklerbuero", "pains", "Pain", [
  {
    zitat: "Die Adresse des Eigentümers landet im Prompt-Fenster eines fremden Anbieters.",
    antwort:
      "Wer Name, Adresse oder Verkaufsgrund in ein öffentliches KI-Tool tippt, gibt Daten an einen Anbieter weiter, mit dem meist kein Auftragsverarbeitungsvertrag besteht. Ohne Regel entscheidet das jeder im Team für sich, mal richtig, mal falsch.",
  },
  {
    zitat: "Ein KI-Text geht als eigener Text raus, bis jemand fragt, wer ihn geprüft hat.",
    antwort:
      "Ein Exposé-Absatz aus ChatGPT ist ein Rohentwurf, keine geprüfte Objektbeschreibung. Ohne festen Freigabe-Schritt verlässt der Text das Büro so, wie ihn die KI ausgespuckt hat, samt möglicher Falschangabe.",
  },
  {
    zitat: "Letzten Monat lief alles über Tool A, diesen Monat läuft die Hälfte über Tool B.",
    antwort:
      "Jedes neue Modell verspricht mehr, jeder im Team probiert etwas anderes aus. Ohne eine Linie, wer worüber entscheidet, entsteht kein System, sondern ein loses Sammelsurium an Zugängen, das niemand mehr überblickt.",
  },
], { zitat: "Zitat", antwort: "Antwort" });

const policy = listeRegistrieren("ki-richtlinien-maklerbuero", "policy", "Policy-Zeile", [
  {
    thema: "Kundendaten",
    erlaubt: "Anonymisierte Eckdaten in ein KI-Tool geben: Baujahr, Wohnfläche, Lage-Stichwort.",
    tabu: "Name, Adresse, Kontaktdaten oder den Verkaufsgrund eines Eigentümers eintippen.",
  },
  {
    thema: "Exposé-Texte",
    erlaubt: "KI-Rohtext als Startpunkt nutzen, danach gegen die Objektunterlagen prüfen.",
    tabu: "Einen KI-Text ungeprüft ins Exposé übernehmen, weil er sich flüssig liest.",
  },
  {
    thema: "Kennzeichnung",
    erlaubt: "KI-generierte Bilder oder Videos sichtbar als solche kennzeichnen, auf Website und Social Media.",
    tabu: "Ein KI-Bild als reales Foto der Immobilie oder als Team- und Kundenfoto ausgeben.",
  },
  {
    thema: "Freigaben",
    erlaubt: "Jede Zahl, jede Adresse und jede Rechtsaussage aus einem KI-Text von einer Person im Team gegenlesen lassen.",
    tabu: "Einen KI-Text direkt aus dem Chat-Fenster in eine Mail, ein Exposé oder eine Anzeige kopieren.",
  },
  {
    thema: "Werkzeug-Wahl",
    erlaubt: "Ein festgelegtes Tool je Aufgabe nutzen, das im Team bekannt ist und dokumentiert wurde.",
    tabu: "Jede Woche ein neues Tool ausprobieren, ohne dass jemand im Büro weiß, was gerade wo läuft.",
  },
  {
    thema: "Rechtsfragen & Steuerthemen",
    erlaubt: "KI-Antworten zu Steuer- oder Rechtsfragen als ersten Überblick lesen.",
    tabu: "Eine KI-Antwort zu Steuer- oder Rechtsfragen als Auskunft an den Kunden weitergeben. Das bleibt Sache von Steuerberater oder Anwalt.",
  },
], { thema: "Thema", erlaubt: "Erlaubt", tabu: "Tabu" });

const checkliste = listeRegistrieren("ki-richtlinien-maklerbuero", "checkliste", "Checkliste-Punkt", [
  { text: "Läuft das Tool über einen Geschäfts-Account mit Auftragsverarbeitungsvertrag, nicht über ein privates Konto?" },
  { text: "Stehen im Prompt nur anonymisierte Eckdaten, keine Namen, Adressen oder Kontaktdaten?" },
  { text: "Gibt es im Team eine feste Person, die KI-Texte vor der Veröffentlichung gegenliest?" },
  { text: "Ist jedes KI-Bild und jedes KI-Video sichtbar gekennzeichnet, bevor es online geht?" },
], { text: "Text" });

const faq = listeRegistrieren("ki-richtlinien-maklerbuero", "faq", "FAQ", [
  {
    frage: "Brauchen wir dafür ein langes Dokument?",
    antwort:
      "Nein. Eine Seite reicht, wenn sie die sechs Punkte oben konkret für Ihr Büro festhält: welches Tool, welcher Account, wer freigibt. Ein langes Grundsatzpapier liest im Alltag ohnehin niemand zweimal.",
  },
  {
    frage: "Wer im Team ist für die Einhaltung verantwortlich?",
    antwort:
      "In der Praxis funktioniert eine feste Ansprechperson am besten, meist die Büroleitung oder wer das CRM pflegt. Diese Person entscheidet über neue Tools und ist die letzte Prüfstation vor der Veröffentlichung eines KI-Texts.",
  },
  {
    frage: "Gilt das auch für Gratis-Tools ohne Abo?",
    antwort:
      "Gerade dort besonders. Solche Tools finanzieren sich oft über die eingegebenen Daten, ein Auftragsverarbeitungsvertrag fehlt häufig ganz. Kundendaten haben in einem solchen Tool nichts verloren, anonymisierte Eckdaten sind unkritischer.",
  },
  {
    frage: "Ist das eine Rechtsberatung zum Datenschutz?",
    antwort:
      "Nein. Diese Seite ordnet ein, wie Maklerbüros KI-Tools im Alltag sinnvoll und mit gesundem Menschenverstand einsetzen. Für eine rechtssichere Bewertung Ihrer konkreten Prozesse ist ein Datenschutzbeauftragter oder Anwalt die richtige Adresse.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "KI-Richtlinien fürs Maklerbüro: Nutzen ohne Datenpanne | beuwy",
  [`${S}meta.beschreibung`]:
    "KI-Richtlinien fürs Maklerbüro: eine Kurz-Policy zum Übernehmen für Kundendaten, Freigaben und Kennzeichnung, damit ChatGPT & Co. Zeit sparen statt Ärger.",
  [`${S}meta.og_titel`]: "KI-Richtlinien fürs Maklerbüro: Nutzen ohne Datenpanne | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Eine Kurz-Policy zum Übernehmen: Kundendaten, Freigaben, Kennzeichnung und Modell-Wechsel-Chaos für KI-Tools im Maklerbüro klar geregelt.",

  [`${S}kopf.eyebrow`]: "KI im Maklerbüro",
  [`${S}kopf.titel`]: "KI-Richtlinien fürs Maklerbüro: Nutzen, ohne dass eine *Datenpanne* draus wird.",
  [`${S}kopf.sub_vor`]:
    "Ihr Team braucht für KI-Tools sechs klare Regeln, keine Grundsatzabhandlung: welche Daten in ein Prompt-Fenster dürfen, wer einen KI-Text vor der Veröffentlichung freigibt, wie KI-Bilder gekennzeichnet werden und wer im Büro über ein neues Tool entscheidet.",
  [`${S}kopf.sub_highlight`]:
    "Ohne diese Linie entscheidet jeder im Team für sich, mal richtig, mal mit Kundendaten im falschen Fenster",
  [`${S}kopf.sub_nach`]: ".",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Ohne Regel entscheidet jeder für sich",
  [`${S}problem.titel`]: "Drei Stellen, an denen KI im Büro-Alltag *schiefläuft*.",
  ...pains.defaults,

  [`${S}policy.eyebrow`]: "Die Kurz-Policy",
  [`${S}policy.titel`]: "Sechs Themen, je eine Grenze — zum *Übernehmen* fürs eigene Büro.",
  [`${S}policy.sub`]:
    "Keine Rechtsabhandlung, sondern eine Linie, die jeder im Team in einer Minute versteht und im Alltag anwenden kann.",
  ...policy.defaults,

  [`${S}checkliste.eyebrow`]: "Vor dem ersten Prompt",
  [`${S}checkliste.titel`]: "Vier Fragen, die vor jedem neuen KI-Einsatz *geklärt* sein sollten.",
  ...checkliste.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine Regel, die keiner kennt, ist keine Regel.",
  [`${S}unterschied.text`]:
    "Eine Policy im Ordner ändert nichts am Alltag. Wirksam wird sie erst, wenn sie in den Ablauf eingebaut ist: im CRM, in der Freigabe-Kette, im Tool, das das Team tatsächlich täglich öffnet. Genau das bauen wir statt eines weiteren Dokuments.",

  [`${S}beweis.label`]: "Beweis, kein Prompt-Versuch",
  [`${S}beweis.text`]:
    "17 Jahre Systembau, davor für Bosch, Continental und Michelin. Abläufe, die ein Modellwechsel im Hintergrund nicht ins Wanken bringt, entstehen in vier bis sechs Wochen, nicht in einem Quartal.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der eigenen *Policy* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir ein System, keine weitere *Policy*-Datei.",
  [`${S}finale.text_vor`]: "Zwölf konkrete Anwendungen für den Büro-Alltag zeigt",
  [`${S}finale.text_link1`]: "ChatGPT für Makler",
  [`${S}finale.text_mid1`]: ", welche Abläufe sich lohnen",
  [`${S}finale.text_link2`]: "Automatisierung im Maklerbüro",
  [`${S}finale.text_mid2`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.text_link3`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · Titel (*Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Wissens-Kopf · Absatz · Teil vor dem Highlight",
  [`${S}kopf.sub_highlight`]: "Wissens-Kopf · Absatz · Highlight-Wortgruppe",
  [`${S}kopf.sub_nach`]: "Wissens-Kopf · Absatz · Satzende",
  [`${S}kopf.cta`]: "Wissens-Kopf · CTA-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Highlighter)",

  [`${S}policy.eyebrow`]: "Policy · Eyebrow",
  [`${S}policy.titel`]: "Policy · Titel (*Wort* = Highlighter)",
  [`${S}policy.sub`]: "Policy · Subline",

  [`${S}checkliste.eyebrow`]: "Checkliste · Eyebrow",
  [`${S}checkliste.titel`]: "Checkliste · Titel (*Wort* = Highlighter)",

  [`${S}unterschied.label`]: "Unterschied · Label",
  [`${S}unterschied.titel`]: "Unterschied · Titel",
  [`${S}unterschied.text`]: "Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (ChatGPT für Makler)",
  [`${S}finale.text_mid1`]: "Finale · Absatz · Teil zwischen Link 1 und 2",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Automatisierung im Maklerbüro)",
  [`${S}finale.text_mid2`]: "Finale · Absatz · Teil zwischen Link 2 und 3",
  [`${S}finale.text_link3`]: "Finale · Absatz · Linktext (Immobilienmarketing-Hub)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...pains.labels,
  ...policy.labels,
  ...checkliste.labels,
  ...faq.labels,
};
