import { MagnifyingGlass } from 'phosphor-react'
import { TextInputContainer } from './styles'
import { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string
}

export function TextInput({ placeholder, ...props }: TextInputProps) {
  return (
    <TextInputContainer>
      <input type="search" placeholder={placeholder} {...props} />
      <MagnifyingGlass size={20} />
    </TextInputContainer>
  )
}
