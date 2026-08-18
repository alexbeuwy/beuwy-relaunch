import { ImageResponse } from "next/og";

/**
 * Site-weites OG-Image — Riso-Welt: flacher Ultramarin-Grund (die
 * Sektionfarbe des Finales), Schnee-Text, das eine betonte Wort in
 * Berg-Orange. Kein Verlauf, kein Glow — flache Fläche wie im Rest der
 * Seite. Satori-Default-Schrift — Fraunces ist hier tabu (kein
 * Font-Loading nötig, Text bleibt robust).
 */
export const alt = "beuwy — Digitale Vertriebssysteme für Finance & Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0C4BC3",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#FFFDF6",
          }}
        >
          beuwy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#FFFDF6",
            }}
          >
            Neukunden nach{" "}
            <span style={{ color: "#F5A066", marginLeft: 14 }}>System.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,253,246,0.7)" }}>
          Marke · Werbeanzeigen · Vertriebssystem — beuwy.com
        </div>
      </div>
    ),
    size,
  );
}
