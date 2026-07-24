import { ImageResponse } from "next/og";

/**
 * Site-weites OG-Image (Muster aus dem Riegel-Projekt): Wordmark als Text,
 * Kernsatz, Footer-Zeile. Satori-Default-Schrift — Fraunces ist hier tabu
 * (kein Font-Loading nötig, Text bleibt robust).
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
          backgroundColor: "#1A0404",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(247,233,154,0.10), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#F7E99A",
          }}
        >
          beuwy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#FFFDF3",
            }}
          >
            Der Kunde ruft Sie an.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#F7E99A",
            }}
          >
            Nicht umgekehrt.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#C2B89F" }}>
          Digitale Vertriebssysteme · Finance &amp; Real Estate · beuwy.com
        </div>
      </div>
    ),
    size,
  );
}
