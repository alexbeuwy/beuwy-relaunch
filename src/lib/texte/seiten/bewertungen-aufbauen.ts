import { listeRegistrieren } from "../lesen";

/** Studio-Texte /bewertungen-aufbauen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "bewertungen-aufbauen",
  titel: "Bewertungen aufbauen",
  route: "/bewertungen-aufbauen",
};
const S = "s.bewertungen-aufbauen.";

const timing = listeRegistrieren(
  "bewertungen-aufbauen",
  "timing",
  "Termin",
  [
    {
      titel: "Tag 0: Notartermin",
      text: "Im Gespräch kurz ankündigen, dass in wenigen Tagen eine kurze Bitte um eine Bewertung kommt. Das nimmt der Nachricht später die Überraschung und erhöht die Wahrscheinlichkeit einer Antwort spürbar.",
    },
    {
      titel: "Tag 3: persönliche Nachricht",
      text: "Eine kurze, persönliche Nachricht mit direktem Bewertungslink, per WhatsApp oder E-Mail, nie über einen Massenverteiler. Der Kunde hat den Schlüssel gerade übergeben und erinnert sich an jedes Detail des Prozesses.",
    },
    {
      titel: "Tag 10: eine Erinnerung",
      text: "Bleibt eine Reaktion aus, folgt genau eine freundliche Erinnerung. Danach nicht weiter nachfassen: Wiederholtes Drängen wirkt schneller schädlich als eine fehlende Bewertung.",
    },
    {
      titel: "Danach: immer antworten",
      text: "Jede eingehende Bewertung bekommt eine Antwort, unabhängig vom Sternewert. Ein Dank bei fünf Sternen, eine sachliche Reaktion bei Kritik: beides zeigt jedem künftigen Leser, dass hier jemand hinschaut.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const leitplanken = listeRegistrieren(
  "bewertungen-aufbauen",
  "leitplanken",
  "Einwand",
  [
    {
      quote:
        "Bewertungen kaufen oder gegen einen Vorteil anbieten ist verbotene Meinungsmache, kein Marketing-Kniff.",
      antwort:
        "Gekaufte oder incentivierte Bewertungen verstoßen sowohl gegen die Google-Richtlinien als auch gegen das Wettbewerbsrecht, das echte von manipulierten Kundenmeinungen unterscheidet. Im Ernstfall drohen die Löschung aller Bewertungen und eine Abmahnung durch Wettbewerber, kein Vorteil, der das Risiko aufwiegt.",
    },
    {
      quote:
        "Nur zufriedene Kunden gezielt anzuschreiben ist erlaubt, schlechte Bewertungen einfach löschen lassen nicht.",
      antwort:
        "Wen Sie um eine Bewertung bitten, dürfen Sie frei wählen, das ist normales Marketing. Eine bestehende, echte Bewertung entfernen zu lassen, gelingt bei Google nur über eine gemeldete Regelverletzung wie Spam oder Beleidigung, nicht schon deshalb, weil sie schlecht ausfällt.",
    },
    {
      quote: "Eine schlechte Bewertung öffentlich zu kontern bringt selten etwas.",
      antwort:
        "Eine ruhige, sachliche Antwort mit dem Angebot einer Klärung abseits der Kommentarspalte wirkt auf jeden mitlesenden Interessenten glaubwürdiger als eine Rechtfertigung im Ton der Verteidigung. Der Streit selbst bleibt dann privat, die öffentliche Antwort bleibt professionell.",
    },
  ],
  { quote: "Zitat", antwort: "Antwort" },
);

const faq = listeRegistrieren(
  "bewertungen-aufbauen",
  "faq",
  "FAQ",
  [
    {
      frage: "Darf ich Kunden aktiv um eine Bewertung bitten?",
      antwort:
        "Ja, das ist eine übliche und zulässige Praxis. Problematisch wird es erst, wenn die Bitte mit einem Vorteil verknüpft, gezielt gefälscht oder unter Druck erzwungen wird. Die reine, unaufgeforderte Bitte um eine ehrliche Rückmeldung ist davon nicht betroffen.",
    },
    {
      frage: "Wie reagiere ich auf eine unfaire negative Bewertung?",
      antwort:
        "Antworten Sie sachlich, ohne Rechtfertigungston, und bieten Sie eine Klärung außerhalb der Kommentarspalte an. Eine Entfernung durch Google gelingt nur bei einem tatsächlichen Regelverstoß, etwa wenn die Bewertung nachweislich nicht von einem echten Kunden stammt, nicht schon deshalb, weil sie unangenehm ist.",
    },
    {
      frage: "Wie viele Bewertungen brauche ich, um sichtbar zu wirken?",
      antwort:
        "Eine feste Zahl gibt es nicht, entscheidender ist ein stetiger Zufluss und eine hohe Antwortquote auf jede einzelne Bewertung. Ein Profil mit wenigen, aber aktuellen und beantworteten Bewertungen wirkt vertrauenswürdiger als eines mit vielen alten ohne jede Reaktion.",
    },
    {
      frage: "Kann ich alte, schlechte Bewertungen einfach löschen lassen?",
      antwort:
        "Nur über das offizielle Melde-Verfahren von Google und nur bei einem klaren Regelverstoß, etwa Fake-Konten oder beleidigenden Inhalten. Eine echte, aber kritische Bewertung bleibt bestehen. Hier hilft eine gute, öffentlich sichtbare Antwort mehr als der Versuch, sie verschwinden zu lassen.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Bewertungen aufbauen: Vom zufriedenen Kunden zur sichtbaren Zahl | beuwy",
  [`${S}meta.beschreibung`]:
    "Bewertungen aufbauen gelingt mit festem Timing: die Bitte drei Tage nach dem Notartermin, klare Formulierungen, rechtliche Leitplanken und Umgang mit Kritik.",
  [`${S}meta.og_beschreibung`]:
    "Ein System statt Hoffnung: wann Sie um eine Bewertung bitten, wie die Nachricht klingt, wo die rechtliche Grenze liegt und wie Sie auf Kritik reagieren.",

  [`${S}hero.eyebrow`]: "Vertrauen sichtbar machen",
  [`${S}hero.titel`]: "Bewertungen aufbauen: vom zufriedenen Kunden zur *sichtbaren* Zahl.",
  [`${S}hero.text_vor`]:
    "Sie bekommen systematisch Google-Bewertungen, indem Sie den Moment fest terminieren, statt darauf zu hoffen, dass jemand von sich aus schreibt: Die Bitte kommt drei Tage nach dem Notartermin, persönlich und mit direktem Link, nicht als Massenmail Monate später.",
  [`${S}hero.text_mitte`]:
    "Ein Kunde, der gerade den Schlüssel übergeben hat, ist bereitwilliger als einer, der sich drei Monate später kaum noch an den Namen des Maklers erinnert",
  [`${S}hero.text_nach`]:
    ". Feste Formulierungen und eine klare Regel für Kritik gehören mit ins System.",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.bild_alt`]: "Makler übergibt lächelnd die Schlüssel an ein Paar vor der Haustür",

  [`${S}timing.eyebrow`]: "Das Timing",
  [`${S}timing.titel`]: "Vier Termine, die aus Zufall ein *System* machen.",
  ...timing.defaults,

  [`${S}formulierung.eyebrow`]: "Zum Übernehmen",
  [`${S}formulierung.titel`]: "Eine Nachricht, die *persönlich* klingt, nicht nach Formular.",
  [`${S}formulierung.beispiel_label`]: "Beispiel, drei Tage nach Notartermin",
  [`${S}formulierung.beispiel_text`]:
    "„Guten Tag Frau Weber, seit dem Notartermin ist jetzt eine Woche vergangen und ich hoffe, der Einzug läuft gut. Wenn Sie zwei Minuten haben: Eine kurze Bewertung bei Google würde mir sehr helfen, damit auch andere Eigentümer meine Arbeit einordnen können. Hier der Link: [Link]. Vielen Dank, und melden Sie sich jederzeit, falls noch etwas offen ist.“",
  [`${S}formulierung.text`]:
    "Der Ton bleibt derselbe wie im persönlichen Kontakt davor: keine Marketing-Sprache, kein Rabatt für eine bestimmte Sternezahl, nur eine klare, kurze Bitte.",

  [`${S}leitplanken.eyebrow`]: "Rechtliche Leitplanken",
  [`${S}leitplanken.titel`]: "Was erlaubt ist, und wo die *Grenze* verläuft.",
  [`${S}leitplanken.sub`]:
    "Eine allgemeine Einordnung, keine Rechtsberatung im Einzelfall. Bei konkreten Streitfällen hilft ein Fachanwalt für Wettbewerbsrecht weiter.",
  ...leitplanken.defaults,
  [`${S}leitplanken.text_a`]:
    "Wie diese Sichtbarkeit anschließend im Google-Unternehmensprofil ankommt, zeigt",
  [`${S}leitplanken.link`]: "Google-Unternehmensprofil für Makler",
  [`${S}leitplanken.text_b`]: ".",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Fünf Sterne sind kein Zufall. Sie sind ein Termin im Kalender.",
  [`${S}unterschied.text`]:
    "Wer auf Bewertungen wartet, bekommt sie unregelmäßig und selten von den richtigen Kunden. Wer sie terminiert, bekommt beides: mehr Bewertungen und mehr davon von genau den Kunden, deren Meinung einen neuen Eigentümer wirklich überzeugt.",

  [`${S}beweis.label`]: "Beweis, keine Behauptung",
  [`${S}beweis.titel`]:
    "Bei Königswege haben wir gesehen, wie schnell eine sichtbare, konsistente Marke Vertrauen skaliert: aus 60 Personen beim Start der Zusammenarbeit wurden über 2.300 Partner unter derselben Marke.",
  [`${S}beweis.text`]:
    "Reputation wächst selten über Nacht, aber sie wächst zuverlässig, wenn Auftritt und sichtbare Bestätigung durch andere konsequent zusammenwirken.",
  [`${S}beweis.link`]: "Fallstudie Königswege lesen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Bitte wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Bewertungssystem*.",
  [`${S}finale.text_a`]: "Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_b`]: ", wo die Bewertungen anschließend sichtbar werden, zeigt",
  [`${S}finale.link_profil`]: "Google-Unternehmensprofil für Makler",
  [`${S}finale.text_c`]: ", wie Empfehlungen insgesamt online ankommen, zeigt",
  [`${S}finale.link_empfehlung`]: "Empfehlungsgeschäft digitalisieren",
  [`${S}finale.text_d`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}hero.titel`]: "Wissens-Kopf · H1 (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Wissens-Kopf · Intro-Satz, Teil vor dem Highlight",
  [`${S}hero.text_mitte`]: "Wissens-Kopf · Intro-Satz, hervorgehobener Teil",
  [`${S}hero.text_nach`]: "Wissens-Kopf · Intro-Satz, Teil nach dem Highlight",
  [`${S}hero.cta_label`]: "Wissens-Kopf · Knopf-Text",
  [`${S}hero.cta_hinweis`]: "Wissens-Kopf · Hinweis neben dem Knopf",
  [`${S}hero.bild_alt`]: "Wissens-Kopf · Bild-Alt-Text",

  [`${S}timing.eyebrow`]: "Timing · Eyebrow",
  [`${S}timing.titel`]: "Timing · Titel (ein *Wort* = Highlighter)",
  ...timing.labels,

  [`${S}formulierung.eyebrow`]: "Formulierung · Eyebrow",
  [`${S}formulierung.titel`]: "Formulierung · Titel (ein *Wort* = Highlighter)",
  [`${S}formulierung.beispiel_label`]: "Formulierung · Karten-Label",
  [`${S}formulierung.beispiel_text`]: "Formulierung · Beispiel-Nachricht",
  [`${S}formulierung.text`]: "Formulierung · Erklärsatz danach",

  [`${S}leitplanken.eyebrow`]: "Leitplanken · Eyebrow",
  [`${S}leitplanken.titel`]: "Leitplanken · Titel (ein *Wort* = Highlighter)",
  [`${S}leitplanken.sub`]: "Leitplanken · Subline",
  ...leitplanken.labels,
  [`${S}leitplanken.text_a`]: "Leitplanken · Verweis-Satz, Teil vor dem Link",
  [`${S}leitplanken.link`]: "Leitplanken · Link-Text",
  [`${S}leitplanken.text_b`]: "Leitplanken · Verweis-Satz-Ende",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Titel",
  [`${S}beweis.text`]: "Beweis · Zusatztext",
  [`${S}beweis.link`]: "Beweis · Link-Text",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_a`]: "Finale · Satz, Teil vor Link 1",
  [`${S}finale.link_hub`]: "Finale · Link-Text (Immobilienmarketing-Hub)",
  [`${S}finale.text_b`]: "Finale · Satz, Teil zwischen Link 1 und 2",
  [`${S}finale.link_profil`]: "Finale · Link-Text (Google-Unternehmensprofil für Makler)",
  [`${S}finale.text_c`]: "Finale · Satz, Teil zwischen Link 2 und 3",
  [`${S}finale.link_empfehlung`]: "Finale · Link-Text (Empfehlungsgeschäft digitalisieren)",
  [`${S}finale.text_d`]: "Finale · Satz-Ende",
  [`${S}finale.cta_label`]: "Finale · Knopf-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Knopf",
};
