import { Ghost } from 'phosphor-react'
import { ErrorContainer } from './styles'

interface ErrorProps {
  status: number
}

export function Error({ status }: ErrorProps) {
  const errorStatus = [500, 502, 503, 504, 507, 508, 509]
  const error = errorStatus.some((errorStatus) => {
    return status === errorStatus
  })

  return (
    <ErrorContainer>
      {error ? (
        <p>O servidor falhou em responder, tente recarregar a página</p>
      ) : (
        <p>
          O servidor não conseguirá responder por agora, tente voltar novamente
          mais tarde
        </p>
      )}

      <Ghost weight="fill" size={150} color="#f7b602" />
    </ErrorContainer>
  )
}
