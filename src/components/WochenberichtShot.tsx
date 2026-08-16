/**
 * Produkt-Shot direkt unter dem Hero: ein Wochenbericht-Dokument als
 * HTML-Mock. Beweist die Behauptung „ein System mit Zahlenverantwortung"
 * visuell — flach, Riso-Welt, keine Animation. Rein dekorativ (aria-hidden),
 * der erklärende Text steht daneben im Copy-Block der Sektion.
 */

const METRICS: Array<{ value: string; label: string; delta?: string }> = [
  { value: "31", label: "Anfragen" },
  { value: "12", label: "Termine" },
  { value: "2", label: "Abschlüsse", delta: "▲ +1" },
  { value: "412 €", label: "Kosten je Abschluss" },
];

/* Termine je Woche, letzte 8 Wochen — Höhe in px, max. 56px. */
const CHART_BARS = [22, 30, 18, 34, 40, 32, 48, 56];

export function WochenberichtShot() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[860px] overflow-hidden rounded-[16px] border border-line-subtle bg-snow shadow-[0_24px_60px_-32px_rgba(16,25,15,0.35)]"
    >
      {/* Kopfleiste */}
      <div className="flex items-center justify-between gap-4 border-b border-line-subtle px-7 py-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="t-label">Wochenbericht</span>
          <span className="t-data tnum">KW 33 · 10.–16. Aug</span>
        </div>
        <span className="t-data shrink-0 rounded-full bg-bg-elevated px-3 py-1">
          Beispielansicht
        </span>
      </div>

      {/* Kennzahlen-Reihe */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 px-7 py-6 md:grid-cols-4 md:gap-x-0">
        {METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className={
              i > 0
                ? "md:border-l md:border-line-subtle md:pl-6"
                : undefined
            }
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-[var(--font-helvena)] font-bold text-[32px] tnum text-ink-cream">
                {metric.value}
              </span>
              {metric.delta ? (
                <span className="text-[12px] tnum text-sky">{metric.delta}</span>
              ) : null}
            </div>
            <div className="t-data mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Chart-Zeile */}
      <div className="px-7 pb-6">
        <div className="t-label mb-3">Termine · letzte 8 Wochen</div>
        {/* schlanke Balken auf feiner Grundlinie, Wertlabels über den
            aktuellen zwei Wochen — Chart-Komponente, kein Skeleton */}
        <div
          className="flex items-end gap-2 border-b border-[rgba(16,25,15,0.12)] pb-px"
          style={{ height: 74 }}
        >
          {CHART_BARS.map((height, i) => {
            const isCurrent = i >= CHART_BARS.length - 2;
            return (
              <div key={i} className="flex w-full max-w-[26px] flex-col items-center gap-1">
                {isCurrent && (
                  <span className="tnum text-[11px] font-medium leading-none text-sky">
                    {i === CHART_BARS.length - 2 ? 9 : 12}
                  </span>
                )}
                <div
                  className={`w-full rounded-t-[3px] ${
                    isCurrent ? "bg-sky" : "bg-[rgba(16,25,15,0.16)]"
                  }`}
                  style={{ height: `${height}px` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Fußzeile */}
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 border-t border-line-subtle bg-bg-elevated px-7 py-4">
        <span className="t-small font-medium text-ink-cream">
          Änderung für KW 34:
        </span>
        <span className="t-small text-ink-muted">
          Budget von LinkedIn zu Meta A — Kosten je Termin dort{" "}
          <span className="tnum">38 %</span> niedriger.
        </span>
      </div>
    </div>
  );
}
