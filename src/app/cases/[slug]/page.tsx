import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASES, caseBySlug } from "@/lib/cases";
import { VideoCard } from "@/components/VideoCard";
import { CtaBand } from "@/components/CtaBand";

/**
 * Fallstudien-Detailseite. Ruhig, dokumentarisch — kein zweites
 * Verkaufsgespräch. Die Reise erzählt sich selbst, das CTA-Band am
 * Ende reicht.
 */

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.reise} — beuwy`,
    description: c.teaser,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();

  const domain = (c.link?.label ?? c.kunde).replace(/^https?:\/\//, "");

  return (
    <>
      {/* ── Kopf — Ultramarin-Himmel, die Reise als Überschrift ──────── */}
      <section className="section-band-bright on-sky">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-20">
          <Link href="/#referenzen" className="t-small">
            ← Alle Fallstudien
          </Link>

          {c.beispiel ? (
            <div className="mt-6">
              <span className="rounded-full border px-3 py-1 t-data">
                Beispielprojekt · erfundene Zahlen
              </span>
            </div>
          ) : null}

          <p className="t-label mt-6">
            {c.kunde} · {c.branche} · {c.jahr}
          </p>
          <h1 className="t-h2 mt-4 max-w-[820px]">{c.reise}</h1>
          <p className="t-body-lg mt-5 max-w-[560px]">{c.teaser}</p>

          {/* Fakten-Reihe — noch im Ultramarin-Kopf, Kontrast selbst gesetzt */}
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {c.fakten.map((f) => (
              <div key={f.label}>
                <p className="stat-num tnum text-snow">{f.wert}</p>
                <p className="stat-cap text-[rgba(255,253,246,0.72)]">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual — Bild im Browser-Rahmen, Video, oder nichts ──────── */}
      {c.bild ? (
        <section className="section-band-base">
          <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-16 md:pt-20">
            <div className="case-frame">
              <div className="case-frame-bar" aria-hidden>
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-url">{domain}</span>
              </div>
              <Image
                src={c.bild}
                width={1280}
                height={800}
                alt={c.bildAlt ?? `Startseite von ${c.kunde}`}
              />
            </div>
          </div>
        </section>
      ) : c.video ? (
        <section className="section-band-base">
          <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-16 md:pt-20">
            <div className="max-w-[860px] mx-auto">
              <VideoCard src={c.video} label={c.videoLabel ?? c.kunde} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Text-Teil — Ausgangslage, Aufbau, Ergebnis ───────────────── */}
      <section className="section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24">
          <div className="max-w-[760px]">
            <h2 className="t-h2">Ausgangslage</h2>
            <p className="t-body mt-5">{c.ausgangslage}</p>

            <h2 className="t-h2 mt-14">Was wir gebaut haben</h2>
            <div className="mt-5">
              {c.gebaut.map((punkt, i) => (
                <div
                  key={punkt}
                  className="flex items-baseline gap-4 border-b border-line-subtle py-4"
                >
                  <span className="tnum t-data text-sky w-6 shrink-0">{i + 1}</span>
                  <span className="t-body">{punkt}</span>
                </div>
              ))}
            </div>

            <h2 className="t-h2 mt-14">Was danach passierte</h2>
            <p className="t-body mt-5">{c.danach}</p>

            {c.link ? (
              <a
                href={c.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ref-link inline-block mt-6"
              >
                {c.link.label} ↗
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Abschluss ─────────────────────────────────────────────────── */}
      <CtaBand
        tone="sky"
        title="Wenn Ihre Reise so aussehen soll, reden wir darüber."
        buttonLabel="Systemgespräch anfragen"
      />
    </>
  );
}
