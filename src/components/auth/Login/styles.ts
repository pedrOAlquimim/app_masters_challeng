import { styled } from "../../../../stitches.config";

export const Container = styled('div', {
  maxWidth: 400,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem'
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.125rem',

  h2: {
    color: '$white',
    fontSize: '2rem',
    fontWeight: '$bold',
  },

  p: {
    color: '$gray200',
    fontSize: '$lg',
  }
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }
})

export const Text = styled('p', {
  color: '$white',
  marginBottom: '0.75rem',
})

export const Input = styled('div', {
  width: '100%',
  backgroundColor: '$gray800',
  borderRadius: '4px',
  boxSizing: 'border-box',
  padding: '0.75rem 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  svg: {
    color: '$gray200'
  },

  input: {
    color: '$white',
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
})

export const SubmitButton = styled('button', {
  all: 'unset',
  textAlign: 'center',
  borderRadius: '4px',
  padding: '0.75rem',
  cursor: 'pointer',
  background: '$blue200',

  color: '#000',
  fontWeight: '$bold',
})

export const Footer = styled('footer', {
  display: 'flex',
  justifyContent: 'center',

  button: {
    all: 'unset',
    textDecoration: 'underline',
    color: '$gray200',
    fontSize: '$sm',
    cursor: 'pointer',
  }
})

export const FormError = styled('p', {
  color: '$red400',
  fontSize: '$sm',
})
