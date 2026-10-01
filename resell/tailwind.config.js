/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D0B",
        ivory: "#F5F1E8",
        // Accent is a CSS variable so the champagne/lime toggle can swap it live.
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(48px, 7vw, 88px)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h1: ["clamp(36px, 5vw, 64px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(24px, 3vw, 32px)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(20px, 2.5vw, 28px)", { lineHeight: "1.2" }],
        mono: ["13px", { lineHeight: "1.7" }],
      },
      letterSpacing: { eyebrow: "0.4em" },
      maxWidth: { content: "1280px" },
      borderRadius: { card: "16px" },
      spacing: { section: "clamp(80px, 10vw, 160px)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%,-6%,0) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
