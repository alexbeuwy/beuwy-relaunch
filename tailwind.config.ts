import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // beuwy brand
        bg: {
          base: "#1A0404", // page background, slightly darker than #210606
          raised: "#210606", // surface raised (the user's "super dark red BG")
          elevated: "#2A0808", // a touch higher for hover/cards on cards
        },
        ink: {
          // primary brand accent
          yellow: "#F7E99A",
          yellowDim: "#D9CC85",
          yellowSoft: "#F7E99A",
          // text on dark
          cream: "#F2EFE1",
          muted: "#C2B89F",
          dim: "#8A8068",
        },
        line: {
          subtle: "rgba(247,233,154,0.08)",
          medium: "rgba(247,233,154,0.16)",
          strong: "#F7E99A",
        },
        accent: {
          red: "#FF5A67",
        },
      },
      fontFamily: {
        // headlines: Fraunces (the "Frances" the user referred to)
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        // body: Inter
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        // for the editor / code surface
        mono: ["var(--font-jetbrains)", "SFMono-Regular", "ui-monospace", "monospace"],
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
