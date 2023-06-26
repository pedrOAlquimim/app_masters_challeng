import { keyframes, styled } from '../../../stitches.config'

const infiniteUpAndDown = keyframes({
  '0%': {
    transform: 'translateY(0px)',
  },

  '50%': {
    transform: 'translateY(40px)',
  },

  '100%': {
    transform: 'translateY(0)',
  },
})

export const ErrorContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '30px',
  width: '100vw',
  marginTop: '4.5rem',

  p: {
    color: '$gray200',
    fontSize: '$lg',
  },

  svg: {
    animationName: infiniteUpAndDown,
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease',
    transition: 'all 0.3s',
  },
})
