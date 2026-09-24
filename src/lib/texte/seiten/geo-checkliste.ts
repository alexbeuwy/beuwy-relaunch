import { listeRegistrieren } from "../lesen";

/** Studio-Texte /geo-checkliste — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "geo-checkliste", titel: "GEO-Checkliste", route: "/geo-checkliste" };
const S = "s.geo-checkliste.";

const gruppen = listeRegistrieren(
  "geo-checkliste",
  "gruppen",
  "Gruppen-Name",
  [{ name: "Daten" }, { name: "Struktur" }, { name: "Antworten" }, { name: "Konsistenz" }],
  { name: "Name" },
);

const punkteDaten = listeRegistrieren(
  "geo-checkliste",
  "punkteDaten",
  "Punkt · Daten",
  [
    {
      titel: "Google-Unternehmensprofil vollständig",
      text: "Kategorie, Öffnungszeiten, Telefonnummer und Leistungsbeschreibung sind ausgefüllt, nicht nur der Name.",
      pruefung: "Google-Unternehmensprofil öffnen, jedes Feld einzeln durchgehen.",
    },
    {
      titel: "NAP-Konsistenz",
      text: "Name, Adresse und Telefonnummer stehen auf Website, Google-Profil und allen Portalen identisch, bis zum Schreibfehler in der Straße.",
      pruefung: "Alle drei Quellen nebeneinander öffnen und Zeichen für Zeichen vergleichen.",
    },
    {
      titel: "Strukturierte Daten für das Unternehmen",
      text: "Ein LocalBusiness-Schema auf der Website nennt Name, Adresse und Leistung maschinenlesbar, nicht nur im Fließtext.",
      pruefung: "Seitenquelltext nach „LocalBusiness“ durchsuchen oder den Rich-Results-Test von Google nutzen.",
    },
    {
      titel: "Belegte Zahlen statt Behauptungen",
      text: "Mindestens eine überprüfbare Zahl steht auf der Seite: Jahre am Markt, Anzahl vermittelter Objekte, ein Award-Platz.",
      pruefung: "Startseite und Über-uns-Seite auf eine konkrete, mit Jahr oder Quelle belegte Zahl prüfen.",
    },
    {
      titel: "Aktualitätsdatum sichtbar",
      text: "Ratgeberseiten und Marktberichte zeigen ein Datum oder einen Aktualisierungshinweis, keine zeitlose Formulierung ohne Anker.",
      pruefung: "Fünf Ratgeberseiten öffnen und auf ein sichtbares Datum prüfen.",
    },
  ],
  { titel: "Titel", text: "Text", pruefung: "Prüfmethode" },
);

const punkteStruktur = listeRegistrieren(
  "geo-checkliste",
  "punkteStruktur",
  "Punkt · Struktur",
  [
    {
      titel: "Eine Seite pro Suchfrage",
      text: "Jede typische Eigentümerfrage hat eine eigene URL, nicht nur einen Absatz auf der Startseite.",
      pruefung: "Fünf typische Suchfragen notieren und prüfen, ob dafür jeweils eine eigene Seite existiert.",
    },
    {
      titel: "Klare Überschriften-Hierarchie",
      text: "Jede Seite hat genau eine H1, die die Kernfrage benennt, darunter H2/H3 in logischer Reihenfolge.",
      pruefung: "Seitenquelltext nach H1-Tags durchsuchen — genau einer pro Seite.",
    },
    {
      titel: "Antwort direkt im ersten Absatz",
      text: "Die Kernfrage wird in zwei bis vier Sätzen direkt unter der Überschrift beantwortet, nicht erst nach der Anfahrtsbeschreibung.",
      pruefung: "Erste 300 Zeichen unter der H1 lesen und prüfen, ob die Frage darin beantwortet ist.",
    },
    {
      titel: "Ladezeit unter zwei Sekunden",
      text: "Die Seite steht, bevor der nächste Tab geöffnet ist — sonst bricht der Assistent den Abruf ab oder wertet die Quelle schlechter.",
      pruefung: "PageSpeed Insights oder einen vergleichbaren Test für die wichtigsten Seiten laufen lassen.",
    },
    {
      titel: "robots.txt und Sitemap erlauben Zugriff",
      text: "Kein Crawler-Ausschluss blockiert versehentlich die Seiten, die KI-Systeme lesen sollen.",
      pruefung: "robots.txt der Domain öffnen und auf Disallow-Zeilen prüfen, Sitemap-URL im Browser aufrufen.",
    },
  ],
  { titel: "Titel", text: "Text", pruefung: "Prüfmethode" },
);

const punkteAntworten = listeRegistrieren(
  "geo-checkliste",
  "punkteAntworten",
  "Punkt · Antworten",
  [
    {
      titel: "FAQ mit echten Fragen",
      text: "Die FAQ beantwortet Fragen, die Eigentümer wirklich stellen, in eigenen Worten, nicht in Marketingsprache.",
      pruefung: "Drei Eigentümer oder Kollegen fragen, welche Fragen sie vor der Maklerwahl hatten, und mit der FAQ abgleichen.",
    },
    {
      titel: "FAQPage-Markup hinterlegt",
      text: "Fragen und Antworten stehen zusätzlich als strukturierte Daten im Quelltext, nicht nur sichtbar im Akkordeon.",
      pruefung: "Seite im Rich-Results-Test von Google prüfen, ob FAQPage erkannt wird.",
    },
    {
      titel: "Zahlen mit Einordnung, nicht nur Wert",
      text: "Eine Kennzahl steht nie allein — daneben, was sie bedeutet und wie sie zustande kam.",
      pruefung: "Jede Zahl auf der Seite markieren und prüfen, ob ein Einordnungssatz direkt daneben steht.",
    },
    {
      titel: "Kurze, zitierfähige Sätze",
      text: "Mindestens ein Satz pro Seite beantwortet die Kernfrage komplett in sich, ohne dass der vorherige Satz nötig ist, um ihn zu verstehen.",
      pruefung: "Absatz unter der H1 isoliert lesen, so wie ein Assistent ihn zitieren würde.",
    },
    {
      titel: "Fachbegriffe erklärt, nicht vorausgesetzt",
      text: "Ein Begriff wie Alleinauftrag oder Verkehrswert wird bei erster Nennung kurz erklärt.",
      pruefung: "Seite von jemandem außerhalb der Branche gegenlesen lassen, unbekannte Begriffe markieren.",
    },
    {
      titel: "Autor oder Fachperson erkennbar",
      text: "Hinter der Seite steht eine erkennbare Person oder ein Unternehmen mit Name, nicht ein anonymer Redaktionsblock.",
      pruefung: "Prüfen, ob Autor, Unternehmen oder eine Über-uns-Verlinkung auf der Seite sichtbar ist.",
    },
  ],
  { titel: "Titel", text: "Text", pruefung: "Prüfmethode" },
);

const punkteKonsistenz = listeRegistrieren(
  "geo-checkliste",
  "punkteKonsistenz",
  "Punkt · Konsistenz",
  [
    {
      titel: "Gleiche Kernaussagen über alle Plattformen",
      text: "Website, Google-Profil, Portale und Social-Media-Bio nennen dieselbe Positionierung, nicht vier verschiedene Versionen.",
      pruefung: "Bio-Texte und Beschreibungen aller Profile nebeneinander kopieren und vergleichen.",
    },
    {
      titel: "Bewertungen aktiv und beantwortet",
      text: "Google-Bewertungen kommen regelmäßig dazu und werden beantwortet, nicht nur gesammelt.",
      pruefung: "Datum der letzten fünf Bewertungen und der letzten Antwort im Profil prüfen.",
    },
    {
      titel: "Verlinkung zwischen den eigenen Seiten",
      text: "Verwandte Themen verweisen aufeinander, damit ein Assistent den Zusammenhang der Inhalte erkennt.",
      pruefung: "Zehn Ratgeberseiten öffnen und zählen, wie viele auf eine andere eigene Seite verlinken.",
    },
    {
      titel: "Keine widersprüchlichen alten Profile",
      text: "Kein verwaistes Profil auf einer alten Plattform zeigt eine andere Adresse oder Telefonnummer.",
      pruefung: "Eigenen Firmennamen bei Google suchen und alle erscheinenden Profile öffnen.",
    },
    {
      titel: "Regelmäßige Aktualisierung statt einmaliger Aufbau",
      text: "Mindestens ein Inhalt pro Monat wird aktualisiert oder ergänzt, damit die Seite als lebendig gilt.",
      pruefung: "Änderungsdatum der letzten drei veröffentlichten Seiten prüfen.",
    },
  ],
  { titel: "Titel", text: "Text", pruefung: "Prüfmethode" },
);

const faq = listeRegistrieren(
  "geo-checkliste",
  "faq",
  "FAQ",
  [
    {
      frage: "Was ist GEO genau?",
      antwort:
        "GEO steht für Generative Engine Optimization: die Arbeit daran, dass KI-Assistenten wie ChatGPT, Perplexity oder Googles AI Overviews Sie in ihrer Antwort nennen, statt nur Google eine Rangliste von Links liefern zu lassen. Mehr zur Einordnung in Ihrem Markt zeigt GEO für Immobilienmakler.",
    },
    {
      frage: "Reicht diese Checkliste allein für Sichtbarkeit in der KI-Suche?",
      antwort:
        "Sie ist das Fundament, keine Garantie. Wie eine KI eine Quelle auswählt, hängt zusätzlich vom Modell, der Frage und dem Wettbewerb in Ihrer Stadt ab. Alle 21 Punkte umzusetzen erhöht die Chance deutlich, ersetzt aber keine laufende Beobachtung.",
    },
    {
      frage: "Wie oft sollte ich die Liste durchgehen?",
      antwort:
        "Einmal komplett zum Start, danach reicht ein Quartalscheck. Die Punkte unter Daten und Struktur ändern sich selten, die unter Konsistenz und Antworten am ehesten, weil dort Bewertungen und Inhalte laufend dazukommen.",
    },
    {
      frage: "Was mache ich, wenn mehrere Punkte gleichzeitig fehlen?",
      antwort:
        "Mit den Punkten unter Daten anfangen — ohne konsistente Adresse und ein vollständiges Unternehmensprofil bringt die beste Antwort auf der Website wenig. Danach Struktur, dann Antworten und Konsistenz.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "GEO-Checkliste: 21 Punkte, bis die KI Ihren Namen kennt | beuwy",
  [`${S}meta.beschreibung`]:
    "GEO-Checkliste mit 21 Punkten in vier Gruppen — Daten, Struktur, Antworten, Konsistenz — jeder mit Prüfmethode, damit ChatGPT & Co. Sie als Makler zitieren.",
  [`${S}meta.og_beschreibung`]:
    "21 abarbeitbare Punkte, vier Gruppen, jeder mit Prüfmethode: die GEO-Checkliste, damit KI-Assistenten Sie als Makler in ihrer Antwort nennen.",
  [`${S}hero.eyebrow`]: "GEO-Checkliste",
  [`${S}hero.titel`]: "GEO-Checkliste: 21 Punkte, bis die *KI* Ihren Namen kennt.",
  [`${S}hero.intro`]:
    "Sichtbar werden Sie in KI-Antworten, wenn vier Ebenen zusammenspielen: saubere Grunddaten, eine Seitenstruktur nach Suchfragen, Antworten, die sich in einem Satz zitieren lassen, und Konsistenz über alle Plattformen hinweg.",
  [`${S}hero.intro_highlight`]:
    "21 Punkte, vier Gruppen, jeder mit einer Methode, wie Sie ihn selbst prüfen",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  ...gruppen.defaults,
  ...punkteDaten.defaults,
  ...punkteStruktur.defaults,
  ...punkteAntworten.defaults,
  ...punkteKonsistenz.defaults,
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine Checkliste ist kein Ranking-Garant.",
  [`${S}unterschied.text`]:
    "Diese 21 Punkte sind das Fundament, das jede KI-Suche voraussetzt. Ob ein Assistent Sie am Ende tatsächlich nennt, entscheidet zusätzlich der Wettbewerb in Ihrer Stadt — genau dort setzt laufende Arbeit an, nicht eine einmalige Abhakliste.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für RIEGEL Immobilien stand das technische Fundament aus Struktur, Daten und FAQPage-Markup innerhalb von sechs Wochen. Ergebnis in den ersten drei Monaten danach: neun zusätzliche Mandate.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Durchlauf wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir das Fundament, das die *KI* zitiert.",
  [`${S}finale.text_vor`]: "Die Einordnung, warum das überhaupt zählt, steht unter",
  [`${S}finale.text_link1`]: "GEO für Immobilienmakler",
  [`${S}finale.text_mitte1`]: ", was Googles KI-Antworten für Sie bedeuten unter",
  [`${S}finale.text_link2`]: "AI Overviews",
  [`${S}finale.text_mitte2`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.text_link3`]: "Immobilienmarketing-Hub",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro`]: "Hero · Intro-Absatz (vor dem Highlighter)",
  [`${S}hero.intro_highlight`]: "Hero · Intro-Absatz · markierter Teil",
  [`${S}hero.cta_label`]: "Hero · Button-Text",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Button",
  ...gruppen.labels,
  ...punkteDaten.labels,
  ...punkteStruktur.labels,
  ...punkteAntworten.labels,
  ...punkteKonsistenz.labels,
  [`${S}unterschied.label`]: "Der Unterschied · Vorspann",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",
  [`${S}beweis.label`]: "Beweis · Vorspann",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Vorspann",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Textlink-Satz · Teil vor GEO-Link",
  [`${S}finale.text_link1`]: "Finale · Textlink-Satz · Link zu GEO für Immobilienmakler",
  [`${S}finale.text_mitte1`]: "Finale · Textlink-Satz · Teil zwischen den ersten beiden Links",
  [`${S}finale.text_link2`]: "Finale · Textlink-Satz · Link zu AI Overviews",
  [`${S}finale.text_mitte2`]: "Finale · Textlink-Satz · Teil vor dem Hub-Link",
  [`${S}finale.text_link3`]: "Finale · Textlink-Satz · Link zum Immobilienmarketing-Hub",
  [`${S}finale.cta_label`]: "Finale · Button-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Button",
};
