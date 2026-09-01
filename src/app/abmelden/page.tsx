import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { INTERN_FLOWS_DEFAULTS } from "@/lib/texte/intern-flows";

/**
 * /abmelden — Ein-Klick-Abmeldung aus automatischen Flow-Mails (R5 Leaf
 * G4, Abmelde-Pflicht aus R5-FUNKTIONEN.md Modul 4). Jede Flow-Mail
 * verlinkt hierher mit "?e=<E-Mail base64url>" (siehe
 * src/app/api/cron/flows/route.ts::mitAbmeldeFusszeile).
 *
 * Bewusst ganz ohne Client-Komponente: das "?e=…"-Suchparameter reicht als
 * verstecktes Feld in ein normales <form method="POST" action="/api/
 * abmelden">, der Server-Handler ruft abmelden(email) und leitet mit 303
 * zurück auf "?e=…&ok=1" — dieselbe Seite zeigt danach den Erfolgstext.
 * Kein Fetch, kein useState, funktioniert auch ohne JavaScript im
 * Posteingang-Browser. Kein Studio-Cookie nötig: der Link kommt aus einer
 * echten E-Mail, nicht aus dem internen Bereich — jeder mit dem Link darf
 * sich selbst abmelden, mehr Rechte braucht die Seite nicht.
 */

export const metadata: Metadata = {
  title: "Abmelden — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** "<base64url>" → E-Mail oder null bei fehlendem/kaputtem Wert. Reine
 *  Format-Prüfung für die Anzeige — die eigentliche Validierung inkl.
 *  Rate-Limit sitzt in /api/abmelden. */
function dekodiereEmail(e: string | undefined): string | null {
  if (!e) return null;
  try {
    const email = Buffer.from(e, "base64url").toString("utf8").trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  } catch {
    return null;
  }
}

export default async function AbmeldenPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; ok?: string }>;
}) {
  const { e, ok } = await searchParams;
  const email = dekodiereEmail(e);
  const erledigt = ok === "1";

  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_FLOWS_DEFAULTS[key] ?? key;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-base px-4 py-24">
      <div className="w-full max-w-[440px] rounded-[28px] border border-line-subtle bg-white px-7 py-9 text-center sm:px-9 sm:py-11">
        <p className="t-label">{t("abmelden.eyebrow")}</p>

        {!email ? (
          <>
            <h1 className="t-h3 mt-4">{t("abmelden.titel")}</h1>
            <p className="t-body mt-3">{t("abmelden.ungueltig_text")}</p>
          </>
        ) : erledigt ? (
          <>
            <h1 className="t-h3 mt-4">{t("abmelden.erfolg_titel")}</h1>
            <p className="t-body mt-3">{t("abmelden.erfolg_text")}</p>
          </>
        ) : (
          <>
            <h1 className="t-h3 mt-4">{t("abmelden.titel")}</h1>
            <p className="t-body mt-3">{t("abmelden.text")}</p>
            <form action="/api/abmelden" method="POST" className="mt-6">
              <input type="hidden" name="e" value={e} />
              <button
                type="submit"
                className="rounded-full bg-akzent px-6 py-3 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98]"
              >
                {t("abmelden.button")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
