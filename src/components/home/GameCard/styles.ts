import { styled } from '../../../../stitches.config'
import { Heart } from 'phosphor-react'

export const GameCardContainer = styled('div', {
  maxWidth: '20rem',
  width: '100%',
  background: '$gray800',
  padding: '0.75rem',
  borderRadius: '10px',

  h2: {
    marginTop: '0.5rem',
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    color: '$green500',
    fontSize: '$xl',
    marginTop: '0.5rem',
  },
})

export const Footer = styled('footer', {
  paddingTop: '0.25rem',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
})

export const HeartIcon = styled(Heart, {
  cursor: 'pointer',
})