import { listeRegistrieren } from "../lesen";

/** Studio-Texte /empfehlungsgeschaeft-digitalisieren — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "empfehlungsgeschaeft-digitalisieren",
  titel: "Empfehlungsgeschäft digitalisieren",
  route: "/empfehlungsgeschaeft-digitalisieren",
};
const S = "s.empfehlungsgeschaeft-digitalisieren.";

const pains = listeRegistrieren(
  "empfehlungsgeschaeft-digitalisieren",
  "pains",
  "Einwand",
  [
    {
      quote: "„Ich lebe von Empfehlungen, Werbung passt nicht zu mir.“",
      antwort:
        "Empfehlungen bringen die Anfrage, nicht die Entscheidung. Der Empfohlene googelt trotzdem, bevor er anruft, und findet dort entweder die Bestätigung des Vertrauens oder den ersten Zweifel daran.",
    },
    {
      quote: "„Meine Kunden empfehlen mich sowieso weiter, dafür muss ich nichts tun.“",
      antwort:
        "Eine Empfehlung ohne online sichtbare Bestätigung bleibt ein einzelnes Gespräch zwischen zwei Menschen. Erst eine Bewertung, ein Case und ein konsistenter Auftritt machen aus der einen Empfehlung ein Muster, das sich wiederholt.",
    },
    {
      quote: "„Bewertungen aktiv einzufordern wirkt mir zu aufdringlich.“",
      antwort:
        "Der richtige Moment, kurz nach dem Notartermin, wenn die Erleichterung noch frisch ist, macht daraus keine Bitte, sondern einen natürlichen letzten Schritt des Verkaufsprozesses.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const schritte = listeRegistrieren(
  "empfehlungsgeschaeft-digitalisieren",
  "schritte",
  "Mechanismus-Schritt",
  [
    {
      titel: "Google-Profil vollständig",
      text: "Kategorien, Öffnungszeiten, echte Bewertungen statt eines leeren Eintrags mit fünf Sternen aus dem Freundeskreis.",
    },
    {
      titel: "Fallstudien statt Behauptungen",
      text: "Eine Reise mit echten Zahlen zeigt, was Sie leisten, greifbarer als jedes „langjährige Erfahrung“ im Fließtext.",
    },
    {
      titel: "Eine Marke, überall gleich",
      text: "Website, Profil und Social-Kanal erzählen dieselbe Geschichte, damit der Empfohlene Sie überall wiedererkennt.",
    },
    {
      titel: "Bewertung als fester Schritt",
      text: "Ein Prozess, der nach jedem Abschluss aktiv um eine Bewertung bittet, statt darauf zu hoffen, dass sie von allein kommt.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "empfehlungsgeschaeft-digitalisieren",
  "faq",
  "FAQ",
  [
    {
      frage: "Reicht ein Google-Profil, oder brauche ich eine eigene Website?",
      antwort:
        "Ein gepflegtes Google-Profil ist der erste, wichtigste Anker, weil es genau dort steht, wo der Empfohlene sucht. Eine eigene Website ergänzt es um das, was ein Profil nicht kann: Fallstudien, Preis-Argumentation, einen Auftritt, der Ihre gesamte Marke trägt.",
    },
    {
      frage: "Wie bekomme ich Kunden dazu, überhaupt zu bewerten?",
      antwort:
        "Der Zeitpunkt entscheidet mehr als die Formulierung: kurz nach dem Notartermin, wenn Erleichterung und Dankbarkeit am größten sind. Eine direkte, persönliche Bitte in diesem Moment wirkt deutlich besser als eine automatisierte Massen-Mail Wochen später.",
    },
    {
      frage: "Was ist der Unterschied zwischen einer Empfehlung und einem Case?",
      antwort:
        "Eine Empfehlung ist mündlich und bleibt beim einzelnen Gespräch. Ein Case macht dieselbe Geschichte online nachlesbar, mit Zahlen, für jeden, der Ihren Namen googelt, nicht nur für den einen Freundeskreis.",
    },
    {
      frage: "Wie schnell wirkt eine digitalisierte Empfehlungskette?",
      antwort:
        "Google-Profil und die ersten Bewertungen wirken oft schon innerhalb weniger Wochen. Bis eine konsistente Marke aus mehreren Empfehlungen ein verlässliches Muster macht, vergehen meist Monate, das ist ein Aufbau, kein Schalter.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Empfehlungsgeschäft digitalisieren: Wenn der Ruf online ankommt | beuwy",
  [`${S}meta.beschreibung`]:
    "Empfehlungsgeschäft digitalisieren heißt: Die Anfrage kommt durch Empfehlung, Google entscheidet sie. beuwy baut Bewertungen, Cases und Marke als Verstärker.",
  [`${S}meta.og_titel`]: "Empfehlungsgeschäft digitalisieren: Wenn der Ruf online ankommt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Die Empfehlung bringt die Anfrage, Google entscheidet sie. beuwy baut Bewertungen, Cases und eine konsistente Marke als Verstärker für Ihr Empfehlungsgeschäft.",

  [`${S}kopf.eyebrow`]: "Akquise",
  [`${S}kopf.titel`]: "Wenn der *Ruf* online ankommt.",
  [`${S}kopf.intro_vor`]:
    "Sie machen Ihr Empfehlungsgeschäft digital sichtbar, indem Sie online genau das bestätigen, was Freund oder Nachbar mündlich versprochen haben: ein Google-Profil mit echten Bewertungen, sichtbare Fallstudien und eine Marke, die auf jeder Seite gleich auftritt. Die Empfehlung bringt die Anfrage, aber",
  [`${S}kopf.intro_highlight`]: "die Google-Suche direkt danach entscheidet",
  [`${S}kopf.intro_nach`]:
    ", ob daraus ein Termin wird. Ein leeres Profil oder eine veraltete Website weckt Zweifel an der Empfehlung selbst.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}einwaende.eyebrow`]: "Der übliche Reflex",
  [`${S}einwaende.titel`]: "„Ich brauche kein Marketing“ ist selbst schon eine *Wette*.",
  ...pains.defaults,

  [`${S}schritte.eyebrow`]: "Der Mechanismus",
  [`${S}schritte.titel`]: "Vier Schritte, die aus einer Empfehlung eine *Anfrage* machen.",
  [`${S}schritte.sub`]:
    "Keiner der vier Schritte ersetzt die Empfehlung selbst. Zusammen sorgen sie dafür, dass sie online ankommt, statt im Gespräch stecken zu bleiben.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Die Empfehlung öffnet die Tür. Google hält sie offen.",
  [`${S}unterschied.text`]:
    "Ohne digitale Bestätigung bleibt jede Empfehlung ein Zufall, der beim nächsten Gespräch neu entstehen muss. Mit Profil, Cases und konsistenter Marke wird aus dem Zufall ein System, das jede einzelne Empfehlung verstärkt statt verpuffen lässt.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Ein Finanzvertrieb, der fast ausschließlich über Menschen wächst, die sich der Marke anschließen wollen: Aus 60 Personen wurden über 2.300 Partner unter derselben Marke.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir Ihr digitales *Echo*.",
  [`${S}fazit.text_1`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}fazit.link1`]: "Immobilienmarketing-Hub",
  [`${S}fazit.text_2`]: ", wer hinter dem System steht, zeigt die Seite",
  [`${S}fazit.link2`]: "Über uns",
  [`${S}fazit.text_3`]: ", und der passende Auftritt dazu ist die",
  [`${S}fazit.link3`]: "Maklerwebsite",
  [`${S}fazit.text_4`]: ".",
  [`${S}fazit.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Hervorhebung)",
  [`${S}kopf.intro_vor`]: "Wissens-Kopf · Intro-Absatz · Teil vor dem Highlighter",
  [`${S}kopf.intro_highlight`]: "Wissens-Kopf · Intro-Absatz · Highlighter-Teil",
  [`${S}kopf.intro_nach`]: "Wissens-Kopf · Intro-Absatz · Teil nach dem Highlighter",
  [`${S}kopf.cta_label`]: "Wissens-Kopf · CTA-Button-Text",
  [`${S}kopf.cta_hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}einwaende.eyebrow`]: "Einwände · Eyebrow",
  [`${S}einwaende.titel`]: "Einwände · Titel (ein *Wort* = Hervorhebung)",
  ...pains.labels,

  [`${S}schritte.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}schritte.titel`]: "Mechanismus · Titel (ein *Wort* = Hervorhebung)",
  [`${S}schritte.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Hervorhebung)",
  ...faq.labels,

  [`${S}fazit.label`]: "Finale · Label",
  [`${S}fazit.titel`]: "Finale · H2 (ein *Wort* = Hervorhebung)",
  [`${S}fazit.text_1`]: "Finale · Absatz · Teil 1 (vor Link 1)",
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (Über uns)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Maklerwebsite)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
