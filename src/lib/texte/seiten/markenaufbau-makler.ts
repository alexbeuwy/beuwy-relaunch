import { listeRegistrieren } from "../lesen";

/** Studio-Texte /markenaufbau-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "markenaufbau-makler", titel: "Markenaufbau für Makler", route: "/markenaufbau-makler" };
const S = "s.markenaufbau-makler.";

const bausteine = listeRegistrieren("markenaufbau-makler", "bausteine", "Baustein", [
  {
    titel: "Typografie",
    text: "Eine Schrift für alles, Headlines und Fließtext gleichermaßen. Kein Stilbruch zwischen Exposé, Website und Visitenkarte, der bei jedem Kontaktpunkt neu erklärt werden muss.",
  },
  {
    titel: "Bildwelt",
    text: "Ein Bildstil in Licht, Perspektive und Farbstimmung, der auf jedem Kanal wiedererkennbar bleibt, statt fünf verschiedener Fotografen-Handschriften über die Jahre.",
  },
  {
    titel: "Sprache",
    text: "Ein Ton, der sich in der E-Mail genauso liest wie im Exposé und im Social-Media-Profil. Sie-Form oder Du-Form, sachlich oder persönlich, aber überall dieselbe Entscheidung.",
  },
  {
    titel: "Farbwelt",
    text: "Eine Akzentfarbe statt eines Regenbogens aus wechselnden Vorlagen. Wiedererkennung entsteht durch Wiederholung, nicht durch Abwechslung.",
  },
  {
    titel: "Konsistenz über jeden Kontaktpunkt",
    text: "Visitenkarte, Website, Exposé, Social-Profil und E-Mail-Signatur zeigen dieselbe Marke, nicht fünf verschiedene Layouts aus fünf verschiedenen Jahren.",
  },
], { titel: "Titel", text: "Text" });

const faq = listeRegistrieren("markenaufbau-makler", "faq", "FAQ", [
  {
    q: "Wie lange dauert der Markenaufbau als Makler?",
    a: "Die sichtbaren Bausteine, Typografie, Bildwelt und Website, stehen meist innerhalb von vier bis acht Wochen. Bis die Marke im Markt als Instanz wahrgenommen wird, vergehen typischerweise mehrere Monate konsequenter Anwendung über jeden Kontaktpunkt.",
  },
  {
    q: "Brauche ich einen neuen Namen oder reicht ein neuer Auftritt?",
    a: "In den meisten Fällen reicht ein neuer Auftritt. Ein Namenswechsel lohnt sich nur, wenn der bestehende Name bereits negativ belegt ist oder die neue Positionierung inhaltlich nicht mehr zu ihm passt.",
  },
  {
    q: "Lohnt sich Markenaufbau, wenn ich schon lange am Markt bin?",
    a: "Gerade dann. Ein langjähriger Makler hat oft schon den Beweis, die belegten Ergebnisse und Referenzen, aber keinen Auftritt, der das zeigt. Der Markenaufbau macht sichtbar, was an Vertrauen bereits vorhanden ist.",
  },
  {
    q: "Was kostet Markenaufbau im Vergleich zu laufender Werbung?",
    a: "Markenaufbau ist eine einmalige Investition mit langer Wirkdauer, Werbung eine laufende Ausgabe, die mit jeder Pause endet. Beides ergänzt sich: Eine Anzeige auf einer austauschbaren Marke verpufft schneller als dieselbe Anzeige auf einer erkennbaren.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Markenaufbau für Makler: Von der Visitenkarte zur Instanz | beuwy",
  [`${S}meta.beschreibung`]:
    "Markenaufbau für Makler: von der Visitenkarte zur Instanz, mit Typografie, Bildwelt und Sprache aus einem Guss, belegt am Beispiel 60 auf über 2.300 Partner.",
  [`${S}meta.og_titel`]: "Markenaufbau für Makler: Von der Visitenkarte zur Instanz | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Fünf Bausteine einer Makler-Marke, von Typografie bis Konsistenz über jeden Kontaktpunkt, und warum Wiedererkennung ohne Beweis Dekoration bleibt.",

  [`${S}cta.label`]: "Zusammenarbeit anfragen",

  [`${S}kopf.eyebrow`]: "Wachstum",
  [`${S}kopf.titel`]: "Vom Visitenkarten-Logo zur *Instanz* am Markt.",
  [`${S}kopf.text`]:
    "Sie bauen als Makler eine Marke auf, indem Typografie, Bildwelt und Sprache über jeden Kontaktpunkt hinweg gleich bleiben, Website, Exposé, Visitenkarte, Social-Media-Profil, und indem diese Konsistenz mit belegten Ergebnissen unterfüttert wird, nicht nur mit einem neuen Logo. Wiedererkennung ohne Beweis bleibt Dekoration, Beweis ohne Wiedererkennung verpufft beim nächsten Kontaktpunkt. Erst beides zusammen macht aus einer Visitenkarte eine Instanz, an der in der Region niemand vorbeikommt.",
  [`${S}kopf.hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}bausteine.eyebrow`]: "Die fünf Bausteine",
  [`${S}bausteine.titel`]: "Eine Marke ist kein Logo. Sie ist ein *Guss*.",
  [`${S}bausteine.sub`]:
    "Fünf Entscheidungen, einmal getroffen, dann überall gleich angewendet. Nicht fünf verschiedene Vorlagen, die zufällig dieselbe Akzentfarbe teilen.",
  ...bausteine.defaults,

  [`${S}vergleich.eyebrow`]: "Zwei Ergebnisse desselben Aufwands",
  [`${S}vergleich.titel`]: "Der Unterschied zeigt sich nicht am Logo, sondern am *Empfang*.",
  [`${S}vergleich.links_label`]: "Visitenkarten-Marke",
  [`${S}vergleich.links_titel`]: "Logo, Foto, Kontaktdaten. Austauschbar.",
  [`${S}vergleich.links_text`]:
    "Der Auftritt existiert, aber niemand erinnert sich an ihn, sobald das Gespräch vorbei ist. Beim nächsten Vergleich zählt nur noch, was auf dem Papier steht.",
  [`${S}vergleich.rechts_label`]: "Instanz-Marke",
  [`${S}vergleich.rechts_titel`]: "Wiedererkennung plus Beweis. Erste Wahl.",
  [`${S}vergleich.rechts_text`]:
    "Empfehlungsgeber nennen den Namen automatisch, weil er mit einem klaren Bild verbunden ist. Eigentümer haben den Auftritt oft schon gesehen, bevor sie überhaupt anrufen.",

  [`${S}formel.label`]: "Die Formel",
  [`${S}formel.titel`]: "Marke = Wiedererkennung × Beweis.",
  [`${S}formel.text`]:
    "Fehlt einer der beiden Faktoren, bleibt das Ergebnis null. Wiedererkennung ohne Beweis ist ein hübsches Logo ohne Substanz. Beweis ohne Wiedererkennung ist eine gute Zahl, die niemand mit Ihnen verbindet.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Marke und Auftritt komplett neu aufgesetzt: aus 60 Personen beim Start der Zusammenarbeit wurden über 2.300 Partner unter einer Marke, heute Top 10 der deutschen Finanzvertriebe.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Rebrand wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihre *Instanz*.",
  [`${S}finale.text_vor`]: "Marke setzt eine klare Positionierung voraus. Vertiefend dazu:",
  [`${S}finale.link_positionierung`]: "Makler-Positionierung",
  [`${S}finale.text_mid1`]: ". Weitere belegte Ergebnisse in den",
  [`${S}finale.link_cases`]: "Fallstudien",
  [`${S}finale.text_mid2`]: ", den Überblick über alle Bausteine zeigt der",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}cta.label`]: "Der CTA-Wortlaut",

  [`${S}kopf.eyebrow`]: "Wissens-Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Wissens-Kopf · H1 (*Wort* = Hervorhebung)",
  [`${S}kopf.text`]: "Wissens-Kopf · Antwortabsatz",
  [`${S}kopf.hinweis`]: "Wissens-Kopf · Mikrozeile unter dem CTA",

  [`${S}bausteine.eyebrow`]: "Bausteine · Eyebrow",
  [`${S}bausteine.titel`]: "Bausteine · Titel (*Wort* = Hervorhebung)",
  [`${S}bausteine.sub`]: "Bausteine · Subline",

  [`${S}vergleich.eyebrow`]: "Vergleich · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleich · Titel (*Wort* = Hervorhebung)",
  [`${S}vergleich.links_label`]: "Vergleich · linke Spalte · Label",
  [`${S}vergleich.links_titel`]: "Vergleich · linke Spalte · Titel",
  [`${S}vergleich.links_text`]: "Vergleich · linke Spalte · Text",
  [`${S}vergleich.rechts_label`]: "Vergleich · rechte Spalte · Label",
  [`${S}vergleich.rechts_titel`]: "Vergleich · rechte Spalte · Titel",
  [`${S}vergleich.rechts_text`]: "Vergleich · rechte Spalte · Text",

  [`${S}formel.label`]: "Die Formel · Label",
  [`${S}formel.titel`]: "Die Formel · Titel",
  [`${S}formel.text`]: "Die Formel · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Satz",
  [`${S}beweis.link`]: "Beweis · Link zu den Fallstudien",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · H2 (*Wort* = Hervorhebung)",
  [`${S}finale.text_vor`]: "Finale · Text · Teil vor Link 1",
  [`${S}finale.link_positionierung`]: "Finale · Link · Makler-Positionierung",
  [`${S}finale.text_mid1`]: "Finale · Text · Teil zwischen Link 1 und 2",
  [`${S}finale.link_cases`]: "Finale · Link · Fallstudien",
  [`${S}finale.text_mid2`]: "Finale · Text · Teil zwischen Link 2 und 3",
  [`${S}finale.link_hub`]: "Finale · Link · Immobilienmarketing-Hub",
  [`${S}finale.text_nach`]: "Finale · Text · Teil nach Link 3",
  [`${S}finale.hinweis`]: "Finale · Mikrozeile unter dem CTA",

  ...bausteine.labels,
  ...faq.labels,
};
