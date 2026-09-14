import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LogoSlot, MARKEN_SLUGS, slugifyMarke } from "@/components/MaklerElemente";
import { rich } from "@/components/RichText";
import { VslSlot } from "@/components/VslSlot";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/**
 * /vsl — die schlanke Frontseite (Alex, 14.09): ein Claim, ein Video,
 * ein Knopf, echte Kundenlogos. Kein Menü, kein Footer-Sitemap — nur
 * ein Mini-Rahmen (Logo oben, Impressum/Datenschutz unten), damit
 * nichts vom Video und vom einen CTA wegführt. Gleiche Farbwelt wie die
 * Startseite: Weiß, Tinte, Pastellgelb als einziger Akzent. Alle Texte
 * über Studio-Keys mk.vsl.front_* (src/lib/texte/vsl.ts).
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

/* Optischer Größenausgleich: kompakte, gestapelte Lockups (Wort +
   Claim, Icon + kurzes Wort) brauchen mehr Höhe als lange Wortmarken,
   sonst wirken sie winzig neben hzo oder Königswege. */
const LOGO_HOEHEN: Record<string, number> = {
  infocient: 30,
  instaffo: 30,
  prefin: 30,
  "trec-careers": 26,
  invyse: 26,
  "gooodkid-records": 26,
  "vision-group": 30,
  acta: 24,
};

export default async function VslPage() {
  const c = await getContent();
  const logos = (c["mk.vsl.front_logos"] ?? "")
    .split("|")
    .map((n) => n.trim())
    .filter(Boolean);
  const belege = (c["mk.vsl.front_beleg"] ?? "")
    .split("|")
    .map((teil) => {
      const [wert, label] = teil.split("~");
      return { wert: wert?.trim() ?? "", label: label?.trim() ?? "" };
    })
    .filter((b) => b.wert);

  return (
    <div className="relative min-h-dvh bg-bg-base">
      {/* Mini-Kopf: nur die Marke, zentriert */}
      <header className="mx-auto flex max-w-[1080px] justify-center px-6 pt-8 lg:pt-10">
        <Logo height={30} statisch />
      </header>

      {/* Bühne: Claim → Video → ein Knopf */}
      <section className="mx-auto max-w-[960px] px-6 pt-12 text-center lg:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full bg-akzent-wash px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-cream">
          <span className="h-1.5 w-1.5 rounded-full bg-akzent-hover" aria-hidden />
          {c["mk.vsl.front_eyebrow"]}
        </p>
        <h1 className="t-display mx-auto mt-6 max-w-[17ch]">{rich(c["mk.vsl.front_titel"] ?? "")}</h1>
        <p className="t-body-lg mx-auto mt-5 max-w-[34rem]">{c["mk.vsl.front_sub"]}</p>

        <div className="mt-10 lg:mt-12">
          <VslSlot format="breit" videoUrl={c["mk.vsl.url"]} platzhalterText={c["mk.vsl.platzhalter"]} />
        </div>

        <CtaKnopf text={c["mk.vsl.front_cta"]} hinweis={c["mk.vsl.front_cta_hinweis"]} className="mt-9 lg:mt-11" />
      </section>

      {/* Der eine Grund — ein Schmerzpunkt, auf den Kern gebracht */}
      <section className="mx-auto mt-20 max-w-[680px] px-6 text-center lg:mt-28">
        <p className="t-label">{c["mk.vsl.front_grund_eyebrow"]}</p>
        <h2 className="t-h2 mt-4">{rich(c["mk.vsl.front_grund_titel"] ?? "")}</h2>
        <p className="t-body-lg mt-5">{c["mk.vsl.front_grund_text"]}</p>
        <p className="t-body-lg mt-4">{c["mk.vsl.front_grund_text2"]}</p>
      </section>

      {/* Was niemand erzählt — die Wahrheit gegen den Strich, auf Pastellgelb */}
      <section className="mx-auto mt-16 max-w-[880px] px-6 lg:mt-24">
        <div className="rounded-[28px] bg-akzent-wash px-7 py-10 text-center sm:px-12 sm:py-14">
          <p className="t-label !text-ink-cream/70">{c["mk.vsl.front_story_eyebrow"]}</p>
          <h2 className="t-h2 mx-auto mt-4 max-w-[22ch]">{rich(c["mk.vsl.front_story_titel"] ?? "")}</h2>
          <p className="t-body-lg mx-auto mt-5 max-w-[56ch] !text-ink-cream">{c["mk.vsl.front_story_text"]}</p>
        </div>
      </section>

      {/* Gestolpert, nicht schlauer — plus belegte Case-Zahlen */}
      <section className="mx-auto mt-16 max-w-[680px] px-6 text-center lg:mt-24">
        <p className="t-label">{c["mk.vsl.front_stolper_eyebrow"]}</p>
        <h2 className="t-h2 mt-4">{rich(c["mk.vsl.front_stolper_titel"] ?? "")}</h2>
        <p className="t-body-lg mt-5">{c["mk.vsl.front_stolper_text"]}</p>
        {belege.length > 0 && (
          <div className="mt-9 rounded-[24px] border border-line-subtle bg-bg-base px-6 py-7 sm:px-8">
            <p className="t-label !text-[10.5px]">{c["mk.vsl.front_beleg_label"]}</p>
            <dl className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {belege.map((b) => (
                <div key={b.wert + b.label}>
                  <dt className="font-display text-[34px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">{b.wert}</dt>
                  <dd className="t-small mx-auto mt-2 max-w-[18ch]">{b.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* Zweiter Knopf — derselbe Weg, ein Satz ans Herz */}
      <section className="mx-auto mt-16 max-w-[680px] px-6 text-center lg:mt-24">
        <h2 className="t-h2">{rich(c["mk.vsl.front_cta2_titel"] ?? "")}</h2>
        <CtaKnopf text={c["mk.vsl.front_cta"]} hinweis={c["mk.vsl.front_cta_hinweis"]} className="mt-8" />
      </section>

      {/* Beweis: echte Kundenlogos der bisherigen beuwy.com */}
      {logos.length > 0 && (
        <section className="mx-auto mt-16 max-w-[1080px] px-6 lg:mt-24">
          <div className="border-t border-line-subtle pt-10 text-center lg:pt-12">
            <p className="t-label !text-[10.5px]">{c["mk.vsl.front_logos_label"]}</p>
            <div className="mx-auto mt-8 flex max-w-[960px] flex-wrap items-center justify-center gap-x-9 gap-y-6 lg:gap-x-12 lg:gap-y-7">
              {logos.map((name) => {
                const slug = MARKEN_SLUGS[name] ?? slugifyMarke(name);
                return <LogoSlot key={name} name={name} slug={slug} hoehe={LOGO_HOEHEN[slug] ?? 20} />;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mini-Fuß: Pflichtlinks, Weg zur ausführlichen Seite */}
      <footer className="mx-auto mt-16 max-w-[1080px] px-6 pb-10 lg:mt-24">
        <div className="flex flex-col items-center gap-4 border-t border-line-subtle pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Logo height={16} />
            <span className="t-small">{c["mk.vsl.front_fuss"]}</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Rechtliches">
            <FussLink href="/">{c["mk.vsl.front_mehr"]}</FussLink>
            <FussLink href="/impressum">Impressum</FussLink>
            <FussLink href="/datenschutz">Datenschutz</FussLink>
          </nav>
        </div>
      </footer>
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
        <svg
          width="15"
          height="15"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5"
          aria-hidden
        >
          <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="t-small">{hinweis}</p>
    </div>
  );
}

function FussLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] font-medium text-ink-muted transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
    >
      {children}
    </Link>
  );
}
