import { listeRegistrieren } from "../lesen";

/**
 * Studio-Texte /marketing-immobilienvertrieb — Struktur bleibt im Code,
 * jeder Text hier. Die mk.stats.s3_*-Keys (Studio-Zahl in der Floating
 * Card) bleiben unverändert in src/lib/content.ts, siehe R11-Auftrag.
 */
export const SEITE = { slug: "marketing-immobilienvertrieb", titel: "Marketing für Immobilienvertriebe", route: "/marketing-immobilienvertrieb" };
const S = "s.marketing-immobilienvertrieb.";

const pains = listeRegistrieren(
  "marketing-immobilienvertrieb",
  "pains",
  "Einwand",
  [
    {
      zitat: "Eine gekaufte Liste bringt dieselbe Adresse an drei Vertriebe gleichzeitig.",
      antwort:
        "Wer zuerst anruft, bekommt das Gespräch, nicht wer das bessere Angebot hat. Sie bezahlen für einen Wettlauf um einen Kontakt, der Sie noch nicht kennt.",
    },
    {
      zitat: "Ein neuer Partner bringt eigene Kontakte mit, aber kein System, das mitwächst.",
      antwort:
        "Ohne eine Struktur, die Anfragen automatisch verteilt und nachverfolgt, bremst jeder zusätzliche Partner das Team eher, als dass er es skaliert.",
    },
    {
      zitat: "Der Interessent füllt ein Formular aus, doch niemand weiß, ob er überhaupt investieren kann.",
      antwort:
        "Ohne Qualifizierung nach Einkommen und Anlagehorizont sitzt Ihr Berater im Erstgespräch einem Interessenten gegenüber, der aus Neugier klickte, nicht aus Kaufabsicht.",
    },
  ],
  { zitat: "Zitat", antwort: "Antwort" },
);

const schritte = listeRegistrieren(
  "marketing-immobilienvertrieb",
  "schritte",
  "Schritt",
  [
    {
      titel: "Ein Portal statt einer gekauften Liste",
      text: "Interessenten registrieren sich selbst, mit Angaben zu Budget und Anlagehorizont. Die Adresse gehört ab dem ersten Klick nur Ihnen.",
    },
    {
      titel: "Qualifizierung vor der Zuordnung",
      text: "Einkommen, Eigenkapital und Anlagehorizont liegen vor, bevor ein Berater den Kontakt sieht. So bekommt jeder Berater nur Interessenten, die zu seinem Angebot passen.",
    },
    {
      titel: "Automatische Zuordnung zum richtigen Berater",
      text: "Ein System verteilt jede qualifizierte Anfrage nach Region, Kapazität oder Spezialisierung, direkt und ohne Warteschleife.",
    },
    {
      titel: "Anleger-Kommunikation bis zum Notartermin",
      text: "Vom ersten Exposé bis zur Beurkundung läuft jede Nachricht automatisch, mit einem Ansprechpartner, der nach Ticketsystem arbeitet. Niemand wartet zwei Wochen auf eine Rückmeldung.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "marketing-immobilienvertrieb",
  "faq",
  "FAQ",
  [
    {
      frage: "Funktioniert das Portal auch mit einer wachsenden Partnerstruktur?",
      antwort:
        "Ja, genau dafür ist es gebaut. Neue Berater lassen sich einzeln zuordnen, ohne dass die Verteilung der Anfragen manuell neu organisiert werden muss.",
    },
    {
      frage: "Was heißt Qualifizierung nach Anlagehorizont konkret?",
      antwort:
        "Der Interessent beantwortet wenige Fragen zu Budget, Eigenkapital und Zeitrahmen, bevor er einem Berater zugeordnet wird. Der Berater sieht den Score, bevor er zum Hörer greift.",
    },
    {
      frage: "Ersetzt das Portal unsere bestehenden Vertriebspartner?",
      antwort:
        "Nein. Es liefert ihnen qualifizierte Anfragen mit Kontext, damit sie ihre Zeit auf Gespräche verwenden, die zu einem Abschluss führen können.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Marketing für Immobilienvertriebe: Kapitalanleger statt Listenkauf | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy baut Kapitalanlage-Vertrieben ein Portal, das Interessenten registriert, nach Einkommen und Anlagehorizont qualifiziert und dem richtigen Berater zuordnet, bis zum Notartermin.",
  [`${S}meta.og_titel`]: "Marketing für Immobilienvertriebe: Kapitalanleger statt Listenkauf | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein Portal, das Interessenten registriert, nach Einkommen und Anlagehorizont qualifiziert und dem richtigen Berater zuordnet, bis zum Notartermin.",

  [`${S}hero.eyebrow`]: "Marketing für Immobilienvertriebe",
  [`${S}hero.titel`]: "Marketing für Immobilienvertriebe, das *Kapitalanleger* bringt, keinen Listenkauf.",
  [`${S}hero.intro_vor`]:
    "Marketing für Immobilienvertriebe heißt: Interessenten registrieren sich über ein eigenes Portal, werden nach Einkommen und Anlagehorizont qualifiziert und landen automatisch beim passenden Berater,",
  [`${S}hero.intro_highlight`]: "statt als gekaufte Adresse im Verteiler zu enden",
  [`${S}hero.intro_nach`]: ".",
  [`${S}hero.karte_label`]: "Beweis, keine Behauptung",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Der teuerste Kontakt ist der gekaufte",
  [`${S}problem.titel`]: "Eine Liste kennt Ihren Namen *nicht*, bevor sie bei drei anderen war.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Portal, das *skaliert* statt streut.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihrer Partnerstruktur, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Eine gekaufte Liste ist kein Vertrieb. Ein Portal schon.",
  [`${S}unterschied.text`]:
    "Standardanbieter verkaufen dieselbe Adresse an mehrere Vertriebe gleichzeitig. Wir bauen Ihnen ein Portal, das jeden Interessenten registriert, qualifiziert und dem richtigen Berater zuordnet, bis zum Notartermin.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Von 60 auf über 2.300 Partner unter einer Marke, ein Finanzvertrieb, den wir von Grund auf begleitet haben.",
  [`${S}beweis.link_cases`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Gespräch wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Anleger-Portal*.",
  [`${S}finale.text_1`]:
    "Ein Portal für Kapitalanlage-Vertriebe ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_2`]: ", Referenzen in den",
  [`${S}finale.link_cases`]: "Fallstudien",
  [`${S}finale.text_3`]: ".",
  [`${S}finale.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_antwortzeit`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.intro_vor`]: "Hero · Subline, Teil vor dem Highlight",
  [`${S}hero.intro_highlight`]: "Hero · Subline, markierter Teil",
  [`${S}hero.intro_nach`]: "Hero · Subline, Abschluss nach dem Highlight",
  [`${S}hero.karte_label`]: "Hero · Floating-Card-Label (über der Studio-Zahl)",
  [`${S}hero.cta_label`]: "Hero · CTA-Button-Text",
  [`${S}hero.cta_antwortzeit`]: "Hero · Antwortzeit-Hinweis neben dem CTA",

  [`${S}problem.eyebrow`]: "Problem (PainRows) · Eyebrow",
  [`${S}problem.titel`]: "Problem (PainRows) · Titel (ein *Wort* = Highlighter)",
  ...pains.labels,

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link_cases`]: "Beweis-Anriss · Link-Text (weitere Fallstudien)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_1`]: "Finale · Satz, Teil vor Link 1 (Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_2`]: "Finale · Satz, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_cases`]: "Finale · Link-Text 2 (Fallstudien)",
  [`${S}finale.text_3`]: "Finale · Satz, Abschluss nach Link 2",
  [`${S}finale.cta_label`]: "Finale · CTA-Button-Text",
  [`${S}finale.cta_antwortzeit`]: "Finale · Antwortzeit-Hinweis unter dem CTA",
};
