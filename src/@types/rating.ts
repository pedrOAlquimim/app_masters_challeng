export interface RatingProps {
  user_id: string | undefined
  rating: number
  onSetRating: (data: number) => void
}