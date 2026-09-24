import { listeRegistrieren } from "../lesen";

/** Studio-Texte /website-relaunch-makler — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = {
  slug: "website-relaunch-makler",
  titel: "Website-Relaunch Makler",
  route: "/website-relaunch-makler",
};
const S = "s.website-relaunch-makler.";

const pains = listeRegistrieren(
  "website-relaunch-makler",
  "pains",
  "Einwand",
  [
    {
      zitat: "Zwei Wochen nach dem Relaunch war die Hälfte der Rankings weg.",
      antwort:
        "Fast immer liegt die Ursache nicht am neuen Design, sondern an fehlenden Weiterleitungen. Jede alte URL, die auf eine 404-Seite läuft, verliert ihren Rankingwert, und Google trägt die Seite still aus dem Index aus.",
    },
    {
      zitat: "Die neue Seite trug noch das noindex-Tag aus der Staging-Umgebung.",
      antwort:
        "Ein einziges vergessenes Meta-Tag reicht, damit Google die neue Seite gar nicht erst aufnimmt. Sechs Wochen Unsichtbarkeit, obwohl der Relaunch technisch längst online war, sind die Folge.",
    },
    {
      zitat: "Aus vierzig Unterseiten wurden zwölf — den Rest hat angeblich niemand vermisst.",
      antwort:
        "Vermisst hat ihn niemand im Team. Vermisst haben ihn die Suchanfragen, für die genau diese Unterseiten bislang rankten. Ohne Inhalts-Inventur verschwinden Seiten, die tatsächlich Anfragen brachten, einfach in der Zusammenlegung.",
    },
    {
      zitat: "Die neue Analytics-Property zählte bei null.",
      antwort:
        "Wer für den Relaunch eine neue Property statt der bestehenden anlegt, verliert den kompletten Vorher-Vergleich. Ob der Relaunch tatsächlich funktioniert hat, lässt sich dann nur noch schätzen, nicht mehr belegen.",
    },
  ],
  { zitat: "Zitat", antwort: "Antwort" },
);

const punkte1 = listeRegistrieren(
  "website-relaunch-makler",
  "checkliste_punkte1",
  "Redirect-Plan · Punkt",
  [
    { punkt: "Jede bestehende URL exportiert und einer neuen Ziel-URL zugeordnet, bevor die alte Seite abgeschaltet wird" },
    { punkt: "301-Redirects gesetzt, dauerhaft, nicht 302 als vermeintlich schnelle Zwischenlösung" },
    { punkt: "Interne Verlinkung auf die neue Struktur nachgezogen, keine internen Links, die über eine Weiterleitung laufen müssen" },
  ],
  { punkt: "Text" },
);

const punkte2 = listeRegistrieren(
  "website-relaunch-makler",
  "checkliste_punkte2",
  "Inhalts-Inventur · Punkt",
  [
    { punkt: "Jede bestehende Unterseite bewertet: behalten, zusammenlegen oder bewusst weglassen — nichts fällt einfach durch" },
    { punkt: "robots.txt und Meta-Tags geprüft: Staging-Reste und alte noindex-Anweisungen sind aus der neuen Seite entfernt" },
    { punkt: "Meta-Titel und Descriptions der wichtigsten Seiten übernommen oder gezielt verbessert, nicht ersatzlos gestrichen" },
    { punkt: "Strukturierte Daten aus dem alten Auftritt erneut eingebunden, nicht vergessen" },
  ],
  { punkt: "Text" },
);

const punkte3 = listeRegistrieren(
  "website-relaunch-makler",
  "checkliste_punkte3",
  "Messpunkte vorher/nachher · Punkt",
  [
    { punkt: "Rankings, Klicks und Impressionen in der Google Search Console vor dem Umzug dokumentiert" },
    { punkt: "Neue XML-Sitemap erstellt und in der Search Console eingereicht, bestehende Property weiterverwendet" },
    { punkt: "Vier bis sechs Wochen nach dem Livegang: dieselben Werte erneut geprüft, gegen die Vorher-Dokumentation" },
  ],
  { punkt: "Text" },
);

const faq = listeRegistrieren(
  "website-relaunch-makler",
  "faq",
  "FAQ",
  [
    {
      frage: "Wie lange dauert ein Relaunch, ohne dass Rankings einbrechen?",
      antwort:
        "Der technische Umzug selbst läuft an einem Tag. Sicher wird er durch die Vorbereitung davor: Redirect-Tabelle, Inhalts-Inventur und dokumentierte Ausgangswerte, das braucht je nach Seitenumfang ein bis zwei Wochen zusätzlich zum eigentlichen Website-Bau.",
    },
    {
      frage: "Was tun, wenn Rankings trotzdem einbrechen?",
      antwort:
        "Zuerst die Redirect-Tabelle gegen die tatsächlichen 404-Fehler in der Search Console prüfen, dann die Meta-Robots-Tags kontrollieren. In den meisten Fällen liegt die Ursache in einer dieser beiden Stellen, nicht in einer generellen Google-Abwertung.",
    },
    {
      frage: "Muss ich beim Relaunch die Domain wechseln?",
      antwort:
        "In den meisten Fällen nein, und das ist auch besser so. Ein Domainwechsel ist eine eigene, riskantere Migration als ein reiner Design- und Technik-Relaunch auf derselben Domain. Ist ein Wechsel unvermeidbar, braucht er einen eigenen, noch sorgfältigeren Plan.",
    },
    {
      frage: "Reicht es, nur das Design zu ändern, wenn die URLs gleich bleiben?",
      antwort:
        "Dann ist das Risiko deutlich kleiner, ein Redirect-Plan wird meist gar nicht gebraucht. Die Messpunkte vorher und nachher lohnen sich trotzdem, damit eine mögliche Ladezeit- oder Struktur-Änderung nicht unbemerkt bleibt.",
    },
  ],
  { frage: "Frage", antwort: "Antwort" },
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Website-Relaunch ohne Sichtbarkeitsverlust: Die Makler-Checkliste | beuwy",
  [`${S}meta.beschreibung`]:
    "Website-Relaunch ohne Sichtbarkeitsverlust: Redirect-Plan, Inhalts-Inventur und Messpunkte vorher/nachher als Checkliste gegen typische Relaunch-Unfälle.",
  [`${S}meta.og_titel`]: "Website-Relaunch ohne Sichtbarkeitsverlust: Die Makler-Checkliste | beuwy",
  [`${S}meta.og_beschreibung`]:
    "Eine abarbeitbare Checkliste für den Website-Relaunch: Redirect-Plan, Inhalts-Inventur, Messpunkte vorher/nachher — und die Fehler, die Rankings tatsächlich kosten.",
  [`${S}hero.eyebrow`]: "Website-Relaunch",
  [`${S}hero.titel`]: "Website-Relaunch ohne *Sichtbarkeitsverlust*: Die Makler-Checkliste.",
  [`${S}hero.sub_vor`]:
    "Nein, nicht zwangsläufig — Rankings gehen beim Relaunch fast immer durch fehlende Weiterleitungen verloren, nicht durch den Relaunch selbst. Mit einem Redirect-Plan von jeder alten URL auf ihr neues Ziel, einer vollständigen Inhalts-Inventur und dokumentierten Messpunkten vor und nach dem Umzug bleibt der Großteil der Sichtbarkeit erhalten.",
  [`${S}hero.sub_highlight`]:
    "Wer die Rankings vor dem Livegang dokumentiert, sieht sofort, ob nach dem Umzug etwas fehlt",
  [`${S}hero.sub_nach`]: ", statt es erst Wochen später zu bemerken.",
  [`${S}cta.label`]: "Zusammenarbeit anfragen",
  [`${S}hero.cta_hinweis`]: "Antwort innerhalb von 24 Stunden",
  [`${S}unfaelle.eyebrow`]: "Was ohne Plan passiert",
  [`${S}unfaelle.titel`]: "Vier *Relaunch-Unfälle*, die sich alle vermeiden lassen.",
  ...pains.defaults,
  [`${S}checkliste.eyebrow`]: "Die Checkliste",
  [`${S}checkliste.titel`]: "Drei Gruppen, zehn Punkte, vor dem *Livegang* abgehakt.",
  [`${S}checkliste.gruppe1_titel`]: "Redirect-Plan",
  ...punkte1.defaults,
  [`${S}checkliste.gruppe2_titel`]: "Inhalts-Inventur",
  ...punkte2.defaults,
  [`${S}checkliste.gruppe3_titel`]: "Messpunkte vorher/nachher",
  ...punkte3.defaults,
  [`${S}unterschied.label`]: "Der Unterschied",
  [`${S}unterschied.titel`]: "Ein Relaunch ist kein Neuanfang bei Google.",
  [`${S}unterschied.text`]:
    "Google kennt Ihre Domain schon, mit jeder Signalgeschichte, die sie in den letzten Jahren aufgebaut hat. Ein Redirect-Plan trägt diese Geschichte in die neue Seite hinüber. Ohne ihn fängt Google faktisch bei null an — und Sie mit ihm.",
  [`${S}beweis.label`]: "Beweis, kein Beispiel",
  [`${S}beweis.text`]:
    "Für RIEGEL Immobilien bedeutete der technische Neuaufbau keinen Rankingverlust, sondern in den ersten drei Monaten danach neun zusätzliche Mandate über das System.",
  [`${S}faq.eyebrow`]: "Häufige Fragen",
  [`${S}faq.titel`]: "Was Sie vor dem *eigenen* Relaunch wissen wollen.",
  ...faq.defaults,
  [`${S}finale.label`]: "Der nächste Schritt",
  [`${S}finale.titel`]: "Bauen wir Ihren *Relaunch*, ohne Rankingverlust.",
  [`${S}finale.satz_1`]: "Wie die Seitenarchitektur danach für neue Rankings sorgt, zeigt",
  [`${S}finale.link_1`]: "SEO für Immobilienmakler",
  [`${S}finale.satz_2`]: ", welche Fehler einen Relaunch besonders teuer machen",
  [`${S}finale.link_2`]: "Die 11 häufigsten Makler-Website-Fehler",
  [`${S}finale.satz_3`]: ". Den Überblick über alle Bausteine bietet der",
  [`${S}finale.link_3`]: "Immobilienmarketing-Hub",
  [`${S}finale.satz_4`]: ".",
  [`${S}finale.cta_hinweis`]: "Antwort innerhalb von 24 Stunden.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
  [`${S}meta.og_titel`]: "SEO · OpenGraph-Titel",
  [`${S}meta.og_beschreibung`]: "SEO · OpenGraph-Beschreibung",
  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel (ein *Wort* = Highlighter)",
  [`${S}hero.sub_vor`]: "Hero · Subline (Teil vor dem Highlight)",
  [`${S}hero.sub_highlight`]: "Hero · Subline (hervorgehobener Teil)",
  [`${S}hero.sub_nach`]: "Hero · Subline (Teil nach dem Highlight)",
  [`${S}cta.label`]: "CTA · Button-Beschriftung",
  [`${S}hero.cta_hinweis`]: "Hero · Hinweis neben dem CTA",
  [`${S}unfaelle.eyebrow`]: "Relaunch-Unfälle · Eyebrow",
  [`${S}unfaelle.titel`]: "Relaunch-Unfälle · Titel",
  ...pains.labels,
  [`${S}checkliste.eyebrow`]: "Checkliste · Eyebrow",
  [`${S}checkliste.titel`]: "Checkliste · Titel",
  [`${S}checkliste.gruppe1_titel`]: "Checkliste · Gruppe 1 Titel",
  ...punkte1.labels,
  [`${S}checkliste.gruppe2_titel`]: "Checkliste · Gruppe 2 Titel",
  ...punkte2.labels,
  [`${S}checkliste.gruppe3_titel`]: "Checkliste · Gruppe 3 Titel",
  ...punkte3.labels,
  [`${S}unterschied.label`]: "Unterschied-Karte · Label",
  [`${S}unterschied.titel`]: "Unterschied-Karte · Titel",
  [`${S}unterschied.text`]: "Unterschied-Karte · Text",
  [`${S}beweis.label`]: "Beweis · Label",
  [`${S}beweis.text`]: "Beweis · Text",
  [`${S}faq.eyebrow`]: "FAQ · Eyebrow",
  [`${S}faq.titel`]: "FAQ · Titel",
  ...faq.labels,
  [`${S}finale.label`]: "Finale · Label",
  [`${S}finale.titel`]: "Finale · Titel (ein *Wort* = Highlighter)",
  [`${S}finale.satz_1`]: "Finale · Satzteil 1 (vor Link 1)",
  [`${S}finale.link_1`]: "Finale · Link 1 (Ziel: SEO für Immobilienmakler)",
  [`${S}finale.satz_2`]: "Finale · Satzteil 2 (zwischen Link 1 und Link 2)",
  [`${S}finale.link_2`]: "Finale · Link 2 (Ziel: Makler-Website-Fehler)",
  [`${S}finale.satz_3`]: "Finale · Satzteil 3 (zwischen Link 2 und Link 3)",
  [`${S}finale.link_3`]: "Finale · Link 3 (Ziel: Immobilienmarketing-Hub)",
  [`${S}finale.satz_4`]: "Finale · Satzteil 4 (nach Link 3)",
  [`${S}finale.cta_hinweis`]: "Finale · Hinweis neben dem CTA",
};
