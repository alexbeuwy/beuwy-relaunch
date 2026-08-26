import type { Metadata } from "next";
import { cookies } from "next/headers";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { StudioLogin } from "@/components/StudioLogin";
import {
  mailFunnelBestaetigung,
  mailTerminBestaetigung,
  mailTerminErinnerung,
  mailNachfass,
  mailToolErgebnis,
  mailKontoCode,
} from "@/lib/email-vorlagen";

/**
 * Studio-geschützte Vorschau aller E-Mail-Vorlagen (R3 Leaf B7). Gleiches
 * Cookie/Muster wie /studio und /os (src/lib/studio-auth.ts) — ohne Login
 * gibt es hier nichts zu sehen. Kein eigenes Layout: die Seite ist eine
 * eigenständige Section mit eigenem Hintergrund/Innenabstand, funktioniert
 * also auch, falls (noch) kein umschließendes /intern-Layout existiert.
 *
 * Jede Karte zeigt Vorlagen-Name + Betreff und rendert das erzeugte HTML
 * unverändert in einem sandboxed iframe (srcDoc) — genau das, was im
 * Posteingang ankommt, ohne dass Website-CSS hineinwirkt.
 */

export const metadata: Metadata = {
  title: "E-Mail-Vorlagen — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type VorlagenBeispiel = { name: string; hinweis: string; betreff: string; html: string };

function beispiele(): VorlagenBeispiel[] {
  return [
    {
      name: "mailFunnelBestaetigung",
      hinweis: "Nach dem Absenden des Vorquali-Funnels (/anfrage).",
      ...mailFunnelBestaetigung("Julia Berger", "Marke & Auftritt, Website & Anfragen"),
    },
    {
      name: "mailTerminBestaetigung",
      hinweis: "Sofort nach einer erfolgreichen Terminbuchung (/api/booking).",
      ...mailTerminBestaetigung("Julia Berger", "2026-09-14", "10:30"),
    },
    {
      name: "mailTerminErinnerung",
      hinweis: "Kurz vor dem gebuchten Termin.",
      ...mailTerminErinnerung("Julia Berger", "2026-09-14", "10:30"),
    },
    {
      name: "mailNachfass",
      hinweis: "Wenn ein Lead eine Weile nichts mehr von sich hören ließ.",
      ...mailNachfass("Julia Berger"),
    },
    {
      name: "mailToolErgebnis",
      hinweis: "Auswertung eines Rechners aus /tools/*.",
      ...mailToolErgebnis("Julia Berger", "Verkaufspreisrechner", [
        { label: "Orientierungswert", value: "612.000 €" },
        { label: "Preis je m²", value: "4.850 €" },
        { label: "Vergleichsobjekte", value: "14" },
      ]),
    },
    {
      name: "mailKontoCode",
      hinweis: "Login-Code fürs Kundenkonto.",
      ...mailKontoCode("482913"),
    },
  ];
}

export default async function InternMailsPage() {
  const authed = await isStudioAuthed((await cookies()).get(STUDIO_COOKIE)?.value);

  if (!authed) {
    return (
      <div className="min-h-dvh bg-bg-base px-4 pt-32">
        <StudioLogin ziel="/intern/mails" />
      </div>
    );
  }

  return (
    <section className="min-h-dvh bg-bg-base px-6 pb-24 pt-32 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="t-label">Intern</p>
        <h1 className="t-h2 mt-4">E-Mail-Vorlagen</h1>
        <p className="t-body mt-4 max-w-[560px]">
          Alle Vorlagen aus <span className="t-data is-cream">src/lib/email-vorlagen.ts</span> mit
          Beispieldaten, gerendert genau so, wie sie im Posteingang ankommen.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {beispiele().map((v) => (
            <div key={v.name} className="panel rounded-2xl p-5 sm:p-6">
              <p className="t-label">{v.name}</p>
              <p className="t-small mt-1">{v.hinweis}</p>
              <p className="t-h3 mt-3">{v.betreff}</p>
              <div className="hairline mt-4 overflow-hidden rounded-xl border bg-white">
                <iframe
                  title={`${v.name} — Vorschau`}
                  srcDoc={v.html}
                  sandbox=""
                  className="h-[440px] w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
