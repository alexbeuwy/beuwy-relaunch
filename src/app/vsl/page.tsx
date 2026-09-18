import type { Metadata } from "next";
import Link from "next/link";
import { ExitIntent } from "@/components/ExitIntent";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Logo } from "@/components/Logo";
import { LogoSlot, MARKEN_SLUGS, slugifyMarke } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/RichText";
import { VslSlot } from "@/components/VslSlot";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/**
 * /vsl — die VSL-Landingpage (18.09): clean, reduziert, Sales-Kette.
 * Hook → Video → ein Knopf → Vertrauensleiste → Der eine Grund →
 * Das System (sechs Bausteine) → Beweis → Vorsprung → Für wen →
 * drei Einwände → Nächste Schritte → Knopf. Exit-Intent einmal pro
 * Sitzung (Desktop). Kein Menü, Mini-Fuß. Alle Texte: Studio-Keys
 * mk.vsl.front_* (src/lib/texte/vsl.ts), Studio-Overrides gewinnen.
 */

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const titel = c["mk.vsl.front_meta_titel"];
  const beschreibung = c["mk.vsl.front_meta_beschreibung"];
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: "/vsl" },
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
  const belege = paare(t("beleg"));
  const schritte = [1, 2, 3].map((i) => paare(t(`schritte_${i}`))[0]).filter(Boolean);
  const bausteine = [1, 2, 3, 4, 5, 6].map((i) => ({ nr: String(i).padStart(2, "0"), titel: t(`system_${i}_titel`), text: t(`system_${i}_text`) })).filter((b) => b.titel);
  const einwaende = [1, 2, 3].map((i) => ({ q: t(`einwand_${i}_frage`), a: t(`einwand_${i}_antwort`) })).filter((e) => e.q);
  const ja = [1, 2, 3].map((i) => t(`wen_ja_${i}`)).filter(Boolean);
  const nein = [1, 2, 3].map((i) => t(`wen_nein_${i}`)).filter(Boolean);

  return (
    <div className="relative min-h-dvh bg-bg-base">
      <header className="mx-auto flex max-w-[1080px] justify-center px-6 pt-8 lg:pt-10">
        <Logo height={30} statisch />
      </header>

      {/* 1 · Hook, Video, ein Knopf */}
      <section className="mx-auto max-w-[960px] px-6 pt-12 text-center lg:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full bg-akzent-wash px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-cream">
          <span className="h-1.5 w-1.5 rounded-full bg-akzent-hover" aria-hidden />
          {t("eyebrow")}
        </p>
        <h1 className="t-display mx-auto mt-6 max-w-[20ch]">{rich(t("titel"))}</h1>
        <p className="t-body-lg mx-auto mt-5 max-w-[38rem]">{t("sub")}</p>
        <div className="mt-10 lg:mt-12">
          <VslSlot format="breit" videoUrl={c["mk.vsl.url"]} platzhalterText={c["mk.vsl.platzhalter"]} />
        </div>
        <CtaKnopf text={t("cta")} hinweis={t("cta_hinweis")} className="mt-9 lg:mt-11" />
        {vertrauen.length > 0 && (
          <dl className="mx-auto mt-14 grid max-w-[880px] grid-cols-1 gap-6 border-t border-line-subtle pt-8 sm:grid-cols-3 lg:mt-16">
            {vertrauen.map((v) => (
              <div key={v.a}>
                <dt className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">{v.a}</dt>
                <dd className="t-small mx-auto mt-2 max-w-[24ch]">{v.b}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* 2 · Der eine Grund */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[680px] px-6 text-center lg:mt-32">
          <p className="t-label">{t("grund_eyebrow")}</p>
          <h2 className="t-h2 mt-4">{rich(t("grund_titel"))}</h2>
          <p className="t-body-lg mt-5">{t("grund_text")}</p>
          <p className="t-body-lg mt-4">{t("grund_text2")}</p>
        </section>
      </Reveal>

      {/* 3 · Das System: sechs Bausteine */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[1080px] px-6 lg:mt-32">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="t-label">{t("system_eyebrow")}</p>
            <h2 className="t-h2 mt-4">{rich(t("system_titel"))}</h2>
            <p className="t-body-lg mt-5">{t("system_sub")}</p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bausteine.map((b) => (
              <li key={b.nr} className="rounded-[24px] border border-line-subtle bg-bg-base p-6 text-left transition-[border-color] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:border-line-medium">
                <p className="t-data !text-ink-dim tnum">{b.nr}</p>
                <h3 className="t-h3 mt-3">{b.titel}</h3>
                <p className="t-body mt-2">{b.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* 4 · Beweis auf Pastellgelb + Logos */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[1080px] px-6 lg:mt-32">
          <div className="rounded-[32px] bg-akzent-wash px-7 py-10 text-center sm:px-12 sm:py-14">
            <p className="t-label !text-ink-cream/70">{t("beweis_eyebrow")}</p>
            <h2 className="t-h2 mx-auto mt-4 max-w-[22ch]">{rich(t("beweis_titel"))}</h2>
            {belege.length > 0 && (
              <dl className="mx-auto mt-9 grid max-w-[820px] grid-cols-1 gap-7 sm:grid-cols-3">
                {belege.map((b) => (
                  <div key={b.a}>
                    <dt className="font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum sm:text-[44px]">{b.a}</dt>
                    <dd className="t-small mx-auto mt-2 max-w-[20ch] !text-ink-cream/80">{b.b}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="t-body-lg mt-8 !text-ink-cream">{t("beweis_text")}</p>
          </div>
          {logos.length > 0 && (
            <div className="mt-10 text-center">
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
      </Reveal>

      {/* 5 · Vorsprung */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[680px] px-6 text-center lg:mt-32">
          <p className="t-label">{t("vorsprung_eyebrow")}</p>
          <h2 className="t-h2 mt-4">{rich(t("vorsprung_titel"))}</h2>
          <p className="t-body-lg mt-5">{t("vorsprung_text")}</p>
        </section>
      </Reveal>

      {/* 6 · Für wen / nicht für wen */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[880px] px-6 lg:mt-32">
          <h2 className="t-h2 text-center">{rich(t("wen_titel"))}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-akzent bg-akzent-wash/60 p-6 sm:p-7">
              <p className="t-label">{t("wen_ja_label")}</p>
              <ul className="mt-4 space-y-3">
                {ja.map((z) => (
                  <li key={z} className="t-body flex gap-3 !text-ink-cream">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-akzent-hover" aria-hidden />
                    {z}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-line-subtle p-6 sm:p-7">
              <p className="t-label">{t("wen_nein_label")}</p>
              <ul className="mt-4 space-y-3">
                {nein.map((z) => (
                  <li key={z} className="t-body flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-line-medium" aria-hidden />
                    {z}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 7 · Drei Einwände */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[720px] px-6 lg:mt-32">
          <h2 className="t-h2 text-center">{rich(t("einwand_titel"))}</h2>
          <div className="mt-8">
            <FaqAccordion items={einwaende} />
          </div>
        </section>
      </Reveal>

      {/* 8 · Nächste Schritte + Knopf */}
      <Reveal>
        <section className="mx-auto mt-24 max-w-[880px] px-6 text-center lg:mt-32">
          <h2 className="t-h2">{rich(t("schritte_titel"))}</h2>
          {schritte.length > 0 && (
            <ol className="mx-auto mt-10 grid max-w-[820px] grid-cols-1 gap-6 sm:grid-cols-3">
              {schritte.map((s, i) => (
                <li key={s.a} className="text-center">
                  <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-akzent font-display text-[15px] font-bold text-ink-cream tnum">{i + 1}</span>
                  <p className="t-h3 mt-3">{s.a}</p>
                  <p className="t-body mt-1">{s.b}</p>
                </li>
              ))}
            </ol>
          )}
          <CtaKnopf text={t("cta")} hinweis={t("cta_hinweis")} className="mt-12" />
        </section>
      </Reveal>

      <footer className="mx-auto mt-20 max-w-[1080px] px-6 pb-10 lg:mt-28">
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

      <ExitIntent titel={t("exit_titel")} text={t("exit_text")} cta={t("exit_cta")} weiter={t("exit_weiter")} />
    </div>
  );
}

function CtaKnopf({ text, hinweis, className = "" }: { text: string; hinweis: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Link
        href="/anfrage"
        className="group inline-flex items-center gap-3 rounded-full bg-akzent px-9 py-4 text-[16px] font-semibold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
      >
        {text}
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" aria-hidden>
          <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="t-small">{hinweis}</p>
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
