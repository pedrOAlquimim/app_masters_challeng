import { GameController } from 'phosphor-react'
import { TextInput } from '@/components/home/TextInput'
import { GameCard } from '@/components/home/GameCard'
import { useState } from 'react'
import { Loader } from '@/components/Loader'
import { Error } from '@/components/Error'
import { UserInfo } from '@/components/home/UserInfo'
import { Tags } from '@/components/home/Tags'
import { useAuth } from '@/hooks/useAuth'
import { useGames } from '@/hooks/useGames'
import {
  Container,
  GameCardContainer,
  Header
} from './styles'


export default function Home() {
  const { user } = useAuth()
  const {
    games,
    errorStatus,
    filteredGenres,
    isLoading
  } = useGames()

  const [search, setSearch] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')

  const filteredGames = games.filter((game) => {
    return (
      game.title.toLowerCase().includes(search.toLowerCase()) &&
      game.genre.includes(selectedGenre)
    )
  })

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

        <UserInfo user={user} />
      </Header>

      <Tags 
        selectedGenre={selectedGenre}
        onSelectedGenres={setSelectedGenre}
        filteredGenres={filteredGenres}
      />

      <GameCardContainer>
        {filteredGames.map((game) => {
          return (
            <GameCard
              key={game.id}
              gameId={game.id}
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
