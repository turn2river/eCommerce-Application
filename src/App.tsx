import { Fragment } from 'react'
import { Header } from './components'
import { AnonTokensStorage } from './models/AnonTokensStorage'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <AppRoutes />
    </Fragment>
  )
}

export const anonTokensStorage = new AnonTokensStorage()
