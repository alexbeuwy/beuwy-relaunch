import { listeRegistrieren } from "../lesen";

/** Studio-Texte /beste-maklerwebsites — Struktur bleibt im Code, jeder Text hier.
 *  Die GROSSE_ACHT-Reihenfolge bleibt weiterhin eine eigene, von
 *  mk.trust.namen getrennte Liste (kein gemeinsamer Namensraum, siehe
 *  Kommentar in der Seite) — hier nur unter einem eigenen Präfix, damit
 *  Alex auch diese Namen ohne Deploy pflegen kann. */
export const SEITE = { slug: "beste-maklerwebsites", titel: "Beste Maklerwebsites", route: "/beste-maklerwebsites" };
const S = "s.beste-maklerwebsites.";

const kriterien = listeRegistrieren("beste-maklerwebsites", "kriterien", "Kriterium", [
  {
    gewicht: "40 %",
    titel: "Design",
    text: "Wir sehen, was in den ersten Sekunden hängen bleibt: Bildsprache, Typografie, Weißraum. Ein Blick reicht, dann entscheidet der Eindruck, nicht die Beschreibung.",
  },
  {
    gewicht: "30 %",
    titel: "Ladezeit",
    text: "Wir messen, wie lange die Startseite bis zur echten Bedienbarkeit braucht, auf dem Mobiltelefon, nicht im Idealfall. Wer drei Sekunden wartet, ist beim nächsten Ergebnis.",
  },
  {
    gewicht: "30 %",
    titel: "Conversion-Pfad",
    text: "Wir zählen die Schritte von der Startseite bis zur Anfrage. Jeder Umweg kostet einen Interessenten, der eigentlich schon überzeugt war.",
  },
], { gewicht: "Gewichtung", titel: "Titel", text: "Text" });

const grosseAcht = listeRegistrieren("beste-maklerwebsites", "grosse-acht", "Haus", [
  { name: "ENGEL & VÖLKERS" },
  { name: "VON POLL IMMOBILIEN" },
  { name: "DAHLER & COMPANY" },
  { name: "KENSINGTON" },
  { name: "RE/MAX" },
  { name: "McMakler" },
  { name: "Homeday" },
  { name: "BETTERHOMES" },
], { name: "Name" });

const faq = listeRegistrieren("beste-maklerwebsites", "faq", "FAQ", [
  {
    q: "Wie kommt man in die Liste?",
    a: "Wir prüfen jede Website nach der Kriterienliste oben: Design, Ladezeit, Conversion-Pfad. Die acht großen Netzwerke stehen zuerst, weil wir mit ihnen begonnen haben. Der Rest folgt in der Reihenfolge, in der wir ihn geprüft haben. Ein Platz in der Liste ist keine Bewerbung. Er ist das Ergebnis einer Prüfung.",
  },
  {
    q: "Kann man sich einkaufen?",
    a: "Nein. Ihr Listenplatz hat nichts mit einem Auftrag bei uns zu tun, auch nicht umgekehrt. Wer bei uns baut, taucht in der Liste auf, sobald die Website die Kriterien erfüllt. Nicht früher, nicht automatisch.",
  },
], { q: "Frage", a: "Antwort" });

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Die 30 besten Maklerwebsites Deutschlands 2026 | beuwy",
  [`${S}meta.beschreibung`]:
    "Die 30 besten Maklerwebsites Deutschlands 2026, bewertet nach Design, Ladezeit und Conversion-Pfad. Redaktionsstand: die Bewertung läuft, die Kriterien liegen offen.",

  [`${S}hero.eyebrow`]: "Ranking · Maklerwebsites 2026",
  [`${S}hero.titel`]: "Die 30 besten Maklerwebsites Deutschlands *2026*.",
  [`${S}hero.sub_vor`]: "Bewertet nach Design, Ladezeit und Conversion-Pfad,",
  [`${S}hero.sub_mark`]: "von Leuten, die Maklerwebsites bauen",
  [`${S}hero.sub_nach`]: ".",

  [`${S}methodik.eyebrow`]: "Methodik",
  [`${S}methodik.titel`]: "Drei Kriterien, *ein* Maßstab.",
  [`${S}methodik.sub`]: "Jede Website in dieser Liste durchläuft dieselbe Prüfung: kein Bauchgefühl, keine Sonderregeln.",
  ...kriterien.defaults,
  [`${S}methodik.footnote`]:
    "Jede Website durchläuft dieselbe Prüfliste: eine echte Ladezeitmessung auf mobilen Endgeräten und ein fester Kriterienkatalog für Design und Conversion-Pfad. Kein Bauchgefühl, sondern derselbe Maßstab für alle 30 Häuser, geprüft von einem Team, das seit 17 Jahren Marken baut.",

  [`${S}ranking.eyebrow`]: "Das Ranking",
  [`${S}ranking.titel`]: "Platz 1 bis *30*.",
  [`${S}ranking.sub`]:
    "Wir beginnen mit den acht größten Maklernetzwerken Deutschlands. Nicht, weil ihr Platz feststeht, sondern weil sie zuerst geprüft werden. Die Reihenfolge unten ist noch kein Urteil.",
  [`${S}ranking.redaktionsstand`]: "Redaktionsstand · August 2026",
  [`${S}ranking.grosse_acht_label`]: "Die großen Acht",
  ...grosseAcht.defaults,
  [`${S}ranking.klein_label`]: "Platz 9–30 · Bewertung läuft",
  [`${S}ranking.bundesweit`]: "Bundesweit",
  [`${S}ranking.spalte_design`]: "Design",
  [`${S}ranking.spalte_ladezeit`]: "Ladezeit",
  [`${S}ranking.spalte_conversion`]: "Conversion",
  [`${S}ranking.bewertung_laeuft`]: "Bewertung läuft",
  [`${S}ranking.klein_geprueft`]: "Wird derzeit geprüft",
  [`${S}ranking.klein_standort`]: "Standort folgt",

  [`${S}ego.label`]: "Für Häuser ohne Eintrag",
  [`${S}ego.titel`]: "Ihr Haus fehlt in der Liste?",
  [`${S}ego.text`]:
    "Es gibt zwei Gründe: Wir haben Ihre Website noch nicht geprüft, oder sie ist noch nicht so weit. Beides lässt sich ändern.",
  [`${S}ego.cta1`]: "Zusammenarbeit anfragen",
  [`${S}ego.cta2`]: "Website prüfen lassen",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Fragen zum *Ranking*.",
  ...faq.defaults,

  [`${S}footer.text`]: "Mehr zum Thema:",
  [`${S}footer.link_marketing`]: "Immobilienmarketing im Überblick",
  [`${S}footer.link_website`]: "Was eine gute Maklerwebsite braucht",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (*Wort* = Hervorhebung)",
  [`${S}hero.sub_vor`]: "Hero · Subline · Teil vor dem Highlighter",
  [`${S}hero.sub_mark`]: "Hero · Subline · Highlighter-Teil",
  [`${S}hero.sub_nach`]: "Hero · Subline · Teil nach dem Highlighter",

  [`${S}methodik.eyebrow`]: "Methodik · Eyebrow",
  [`${S}methodik.titel`]: "Methodik · Titel (*Wort* = Hervorhebung)",
  [`${S}methodik.sub`]: "Methodik · Subline",
  [`${S}methodik.footnote`]: "Methodik · Fußnote unter den drei Kriterien",

  [`${S}ranking.eyebrow`]: "Ranking · Eyebrow",
  [`${S}ranking.titel`]: "Ranking · Titel (*Wort* = Hervorhebung)",
  [`${S}ranking.sub`]: "Ranking · Subline",
  [`${S}ranking.redaktionsstand`]: "Ranking · Redaktionsstand-Pille",
  [`${S}ranking.grosse_acht_label`]: "Ranking · Label über den großen Acht",
  [`${S}ranking.klein_label`]: "Ranking · Label über Platz 9–30",
  [`${S}ranking.bundesweit`]: "Ranking · Ortsangabe je Haus (großen Acht)",
  [`${S}ranking.spalte_design`]: "Ranking · Metrik-Label Design",
  [`${S}ranking.spalte_ladezeit`]: "Ranking · Metrik-Label Ladezeit",
  [`${S}ranking.spalte_conversion`]: "Ranking · Metrik-Label Conversion",
  [`${S}ranking.bewertung_laeuft`]: "Ranking · Pille „Bewertung läuft“ (große Acht)",
  [`${S}ranking.klein_geprueft`]: "Ranking · Platz 9–30 · Zeilentext",
  [`${S}ranking.klein_standort`]: "Ranking · Platz 9–30 · Zeilentext (Standort)",

  [`${S}ego.label`]: "Ego-Loop · Label",
  [`${S}ego.titel`]: "Ego-Loop · Titel",
  [`${S}ego.text`]: "Ego-Loop · Text",
  [`${S}ego.cta1`]: "Ego-Loop · Button 1",
  [`${S}ego.cta2`]: "Ego-Loop · Button 2",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (*Wort* = Hervorhebung)",

  [`${S}footer.text`]: "Fußzeile · Text vor den Links",
  [`${S}footer.link_marketing`]: "Fußzeile · Link 1",
  [`${S}footer.link_website`]: "Fußzeile · Link 2",

  ...kriterien.labels,
  ...grosseAcht.labels,
  ...faq.labels,
};
