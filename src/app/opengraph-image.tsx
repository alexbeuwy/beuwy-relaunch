import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Site-weites OG-Image — Light Makler Style: weißer Grund, echte Helvena,
 * Pastellgelb als einziger Akzent auf dem betonten Wort. Kein Verlauf,
 * kein Glow, keine Fläche außer der einen Akzent-Pille.
 *
 * Satori (unter next/og) kann weder WOFF2 noch Variable Fonts laden — die
 * Site-Schrift liegt aber nur als variable helvena.woff2 vor (layout.tsx).
 * Deshalb zwei statische Gewichts-Instanzen einmalig mit fonttools
 * (varLib.instancer) aus der Variable-Font erzeugt und als eigene .ttf
 * neben ihr abgelegt — kein Laufzeit-Risiko, kein neues npm-Package.
 */
export const alt = "beuwy — Immobilienmarketing für führende Makler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#161613";
const INK_MUTED = "#5D5D58";
const AKZENT = "#F3E27F";

export default async function Image() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/helvena-og-800.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/helvena-og-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: AKZENT,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Helvena Display",
              fontSize: 26,
              letterSpacing: -0.5,
              color: INK,
            }}
          >
            beuwy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Helvena Display",
              fontSize: 60,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: INK,
            }}
          >
            Immobilienmarketing für
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Helvena Display",
                fontSize: 60,
                lineHeight: 1.08,
                letterSpacing: -2,
                color: INK,
              }}
            >
              führende&nbsp;
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Helvena Display",
                fontSize: 60,
                lineHeight: 1.08,
                letterSpacing: -2,
                color: INK,
                backgroundColor: AKZENT,
                padding: "2px 20px",
                borderRadius: 14,
              }}
            >
              Makler.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Helvena Body",
            fontSize: 24,
            color: INK_MUTED,
          }}
        >
          Marke · Website · Automatisierung — beuwy.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Helvena Display", data: display, weight: 800, style: "normal" },
        { name: "Helvena Body", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
