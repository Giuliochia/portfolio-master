import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sfondi principali charcoal/antracite
        background: {
          DEFAULT: "#121214",
          deep: "#0b0b0c",
          elevated: "#1a1a1e",
        },
        // Superfici glassmorphism
        glass: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.07)",
          border: "rgba(255,255,255,0.08)",
          "border-hover": "rgba(212,175,55,0.4)",
        },
        // Accenti oro satinato/champagne
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8cc6a",
          dim: "rgba(212,175,55,0.15)",
          glow: "rgba(212,175,55,0.25)",
        },
        // Accenti verde smeraldo
        emerald: {
          DEFAULT: "#10b981",
          dim: "rgba(16,185,129,0.15)",
          glow: "rgba(16,185,129,0.2)",
        },
        // Testo
        text: {
          primary: "#f0f0f2",
          secondary: "#8a8a9a",
          muted: "#505060",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "gold-glow": "0 0 24px rgba(212,175,55,0.15), 0 0 48px rgba(212,175,55,0.05)",
        "emerald-glow": "0 0 24px rgba(16,185,129,0.15)",
      },
      animation: {
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)",
        "radial-emerald": "radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.08) 0%, transparent 50%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
