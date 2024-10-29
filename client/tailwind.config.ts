import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0 4px 4px 0px rgba(0, 0, 0, 0.40)',
        '3xl': '0 4px 10px 0px rgba(0, 0, 0, 0.10)',
        '4xl': '4px 4px 6px 1px rgba(0, 0, 0, 0.25)',
        "5xl": "0 2px 2px 1px rgba(0, 0, 0, 0.25)",
        "list-select": "0 1px 2px 1px rgba(0, 0, 0, 0.25)"
      },
      colors: {
        blue: {
          50: '#E6EFF7',
          100: '#B1CDE5',
          200: '#8BB4D8',
          300: '#5592C7',
          400: '#5F8FD3',
          500: '#025DAB',
          600: '#02559C',
          700: '#014279',
          800: '#01335E',
          900: '#012748',
        },
        secondaryBlue: {
          50: '#E6EDF3',
          100: '#B0C6D9',
          200: '#8AAAC6',
          300: '#5484AD',
          400: '#336C9D',
          500: '#004784',
          600: '#004178',
          700: '#00325E',
          800: '#002749',
          900: '#001E37',
        },
        green: {
          50: '#FFFFFF',
          100: '#FCFDFD',
          150: '#F5F6F6',
          200: '#F0F1F1',
          250: '#D9DCDD',
          300: '#BFC5C6',
          400: '#8C9699',
          450: '#59676B',
          500: '#455459',
          600: '#26383E',
          700: '#1F3137',
          800: '#14282E',
          900: '#00151C',
        },
        yellow: {
          200: '#FFEFCE',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
