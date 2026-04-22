/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#0A0A0A',
        paper: '#FAFAF9',
        muted: '#6B7280',
        border: '#E5E5E3',
        'nav-active': '#0A0A0A',
        'nav-inactive': '#FFFFFF',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'note': '2px 2px 0px 0px rgba(0,0,0,0.15)',
        'note-active': '2px 2px 0px 0px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
