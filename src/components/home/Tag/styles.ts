import { styled } from '../../../../stitches.config'

export const TagContainer = styled('button', {
  all: 'unset',
  border: '1px solid $gray200',
  borderRadius: '999px',
  padding: '4px 16px',
  color: '$gray200',
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        borderColor: '$green600',
        fontWeight: '$bold',
        background: '$green600',
        color: '$gray100',
      },
    },
  },
})
