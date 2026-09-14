import type { Metadata } from "next";
import { Database, Trash2 } from "lucide-react";
import { crmKonfiguriert, dummyVorhanden } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_EINSTELLUNGEN_DEFAULTS } from "@/lib/texte/intern-einstellungen";

/**
 * /intern/einstellungen (R11b, 14.09): Betriebswerkzeuge der Konsole.
 * Erster Baustein: Dummy-Daten befüllen/löschen, damit Pipeline, Kontakte,
 * Aufgaben, Tickets und Einblick vor den ersten echten Anfragen ein
 * lebendiges Bild zeigen. Beide Aktionen laufen als Form-POST gegen
 * /api/intern-einstellungen; Ergebnis kommt als Query-Code zurück.
 */

export const metadata: Metadata = {
  title: "Einstellungen — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ZAEHLER_LABELS = ["Kontakte", "Leads", "Deals", "Aufgaben", "Konten", "Tickets", "Mails", "Ereignisse", "Flows"];

export default async function EinstellungenPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; fehler?: string; n?: string }>;
}) {
  const { ok, fehler, n } = await searchParams;
  const c = await getContent();
  const t = (key: string) => c[key] ?? INTERN_EINSTELLUNGEN_DEFAULTS[key] ?? "";
  const konfiguriert = crmKonfiguriert();
  const vorhanden = konfiguriert ? await dummyVorhanden() : false;
  const zahlen = (n ?? "").split(",").map((x) => Number(x)).filter((x) => Number.isFinite(x));

  const meldung =
    fehler ? { art: "fehler" as const, text: t(`intern.einstellungen.fehler.${fehler}`) || t("intern.einstellungen.fehler.unbekannt") }
    : ok ? { art: "ok" as const, text: t(`intern.einstellungen.ergebnis.${ok}`) }
    : null;

  return (
    <div className="mx-auto max-w-[880px]">
      <p className="t-label">Intern</p>
      <h1 className="t-h2 mt-2">{t("intern.einstellungen.titel")}</h1>
      <p className="t-body mt-3 max-w-[62ch]">{t("intern.einstellungen.sub")}</p>

      {meldung && (
        <div
          role="status"
          className={`mt-6 rounded-xl border px-5 py-4 ${meldung.art === "ok" ? "border-akzent bg-akzent-wash" : "border-line-medium bg-bg-elevated"}`}
        >
          <p className={`t-small ${meldung.art === "ok" ? "is-cream" : "is-fail"}`}>{meldung.text}</p>
          {ok && ok !== "geloescht" && zahlen.length === ZAEHLER_LABELS.length && (
            <dl className="mt-3 grid grid-cols-3 gap-x-6 gap-y-2 sm:grid-cols-5">
              {ZAEHLER_LABELS.map((label, i) => (
                <div key={label}>
                  <dt className="t-data">{label}</dt>
                  <dd className="text-[18px] font-semibold tabular-nums text-ink-cream">{zahlen[i].toLocaleString("de-DE")}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      <section className="mt-8 rounded-xl border border-line-subtle bg-white p-6 sm:p-7">
        <p className="t-label">{t("intern.einstellungen.dummy.label")}</p>
        <h2 className="t-h3 mt-2">{t("intern.einstellungen.dummy.titel")}</h2>
        <p className="t-body mt-3 max-w-[64ch]">{t("intern.einstellungen.dummy.text")}</p>
        <p className="t-data mt-4 inline-flex items-center gap-2">
          <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${vorhanden ? "bg-akzent-hover" : "bg-line-medium"}`} />
          {vorhanden ? t("intern.einstellungen.dummy.stand_vorhanden") : t("intern.einstellungen.dummy.stand_leer")}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <form method="post" action="/api/intern-einstellungen">
            <input type="hidden" name="aktion" value="dummy_fuellen" />
            <button type="submit" disabled={!konfiguriert} className="btn-primary btn-sm disabled:pointer-events-none disabled:opacity-40">
              <Database size={15} aria-hidden />
              <span>{t("intern.einstellungen.dummy.fuellen")}</span>
            </button>
          </form>
          <form method="post" action="/api/intern-einstellungen">
            <input type="hidden" name="aktion" value="dummy_loeschen" />
            <button
              type="submit"
              disabled={!konfiguriert}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-line-medium px-4 text-[14px] font-medium text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-bg-elevated disabled:pointer-events-none disabled:opacity-40"
            >
              <Trash2 size={15} aria-hidden />
              {t("intern.einstellungen.dummy.loeschen")}
            </button>
          </form>
        </div>
        <p className="t-small mt-4 max-w-[64ch]">{t("intern.einstellungen.dummy.hinweis")}</p>
        {!konfiguriert && <p className="t-small is-fail mt-3">{t("intern.einstellungen.fehler.nicht_konfiguriert")}</p>}
      </section>
    </div>
  );
}
