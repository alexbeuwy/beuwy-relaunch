import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuditResult, sanitizeCheckDomain } from "@/lib/audit-cache";
import { getContent } from "@/lib/content";
import { seitenTexte, type SeitenTexte } from "@/lib/texte/lesen";

/**
 * Teilbares Sichtbarkeits-Gutachten aus dem Website-Check-Cache.
 * Bewusst noindex + nirgends verlinkt außer über den Kopier-Link im Tool:
 * kritische Einschätzungen zu namentlich genannten Unternehmen bleiben
 * eine „automatisierte Ersteinschätzung“ auf Zuruf — kein öffentliches
 * Verzeichnis (UWG-/Äußerungsrecht-Rahmen, siehe docs/CONVERSION.md).
 */

export const revalidate = 300;

type Params = Promise<{ domain: string }>;

function scoreBand(score: number, t: SeitenTexte): string {
  if (score < 30) return t("score.band1");
  if (score < 50) return t("score.band2");
  if (score < 70) return t("score.band3");
  if (score < 85) return t("score.band4");
  return t("score.band5");
}

function tier(score: number): string {
  if (score < 40) return "low";
  if (score < 70) return "mid";
  return "high";
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const domain = sanitizeCheckDomain((await params).domain);
  const t = seitenTexte(await getContent(), "check");
  return {
    title: domain
      ? `${t("meta.titel_praefix")} ${domain}${t("meta.titel_suffix")}` // studio:ok (Titel-Zusammenbau, kein Fließtext)
      : t("meta.titel_ohne_domain"),
    description: t("meta.beschreibung"),
    robots: { index: false, follow: false },
  };
}

export default async function CheckPage({ params }: { params: Params }) {
  const domain = sanitizeCheckDomain((await params).domain);
  if (!domain) notFound();

  const c = await getContent();
  const t = seitenTexte(c, "check");
  const row = await getAuditResult(domain);

  if (!row) {
    return (
      <div className="mx-auto max-w-[960px] px-6 lg:px-10 pt-32 pb-24">
        <h1 className="t-h2 max-w-[720px]">
          {t("leer.titel_vor")} <em>{domain}</em> {t("leer.titel_nach")}
        </h1>
        <p className="t-body-lg mt-5 max-w-[560px]">{t("leer.text")}</p>
        <div className="mt-8">
          <Link href={`/?check=${encodeURIComponent(domain)}#tool`} className="btn-primary">
            {t("leer.cta")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  const { payload } = row;
  const a = payload.analysis;
  const okCount = payload.checks.filter((c) => c.ok).length;
  const categories = [
    ...a.categories,
    {
      id: "technik",
      label: t("technik.label"),
      score: payload.techScore,
      reason: t("technik.begruendung")
        .replace("{ok}", String(okCount))
        .replace("{gesamt}", String(payload.checks.length)),
    },
  ];
  const stand = new Date(row.updated_at).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-[960px] px-6 lg:px-10 pt-28 pb-24">
      <article className="dossier p-6 md:p-10">
        {/* Kopfzeile des Dokuments */}
        <header className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b hairline">
          <div>
            <p className="t-label">{t("dossier.label")}</p>
            <h1 className="t-h2 mt-2">{domain}</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="dossier-chip t-data">{t("dossier.chip")}</span>
            <p className="t-data">
              {t("dossier.stand_praefix")}
              {stand}
            </p>
          </div>
        </header>

        {/* Screenshot + Score */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start mt-8">
          {row.screenshot_url && (
            <figure className="md:col-span-7">
              <div className="dossier-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row.screenshot_url}
                  alt={`Screenshot von ${domain}`}
                  width={1280}
                  height={800}
                />
              </div>
              <figcaption className="t-data mt-2">
                {payload.finalUrl.replace(/^https?:\/\//, "")}
              </figcaption>
            </figure>
          )}
          <div className={row.screenshot_url ? "md:col-span-5" : "md:col-span-12"}>
            <p className="t-label">{t("dossier.score_label")}</p>
            <p className="t-score mt-2">
              {a.score}
              <span className="t-data">{t("dossier.score_suffix")}</span>
            </p>
            <p className="t-small is-ink mt-3">
              {domain} {scoreBand(a.score, t)}
            </p>
            <div className="mt-5 space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} data-tier={tier(cat.score)}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="t-small is-ink">{cat.label}</span>
                    <span className="t-data">{cat.score}</span>
                  </div>
                  <div className="cat-track mt-1">
                    <span
                      className="cat-fill"
                      style={{ "--pct": `${cat.score}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="t-body-lg mt-8 max-w-[640px]">{a.visibility}</p>

        {/* Befunde — im Dokument alle offen */}
        {a.findings.length > 0 && (
          <section className="border-t hairline pt-8 mt-8">
            <p className="t-label">{t("befunde.label")}</p>
            <ol className="mt-4 space-y-6">
              {a.findings.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <span className="t-data shrink-0 pt-0.5">0{i + 1}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="t-small is-ink font-medium">{f.title}</span>
                      <span className="t-data">
                        {t("befunde.aufwand_wirkung")
                          .replace("{effort}", f.effort)
                          .replace("{impact}", String(f.impact))}
                      </span>
                    </div>
                    <p className="t-small mt-1">{f.cost}</p>
                    <p className="t-small mt-1 is-ink">→ {f.fix}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <footer className="border-t hairline pt-6 mt-8">
          <p className="t-data max-w-[720px]">{t("footer.text").replace("{stand}", stand)}</p>
        </footer>
      </article>

      {/* CTA auf dem Papier-Grund unter dem Dokument */}
      <div className="mt-16 max-w-[720px]">
        <h2 className="t-h2">{t("abschluss.titel")}</h2>
        <p className="t-body-lg mt-4 max-w-[560px]">{t("abschluss.text").replace("{domain}", domain)}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link href={`/termin?domain=${encodeURIComponent(domain)}`} className="btn-primary">
            {t("abschluss.cta1")}
            <span aria-hidden>→</span>
          </Link>
          <Link href="/video-analyse" className="btn-secondary">
            {t("abschluss.cta2")}
          </Link>
        </div>
        <p className="t-data mt-4">{t("abschluss.hinweis")}</p>
      </div>
    </div>
  );
}
