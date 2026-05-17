/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0D1B35',
          card: '#0F2040',
          elevated: '#142447',
        },
        accent: {
          teal: '#00E5CC',
          purple: '#A78BFA',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        border: 'rgba(255,255,255,0.08)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
