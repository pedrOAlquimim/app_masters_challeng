import { styled } from '../../../stitches.config'

export const Container = styled('main', {
  maxWidth: 1040,
  width: '100%',
  margin: '0 auto',
  padding: '0 1.25rem',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '4.5rem',
  marginBottom: '2.5rem',

  '@media (max-width:609px)': {
    display: 'block',
  },

  '> p': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '$gray100',
    fontSize: '$2xl',
  },
})

export const GameCardContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  overflowY: 'auto',
  marginTop: '3rem',
  paddingBottom: 40,

  '&::-webkit-scrollbar': {
    display: 'none',
  },
})
