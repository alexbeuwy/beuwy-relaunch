/**
 * Mikro-Kennzeichnung für KI-generierte Bilder (BRIEF §4): eine kaum
 * sichtbare Pill in der Ecke des Mediums. Ehrlich, ohne das Bild zu
 * stören. Immer auf dem Eltern-Element mit position:relative platzieren.
 */
export function AiPille({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="KI-generiertes Bild"
      className={`pointer-events-none absolute bottom-2 right-2 z-10 rounded-full bg-black/25 px-1.5 py-px text-[8px] font-medium uppercase tracking-[0.08em] text-white/70 backdrop-blur-sm ${className}`}
    >
      AI Visual
    </span>
  );
}
