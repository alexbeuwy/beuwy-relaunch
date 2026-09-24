import type { AnfrageFunnelTexte } from "@/components/AnfrageFunnel";
import { seitenTexte } from "./lesen";

/**
 * Funnel-Texte aus den Studio-Keys s.anfrage.funnel.* — gemeinsam genutzt
 * von /anfrage und vom Stadt-Check auf /system, damit Studio-Änderungen
 * am Funnel auf beiden Seiten gleich ankommen.
 */
export function funnelTexteAus(c: Record<string, string>): AnfrageFunnelTexte {
  const t = seitenTexte(c, "anfrage");
  return {
    fortschrittVor: t("funnel.fortschritt_vor"),
    fortschrittMitte: t("funnel.fortschritt_mitte"),
    zurueck: t("funnel.zurueck"),
    schritt1Titel: t("funnel.schritt1_titel"),
    rollen: t.liste("funnel.rolle", ["label"] as const).map((e) => e.label),
    schritt2Titel: t("funnel.schritt2_titel"),
    groessen: t.liste("funnel.groesse", ["label"] as const).map((e) => e.label),
    schritt3Titel: t("funnel.schritt3_titel"),
    schritt3Hinweis: t("funnel.schritt3_hinweis"),
    fokusse: t.liste("funnel.fokus", ["label"] as const).map((e) => e.label),
    weiter: t("funnel.weiter"),
    schritt4Titel: t("funnel.schritt4_titel"),
    zeiten: t.liste("funnel.zeit", ["label"] as const).map((e) => e.label),
    schritt5TitelSondiert: t("funnel.schritt5_titel_sondiert"), // studio:ok
    schritt5TitelStandard: t("funnel.schritt5_titel_standard"), // studio:ok
    schritt5TextSondiert: t("funnel.schritt5_text_sondiert"), // studio:ok
    schritt5TextStandard: t("funnel.schritt5_text_standard"), // studio:ok
    feldNameLabel: t("funnel.feld_name_label"),
    feldNamePlatzhalter: t("funnel.feld_name_platzhalter"), // studio:ok
    feldEmailLabel: t("funnel.feld_email_label"),
    feldEmailPlatzhalter: t("funnel.feld_email_platzhalter"), // studio:ok
    feldTelefonLabel: t("funnel.feld_telefon_label"), // studio:ok
    feldTelefonPlatzhalter: t("funnel.feld_telefon_platzhalter"), // studio:ok
    feldNachrichtLabel: t("funnel.feld_nachricht_label"), // studio:ok
    feldNachrichtPlatzhalter: t("funnel.feld_nachricht_platzhalter"), // studio:ok
    pflichtfeld: t("funnel.pflichtfeld"),
    consentVor: t("funnel.consent_vor"),
    consentLink: t("funnel.consent_link"),
    consentNach: t("funnel.consent_nach"),
    fehlerName: t("funnel.fehler_name"),
    fehlerEmail: t("funnel.fehler_email"),
    fehlerTelefon: t("funnel.fehler_telefon"),
    fehlerConsent: t("funnel.fehler_consent"),
    fehlerRateLimit: t("funnel.fehler_rate_limit"), // studio:ok
    fehlerValidierung: t("funnel.fehler_validierung"),
    fehlerTechnisch: t("funnel.fehler_technisch"),
    absenden: t("funnel.absenden"),
    absendenAktiv: t("funnel.absenden_aktiv"),
    erfolgTitel: t("funnel.erfolg_titel"),
    erfolgVor: t("funnel.erfolg_vor"),
    erfolgNach: t("funnel.erfolg_nach"),
    erfolgDemoHinweis: t("funnel.erfolg_demo_hinweis"), // studio:ok
    erfolgLink: t("funnel.erfolg_link"),
  };
}
