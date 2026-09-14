import { listeRegistrieren } from "../lesen";

/** Studio-Texte /automatisierung-maklerbuero — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "automatisierung-maklerbuero",
  titel: "Automatisierung Maklerbüro",
  route: "/automatisierung-maklerbuero",
};
const S = "s.automatisierung-maklerbuero.";

const ablaeufe = listeRegistrieren(
  "automatisierung-maklerbuero",
  "ablaeufe",
  "Ablauf",
  [
    { ablauf: "Follow-up nach der Besichtigung", manuell: "~10 Min, oft vergessen", automatisiert: "läuft am Folgetag von selbst" },
    { ablauf: "Terminvergabe für die nächste Besichtigung", manuell: "~15 Min hin und her", automatisiert: "Kalenderlink, 2 Min bis fix" },
    { ablauf: "Wochenbericht an den Eigentümer", manuell: "~30 Min zusammentragen", automatisiert: "läuft freitags automatisch raus" },
    { ablauf: "Datenmail bei neuem passendem Objekt", manuell: "wird häufig vergessen", automatisiert: "läuft sofort bei Objekteingang" },
    { ablauf: "Rückruf nach sechs Monaten Funkstille", manuell: "passiert in der Praxis kaum", automatisiert: "läuft automatisch zum Stichtag" },
    { ablauf: "Übergabeprotokoll erstellen", manuell: "~20 Min abtippen", automatisiert: "Vorlage füllt sich aus Stichpunkten" },
    { ablauf: "CRM-Eintrag bei neuer Anfrage", manuell: "~5 Min Copy-Paste", automatisiert: "landet direkt mit Quelle im System" },
    { ablauf: "Erinnerung an fehlende Unterlagen", manuell: "wird leicht übersehen", automatisiert: "läuft X Tage nach Mandatsstart" },
    { ablauf: "Bewertungsanfrage nach dem Notartermin", manuell: "wird oft vergessen", automatisiert: "läuft 3 Tage nach dem Termin" },
  ],
  { ablauf: "Ablauf", manuell: "Manuell", automatisiert: "Automatisiert" },
);

const bleibtBeimMenschen = listeRegistrieren(
  "automatisierung-maklerbuero",
  "beimenschen",
  "Punkt",
  [
    { punkt: "Das Besichtigungsgespräch selbst, samt Einwänden und Preisverhandlung." },
    { punkt: "Die Entscheidung, ob ein Sonderfall vom Standardablauf abweichen muss." },
    { punkt: "Der erste persönliche Anruf bei einem neuen Mandat." },
    { punkt: "Die Prüfung jeder automatisch versendeten Nachricht, bevor der Ablauf live geht." },
  ],
  { punkt: "Text" },
);

const faq = listeRegistrieren(
  "automatisierung-maklerbuero",
  "faq",
  "FAQ",
  [
    {
      frage: "Verliert die Automatisierung den persönlichen Kontakt zum Kunden?",
      antwort:
        "Nein, sie übernimmt nur das Erinnern und Nachfassen, nicht das Gespräch selbst. Ein Eigentümer merkt vor allem, dass niemand vergisst zurückzurufen, nicht, dass im Hintergrund ein System läuft.",
    },
    {
      frage: "Brauche ich dafür ein komplett neues CRM?",
      antwort:
        "Nicht zwingend. Entscheidend ist, ob das bestehende System Automatisierung überhaupt zulässt und ob Anfragen dort zuverlässig ankommen. Trägt es das nicht, lohnt sich ein Wechsel eher wegen fehlender Anbindung als wegen der Automatisierung selbst.",
    },
    {
      frage: "Was passiert, wenn ein Fall wirklich individuelle Aufmerksamkeit braucht?",
      antwort:
        "Das System schlägt den nächsten Schritt vor, ein Mensch entscheidet weiterhin. Kein Ablauf versendet automatisch eine Nachricht, wenn ein Fall als Sonderfall markiert wurde.",
    },
    {
      frage: "Wie lange dauert es, bis solche Abläufe wirklich laufen?",
      antwort:
        "Je nach Umfang meist wenige Wochen, nicht Quartale, weil es sich um feste Bausteine handelt, nicht um eine Individualentwicklung von null. Wie schnell es bei Ihnen konkret geht, hängt vom bestehenden System ab.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Automatisierung im Maklerbüro: 9 Abläufe, die niemand vermisst | beuwy",
  [`${S}meta.beschreibung`]:
    "Automatisierung im Maklerbüro: 9 Abläufe von Follow-up bis Wochenbericht, mit Vorher/Nachher-Richtwerten, plus das Ticketsystem-Prinzip dahinter erklärt.",
  [`${S}meta.og_titel`]: "Automatisierung im Maklerbüro: 9 Abläufe, die niemand vermisst | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Neun Abläufe im Maklerbüro, die sich automatisieren lassen, ohne den persönlichen Kontakt zu verlieren: nach dem Ticketsystem-Prinzip.",
  [`${S}hero.eyebrow`]: "KI im Maklerbüro",
  [`${S}hero.titel`]: "Automatisierung im Maklerbüro: neun Abläufe, die *niemand* vermisst.",
  [`${S}hero.sub_vor`]:
    "Automatisieren lassen sich vor allem die Abläufe, die heute Zeit fressen, ohne dass ein Mensch dabei wirklich entscheiden muss: das Follow-up nach einer Besichtigung, die Terminvergabe, der Wochenbericht an den Eigentümer und die Datenmail zum passenden Angebot.",
  [`${S}hero.sub_highlight`]: "Jeder dieser neun Abläufe folgt demselben Prinzip",
  [`${S}hero.sub_nach`]:
    ": eine eingehende Anfrage wird zu einem Ticket mit Status, Verantwortlichem und nächstem Schritt, statt in einer Inbox zu verschwinden. Was bleibt, ist die Arbeit, die tatsächlich einen Menschen braucht: das Gespräch selbst.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}ablaeufe.eyebrow`]: "Die 9 Abläufe",
  [`${S}ablaeufe.titel`]: "Neun Aufgaben, Vorher und *Nachher*.",
  [`${S}ablaeufe.sub`]:
    "Richtwerte aus der Praxis, keine Zusage für Ihr konkretes Büro. Die Größenordnung bleibt in fast jedem Fall ähnlich.",
  [`${S}ablaeufe.spalte_ablauf`]: "Ablauf",
  [`${S}ablaeufe.spalte_manuell`]: "Manuell",
  [`${S}ablaeufe.spalte_automatisiert`]: "Automatisiert",
  ...ablaeufe.defaults,
  [`${S}ticketsystem.eyebrow`]: "Das Ticketsystem-Prinzip",
  [`${S}ticketsystem.titel`]: "Jede Anfrage bekommt einen *Status*, keine verschwindet.",
  [`${S}ticketsystem.ohne_label`]: "Ohne System",
  [`${S}ticketsystem.ohne_text`]:
    "Anfragen verteilen sich auf E-Mail-Postfach, WhatsApp und Notizzettel. Was niemand aufschreibt, wird niemand nachfassen, und was nicht nachgefasst wird, entscheidet sich woanders.",
  [`${S}ticketsystem.mit_label`]: "Mit Ticketsystem",
  [`${S}ticketsystem.mit_text`]:
    "Jede Anfrage bekommt einen Status, einen Verantwortlichen und einen nächsten Schritt mit Datum. Nichts bleibt offen, ohne dass es für jemanden sichtbar offen ist.",
  [`${S}beimenschen.eyebrow`]: "Die Grenze",
  [`${S}beimenschen.titel`]: "Was auch nach der Automatisierung beim *Menschen* bleibt.",
  ...bleibtBeimMenschen.defaults,
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Automatisierung ersetzt nicht das Gespräch.",
  [`${S}unterschied.text`]:
    "Sie sorgt dafür, dass es überhaupt stattfindet, weil niemand mehr vergisst, zurückzurufen, nachzufassen oder den Wochenbericht zu schreiben. Das Gespräch selbst bleibt bei Ihnen, jedes einzelne Mal.",
  [`${S}beweis.label`]: "Beweis, kein Konzept",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien läuft die Terminstrecke und Rückrufregel automatisch: Wer heute nicht verkauft, bekommt in sechs Monaten von selbst die richtige Mail.",
  [`${S}beweis.link`]: "Fallstudie RIEGEL Immobilien lesen →",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir die *Abläufe*, die niemand mehr vergisst.",
  [`${S}finale.satz_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_1`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_2`]: ", Follow-up und Datenmails im Detail auf",
  [`${S}finale.link_2`]: "E-Mail-Marketing für Immobilienmakler",
  [`${S}finale.satz_3`]: ", wie KI insgesamt zum System statt zum Prompt wird, zeigt",
  [`${S}finale.link_3`]: "KI für Immobilienmakler",
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
  [`${S}ablaeufe.eyebrow`]: "9 Abläufe · Eyebrow",
  [`${S}ablaeufe.titel`]: "9 Abläufe · Titel",
  [`${S}ablaeufe.sub`]: "9 Abläufe · Subline",
  [`${S}ablaeufe.spalte_ablauf`]: "9 Abläufe · Tabellenkopf Spalte 1",
  [`${S}ablaeufe.spalte_manuell`]: "9 Abläufe · Tabellenkopf Spalte 2",
  [`${S}ablaeufe.spalte_automatisiert`]: "9 Abläufe · Tabellenkopf Spalte 3",
  ...ablaeufe.labels,
  [`${S}ticketsystem.eyebrow`]: "Ticketsystem · Eyebrow",
  [`${S}ticketsystem.titel`]: "Ticketsystem · Titel",
  [`${S}ticketsystem.ohne_label`]: "Ticketsystem · Karte links Label",
  [`${S}ticketsystem.ohne_text`]: "Ticketsystem · Karte links Text",
  [`${S}ticketsystem.mit_label`]: "Ticketsystem · Karte rechts Label",
  [`${S}ticketsystem.mit_text`]: "Ticketsystem · Karte rechts Text",
  [`${S}beimenschen.eyebrow`]: "Grenze · Eyebrow",
  [`${S}beimenschen.titel`]: "Grenze · Titel",
  ...bleibtBeimMenschen.labels,
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
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: E-Mail-Marketing für Immobilienmakler)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: KI für Immobilienmakler)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
