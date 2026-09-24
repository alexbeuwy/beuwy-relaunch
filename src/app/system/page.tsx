import type { Metadata } from "next";
import Link from "next/link";
import { ExitIntent } from "@/components/ExitIntent";
import { Logo } from "@/components/Logo";
import { LogoSlot, MARKEN_SLUGS, slugifyMarke } from "@/components/MaklerElemente";
import { rich } from "@/components/RichText";
import { StadtCheck, StadtKnopf, StickyStadt } from "@/components/StadtCheck";
import { SystemFilm } from "@/components/SystemFilm";
import { VslSlot } from "@/components/VslSlot";
import { getContent } from "@/lib/content";
import { funnelTexteAus } from "@/lib/texte/anfrage-funnel";

export const revalidate = 60;

/**
 * /system — die VSL-Landingpage (18.09, umbenannt von /vsl am 23.09).
 * Minimal, ein Ziel: Das Video überzeugt, der Stadt-Check ist der eine
 * große Knopf. Aufbau: Logo → Zielgruppe → Headline → Video → Stadt-Check
 * (erste Frage auf der Seite, danach der Funnel inline) → Vertrauensleiste
 * + Logos → Schluss-Knopf → Mini-Fuß. Dazu Sticky-Leiste (mobil) und
 * Exit-Intent (Desktop + mobil) mit der Video-Analyse. Recherche und
 * Begründung: docs/redesign/SYSTEM-SEITE.md.
 * Alle Texte: Studio-Keys mk.vsl.front_* (src/lib/texte/vsl.ts) — die
 * Keys heißen bewusst weiter „vsl", damit bestehende Supabase-Overrides
 * erhalten bleiben. Die Blöcke der Sales-Kette (Bausteine, Preis,
 * Einwände …) sind nur noch im Video; ihre Keys bleiben für später.
 */

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const titel = c["mk.vsl.front_meta_titel"];
  const beschreibung = c["mk.vsl.front_meta_beschreibung"];
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: "/system" },
    openGraph: { title: titel, description: beschreibung, type: "website", locale: "de_DE" },
  };
}

const LOGO_HOEHEN: Record<string, number> = {
  infocient: 30, instaffo: 30, prefin: 30, "trec-careers": 26, invyse: 26, "gooodkid-records": 26, "vision-group": 30, acta: 24,
};

function paare(roh: string | undefined): Array<{ a: string; b: string }> {
  return (roh ?? "")
    .split("|")
    .map((teil) => {
      const [a, b] = teil.split("~");
      return { a: a?.trim() ?? "", b: b?.trim() ?? "" };
    })
    .filter((p) => p.a);
}

export default async function VslPage() {
  const c = await getContent();
  const t = (k: string) => c[`mk.vsl.front_${k}`] ?? "";
  const logos = t("logos").split("|").map((n) => n.trim()).filter(Boolean);
  const vertrauen = paare(t("vertrauen"));
  const vergeben = t("stadt_vergeben").split("|").map((n) => n.trim()).filter(Boolean);
  const stadtTexte = {
    label: t("stadt_label"),
    platzhalter: t("stadt_platzhalter"),
    cta: t("stadt_cta"),
    hinweis: t("stadt_hinweis"),
    leer: t("stadt_leer"),
    frei: t("stadt_frei"),
    vergebenTitel: t("stadt_vergeben_titel"),
    vergebenText: t("stadt_vergeben_text"),
    vergebenCta: t("stadt_vergeben_cta"),
    neu: t("stadt_neu"),
  };

  return (
    <div className="relative min-h-dvh bg-bg-base">
      <header className="mx-auto flex max-w-[1080px] justify-center px-6 pt-8 lg:pt-10">
        <Logo height={30} statisch />
      </header>

      {/* 1 · Hook, Video, der eine Knopf (Stadt-Check) */}
      <section className="mx-auto max-w-[960px] px-6 pt-12 text-center lg:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full bg-akzent-wash px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-cream">
          <span className="h-1.5 w-1.5 rounded-full bg-akzent-hover" aria-hidden />
          {t("eyebrow")}
        </p>
        <h1 className="t-display mx-auto mt-6 max-w-[20ch]">{rich(t("titel"))}</h1>
        <p className="t-body-lg mx-auto mt-5 max-w-[38rem]">{t("sub")}</p>
        <div className="mt-10 lg:mt-12">
          {c["mk.vsl.system_url"] ? (
            <SystemFilm
              videoUrl={c["mk.vsl.system_url"]}
              posterUrl={c["mk.vsl.system_poster"] || undefined}
              texte={{
                ton: c["mk.vsl.system_ton"],
                pause: c["mk.vsl.system_pause"],
                weiter: c["mk.vsl.system_weiter"],
              }}
            />
          ) : (
            <VslSlot format="breit" videoUrl={c["mk.vsl.url"]} platzhalterText={c["mk.vsl.platzhalter"]} />
          )}
        </div>
        <div className="mt-10 lg:mt-12">
          <StadtCheck texte={stadtTexte} vergeben={vergeben} funnelTexte={funnelTexteAus(c)} />
        </div>
      </section>

      {/* 2 · Beweis in einer Zeile + Logos */}
      <section className="mx-auto max-w-[1080px] px-6 text-center">
        {vertrauen.length > 0 && (
          <dl className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 gap-6 border-t border-line-subtle pt-8 sm:grid-cols-3 lg:mt-20">
            {vertrauen.map((v) => (
              <div key={v.a}>
                <dt className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">{v.a}</dt>
                <dd className="t-small mx-auto mt-2 max-w-[24ch]">{v.b}</dd>
              </div>
            ))}
          </dl>
        )}
        {logos.length > 0 && (
          <div className="mt-14">
            <p className="t-label !text-[10.5px]">{t("logos_label")}</p>
            <div className="mx-auto mt-6 flex max-w-[960px] flex-wrap items-center justify-center gap-x-9 gap-y-5 lg:gap-x-12">
              {logos.map((name) => {
                const slug = MARKEN_SLUGS[name] ?? slugifyMarke(name);
                return <LogoSlot key={name} name={name} slug={slug} hoehe={LOGO_HOEHEN[slug] ?? 20} />;
              })}
            </div>
          </div>
        )}
      </section>

      {/* 3 · Schluss: derselbe Knopf noch einmal */}
      <section id="schluss-cta" className="mx-auto mt-24 max-w-[720px] px-6 text-center lg:mt-32">
        <h2 className="t-h2">{rich(t("schluss_titel"))}</h2>
        <div className="mt-8">
          <StadtKnopf text={t("schluss_cta")} />
        </div>
        <p className="t-small mt-4">{t("stadt_hinweis")}</p>
      </section>

      <footer className="mx-auto mt-20 max-w-[1080px] px-6 pb-28 lg:mt-28 lg:pb-10">
        <div className="flex flex-col items-center gap-4 border-t border-line-subtle pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Logo height={16} />
            <span className="t-small">{t("fuss")}</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Rechtliches">
            <FussLink href="/">{t("mehr")}</FussLink>
            <FussLink href="/impressum">Impressum</FussLink>
            <FussLink href="/datenschutz">Datenschutz</FussLink>
          </nav>
        </div>
      </footer>

      <StickyStadt text={t("sticky_text")} cta={t("sticky_cta")} />
      <ExitIntent href="/video-analyse" titel={t("exit_titel")} text={t("exit_text")} cta={t("exit_cta")} weiter={t("exit_weiter")} />
    </div>
  );
}

function FussLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[13px] font-medium text-ink-muted transition-colors duration-[var(--duration-quick)] hover:text-ink-cream">
      {children}
    </Link>
  );
}
