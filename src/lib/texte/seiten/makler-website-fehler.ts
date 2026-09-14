import { listeRegistrieren } from "../lesen";

/** Studio-Texte /makler-website-fehler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "makler-website-fehler",
  titel: "Makler-Website-Fehler",
  route: "/makler-website-fehler",
};
const S = "s.makler-website-fehler.";

const fehler = listeRegistrieren(
  "makler-website-fehler",
  "fehler",
  "Fehler",
  [
    {
      titel: "Ladezeit über drei Sekunden",
      muster:
        "Die Startseite baut sich sichtbar Stück für Stück auf, weil Bilder in voller Auflösung ungeoptimiert nachladen.",
      kosten:
        "Der Eigentümer öffnet parallel den nächsten Makler-Tab, während Ihre Seite noch lädt. Die Konkurrenz gewinnt, bevor Ihr Angebot überhaupt sichtbar ist.",
    },
    {
      titel: "Kein direkter Weg zur Anfrage",
      muster:
        "Wer eine Immobilie bewerten lassen will, findet nur eine allgemeine Kontaktseite mit Postanschrift statt eines Rechners oder Formulars, das sofort startet.",
      kosten:
        "Jeder Klick, der zu einer weiteren Seite führt, verliert einen Teil der Besucher. Wer suchen muss, bricht ab, statt anzufragen.",
    },
    {
      titel: "Kontaktformular ohne Rückmeldung",
      muster:
        "Nach dem Absenden erscheint keine Bestätigung, keine Mail geht raus, kein Hinweis, wann sich jemand meldet.",
      kosten:
        "Der Absender weiß nicht, ob die Anfrage angekommen ist, und schreibt sicherheitshalber gleich noch einem zweiten Makler.",
    },
    {
      titel: "Nicht wirklich mobil optimiert",
      muster:
        "Texte lassen sich auf dem Smartphone nur mit Pinch-to-Zoom lesen, Buttons liegen so eng, dass der falsche Link geöffnet wird.",
      kosten:
        "Der größte Teil der Besucher kommt heute über das Smartphone. Eine Seite, die dort schlecht bedienbar ist, verliert genau diese Mehrheit zuerst.",
    },
    {
      titel: "Stockfotos statt echter Bilder",
      muster:
        "Das immer gleiche Lächeln-Team-Stockfoto, das auch auf zehn anderen Makler-Websites in anderen Städten auftaucht.",
      kosten:
        "Wer ein Stockfoto wiedererkennt, verliert Vertrauen in den ganzen Auftritt, inklusive der echten Zahlen, die daneben stehen.",
    },
    {
      titel: "Exposé nur als PDF hinter einem Formular",
      muster:
        "Wer sich ein Objekt ansehen will, muss erst Name und Telefonnummer hinterlassen, bevor ein einziges Foto zu sehen ist.",
      kosten:
        "Ein Teil der Interessenten bricht genau an dieser Hürde ab, statt die Kontaktdaten für ein Objekt herzugeben, das sie noch nicht einmal gesehen haben.",
    },
    {
      titel: "Rechtlich unvollständiges Impressum",
      muster:
        "Angaben zur Berufshaftpflicht oder zur zuständigen Aufsichtsbehörde fehlen, obwohl sie für Immobilienmakler vorgeschrieben sind.",
      kosten:
        "Eine Lücke, die ein aufmerksamer Eigentümer als Nachlässigkeit liest. Bei einem Geschäft, das auf Vertrauen aufbaut, wirkt das gegen Sie.",
    },
    {
      titel: "Eine Seite für alle Städte und Stadtteile",
      muster:
        "Die Startseite nennt vage „unsere Region“, ohne dass eine einzige Seite die Stadt oder den Stadtteil beim Namen nennt, in dem gesucht wird.",
      kosten:
        "Wer „Makler [Stadtteil]“ sucht, findet stattdessen den Mitbewerber, der genau dafür eine eigene Seite gebaut hat.",
    },
    {
      titel: "Keine sichtbaren Trust-Signale",
      muster: "Keine Bewertung, keine Zahl, keine Fallstudie: nur ein Fließtext darüber, wie sehr man sich um jeden Kunden kümmert.",
      kosten:
        "Eine Behauptung ohne Beleg überzeugt niemanden, der gerade drei Maklerauftritte nebeneinander offen hat.",
    },
    {
      titel: "Schlechte Kontraste und keine Tastaturbedienung",
      muster: "Hellgrauer Text auf weißem Grund, Buttons, die sich ohne Maus nicht anklicken lassen.",
      kosten:
        "Ein Teil der Besucher kann die Seite so schlicht nicht nutzen, unabhängig von Sehschärfe oder Endgerät. Details zur Pflicht dahinter unter Barrierefreie Maklerwebsite.",
    },
    {
      titel: "Keine Anbindung ans CRM",
      muster:
        "Anfragen landen in einem allgemeinen Postfach, das mehrere Personen im Büro mitlesen, ohne feste Zuständigkeit.",
      kosten:
        "Was in keinem System mit Frist steht, wird im Tagesgeschäft vergessen. Die Anfrage von gestern Abend ist morgen früh keine Priorität mehr.",
    },
  ],
  { titel: "Titel", muster: "Muster", kosten: "Kosten" },
);

const faq = listeRegistrieren(
  "makler-website-fehler",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie lange dauert der Selbst-Audit wirklich?",
      antwort:
        "Zehn Minuten reichen, wenn Sie die eigene Website parallel auf dem Smartphone und am Rechner öffnen und die elf Punkte der Reihe nach durchgehen. Für eine rechtliche Prüfung von Impressum und Datenschutz braucht es danach trotzdem einen genaueren Blick.",
    },
    {
      frage: "Welcher Fehler kostet am meisten?",
      antwort:
        "Meist die Kombination aus langsamer Ladezeit und fehlendem direktem Weg zur Anfrage. Beide zusammen sorgen dafür, dass ein interessierter Besucher die Seite verlässt, bevor er überhaupt eine Möglichkeit hatte, Kontakt aufzunehmen.",
    },
    {
      frage: "Reicht es, einzelne Fehler zu beheben?",
      antwort:
        "Kurzfristig hilft das, langfristig bleibt eine Website mit Software-Vorlage anfällig für den nächsten Fehler auf der Liste. Ein Portal, das von Anfang an auf diese Punkte ausgelegt ist, spart die wiederkehrende Fehlersuche.",
    },
    {
      frage: "Was kostet ein Website-Relaunch, der diese Fehler vermeidet?",
      antwort: "Das hängt vom Umfang ab, eine Einordnung nach Leistungsstufen zeigt Maklerwebsite-Kosten.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Die 11 häufigsten Makler-Website-Fehler und ihre Kosten | beuwy",
  [`${S}meta.beschreibung`]:
    "Die 11 häufigsten Makler-Website-Fehler: jedes Muster mit sichtbarem Beispiel und seiner Kosten in Anfragen, plus Selbst-Audit in 10 Minuten zum Nachprüfen.",
  [`${S}meta.og_beschreibung`]:
    "Von langsamer Ladezeit bis fehlender CRM-Anbindung: 11 Muster, an denen Makler-Websites Anfragen verlieren, mit Selbst-Audit in 10 Minuten.",
  [`${S}hero.eyebrow`]: "Website-Fehler",
  [`${S}hero.titel`]: "Die 11 häufigsten Makler-Website-*Fehler* und ihre Kosten.",
  [`${S}hero.intro`]:
    "Makler-Websites verlieren Anfragen selten an einem einzigen großen Problem, sondern an elf immer wiederkehrenden Mustern: von der Ladezeit über fehlende Trust-Signale bis zur Anfrage, die im allgemeinen Postfach verschwindet.",
  [`${S}hero.intro_highlight`]:
    "Jeder Fehler kostet nicht Geld direkt, sondern die Anfrage, die dadurch nie entsteht",
  [`${S}hero.cta_label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}fehler.eyebrow`]: "Elf Muster",
  [`${S}fehler.titel`]: "Jeder Fehler hat ein sichtbares Muster und eine *Kosten*-Seite.",
  [`${S}fehler.sub`]:
    "Kein Fehler steht für sich allein. Zusammen erklären sie, warum eine Website online steht und trotzdem keine Anfragen bringt.",
  ...fehler.defaults,
  [`${S}audit.eyebrow`]: "Selbst-Audit",
  [`${S}audit.titel`]: "Elf Fragen, *zehn* Minuten, ein ehrliches Bild Ihrer Website.",
  [`${S}audit.sub`]: "Öffnen Sie Ihre Website parallel auf dem Smartphone und gehen Sie jeden Punkt einmal durch.",
  [`${S}audit.punkt_suffix`]: "geprüft?",
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Elf einzelne Fixes sind kein Fundament.",
  [`${S}unterschied.text`]:
    "Jeder Punkt oben lässt sich einzeln flicken. Ein Portal, das von Anfang an auf Tempo, Struktur und CRM-Anbindung gebaut ist, muss diese Liste kein zweites Mal abarbeiten, weil keiner der elf Fehler im Bauplan vorkommt.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "RIEGEL Immobilien startete mit genau diesen Fehlern im alten Auftritt. Nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen in sechs Wochen, Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem eigenen *Audit* wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir eine Website ohne diese *elf* Fehler.",
  [`${S}finale.text_vor`]: "Wie ein Auftritt aussieht, der von Anfang an keinen dieser Fehler macht, zeigt",
  [`${S}finale.text_link1`]: "Website für Immobilienmakler",
  [`${S}finale.text_mitte1`]: ". Einen direkten Weg zur Anfrage testen Sie am",
  [`${S}finale.text_link2`]: "Verkaufspreisrechner",
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
  [`${S}fehler.eyebrow`]: "Fehlerliste · Eyebrow",
  [`${S}fehler.titel`]: "Fehlerliste · Titel (ein *Wort* = Highlighter)",
  [`${S}fehler.sub`]: "Fehlerliste · Subline",
  ...fehler.labels,
  [`${S}audit.eyebrow`]: "Selbst-Audit · Eyebrow",
  [`${S}audit.titel`]: "Selbst-Audit · Titel (ein *Wort* = Highlighter)",
  [`${S}audit.sub`]: "Selbst-Audit · Subline",
  [`${S}audit.punkt_suffix`]: "Selbst-Audit · Anhängsel je Punkt (nach dem Fehlertitel)",
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
  [`${S}finale.text_vor`]: "Finale · Textlink-Satz · Teil vor dem ersten Link",
  [`${S}finale.text_link1`]: "Finale · Textlink-Satz · Link zu Website für Immobilienmakler",
  [`${S}finale.text_mitte1`]: "Finale · Textlink-Satz · Teil vor dem Rechner-Link",
  [`${S}finale.text_link2`]: "Finale · Textlink-Satz · Link zum Verkaufspreisrechner",
  [`${S}finale.text_mitte2`]: "Finale · Textlink-Satz · Teil vor dem Hub-Link",
  [`${S}finale.text_link3`]: "Finale · Textlink-Satz · Link zum Immobilienmarketing-Hub",
  [`${S}finale.cta_label`]: "Finale · Button-Text",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis unter dem Button",
};
