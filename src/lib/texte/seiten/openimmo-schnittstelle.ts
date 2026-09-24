import { listeRegistrieren } from "../lesen";

/** Studio-Texte /openimmo-schnittstelle — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "openimmo-schnittstelle", titel: "OpenImmo-Schnittstelle", route: "/openimmo-schnittstelle" };
const S = "s.openimmo-schnittstelle.";

const stellen = listeRegistrieren(
  "openimmo-schnittstelle",
  "stellen",
  "Problemstelle",
  [
    {
      titel: "Formatgrenzen",
      text: "OpenImmo legt fest, welche Felder es gibt, nicht wie jedes System sie befüllt. Freitextfelder, Sonderausstattung oder Energiewerte landen je nach Software in leicht anderer Struktur — beim Import zeigt sich das als fehlendes oder falsch zugeordnetes Feld.",
    },
    {
      titel: "Bild-Reihenfolgen",
      text: "Die Sortierung der Fotos ist im Standard vorgesehen, geht beim Export aus manchen Systemen aber verloren. Ergebnis: Das Titelbild landet an dritter Stelle, die Grundriss-Skizze ganz vorn, ohne dass jemand das im Büro so eingestellt hat.",
    },
    {
      titel: "Render-Unterschiede",
      text: "Dieselbe OpenImmo-Datei liest jedes Portal mit eigener Darstellungslogik: Absätze, Sonderzeichen und Bildausschnitte sehen auf ImmoScout anders aus als auf der eigenen Website, selbst wenn die Quelldaten identisch sind.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const checkliste = listeRegistrieren(
  "openimmo-schnittstelle",
  "checkliste",
  "Abnahme-Punkt",
  [
    { text: "Titelbild ist nach dem Export tatsächlich das erste Bild, nicht der Grundriss" },
    { text: "Alle Sonderzeichen (Umlaute, €-Zeichen, Bindestriche) erscheinen korrekt, nicht als Fragezeichen" },
    { text: "Energiewerte und Pflichtangaben sind vollständig, nicht nur teilweise übernommen" },
    { text: "Freitext-Beschreibung bricht nicht mitten im Satz ab" },
    { text: "Preisänderung im CRM erscheint innerhalb der zugesagten Frist auch auf der Website" },
    { text: "Ein deaktiviertes Objekt verschwindet auf allen angebundenen Flächen, nicht nur auf einer" },
    { text: "Kontaktdaten der Anfrage landen mit Objektbezug im CRM, nicht in einem allgemeinen Postfach" },
  ],
  { text: "Text" },
);

const faq = listeRegistrieren(
  "openimmo-schnittstelle",
  "faq",
  "FAQ",
  [
    {
      frage: "Brauche ich für jedes Portal eine eigene Export-Datei?",
      antwort:
        "Nein. Der Export erzeugt eine OpenImmo-Datei, die mehrere Portale gleichzeitig lesen. Wie diese Datei am Ende aussieht, entscheidet trotzdem jedes Portal selbst — deshalb kann dieselbe Datei auf zwei Flächen unterschiedlich wirken.",
    },
    {
      frage: "Warum fehlen nach dem Export manchmal Fotos?",
      antwort:
        "Meist liegt es an Dateinamen, Reihenfolge oder einem Format, das die Zielseite nicht verarbeitet. Eine Abnahme vor dem Livegang, wie in der Checkliste oben, fängt genau das ab, bevor ein Eigentümer die Lücke sieht.",
    },
    {
      frage: "Kann ich OpenImmo auch ohne Maklersoftware nutzen?",
      antwort:
        "Technisch ja, in der Praxis läuft der Export fast immer über die vorhandene Maklersoftware oder das CRM. Einen Überblick über die gängigen Systeme und ihre Anbindung finden Sie im Maklersoftware-Vergleich.",
    },
    {
      frage: "Wie lange dauert eine saubere Abnahme?",
      antwort:
        "Im Rahmen eines Website-Projekts meist wenige Tage, weil die Prüfung entlang der Checkliste läuft, statt jedes Feld einzeln zu suchen. Bei einer bestehenden, ungeprüften Anbindung kann die erste Abnahme länger dauern.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "OpenImmo verstehen: Die Schnittstelle, an der Websites scheitern | beuwy",
  [`${S}meta.beschreibung`]:
    "OpenImmo verstehen: Die Schnittstelle, an der Maklerwebsites scheitern — Formatgrenzen, Bild-Reihenfolgen, Render-Unterschiede, plus Abnahme-Checkliste.",
  [`${S}meta.og_titel`]: "OpenImmo verstehen: Die Schnittstelle, an der Websites scheitern | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Was OpenImmo ist, warum der Objekt-Export trotzdem ruckelt, und die Abnahme-Checkliste, die vor dem Livegang jeden Fehler abfängt.",

  [`${S}kopf.eyebrow`]: "Schnittstelle",
  [`${S}kopf.titel`]: "OpenImmo verstehen: die Schnittstelle, an der *Websites* scheitern.",
  [`${S}kopf.intro_vor`]:
    "OpenImmo ist ein deutschlandweiter Datenstandard, über den Maklersoftware Objektdaten wie Preis, Fläche und Fotos an Portale und Websites exportiert, ohne dass jemand jedes Feld von Hand abtippt.",
  [`${S}kopf.intro_highlight`]: "Ruckelt der Export trotzdem, liegt es fast immer an drei Stellen",
  [`${S}kopf.intro_nach`]:
    ": Feldern, die der Standard offenlässt, Bildern, deren Reihenfolge verloren geht, und Portalen, die dieselbe Datei unterschiedlich darstellen.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",

  [`${S}stellen.eyebrow`]: "Warum der Export ruckelt",
  [`${S}stellen.titel`]: "Drei Stellen, an denen aus einer sauberen Datei ein *falsches* Exposé wird.",
  [`${S}stellen.sub`]:
    "Der Standard selbst ist stabil. Die Probleme entstehen an den Rändern — dort, wo jedes System eigene Entscheidungen trifft.",
  ...stellen.defaults,

  [`${S}checkliste.eyebrow`]: "Vor dem Livegang",
  [`${S}checkliste.titel`]: "Die Abnahme-Checkliste, die jeder Export *bestehen* sollte.",
  ...checkliste.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Die Schnittstelle ist unsichtbar — bis sie fehlt.",
  [`${S}unterschied.text`]:
    "Läuft der Export sauber, merkt kein Eigentümer, dass dahinter ein Datenstandard arbeitet. Läuft er nicht sauber, sieht er ein Exposé mit vertauschten Bildern — und zieht daraus einen Schluss über Ihr ganzes Büro.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Bei RIEGEL Immobilien lief der Objekt-Export von Anfang an sauber, weil die Abnahme-Checkliste vor dem Livegang durchlaufen wurde. Ergebnis: neun zusätzliche Mandate in den ersten drei Monaten, ohne einen einzigen doppelt gepflegten Datensatz.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor der *Anbindung* wissen wollen.",
  ...faq.defaults,

  [`${S}fazit.label`]: "Der nächste Schritt",
  [`${S}fazit.titel`]: "Bauen wir eine Anbindung, die *keiner* bemerkt.",
  [`${S}fazit.text_1`]: "Welches CRM Sie einsetzen und wie die Anbindung dort im Detail aussieht, steht im",
  [`${S}fazit.link1`]: "Maklersoftware-Vergleich",
  [`${S}fazit.text_2`]: ". Speziell zur Anbindung an FLOWFACT lesen Sie",
  [`${S}fazit.link2`]: "FLOWFACT-Website",
  [`${S}fazit.text_3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}fazit.link3`]: "Immobilienmarketing-Hub",
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

  [`${S}stellen.eyebrow`]: "Problemstellen · Eyebrow",
  [`${S}stellen.titel`]: "Problemstellen · Titel (ein *Wort* = Hervorhebung)",
  [`${S}stellen.sub`]: "Problemstellen · Subline",
  ...stellen.labels,

  [`${S}checkliste.eyebrow`]: "Abnahme-Checkliste · Eyebrow",
  [`${S}checkliste.titel`]: "Abnahme-Checkliste · Titel (ein *Wort* = Hervorhebung)",
  ...checkliste.labels,

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
  [`${S}fazit.link1`]: "Finale · Absatz · Link 1 (Maklersoftware-Vergleich)",
  [`${S}fazit.text_2`]: "Finale · Absatz · Teil 2 (zwischen Link 1 und 2)",
  [`${S}fazit.link2`]: "Finale · Absatz · Link 2 (FLOWFACT-Website)",
  [`${S}fazit.text_3`]: "Finale · Absatz · Teil 3 (zwischen Link 2 und 3)",
  [`${S}fazit.link3`]: "Finale · Absatz · Link 3 (Immobilienmarketing-Hub)",
  [`${S}fazit.text_4`]: "Finale · Absatz · Teil 4 (nach Link 3)",
  [`${S}fazit.cta_hinweis`]: "Finale · Mikrozeile unter dem CTA",
};
