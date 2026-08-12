import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // beuwy brand — Neutral-Grau statt Bordeaux, Gelb bleibt Akzent
        bg: {
          base: "#0A0A0A",
          raised: "#111111",
          elevated: "#171717", // nur Innenflächen (DESIGN-DIRECTION 2.3)
          hover: "#222222",    // Hover-/Border-Ton
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
        // shadcn-Token (CSS-Variablen aus globals.css @layer base)
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "#FFFDF3",
        },
      },
      fontFamily: {
        // headlines: Helvena; Body: Inter (--font-sans)
        display: ["var(--font-helvena)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
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
