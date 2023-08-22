import { createContext, useState, useContext, ReactNode, useEffect } from 'react'

type User = {
  name: string
}

export type AuthContextType = {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = (): AuthContextType | null => {
  const context = useContext(AuthContext)
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(() => JSON.parse(localStorage.getItem('isAuth') || 'false'))
  const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem('user') || 'null'))

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth))
    localStorage.setItem('user', JSON.stringify(user))
  }, [isAuth, user])

  const value = {
    isAuth,
    setIsAuth,
    user,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
