/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        accent: "var(--color-accent)",
        "accent-secondary": "var(--color-accent-secondary)",
        "accent-tertiary": "var(--color-accent-tertiary)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        destructive: "var(--color-destructive)",
      },
      fontFamily: {
        heading: ["Orbitron", "Share Tech Mono", "monospace"],
        body: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        accent: ["Share Tech Mono", "monospace"],
      },
      boxShadow: {
        neon: "var(--shadow-neon)",
        "neon-sm": "var(--shadow-neon-sm)",
        "neon-lg": "var(--shadow-neon-lg)",
        "neon-secondary": "var(--shadow-neon-secondary)",
        "neon-tertiary": "var(--shadow-neon-tertiary)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};
