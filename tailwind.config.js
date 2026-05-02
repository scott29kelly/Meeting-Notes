/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-rule': 'var(--paper-rule)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'surface-aged': 'var(--surface-aged)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        'focus-ring': 'var(--focus-ring)',
      },
      fontFamily: {
        sans: ['"Geist"', '"Geist Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': 'var(--text-2xs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        180: '180ms',
      },
    },
  },
  plugins: [],
};
