import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About } from '../pages/About/About.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { Registration } from '../pages/Registration/Registration.tsx'
import { RootLayout } from '../layouts/RootLayout.tsx'
import { useAuth, AuthContextType } from '../store/AuthContext.tsx'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.tsx'
import { MainLayout } from '../layouts/MainLayout.tsx'
import { Main } from '../pages/Main/Main.tsx'
import { ProductDetails } from '../pages/ProductDetails/ProductDetails.tsx'

export const AppRoutes = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth } = auth as AuthContextType

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="about" element={<About />} />
        {isAuth ? <Route path="/login" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login />} />}
        {isAuth ? (
          <Route path="/registration" element={<Navigate to="/" />} />
        ) : (
          <Route path="/registration" element={<Registration />} />
        )}
        <Route path="/*" element={<PageNotFound />}></Route>
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}
