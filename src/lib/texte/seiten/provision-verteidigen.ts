import { listeRegistrieren } from "../lesen";

/** Studio-Texte /provision-verteidigen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "provision-verteidigen", titel: "Provision verteidigen", route: "/provision-verteidigen" };
const S = "s.provision-verteidigen.";

const pains = listeRegistrieren("provision-verteidigen", "pains", "Pain", [
  {
    zitat: "Drei Makler, drei Angebote, ein Vergleich: nur der Prozentsatz.",
    antwort:
      "Ohne sichtbaren Unterschied in der Leistung bleibt der Preis das einzige Kriterium, das ein Eigentümer vergleichen kann. Wer nichts zeigt, konkurriert automatisch über den niedrigsten Satz.",
  },
  {
    zitat: "„Können Sie da nicht noch etwas runtergehen?“ fällt fast in jedem Erstgespräch.",
    antwort:
      "Die Frage kommt nicht aus Geiz, sondern aus Unsicherheit: Der Eigentümer weiß nicht, wofür die Provision konkret bezahlt wird. Ohne Antwort darauf ist jeder Rabatt nur eine Frage der Hartnäckigkeit.",
  },
  {
    zitat: "Ein Nachlass heute ist ein Präzedenzfall für den nächsten Verkauf.",
    antwort:
      "Wer einmal drei Zehntel Prozentpunkte abgibt, gibt sie in der Regel jedes Mal wieder ab, sobald ein Eigentümer danach fragt. Der Rabatt wird zur Erwartung, nicht zur Ausnahme.",
  },
], { zitat: "Zitat", antwort: "Antwort" });

const schritte = listeRegistrieren("provision-verteidigen", "schritte", "Schritt", [
  {
    titel: "Vermarktungsplan vor Unterschrift",
    text: "Vor dem Alleinauftrag liegt ein konkretes Dokument auf dem Tisch: welche Kanäle, welches Budget, welcher Zeitplan bis zur ersten Besichtigung. Kein Versprechen, sondern ein Plan mit Datum.",
  },
  {
    titel: "Reichweiten-Nachweis während der Laufzeit",
    text: "Wie viele Impressionen die Anzeige erzielt hat, wie oft das Exposé geöffnet wurde, wie viele Anfragen eingegangen sind: Zahlen statt der Auskunft, es „laufe gut“.",
  },
  {
    titel: "Wochenbericht bis zum Notartermin",
    text: "Eine kurze, regelmäßige Zusammenfassung: Besichtigungen, Rückmeldungen, nächste Schritte. Der Eigentümer sieht die Arbeit, ohne selbst nachfragen zu müssen.",
  },
], { titel: "Titel", text: "Text" });

const gespraech = listeRegistrieren("provision-verteidigen", "gespraech", "Gegenüberstellung", [
  { argument: "Wie rechtfertigen Sie die Provision?", ohne: "„Das ist der übliche Satz in der Region.“", mit: "Vermarktungsplan mit Kanälen, Budget und Zeitplan liegt vor" },
  { argument: "Was passiert, wenn es länger dauert?", ohne: "keine belastbare Antwort", mit: "wöchentliche Reichweiten-Zahlen zeigen die Entwicklung" },
  { argument: "Woher weiß ich, dass etwas passiert?", ohne: "Anruf auf Nachfrage des Eigentümers", mit: "Wochenbericht ohne eigenes Nachfragen" },
  { argument: "Reaktion auf die Rabattfrage", ohne: "Nachlass, um den Auftrag nicht zu verlieren", mit: "Verweis auf den bereits gezeigten Leistungsumfang" },
], { argument: "Frage", ohne: "Ohne Nachweis", mit: "Mit Nachweis" });

const faq = listeRegistrieren("provision-verteidigen", "faq", "FAQ", [
  {
    frage: "Ist ein Preisnachlass manchmal trotzdem sinnvoll?",
    antwort:
      "In Ausnahmefällen ja, etwa bei einem sehr großen Volumen oder mehreren Objekten desselben Eigentümers. Zur Regel sollte der Nachlass aber nicht werden, sonst verliert die Provision jede Verhandlungsbasis für künftige Mandate.",
  },
  {
    frage: "Was gehört mindestens in einen Vermarktungsplan?",
    antwort:
      "Die geplanten Kanäle, ein grobes Budget, ein Zeitplan bis zur ersten Besichtigung und die Zuständigkeiten im eigenen Büro. Je konkreter das Dokument, desto schwerer fällt dem Eigentümer der Preisvergleich mit einem Makler ohne Plan.",
  },
  {
    frage: "Wie oft sollte ein Wochenbericht verschickt werden?",
    antwort:
      "Wöchentlich, solange das Mandat aktiv vermarktet wird. Ist eine Woche ereignislos, reicht ein kurzer Satz dazu, wichtiger als die Länge ist die Regelmäßigkeit, damit der Eigentümer nie selbst nachfragen muss.",
  },
  {
    frage: "Hilft das auch beim Erstgespräch, bevor überhaupt ein Auftrag besteht?",
    antwort:
      "Ja, sogar besonders dort. Ein Muster-Vermarktungsplan oder ein anonymisierter Wochenbericht aus einem früheren Mandat zeigt schon im Erstgespräch, wofür die Provision steht, bevor die Preisfrage überhaupt gestellt wird.",
  },
], { frage: "Frage", antwort: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Provision verteidigen: Beweise statt Rabatte | beuwy",
  [`${S}meta.beschreibung`]:
    "Provision verteidigen gelingt nicht über Rabatte, sondern über sichtbare Leistung: Vermarktungsplan, Reichweiten-Nachweis und Wochenbericht als Beweis.",
  [`${S}meta.og_titel`]: "Provision verteidigen: Beweise statt Rabatte | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Wer Vermarktungsplan, Reichweiten-Nachweis und Wochenbericht liefert, muss die eigene Provision nicht rechtfertigen. Der Eigentümer sieht, wofür er zahlt.",

  [`${S}kopf.eyebrow`]: "Provision & Verhandlung",
  [`${S}kopf.titel`]: "Provision verteidigen: *Beweise* statt Rabatte.",
  [`${S}kopf.sub_vor`]:
    "Ihre Provision begründen Sie nicht mit einem Satz, sondern mit sichtbarer Leistung: einem konkreten Vermarktungsplan vor der Unterschrift, einem Reichweiten-Nachweis während der Vermarktung und einem Wochenbericht bis zum Notartermin.",
  [`${S}kopf.sub_highlight`]:
    "Wer diese drei Dinge liefert, muss die Provision nicht rechtfertigen, weil der Eigentümer sieht, wofür er zahlt",
  [`${S}kopf.sub_nach`]:
    ". Ein Rabatt ersetzt diesen Beweis nicht, er verschiebt nur die nächste Preisfrage.",
  [`${S}kopf.cta`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Ohne Beweis bleibt nur der Preis",
  [`${S}problem.titel`]: "Ein Prozentsatz ohne Leistung dahinter ist *verhandelbar*.",
  ...pains.defaults,

  [`${S}schritte.eyebrow`]: "Der Mechanismus",
  [`${S}schritte.titel`]: "Drei Nachweise, die aus einem Prozentsatz eine *Leistung* machen.",
  [`${S}schritte.sub`]:
    "Keiner der drei Schritte ist aufwendig. Zusammen sorgen sie dafür, dass die Provision am Ende des Mandats nachvollziehbar ist, nicht nur behauptet.",
  ...schritte.defaults,

  [`${S}gespraech.eyebrow`]: "Dasselbe Gespräch, zwei Verläufe",
  [`${S}gespraech.titel`]: "Was Sie antworten, wenn die *Preisfrage* kommt.",
  [`${S}gespraech.kopf_argument`]: "Frage des Eigentümers",
  [`${S}gespraech.kopf_ohne`]: "Ohne Nachweis",
  [`${S}gespraech.kopf_mit`]: "Mit Vermarktungsplan & Wochenbericht",
  ...gespraech.defaults,
  [`${S}gespraech.text_vor`]:
    "Der Unterschied entsteht nicht im Gespräch selbst, sondern vorher. Wer den Vermarktungsplan erst erfindet, wenn die Rabattfrage schon im Raum steht, wirkt unvorbereitet. Wer ihn vor der Unterschrift zeigt und danach beim Wort hält, führt das Gespräch gar nicht erst über den Preis, sondern über den nächsten Schritt zum Alleinauftrag. Details dazu auf der Seite",
  [`${S}gespraech.text_link`]: "Alleinauftrag gewinnen",
  [`${S}gespraech.text_nach`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Rabatt ist ein Signal. Ein Nachweis ist ein Argument.",
  [`${S}unterschied.text`]:
    "Ein Preisnachlass sagt dem Eigentümer: Der ursprüngliche Preis war nicht ganz ernst gemeint. Ein Vermarktungsplan mit Reichweiten-Zahlen und Wochenbericht sagt etwas anderes: Hier wird gearbeitet, sichtbar, mit Nachweis, nicht auf Zuruf.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im System, samt Terminstrecke und Rückrufregel. In den ersten drei Monaten nach dem Relaunch kamen neun zusätzliche Mandate, ohne einen einzigen gekauften Lead.",
  [`${S}beweis.case_link`]: "Fallstudie RIEGEL Immobilien lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *Nachweis*.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", wie der Alleinauftrag vor dem Termin entschieden wird, zeigt die Seite",
  [`${S}finale.text_link2`]: "Alleinauftrag gewinnen",
  [`${S}finale.text_mid2`]: ", die Systematik hinter den Reichweiten-Zahlen erklärt",
  [`${S}finale.text_link3`]: "Performance-Marketing für Makler",
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
  [`${S}kopf.sub_nach`]: "Wissens-Kopf · Absatz · Rest nach dem Highlight",
  [`${S}kopf.cta`]: "Wissens-Kopf · CTA-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (*Wort* = Highlighter)",

  [`${S}schritte.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}schritte.titel`]: "Mechanismus · Titel (*Wort* = Highlighter)",
  [`${S}schritte.sub`]: "Mechanismus · Subline",

  [`${S}gespraech.eyebrow`]: "Gegenüberstellung · Eyebrow",
  [`${S}gespraech.titel`]: "Gegenüberstellung · Titel (*Wort* = Highlighter)",
  [`${S}gespraech.kopf_argument`]: "Gegenüberstellung · Spaltenkopf 1",
  [`${S}gespraech.kopf_ohne`]: "Gegenüberstellung · Spaltenkopf 2",
  [`${S}gespraech.kopf_mit`]: "Gegenüberstellung · Spaltenkopf 3",
  [`${S}gespraech.text_vor`]: "Gegenüberstellung · Absatz unter der Tabelle · Teil vor dem Link",
  [`${S}gespraech.text_link`]: "Gegenüberstellung · Absatz unter der Tabelle · Linktext",
  [`${S}gespraech.text_nach`]: "Gegenüberstellung · Absatz unter der Tabelle · Satzende",

  [`${S}unterschied.label`]: "Unterschied · Label",
  [`${S}unterschied.titel`]: "Unterschied · Titel",
  [`${S}unterschied.text`]: "Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.case_link`]: "Beweis · Linktext zur Fallstudie",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Highlighter)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (*Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Absatz · Teil vor Link 1",
  [`${S}finale.text_link1`]: "Finale · Absatz · Linktext (Hub)",
  [`${S}finale.text_mid1`]: "Finale · Absatz · Teil zwischen Link 1 und 2",
  [`${S}finale.text_link2`]: "Finale · Absatz · Linktext (Alleinauftrag gewinnen)",
  [`${S}finale.text_mid2`]: "Finale · Absatz · Teil zwischen Link 2 und 3",
  [`${S}finale.text_link3`]: "Finale · Absatz · Linktext (Performance-Marketing)",
  [`${S}finale.text_nach`]: "Finale · Absatz · Satzende",
  [`${S}finale.cta`]: "Finale · CTA-Text",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...pains.labels,
  ...schritte.labels,
  ...gespraech.labels,
  ...faq.labels,
};
