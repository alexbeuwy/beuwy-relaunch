import { listeRegistrieren } from "../lesen";

/** Studio-Texte /exposes-die-verkaufen — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "exposes-die-verkaufen",
  titel: "Exposés, die verkaufen",
  route: "/exposes-die-verkaufen",
};
const S = "s.exposes-die-verkaufen.";

const dramaturgie = listeRegistrieren(
  "exposes-die-verkaufen",
  "dramaturgie",
  "Stufe",
  [
    {
      titel: "Der Aufschlag",
      text: "Die ersten zwei Seiten entscheiden, ob weitergeblättert wird. Ein großformatiges Foto der Immobilie im besten Licht, eine Überschrift, die die Lage oder das Lebensgefühl benennt, statt „Einfamilienhaus zu verkaufen“. Wer hier ein Datenblatt-Deckblatt zeigt, verliert den Leser, bevor der erste Fakt überhaupt fällt.",
    },
    {
      titel: "Die Fakten, eingebettet statt aufgelistet",
      text: "Wohnfläche, Zimmerzahl, Baujahr gehören ins Exposé, aber nicht als trockene Tabelle direkt nach dem Titelbild. Sie stehen eingebettet in einen Absatz, der erklärt, was die Zahl für den künftigen Bewohner bedeutet: „140 m² verteilt auf zwei Ebenen, das Arbeitszimmer im Erdgeschoss mit eigenem Zugang zur Terrasse.“",
    },
    {
      titel: "Die Preis-Argumentation",
      text: "Der Preis steht nie allein im Raum. Er wird begründet: mit dem Sanierungsstand, mit zwei bis drei Vergleichsobjekten aus der gleichen Straße oder demselben Stadtteil und mit dem Bodenrichtwert. Beispiel: „680.000 € bei einem Bodenrichtwert von 420 €/m² auf 1.200 m² Grundstück, zwei vergleichbare Verkäufe in der Nachbarschaft lagen 2025 bei 640.000 € und 710.000 € — jeweils ohne die neue Heizung, die hier seit 2023 verbaut ist.“ Eine Zahl mit Begründung übersteht eine Preisverhandlung, eine Zahl ohne Begründung nicht.",
    },
    {
      titel: "Der Beweis in Bildern",
      text: "Grundriss maßstabsgetreu und lesbar, Fotos zur Golden Hour statt Mittagslicht mit hartem Schatten, mindestens ein Bild pro Raum in der Reihenfolge eines echten Rundgangs. Ein Energieausweis-Wert steht mit einer Einordnung daneben, nicht als isolierte Buchstaben-Zahl-Kombination, die niemand ohne Fachwissen versteht.",
    },
    {
      titel: "Der Abschluss",
      text: "Das Exposé endet nicht mit „Bei Interesse kontaktieren Sie uns“, sondern mit einem konkreten nächsten Schritt: einem Besichtigungstermin-Vorschlag, einer direkten Telefonnummer, einem QR-Code zur Terminbuchung. Wer bis hierhergelesen hat, ist interessiert — der letzte Satz darf diese Energie nicht verpuffen lassen.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const vergleich = listeRegistrieren(
  "exposes-die-verkaufen",
  "vergleich",
  "Vergleichszeile",
  [
    {
      thema: "Aufbau",
      standard:
        "Feste Software-Vorlage: Deckblatt, Datenblatt, Fotogalerie, Kontaktseite — in dieser Reihenfolge, egal welches Objekt.",
      entscheidung:
        "Dramaturgie, die auf das konkrete Objekt zugeschnitten ist: Aufschlag, Fakten, Preis-Argumentation, Beweis, Abschluss.",
    },
    {
      thema: "Preis",
      standard: "Eine Zahl im Kopfbereich, meist ohne Herleitung, direkt neben „Käuferprovision 3,57 %“.",
      entscheidung:
        "Preis mit Vergleichsobjekten, Bodenrichtwert und Zustand begründet — bevor die Verhandlung beginnt, nicht erst währenddessen.",
    },
    {
      thema: "Sprache",
      standard:
        "Software-Textbausteine: „Diese gepflegte Immobilie bietet…“ — identisch in hunderten anderen Exposés im selben System.",
      entscheidung:
        "Konkrete Sätze zum Objekt, die ein zweites Exposé aus demselben System nicht auch enthalten könnte.",
    },
    {
      thema: "Wirkung beim Eigentümer",
      standard: "Der Eigentümer sieht dieselbe Vorlage, die auch drei andere Makler in der Stadt verwenden.",
      entscheidung:
        "Der Eigentümer sieht einen Auftritt, der die Provision rechtfertigt, bevor über sie gesprochen wird.",
    },
  ],
  { thema: "Thema", standard: "Standard-Spalte", entscheidung: "Entscheidungsdokument-Spalte" },
);

const faq = listeRegistrieren(
  "exposes-die-verkaufen",
  "faq",
  "FAQ",
  [
    {
      q: "Muss jedes Exposé komplett individuell gestaltet werden?",
      a: "Die Dramaturgie bleibt gleich, die Inhalte wechseln pro Objekt. Ein fester Aufbau mit fünf Stufen, gefüllt mit echten Details statt Textbausteinen, ist der praktikable Mittelweg zwischen Handarbeit für jedes Exposé und einer austauschbaren Vorlage.",
    },
    {
      q: "Wie viele Vergleichsobjekte gehören in die Preis-Argumentation?",
      a: "Zwei bis drei reichen meist, mehr wirkt wie eine Marktanalyse statt eines Exposés. Wichtig ist, dass die Objekte wirklich vergleichbar sind — Lage, Größe und Zustand sollten nah genug beieinanderliegen, damit der Vergleich hält.",
    },
    {
      q: "Kann KI die Exposé-Texte schreiben?",
      a: "Für die Rohfassung ja, für die Objektwahrheit nein. Details dazu, wo KI beim Exposé hilft und wo die Grenze liegt, stehen unter KI-Exposé-Texte.",
    },
    {
      q: "Reicht ein gutes Exposé, um den Alleinauftrag zu gewinnen?",
      a: "Ein Baustein von mehreren. Der Eigentümer prüft vorher meist auch die Website und den Google-Auftritt. Wie alle Bausteine zusammenspielen, zeigt Alleinauftrag gewinnen.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Exposés, die verkaufen: Vom Datenblatt zum Entscheidungsdokument | beuwy",
  [`${S}meta.beschreibung`]:
    "Exposés, die verkaufen, folgen einer Dramaturgie mit Preis-Argumentation statt nackter Zahl. So wird aus dem Software-Datenblatt ein Entscheidungsdokument.",
  [`${S}meta.og_titel`]: "Exposés, die verkaufen: Vom Datenblatt zum Entscheidungsdokument | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Die fünf Stufen eines Exposés, das den Alleinauftrag rechtfertigt — inklusive Preis-Argumentation mit echtem Beispiel, nicht nur eine Zahl im Kopfbereich.",

  [`${S}kopf.eyebrow`]: "Exposé-Dramaturgie",
  [`${S}kopf.titel`]: "Exposés, die verkaufen: vom Datenblatt zum *Entscheidungsdokument*.",
  [`${S}kopf.sub_vor`]:
    "Ein Exposé, das den Alleinauftrag rechtfertigt, folgt einer Dramaturgie aus fünf Stufen: Aufschlag, eingebettete Fakten, eine begründete Preis-Argumentation, Beweis in Bildern und ein klarer Abschluss.",
  [`${S}kopf.sub_mark`]:
    "Der Preis steht nie allein im Raum, sondern mit Vergleichsobjekten und Bodenrichtwert daneben",
  [`${S}kopf.sub_nach`]:
    ". Das unterscheidet ein Entscheidungsdokument von der Software-Vorlage, die jeder Mitbewerber im selben System nutzt.",
  [`${S}kopf.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}kopf.antwort`]: "Antwort innerhalb von 24 Stunden",

  [`${S}dramaturgie.eyebrow`]: "Die Dramaturgie",
  [`${S}dramaturgie.titel`]: "Fünf Stufen, vom ersten Bild bis zum *nächsten* Schritt.",
  [`${S}dramaturgie.sub`]: "Jede Stufe hat eine eigene Aufgabe. Fehlt eine, bricht die Wirkung der nächsten weg.",
  ...dramaturgie.defaults,

  [`${S}vergleich.eyebrow`]: "Die Abgrenzung",
  [`${S}vergleich.titel`]: "Das Software-Exposé sieht *fertig* aus. Verkauft hat es noch keines.",
  [`${S}vergleich.spalte_standard_label`]: "Standard-Exposé aus der Software",
  [`${S}vergleich.spalte_entscheidung_label`]: "Entscheidungsdokument",
  ...vergleich.defaults,

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Exposé ist Ihr letztes Wort vor der Entscheidung.",
  [`${S}unterschied.text`]:
    "Der Eigentümer vergleicht drei Makler, nicht drei Objekte. Das Exposé ist der Punkt, an dem er sieht, wie Sie arbeiten — nicht nur, was Sie verkaufen. Ein Entscheidungsdokument beantwortet die Preisfrage, bevor sie gestellt wird.",

  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.titel`]:
    "Bei RIEGEL Immobilien trug die Preis-Argumentation im Exposé den Verkaufsprozess mit: neun Abschlüsse, 342.000 € Volumen in sechs Wochen, ohne einen einzigen gekauften Lead.",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem nächsten *Exposé* wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Entscheidungsdokument*.",
  [`${S}finale.satz1`]: "Wie ein starkes Exposé den Alleinauftrag mitentscheidet, zeigt",
  [`${S}finale.link1`]: "Alleinauftrag gewinnen",
  [`${S}finale.satz2`]: ", wo KI beim Rohtext helfen kann",
  [`${S}finale.link2`]: "KI-Exposé-Texte",
  [`${S}finale.satz3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link3`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz4`]: ".",
  [`${S}finale.antwort`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}kopf.eyebrow`]: "Kopf · Eyebrow",
  [`${S}kopf.titel`]: "Kopf · Titel (ein *Wort* = Highlighter)",
  [`${S}kopf.sub_vor`]: "Kopf · Subline · Teil vor dem Highlight",
  [`${S}kopf.sub_mark`]: "Kopf · Subline · Hervorgehobener Teil",
  [`${S}kopf.sub_nach`]: "Kopf · Subline · Teil nach dem Highlight",
  [`${S}kopf.cta_label`]: "Kopf & Finale · CTA-Beschriftung",
  [`${S}kopf.antwort`]: "Kopf · Antwortzeit-Hinweis",

  [`${S}dramaturgie.eyebrow`]: "Dramaturgie · Eyebrow",
  [`${S}dramaturgie.titel`]: "Dramaturgie · Titel (ein *Wort* = Highlighter)",
  [`${S}dramaturgie.sub`]: "Dramaturgie · Subline",
  ...dramaturgie.labels,

  [`${S}vergleich.eyebrow`]: "Vergleich · Eyebrow",
  [`${S}vergleich.titel`]: "Vergleich · Titel (ein *Wort* = Highlighter)",
  [`${S}vergleich.spalte_standard_label`]: "Vergleich · Spaltenlabel Standard-Exposé",
  [`${S}vergleich.spalte_entscheidung_label`]: "Vergleich · Spaltenlabel Entscheidungsdokument",
  ...vergleich.labels,

  [`${S}unterschied.label`]: "Der Unterschied · Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Text",

  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.titel`]: "Beweis · Kernsatz",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz1`]: "Finale · Satz · Teil vor Link 1 (Alleinauftrag)",
  [`${S}finale.link1`]: "Finale · Satz · Linktext 1 (Alleinauftrag gewinnen)",
  [`${S}finale.satz2`]: "Finale · Satz · Teil zwischen Link 1 und Link 2 (KI-Texte)",
  [`${S}finale.link2`]: "Finale · Satz · Linktext 2 (KI-Exposé-Texte)",
  [`${S}finale.satz3`]: "Finale · Satz · Teil zwischen Link 2 und Link 3 (Hub)",
  [`${S}finale.link3`]: "Finale · Satz · Linktext 3 (Immobilienmarketing-Hub)",
  [`${S}finale.satz4`]: "Finale · Satz · Teil nach Link 3",
  [`${S}finale.antwort`]: "Finale · Antwortzeit-Hinweis",
};
