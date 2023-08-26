import { ToastContainer } from 'react-toastify'
import { Fragment } from 'react'
import { Header } from './components'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { AnonTokensService } from './services/AnonTokensService'
import 'react-toastify/dist/ReactToastify.css'

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        closeOnClick={true}
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </Fragment>
  )
}
const anonTokens = new AnonTokensService()
anonTokens.getAnonymousTokens()
