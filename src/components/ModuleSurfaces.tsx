/* ----------------------------------------------------------------
   MODUL-OBERFLÄCHEN — vier kleine, statische Produkt-Mocks für die
   Bento-Karten der System-Sektion. Reine Riso-Flächen: kein
   Verlauf, kein Glas, kein Glow, keine Animation. Hover übernimmt
   die umgebende Karte.
   ---------------------------------------------------------------- */

const SURFACE_HEIGHT = "h-[134px]";

export function MarkeSurface() {
  return (
    <div
      aria-hidden="true"
      className={`flex ${SURFACE_HEIGHT} w-full flex-col justify-between rounded-[10px] bg-bg-elevated p-4`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-[28px] leading-none font-bold text-ink-cream">
            Aa
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-full border border-line-medium bg-sky" />
            <span className="h-3.5 w-3.5 rounded-full border border-line-medium bg-orange" />
            <span className="h-3.5 w-3.5 rounded-full border border-line-medium bg-ink-cream" />
            <span className="h-3.5 w-3.5 rounded-full border border-line-medium bg-snow" />
          </div>
        </div>
        <span className="font-display text-sm font-bold tracking-tight text-ink-cream">
          beuwy
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="t-data">Helvena · Display</p>
        <p className="t-data">Inter · Text</p>
      </div>
    </div>
  );
}

export function AnzeigenSurface() {
  return (
    <div
      aria-hidden="true"
      className={`flex ${SURFACE_HEIGHT} w-full flex-col justify-center gap-3 rounded-[10px] border border-line-subtle bg-bg-raised p-4`}
    >
      <div className="grid grid-cols-[118px_1fr_82px] items-center gap-3">
        <span className="flex items-center gap-1.5 overflow-hidden">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dim" />
          <span className="t-small truncate font-medium text-ink-cream">
            Meta · 55+
          </span>
        </span>
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-line-subtle">
          <span
            className="block h-full rounded-full bg-sky"
            style={{ width: "72%" }}
          />
        </span>
        <span className="tnum t-data text-right">41 € / Termin</span>
      </div>
      <div className="grid grid-cols-[118px_1fr_82px] items-center gap-3">
        <span className="flex items-center gap-1.5 overflow-hidden">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-dim" />
          <span className="t-small truncate font-medium text-ink-cream">
            LinkedIn · B2B
          </span>
        </span>
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-line-subtle">
          <span
            className="block h-full rounded-full bg-[rgba(16,25,15,0.25)]"
            style={{ width: "28%" }}
          />
        </span>
        <span className="tnum t-data text-right">96 € / Termin</span>
      </div>
      <p className="t-data text-sky">→ Budget wandert zu Meta A</p>
    </div>
  );
}

export function VertriebSurface() {
  return (
    <div
      aria-hidden="true"
      className={`flex ${SURFACE_HEIGHT} w-full flex-col justify-center gap-2 rounded-[10px] bg-bg-elevated p-4`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 overflow-hidden">
          <span className="h-2 w-2 shrink-0 rounded-full bg-orange" />
          <span className="t-small truncate font-medium text-ink-cream">
            Neue Anfrage · vor 2 Min
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-sky px-2.5 py-0.5 text-[11px] font-medium text-snow">
          Rückruf läuft
        </span>
      </div>
      <p className="t-data">M. Berger · EFH Speyer · 0621 39 84 71</p>
      <p className="t-data text-ink-dim">
        Regel: Rückruf &lt; 5 Min · zugewiesen an AP
      </p>
    </div>
  );
}

const REPORT_BARS = [14, 18, 12, 22, 26, 20, 30, 34];

export function ZahlenSurface() {
  return (
    <div
      aria-hidden="true"
      className={`flex ${SURFACE_HEIGHT} w-full flex-col justify-between rounded-[10px] border border-line-subtle bg-bg-raised p-4`}
    >
      <p className="t-label">KW 33 · Bericht</p>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="tnum leading-none text-[17px] font-semibold text-ink-cream">
            31
          </p>
          <p className="t-data mt-1">Anfragen</p>
        </div>
        <div>
          <p className="tnum leading-none text-[17px] font-semibold text-ink-cream">
            12
          </p>
          <p className="t-data mt-1">Termine</p>
        </div>
        <div>
          <p className="tnum leading-none text-[17px] font-semibold text-ink-cream">
            2
          </p>
          <p className="t-data mt-1">Abschlüsse</p>
        </div>
      </div>
      <div className="flex items-end gap-1.5" style={{ height: 34 }}>
        {REPORT_BARS.map((height, i) => (
          <span
            key={i}
            className={`flex-1 max-w-[14px] rounded-[2px] ${
              i >= REPORT_BARS.length - 2 ? "bg-sky" : "bg-[rgba(16,25,15,0.18)]"
            }`}
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
}
