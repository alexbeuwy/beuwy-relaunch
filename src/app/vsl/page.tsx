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

        <div className="mt-9 flex flex-col items-center gap-3 lg:mt-11">
          <Link
            href="/anfrage"
            className="group inline-flex items-center gap-3 rounded-full bg-akzent px-9 py-4 text-[16px] font-semibold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
          >
            {c["mk.vsl.front_cta"]}
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
          <p className="t-small">{c["mk.vsl.front_cta_hinweis"]}</p>
        </div>
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
