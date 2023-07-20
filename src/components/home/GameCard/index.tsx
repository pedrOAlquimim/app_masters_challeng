import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rating } from './components/Rating';
import { useAuth } from '@/hooks/useAuth';
import { dataBase } from '@/lib/firebase';
import { Heart } from 'phosphor-react'
import { FavoriteButton, Footer, GameCardContainer } from './styles';
import { useGames } from '@/hooks/useGames';
import {
	collection,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';

interface GameCardProps {
	thumbnail: string;
	title: string;
	genre: string;
	gameId: number;
}

export function GameCard({ thumbnail, title, genre, gameId }: GameCardProps) {
	const { user } = useAuth();
  const {
    ratingGames,
    setRatingGames,
    favoriteGames,
    setFavoriteGames,
  } = useGames()
  
	const [rating, setRating] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const router = useRouter()
  

  async function getFavoriteGameById() {
    const favoriteGame = favoriteGames.find((game) => {
      return game.game_id === String(gameId)
    })

    setIsFavorite(favoriteGame ? favoriteGame.is_favorite : false)
  }

  function handleSetFavorie() {
    if (user?.uid) {
      // await getFavoriteGameById()
      
    } else {
      router.push('/auth')
    }
  }

	useEffect(() => {
    async function ratingFunc() {
      try {
        if (user?.uid && rating) {
          const ratingCollectionRef = collection(dataBase, 'rating');
          const ref = doc(ratingCollectionRef);
  
          const ratedGame =  ratingGames.find((game) => {
            return game.game_id === String(gameId)
          })
  
          const newRatingGames = ratingGames.map((game) => {
            if (game.game_id === String(gameId)) {
              game.rating = rating
            }
  
            return game
          })
  
          setRatingGames(newRatingGames)
  
          if (ratedGame) {
            const docToUpdate = doc(dataBase, 'rating', ratedGame.id);
            await updateDoc(docToUpdate, { rating });
            
          } else {
            const docData = {
              rating,
              user_id: user.uid,
              game_id: String(gameId),
            };
  
            await setDoc(ref, docData, { merge: true });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

		ratingFunc();
    
    async function getRatedGamesByGameId() {
      const ratedGame =  ratingGames.find((game) => {
        return game.game_id === String(gameId)
      })
  
      setRating(ratedGame ? ratedGame.rating : 0)
    }
    if (user) {

      getRatedGamesByGameId()
    }

	}, [rating])

  const favoriteFunc = useCallback(async () => {
    if (user?.uid && isFavorite) {
      try {
        const ratingCollectionRef = collection(dataBase, 'favorites');
        const ref = doc(ratingCollectionRef);
  
        const favoriteGame =  favoriteGames.find((game) => {
          return game.game_id === String(gameId)
        })
  
        const newFavoriteGame = favoriteGames.map((game) => {
          if (game.game_id === String(gameId)) {
            game.is_favorite = isFavorite
          }
      
          return game
        })
  
        setFavoriteGames(newFavoriteGame)
  
        if (favoriteGame) {
          const docToUpdate = doc(dataBase, 'favorites', favoriteGame.id);
          await updateDoc(docToUpdate, { is_favorite: isFavorite });
          
        } else {
          const docData = {
            is_favorite: isFavorite,
            user_id: user.uid,
            game_id: String(gameId),
          };
  
          await setDoc(ref, docData, { merge: true });
        }
  
        
      } catch (error) {
        console.error(error);
      }
    } 
  }, [])

  useEffect(() => {
    favoriteFunc()

  }, [favoriteFunc])

	return (
		<GameCardContainer>
			<Image
				src={thumbnail || ''}
				width={296}
				height={168}
				quality={100}
				alt='Imagem representando o jogo do card'
			/>
			<h2>{title}</h2>
			<p>{genre}</p>
			<Footer>
				<Rating onSetRating={setRating} rating={rating} userId={user?.uid} />

        <FavoriteButton favorite={isFavorite} onClick={handleSetFavorie}>
				  <Heart size={26} weight={isFavorite ? 'fill' : 'bold'} />
        </FavoriteButton>
			</Footer>
		</GameCardContainer>
	);
}
