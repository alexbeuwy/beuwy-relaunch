import type { Metadata } from "next";
import { crmKonfiguriert, kontoDetail } from "@/lib/crm/db";
import { leseKontoCookie } from "@/lib/konto-auth";
import { KontoBereich, type KontoDaten } from "./KontoBereich";

/**
 * /konto (R3 Leaf B9) — Kundenkonto. Nicht verlinkt aus Nav/Footer, noindex.
 * Ohne Sitzung zeigt der Server nur `authed:false`, das Login-Formular
 * selbst lebt komplett im Client-Teil. Mit Sitzung lädt der Server die
 * Kontodaten (kontoDetail aus src/lib/crm/db.ts) und übergibt sie fertig
 * aufbereitet als Props — dieselbe Aufteilung wie StudioPage/StudioEditor.
 *
 * Ist keine Datenbank konfiguriert (oder wurde für diese E-Mail noch kein
 * Konto-Datensatz angelegt), zeigt die Seite ehrlich gekennzeichnete
 * Platzhalterwerte statt eine leere Seite oder einen Fehler.
 */

export const metadata: Metadata = {
  title: "Ihr Konto — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** "max@riegel-immobilien.de" → "Max"; "Max Mustermann" → "Max". */
function anzeigename(email: string, name: string): string {
  const trimmed = name.trim();
  if (trimmed) return trimmed.split(/\s+/)[0];
  const lokal = email.split("@")[0] || email;
  return lokal ? lokal.charAt(0).toUpperCase() + lokal.slice(1) : "";
}

export default async function KontoPage() {
  const email = await leseKontoCookie();

  if (!email) {
    return <KontoBereich authed={false} />;
  }

  const konfiguriert = crmKonfiguriert();
  const detail = konfiguriert ? await kontoDetail(email) : null;

  const konto: KontoDaten = detail
    ? {
        name: anzeigename(email, detail.konto.name),
        firma: detail.konto.firma,
        projektStatus: detail.konto.projekt_status || "aufnahme",
        tickets: detail.tickets.map((t) => ({
          id: t.id,
          erstellt: t.erstellt,
          titel: t.titel,
          status: t.status,
          detail: t.detail,
        })),
      }
    : {
        name: anzeigename(email, ""),
        firma: "",
        projektStatus: "aufnahme",
        tickets: [],
      };

  return <KontoBereich authed email={email} konto={konto} demoDaten={!detail} />;
}
