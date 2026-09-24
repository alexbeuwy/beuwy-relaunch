import { listeRegistrieren } from "../lesen";

/** Studio-Texte /immobilienmarketing — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "immobilienmarketing", titel: "Immobilienmarketing-Hub", route: "/immobilienmarketing" };
const S = "s.immobilienmarketing.";

const themen = listeRegistrieren(
  "immobilienmarketing",
  "themen",
  "Thema",
  [
    {
      titel: "Leadgenerierung für Immobilienmakler",
      text: "Anfragen sind kein Zufall, wenn das System stimmt: Rechner und Formulare, die Eigentümer qualifizieren, bevor Sie überhaupt telefonieren. So landet eine Adresse mit Score im CRM — nicht eine E-Mail, die im Postfach wartet.",
    },
    {
      titel: "Website für Immobilienmakler",
      text: "Ihre Website ist der erste Besichtigungstermin, er dauert Sekunden, nicht Minuten. Wir bauen sie als Portal, das Eigentümer registriert und qualifiziert, bevor Sie zurückrufen, mit Exposés, die den Alleinauftrag rechtfertigen.",
    },
    {
      titel: "onOffice-Websites",
      text: "Ihre Website läuft nicht neben onOffice her, sondern daran angebunden: jede Anfrage landet mit Quelle im System, kein Copy-Paste, kein vergessener Rückruf. Für Makler, die onOffice schon nutzen.",
    },
    {
      titel: "Die 30 besten Maklerwebsites Deutschlands",
      text: "Wir haben dreißig Maklerwebsites nach den Kriterien geprüft, mit denen Eigentümer unbewusst urteilen: Ladezeit, Bildsprache, Vertrauenssignale. Sehen Sie, wo die Besten stehen.",
    },
    {
      titel: "Was kostet eine Maklerwebsite?",
      text: "Vom Baukasten für dreihundert Euro bis zur Maßanfertigung — die Spannen liegen weit auseinander. Wir zeigen die realen Marktpreise, damit Sie vergleichen können, bevor Sie unterschreiben.",
    },
    {
      titel: "Maklersoftware im Vergleich",
      text: "onOffice, FLOWFACT, Propstack, JUSTIMMO: Die Software entscheidet, was Ihre Website leisten kann. Der Vergleich zeigt, welches System zu welcher Kanzleigröße passt.",
    },
    {
      titel: "BOTTIMMO-Alternative",
      text: "BOTTIMMO und ähnliche Baukästen lösen das Problem für den Durchschnitt. Wer sich davon abheben will, braucht ein Portal, das aussieht, als wäre es für genau sein Büro gebaut, weil es das ist.",
    },
    {
      titel: "KI für Immobilienmakler",
      text: "Jede Woche ein neues Modell, ChatGPT, Claude, Kimi, DeepSeek, und kaum jemand kommt mit. Wir übersetzen das in Systeme, die im Alltag wirklich Arbeit abnehmen, nicht in noch mehr Prompts zum Ausprobieren.",
    },
    {
      titel: "Immobilienmarketing-Agentur?",
      text: "Eine Agentur liefert Kampagnen und reicht die Umsetzung weiter. Wir beraten und bauen selbst, seit 17 Jahren, mit nachweisbaren Ergebnissen statt einem weiteren Pitch-Deck.",
    },
    {
      titel: "Marketing für Projektentwickler",
      text: "Ein Bauvorhaben verkauft sich nicht über eine Postkarte im Briefkasten. Marke, Vertriebsseite und Reservierungs-Funnel für Projekte, die mehrere Einheiten gleichzeitig füllen müssen.",
    },
    {
      titel: "Marketing für Bauträger",
      text: "Vom ersten Spatenstich bis zur letzten Einheit: ein System, das Interessenten registriert, qualifiziert und durch die Vertriebsphasen eines Bauprojekts führt.",
    },
    {
      titel: "Marketing für Immobilienvertriebe",
      text: "Kapitalanlage-Vertriebe leben von Terminen, nicht von Klicks. Ein System, das aus Anfragen registrierte Kontakte macht und sie an ein Vertriebsteam übergibt, das sie auch erreicht.",
    },
    {
      titel: "SEO für Immobilienmakler",
      text: "Bei „Immobilienmakler + Stadt“ stehen Portale und der Wettbewerb vorn, solange die eigene Seite nur für den Firmennamen rankt. Eine Seitenarchitektur nach Suchintention ändert das — und das Portal registriert, was die Rankings bringen.",
    },
    {
      titel: "GEO: Sichtbar in der KI-Suche",
      text: "Eigentümer fragen heute ChatGPT, welcher Makler in ihrer Stadt gut ist. Wer in diesen Antworten nicht vorkommt, existiert für sie nicht. GEO macht Ihr Haus zitierfähig — strukturierte Daten, klare Antworten, konsistente Firmendaten.",
    },
    {
      titel: "Social Media für Immobilienmakler",
      text: "Jeden Tag posten und trotzdem keine Anfrage: Reichweite verpufft, wenn sie nirgendwo registriert wird. Ein Content-System, das aufs Portal einzahlt — belegt durch unseren eigenen Vertrieb, der 380 Wohneinheiten über Instagram verkauft hat.",
    },
    {
      titel: "E-Mail-Marketing für Immobilienmakler",
      text: "Im CRM schlummern hunderte Kontakte, während Anzeigen neue Leads teuer einkaufen. Follow-up-Automation und Datenmails zum konkreten Objekt wecken sie — das Postfach verkauft mit.",
    },
    {
      titel: "Marketing für Kapitalanlage-Immobilien",
      text: "Gekaufte Anleger-Leads sind teuer, mehrfach verkauft und kalt. Ein Portal, das Anleger vorqualifiziert, bevor der Kalender belegt wird — gebaut aus eigener Vertriebserfahrung mit rund 40 Millionen Euro Volumen.",
    },
    {
      titel: "Über beuwy",
      text: "Wer hinter den Portalen steht: eine Unternehmensberatung mit 17 Jahren Markenarbeit und eigener Vertriebserfahrung — drei Stationen zum Nachlesen, vier Zusagen zum Messen.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const saeulen = listeRegistrieren(
  "immobilienmarketing",
  "saeulen",
  "Säule",
  [
    {
      titel: "Marke & Design",
      text: "Ein Auftritt, der Vertrauen schafft, bevor der erste Satz gelesen ist — Fotografie, Typografie und Sprache aus einem Guss.",
    },
    {
      titel: "Website & Experience",
      text: "Eine Website, die lädt wie das Büro, das sofort zurückruft, mit Exposés, die den Alleinauftrag rechtfertigen.",
    },
    {
      titel: "E-Mail & Funnel",
      text: "Formulare und Rechner qualifizieren Eigentümer, während Sie besichtigen — der Lead liegt mit Score im CRM, nicht im Postfach.",
    },
    {
      titel: "Automatisierung",
      text: "Wer heute nicht kauft, bekommt in sechs Monaten die richtige E-Mail. Automatisch, ohne dass jemand daran denken muss.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Immobilienmarketing: Der Premium-Ansatz für führende Makler | beuwy",
  [`${S}meta.beschreibung`]:
    "Was 2026 über Immobilienmarketing entscheidet: Marke, Sichtbarkeit und Tempo. Der Überblick für Makler, die führen wollen — mit allen Themen im Detail.",
  [`${S}meta.og_titel`]: "Immobilienmarketing: Der Premium-Ansatz für führende Makler",
  [`${S}meta.og_beschreibung`]:
    "Marke, Sichtbarkeit und Tempo entscheiden 2026 über Immobilienmarketing. Der Überblick für Makler, die ihren Vorsprung ausbauen wollen.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.eyebrow`]: "Immobilienmarketing für führende Makler",
  [`${S}hero.titel`]: "Immobilienmarketing, das *führende* Makler weiterbringt.",
  [`${S}hero.intro_vor`]:
    "Die meisten Maklerbüros posten mehr und warten auf mehr Anfragen. Wir bauen Marke, Website und Automatisierung als ein System — eines, das",
  [`${S}hero.intro_highlight`]: "auch dann arbeitet, wenn Sie gerade in der Besichtigung stehen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}hero.stempel`]: "Immobilienmarketing · beuwy",
  [`${S}einordnung.eyebrow`]: "Einordnung",
  [`${S}einordnung.titel`]: "Was 2026 über Immobilienmarketing *wirklich* entscheidet.",
  [`${S}einordnung.spalte1_titel`]: "Marke, Sichtbarkeit, Automatisierung",
  [`${S}einordnung.spalte1_p_vor`]:
    "Drei Dinge trennen 2026 die Maklerbüros, die wachsen, von denen, die nur verwalten. Erstens eine Marke, die in den ersten Sekunden Vertrauen schafft — nicht nur ein Logo, sondern Fotografie, Typografie und Sprache, die auf jedem Kanal gleich aussehen. Zweitens digitale",
  [`${S}einordnung.spalte1_link`]: "Sichtbarkeit",
  [`${S}einordnung.spalte1_p_nach`]:
    "dort, wo Eigentümer tatsächlich suchen: bei Google, nicht nur auf Portalen, in die jeder Wettbewerber ohnehin einzahlt. Drittens Automatisierung, die die Anfrage von Freitagabend nicht im Postfach liegen lässt, bis am Montag jemand Zeit findet. Eine Marke ohne Sichtbarkeit bleibt intern schön. Sichtbarkeit ohne Automatisierung bringt Anfragen, die trotzdem versickern. Wer nur eins davon hat, verliert gegen den, der alle drei kombiniert.",
  [`${S}einordnung.spalte2_titel`]: "Warum Eigentümer anders suchen als Käufer",
  [`${S}einordnung.spalte2_p_vor`]:
    "Käufer vergleichen zwanzig Angebote an einem Abend, scrollen Portale, klicken sich durch Grundrisse, speichern fünf Favoriten für später. Eigentümer suchen anders: einmal, meist entschlossen — den eigenen Stadtteil plus „Makler“, den Namen, den der Nachbar erwähnt hat, oder direkt Ihre Kanzlei. Meist vergleicht er dabei nur zwei oder drei Websites und entscheidet nach Bauchgefühl, welches Büro größer wirkt. Dieser eine Moment entscheidet, ob Ihre",
  [`${S}einordnung.spalte2_link`]: "Website",
  [`${S}einordnung.spalte2_p_nach`]:
    "den Alleinauftrag holt oder verliert, bevor das erste Gespräch überhaupt stattfindet. Wer hier nicht sofort überzeugt, bekommt keine zweite Chance — der Eigentümer ruft einfach den nächsten Namen auf der Liste an.",
  [`${S}einordnung.spalte3_titel`]: "Warum Tempo der unterschätzte Faktor ist",
  [`${S}einordnung.spalte3_p_vor`]:
    "Eine Anfrage, die nicht binnen Minuten beantwortet wird, ist kalt, bevor das Exposé fertig ist. Das gilt für den Rückruf genauso wie für die Website selbst: Eine Seite, die in unter zwei Sekunden lädt, wirkt wie das Büro, das sofort abhebt. Ein Rückruf, der erst am nächsten Morgen kommt, wirkt wie eine Absage — auch wenn er keine ist. Tempo ist kein technisches Detail für die Entwicklung im Hintergrund — es ist das erste Signal, das ein Eigentümer über die Professionalität eines Maklers bekommt, lange bevor er ein einziges Wort gelesen hat. Genau hier entscheidet sich, welche",
  [`${S}einordnung.spalte3_link`]: "CRM-Anbindung",
  [`${S}einordnung.spalte3_p_nach`]: "im Alltag wirklich trägt.",
  [`${S}themen.eyebrow`]: "Themen",
  [`${S}themen.titel`]: "Vertiefen Sie, was für Sie gerade *zählt*.",
  [`${S}themen.sub`]: "Jede Seite steht für sich — und führt zurück hierher.",
  [`${S}themen.link_label`]: "Mehr erfahren",
  ...themen.defaults,
  [`${S}saeulen.eyebrow`]: "Was wir bauen",
  [`${S}saeulen.titel`]: "Vier Säulen. *Ein* System.",
  [`${S}saeulen.sub`]:
    "Getrennt eingekauft bringt keine der vier etwas. Zusammen gebaut tragen sie sich gegenseitig.",
  ...saeulen.defaults,
  [`${S}finale.label`]: "Passt das zu Ihnen?",
  [`${S}finale.titel`]: "Für Makler, die schon *führen* — nicht für den nächsten Baukasten.",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",
  [`${S}cta.label`]: "Button-Text (überall auf der Seite)",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Hero · Intro-Absatz · Teil vor der Markierung",
  [`${S}hero.intro_highlight`]: "Hero · Intro-Absatz · markierter Teil",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem Button",
  [`${S}hero.stempel`]: "Hero · Stempel-Text auf dem Foto",
  [`${S}einordnung.eyebrow`]: "Einordnung · Eyebrow",
  [`${S}einordnung.titel`]: "Einordnung · Titel (ein *Wort* = Highlighter)",
  [`${S}einordnung.spalte1_titel`]: "Einordnung · Spalte 1 · Titel",
  [`${S}einordnung.spalte1_p_vor`]: "Einordnung · Spalte 1 · Text vor dem Link",
  [`${S}einordnung.spalte1_link`]: "Einordnung · Spalte 1 · Link-Text",
  [`${S}einordnung.spalte1_p_nach`]: "Einordnung · Spalte 1 · Text nach dem Link",
  [`${S}einordnung.spalte2_titel`]: "Einordnung · Spalte 2 · Titel",
  [`${S}einordnung.spalte2_p_vor`]: "Einordnung · Spalte 2 · Text vor dem Link",
  [`${S}einordnung.spalte2_link`]: "Einordnung · Spalte 2 · Link-Text",
  [`${S}einordnung.spalte2_p_nach`]: "Einordnung · Spalte 2 · Text nach dem Link",
  [`${S}einordnung.spalte3_titel`]: "Einordnung · Spalte 3 · Titel",
  [`${S}einordnung.spalte3_p_vor`]: "Einordnung · Spalte 3 · Text vor dem Link",
  [`${S}einordnung.spalte3_link`]: "Einordnung · Spalte 3 · Link-Text",
  [`${S}einordnung.spalte3_p_nach`]: "Einordnung · Spalte 3 · Text nach dem Link",
  [`${S}themen.eyebrow`]: "Themen · Eyebrow",
  [`${S}themen.titel`]: "Themen · Titel (ein *Wort* = Highlighter)",
  [`${S}themen.sub`]: "Themen · Subline",
  [`${S}themen.link_label`]: "Themen · Link-Beschriftung je Zeile (Desktop)",
  ...themen.labels,
  [`${S}saeulen.eyebrow`]: "Säulen · Eyebrow",
  [`${S}saeulen.titel`]: "Säulen · Titel (ein *Wort* = Highlighter)",
  [`${S}saeulen.sub`]: "Säulen · Subline",
  ...saeulen.labels,
  [`${S}finale.label`]: "Finale · Vorspann",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem Button",
};
