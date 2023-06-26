import { ButtonHTMLAttributes, useState } from 'react'
import { CategoriesContainer } from './styles'

type CategoriesProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export function Categories({ active, ...props }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const allActive = selectedCategory === null

  return (
    <CategoriesContainer>
      <button {...props}>Tudo</button>
      {genres.map((genre) => {
        return <button key={genre.genre}>{genre.genre}</button>
      })}
    </CategoriesContainer>
  )
}
