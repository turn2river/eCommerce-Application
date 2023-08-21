/* eslint-disable import/no-cycle */
import { Fragment } from 'react'
import { Header } from './components'
import { AnonTokensStorage } from './models/AnonTokensStorage'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { getAnonymousToken } from './services/anonUserAuth'

const anonTokensStorage = new AnonTokensStorage()
export const anonUserAuthToken = anonTokensStorage.anonAuthToken
export const anonUserRefreshToken = anonTokensStorage.anonRefreshToken

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <AppRoutes />
    </Fragment>
  )
}

getAnonymousToken()
