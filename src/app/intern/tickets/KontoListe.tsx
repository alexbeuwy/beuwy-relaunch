"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlarmClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * KontoListe — die Konten-Spalte von /intern/tickets als eigener Client-
 * Baustein (CRM-UX-Politur Leaf U4). Ein Klick navigiert per
 * router.push() innerhalb von useTransition(): während die neue
 * ?konto=…-Auswahl serverseitig geladen wird, zeigt die Spalte
 * ui/skeleton-Platzhalter statt kommentarlos einzufrieren — isPending ist
 * hier der einzig ehrliche "lädt gerade"-Zustand, weil die Daten in
 * page.tsx komplett serverseitig (crm/db.ts) geholt werden, kein
 * Client-Fetch dahintersteckt.
 *
 * Reines <button>-Grid statt <Link> — ohne JavaScript ergäbe ein Button
 * keine Navigation, aber /intern läuft ohnehin ausschließlich hinter dem
 * Studio-Cookie mit aktivem CommandPalette-JS (⌘K, siehe intern/layout.tsx);
 * ein No-JS-Fallback ist für dieses interne Werkzeug nicht das Ziel, hier
 * zählt die spürbare Übergangs-Rückmeldung.
 */

export type KontoSummary = { email: string; name: string; firma: string; offenAnzahl: number; ueberfaellig: boolean };

export function KontoListe({
  konten,
  ausgewaehltEmail,
}: {
  konten: KontoSummary[];
  ausgewaehltEmail: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function waehlen(email: string) {
    if (email === ausgewaehltEmail) return;
    startTransition(() => {
      router.push(`/intern/tickets?konto=${encodeURIComponent(email)}`);
    });
  }

  if (isPending) {
    return (
      <div className="flex flex-col">
        {konten.map((k) => (
          <div key={k.email} className="flex items-center justify-between gap-2 border-b border-line-subtle px-4 py-3 last:border-0">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3.5 w-28" />
              {k.firma && <Skeleton className="mt-1.5 h-2.5 w-16" />}
            </div>
            <Skeleton className="h-3.5 w-5 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {konten.map((k) => {
        const aktiv = ausgewaehltEmail === k.email;
        return (
          <button
            key={k.email}
            type="button"
            onClick={() => waehlen(k.email)}
            aria-current={aktiv ? "true" : undefined}
            className={`flex items-center justify-between gap-2 border-b border-line-subtle px-4 py-3 text-left transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated ${
              aktiv ? "bg-akzent-wash" : ""
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-medium text-ink-cream">{k.name || k.firma || k.email}</span>
              {k.firma && k.name && <span className="block truncate text-[12px] text-ink-muted">{k.firma}</span>}
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              {k.ueberfaellig && <AlarmClock size={13} className="text-destructive" aria-hidden />}
              <span className="t-data tnum !text-ink-dim">{k.offenAnzahl}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
