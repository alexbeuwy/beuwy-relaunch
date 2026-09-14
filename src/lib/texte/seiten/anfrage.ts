import { listeRegistrieren } from "../lesen";

/** Studio-Texte /anfrage — Struktur bleibt im Code, jeder Text hier. */
export const SEITE = { slug: "anfrage", titel: "Anfrage-Funnel", route: "/anfrage" };
const S = "s.anfrage.";

/* ── Seiten-Rahmen (page.tsx: Hero-Text + Bild-Karte) ──────────────── */
const metaTitel = "Zusammenarbeit anfragen | beuwy";
const metaBeschreibung =
  "Vier kurze Fragen zu Ihrem Haus. Danach meldet sich beuwy persönlich, ohne Pitch und ohne Massenmail.";

const heroEyebrow = "Zusammenarbeit anfragen";
const heroTitel = "Sagen Sie uns, woran es bei Ihnen hakt.";
const heroSub = "Vier kurze Fragen. Danach melden wir uns persönlich, mit einer Einschätzung für genau Ihr Haus.";
const heroKarteLabel = "Nach dem Absenden";
const heroKarteTitel = "Antwort in 24 Stunden.";
const heroKarteText = "Kein Pitch, keine Massenmail.";

/* ── Funnel (AnfrageFunnel.tsx) — eine Studio-Gruppe "funnel" ──────── */
const funnelFortschrittVor = "Schritt";
const funnelFortschrittMitte = "von";
const funnelZurueck = "Zurück";

const funnelSchritt1Titel = "Was beschreibt Sie am besten?";
const rollen = ["Inhaber/Geschäftsführer eines Maklerhauses", "Selbstständiger Makler", "Etwas anderes"];

const funnelSchritt2Titel = "Wie viele Abschlüsse macht Ihr Haus im Jahr?";
const groessen = ["unter 10", "10–30", "30–100", "über 100"];

const funnelSchritt3Titel = "Wo soll es zuerst spürbar werden?";
const funnelSchritt3Hinweis = "Mehrfachauswahl möglich.";
const fokusse = ["Marke & Auftritt", "Website & Anfragen", "E-Mail & Nachfassen", "Automatisierung/CRM"];
const funnelWeiter = "Weiter";

const funnelSchritt4Titel = "Wann wollen Sie starten?";
const zeiten = ["So schnell wie möglich", "In den nächsten 3 Monaten", "Ich sondiere noch"];

const funnelSchritt5TitelSondiert = "Fast geschafft — wohin schicken wir die Unterlagen?";
const funnelSchritt5TitelStandard = "Fast geschafft — wie erreichen wir Sie?";
const funnelSchritt5TextSondiert =
  "Wir schicken Ihnen erst einmal die richtigen Unterlagen. Für Rückfragen brauchen wir eine Nummer, unter der wir Sie erreichen.";
const funnelSchritt5TextStandard =
  "Sie wollen zügig starten. Damit wir Sie schnell erreichen, brauchen wir Ihre Telefonnummer.";

const feldNameLabel = "Name";
const feldNamePlatzhalter = "Vor- und Nachname";
const feldEmailLabel = "E-Mail";
const feldEmailPlatzhalter = "name@firma.de";
const feldTelefonLabel = "Telefon";
const feldTelefonPlatzhalter = "Für den Rückruf";
const feldNachrichtLabel = "Nachricht (optional)";
const feldNachrichtPlatzhalter = "Noch etwas, das wir wissen sollten?";
const pflichtfeld = "Pflichtfeld";

const consentVor =
  "Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Jederzeit widerrufbar (siehe";
const consentLink = "Datenschutz";
const consentNach = ").";

const fehlerName = "Bitte Ihren Namen angeben.";
const fehlerEmail = "Bitte eine gültige E-Mail-Adresse angeben.";
const fehlerTelefon = "Für eine schnelle Rückmeldung brauchen wir Ihre Telefonnummer.";
const fehlerConsent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
const fehlerRateLimit = "Zu viele Anfragen kurz hintereinander. Bitte in ein paar Minuten erneut versuchen.";
const fehlerValidierung = "Bitte prüfen Sie Namen und E-Mail-Adresse — eine Angabe fehlt oder ist ungültig.";
const fehlerTechnisch =
  "Die Anfrage konnte technisch nicht zugestellt werden. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben.";

const absenden = "Zusammenarbeit anfragen";
const absendenAktiv = "Wird gesendet…";

const erfolgTitel = "Anfrage angekommen.";
const erfolgVor = "Wir melden uns innerhalb von 24 Stunden — persönlich, an";
const erfolgNach = ". Kein Pitch, keine Massenmail.";
const erfolgDemoHinweis =
  "Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert — bitte zusätzlich direkt an ap@beuwy.com schreiben.";
const erfolgLink = "Ergebnisse ansehen";

/* Listen unter der Studio-Gruppe "funnel" (Key-Segment "funnel.<liste>",
   damit sie im Studio zusammen mit den übrigen Funnel-Texten stehen). */
const rolleListe = listeRegistrieren(
  "anfrage",
  "funnel.rolle",
  "Rolle-Option",
  rollen.map((label) => ({ label })),
  { label: "Text" }
);
const groesseListe = listeRegistrieren(
  "anfrage",
  "funnel.groesse",
  "Größenklasse-Option",
  groessen.map((label) => ({ label })),
  { label: "Text" }
);
const fokusListe = listeRegistrieren(
  "anfrage",
  "funnel.fokus",
  "Fokus-Option",
  fokusse.map((label) => ({ label })),
  { label: "Text" }
);
const zeitListe = listeRegistrieren(
  "anfrage",
  "funnel.zeit",
  "Zeithorizont-Option",
  zeiten.map((label) => ({ label })),
  { label: "Text" }
);

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: metaTitel,
  [`${S}meta.beschreibung`]: metaBeschreibung,

  [`${S}hero.eyebrow`]: heroEyebrow,
  [`${S}hero.titel`]: heroTitel,
  [`${S}hero.sub`]: heroSub,
  [`${S}hero.karte_label`]: heroKarteLabel,
  [`${S}hero.karte_titel`]: heroKarteTitel,
  [`${S}hero.karte_text`]: heroKarteText,

  [`${S}funnel.fortschritt_vor`]: funnelFortschrittVor,
  [`${S}funnel.fortschritt_mitte`]: funnelFortschrittMitte,
  [`${S}funnel.zurueck`]: funnelZurueck,

  [`${S}funnel.schritt1_titel`]: funnelSchritt1Titel,
  ...rolleListe.defaults,

  [`${S}funnel.schritt2_titel`]: funnelSchritt2Titel,
  ...groesseListe.defaults,

  [`${S}funnel.schritt3_titel`]: funnelSchritt3Titel,
  [`${S}funnel.schritt3_hinweis`]: funnelSchritt3Hinweis,
  ...fokusListe.defaults,
  [`${S}funnel.weiter`]: funnelWeiter,

  [`${S}funnel.schritt4_titel`]: funnelSchritt4Titel,
  ...zeitListe.defaults,

  [`${S}funnel.schritt5_titel_sondiert`]: funnelSchritt5TitelSondiert,
  [`${S}funnel.schritt5_titel_standard`]: funnelSchritt5TitelStandard,
  [`${S}funnel.schritt5_text_sondiert`]: funnelSchritt5TextSondiert,
  [`${S}funnel.schritt5_text_standard`]: funnelSchritt5TextStandard,

  [`${S}funnel.feld_name_label`]: feldNameLabel,
  [`${S}funnel.feld_name_platzhalter`]: feldNamePlatzhalter,
  [`${S}funnel.feld_email_label`]: feldEmailLabel,
  [`${S}funnel.feld_email_platzhalter`]: feldEmailPlatzhalter,
  [`${S}funnel.feld_telefon_label`]: feldTelefonLabel,
  [`${S}funnel.feld_telefon_platzhalter`]: feldTelefonPlatzhalter,
  [`${S}funnel.feld_nachricht_label`]: feldNachrichtLabel,
  [`${S}funnel.feld_nachricht_platzhalter`]: feldNachrichtPlatzhalter,
  [`${S}funnel.pflichtfeld`]: pflichtfeld,

  [`${S}funnel.consent_vor`]: consentVor,
  [`${S}funnel.consent_link`]: consentLink,
  [`${S}funnel.consent_nach`]: consentNach,

  [`${S}funnel.fehler_name`]: fehlerName,
  [`${S}funnel.fehler_email`]: fehlerEmail,
  [`${S}funnel.fehler_telefon`]: fehlerTelefon,
  [`${S}funnel.fehler_consent`]: fehlerConsent,
  [`${S}funnel.fehler_rate_limit`]: fehlerRateLimit,
  [`${S}funnel.fehler_validierung`]: fehlerValidierung,
  [`${S}funnel.fehler_technisch`]: fehlerTechnisch,

  [`${S}funnel.absenden`]: absenden,
  [`${S}funnel.absenden_aktiv`]: absendenAktiv,

  [`${S}funnel.erfolg_titel`]: erfolgTitel,
  [`${S}funnel.erfolg_vor`]: erfolgVor,
  [`${S}funnel.erfolg_nach`]: erfolgNach,
  [`${S}funnel.erfolg_demo_hinweis`]: erfolgDemoHinweis,
  [`${S}funnel.erfolg_link`]: erfolgLink,
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",

  [`${S}hero.eyebrow`]: "Hero · Eyebrow",
  [`${S}hero.titel`]: "Hero · Titel",
  [`${S}hero.sub`]: "Hero · Unterzeile",
  [`${S}hero.karte_label`]: "Hero-Bildkarte · Label",
  [`${S}hero.karte_titel`]: "Hero-Bildkarte · Titel",
  [`${S}hero.karte_text`]: "Hero-Bildkarte · Text",

  [`${S}funnel.fortschritt_vor`]: "Fortschrittszeile · Wort vor der Schrittzahl",
  [`${S}funnel.fortschritt_mitte`]: "Fortschrittszeile · Wort vor der Gesamtzahl",
  [`${S}funnel.zurueck`]: "Zurück-Link",

  [`${S}funnel.schritt1_titel`]: "Schritt 1 · Frage (Rolle)",
  ...rolleListe.labels,

  [`${S}funnel.schritt2_titel`]: "Schritt 2 · Frage (Größenklasse)",
  ...groesseListe.labels,

  [`${S}funnel.schritt3_titel`]: "Schritt 3 · Frage (Fokus)",
  [`${S}funnel.schritt3_hinweis`]: "Schritt 3 · Hinweis (Mehrfachauswahl)",
  ...fokusListe.labels,
  [`${S}funnel.weiter`]: "Schritt 3 · Weiter-Button",

  [`${S}funnel.schritt4_titel`]: "Schritt 4 · Frage (Zeithorizont)",
  ...zeitListe.labels,

  [`${S}funnel.schritt5_titel_sondiert`]: "Schritt 5 · Titel, wenn 'Ich sondiere noch' gewählt wurde",
  [`${S}funnel.schritt5_titel_standard`]: "Schritt 5 · Titel, Standardfall",
  [`${S}funnel.schritt5_text_sondiert`]: "Schritt 5 · Erklärsatz, wenn 'Ich sondiere noch' gewählt wurde",
  [`${S}funnel.schritt5_text_standard`]: "Schritt 5 · Erklärsatz, Standardfall",

  [`${S}funnel.feld_name_label`]: "Feld Name · Label",
  [`${S}funnel.feld_name_platzhalter`]: "Feld Name · Platzhalter",
  [`${S}funnel.feld_email_label`]: "Feld E-Mail · Label",
  [`${S}funnel.feld_email_platzhalter`]: "Feld E-Mail · Platzhalter",
  [`${S}funnel.feld_telefon_label`]: "Feld Telefon · Label",
  [`${S}funnel.feld_telefon_platzhalter`]: "Feld Telefon · Platzhalter",
  [`${S}funnel.feld_nachricht_label`]: "Feld Nachricht · Label",
  [`${S}funnel.feld_nachricht_platzhalter`]: "Feld Nachricht · Platzhalter",
  [`${S}funnel.pflichtfeld`]: "Pflichtfeld-Hinweis (nur für Screenreader)",

  [`${S}funnel.consent_vor`]: "Einwilligung · Text vor dem Datenschutz-Link",
  [`${S}funnel.consent_link`]: "Einwilligung · Linktext",
  [`${S}funnel.consent_nach`]: "Einwilligung · Text nach dem Datenschutz-Link",

  [`${S}funnel.fehler_name`]: "Fehler · Name fehlt",
  [`${S}funnel.fehler_email`]: "Fehler · E-Mail ungültig",
  [`${S}funnel.fehler_telefon`]: "Fehler · Telefon fehlt",
  [`${S}funnel.fehler_consent`]: "Fehler · Einwilligung fehlt",
  [`${S}funnel.fehler_rate_limit`]: "Fehler · zu viele Anfragen (Rate-Limit)",
  [`${S}funnel.fehler_validierung`]: "Fehler · Server lehnt Eingabe ab",
  [`${S}funnel.fehler_technisch`]: "Fehler · technischer Zustellungsfehler",

  [`${S}funnel.absenden`]: "Absenden-Button · Beschriftung",
  [`${S}funnel.absenden_aktiv`]: "Absenden-Button · während des Sendens",

  [`${S}funnel.erfolg_titel`]: "Erfolg · Titel",
  [`${S}funnel.erfolg_vor`]: "Erfolg · Text vor der E-Mail-Adresse",
  [`${S}funnel.erfolg_nach`]: "Erfolg · Text nach der E-Mail-Adresse",
  [`${S}funnel.erfolg_demo_hinweis`]: "Erfolg · Hinweis auf inaktiven Mail-Versand (Vorschau)",
  [`${S}funnel.erfolg_link`]: "Erfolg · Link zu den Cases",
};
