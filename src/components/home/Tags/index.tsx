import { Tag } from "./components/Tag"
import { TagsContainer } from "./styles"

interface TagsProps {
  selectedGenre: string
  onSelectedGenres: (data: string) => void
  filteredGenres: string[]
}

export function Tags({ selectedGenre, onSelectedGenres, filteredGenres }: TagsProps) {
  return (
    <TagsContainer>
      <Tag
        active={selectedGenre === ''}
        onClick={() => {
          onSelectedGenres('')
        }}
      >
        Tudo
      </Tag>
      {filteredGenres.map((genre, i) => {
        return (
          <Tag
            key={i}
            active={selectedGenre === genre}
            onClick={() => onSelectedGenres(genre)}
          >
            {genre}
          </Tag>
        )
      })}
    </TagsContainer>
  )
}