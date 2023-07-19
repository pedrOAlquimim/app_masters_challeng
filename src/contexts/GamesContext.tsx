import { api } from '@/lib/axios'
import { AxiosResponse, isAxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface GamesContextType {
  games: GameProps[]
  filteredGenres: string[]
  isLoading: boolean
  errorStatus: number | null
}

export const GamesContext = createContext({} as GamesContextType)

interface GamesContextProviderProps {
  children: ReactNode
}

interface GameProps {
  id: number
  title: string
  thumbnail: string
  genre: string
}

export function GamesContextProvider({ children }: GamesContextProviderProps) {
  const [games, setGames] = useState<GameProps[]>([])
  const [filteredGenres, setFilteredGenres] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)

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
          if (isAxiosError(error)) {
            setErrorStatus(error.response!.status)
          }
        } finally {
          setIsLoading(false)
        }
      }
      main()
  }, [])

  return (
    <GamesContext.Provider value={{
      games,
      filteredGenres,
      isLoading,
      errorStatus
    }}>
      {children}
    </GamesContext.Provider>
  )
}