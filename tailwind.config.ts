import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // beuwy brand
        bg: {
          base: "#1A0404",     // = brand bordeaux-ink
          raised: "#210606",   // = brand superdark
          elevated: "#2B0808", // nur Innenflächen (DESIGN-DIRECTION 2.3)
          hover: "#3A0808",    // Hover-/Border-Ton
        },
        ink: {
          yellow: "#F7E99A",
          yellowDim: "#D9CC85",
          yellowSoft: "#F7E99A",
          cream: "#FFFDF3",    // = brand cream
          muted: "#C2B89F",
          dim: "#8A8068",
        },
        line: {
          subtle: "rgba(247,233,154,0.08)",
          medium: "rgba(247,233,154,0.16)",
          strong: "#F7E99A",
        },
        accent: {
          red: "#FF5F5F",      // = brand signal
        },
      },
      fontFamily: {
        // headlines: Fraunces, nur als Display >= 32px
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        display: "-0.02em",
        tight: "-0.012em",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      spacing: {
        xs: "6px",
        sm: "14px",
        md: "24px",
        lg: "36px",
        xl: "128px",
      },
      boxShadow: {
        editor: "0 1px 0 rgba(247,233,154,0.04), 0 24px 60px -32px rgba(0,0,0,0.6)",
        pill: "inset 0 0 0 1px rgba(33,6,6,0.3), 0 1px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
