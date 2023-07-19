import { styled } from "../../../../stitches.config";
import Link from 'next/link'

const container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
})

export const LinkContainer = styled(Link, container)

export const Container = styled('div', container)

export const Text = styled('p', {
  fontSize: '$md',
  fontWeight: '$bold',
  color: '$gray100'
})

export const Avatar = styled('div', {
  width: '40px',
  height: '40px',
  borderRadius: '999px',
  background: '$gray800',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    color: '$gray200',
  }
})

export const LogOutButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  color: '$red400',
})