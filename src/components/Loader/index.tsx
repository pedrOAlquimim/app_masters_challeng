import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { LoaderContainer } from './styles'

interface LoaderProps {
  size: number
  loading: boolean
  color: string
}

export function Loader({ size, loading, color }: LoaderProps) {
  return (
    <LoaderContainer>
      <ClimbingBoxLoader size={size} color={color} loading={loading} />
    </LoaderContainer>
  )
}
