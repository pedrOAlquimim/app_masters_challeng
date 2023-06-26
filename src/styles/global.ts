import { globalCss } from '../../stitches.config'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    fontFamily: 'Roboto, sans-serif',
    background: '$gray900',
    '-webkit-font-smoothing': 'antialiased',
  },

  a: {
    color: 'inherit',
  },

  button: {
    cursor: 'pointer',
  },

  'button, input, textarea': {
    fontFamily: 'inherit',
  },
})
