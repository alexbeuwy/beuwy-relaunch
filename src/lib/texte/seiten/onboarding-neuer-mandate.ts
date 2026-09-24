import { listeRegistrieren } from "../lesen";

/** Studio-Texte /onboarding-neuer-mandate — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "onboarding-neuer-mandate",
  titel: "Onboarding neuer Mandate",
  route: "/onboarding-neuer-mandate",
};
const S = "s.onboarding-neuer-mandate.";

const pains = listeRegistrieren(
  "onboarding-neuer-mandate",
  "pains",
  "Einwand",
  [
    {
      zitat: "Die Unterlagen kommen häppchenweise, über drei Wochen verteilt.",
      antwort:
        "Jede fehlende Seite verzögert Exposé und Anzeige gleichermaßen. Was am ersten Tag eine einzige E-Mail hätte sein können, wird zu fünf Nachfragen über mehrere Wochen – und der Eigentümer erlebt genau diese Verzögerung als ersten Eindruck vom Mandat.",
    },
    {
      zitat:
        "Die Preisvorstellung des Eigentümers und die Markteinschätzung klaffen auseinander – gesagt wird das erst nach der ersten Preissenkung.",
      antwort:
        "Ohne eine belegte Preisstory in der ersten Woche bleibt die Preisfrage ein Gefühl auf beiden Seiten. Kommt die Differenz erst nach Wochen ohne Anfragen ans Licht, wirkt jede spätere Korrektur wie ein Eingeständnis, nicht wie Marktkenntnis von Anfang an.",
    },
    {
      zitat: "Der Eigentümer hört vier Wochen lang nichts – und fragt sich, ob überhaupt etwas passiert.",
      antwort:
        "Ohne ein Erwartungsgespräch in der ersten Woche weiß der Eigentümer nicht, wann welche Rückmeldung zu erwarten ist. Stille wird dann nicht als Arbeit im Hintergrund gelesen, sondern als Untätigkeit – und genau das prägt die Bewertung am Ende, unabhängig vom tatsächlichen Ergebnis.",
    },
  ],
  { zitat: "Zitat", antwort: "Antwort" },
);

const tage = listeRegistrieren(
  "onboarding-neuer-mandate",
  "tage",
  "Tag",
  [
    {
      tag: "Tag 1",
      titel: "Unterlagen komplett anfordern",
      text: "Grundbuchauszug, Energieausweis, Grundriss, bei Eigentumswohnungen zusätzlich Teilungserklärung und die letzten drei Protokolle der Eigentümerversammlung – als eine einzige Liste, nicht als Serie von Nachfragen. Parallel wird der Fototermin fest im Kalender fixiert.",
    },
    {
      tag: "Tag 2",
      titel: "Fototermin vorbereiten und durchführen",
      text: "Aufräumen, Licht, Perspektiven: eine kurze Checkliste an den Eigentümer vorab spart am Tag selbst Zeit. Außenaufnahmen möglichst zur Golden Hour, wo Lage und Fassade es hergeben.",
    },
    {
      tag: "Tag 3",
      titel: "Preisstory entwickeln",
      text: "Bewertung mit Vergleichsobjekten und amtlichen Bodenrichtwerten, nicht mit einer Zahl aus dem Bauchgefühl. Am Ende von Tag 3 liegt die Preisstory schriftlich vor, inklusive der Argumente, die eine Preisfrage beantworten, bevor sie gestellt wird.",
    },
    {
      tag: "Tag 4",
      titel: "Exposé-Rohfassung fertigstellen",
      text: "Text, Grundriss, erste Fotoauswahl in einer Rohfassung – nicht die Endversion, aber genug, um am nächsten Tag mit dem Eigentümer durchzugehen, was noch fehlt.",
    },
    {
      tag: "Tag 5",
      titel: "Erwartungsgespräch führen",
      text: "Zeitplan, Rhythmus der Rückmeldungen und der Umgang mit einer möglichen Preisanpassung nach den ersten Wochen ohne Angebot: alles wird an Tag 5 einmal ausgesprochen, nicht erst, wenn ein Problem entsteht.",
    },
    {
      tag: "Tag 6",
      titel: "Vermarktung live schalten",
      text: "Portale, eigene Website, gegebenenfalls Social-Media-Reichweite gehen gemeinsam an einem Tag online, nicht gestaffelt über zwei Wochen. Der erste Eindruck bei Interessenten entsteht in den ersten 48 Stunden nach Veröffentlichung.",
    },
    {
      tag: "Tag 7",
      titel: "Erste Zahlen mit dem Eigentümer teilen",
      text: "Aufrufe des Exposés, Anfragen, erste Besichtigungswünsche: eine kurze Rückmeldung nach der ersten Woche, bevor der Eigentümer selbst nachfragen muss. Der Rhythmus für die folgenden Wochenberichte steht damit bereits fest.",
    },
  ],
  { tag: "Tag-Label", titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "onboarding-neuer-mandate",
  "faq",
  "FAQ",
  [
    {
      frage: "Was, wenn Unterlagen wie das Grundbuch länger dauern als eine Woche?",
      antwort:
        "Dann läuft das Onboarding trotzdem weiter, mit einem klaren Vermerk gegenüber dem Eigentümer, welche Unterlagen noch fehlen und wer sie beim Amt angefordert hat. Nur die Veröffentlichung wartet auf die fehlenden Dokumente, die Preisstory und das Erwartungsgespräch nicht.",
    },
    {
      frage: "Muss die Exposé-Endversion schon in der ersten Woche fertig sein?",
      antwort:
        "Nein, eine Rohfassung reicht bis Tag vier. Was ein Exposé am Ende tatsächlich verkaufsfähig macht, ist eine eigene Frage, die über die erste Woche hinausgeht – die Endversion folgt, sobald alle Fotos und Unterlagen vorliegen.",
    },
    {
      frage: "Wie spreche ich eine unrealistische Preisvorstellung schon in der ersten Woche an?",
      antwort:
        "Mit der Preisstory aus Tag drei, nicht mit einer Behauptung. Vergleichsobjekte und Bodenrichtwerte zeigen dem Eigentümer eine Zahl, die er nachvollziehen kann, bevor eine Preisdiskussion überhaupt entsteht.",
    },
    {
      frage: "Wann genau bitte ich um die Google-Bewertung?",
      antwort:
        "Nicht in der ersten Woche. Der richtige Zeitpunkt liegt rund drei Tage nach dem Notartermin, wenn der Verkauf abgeschlossen ist und noch frisch im Gedächtnis liegt. Vorbereitet wird dieser Moment trotzdem schon jetzt, durch eine erste Woche, an die sich der Eigentümer positiv erinnert.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Onboarding neuer Mandate: Die erste Woche entscheidet die Bewertung | beuwy",
  [`${S}meta.beschreibung`]:
    "Onboarding neuer Mandate: die Checkliste für Tag 1 bis 7 – Unterlagen, Fototermin, Preisstory, Erwartungsgespräch. So beginnt die spätere 5-Sterne-Bewertung.",
  [`${S}meta.og_titel`]: "Onboarding neuer Mandate: Die erste Woche entscheidet die Bewertung | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein fester Ablauf für die ersten sieben Tage eines Mandats entscheidet mehr über die spätere Bewertung als jedes Gespräch am Notartermin.",
  [`${S}hero.eyebrow`]: "Onboarding & Erwartungsmanagement",
  [`${S}hero.titel`]: "Onboarding neuer Mandate: die *erste Woche* entscheidet die Bewertung.",
  [`${S}hero.sub_vor`]:
    "Ein neues Mandat starten Sie professionell mit einem festen Ablauf für die ersten sieben Tage: Unterlagen und Fototermin an Tag eins, eine belegbare Preisstory bis Tag drei, eine Exposé-Rohfassung bis Tag vier, ein Erwartungsgespräch zum Zeitplan bis Tag fünf, bevor die Vermarktung an Tag sechs live geht.",
  [`${S}hero.sub_highlight`]:
    "Diese erste Woche entscheidet mehr über die spätere Bewertung als jedes Gespräch am Notartermin",
  [`${S}hero.sub_nach`]:
    ", weil sie zeigt, ob sich der Eigentümer auf Sie verlassen kann, bevor der erste Interessent überhaupt anruft.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}problem.eyebrow`]: "Ohne Plan verliert sich die erste Woche",
  [`${S}problem.titel`]: "Was am Tag 1 fünf Minuten kostet, kostet ohne Plan *Wochen*.",
  ...pains.defaults,
  [`${S}checkliste.eyebrow`]: "Die Checkliste",
  [`${S}checkliste.titel`]: "Sieben Tage. Jeder Tag hat *genau eine* Aufgabe, die zählt.",
  [`${S}checkliste.sub`]:
    "Kein Tag ersetzt den vorigen. Wer Tag 3 überspringt, holt die Preisdiskussion später mit Zinsen nach.",
  ...tage.defaults,
  [`${S}checkliste.hinweis_vor`]:
    "Wie aus dieser Rohfassung ein Exposé wird, das den Alleinauftrag rechtfertigt, statt nur Fotos aneinanderzureihen, zeigt die Seite",
  [`${S}checkliste.hinweis_link`]: "Exposés, die verkaufen",
  [`${S}checkliste.hinweis_nach`]: ".",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Die Bewertung beginnt an Tag 1, nicht am Notartermin.",
  [`${S}unterschied.text`]:
    "Ein Eigentümer erinnert sich am Ende nicht an jede einzelne Besichtigung. Er erinnert sich, ob die erste Woche geordnet wirkte oder chaotisch. Diese Erinnerung entscheidet später über einen Satz in der Bewertung – nicht die Zahl im Kaufvertrag allein.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien landet jede Anfrage von Tag 1 an mit Quelle und nächstem Schritt im System, samt Terminstrecke und Rückrufregel. In den ersten drei Monaten nach dem Relaunch: neun zusätzliche Mandate – ein Ergebnis, das im geordneten Ablauf der ersten Woche beginnt, nicht erst beim Notartermin.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *erste Woche*.",
  [`${S}finale.satz_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_2`]: ", wie aus der Rohfassung ein Exposé wird, das verkauft, zeigt die Seite",
  [`${S}finale.link_2`]: "Exposés, die verkaufen",
  [`${S}finale.satz_3`]: ", wie Sie danach systematisch Bewertungen gewinnen, zeigt die Seite",
  [`${S}finale.link_3`]: "Bewertungen aufbauen",
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
  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel",
  ...pains.labels,
  [`${S}checkliste.eyebrow`]: "Checkliste · Eyebrow",
  [`${S}checkliste.titel`]: "Checkliste · Titel",
  [`${S}checkliste.sub`]: "Checkliste · Subline",
  ...tage.labels,
  [`${S}checkliste.hinweis_vor`]: "Checkliste · Hinweis unter der Liste (Teil vor dem Link)",
  [`${S}checkliste.hinweis_link`]: "Checkliste · Hinweis-Link (Ziel: Exposés, die verkaufen)",
  [`${S}checkliste.hinweis_nach`]: "Checkliste · Hinweis unter der Liste (Teil nach dem Link)",
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.link`]: "Beweis · Link-Beschriftung",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: Exposés, die verkaufen)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: Bewertungen aufbauen)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
