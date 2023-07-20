import { ReactNode, createContext, useEffect, useState } from 'react'
import { AxiosResponse, isAxiosError } from 'axios'
import { api } from '@/lib/axios'
import { CollectionReference, collection, getDocs } from 'firebase/firestore'
import { dataBase } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface RatingDocument {
  user_id: string;
  game_id: string;
  rating: number;
}

interface RatedGameProps extends RatingDocument {
  id: string
}

interface FavoritesDocument {
  user_id: string;
  is_favorite: boolean
  game_id: string;
}

interface FavoritesProps extends FavoritesDocument {
  id: string
}

interface GameProps {
  id: number
  title: string
  thumbnail: string
  genre: string
}

interface GamesContextType {
  games: GameProps[]
  filteredGenres: string[]
  isLoading: boolean
  errorStatus: number | null
  ratingGames: RatedGameProps[]
  favoriteGames: FavoritesProps[]
  getGameRated: () => Promise<void>
  setRatingGames: (data: RatedGameProps[]) => void
  setFavoriteGames: (data: FavoritesProps[]) => void
}

export const GamesContext = createContext({} as GamesContextType)

interface GamesContextProviderProps {
  children: ReactNode
}


export function GamesContextProvider({ children }: GamesContextProviderProps) {
  const { user } = useAuth()

  const [games, setGames] = useState<GameProps[]>([])
  const [filteredGenres, setFilteredGenres] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [ratingGames, setRatingGames] = useState<RatedGameProps[]>([])
  const [favoriteGames, setFavoriteGames] = useState<FavoritesProps[]>([])

  async function getGameRated() {
    try {
      const ratingCollectionRef = collection(
        dataBase,
        'rating'
      ) as CollectionReference<RatingDocument, RatingDocument>;
  
      let data = await getDocs(ratingCollectionRef);
  
      const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as RatedGameProps[];
  
      const filteredDocByUserId = docs.filter((game) => {
        return game.user_id === user?.uid
      })

      setRatingGames(filteredDocByUserId)
    } catch (error) {
      console.error(error)
    }
  }

  async function getFavorites() {
    try {
      const ratingCollectionRef = collection(
        dataBase,
        'favorites'
      ) as CollectionReference<FavoritesDocument, FavoritesDocument>;
  
      let data = await getDocs(ratingCollectionRef);
  
      const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FavoritesProps[];
  
      const filteredDocByUserId = docs.filter((game) => {
        return game.user_id === user?.uid
      })

      setFavoriteGames(filteredDocByUserId)

    } catch (error) {
      console.error(error)
    }
  }

  async function getGames() {
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

  useEffect(() => {
    if (user) {
      getGameRated()
      getFavorites()
    }
    getGames()

  }, [user])

  return (
    <GamesContext.Provider value={{
      games,
      filteredGenres,
      isLoading,
      errorStatus,
      ratingGames,
      favoriteGames,
      setRatingGames,
      setFavoriteGames,
      getGameRated,
    }}>
      {children}
    </GamesContext.Provider>
  )
}