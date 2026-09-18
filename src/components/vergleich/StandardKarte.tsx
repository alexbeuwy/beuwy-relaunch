/**
 * StandardKarte — Innenfläche der "grauen Realität"-Karte im neuen
 * Aha-Vergleich auf der Startseite (Karte 1 von 2, gestapelt). Zeigt
 * die austauschbare Maklersoftware-Post, die fast jedes Büro verschickt:
 * dasselbe Exposé, dieselbe Serienmail, dieselbe Objektliste — nur der
 * Absender wechselt. Reine Server-Komponente, das Karten-Chassis
 * (rounded-[32px], bg, min-h, Scroll-Effekte) baut der Orchestrator.
 *
 * Die Dokument-Collage rechts ist bewusst KEIN Foto-Import: drei
 * fotorealistisch wirkende Dokumente, komplett aus JSX/CSS gebaut,
 * dezent entsättigt und ohne jedes Gelb — die Grauwelt, gegen die
 * die beuwy-Karte (Karte 2) antritt.
 */
export function StandardKarte({ c }: { c: Record<string, string> }) {
  const tools = c["mk.vgl.std.tools"]
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="grid h-full items-center gap-12 p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-16">
      {/* Textspalte — grau ist hier Programm, nicht Zufall */}
      <div>
        <p className="t-label">{c["mk.vgl.std.label"]}</p>
        <h3 className="font-display mt-4 text-[clamp(26px,2.8vw,38px)] font-bold leading-[1.08] tracking-[-0.02em] text-ink-dim">
          {c["mk.vgl.std.titel"]}
        </h3>
        <p className="t-body mt-6 max-w-[46ch]">{c["mk.vgl.std.text"]}</p>

        {tools.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-line-subtle px-3 py-1 text-[12px] text-ink-dim"
              >
                {tool}
              </li>
            ))}
          </ul>
        )}

        <p className="t-small mt-6">{c["mk.vgl.std.fussnote"]}</p>
      </div>

      {/* Dokument-Collage — reine Formen, keine Fotos, keine Icons */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto mt-4 h-[280px] w-full max-w-[380px] overflow-visible saturate-[0.6] lg:mx-0 lg:mt-0 lg:h-[340px] lg:max-w-none"
      >
        {/* 3) Objektliste.xlsx — ganz hinten angeschnitten, nur auf lg sichtbar */}
        <div
          className="absolute right-2 top-2 hidden w-[220px] rotate-[6deg] rounded-[6px] border border-neutral-200 bg-white shadow-md lg:block"
          style={{ transform: "rotate(6deg) translateX(30%)" }}
        >
          <div
            className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-3 py-2 text-[9px] font-medium text-neutral-500"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span>Objektliste.xlsx</span>
            <span>Tabelle 1</span>
          </div>
          <div className="grid grid-cols-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="h-5 border-b border-r border-neutral-100 last:border-r-0"
              />
            ))}
          </div>
        </div>

        {/* 2) Serienmail — versetzt hinter dem Exposé */}
        <div className="absolute left-1/2 top-3 w-[260px] -translate-x-[62%] rotate-[2deg] rounded-[10px] border border-neutral-200 bg-white shadow-md md:top-4">
          <div className="flex items-center gap-1.5 border-b border-neutral-200 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
          </div>
          <div className="space-y-2.5 p-4">
            <p
              className="text-[11px] font-bold text-neutral-700"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Ihr Immobilienangebot
            </p>
            <p
              className="text-[9px] text-neutral-500"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Sehr geehrte Damen und Herren,
            </p>
            <span className="block h-2 w-full rounded bg-neutral-200" />
            <span className="block h-2 w-full rounded bg-neutral-200" />
            <span className="block h-2 w-3/4 rounded bg-neutral-200" />
            <p className="pt-1 text-[10px] text-blue-500 underline">
              expose_final_v2(1).pdf
            </p>
          </div>
        </div>

        {/* 1) A4-Exposé — vorderstes Element der Collage */}
        <div className="absolute left-1/2 top-0 aspect-[1/1.35] w-[240px] -translate-x-[38%] rotate-[-3deg] rounded-[10px] border border-neutral-200 bg-white shadow-md md:w-[280px]">
          <div
            className="flex items-center justify-between bg-neutral-200 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-neutral-600"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span>Exposé</span>
            <span className="font-normal normal-case tracking-normal">Objekt-Nr. 2024-118</span>
          </div>
          <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-[4px] bg-neutral-100">
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 48.5%, rgba(0,0,0,0.12) 49.5%, rgba(0,0,0,0.12) 50.5%, transparent 51.5%), linear-gradient(-45deg, transparent 48.5%, rgba(0,0,0,0.12) 49.5%, rgba(0,0,0,0.12) 50.5%, transparent 51.5%)",
              }}
            />
          </div>
          <table
            className="mx-3 w-[calc(100%-1.5rem)] border-collapse text-[9px] text-neutral-500"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <tbody>
              <tr className="border-b border-neutral-150" style={{ borderColor: "#eee" }}>
                <td className="py-1">Zimmer</td>
                <td className="py-1 text-right">4</td>
              </tr>
              <tr className="border-b" style={{ borderColor: "#eee" }}>
                <td className="py-1">Wohnfläche</td>
                <td className="py-1 text-right">128 m²</td>
              </tr>
              <tr className="border-b" style={{ borderColor: "#eee" }}>
                <td className="py-1">Baujahr</td>
                <td className="py-1 text-right">1994</td>
              </tr>
              <tr className="border-b" style={{ borderColor: "#eee" }}>
                <td className="py-1">Energieklasse</td>
                <td className="py-1 text-right">D</td>
              </tr>
              <tr>
                <td className="py-1">Provision</td>
                <td className="py-1 text-right">3,57 %</td>
              </tr>
            </tbody>
          </table>
          <p
            className="mt-2 border-t border-neutral-150 px-3 py-2 text-[8px] text-neutral-400"
            style={{ borderColor: "#eee", fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Erstellt mit Maklersoftware · Vorlage 08 Standard
          </p>
        </div>
      </div>
    </div>
  );
}
