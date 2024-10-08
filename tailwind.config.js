/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fgSoft: "var(--fg-soft)",
        fgHard: "var(--fg-hard)",
        fgContrast: "var(--fg-contrast)",
        
        toneColor: "var(--tone-color)",
        trefoil1: "var(--trefoil1)",
        trefoil2: "var(--trefoil2)",
        trefoil3: "var(--trefoil3)",

        accent1: "var(--accent1)",
        accent2: "var(--accent2)",
        accent3: "var(--accent3)",

        plush: {
          bg: "var(--plush-bg)",
          fgSoft: "var(--plush-fg-soft)",
          fgHard: "var(--plush-fg-hard)",
          fgContrast: "var(--plush-fg-contrast)",

          accent1: "var(--plush-fg-contrast)",
          accent2: "var(--plush-fg-contrast)",
          accent3: "var(--plush-fg-contrast)",
        },
        sombre: {
          bg: "var(--sombre-bg)",
          fgSoft: "var(--sombre-fg-soft)",
          fgHard: "var(--sombre-fg-hard)",
          fgContrast: "var(--sombre-fg-contrast)",

          accent1: "var(--sombre-fg-contrast)",
          accent2: "var(--sombre-fg-contrast)",
          accent3: "var(--sombre-fg-contrast)",
        },
        brilliant: {
          bg: "var(--brilliant-bg)",
          fgSoft: "var(--brilliant-fg-soft)",
          fgHard: "var(--brilliant-fg-hard)",
          fgContrast: "var(--brilliant-fg-contrast)",

          accent1: "var(--brilliant-accent1)",
          accent2: "var(--brilliant-accent2)",
          accent3: "var(--brilliant-accent3)",
        },
        luminous: {
          bg: "var(--luminous-bg)",
          fgSoft: "var(--luminous-fg-soft)",
          fgHard: "var(--luminous-fg-hard)",
          fgContrast: "var(--luminous-fg-contrast)",

          accent1: "var(--luminous-accent1)",
          accent2: "var(--luminous-accent2)",
          accent3: "var(--luminous-accent3)",
        }
      },
      width: {
        'kic-width': "var(--kic-width)"
      },
      fontFamily: {
        'spectral-sc': ['Spectral SC', 'Georgia', 'Times New Roman', 'serif'],
        'ibm-plex-mono': ['IBM Plex Mono', 'Monospace', 'Courier New', 'Courier'],
        'ibm-plex-sans': ['IBM Plex Sans', 'Arial', 'Helvetica', 'Arial Unicode MS'],
        'ibm-plex-serif': ['IBM Plex Serif', 'Georgia', 'Times New Roman','serif'],
      },
    },
  },
  plugins: [],
}