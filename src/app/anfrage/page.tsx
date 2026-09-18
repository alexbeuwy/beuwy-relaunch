import type { Metadata } from "next";
import Image from "next/image";
import { AnfrageFunnel } from "@/components/AnfrageFunnel";
import { AiPille } from "@/components/AiPille";
import { GelbeKarte } from "@/components/MaklerElemente";
import { maklerAsset } from "@/lib/cdn";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

/**
 * /anfrage — der Vorquali-Funnel, das Konversionsziel der ganzen Seite
 * (GOAL). noindex: kein Ranking-Ziel, nur Ziel jedes CTAs im System.
 * Zweispaltig im Hero-Systemstil (REFERENZ-ANALYSE.md): links der
 * Funnel, rechts Foto 12 randlos als Seiten-Plate mit AiPille + Gelbe-
 * Karte-Überlappung — Layout bewusst am Muster von MaklerHero.tsx
 * gespiegelt (Media bleedet an mind. zwei Viewport-Ränder), aber eine
 * eigene Datei, weil MaklerHero.tsx nicht verändert werden darf.
 *
 * R11: alle Texte laufen über Studio-Keys s.anfrage.* (src/lib/texte/
 * seiten/anfrage.ts) — Struktur/Layout bleiben hier im Code.
 */

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "anfrage");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
    robots: { index: false, follow: false },
  };
}

export default async function AnfragePage() {
  const c = await getContent();
  const t = seitenTexte(c, "anfrage");
  const funnelTexte = {
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

  return (
    <div className="relative bg-bg-base">
      {/* Mobile: kompakte Bild-Bühne oben, Funnel folgt direkt darunter */}
      <div className="relative aspect-[4/5] w-full overflow-hidden lg:hidden">
        <Image
          src={maklerAsset(12)}
          alt="Kampagnenfoto: eine Maklerin bespricht einen Grundriss am Tresen"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 22%" }}
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-base to-transparent" />
        <AiPille className="!bottom-auto !top-4" />
        <GelbeKarte
          label={t("hero.karte_label")}
          titel={t("hero.karte_titel")}
          className="absolute inset-x-4 bottom-4 !px-5 !py-5"
        >
          {t("hero.karte_text")}
        </GelbeKarte>
      </div>

      <div className="relative lg:min-h-[calc(100dvh-4rem)]">
        {/* Bildspalte: randlos, läuft an den rechten, oberen und unteren
            Viewport-Rand (Muster von MaklerHero.tsx, hier eigenständig // studio:ok
            nachgebaut). Äußerer Layer positioniert + höht sich über die
            Spalte, innerer Layer trägt das Rounding + den Bild-Clip, damit // studio:ok
            die GelbeKarte im äußeren Layer über die linke Bildkante
            hinausragen kann, statt am Clip abgeschnitten zu werden. */}
        <div className="relative hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:h-full lg:w-[44vw]">
          <div className="relative h-full w-full overflow-hidden lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(12)}
              alt="Kampagnenfoto: eine Maklerin bespricht einen Grundriss am Tresen"
              fill
              sizes="44vw"
              className="object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-bg-base to-transparent" />
            <AiPille className="!bottom-auto !top-4" />
          </div>

          <GelbeKarte
            label={t("hero.karte_label")}
            titel={t("hero.karte_titel")}
            glyph
            className="absolute -left-12 bottom-16 z-10 max-w-[280px] shadow-[0_1px_2px_rgba(20,20,18,0.06)]"
          >
            {t("hero.karte_text")}
          </GelbeKarte>
        </div>

        {/* Textspalte / Funnel */}
        <div className="relative z-20 px-6 pb-24 pt-10 lg:w-[56vw] lg:pl-[max(24px,calc((100vw-1360px)/2))] lg:pr-16 lg:pt-32 lg:pb-24">
          <p className="t-label !text-ink-yellow">{t("hero.eyebrow")}</p>
          <h1 className="mt-5 max-w-[520px] font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink-cream [text-wrap:balance]">
            {t("hero.titel")}
          </h1>
          <p className="t-body-lg mt-4 max-w-[440px]">{t("hero.sub")}</p>

          <div className="mt-10">
            <AnfrageFunnel texte={funnelTexte} />
          </div>
        </div>
      </div>
    </div>
  );
}
