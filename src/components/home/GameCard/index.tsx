import Image from 'next/image'
import { GameCardContainer } from './styles'

interface GameCardProps {
  thumbnail: string
  title: string
  genre: string
}

export function GameCard({ thumbnail, title, genre }: GameCardProps) {
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
    </GameCardContainer>
  )
}
