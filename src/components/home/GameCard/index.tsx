import Image from 'next/image'
import { Rating } from './components/Rating'
import { Footer, GameCardContainer, HeartIcon } from './styles'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { dataBase } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

interface GameCardProps {
  thumbnail: string
  title: string
  genre: string
  gameId: number
}

export function GameCard({ thumbnail, title, genre, gameId }: GameCardProps) {
  const { user } = useAuth()

  const [ rating, setRating ] = useState<number>(0)
  const uuid = uuidv4()

  async function ratingFunc() {
    try {
      if (user?.uid && rating) {
        const ratingCollectionRef = collection(dataBase, "rating")
        const ref = doc(ratingCollectionRef)

        const docData = {
          game_id: String(gameId),
          rating,
          user_id: user.uid
        }

        await setDoc(ref, docData, { merge: true })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    ratingFunc()

  }, [rating])
  
  return (
    <GameCardContainer>
      <Image
        src={thumbnail || ''}
        width={296}
        height={168}
        quality={100}
        alt="Imagem representando o jogo do card"
      />
      <h2>{title}</h2>
      <p>{genre}</p>
      <Footer>
        <Rating
          onSetRating={setRating}
          rating={rating}
          userId={user?.uid}
        />
        <HeartIcon size={26} weight='bold' color='#00875F' />
      </Footer>
    </GameCardContainer>
  )
}
