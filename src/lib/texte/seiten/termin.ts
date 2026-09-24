import { listeRegistrieren } from "../lesen";

/** Studio-Texte /termin — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "termin", titel: "Terminbuchung", route: "/termin" };
const S = "s.termin.";

/* ── Seiten-Rahmen (page.tsx) ───────────────────────────────────────── */
const metaTitel = "Systemgespräch buchen — beuwy";
const metaBeschreibung =
  "30 Minuten, Video oder Telefon. Danach wissen Sie, wo Ihre Aufträge verloren gehen — den größten Hebel bekommen Sie schriftlich.";

const hinweisLabel = "Empfohlener Weg";
const hinweisVor = "Der kürzeste Weg zu einem passenden Termin führt über die kurze Vorqualifizierung unter";
const hinweisLink = "/anfrage";
const hinweisNach =
  "— danach wissen wir, ob und wie wir zusammenpassen. Wer direkt buchen will, findet die Terminauswahl unten weiterhin funktionsfähig.";

const heroTitel = "30 Minuten. Danach wissen Sie, wo Ihre Aufträge verloren gehen.";
const heroIntro = "Sie sprechen direkt mit Alexander Pütter — nicht mit einem Account-Manager.";

const verlustLabel = "Wo Aufträge verloren gehen";
const verlustPunkte = [
  "Der Kunde vergleicht drei Auftritte und nimmt den, der teurer aussieht.",
  "Anfragen, die nicht innerhalb von Minuten zurückgerufen werden, kaufen woanders.",
  "Ihre Marke war 2019 gut. Ihre Kunden vergleichen mit 2026.",
];

const ablaufLabel = "Was im Gespräch passiert";
const ablaufPunkte = [
  "Wir schauen uns Ihren Auftritt gemeinsam an, live am Bildschirm.",
  "Sie nennen mir Ihre Zahlen — Anfragen, Termine, Abschlüsse. Ich sage Ihnen, wo es klemmt.",
  "Den größten Hebel bekommen Sie schriftlich, innerhalb von 24 Stunden. Ob wir zusammenarbeiten, entscheiden Sie danach.",
];

const fazitText =
  "Nach dem Gespräch übernimmt ein Ansprechpartner, nachweisbar über unser Ticketsystem. Sie fragen nicht nach zwei Wochen nach, wie weit Ihr Projekt ist, Sie sehen den Stand selbst, mit 17 Jahren Markenarbeit dahinter.";

/* ── Terminbuchungs-Tool (BookingTool.tsx) — Studio-Gruppe "buchung" ── */
const buchungRailMarke = "beuwy";
const buchungRailUntertitel = "Systemgespräch & Diagnose";
const buchungRailDatumPlatzhalter = "Datum wählen";
const buchungRailUhrzeitPlatzhalter = "Uhrzeit wählen";
const buchungMinutenSuffix = "Minuten";
const buchungDisclaimer = "Unverbindlich. Bestätigung per E-Mail.";

const buchungFrageAnlass = "Worum geht es?";
const anlaesse = [
  { label: "Systemgespräch", sub: "30 min · kein Pitch" },
  { label: "Diagnose-Besprechung", sub: "45 min · für laufende Diagnosen" },
  { label: "Bestandskunde", sub: "30 min · laufendes Projekt" },
];

const buchungFrageArt = "Wie möchten Sie sprechen?";
const arten = [
  { label: "Video-Call", sub: "Link kommt per E-Mail" },
  { label: "Telefonisch", sub: "Wir rufen Sie an" },
];

const buchungFrageTag = "An welchem Tag?";
const buchungMorgenHinweis = "morgen";

const buchungFrageUhrzeit = "Zu welcher Uhrzeit?";
const buchungVormittag = "Vormittag";
const buchungNachmittag = "Nachmittag";

const buchungFrageKontakt = "Wie erreichen wir Sie?";
const buchungFeldNamePlatzhalter = "Name";
const buchungFeldEmailPlatzhalter = "E-Mail";
const buchungFeldTelefonPflicht = "Telefon (für den Rückruf)";
const buchungFeldTelefonOptional = "Telefon (optional)";
const buchungFeldNachrichtPlatzhalter = "Nachricht (optional) — z. B. Ihre Domain oder Ihr Anliegen";
const buchungDomainVorschlagVor = "Ich möchte die Check-Befunde für";
const buchungDomainVorschlagNach = "besprechen.";

const buchungConsentVor =
  "Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Jederzeit widerrufbar (siehe";
const buchungConsentLink = "Datenschutz";
const buchungConsentNach = ").";

const buchungFehlerDatum = "Bitte Datum und Uhrzeit wählen.";
const buchungFehlerName = "Bitte Ihren Namen angeben.";
const buchungFehlerEmail = "Bitte eine gültige E-Mail angeben.";
const buchungFehlerTelefon = "Für einen Rückruf brauchen wir Ihre Telefonnummer.";
const buchungFehlerConsent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
const buchungFehlerTechnisch =
  "Der Termin konnte nicht übermittelt werden. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben.";

const buchungAbsenden = "Termin anfragen";
const buchungAbsendenAktiv = "Wird gesendet…";

const buchungErfolgTitel = "Termin angefragt";
const buchungErfolgVor = "Vielen Dank,";
const buchungErfolgNameFallback = "und bis gleich";
const buchungErfolgMitte = "! Wir bestätigen Ihren Wunschtermin in Kürze per E-Mail an";
const buchungErfolgNach = ".";
const buchungErfolgDemoHinweis =
  "Hinweis: Der Mail-Versand ist auf dieser Vorschau noch nicht aktiviert — bitte zusätzlich direkt an ap@beuwy.com schreiben.";

const buchungSummaryAnlass = "Anlass";
const buchungSummaryDatum = "Datum";
const buchungSummaryUhrzeit = "Uhrzeit";
const buchungSummaryArt = "Art";
const buchungUhrSuffix = "Uhr";
const buchungMinSuffix = "Min.";

const buchungIcsButton = "Kalender (.ics)";
const buchungGcalButton = "Google Kalender ↗";
const buchungStartseiteButton = "Zur Startseite";

const verlustListe = listeRegistrieren(
  "termin",
  "verlust",
  "Verlust-Punkt",
  verlustPunkte.map((text) => ({ text })),
  { text: "Text" }
);
const ablaufListe = listeRegistrieren(
  "termin",
  "ablauf",
  "Ablauf-Punkt",
  ablaufPunkte.map((text) => ({ text })),
  { text: "Text" }
);
const anlassListe = listeRegistrieren(
  "termin",
  "buchung.anlass",
  "Anlass-Option",
  anlaesse,
  { label: "Titel", sub: "Untertitel" }
);
const artListe = listeRegistrieren(
  "termin",
  "buchung.art",
  "Art-Option",
  arten,
  { label: "Titel", sub: "Untertitel" }
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: metaTitel,
  [`${S}meta.beschreibung`]: metaBeschreibung,

  [`${S}hinweis.label`]: hinweisLabel,
  [`${S}hinweis.vor`]: hinweisVor,
  [`${S}hinweis.nach`]: hinweisNach,

  [`${S}hero.titel`]: heroTitel,
  [`${S}hero.intro`]: heroIntro,

  [`${S}verlust.label`]: verlustLabel,
  ...verlustListe.defaults,

  [`${S}ablauf.label`]: ablaufLabel,
  ...ablaufListe.defaults,

  [`${S}fazit.text`]: fazitText,

  [`${S}buchung.rail_marke`]: buchungRailMarke,
  [`${S}buchung.rail_untertitel`]: buchungRailUntertitel,
  [`${S}buchung.rail_datum_platzhalter`]: buchungRailDatumPlatzhalter,
  [`${S}buchung.rail_uhrzeit_platzhalter`]: buchungRailUhrzeitPlatzhalter,
  [`${S}buchung.minuten_suffix`]: buchungMinutenSuffix,
  [`${S}buchung.disclaimer`]: buchungDisclaimer,

  [`${S}buchung.frage_anlass`]: buchungFrageAnlass,
  ...anlassListe.defaults,

  [`${S}buchung.frage_art`]: buchungFrageArt,
  ...artListe.defaults,

  [`${S}buchung.frage_tag`]: buchungFrageTag,
  [`${S}buchung.morgen_hinweis`]: buchungMorgenHinweis,

  [`${S}buchung.frage_uhrzeit`]: buchungFrageUhrzeit,
  [`${S}buchung.vormittag`]: buchungVormittag,
  [`${S}buchung.nachmittag`]: buchungNachmittag,

  [`${S}buchung.frage_kontakt`]: buchungFrageKontakt,
  [`${S}buchung.feld_name_platzhalter`]: buchungFeldNamePlatzhalter,
  [`${S}buchung.feld_email_platzhalter`]: buchungFeldEmailPlatzhalter,
  [`${S}buchung.feld_telefon_pflicht`]: buchungFeldTelefonPflicht,
  [`${S}buchung.feld_telefon_optional`]: buchungFeldTelefonOptional,
  [`${S}buchung.feld_nachricht_platzhalter`]: buchungFeldNachrichtPlatzhalter,
  [`${S}buchung.domain_vorschlag_vor`]: buchungDomainVorschlagVor,
  [`${S}buchung.domain_vorschlag_nach`]: buchungDomainVorschlagNach,

  [`${S}buchung.consent_vor`]: buchungConsentVor,
  [`${S}buchung.consent_link`]: buchungConsentLink,
  [`${S}buchung.consent_nach`]: buchungConsentNach,

  [`${S}buchung.fehler_datum`]: buchungFehlerDatum,
  [`${S}buchung.fehler_name`]: buchungFehlerName,
  [`${S}buchung.fehler_email`]: buchungFehlerEmail,
  [`${S}buchung.fehler_telefon`]: buchungFehlerTelefon,
  [`${S}buchung.fehler_consent`]: buchungFehlerConsent,
  [`${S}buchung.fehler_technisch`]: buchungFehlerTechnisch,

  [`${S}buchung.absenden`]: buchungAbsenden,
  [`${S}buchung.absenden_aktiv`]: buchungAbsendenAktiv,

  [`${S}buchung.erfolg_titel`]: buchungErfolgTitel,
  [`${S}buchung.erfolg_vor`]: buchungErfolgVor,
  [`${S}buchung.erfolg_name_fallback`]: buchungErfolgNameFallback,
  [`${S}buchung.erfolg_mitte`]: buchungErfolgMitte,
  [`${S}buchung.erfolg_nach`]: buchungErfolgNach,
  [`${S}buchung.erfolg_demo_hinweis`]: buchungErfolgDemoHinweis,

  [`${S}buchung.summary_anlass`]: buchungSummaryAnlass,
  [`${S}buchung.summary_datum`]: buchungSummaryDatum,
  [`${S}buchung.summary_uhrzeit`]: buchungSummaryUhrzeit,
  [`${S}buchung.summary_art`]: buchungSummaryArt,
  [`${S}buchung.uhr_suffix`]: buchungUhrSuffix,
  [`${S}buchung.min_suffix`]: buchungMinSuffix,

  [`${S}buchung.ics_button`]: buchungIcsButton,
  [`${S}buchung.gcal_button`]: buchungGcalButton,
  [`${S}buchung.startseite_button`]: buchungStartseiteButton,
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hinweis.label`]: "Hinweis-Kopf · Eyebrow",
  [`${S}hinweis.vor`]: "Hinweis-Kopf · Text vor dem /anfrage-Link",
  [`${S}hinweis.nach`]: "Hinweis-Kopf · Text nach dem /anfrage-Link",

  [`${S}hero.titel`]: "Hero · Titel",
  [`${S}hero.intro`]: "Hero · Text neben dem Gründerfoto",

  [`${S}verlust.label`]: "Verlust-Liste · Überschrift",
  ...verlustListe.labels,

  [`${S}ablauf.label`]: "Ablauf-Liste · Überschrift",
  ...ablaufListe.labels,

  [`${S}fazit.text`]: "Fazit · Schlusssatz über dem Buchungstool",

  [`${S}buchung.rail_marke`]: "Zusammenfassungs-Schiene · Markenname",
  [`${S}buchung.rail_untertitel`]: "Zusammenfassungs-Schiene · Unterzeile",
  [`${S}buchung.rail_datum_platzhalter`]: "Zusammenfassungs-Schiene · Platzhalter, solange kein Datum gewählt ist",
  [`${S}buchung.rail_uhrzeit_platzhalter`]: "Zusammenfassungs-Schiene · Platzhalter, solange keine Uhrzeit gewählt ist",
  [`${S}buchung.minuten_suffix`]: "Zusammenfassungs-Schiene · Einheit hinter der Dauer",
  [`${S}buchung.disclaimer`]: "Zusammenfassungs-Schiene · Hinweiszeile unten",

  [`${S}buchung.frage_anlass`]: "Schritt 1 · Frage (Anlass)",
  ...anlassListe.labels,

  [`${S}buchung.frage_art`]: "Schritt 2 · Frage (Gesprächsart)",
  ...artListe.labels,

  [`${S}buchung.frage_tag`]: "Schritt 3 · Frage (Tag)",
  [`${S}buchung.morgen_hinweis`]: "Schritt 3 · Hinweis auf dem ersten Tag (statt Monatsname)",

  [`${S}buchung.frage_uhrzeit`]: "Schritt 4 · Frage (Uhrzeit)",
  [`${S}buchung.vormittag`]: "Schritt 4 · Gruppentitel Vormittag",
  [`${S}buchung.nachmittag`]: "Schritt 4 · Gruppentitel Nachmittag",

  [`${S}buchung.frage_kontakt`]: "Schritt 5 · Frage (Kontakt)",
  [`${S}buchung.feld_name_platzhalter`]: "Feld Name · Platzhalter",
  [`${S}buchung.feld_email_platzhalter`]: "Feld E-Mail · Platzhalter",
  [`${S}buchung.feld_telefon_pflicht`]: "Feld Telefon · Platzhalter, wenn Pflicht (telefonisch)",
  [`${S}buchung.feld_telefon_optional`]: "Feld Telefon · Platzhalter, wenn optional (Video)",
  [`${S}buchung.feld_nachricht_platzhalter`]: "Feld Nachricht · Platzhalter",
  [`${S}buchung.domain_vorschlag_vor`]: "Nachricht-Vorschlag (aus /check) · Text vor der Domain",
  [`${S}buchung.domain_vorschlag_nach`]: "Nachricht-Vorschlag (aus /check) · Text nach der Domain",

  [`${S}buchung.consent_vor`]: "Einwilligung · Text vor dem Datenschutz-Link",
  [`${S}buchung.consent_link`]: "Einwilligung · Linktext",
  [`${S}buchung.consent_nach`]: "Einwilligung · Text nach dem Datenschutz-Link",

  [`${S}buchung.fehler_datum`]: "Fehler · Datum/Uhrzeit fehlt",
  [`${S}buchung.fehler_name`]: "Fehler · Name fehlt",
  [`${S}buchung.fehler_email`]: "Fehler · E-Mail ungültig",
  [`${S}buchung.fehler_telefon`]: "Fehler · Telefon fehlt (telefonisch)",
  [`${S}buchung.fehler_consent`]: "Fehler · Einwilligung fehlt",
  [`${S}buchung.fehler_technisch`]: "Fehler · technischer Zustellungsfehler",

  [`${S}buchung.absenden`]: "Absenden-Button · Beschriftung",
  [`${S}buchung.absenden_aktiv`]: "Absenden-Button · während des Sendens",

  [`${S}buchung.erfolg_titel`]: "Erfolg · Titel",
  [`${S}buchung.erfolg_vor`]: "Erfolg · Text vor dem Vornamen",
  [`${S}buchung.erfolg_name_fallback`]: "Erfolg · Ersatztext, wenn kein Name angegeben wurde",
  [`${S}buchung.erfolg_mitte`]: "Erfolg · Text zwischen Namen und E-Mail-Adresse",
  [`${S}buchung.erfolg_nach`]: "Erfolg · Text nach der E-Mail-Adresse",
  [`${S}buchung.erfolg_demo_hinweis`]: "Erfolg · Hinweis auf inaktiven Mail-Versand (Vorschau)",

  [`${S}buchung.summary_anlass`]: "Zusammenfassung · Zeile Anlass",
  [`${S}buchung.summary_datum`]: "Zusammenfassung · Zeile Datum",
  [`${S}buchung.summary_uhrzeit`]: "Zusammenfassung · Zeile Uhrzeit",
  [`${S}buchung.summary_art`]: "Zusammenfassung · Zeile Art",
  [`${S}buchung.uhr_suffix`]: "Einheit hinter der Uhrzeit",
  [`${S}buchung.min_suffix`]: "Einheit hinter der Dauer (Zusammenfassung)",

  [`${S}buchung.ics_button`]: "Erfolg · Button Kalenderdatei",
  [`${S}buchung.gcal_button`]: "Erfolg · Button Google Kalender",
  [`${S}buchung.startseite_button`]: "Erfolg · Button zur Startseite",
};
