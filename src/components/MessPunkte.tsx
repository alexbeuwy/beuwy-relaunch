/* ────────────────────────────────────────────────────────────────
   Messpunkte des Live-Checks als echte Datenvisualisierung.

   Form: horizontale Balken auf EINER gemeinsamen 0–100-Skala mit
   Referenzmarke bei 70 („ab hier tragfähig"). Ohne diese Skala ist
   ein Balken nur ein Streifen — man sieht Länge, aber nicht, ob sie
   reicht.

   Status wird NIE nur über Farbe codiert: jeder Messpunkt trägt
   zusätzlich ein Textlabel (stark / brauchbar / schwach). Farbe ist
   die zweite Codierung, nicht die einzige.
   ──────────────────────────────────────────────────────────────── */

export type MessPunkt = { id: string; label: string; score: number };

const REFERENZ = 70;

function statusLabel(score: number): string {
  if (score < 40) return "schwach";
  if (score < REFERENZ) return "brauchbar";
  return "stark";
}

function statusTier(score: number): "low" | "mid" | "high" {
  if (score < 40) return "low";
  if (score < REFERENZ) return "mid";
  return "high";
}

export function MessPunkte({ punkte }: { punkte: MessPunkt[] }) {
  if (punkte.length === 0) return null;

  return (
    <figure className="mess-figur">
      <figcaption className="mess-kopf">
        {/* Zahl kommt aus den Daten — die Überschrift darf nie mehr
            behaupten, als die Liste zeigt (Demo-Modus liefert weniger). */}
        <span className="t-label">
          {punkte.length} {punkte.length === 1 ? "Messpunkt" : "Messpunkte"}
        </span>
        <span className="t-data mess-legende">
          Referenz: {REFERENZ} von 100
        </span>
      </figcaption>

      <div className="mess-skala" aria-hidden>
        <span className="mess-skala-marke" style={{ left: "0%" }}>
          0
        </span>
        <span className="mess-skala-marke" style={{ left: `${REFERENZ}%` }}>
          {REFERENZ}
        </span>
        <span className="mess-skala-marke mess-skala-ende">100</span>
      </div>

      <ul className="mess-liste">
        {punkte.map((p) => (
          <li key={p.id} className="mess-zeile" data-tier={statusTier(p.score)}>
            <span className="mess-label t-small">{p.label}</span>
            <span className="mess-spur">
              {/* Referenzlinie liegt unter dem Balken, nicht darüber */}
              <span className="mess-referenz" style={{ left: `${REFERENZ}%` }} aria-hidden />
              <span className="mess-balken" style={{ width: `${p.score}%` }} />
            </span>
            <span className="mess-wert tnum t-data">{p.score}</span>
            <span className="mess-status t-data">{statusLabel(p.score)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
