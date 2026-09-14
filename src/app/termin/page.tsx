import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingTool, type BookingToolTexte } from "@/components/BookingTool";
import { GRUENDER_FOTO } from "@/lib/cdn";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "termin");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

/* Aufbau nach dem Seiten-System: Hinweis-Kopf (empfohlener Weg /anfrage)
   → Kopf (Wert des Gesprächs) → wo Aufträge verloren gehen (Pain-Recap)
   → was im Gespräch passiert (nimmt die Angst vorm getarnten Pitch) →
   Direktbuchung. Die Vorqualifizierung ersetzt die Direktbuchung nicht — // studio:ok
   sie bleibt darunter voll funktionsfähig, BookingTool unangetastet.

   R11: alle Texte laufen über Studio-Keys s.termin.* (src/lib/texte/ // studio:ok
   seiten/termin.ts) — Struktur/Layout bleiben hier im Code. */
export default async function TerminPage() {
  const c = await getContent();
  const t = seitenTexte(c, "termin");
  const loss = t.liste("verlust", ["text"] as const).map((e) => e.text);
  const flow = t.liste("ablauf", ["text"] as const).map((e) => e.text);
  const buchungTexte: BookingToolTexte = {
    railMarke: t("buchung.rail_marke"),
    railUntertitel: t("buchung.rail_untertitel"),
    railDatumPlatzhalter: t("buchung.rail_datum_platzhalter"), // studio:ok
    railUhrzeitPlatzhalter: t("buchung.rail_uhrzeit_platzhalter"), // studio:ok
    minutenSuffix: t("buchung.minuten_suffix"),
    disclaimer: t("buchung.disclaimer"),
    frageAnlass: t("buchung.frage_anlass"),
    anlaesse: t.liste("buchung.anlass", ["label", "sub"] as const),
    frageArt: t("buchung.frage_art"),
    arten: t.liste("buchung.art", ["label", "sub"] as const),
    frageTag: t("buchung.frage_tag"),
    morgenHinweis: t("buchung.morgen_hinweis"),
    frageUhrzeit: t("buchung.frage_uhrzeit"),
    vormittag: t("buchung.vormittag"),
    nachmittag: t("buchung.nachmittag"),
    frageKontakt: t("buchung.frage_kontakt"),
    feldNamePlatzhalter: t("buchung.feld_name_platzhalter"), // studio:ok
    feldEmailPlatzhalter: t("buchung.feld_email_platzhalter"), // studio:ok
    feldTelefonPflicht: t("buchung.feld_telefon_pflicht"), // studio:ok
    feldTelefonOptional: t("buchung.feld_telefon_optional"), // studio:ok
    feldNachrichtPlatzhalter: t("buchung.feld_nachricht_platzhalter"), // studio:ok
    domainVorschlagVor: t("buchung.domain_vorschlag_vor"), // studio:ok
    domainVorschlagNach: t("buchung.domain_vorschlag_nach"), // studio:ok
    consentVor: t("buchung.consent_vor"),
    consentLink: t("buchung.consent_link"),
    consentNach: t("buchung.consent_nach"),
    fehlerDatum: t("buchung.fehler_datum"),
    fehlerName: t("buchung.fehler_name"),
    fehlerEmail: t("buchung.fehler_email"),
    fehlerTelefon: t("buchung.fehler_telefon"),
    fehlerConsent: t("buchung.fehler_consent"),
    fehlerTechnisch: t("buchung.fehler_technisch"),
    absenden: t("buchung.absenden"),
    absendenAktiv: t("buchung.absenden_aktiv"),
    erfolgTitel: t("buchung.erfolg_titel"),
    erfolgVor: t("buchung.erfolg_vor"),
    erfolgNameFallback: t("buchung.erfolg_name_fallback"), // studio:ok
    erfolgMitte: t("buchung.erfolg_mitte"),
    erfolgNach: t("buchung.erfolg_nach"),
    erfolgDemoHinweis: t("buchung.erfolg_demo_hinweis"), // studio:ok
    summaryAnlass: t("buchung.summary_anlass"),
    summaryDatum: t("buchung.summary_datum"),
    summaryUhrzeit: t("buchung.summary_uhrzeit"),
    summaryArt: t("buchung.summary_art"),
    uhrSuffix: t("buchung.uhr_suffix"),
    minSuffix: t("buchung.min_suffix"),
    icsButton: t("buchung.ics_button"),
    gcalButton: t("buchung.gcal_button"),
    startseiteButton: t("buchung.startseite_button"),
  };

  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-24">
      {/* ── Schlanker Hinweis-Kopf: empfohlener Weg ist /anfrage ─────── */}
      <div className="mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-line-subtle pb-8 max-w-[860px]">
        <span className="t-label !text-ink-yellow shrink-0">{t("hinweis.label")}</span>
        <p className="t-small">
          {t("hinweis.vor")}{" "}
          <Link
            href="/anfrage"
            className="font-medium text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:text-ink-yellow"
          >
            /anfrage
          </Link>{" "}
          {t("hinweis.nach")}
        </p>
      </div>

      <div className="max-w-[720px]">
        <h1 className="t-display">{t("hero.titel")}</h1>
        {/* Echtes Gründerporträt (kein KI-Bild, deshalb ohne AiPille) —
            das Gespräch führt er selbst, das Foto löst das Versprechen ein. */}
        <div className="mt-6 flex items-center gap-4">
          <Image
            src={GRUENDER_FOTO}
            alt="Alexander Pütter, Gründer von beuwy"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full border border-line-subtle object-cover"
          />
          <p className="t-body-lg max-w-[500px]">{t("hero.intro")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-12 max-w-[960px]">
        <div>
          <p className="t-label">{t("verlust.label")}</p>
          <ul className="mt-5 space-y-4">
            {loss.map((l) => (
              <li key={l} className="t-body is-cream border-l-2 border-ink-yellow pl-4">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="t-label">{t("ablauf.label")}</p>
          <ol className="mt-5 space-y-4">
            {flow.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4">
                <span className="tnum t-data text-ink-yellow w-5 shrink-0">{i + 1}</span>
                <span className="t-body is-cream">{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="t-small mt-10 max-w-[720px] border-t border-line-subtle pt-6">
        {t("fazit.text")}
      </p>

      <div className="mt-14">
        <BookingTool texte={buchungTexte} />
      </div>
    </div>
  );
}
