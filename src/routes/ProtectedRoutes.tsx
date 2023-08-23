import { Navigate } from 'react-router-dom'
import { Fragment } from 'react'
import { AuthContextType, useAuth } from '../store/AuthContext.tsx'

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const auth = useAuth()
  const { isAuth } = auth as AuthContextType

  if (!isAuth) {
    return <Navigate to="/" />
  }

  return <Fragment>{children}</Fragment>
}
