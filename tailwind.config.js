module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/utils/*.{ts,tsx}',
    ],
    options: {
      // Purge CSS removes these classes somehow
      safelist: [
        'order-first',
        'order-last',
        /tablet(.)*/,
        /laptop(.)*/,
        /desktop(.)*/,
        /highRes(.)*/,
        'tablet:order-first',
        'tablet:order-last',
      ],
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '425px',
        small: '576px',
        tablet: '767px',
        laptop: '1060px',
        desktop: '1280px',
        largeDesktop: '1536px',
        hr: '1920px',
      },
      boxShadow: {
        md: '0px 20px 32px rgba(0, 0, 0, 0.15)',
      },
      listStyleType: {
        square: 'square',
        circle: 'circle',
      },
      colors: {
        gray1: '#222222',
        gray2: '#758393',
        gray3: '#B2BECB',
        secondary: '#F3F5F7',
        purple: '#6F56EE',
        turquoise: '#4E9CAF',
        green1: '#00AF5B',
        green2: '#D0F1E1',
        red: '#EB6969',
        dark: '#24252D',
        'dark-gray1': '#F3F5F7',
        'dark-gray3': '#617183',
        'dark-secondary': '#2A2D3A',
        'dark-green2': '#2A513E',
      },
      fontSize: {
        '3xs': ['10px', '12px'],
        '2xs': ['11px', '14px'],
        xs: ['12px', '16px'],
        sm: ['13px', '16px'],
        md: ['14px', '22px'],
        base: ['16px', '22px'],
        lg: ['18px', '22px'],
        xl: ['22px', '30px'],
        '2xl': ['24px', '34px'],
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      secondary: ['Montserrat', 'ui-serif', 'Georgia'],
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme('colors.gray2'),
          fontSize: theme('fontSize.base')[0],
          p: {
            lineHeight: 1.625,
            marginBottom: '16px',
          },
          'h1,h2,h3,h4,h5,h6': {
            fontFamily: theme('fontFamily.sans').join(', '),
            color: theme('colors.gray1'),
          },
          h2: {
            fontSize: theme('fontSize.lg')[0],
            marginBottom: '20px',
            fontWeight: '700',
          },
          h3: {
            fontSize: theme('fontSize.lg')[0],
            marginBottom: '16px',
            fontWeight: '600',
          },
          'ul, ol': {
            marginLeft: '16px',
            'list-style': 'disc',
            marginBottom: '16px',
          },
          a: {
            color: theme('colors.purple'),
          },
        },
      },
      dark: {
        css: {
          'h1,h2,h3,h4,h5,h6': {
            color: theme('colors.dark-gray1'),
          },
        },
      },
      tablet: {
        css: {
          fontSize: theme('fontSize.base')[0],
        },
      },
      laptop: {
        css: {
          fontSize: theme('fontSize.base')[0],
          h2: {
            fontSize: theme('fontSize.xl')[0],
          },
        },
      },
    }),
  },
  variants: {
    scrollbar: ['dark'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
