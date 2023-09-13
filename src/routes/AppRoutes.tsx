import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About } from '../pages/About/About.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { Registration } from '../pages/Registration/Registration.tsx'
import { RootLayout } from '../layouts/RootLayout.tsx'
import { useAuth, AuthContextType } from '../store/AuthContext.tsx'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.tsx'
import { Main } from '../pages/Main/Main.tsx'
import { ProductPage } from '../pages/ProductPage/ProductPage.tsx'
import { Catalog } from '../pages/Catalog/Catalog.tsx'
import { CatalogLayout } from '../layouts/CatalogLayout.tsx'
import { Profile } from '../pages/Profile/Profile.tsx'
import { ProtectedRoutes } from './ProtectedRoutes.tsx'
import { Cart } from '../pages/Cart/Cart.tsx'

export const AppRoutes = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth } = auth as AuthContextType

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="catalogue" element={<CatalogLayout />}>
          <Route index element={<Catalog />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="about" element={<About />} />
        {isAuth ? <Route path="login" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login />} />}
        {isAuth ? (
          <Route path="registration" element={<Navigate to="/" />} />
        ) : (
          <Route path="registration" element={<Registration />} />
        )}
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}
