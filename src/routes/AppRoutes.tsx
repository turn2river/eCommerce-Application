import { Navigate, Route, Routes } from 'react-router-dom'
import { Main } from '../pages/Main/Main.tsx'
import { About } from '../pages/About/About.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { Registration } from '../pages/Registration/Registration.tsx'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound.tsx'

const isAuth = false // TODO get isAuth from api

export const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/about" element={<About />} />
    {isAuth ? <Route path="/login" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login />} />}
    <Route path="/registration" element={<Registration />} />
    <Route path="/*" element={<PageNotFound />}></Route>
  </Routes>
)
