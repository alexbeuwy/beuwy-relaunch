import { listeRegistrieren } from "../lesen";

/** Studio-Texte /chatgpt-fuer-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "chatgpt-fuer-makler", titel: "ChatGPT für Makler", route: "/chatgpt-fuer-makler" };
const S = "s.chatgpt-fuer-makler.";

const anwendungen = listeRegistrieren(
  "chatgpt-fuer-makler",
  "anwendungen",
  "Anwendung",
  [
    {
      titel: "Exposé-Rohtext aus Eckdaten",
      text: "Adresse, Wohnfläche und Baujahr rein, ein erster Fließtext-Entwurf raus, den Sie mit echten Fakten prüfen und veredeln.",
    },
    {
      titel: "Einwand-Vorbereitung vor der Besichtigung",
      text: "Typische Einwände zu Preis oder Zustand durchspielen, bevor der Eigentümer oder Käufer sie tatsächlich stellt.",
    },
    {
      titel: "Übergabeprotokoll strukturieren",
      text: "Stichpunkte zu Zählerständen und Mängeln in eine vollständige, saubere Vorlage bringen.",
    },
    {
      titel: "E-Mail-Rohentwürfe auf Standardfragen",
      text: "Erste Fassungen für wiederkehrende Fragen zu Besichtigungsterminen oder fehlenden Unterlagen.",
    },
    {
      titel: "Social-Media-Rohtext zum neuen Objekt",
      text: "Ein erster Post-Entwurf, den Sie kürzen und mit echten Fotos statt Stockmaterial versehen.",
    },
    {
      titel: "Energieausweis in Klartext übersetzen",
      text: "Fachbegriffe wie Endenergiebedarf für den Laien verständlich zusammenfassen, ohne den Ausweis selbst zu ersetzen.",
    },
    {
      titel: "Checkliste für den Notartermin",
      text: "Unterlagen und offene Fragen strukturiert zusammenstellen, bevor der Termin ansteht.",
    },
    {
      titel: "Marktbericht-Rohtext aus Rohdaten",
      text: "Zahlen zu Kaufpreisen und Angebotsdauer in einen ersten lesbaren Text verwandeln, den Sie mit Quelle gegenprüfen.",
    },
    {
      titel: "Fragenkatalog fürs Erstgespräch",
      text: "Gezielte Fragen an den Eigentümer vorbereiten, damit im Termin selbst nichts vergessen wird.",
    },
    {
      titel: "Übersetzungs-Rohfassung für internationale Käufer",
      text: "Ein Exposé-Auszug als erste fremdsprachige Fassung, die vor Versand noch geprüft wird.",
    },
    {
      titel: "Gesprächsnotizen in eine Aufgabenliste umwandeln",
      text: "Aus einem Meeting-Protokoll eine klare To-do-Liste mit Verantwortlichkeiten machen.",
    },
    {
      titel: "Rohtext für eine Stellenanzeige",
      text: "Einen ersten Entwurf liefern, wenn das Büro wächst und eine neue Position besetzt werden soll.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "chatgpt-fuer-makler",
  "faq",
  "FAQ",
  [
    {
      frage: "Ersetzt ChatGPT einen Werbetexter oder Redakteur?",
      antwort:
        "Für Rohfassungen und erste Entwürfe ja, für die Feinarbeit nicht. Ein Text, der verkaufen soll, braucht am Ende eine Person, die Ton, Wahrheitsgehalt und Wirkung prüft. ChatGPT liefert den Rohling, nicht das fertige Ergebnis.",
    },
    {
      frage: "Darf ich Kundendaten in ChatGPT eingeben?",
      antwort:
        "Seien Sie zurückhaltend mit personenbezogenen Daten in einem offenen Chat-Fenster ohne passende Datenverarbeitungsvereinbarung. Anonymisierte Eckdaten wie Wohnfläche oder Baujahr sind unkritisch, Namen, Adressen und Vertragsdetails gehören eher in ein geprüftes System als in einen Chat. Das ist eine allgemeine Einordnung, keine Rechtsberatung. Bei Zweifeln fragen Sie Ihren Datenschutzbeauftragten.",
    },
    {
      frage: "Wie genau sind KI-generierte Texte über die Immobilie?",
      antwort:
        "Nur so genau wie die Eingabe. ChatGPT erfindet plausibel klingende Details, wenn Angaben fehlen. Jede Zahl und jede Eigenschaft im fertigen Text muss gegen die echten Objektunterlagen geprüft werden, bevor er veröffentlicht wird.",
    },
    {
      frage: "Was ist der Unterschied zwischen ChatGPT nutzen und einem System bauen?",
      antwort:
        "ChatGPT beantwortet eine einzelne Aufgabe, wenn Sie danach fragen. Ein System merkt sich, was wann zu tun ist, und läuft ohne tägliches Prompten von selbst weiter, etwa beim Nachfassen oder bei der Exposé-Erstellung.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "ChatGPT für Makler: 12 Anwendungen, die wirklich Zeit sparen | beuwy",
  [`${S}meta.beschreibung`]:
    "ChatGPT für Makler: 12 konkrete Anwendungen, die wirklich Zeit sparen, von Exposé-Rohtexten bis Übergabeprotokollen. Und die Grenze: Systeme statt Chat-Fenster.",
  [`${S}meta.og_beschreibung`]:
    "Zwölf konkrete Anwendungen für ChatGPT im Maklerbüro, promptfrei erklärt, plus die Grenze: Ein Chat-Fenster ist kein System.",
  [`${S}hero.eyebrow`]: "KI im Maklerbüro",
  [`${S}hero.titel`]: "ChatGPT für Makler: zwölf *Anwendungen*, die wirklich helfen.",
  [`${S}hero.intro_vor`]:
    "Sie können ChatGPT als Makler für alles nutzen, was heute als Rohfassung oder erste Vorbereitung auf Ihrem Schreibtisch liegt: Exposé-Rohtexte aus Eckdaten, eine",
  [`${S}hero.intro_highlight`]:
    "Einwand-Vorbereitung vor der Besichtigung, ein sauber strukturiertes Übergabeprotokoll",
  [`${S}hero.intro_nach`]:
    "und neun weitere Anwendungen. Die Grenze liegt dort, wo aus einem Prompt ein wiederkehrender Ablauf werden soll, das schafft ein Chat-Fenster allein nicht, dafür braucht es ein System.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}anwendungen.eyebrow`]: "Die 12 Anwendungen",
  [`${S}anwendungen.titel`]: "Wofür ChatGPT im Maklerbüro *wirklich* Zeit spart.",
  [`${S}anwendungen.sub`]:
    "Promptfrei erklärt: nicht die Formulierung des Prompts zählt, sondern die Aufgabe, die dahinter steckt.",
  ...anwendungen.defaults,
  [`${S}beispiel.eyebrow`]: "Ein Beispiel",
  [`${S}beispiel.titel`]: "So sieht die Einwand-Vorbereitung *konkret* aus.",
  [`${S}beispiel.situation_label`]: "Die Situation",
  [`${S}beispiel.situation_text`]:
    "Eine Altbauwohnung steht für 480.000 € im Exposé. Ein Interessent nennt beim Rundgang den sichtbaren Sanierungsstau am Bad als Grund für ein niedrigeres Gebot.",
  [`${S}beispiel.vorbereitung_label`]: "Die Vorbereitung",
  [`${S}beispiel.vorbereitung_text`]:
    "Vor dem Termin liefert ChatGPT drei Antwortbausteine: eine Einordnung der Sanierungskosten in Relation zum Kaufpreis, einen Vergleich zu ähnlichen Objekten ohne Sanierungsstau in der Umgebung, und eine Formulierung, die den Zustand nicht kleinredet. Sie wählen im Gespräch den passenden Baustein, statt spontan zu improvisieren.",
  [`${S}grenze.label`]: "Die Grenze",
  [`${S}grenze.titel`]: "Ein Chat-Fenster ist kein System.",
  [`${S}grenze.text`]:
    "Jede der zwölf Anwendungen spart Minuten an einer einzelnen Aufgabe. Was ein Maklerbüro wirklich entlastet, ist ein Ablauf, der sich selbst merkt, wann ein Exposé fällig ist oder wann nachgefasst werden muss. Genau das bauen wir, statt Ihnen eine weitere Prompt-Liste zu geben.",
  [`${S}beweis.label`]: "Beweis, kein Prompt-Versuch",
  [`${S}beweis.titel`]: "*Siebzehn* Jahre Systembau, nicht erst seit dem ersten Sprachmodell.",
  [`${S}beweis.text`]:
    "Wir übersetzen KI-Werkzeuge seit Jahren in feste Abläufe für Marken, die vor ChatGPT genauso auf funktionierende Prozesse angewiesen waren wie Ihr Büro heute.",
  [`${S}beweis.link`]: "Wie wir KI in Abläufe übersetzen",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Makler vor dem *ersten* Prompt wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir das *System*, nicht den nächsten Prompt.",
  [`${S}finale.text_vor`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.text_link1`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mitte1`]: ", wie wir KI-Werkzeuge in bleibende Abläufe übersetzen, zeigt die Seite",
  [`${S}finale.text_link2`]: "KI für Immobilienmakler",
  [`${S}finale.text_mitte2`]: ". Speziell zu Exposé-Texten und ihrer Objektwahrheit geht es auf",
  [`${S}finale.text_link3`]: "KI-Exposé-Texte",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Hero · Intro-Absatz · Teil vor der Markierung",
  [`${S}hero.intro_highlight`]: "Hero · Intro-Absatz · markierter Teil",
  [`${S}hero.intro_nach`]: "Hero · Intro-Absatz · Teil nach der Markierung",
  [`${S}hero.cta_label`]: "Hero · Button-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Button",
  [`${S}anwendungen.eyebrow`]: "Anwendungen · Eyebrow",
  [`${S}anwendungen.titel`]: "Anwendungen · Titel (ein *Wort* = Highlighter)",
  [`${S}anwendungen.sub`]: "Anwendungen · Subline",
  ...anwendungen.labels,
  [`${S}beispiel.eyebrow`]: "Beispiel · Eyebrow",
  [`${S}beispiel.titel`]: "Beispiel · Titel (ein *Wort* = Highlighter)",
  [`${S}beispiel.situation_label`]: "Beispiel · Karte 1 · Vorspann",
  [`${S}beispiel.situation_text`]: "Beispiel · Karte 1 · Text",
  [`${S}beispiel.vorbereitung_label`]: "Beispiel · Karte 2 · Vorspann",
  [`${S}beispiel.vorbereitung_text`]: "Beispiel · Karte 2 · Text",
  [`${S}grenze.label`]: "Die Grenze · Vorspann",
  [`${S}grenze.titel`]: "Die Grenze · Titel",
  [`${S}grenze.text`]: "Die Grenze · Text",
  [`${S}beweis.label`]: "Beweis · Vorspann",
  [`${S}beweis.titel`]: "Beweis · Titel (ein *Wort* = Highlighter)",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}beweis.link`]: "Beweis · Link-Text (vor dem Pfeil)",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Vorspann",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Textlink-Satz · Teil vor dem ersten Link",
  [`${S}finale.text_link1`]: "Finale · Textlink-Satz · Link zum Immobilienmarketing-Hub",
  [`${S}finale.text_mitte1`]: "Finale · Textlink-Satz · Teil vor dem KI-Link",
  [`${S}finale.text_link2`]: "Finale · Textlink-Satz · Link zu KI für Immobilienmakler",
  [`${S}finale.text_mitte2`]: "Finale · Textlink-Satz · Teil vor dem letzten Link",
  [`${S}finale.text_link3`]: "Finale · Textlink-Satz · Link zu KI-Exposé-Texte",
  [`${S}finale.cta_label`]: "Finale · Button-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Button",
};
