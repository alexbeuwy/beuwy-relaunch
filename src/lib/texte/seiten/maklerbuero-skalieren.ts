import { listeRegistrieren } from "../lesen";

/** Studio-Texte /maklerbuero-skalieren — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "maklerbuero-skalieren", titel: "Maklerbüro skalieren", route: "/maklerbuero-skalieren" };
const S = "s.maklerbuero-skalieren.";

const stufen = listeRegistrieren("maklerbuero-skalieren", "stufen", "Stufe", [
  {
    titel: "Zufluss",
    text: "Ein planbarer Strom an Eigentümer-Anfragen, unabhängig von einzelnen Empfehlungen oder guten Monaten. Ohne diese Grundlage arbeitet jede weitere Stufe mit zu wenig Material.",
  },
  {
    titel: "Prozess",
    text: "Rückrufregel, Terminvergabe, Wochenbericht: Abläufe, die im System stehen statt im Kopf des Inhabers. Erst wenn ein Ablauf ohne Erinnerung funktioniert, ist er ein Prozess.",
  },
  {
    titel: "Team",
    text: "Die erste Einstellung übernimmt einen bereits definierten Teil des Prozesses. Sie lernt einen Ablauf, keine Improvisation, und wird dadurch in Wochen statt Monaten produktiv.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("maklerbuero-skalieren", "faq", "FAQ", [
  {
    q: "Wann ist der richtige Zeitpunkt für die erste Einstellung?",
    a: "Wenn der Zufluss an Anfragen bereits stabil über mehrere Monate läuft und ein dokumentierter Prozess dafür existiert, statt Wissen nur im Kopf des Inhabers. Vorher übernimmt jede neue Person Chaos, keine Aufgabe.",
  },
  {
    q: "Soll ich zuerst einen zweiten Makler oder eine Assistenz einstellen?",
    a: "In den meisten Büros zuerst eine Assistenz oder Koordination für Termine, Rückrufe und Datenpflege. Ein zweiter Makler kostet mehr und braucht selbst schon einen funktionierenden Prozess, um produktiv zu sein, eine Koordination entlastet diesen Prozess zuerst.",
  },
  {
    q: "Wie viele Anfragen im Monat rechtfertigen eine Einstellung?",
    a: "Eine feste Zahl gibt es nicht, entscheidend ist die Auslastung: Wenn Anfragen liegen bleiben, Rückrufe sich verzögern oder Besichtigungstermine kollidieren, ist die Kapazität des Inhabers erschöpft, unabhängig von der genauen Anfragenzahl.",
  },
  {
    q: "Was, wenn der Zufluss schon da ist, aber trotzdem Chaos herrscht?",
    a: "Dann fehlt Stufe zwei, nicht Stufe drei. Eine weitere Person würde das bestehende Chaos nur auf mehr Schultern verteilen. Zuerst gehört der Prozess ins System, danach trägt jede zusätzliche Person tatsächlich zur Kapazität bei.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Maklerbüro skalieren: Vom Einzelkämpfer zum Team, das trägt | beuwy",
  [`${S}meta.beschreibung`]:
    "Maklerbüro skalieren gelingt in der Reihenfolge Zufluss, Prozess, Team, nicht umgekehrt. Welche Rolle zuerst kommt und warum System vor Headcount steht.",
  [`${S}meta.og_titel`]: "Maklerbüro skalieren: Vom Einzelkämpfer zum Team, das trägt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Wer zuerst einstellt und danach systematisiert, verdoppelt das Chaos statt die Kapazität. Die richtige Reihenfolge: Zufluss, dann Prozess, dann Team.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Skalierung & Team",
  [`${S}kopf.titel`]: "Maklerbüro skalieren: vom *Einzelkämpfer* zum Team, das trägt.",
  [`${S}kopf.text_vor`]:
    "Ein Maklerbüro skaliert nicht über mehr Personal zuerst, sondern in einer festen Reihenfolge: erst ein planbarer Zufluss an Eigentümer-Anfragen, dann ein Prozess, der diesen Zufluss ohne Zutun des Inhabers verarbeitet, erst danach die erste Einstellung.",
  [`${S}kopf.text_mark`]:
    "Wer diese Reihenfolge umdreht, stellt eine Person in ein System, das noch gar nicht existiert",
  [`${S}kopf.text_nach`]: ", und verdoppelt damit das Chaos statt die Kapazität.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}stufen.eyebrow`]: "Die Engpass-Reihenfolge",
  [`${S}stufen.titel`]: "Drei Stufen. Übersprungen wird keine davon *dauerhaft*.",
  [`${S}stufen.sub`]:
    "Jede Stufe baut auf der vorigen auf. Team ohne Prozess kostet, Prozess ohne Zufluss läuft leer.",
  ...stufen.defaults,

  [`${S}reihenfolge.eyebrow`]: "Zwei Wege, ein Ziel",
  [`${S}reihenfolge.titel`]: "Dieselbe Einstellung, zwei sehr unterschiedliche *Ergebnisse*.",
  [`${S}reihenfolge.falsch_label`]: "Falsche Reihenfolge: erst Team",
  [`${S}reihenfolge.falsch_text`]:
    "Der Inhaber stellt ein, weil er sich überlastet fühlt. Der Prozess bleibt aber Kopfsache, also fragt die neue Person ständig nach. Der Zufluss ändert sich nicht, die Kosten steigen sofort. Nach wenigen Monaten trägt die Einstellung nicht, sondern bindet zusätzlich Zeit.",
  [`${S}reihenfolge.richtig_label`]: "Richtige Reihenfolge: erst System",
  [`${S}reihenfolge.richtig_text`]:
    "Zufluss und Rückrufregel laufen bereits im CRM, ein Wochenbericht zeigt, wo Kapazität fehlt. Die erste Einstellung übernimmt einen klar begrenzten Teil davon, etwa Terminvergabe und Datenpflege, und wird produktiv, ohne dass der Inhaber jeden Handgriff erklären muss.",
  [`${S}reihenfolge.text_vor`]:
    "Wie sich Rückrufregel, Terminvergabe und Wochenbericht konkret automatisieren lassen, bevor überhaupt eine neue Person eingestellt wird, zeigt die Seite",
  [`${S}reihenfolge.link_automatisierung`]: "Automatisierung im Maklerbüro",
  [`${S}reihenfolge.text_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "System vor Headcount.",
  [`${S}unterschied.text`]:
    "Eine zusätzliche Person löst kein Problem, das im Prozess liegt. Sie verdoppelt es nur auf zwei Köpfe. Wer zuerst Zufluss und Prozess in ein System bringt, gibt jeder neuen Einstellung etwas, in das sie tatsächlich hineinwachsen kann.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "acta war kein Kunde, sondern unsere eigene Firma: in der Spitze 15 Leute, rund 380 verkaufte Wohneinheiten in drei Jahren, etwa 40 Millionen Euro Volumen, akquiriert über Instagram-Anzeigen. Der Zufluss stand, bevor die Einstellungen kamen.",
  [`${S}beweis.link`]: "Mehr über beuwy erfahren →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *System*, bevor Sie einstellen.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", welche Abläufe sich zuerst automatisieren lassen, zeigt die Seite",
  [`${S}finale.link_automatisierung`]: "Automatisierung im Maklerbüro",
  [`${S}finale.text_mid2`]: ", unsere eigene Vertriebserfahrung steht auf der Seite",
  [`${S}finale.link_ueberuns`]: "Über uns",
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

  [`${S}stufen.eyebrow`]: "Stufen · Eyebrow",
  [`${S}stufen.titel`]: "Stufen · Titel (*Wort* = Hervorhebung)",
  [`${S}stufen.sub`]: "Stufen · Subline",

  [`${S}reihenfolge.eyebrow`]: "Reihenfolge · Eyebrow",
  [`${S}reihenfolge.titel`]: "Reihenfolge · Titel (*Wort* = Hervorhebung)",
  [`${S}reihenfolge.falsch_label`]: "Reihenfolge · linke Karte · Label",
  [`${S}reihenfolge.falsch_text`]: "Reihenfolge · linke Karte · Text",
  [`${S}reihenfolge.richtig_label`]: "Reihenfolge · rechte Karte · Label",
  [`${S}reihenfolge.richtig_text`]: "Reihenfolge · rechte Karte · Text",
  [`${S}reihenfolge.text_vor`]: "Reihenfolge · Verweissatz · Teil vor dem Link",
  [`${S}reihenfolge.link_automatisierung`]: "Reihenfolge · Link · Automatisierung im Maklerbüro",
  [`${S}reihenfolge.text_nach`]: "Reihenfolge · Verweissatz · Teil nach dem Link",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",
  [`${S}beweis.link`]: "Beweis · Link zu Über uns",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_automatisierung`]: "Finale · Link · Automatisierung im Maklerbüro",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_ueberuns`]: "Finale · Link · Über uns",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...stufen.labels,
  ...faq.labels,
};
