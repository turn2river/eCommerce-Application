import { Route, Routes } from 'react-router-dom'
import { Main } from '../pages/Main/Main.tsx'
import { About } from '../pages/About/About.tsx'
import { Login } from '../pages/Login/Login.tsx'
import { Registration } from '../pages/Registrarion/Registration.tsx'
import { Page404 } from '../pages/page404/page404.tsx'

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/*" element={<Page404 />}></Route>
    </Routes>
  )
}
