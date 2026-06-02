/* ====================================================================
   AISA Brand — Tailwind preset  ·  Ryan Alexander Black  ·  v1.0.0
   --------------------------------------------------------------------
   Usage (tailwind.config.js):
       const aisa = require('./path/to/tailwind.brand.js')
       module.exports = { presets: [aisa], content: [...] }

   Enable class-based dark mode in your config:  darkMode: 'class'
   Then use semantic classes (bg-bg, text-fg, border-border, bg-accent…)
   which follow the theme automatically, OR raw scales (bg-green-brand,
   text-ink-900) when you need a fixed colour.

   Pairs with brand-tokens.css — semantic classes read the CSS variables,
   so the SAME stylesheet drives light/dark. Source of truth: brand.json
   ==================================================================== */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // — Raw palette (fixed, theme-independent) —
        green: {
          brand: '#11D38B',
          bright: '#2EE6A6',
          deep: '#047857',
          electric: '#00E58F', // alternate — not active
        },
        ink: {
          50: '#F5F8F6',
          100: '#E6EBE8',
          200: '#CDD6D1',
          300: '#9FB0A8',
          400: '#5C6B64',
          500: '#3A4742',
          600: '#2A3530',
          700: '#1E2723',
          800: '#121917',
          900: '#0A0F0D',
        },

        // — Semantic (theme-aware via CSS variables from brand-tokens.css) —
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        border: 'var(--color-border)',
        fg: 'var(--color-text)',
        'fg-muted': 'var(--color-text-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          solid: 'var(--color-accent-solid)',
          contrast: 'var(--color-accent-contrast)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },

      fontFamily: {
        display: ["'Sora'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ["'Inter'", 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['2rem', { lineHeight: '2.375rem' }],
        '3xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['4rem', { lineHeight: '4.25rem', letterSpacing: '-0.02em' }],
      },

      borderRadius: { sm: '6px', md: '10px', lg: '16px', xl: '24px', full: '9999px' },

      boxShadow: {
        sm: '0 1px 2px 0 rgba(10,15,13,0.06)',
        md: '0 4px 16px -2px rgba(10,15,13,0.10)',
        lg: '0 12px 32px -8px rgba(10,15,13,0.18)',
        glow: '0 0 0 1px rgba(17,211,139,0.30), 0 8px 32px -6px rgba(17,211,139,0.35)',
      },

      ringColor: { DEFAULT: 'var(--color-focus)' },
    },
  },
}
