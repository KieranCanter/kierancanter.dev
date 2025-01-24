/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fgSoft: "var(--fg-soft)",
        fgHard: "var(--fg-hard)",
        fgContrast: "var(--fg-contrast)",

        plush: {
          bg: "var(--plush-bg)",
          fgSoft: "var(--plush-fg-soft)",
          fgHard: "var(--plush-fg-hard)",
          fgContrast: "var(--plush-fg-contrast)",
        },
        sombre: {
          bg: "var(--sombre-bg)",
          fgSoft: "var(--sombre-fg-soft)",
          fgHard: "var(--sombre-fg-hard)",
          fgContrast: "var(--sombre-fg-contrast)",
        },
        brilliant: {
          bg: "var(--brilliant-bg)",
          fgSoft: "var(--brilliant-fg-soft)",
          fgHard: "var(--brilliant-fg-hard)",
          fgContrast: "var(--brilliant-fg-contrast)",
        },
        luminous: {
          bg: "var(--luminous-bg)",
          fgSoft: "var(--luminous-fg-soft)",
          fgHard: "var(--luminous-fg-hard)",
          fgContrast: "var(--luminous-fg-contrast)",
        },

        itemCardBgDark: "var(--item-card-bg-dark)",
        itemCardBgHoverDark: "var(--item-card-bg-hover-dark)",
        itemCardBgLight: "var(--item-card-bg-light)",
        itemCardBgHoverLight: "var(--item-card-bg-hover-light)",
      },
      transitionDuration: {
        '250': '250ms',
      },
      width: {
        'kic-width': "var(--kic-width)",
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