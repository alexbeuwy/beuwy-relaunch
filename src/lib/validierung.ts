import { z } from "zod";

/**
 * Validierungs-Schicht für alle Formulare (Buchung, Kontakt, Vorquali-
 * Funnel). Portiert aus dem Riegel-Projekt, um beuwy die anfrageSchema-
 * Erweiterung ergänzt. Läuft komplett offline — kein DNS, kein Netz,
 * kein externer API-Call. Standard-Library statt handgeschriebener
 * Regex-Sammlung: zod für Schemas/Fehlermeldungen, eigene kleine Helfer
 * für E-Mail-Tippfehler, Telefonnormalisierung und Lead-Qualität, weil
 * diese drei Aufgaben keine allgemeine Library exakt so abdecken, wie
 * die Riegel-Spec es verlangt (siehe Kommentare an den Funktionen).
 */

/* ────────────────────────────────────────────────────────────────
 * Grundbausteine
 * ──────────────────────────────────────────────────────────────── */

/** Mindestens ein Buchstabe (unicodefähig), keine reine Ziffernfolge. */
function enthaeltBuchstaben(wert: string): boolean {
  return /\p{L}/u.test(wert);
}

const nameField = z
  .string()
  .trim()
  .min(2, "Bitte einen vollständigen Namen angeben.")
  .max(200, "Name ist zu lang.")
  .refine(enthaeltBuchstaben, "Name muss Buchstaben enthalten.");

/**
 * Strenge E-Mail-Prüfung von Hand statt zod .email()/z.email() — die
 * Riegel-Testfälle verlangen exakt kontrollierbares Verhalten (TLD ab
 * 2 Zeichen, keine führenden/doppelten Punkte im Local-Part, kein
 * Leerzeichen), das generische Email-Validatoren so nicht garantieren.
 */
function istGueltigeEmail(email: string): boolean {
  if (!email || /\s/.test(email)) return false;

  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || !domain) return false;

  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[A-Za-z0-9._%+-]+$/.test(local)) return false;

  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return false;
  if (domain.startsWith("-") || domain.endsWith("-")) return false;

  const labels = domain.split(".");
  if (labels.length < 2) return false; // braucht mindestens eine TLD

  const tld = labels[labels.length - 1];
  if (!/^[A-Za-z]{2,}$/.test(tld)) return false; // TLD mind. 2 Buchstaben

  for (const label of labels) {
    if (!label || !/^[A-Za-z0-9-]+$/.test(label)) return false;
    if (label.startsWith("-") || label.endsWith("-")) return false;
  }

  return true;
}

const emailField = z
  .string()
  .trim()
  .min(1, "Bitte eine E-Mail-Adresse angeben.")
  .refine(istGueltigeEmail, "Bitte eine gültige E-Mail-Adresse angeben.")
  .transform((v) => v.toLowerCase());

function ziffernZaehlen(wert: string): number {
  return (wert.match(/\d/g) ?? []).length;
}

/** Telefon optional: leer ist ok, ein befüllter Wert muss aber plausibel sein. */
const telefonOptionalField = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? telefonNormalisieren(v) : ""))
  .refine((v) => v === "" || ziffernZaehlen(v) >= 6, "Bitte eine gültige Telefonnummer angeben.");

/** Telefon Pflicht (beuwy-Vorquali-Funnel): leer wird abgewiesen. */
const telefonPflichtField = z
  .string()
  .trim()
  .transform((v) => telefonNormalisieren(v))
  .refine((v) => ziffernZaehlen(v) >= 6, "Bitte eine gültige Telefonnummer angeben.");

function istGueltigesKalenderdatum(iso: string): boolean {
  const [jahrStr, monatStr, tagStr] = iso.split("-");
  const jahr = Number(jahrStr);
  const monat = Number(monatStr);
  const tag = Number(tagStr);
  if (!jahr || !monat || !tag) return false;
  const datum = new Date(Date.UTC(jahr, monat - 1, tag));
  return (
    datum.getUTCFullYear() === jahr && datum.getUTCMonth() === monat - 1 && datum.getUTCDate() === tag
  );
}

/** Heutiges Datum als YYYY-MM-DD in der Zeitzone Europe/Berlin. */
function heuteBerlinISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

/** Datum in n Tagen (ab Europe/Berlin-heute) als YYYY-MM-DD, tagesgenau. */
function berlinDatumInNTagen(n: number): string {
  const heute = new Date(`${heuteBerlinISO()}T00:00:00Z`);
  heute.setUTCDate(heute.getUTCDate() + n);
  return heute.toISOString().slice(0, 10);
}

// Buchungsfenster: nicht in der Vergangenheit, nicht mehr als ~2 Jahre voraus.
const TERMIN_FENSTER_TAGE = 730;

const datumField = z
  .string()
  .trim()
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && istGueltigesKalenderdatum(v), "Ungültiges Datum.")
  .refine((v) => v >= heuteBerlinISO(), "Datum liegt in der Vergangenheit.")
  .refine((v) => v <= berlinDatumInNTagen(TERMIN_FENSTER_TAGE), "Datum liegt zu weit in der Zukunft.");

const uhrzeitField = z
  .string()
  .trim()
  .refine((v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v), "Ungültige Uhrzeit.");

/* ────────────────────────────────────────────────────────────────
 * Schemas (Riegel-Spec + beuwy-Erweiterung)
 * ──────────────────────────────────────────────────────────────── */

/** Allgemeines Kontaktformular: Name + E-Mail Pflicht, Telefon optional. */
export const kontaktSchema = z.object({
  name: nameField,
  email: emailField,
  phone: telefonOptionalField,
});

/** Terminbuchung: Kontakt + Datum/Uhrzeit (Europe/Berlin). */
export const terminSchema = kontaktSchema.extend({
  date: datumField,
  time: uhrzeitField,
});

/**
 * Problem-/Feedback-Meldung. In der Riegel-Spec referenziert, aber ohne
 * eigene Testfälle übergeben — Form hier bewusst minimal und an den
 * gleichen Bausteinen wie die anderen Schemas gehalten.
 */
export const reportSchema = z.object({
  name: nameField,
  email: emailField,
  betreff: z.string().trim().min(3, "Betreff zu kurz.").max(200, "Betreff zu lang."),
  beschreibung: z
    .string()
    .trim()
    .min(10, "Bitte etwas ausführlicher beschreiben.")
    .max(5000, "Beschreibung zu lang."),
});

const ROLLEN = [
  "Inhaber/Geschäftsführer eines Maklerhauses",
  "Selbstständiger Makler",
  "Etwas anderes",
] as const;
const GROESSEN = ["unter 10", "10–30", "30–100", "über 100"] as const;
const FOKUSSE = ["Marke & Auftritt", "Website & Anfragen", "E-Mail & Nachfassen", "Automatisierung/CRM"] as const;
const ZEITEN = ["So schnell wie möglich", "In den nächsten 3 Monaten", "Ich sondiere noch"] as const;

/**
 * Pflichtfeld aus freiem Text: wird getrimmt und auf `maxLaenge`
 * GEDECKELT (abgeschnitten) statt bei Überlänge abgewiesen — ein zu
 * langer/manipulierter Wert darf einen echten Lead nicht blockieren,
 * er wird nur nie unverändert durchgereicht. Nur ein wirklich leeres
 * Feld gilt als fehlende Pflichtangabe und wird abgewiesen.
 */
function gedeckelterPflichtText(maxLaenge: number, fehlermeldung: string) {
  return z
    .string()
    .transform((v) => v.trim().slice(0, maxLaenge))
    .refine((v) => v.length > 0, fehlermeldung);
}

function gedeckelterOptionalerText(maxLaenge: number) {
  return z
    .string()
    .optional()
    .transform((v) => (v ?? "").trim().slice(0, maxLaenge));
}

/**
 * beuwy-Vorquali-Funnel (/anfrage). Rolle/Größe/Zeit sind freie Strings
 * statt strikter Enums, weil der Funnel künftig weitere Optionen
 * bekommen kann, ohne dass diese Schicht mitwachsen muss — die
 * Konstanten oben dokumentieren nur die aktuell erwarteten Werte.
 * Name/E-Mail/Telefon sind Pflicht (echte Validierung, siehe oben),
 * Nachricht optional. Rolle/Größe/Fokus/Zeit/Nachricht werden bei
 * Überlänge gedeckelt statt abgewiesen (siehe gedeckelterPflichtText).
 * website ist das Honeypot-Feld (Auswertung passiert vorgelagert in
 * pruefeFormular, hier nur zur Vollständigkeit des Typs gedeckelt).
 */
export const anfrageSchema = z.object({
  rolle: gedeckelterPflichtText(200, "Bitte eine Rolle wählen."),
  groesse: gedeckelterPflichtText(50, "Bitte eine Größe wählen."),
  fokus: z
    .array(z.string())
    .transform((arr) =>
      arr
        .map((s) => s.trim().slice(0, 100))
        .filter(Boolean)
        .slice(0, FOKUSSE.length)
    )
    .refine((arr) => arr.length > 0, "Bitte mindestens einen Fokus wählen."),
  zeit: gedeckelterPflichtText(100, "Bitte einen Zeithorizont wählen."),
  name: nameField,
  email: emailField,
  phone: telefonPflichtField,
  message: gedeckelterOptionalerText(5000),
  website: gedeckelterOptionalerText(500),
});

export type KontaktDaten = z.infer<typeof kontaktSchema>;
export type TerminDaten = z.infer<typeof terminSchema>;
export type ReportDaten = z.infer<typeof reportSchema>;
export type AnfrageDaten = z.infer<typeof anfrageSchema>;

// Für Doku-/IDE-Zwecke ohne die Konstanten "unbenutzt" zu lassen.
export const ANFRAGE_OPTIONEN = { ROLLEN, GROESSEN, FOKUSSE, ZEITEN } as const;

/* ────────────────────────────────────────────────────────────────
 * pruefeFormular — der eigentliche Einstiegspunkt für Routen
 * ──────────────────────────────────────────────────────────────── */

export type FormularErgebnis<T> = { ok: true; daten: T; bot: boolean } | { ok: false; fehler: string };

/**
 * Prüft eingehende Formulardaten gegen ein zod-Schema.
 *
 * Honeypot-Regel geht der Schema-Validierung vor: ist das Feld
 * `website` befüllt, gilt die Anfrage als Bot — `ok:true, bot:true`,
 * OHNE die restlichen Felder überhaupt zu validieren. Der Bot sieht
 * eine Erfolgsseite, der Aufrufer verwirft die Mail. Nur bei leerem
 * Honeypot wird tatsächlich gegen das Schema geparst.
 */
export function pruefeFormular<T extends z.ZodTypeAny>(
  schema: T,
  daten: unknown
): FormularErgebnis<z.infer<T>> {
  const roh = daten && typeof daten === "object" ? (daten as Record<string, unknown>) : {};
  const honeypot = typeof roh.website === "string" ? roh.website.trim() : "";

  if (honeypot) {
    return { ok: true, daten: daten as z.infer<T>, bot: true };
  }

  const ergebnis = schema.safeParse(daten);
  if (!ergebnis.success) {
    const erste = ergebnis.error.issues[0];
    return { ok: false, fehler: erste?.message ?? "Validierung fehlgeschlagen." };
  }

  return { ok: true, daten: ergebnis.data, bot: false };
}

/* ────────────────────────────────────────────────────────────────
 * mailTippfehler — Vorschlag bei knappem Abstand zu großen Freemail-
 * Domains. Firmendomains dürfen NIE einen Vorschlag bekommen.
 * ──────────────────────────────────────────────────────────────── */

const FREEMAIL_DOMAINS = [
  "gmail.com",
  "web.de",
  "gmx.de",
  "gmx.net",
  "t-online.de",
  "hotmail.com",
  "outlook.de",
  "outlook.com",
  "icloud.com",
  "yahoo.de",
  "aol.com",
  "mail.de",
  "freenet.de",
  "posteo.de",
] as const;

/** Klassische Levenshtein-Distanz (Editierdistanz), ohne Abhängigkeit. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let vorherig = new Array<number>(n + 1);
  let aktuell = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) vorherig[j] = j;

  for (let i = 1; i <= m; i++) {
    aktuell[0] = i;
    for (let j = 1; j <= n; j++) {
      const kosten = a[i - 1] === b[j - 1] ? 0 : 1;
      aktuell[j] = Math.min(
        vorherig[j] + 1, // Löschen
        aktuell[j - 1] + 1, // Einfügen
        vorherig[j - 1] + kosten // Ersetzen
      );
    }
    [vorherig, aktuell] = [aktuell, vorherig];
  }
  return vorherig[n];
}

/**
 * Schlägt eine korrigierte Domain vor, wenn die E-Mail-Domain sehr nah
 * an einer bekannten großen Freemail-Domain liegt (Tippfehler), aber
 * nicht exakt trifft. Die Schwelle skaliert mit der Domain-Länge —
 * kurze Domains (z. B. "web.de", 6 Zeichen) brauchen einen engeren
 * Schwellenwert (1), sonst würden echte kurze Fremd-Domains wie
 * "web.at" fälschlich auf "web.de" gemappt. Das ist die wichtigste
 * Regel dieser Funktion: echte Firmendomains bekommen NIE einen
 * Vorschlag, weil ihr Abstand zu jeder Freemail-Domain die Schwelle
 * praktisch immer überschreitet.
 */
export function mailTippfehler(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1).trim().toLowerCase();
  if (!domain) return null;

  if ((FREEMAIL_DOMAINS as readonly string[]).includes(domain)) return null;

  let beste: { domain: string; distanz: number } | null = null;
  for (const kandidat of FREEMAIL_DOMAINS) {
    const distanz = levenshtein(domain, kandidat);
    if (!beste || distanz < beste.distanz) beste = { domain: kandidat, distanz };
  }
  if (!beste || beste.distanz === 0) return null;

  const schwelle = beste.domain.length <= 6 ? 1 : 2;
  if (beste.distanz > schwelle) return null;

  return `${local}@${beste.domain}`;
}

/* ────────────────────────────────────────────────────────────────
 * telefonNormalisieren — E.164-nah für DE/AT/CH
 * ──────────────────────────────────────────────────────────────── */

function nurZiffern(s: string): string {
  return s.replace(/\D/g, "");
}

/**
 * Normalisiert deutsche/österreichische/schweizer Telefonnummern in
 * eine E.164-nahe Form. Bewusst eine eigene, kleine Implementierung
 * statt libphonenumber-js: die Riegel-Testfälle verlangen einen exakt
 * definierten Sonderfall — eine Durchwahl nach einem Bindestrich bleibt
 * als literaler Suffix erhalten ("+49 (0)621 520088-00" →
 * "+49621520088-00") — das ist kein gültiges E.164 und keine
 * allgemeine Library bildet das so ab. Deshalb hier von Hand, exakt
 * an den vorgegebenen Testfällen gebaut.
 */
export function telefonNormalisieren(roh: string): string {
  const eingabe = (roh ?? "").trim();
  if (!eingabe) return "";

  // Durchwahl am Ende abtrennen ("...520088-00" → Hauptteil + "00").
  const durchwahlMatch = eingabe.match(/^(.*\d)\s*-\s*(\d+)\s*$/);
  const hauptteil = durchwahlMatch ? durchwahlMatch[1] : eingabe;
  const durchwahl = durchwahlMatch ? durchwahlMatch[2] : "";

  let ziffern: string;
  const vorwahlLaenge = 2; // DE/AT/CH-Landesvorwahlen sind zweistellig (49/43/41)

  if (hauptteil.startsWith("+")) {
    ziffern = nurZiffern(hauptteil);
  } else if (hauptteil.replace(/\s/g, "").startsWith("00")) {
    ziffern = nurZiffern(hauptteil).slice(2);
  } else if (hauptteil.trim().startsWith("0")) {
    // Nationale Schreibweise ohne Ländervorwahl → Deutschland annehmen.
    ziffern = "49" + nurZiffern(hauptteil).replace(/^0/, "");
  } else {
    // Unbekanntes Format: keine Landesvorwahl annehmen, nur Ziffern behalten.
    return nurZiffern(hauptteil);
  }

  const landesvorwahl = ziffern.slice(0, vorwahlLaenge);
  let rest = ziffern.slice(vorwahlLaenge);
  // Trunk-Null direkt nach der Landesvorwahl entfernen: "+49 (0)621" → "+49621".
  if (rest.startsWith("0")) rest = rest.slice(1);

  const ergebnis = `+${landesvorwahl}${rest}`;
  return durchwahl ? `${ergebnis}-${durchwahl}` : ergebnis;
}

/* ────────────────────────────────────────────────────────────────
 * leadQualitaet — reine Anzeige, blockiert nie
 * ──────────────────────────────────────────────────────────────── */

const PLATZHALTER_NAMEN = new Set([
  "max mustermann",
  "erika mustermann",
  "test test",
  "hallo hallo",
  "asdf asdf",
  "xxx xxx",
  "vorname nachname",
  "keine angabe",
  "foo bar",
]);

const PLATZHALTER_TOKEN = new Set([
  "asdf",
  "test",
  "xxx",
  "qwerty",
  "asd",
  "foo",
  "bar",
  "dummy",
  "mustermann",
  "musterfrau",
  "hallo",
]);

const WEGWERF_MUSTER = ["mailinator", "guerrillamail", "10minutemail", "trashmail", "yopmail", "temp-mail"];

export interface LeadQualitaetEingabe {
  name?: string;
  email?: string;
  telefon?: string;
  /**
   * Domain-Status, vom Aufrufer selbst ermittelt (z. B. MX-Check).
   * Diese Funktion macht KEIN eigenes DNS-Lookup — offline-fähig.
   * "ok" (oder leer/undefined) = unauffällig, jeder andere Wert wird
   * als Hinweis auf eine nicht erreichbare Domain gewertet.
   */
  domain?: string;
}

export interface LeadQualitaetErgebnis {
  punkte: number;
  hinweise: string[];
}

function normalisiereNamensTeile(name: string): string[] {
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

/** Rein informativ — dient nie als Blockade, nur als Hinweis für den Menschen. */
export function leadQualitaet(eingabe: LeadQualitaetEingabe): LeadQualitaetErgebnis {
  const hinweise: string[] = [];
  let punkte = 100;

  const name = (eingabe.name ?? "").trim();
  if (name) {
    const teile = normalisiereNamensTeile(name);

    const hatIdentischeTeile = teile.length >= 2 && new Set(teile).size < teile.length;
    if (hatIdentischeTeile) {
      hinweise.push("Name enthält identische Namensteile.");
      punkte -= 15;
    }

    const istBekannterPlatzhalter = PLATZHALTER_NAMEN.has(teile.join(" "));
    const alleTeileSindPlatzhalter = teile.length > 0 && teile.every((t) => PLATZHALTER_TOKEN.has(t));
    if (istBekannterPlatzhalter || alleTeileSindPlatzhalter) {
      hinweise.push("Platzhalter-Name erkannt.");
      punkte -= 35;
    }
  }

  const email = (eingabe.email ?? "").trim().toLowerCase();
  if (email) {
    const domainTeil = email.slice(email.lastIndexOf("@") + 1);
    if (domainTeil && WEGWERF_MUSTER.some((m) => domainTeil.includes(m))) {
      hinweise.push("Wegwerf-Adresse erkannt.");
      punkte -= 40;
    }
  }

  const domain = (eingabe.domain ?? "").trim().toLowerCase();
  if (domain && domain !== "ok") {
    hinweise.push("Domain existiert nicht oder ist nicht erreichbar.");
    punkte -= 40;
  }

  punkte = Math.max(0, Math.min(100, punkte));
  return { punkte, hinweise };
}
