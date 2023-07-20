import { useState } from "react"
import { Input, StarIcon } from "./styles"
import { useRouter } from "next/router"

export interface RatingProps {
  userId: string | undefined
  rating: number
  onSetRating: (data: number) => void
}

export function Rating({ userId, onSetRating, rating }: RatingProps ) {
  const [ hover, setHover ] = useState<number>(0)

  const router = useRouter()

  return (
    <div>
      {Array.from({ length: 4 }).map((_, i) => {
        const ratingValue = i + 1
        
        function handleSetRating() {
          if (userId !== undefined) {
            onSetRating(ratingValue)
          } else {
            router.push('/auth')
          }
        }

        return (
          <label key={ratingValue}>
            <Input 
              type="radio" 
              name="ratingStar"
              value={ratingValue}
              onClick={handleSetRating}
            />
            <StarIcon 
              size={22}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              weight={ratingValue <= (hover || rating) ? 'fill' : 'bold'}
              color={ratingValue <= (hover || rating) ? '#D1B137' : '#A9A9B2'}
            />
          </label>
        )
      })}
    </div>
  )
}