import { Navigate, Route, Routes } from 'react-router-dom'
import { Main } from '../pages/Main/Main.tsx'
import { About } from '../pages/About/About.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { Registration } from '../pages/Registration/Registration.tsx'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.tsx'
import { ProtectedRoutes } from './ProtectedRoutes.tsx'
import { Profile } from '../pages/Profile/Profile.tsx'
import { AuthContextType, useAuth } from '../store/AuthContext.tsx'
import { ProductPage } from '../pages/ProductPage/ProductPage.tsx'

export const AppRoutes = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth } = auth as AuthContextType

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      {isAuth ? <Route path="/login" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login />} />}
      {isAuth ? (
        <Route path="/registration" element={<Navigate to="/" />} />
      ) : (
        <Route path="/registration" element={<Registration />} />
      )}
      <Route path="/catalog/:name" element={<ProductPage />} />
      <Route path="/*" element={<PageNotFound />}></Route>
    </Routes>
  )
}
