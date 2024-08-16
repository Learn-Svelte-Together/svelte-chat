/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        onAccent: 'var(--color-onAccent)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
      },
    },
  }
}

