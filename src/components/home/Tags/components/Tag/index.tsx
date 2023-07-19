import { ButtonHTMLAttributes, ReactNode } from 'react'
import { TagContainer } from './styles'

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  active: boolean
}

export function Tag({ children, active, ...props }: TagProps) {
  return (
    <TagContainer active={active} {...props}>
      {children}
    </TagContainer>
  )
}
