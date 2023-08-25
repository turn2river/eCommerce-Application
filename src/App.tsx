import { Fragment } from 'react'
import { Header } from './components'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { GetAnonTocken } from './services/getAnonTokens'

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <AppRoutes />
    </Fragment>
  )
}
const anonTokens = new GetAnonTocken()
anonTokens.getAnonymousTokens()
