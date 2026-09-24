import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-Ladezustand für /intern/aufgaben (LEAF U3, 27.08) — Next.js
 * rendert diese Datei automatisch, solange page.tsx serverseitig lädt
 * (tageskommando() + kontakteListe()). Reine Platzhalter-Struktur mit
 * ui/skeleton, kein eigener Datenzugriff, keine Studio-Texte.
 */
export default function AufgabenLoading() {
  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[820px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
          <Skeleton className="h-10 w-44 rounded-full" />
        </div>

        <div className="mt-6 flex flex-col gap-5">
          {[0, 1, 2].map((gruppe) => (
            <div key={gruppe} className="rounded-2xl border border-line-subtle p-6">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-5" />
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {[0, 1].map((zeile) => (
                  <div key={zeile} className="flex items-center gap-3 py-1">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-[5px]" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
