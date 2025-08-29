/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* matrix-green-20 */
        input: "var(--color-input)", /* elevated-surface */
        ring: "var(--color-ring)", /* matrix-green */
        background: "var(--color-background)", /* rich-dark-foundation */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* matrix-green */
          foreground: "var(--color-primary-foreground)", /* rich-dark-foundation */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* deep-space-blue */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* clear-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* deep-space-blue */
          foreground: "var(--color-muted-foreground)", /* muted-lavender */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* signature-gold */
          foreground: "var(--color-accent-foreground)", /* rich-dark-foundation */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* deep-space-blue */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated-surface */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* matrix-green */
          foreground: "var(--color-success-foreground)", /* rich-dark-foundation */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-amber */
          foreground: "var(--color-warning-foreground)", /* rich-dark-foundation */
        },
        error: {
          DEFAULT: "var(--color-error)", /* clear-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* elevated-surface */
        'matrix-glow': "var(--color-matrix-glow)", /* matrix-green-10 */
        'category-gold': "var(--color-category-gold)", /* signature-gold */
        'category-red': "var(--color-category-red)", /* clear-red */
        'category-blue': "var(--color-category-blue)", /* signature-blue */
        'category-pink': "var(--color-category-pink)", /* signature-pink */
        'category-green': "var(--color-category-green)", /* matrix-green */
        'category-silver': "var(--color-category-silver)", /* signature-silver */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'matrix': '0 2px 8px var(--color-shadow-dark), 0 0 16px var(--color-shadow-primary)',
        'matrix-lg': '0 8px 24px var(--color-shadow-dark), 0 0 32px var(--color-shadow-primary)',
        'glow': '0 0 20px var(--color-matrix-glow)',
        'glow-lg': '0 0 40px var(--color-matrix-glow)',
      },
      animation: {
        'matrix-float': 'matrixWave 2s ease-in-out infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        matrixWave: {
          '0%, 100%': { 
            transform: 'translate3d(0, 0, 0) scale(1)',
            opacity: '0.1'
          },
          '50%': { 
            transform: 'translate3d(10px, -10px, 0) scale(1.05)',
            opacity: '0.2'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        'matrix': '8px',
      },
      transitionTimingFunction: {
        'matrix': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}