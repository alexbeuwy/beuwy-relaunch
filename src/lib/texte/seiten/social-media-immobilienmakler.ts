import { listeRegistrieren } from "../lesen";

/** Studio-Texte /social-media-immobilienmakler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "social-media-immobilienmakler",
  titel: "Social Media für Immobilienmakler",
  route: "/social-media-immobilienmakler",
};
const S = "s.social-media-immobilienmakler.";

const pains = listeRegistrieren(
  "social-media-immobilienmakler",
  "pains",
  "Einwand",
  [
    {
      quote: "Ich poste fast jeden Tag, aber am Telefon meldet sich trotzdem niemand.",
      answer:
        "Reichweite ist keine Anfrage. Ohne ein System, das jede Reaktion auffängt und weiterverfolgt, verpufft ein Beitrag in dem Moment, in dem der nächste im Feed erscheint.",
    },
    {
      quote: "Das Reel läuft gut, Kommentare, Shares — und trotzdem weiß niemand, wer davon einen Verkauf plant.",
      answer:
        "Ohne eine Stelle, an der sich Interesse registriert, bleibt jede Reaktion anonym. Die Aufmerksamkeit ist da, der Name des Interessenten nicht.",
    },
    {
      quote: "Personal Branding heißt bei mir: noch ein Abend am Schnittprogramm, ohne zu wissen, ob es überhaupt etwas bringt.",
      answer:
        "Ohne Kennzahlen bleibt Personal Branding Bauchgefühl. Sie merken, dass Content Zeit kostet, aber nicht, welcher Beitrag tatsächlich zu einem Mandat führt.",
    },
    {
      quote: "Der Kollege mit den schlechteren Objekten postet einfach öfter — und wirkt in der Story größer als ich.",
      answer:
        "Sichtbarkeit misst sich an der Konkurrenz, nicht am eigenen Bestand. Wer öfter und geplanter erscheint, wirkt größer, unabhängig davon, wessen Objekte besser sind.",
    },
  ],
  { quote: "Zitat", answer: "Antwort" },
);

const schritte = listeRegistrieren(
  "social-media-immobilienmakler",
  "schritte",
  "Schritt",
  [
    {
      titel: "Ein Content-System statt Einzelposts",
      text: "Themen, Formate und Takt stehen für Wochen im Voraus fest. Kein Beitrag entsteht mehr aus der Frage, was heute Abend noch schnell gedreht wird.",
    },
    {
      titel: "Jeder Beitrag zahlt auf das Portal ein",
      text: "Jede Story hat ein Ziel: Eigentümer und Käufer landen nicht im Kommentarfeld, sondern in Ihrem Portal, wo sich Interesse registriert statt zu verpuffen.",
    },
    {
      titel: "Anzeigen und organischer Content greifen ineinander",
      text: "Was organisch funktioniert, wird zur Anzeige. Was als Anzeige zieht, liefert den nächsten organischen Beitrag. Beide Kanäle bauen aufeinander auf.",
    },
    {
      titel: "Die Marke wirkt in jeder Story wie der Marktführer",
      text: "Schnitt, Bildsprache und Wiedererkennung folgen demselben System wie Ihre Website. Wer durch die Story scrollt, sieht ein Haus, das größer wirkt als der nächste Post.",
    },
  ],
  { titel: "Titel", text: "Text" },
);

const faq = listeRegistrieren(
  "social-media-immobilienmakler",
  "faq",
  "FAQ",
  [
    {
      q: "Muss ich selbst vor die Kamera?",
      a: "Nein, aber es hilft. Gesichter erzeugen mehr Vertrauen als reine Objektbilder. Wer nicht selbst drehen will, bekommt Formate, die ohne eigenes Gesicht funktionieren — Objektwelt, Zahlen, Prozess. Wer will, bekommt ein Skript, das sich in einer Minute drehen lässt.",
    },
    {
      q: "Wie oft posten?",
      a: "Regelmäßiger als bisher, aber nach Plan statt aus Zufall. Ein fester Takt über Wochen schlägt tägliches Posten ohne System — Ihr Konto braucht Wiedererkennung, nicht Frequenz um jeden Preis.",
    },
    {
      q: "Instagram oder TikTok?",
      a: "Meistens beide, mit unterschiedlichem Gewicht. Instagram trägt heute den Großteil der Anfragen im Maklergeschäft, TikTok baut Reichweite bei jüngeren Zielgruppen auf. Welcher Kanal zuerst kommt, hängt von Ihrer Zielgruppe ab.",
    },
    {
      q: "Was bringt das für Verkäufer-Leads?",
      a: "Sichtbarkeit, die einen Eigentümer erreicht, bevor er drei Makler vergleicht. Jede Story, die aufs Portal einzahlt, macht aus einem stillen Zuschauer einen registrierten Kontakt — mit Adresse, nicht nur mit einem Like.",
    },
    {
      q: "Übernehmt ihr das komplett?",
      a: "Ja, wenn Sie das wollen. Dreh, Schnitt, Veröffentlichung und die Anbindung ans Portal laufen über uns. Wer selbst vor die Kamera will, bekommt das Skript, wir übernehmen den Rest.",
    },
  ],
  { q: "Frage", a: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Social Media für Immobilienmakler: Anfragen statt Likes | beuwy",
  [`${S}meta.beschreibung`]:
    "beuwy verbindet Ihren Social-Media-Auftritt mit einem Portal: ein Content-System statt Einzelposts, jede Story mit einem Ziel — Registrierung statt Reichweite ohne Ergebnis.",
  [`${S}meta.og_titel`]: "Social Media für Immobilienmakler: Anfragen statt Likes | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Ein Content-System statt Einzelposts: Anzeigen und organischer Content greifen ineinander, jede Story zahlt auf Ihr Portal ein, statt im Feed zu verpuffen.",

  [`${S}hero.karte_label`]: "Erfahrung, kein Experiment",
  [`${S}hero.eyebrow`]: "Social Media für Immobilienmakler",
  [`${S}hero.titel`]: "Social Media für Makler, das *Anfragen* bringt, keine Likes.",
  [`${S}hero.text_vor`]: "Content ist erst Marketing, wenn er landet. Wir bauen",
  [`${S}hero.text_hervor`]: "ein System, das jede Story mit Ihrem Portal verbindet",
  [`${S}hero.text_nach`]: ", statt einzelne Posts ins Leere zu schicken.",
  [`${S}hero.cta`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_note`]: "Antwort innerhalb von 24 Stunden",

  [`${S}problem.eyebrow`]: "Reichweite ist kein Ergebnis",
  [`${S}problem.titel`]: "Posten ist keine Strategie. *Anschluss* an ein System ist eine.",
  [`${S}problem.sub`]:
    "Social Media kann für Immobilienmakler eine verlässliche Quelle für Anfragen sein — aber nur, wenn jeder Beitrag an ein System angeschlossen ist, das registriert, wer reagiert, und daraus einen Kontakt macht. Ohne diese Anbindung bleibt Content Unterhaltung.",
  ...pains.defaults,

  [`${S}system.eyebrow`]: "Der Mechanismus",
  [`${S}system.titel`]: "Vier Stufen. Ein Content-System, das aufs *Portal* einzahlt.",
  [`${S}system.sub`]:
    "beuwy arbeitet als Unternehmensberatung für Ihren Content, nicht als Agentur, die einzelne Reels abliefert. Jede Story ist Teil Ihres Vertriebssystems, mit einem festen Ansprechpartner.",
  ...schritte.defaults,

  [`${S}story.eyebrow`]: "Vom Post zum Portal",
  [`${S}story.titel`]: "So sieht Ihre *Story* aus, wenn sie zum System gehört.",
  [`${S}story.sub`]:
    "Story-Omnipräsenz heißt: dieselbe Bildsprache, derselbe Wiedererkennungswert auf jedem Format — nicht nur im Feed, auch dort, wo die meisten Eigentümer heute zuerst hinschauen.",

  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Reichweite ist kein Vertrieb.",
  [`${S}unterschied.text`]:
    "Ein Feed voller Reaktionen bringt nichts, wenn niemand registriert, wer dahinter steckt. Wir bauen Ihnen kein Content-Kalender-Abo, sondern ein System, das jede Story mit Ihrem Portal verbindet — von der ersten Ansicht bis zur Anfrage.",

  [`${S}beweis.label`]: "Beweis, keine Theorie",
  [`${S}beweis.titel`]:
    "acta: rund 380 Wohneinheiten in drei Jahren verkauft, über Instagram-Anzeigen, rund 40 Mio. € Volumen.",
  [`${S}beweis.text`]:
    "Diesen Vertrieb hat beuwy selbst mit aufgebaut, in der Spitze mit 15 Leuten. Das ist Erfahrung aus eigenem Geld, keine Theorie.",
  [`${S}beweis.link`]: "Weitere Fallstudien ansehen →",

  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *ersten* Post wissen wollen.",
  ...faq.defaults,

  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihr *Content*-System.",
  [`${S}finale.text_vor`]:
    "Social Media ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie im",
  [`${S}finale.link_hub`]: "Immobilienmarketing-Hub",
  [`${S}finale.text_mitte`]: ", Referenzen in den",
  [`${S}finale.link_cases`]: "Fallstudien",
  [`${S}finale.text_nach`]: ".",
  [`${S}finale.cta`]: "Zusammenarbeit anfragen",
  [`${S}finale.cta_note`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · Open-Graph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · Open-Graph-Beschreibung",

  [`${S}hero.karte_label`]: "Hero · Floating-Karte · Label",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.text_vor`]: "Hero · Textabsatz, Teil vor dem Highlight",
  [`${S}hero.text_hervor`]: "Hero · Hervorgehobener Satz",
  [`${S}hero.text_nach`]: "Hero · Textabsatz, Teil nach dem Highlight",
  [`${S}hero.cta`]: "Hero · Button-Text",
  [`${S}hero.cta_note`]: "Hero · Hinweis neben dem Button",

  [`${S}problem.eyebrow`]: "Problem · Eyebrow",
  [`${S}problem.titel`]: "Problem · Titel (ein *Wort* = Highlighter)",
  [`${S}problem.sub`]: "Problem · Subline",
  ...pains.labels,

  [`${S}system.eyebrow`]: "Mechanismus · Eyebrow",
  [`${S}system.titel`]: "Mechanismus · Titel (ein *Wort* = Highlighter)",
  [`${S}system.sub`]: "Mechanismus · Subline",
  ...schritte.labels,

  [`${S}story.eyebrow`]: "Story-Sektion · Eyebrow",
  [`${S}story.titel`]: "Story-Sektion · Titel (ein *Wort* = Highlighter)",
  [`${S}story.sub`]: "Story-Sektion · Subline",

  [`${S}unterschied.label`]: "Der Unterschied · Karten-Label",
  [`${S}unterschied.titel`]: "Der Unterschied · Karten-Titel",
  [`${S}unterschied.text`]: "Der Unterschied · Karten-Text",

  [`${S}beweis.label`]: "Beweis-Anriss · Label",
  [`${S}beweis.titel`]: "Beweis-Anriss · Titel",
  [`${S}beweis.text`]: "Beweis-Anriss · Text",
  [`${S}beweis.link`]: "Beweis-Anriss · Link-Text (zu allen Fallstudien)",

  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel (ein *Wort* = Highlighter)",
  ...faq.labels,

  [`${S}finale.label`]: "Finale · Eyebrow",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.text_vor`]: "Finale · Text, Teil vor Link 1 (Immobilienmarketing-Hub)",
  [`${S}finale.link_hub`]: "Finale · Link-Text 1 (Immobilienmarketing-Hub)",
  [`${S}finale.text_mitte`]: "Finale · Text, Teil zwischen Link 1 und Link 2",
  [`${S}finale.link_cases`]: "Finale · Link-Text 2 (Fallstudien)",
  [`${S}finale.text_nach`]: "Finale · Text, Teil nach Link 2",
  [`${S}finale.cta`]: "Finale · Button-Text",
  [`${S}finale.cta_note`]: "Finale · Hinweis unter dem Button",
};
