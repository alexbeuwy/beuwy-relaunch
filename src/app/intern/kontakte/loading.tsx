import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-Ladezustand für /intern/kontakte (LEAF U3, 27.08) — Next.js
 * rendert diese Datei automatisch, solange page.tsx serverseitig lädt
 * (kontakteListe()). Reine Platzhalter-Struktur mit ui/skeleton, kein
 * eigener Datenzugriff, keine Studio-Texte (Ladezustände sind kein
 * lesbarer Inhalt, siehe Design-Direktive Regel 8).
 */
export default function KontakteLoading() {
  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>

        <div className="mt-8">
          <Skeleton className="h-11 w-full max-w-[360px] rounded-[10px]" />

          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-line-subtle lg:block">
            <div className="border-b border-line-subtle bg-bg-elevated px-4 py-3">
              <Skeleton className="h-3 w-full max-w-[520px]" />
            </div>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-6 border-b border-line-subtle px-4 py-3.5 last:border-0">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 lg:hidden">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-line-subtle p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-1/2" />
                <Skeleton className="mt-1.5 h-3 w-2/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
