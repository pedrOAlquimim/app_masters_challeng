import { GameController } from 'phosphor-react'
import { Container, GameCardContainer, Header, TagsContainer } from './styles'
import { TextInput } from '@/components/home/TextInput'
import { GameCard } from '@/components/home/GameCard'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Loader } from '@/components/Loader'
import { Error } from '@/components/Error'
import { AxiosResponse, isAxiosError } from 'axios'
import { Tag } from '@/components/home/Tag'

interface GameProps {
  id: number
  title: string
  thumbnail: string
  genre: string
}

export default function Home() {
  const [games, setGames] = useState<GameProps[]>([])
  const [filteredGenres, setFilteredGenres] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('')

  const filteredGames = games.filter((game) => {
    return (
      game.title.toLowerCase().includes(search.toLowerCase()) &&
      game.genre.includes(selectedGenre)
    )
  })

  useEffect(() => {
    async function main() {
      try {
        const response: AxiosResponse<GameProps[]> = await api.get('/data')
        setGames(response.data)

        const dataGenres = response.data.map((game: GameProps) => {
          return game.genre
        })
        setFilteredGenres(
          dataGenres.filter((genres, i) => {
            return dataGenres.indexOf(genres) === i
          }),
        )
      } catch (error) {
        if (isAxiosError(error) && errorStatus === null) {
          setErrorStatus(error.response!.status)
        }
      } finally {
        setIsLoading(false)
      }
    }
    main()
  }, [errorStatus])

  if (isLoading) return <Loader size={25} color="#E1E1E6" loading={isLoading} />
  if (errorStatus !== null) return <Error status={errorStatus} />
  return (
    <Container>
      <Header>
        <p>
          <GameController size={32} color="#00DFFF" />
          Games
        </p>

        <TextInput
          placeholder="Busque um jogo"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </Header>

      <TagsContainer>
        <Tag
          active={selectedGenre === ''}
          onClick={() => {
            setSelectedGenre('')
          }}
        >
          Tudo
        </Tag>
        {filteredGenres.map((genre, i) => {
          return (
            <Tag
              key={i}
              active={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </Tag>
          )
        })}
      </TagsContainer>

      <GameCardContainer>
        {filteredGames.map((game) => {
          return (
            <GameCard
              key={game.id}
              genre={game.genre}
              thumbnail={game.thumbnail}
              title={game.title}
            />
          )
        })}
      </GameCardContainer>
    </Container>
  )
}
