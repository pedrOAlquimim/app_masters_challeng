import { keyframes, styled } from '../../../../../../stitches.config'
import { Star } from "phosphor-react"

export const Input = styled('input', {
  display: 'none'
})

const infiniteUpAndDown = keyframes({
  '0%': {
    transform: 'translateY(-3px)',
  },

  '50%': {
    transform: 'translateY(-7px)',
  },

  '100%': {
    transform: 'translateY(-3px)',
  },
})

export const StarIcon = styled(Star, {
  cursor: 'pointer',
  transition: 'color 200ms',

  '&:hover': {
    animationName: infiniteUpAndDown,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-out',
    transition: 'all 0.3s',
  }
})