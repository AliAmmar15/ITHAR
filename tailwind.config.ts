import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        md: '3rem',
        lg: '5rem',
        xl: '7.5rem',
      },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        // Brand palette
        black: '#0B0B0B',
        charcoal: {
          DEFAULT: '#1A1A1A',
          mid: '#252525',
          light: '#2E2E2E',
        },
        gold: {
          DEFAULT: '#B89A67',
          light: '#CEB48A',
          muted: '#8B7355',
          bright: '#D4AF37',
        },
        'off-white': '#EAE2D6',
        cream: '#F5F0E8',
        'warm-gray': '#9B9189',
        stone: '#6B6460',

        // Shadcn compatible tokens
        border: '#252525',
        input: '#252525',
        ring: '#B89A67',
        background: '#0B0B0B',
        foreground: '#EAE2D6',
        primary: {
          DEFAULT: '#B89A67',
          foreground: '#0B0B0B',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          foreground: '#EAE2D6',
        },
        destructive: {
          DEFAULT: '#C0392B',
          foreground: '#EAE2D6',
        },
        muted: {
          DEFAULT: '#252525',
          foreground: '#9B9189',
        },
        accent: {
          DEFAULT: '#1A1A1A',
          foreground: '#EAE2D6',
        },
        popover: {
          DEFAULT: '#1A1A1A',
          foreground: '#EAE2D6',
        },
        card: {
          DEFAULT: '#1A1A1A',
          foreground: '#EAE2D6',
        },
      },

      fontFamily: {
        serif: ['var(--font-cormorant)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        arabic: ['var(--font-noto-arabic)', ...fontFamily.serif],
        mono: ['var(--font-jetbrains)', ...fontFamily.mono],
      },

      fontSize: {
        'display-2xl': ['7.5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },

      letterSpacing: {
        'brand': '0.25em',
        'wide-xl': '0.15em',
        'wide-lg': '0.12em',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },

      borderRadius: {
        lg: '0.125rem',
        md: '0.0625rem',
        sm: '0',
        DEFAULT: '0',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      screens: {
        '3xl': '1920px',
      },

      aspectRatio: {
        'product': '4/5',
        'hero': '16/9',
        'editorial': '3/4',
      },

      backdropBlur: {
        'nav': '20px',
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
    },
  },
  plugins: [animate],
}

export default config
