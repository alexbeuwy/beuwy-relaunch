import { listeRegistrieren } from "../lesen";

/** Studio-Texte /alleinauftrag-gewinnen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "alleinauftrag-gewinnen", titel: "Alleinauftrag gewinnen", route: "/alleinauftrag-gewinnen" };
const S = "s.alleinauftrag-gewinnen.";

const checks = listeRegistrieren("alleinauftrag-gewinnen", "checks", "Check", [
  {
    titel: "Der Google-Check",
    text: "Der Eigentümer tippt Ihren Namen oder „Makler + Stadt“ in die Suche, oft noch am Küchentisch, bevor der Termin überhaupt bestätigt ist. Was dort auftaucht, oder eben nicht auftaucht, entscheidet mit, ob er sich auf das Gespräch freut oder es nur aus Höflichkeit führt.",
  },
  {
    titel: "Der Website-Vergleich",
    text: "Drei Tabs offen, drei Makler nebeneinander: Wer wirkt wie ein Unternehmen mit über zwanzig Jahren Erfahrung, wer wie eine digitale Visitenkarte aus dem Baukasten? Diesen Vergleich trifft der Eigentümer in unter einer Minute, meist unbewusst.",
  },
  {
    titel: "Der Exposé-Blick",
    text: "Viele Eigentümer bitten vor dem ersten Termin um ein Muster-Exposé oder finden eines auf der Website. Ein Datenblatt mit Grundriss und drei Handyfotos sagt: Standard-Abwicklung. Ein Exposé mit Preis-Argumentation und durchdachten Bildern sagt: Diese Person verkauft, nicht nur verwaltet.",
  },
], { titel: "Titel", text: "Text" });

const pains = listeRegistrieren("alleinauftrag-gewinnen", "pains", "Einwand", [
  {
    quote: "„Ich biete einfach eine niedrigere Provision an, dann entscheidet sich der Eigentümer für mich.“",
    answer:
      "Ein Rabatt beantwortet keine der drei Fragen von oben. Er bestätigt sogar den Verdacht, den ein schwacher Auftritt weckt: dass hier über den Preis verkauft wird, weil sonst nichts überzeugt.",
  },
  {
    quote: "„Meine Erfahrung spricht doch für sich.“",
    answer:
      "Erfahrung, die online nicht sichtbar ist, existiert für den Eigentümer nicht. Zwanzig Jahre im Markt zählen erst, wenn Website, Exposé und Bewertungen sie belegen, nicht weil Sie sie im Termin erwähnen.",
  },
  {
    quote: "„Ich habe doch ein ImmoScout-Profil.“",
    answer:
      "Ein Portal-Profil zeigt Sie neben drei Wettbewerbern auf derselben Fläche. Es beantwortet nicht, warum der Eigentümer ausgerechnet Sie beauftragen sollte. Dafür braucht es einen eigenen Auftritt, den niemand sonst teilt.",
  },
], { quote: "Zitat", answer: "Antwort" });

const faq = listeRegistrieren("alleinauftrag-gewinnen", "faq", "FAQ", [
  {
    q: "Wie lange dauert es, bis ein neuer Auftritt beim Alleinauftrag hilft?",
    a: "Der eigene Auftritt, Website, Exposé-Vorlage, Bewertungsprofil, steht in vier bis sechs Wochen. Ab dann läuft er bei jedem neuen Termin mit. Ob er den nächsten Alleinauftrag bringt, entscheidet weiterhin das Gespräch selbst, nicht die Website allein.",
  },
  {
    q: "Reicht ein besseres Exposé nicht schon aus?",
    a: "Ein besseres Exposé hilft, ersetzt aber nicht den Google-Check und den Website-Vergleich, die meist davor liegen. Alle drei Checks zusammen entscheiden, nicht ein einzelner Baustein.",
  },
  {
    q: "Was, wenn der Eigentümer schon zwei andere Makler kennt?",
    a: "Dann läuft genau der Vergleich, um den es hier geht. Der Auftritt entscheidet, ob Sie als Dritter mithalten oder als der wirken, der die Sache versteht.",
  },
  {
    q: "Funktioniert das auch ohne Bewertungen?",
    a: "Ja, mit etwas mehr Gewicht auf Website und Exposé am Anfang. Bewertungen kommen mit jedem Abschluss dazu und verstärken den Auftritt, sie tragen ihn aber nicht allein.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Alleinauftrag gewinnen: So entscheidet sich der Eigentümer für Sie | beuwy",
  [`${S}meta.beschreibung`]:
    "Alleinauftrag gewinnen: Eigentümer prüfen Google, Website und Exposé vor dem Termin. beuwy baut den Auftritt, der überzeugt: Beweisführung statt Rabatt.",
  [`${S}meta.og_titel`]: "Alleinauftrag gewinnen: So entscheidet sich der Eigentümer für Sie | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Der Alleinauftrag fällt vor dem Termin: Google-Check, Website-Vergleich, Exposé-Qualität. beuwy baut den Auftritt, der überzeugt, bevor Sie klingeln.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Akquise",
  [`${S}kopf.titel`]: "Der Alleinauftrag fällt, bevor Sie *klingeln*.",
  [`${S}kopf.text_vor`]: "Sie gewinnen den Alleinauftrag, indem Sie die Entscheidung",
  [`${S}kopf.text_mark`]: "schon vor dem Termin",
  [`${S}kopf.text_nach`]:
    "für sich klären: Der Eigentümer googelt Ihren Namen, vergleicht drei Maklerwebsites und schaut sich an, wie ein Exposé von Ihnen aussieht. Wer dort überzeugt, muss im Wohnzimmer nur noch bestätigen, was er online schon gesehen hat. Wer dort verliert, verhandelt gegen einen Nachlass auf die Provision, gegen etwas, das der Eigentümer ohnehin nicht bewerten kann.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}checks.eyebrow`]: "Der Mechanismus",
  [`${S}checks.titel`]: "Drei Checks. Und Sie sitzen noch gar nicht am *Tisch*.",
  [`${S}checks.sub`]:
    "Der Eigentümer trifft die Vorentscheidung, bevor das erste Wort im Termin fällt. Diese drei Prüfungen laufen fast immer davor ab, oft ohne dass er es selbst bemerkt.",
  ...checks.defaults,

  [`${S}einwaende.eyebrow`]: "Der übliche Reflex",
  [`${S}einwaende.titel`]: "Der Rabatt löst das *falsche* Problem.",
  ...pains.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Beweisführung schlägt Rabatt.",
  [`${S}unterschied.text`]:
    "Ein Nachlass auf die Provision beantwortet keine der drei Fragen, die sich der Eigentümer stellt. Ein Auftritt, der Google-Check, Website-Vergleich und Exposé-Blick besteht, beantwortet alle drei und macht den Alleinauftrag zur logischen Folge, nicht zur Verhandlungssache.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Sechs Wochen nach dem Auftritt-Relaunch bei RIEGEL Immobilien: neun unterschriebene Aufträge, 342.000 € Abschlussvolumen, ohne einen einzigen Rabatt auf die Provision.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *Alleinauftrag*-Auftritt.",
  [`${S}finale.text_vor`]: "Der Auftritt ist ein Baustein unter mehreren. Einen Überblick finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: ", dazu die passende",
  [`${S}finale.link_website`]: "Maklerwebsite",
  [`${S}finale.text_mid2`]: ",",
  [`${S}finale.link_expose`]: "Exposés, die verkaufen",
  [`${S}finale.text_mid3`]: "und der",
  [`${S}finale.link_rechner`]: "Verkaufspreisrechner",
  [`${S}finale.text_nach`]: "als Erstanker für den Eigentümer.",
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

  [`${S}checks.eyebrow`]: "Checks · Eyebrow",
  [`${S}checks.titel`]: "Checks · Titel (*Wort* = Hervorhebung)",
  [`${S}checks.sub`]: "Checks · Subline",

  [`${S}einwaende.eyebrow`]: "Einwände · Eyebrow",
  [`${S}einwaende.titel`]: "Einwände · Titel (*Wort* = Hervorhebung)",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",
  [`${S}beweis.link`]: "Beweis · Link zu den Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_website`]: "Finale · Link · Maklerwebsite",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_expose`]: "Finale · Link · Exposés, die verkaufen",
  [`${S}finale.text_mid3`]: "Finale · Text · Teil zwischen Link 3 und 4",
  [`${S}finale.link_rechner`]: "Finale · Link · Verkaufspreisrechner",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 4",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...checks.labels,
  ...pains.labels,
  ...faq.labels,
};
