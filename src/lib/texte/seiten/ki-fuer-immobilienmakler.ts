import { listeRegistrieren } from "../lesen";

/**
 * Studio-Texte /ki-fuer-immobilienmakler — Struktur bleibt im Code, jeder
 * Text hier. Ausnahme: die Studio-Zahlen mk.stats.s3_* / mk.stats.s4_*
 * bleiben in content.ts (dort schon Studio-editierbar, R2-3) und werden
 * auf der Seite weiter direkt über content.ts gelesen, nicht hier
 * verdoppelt.
 */
export const SEITE = {
  slug: "ki-fuer-immobilienmakler",
  titel: "KI für Immobilienmakler",
  route: "/ki-fuer-immobilienmakler",
};
const S = "s.ki-fuer-immobilienmakler.";

const problem = listeRegistrieren(
  "ki-fuer-immobilienmakler",
  "problem",
  "Einwand",
  [
    {
      quote: "Ein guter Prompt liefert einen guten Text.",
      antwort:
        "Aber nur einen Text. Morgen brauchen Sie den nächsten Prompt, für die nächste Mail, das nächste Exposé. Die Arbeit fängt jedes Mal wieder bei null an.",
    },
    {
      quote: "Automatisieren wollen alle. Wie, weiß selten jemand.",
      antwort:
        "Prozesse abgeben, Agenten einrichten, Systeme verbinden: Dafür fehlt in den meisten Maklerbüros weder der Wille noch das Team. Es fehlt die Zeit, sich selbst einzuarbeiten.",
    },
    {
      quote: "Die Anfrage von heute Abend liegt morgen früh noch im Postfach.",
      antwort:
        "Kein einzelnes Werkzeug merkt sich das von selbst. Ohne festen Ablauf bleibt jede Automatisierung ein Versuch, den irgendwann keiner mehr weiterverfolgt.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const system = listeRegistrieren(
  "ki-fuer-immobilienmakler",
  "system",
  "Baustein",
  [
    {
      label: "Follow-up-Automation",
      satz: "Ein Ablauf merkt sich, wer heute nicht kauft, und schickt in sechs Monaten automatisch die richtige Mail. Niemand im Team muss sich das Datum notieren.",
    },
    {
      label: "Bewertungsrechner-Qualifizierung",
      satz: "Adresse rein, Ersteinschätzung raus. Der Rechner bewertet im Hintergrund und legt den Verkäufer-Lead mit Score ins CRM, während Sie noch besichtigen.",
    },
    {
      label: "Exposés im eigenen Markenlook",
      satz: "Objektdaten, Fotos und Ihr Markenlook laufen automatisch zu einem fertigen Exposé zusammen. Kein Dokument, das am Ende noch von Hand nachgebaut wird.",
    },
    {
      label: "Prozesse, die an alles denken",
      satz: "Ein Nachfass-Termin, eine Frist, eine offene Unterschrift: Das System merkt es sich und meldet sich von selbst. Ihr Team muss nur noch entscheiden, nicht mehr daran denken.",
    },
  ],
  { label: "Label", satz: "Satz" },
);

const faq = listeRegistrieren(
  "ki-fuer-immobilienmakler",
  "faq",
  "FAQ",
  [
    {
      frage: "Ersetzt das mein Team?",
      antwort:
        "Nein. Der Ablauf übernimmt die Wege, die heute liegen bleiben: Nachfassen, Sortieren, den Exposé-Zusammenbau. Entscheidungen, Besichtigungen und das Gespräch mit dem Eigentümer bleiben bei Ihrem Team. Es bekommt nur mehr Zeit dafür.",
    },
    {
      frage: "Welche Tools nutzen Sie?",
      antwort:
        "Das wechselt ständig und ist für Ihr Ergebnis nicht entscheidend. Wir wählen bei jedem Baustein das Werkzeug, das gerade am zuverlässigsten arbeitet, und tauschen es aus, sobald ein besseres verfügbar ist. Sie merken davon nichts außer dem Ergebnis.",
    },
    {
      frage: "Was, wenn nächste Woche wieder alles neu ist?",
      antwort:
        "Dann ändert sich, was unter der Haube läuft, nicht Ihr Ablauf. Das System ist so gebaut, dass ein neues Modell ausgetauscht werden kann, ohne dass Ihre Prozesse, Formulare oder Ihr CRM neu aufgesetzt werden müssen.",
    },
    {
      frage: "Muss mein Team lernen, wie man promptet?",
      antwort:
        "Nein. Der Ablauf läuft im Hintergrund, ohne dass jemand ein Prompt-Fenster öffnet. Ihr Team bedient gewohnte Oberflächen wie CRM, Postfach und Website. Die KI-Arbeit passiert dahinter, unsichtbar.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "KI für Immobilienmakler: Systeme statt Prompt-Frust | beuwy",
  [`${S}meta.beschreibung`]:
    "KI für Immobilienmakler heißt nicht mehr Prompts lernen: beuwy übersetzt ChatGPT, Claude & Co. in feste Abläufe für Anfragen, Exposés und Nachfassen. Als Unternehmensberatung, in Wochen statt Quartalen.",
  [`${S}meta.og_beschreibung`]:
    "beuwy übersetzt KI-Werkzeuge in feste Abläufe für Anfragen, Exposés und Nachfassen — als Unternehmensberatung, in Wochen statt Quartalen.",

  [`${S}hero.eyebrow`]: "KI für Immobilienmakler",
  [`${S}hero.titel`]: "KI für Immobilienmakler — *Systeme*, kein Prompt-Frust.",
  [`${S}hero.text_vor`]:
    "KI für Immobilienmakler heißt nicht, mit ChatGPT, Claude, Kimi oder DeepSeek herumzuprobieren, bis ein brauchbarer Text steht, während schon das nächste Modell ansteht. Es heißt, aus diesen Werkzeugen",
  [`${S}hero.text_mitte`]: "feste Abläufe für Anfragen, Exposés und Nachfassen",
  [`${S}hero.text_nach`]:
    "zu bauen, die laufen, ohne dass jemand im Team jeden Tag daran denken muss.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]: "Makler zeigt Kollegen ein digitales System auf dem Tablet, warmes Licht im Büro",
  [`${S}hero.karte_label`]: "Von der Diagnose bis zum ersten Ablauf",

  [`${S}problem.eyebrow`]: "Das Prompt-Problem",
  [`${S}problem.titel`]: "Wer *promptet*, bekommt Nettes. Nicht was trägt.",
  [`${S}problem.sub`]:
    "Ein Prompt ist schnell getippt. Ein Ablauf, der jede Woche von selbst läuft, ist etwas anderes. Genau da hören die meisten Erklärungen zu KI im Maklerbüro auf.",
  ...problem.defaults,

  [`${S}system.eyebrow`]: "Was daraus wird",
  [`${S}system.titel`]: "Wir übersetzen KI in Abläufe, die *bleiben*.",
  [`${S}system.sub`]:
    "Vier Bausteine, die heute in Maklerbüros laufen. Welches Modell gerade im Hintergrund rechnet, muss niemand im Team wissen.",
  ...system.defaults,

  [`${S}abgrenzung.label`]: "Die Abgrenzung",
  [`${S}abgrenzung.titel`]: "Wir sind eine Unternehmensberatung, kein Prompt-Kurs.",
  [`${S}abgrenzung.text_1`]:
    "Wir verkaufen keine Fortbildung im Prompten und keine Liste von Werkzeugen, die Ihr Team selbst zusammenstecken muss.",
  [`${S}abgrenzung.text_2`]:
    "Wir bauen die Abläufe, testen sie an Ihrem Betrieb und liefern ein System, das läuft. Beratung mit Ergebnis, keine Hausaufgabe.",

  [`${S}beweis.label`]: "Beweis, kein Prompt-Versuch",
  [`${S}beweis.titel`]: "*Siebzehn* Jahre Systembau, nicht erst seit dem ersten Sprachmodell.",
  [`${S}beweis.text`]:
    "Wochen, nicht Quartale: Ein Modellwechsel irgendwo im Hintergrund lässt Sie nicht wieder bei null anfangen, weil der Ablauf drumherum gebaut ist, nicht um ein einzelnes Werkzeug.",

  [`${S}qualifizierung.eyebrow`]: "Für wen das gebaut ist",
  [`${S}qualifizierung.titel`]: "Nicht für den ersten *Versuch* mit einem Sprachmodell.",
  [`${S}qualifizierung.sub`]:
    "Das hier ist für Büros mit laufendem Betrieb, die keine Vorlaufzeit mehr zum Ausprobieren haben. Stehen Sie noch ganz am Anfang, lohnt sich ein Gespräch trotzdem: Wir sagen ehrlich, ob sich der Aufbau eines Systems für Sie schon rechnet oder ob ein guter Prompt fürs Erste reicht.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Makler vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir das *System*, nicht den nächsten Prompt.",
  [`${S}finale.text_a`]:
    "Schreiben Sie, welchen Ablauf Ihr Team heute noch von Hand erledigt. Im Gespräch sagen wir Ihnen, was ein System davon übernehmen kann. Wie das in eine eigene",
  [`${S}finale.link_website`]: "Maklerwebsite",
  [`${S}finale.text_b`]:
    "eingebettet aussieht, zeigt die Kernleistung; einen Überblick über alle Bausteine gibt der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_c`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · H1 (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Hero · Intro-Satz, Teil vor dem Highlight",
  [`${S}hero.text_mitte`]: "Hero · Intro-Satz, hervorgehobener Teil",
  [`${S}hero.text_nach`]: "Hero · Intro-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Hero · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Hero · Bild-Alt-Text",
  [`${S}hero.karte_label`]: "Hero · Floating-Card-Label (Zahl bleibt Studio-Zahl mk.stats.s4)",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  [`${S}problem.sub`]: "Problem · Subline",
  ...problem.labels,

  [`${S}system.eyebrow`]: "System · Eyebrow",
  [`${S}system.titel`]: "System · Titel (ein *Wort* = Highlighter)",
  [`${S}system.sub`]: "System · Subline",
  ...system.labels,

  [`${S}abgrenzung.label`]: "Abgrenzung · Label",
  [`${S}abgrenzung.titel`]: "Abgrenzung · Titel",
  [`${S}abgrenzung.text_1`]: "Abgrenzung · Text, erster Absatz",
  [`${S}abgrenzung.text_2`]: "Abgrenzung · Text, zweiter Absatz",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel (ein *Wort* = Highlighter)",
  [`${S}beweis.text`]: "Beweis · Zusatztext",

  [`${S}qualifizierung.eyebrow`]: "Qualifizierung · Eyebrow",
  [`${S}qualifizierung.titel`]: "Qualifizierung · Titel (ein *Wort* = Highlighter)",
  [`${S}qualifizierung.sub`]: "Qualifizierung · Subline",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_website`]: "Finale · Link-Text (Maklerwebsite)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_c`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
