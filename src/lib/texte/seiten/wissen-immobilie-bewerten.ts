import { listeRegistrieren } from "../lesen";

/** Studio-Texte /wissen/immobilie-bewerten — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "wissen-immobilie-bewerten", titel: "Immobilie bewerten", route: "/wissen/immobilie-bewerten" };
const S = "s.wissen-immobilie-bewerten.";

const verfahren = listeRegistrieren("wissen-immobilie-bewerten", "verfahren", "Verfahren", [
  {
    titel: "Vergleichswertverfahren",
    text: "Der Wert ergibt sich aus tatsächlich erzielten Preisen ähnlicher Objekte. Beispiel: eine 85 m² große Eigentumswohnung in einer Mittelstadt. Aus den letzten zwölf Monaten liegen sieben vergleichbare Verkäufe zwischen 2.250 €/m² und 2.480 €/m² vor, der Median liegt bei 2.380 €/m². 85 m² × 2.380 €/m² ergibt 202.300 €. Ein Abschlag für den fehlenden Balkon (−2 %) und ein Zuschlag für die Südlage (+3 %) führen zu einem Vergleichswert von rund 204.300 €. Eingesetzt wird das Verfahren dort, wo genug Vergleichsverkäufe vorliegen: bei Eigentumswohnungen, Reihen- und Einfamilienhäusern in normalen Lagen.",
  },
  {
    titel: "Ertragswertverfahren",
    text: "Der Wert ergibt sich aus der kapitalisierten Miete. Beispiel: ein Mehrfamilienhaus mit sechs Wohnungen erzielt einen Jahresrohertrag von 54.000 €. Bewirtschaftungskosten von 20 % (Verwaltung, Instandhaltungsrücklage, Mietausfallwagnis) ziehen 10.800 € ab, es bleibt ein Reinertrag von 43.200 €. Der Bodenwert von 140.000 € wird mit dem Liegenschaftszins von 4 % verzinst, das sind 5.600 € pro Jahr, die vom Reinertrag abgehen: 37.600 € Gebäudereinertrag. Bei einer Restnutzungsdauer von 45 Jahren und demselben Zins liefert die Vervielfältiger-Tabelle einen Faktor von rund 20,7. 37.600 € × 20,7 ergibt 778.320 € Gebäudeertragswert, plus 140.000 € Bodenwert: ein Ertragswert von rund 918.000 €. Eingesetzt wird das Verfahren bei vermieteten Mehrfamilienhäusern und Renditeobjekten.",
  },
  {
    titel: "Sachwertverfahren",
    text: "Der Wert ergibt sich getrennt aus Bau- und Bodenkosten. Beispiel: ein freistehendes Einfamilienhaus, 160 m² Wohnfläche, Baujahr 2005, 550 m² Grundstück. Regelherstellungskosten von 1.850 €/m² ergeben 296.000 € Herstellungswert. Nach 21 Jahren Alter bei 80 Jahren Gesamtnutzungsdauer zieht die Alterswertminderung von 26,3 % rund 77.850 € ab, macht 218.150 € Gebäudesachwert. Der Bodenwert (550 m² × 320 €/m²) beträgt 176.000 €. Vorläufiger Sachwert: 394.150 €, ein Marktanpassungsfaktor von 1,05 für die gefragte Lage hebt ihn auf rund 414.000 €. Eingesetzt wird das Verfahren bei selbstgenutzten Häusern ohne genug Vergleichsfälle und bei Sonderimmobilien.",
  },
], { titel: "Titel", text: "Text" });

const vergleich = listeRegistrieren("wissen-immobilie-bewerten", "vergleichstabelle", "Vergleichszeile", [
  { verfahren: "Vergleichswert", fall: "Eigentumswohnung, ausreichend Vergleichsverkäufe", ergebnis: "204.300 €" },
  { verfahren: "Ertragswert", fall: "Vermietetes Mehrfamilienhaus", ergebnis: "918.000 €" },
  { verfahren: "Sachwert", fall: "Selbstgenutztes Haus ohne Vergleichsfälle", ergebnis: "414.000 €" },
], { verfahren: "Verfahren", fall: "Typischer Fall", ergebnis: "Ergebnis" });

const faq = listeRegistrieren("wissen-immobilie-bewerten", "faq", "FAQ", [
  {
    q: "Ersetzt eine Online-Bewertung ein Gutachten oder eine Maklereinschätzung?",
    a: "Nein. Ein Online-Rechner liefert in wenigen Minuten eine erste Hausnummer auf Basis von Durchschnittswerten. Ein Gutachten oder eine Einschätzung vor Ort berücksichtigt zusätzlich Zustand, Modernisierungsgrad und die tatsächliche Mikrolage — Faktoren, die ein Formular nicht sehen kann.",
  },
  {
    q: "Welches der drei Verfahren nutzt eine Bank bei der Finanzierung?",
    a: "Banken rechnen meist konservativer als der Markt und ermitteln zusätzlich einen eigenen Beleihungswert, der unter dem Verkehrswert liegt. Je nach Objekt fließen dabei Elemente des Sachwert- oder Ertragswertverfahrens ein, mit Sicherheitsabschlägen, die über die reine Wertermittlung hinausgehen.",
  },
  {
    q: "Warum weichen zwei Bewertungen für dieselbe Immobilie oft voneinander ab?",
    a: "Meist, weil unterschiedliche Vergleichsobjekte, ein anderer Stichtag oder ein anderes Verfahren zugrunde gelegt wurden. Auch Zu- und Abschläge für Zustand und Lage sind zu einem gewissen Grad Ermessenssache — zwei Sachverständige können hier unterschiedlich gewichten, ohne dass einer falsch liegt.",
  },
  {
    q: "Was ist der Unterschied zwischen dem berechneten Wert und dem Preis, der am Ende erzielt wird?",
    a: "Alle drei Verfahren liefern einen Verkehrswert — eine objektive Einschätzung zum Stichtag. Was ein Käufer tatsächlich zahlt, hängt zusätzlich von Nachfrage, Verhandlung und Vermarktung ab. Die Einordnung dieser beiden Zahlen zeigt die Seite Verkehrswert vs. Marktpreis.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Immobilie bewerten: Die drei Verfahren verständlich erklärt | beuwy",
  [`${S}meta.beschreibung`]:
    "Immobilie bewerten: Vergleichswert-, Ertrags- oder Sachwertverfahren — mit Beispielrechnung, wann welches Verfahren greift, und einem Rechner als Einstieg.",
  [`${S}meta.og_titel`]: "Immobilie bewerten: Die drei Verfahren verständlich erklärt | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Die drei gesetzlich anerkannten Bewertungsverfahren mit vollständiger Beispielrechnung — und warum ein Online-Rechner keines von ihnen ersetzt.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Wissen",
  [`${S}kopf.titel`]: "Immobilie bewerten: drei Verfahren, eine *verlässliche* Zahl.",
  [`${S}kopf.text_vor`]:
    "Eine Immobilie wird nach einem von drei gesetzlich anerkannten Verfahren bewertet: dem Vergleichswertverfahren, das den Preis ähnlicher verkaufter Objekte heranzieht, dem Ertragswertverfahren, das die erzielbare Miete kapitalisiert, und dem Sachwertverfahren, das Bau- und Bodenkosten getrennt berechnet.",
  [`${S}kopf.text_mark`]:
    "Welches Verfahren greift, hängt vom Objekt ab — ein Online-Rechner ersetzt keines der drei, liefert aber in wenigen Minuten eine erste Hausnummer",
  [`${S}kopf.text_nach`]:
    ". Wohnungen und Häuser mit genug Vergleichsverkäufen laufen meist über den Vergleichswert, vermietete Mehrfamilienhäuser über den Ertragswert, Sonderobjekte über den Sachwert.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}verfahren.eyebrow`]: "Die drei Verfahren",
  [`${S}verfahren.titel`]:
    "Jedes Verfahren rechnet *anders* — und kommt trotzdem zu einer belastbaren Zahl.",
  ...verfahren.defaults,

  [`${S}vergleichstabelle.eyebrow`]: "Auf einen Blick",
  [`${S}vergleichstabelle.titel`]: "Wann welches Verfahren greift.",
  ...vergleich.defaults,
  [`${S}vergleichstabelle.spalte_verfahren`]: "Verfahren",
  [`${S}vergleichstabelle.spalte_fall`]: "Typischer Fall",
  [`${S}vergleichstabelle.spalte_ergebnis`]: "Ergebnis im Beispiel oben",
  [`${S}vergleichstabelle.hinweis`]:
    "Orientierungswert, kein Gutachten. Alle drei Beispiele rechnen mit angenommenen, realistischen Marktdaten — Ihre tatsächliche Zahl hängt von der echten Mikrolage und dem Zustand vor Ort ab.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Rechner ist keine Wertermittlung.",
  [`${S}unterschied.text`]:
    "Ein Online-Rechner nutzt Durchschnittswerte für Objekttyp und Stadtgröße, weil er Ihre Immobilie nie betreten hat. Ein Gutachten oder eine fundierte Maklereinschätzung sieht den Zustand, die Mikrolage und den Modernisierungsgrad — genau die Faktoren, die am Ende über mehrere zehntausend Euro entscheiden.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für RIEGEL Immobilien haben wir einen Bewertungsrechner mit amtlichen Bodenrichtwerten gebaut, kalibriert mit 489 echten Abschlüssen: Adresse rein, Ersteinschätzung raus, der Lead liegt mit Score im CRM. Ergebnis in den ersten drei Monaten: neun zusätzliche Mandate.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *ersten* Zahl wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Bewertungsstrecke*.",
  [`${S}finale.text_vor`]: "Eine erste Einschätzung liefert unser",
  [`${S}finale.link_rechner`]: "Verkaufspreisrechner",
  [`${S}finale.text_mid1`]:
    "kostenlos in wenigen Minuten. Wie gut KI-basierte Bewertungen inzwischen sind und wo der Sachverständige bleibt, zeigt",
  [`${S}finale.link_ki`]: "KI-Immobilienbewertung",
  [`${S}finale.text_mid2`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: ".",
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

  [`${S}verfahren.eyebrow`]: "Verfahren · Eyebrow",
  [`${S}verfahren.titel`]: "Verfahren · Titel (*Wort* = Hervorhebung)",

  [`${S}vergleichstabelle.eyebrow`]: "Vergleichstabelle · Eyebrow",
  [`${S}vergleichstabelle.titel`]: "Vergleichstabelle · Titel",
  [`${S}vergleichstabelle.spalte_verfahren`]: "Vergleichstabelle · Spaltenkopf 1",
  [`${S}vergleichstabelle.spalte_fall`]: "Vergleichstabelle · Spaltenkopf 2",
  [`${S}vergleichstabelle.spalte_ergebnis`]: "Vergleichstabelle · Spaltenkopf 3",
  [`${S}vergleichstabelle.hinweis`]: "Vergleichstabelle · Fußnote",

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_rechner`]: "Finale · Link · Verkaufspreisrechner",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_ki`]: "Finale · Link · KI-Immobilienbewertung",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...verfahren.labels,
  ...vergleich.labels,
  ...faq.labels,
};
