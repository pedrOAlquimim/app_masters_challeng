import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { GamesContextProvider } from '@/contexts/GamesContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <GamesContextProvider>
        <Component {...pageProps} />
      </GamesContextProvider>
    </AuthContextProvider>
  )
}
