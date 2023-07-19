import { ReactNode, createContext, useEffect, useState } from 'react'
import { auth, dataBase } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { 
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

interface AuthContextType {
  user: User | null
  logout: () => void
  createUser: (name: string, email: string, password: string) => void
  signIn: (email: string, password: string) => void
}

export const UserContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser ] = useState<User | null>(null)

  async function createUser(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password).then(async (response) => {
      const ref = doc(dataBase, "users", response.user.uid)
      await setDoc(ref, { name })
    })
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      console.log(user)
    })
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      signIn,
      createUser,
      logout
    }}>
      {children}
    </UserContext.Provider>
  )
}