/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma palette
        deep: "#133630",       // primary dark green (page bg)
        teal: "#2b544d",       // secondary dark teal-green
        sage: "#5f6c38",       // olive/sage CTA block
        brown: "#5a3d2b",      // CTA button brown
        ink: "#1a1a1a",        // footer near-black
        gold: "#d4af37",       // gold accent
        // Aliases retained from old design
        primary: "#133630",
        accent: "#d4af37",
        background: "#F2F0E9",
        dark: "#1a1a1a",
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        drama: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        'figma-display': '6.4px',
        'figma-title': '4.5px',
      },
    },
  },
  plugins: [],
}
