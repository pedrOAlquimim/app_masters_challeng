import { SignIn, SignOut, User as AvatarUser } from  'phosphor-react'
import { auth } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { Avatar, Container, LinkContainer, LogOutButton, Text } from './styles'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

interface UserInfoProps {
  user: User | null
}

export function UserInfo({ user }: UserInfoProps) {
  const { logout } = useAuth()

  const router = useRouter()

  async function handleSignOut() {
    await logout()
    router.reload()
  }

  return (
    <>
      {!user ? (
        <LinkContainer href={'/auth'}>
          <Text>Fazer Login</Text>
          <SignIn weight='bold' size={20} color='#00DFFF' />
        </LinkContainer>
      ) : (
        <Container>
          <Avatar>
            <AvatarUser size={22} weight='fill' />
          </Avatar>
          <LogOutButton onClick={() => handleSignOut()}>
            <SignOut weight='bold' size={20} />
          </LogOutButton>
        </Container>
      )}     
    </>
  )
}