import { createStitches } from '@stitches/react'

export const { styled, getCssText, globalCss, theme, keyframes } =
  createStitches({
    theme: {
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },

      fontWeights: {
        regular: '400',
        bold: '700',
      },

      colors: {
        white: '#fff',

        blue200: '#00DFFF',

        red400: '#e86a51',

        green500: '#00B37E',
        green600: '#00875F',

        gray100: '#E1E1E6',
        gray200: '#A9A9B2',
        gray300: '#323238',
        gray800: '#202024',
        gray900: '#121214',
      },
    },
  })
