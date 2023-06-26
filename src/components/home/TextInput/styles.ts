import { styled } from '../../../../stitches.config'

export const TextInputContainer = styled('div', {
  maxWidth: '27.063rem',
  width: '100%',
  backgroundColor: '$gray800',
  borderRadius: '4px',
  boxSizing: 'border-box',
  border: '2px solid $gray300',
  padding: '0.875rem 1.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  '&:has(input:focus)': {
    borderColor: '$gray200',
  },

  '@media (max-width:609px)': {
    maxWidth: '100%',
    marginTop: '1.25rem',
  },

  input: {
    color: '$gray100',
    background: 'transparent',
    width: '100%',
    border: 0,

    '&:focus': {
      outline: 0,
    },

    '&::placeholder': {
      color: '$gray200',
    },
  },

  svg: {
    color: '$gray300',
  },
})
