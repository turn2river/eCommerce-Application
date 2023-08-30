import { Fragment } from 'react'
import { Header } from './components'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'
import { ProductsService } from './services/ProductsQueryService'
import { AnonTokensStorage } from './store/anonTokensStorage'

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <AppRoutes />
      <ToastPopUp />
    </Fragment>
  )
}
const anonTokens = new AnonTokensService()
anonTokens.getAnonymousTokens()

const anonTokensStorage = AnonTokensStorage.getInstance()
const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
if (anonUserAuthToken) {
  const catalogue = new ProductsService()
  catalogue.getProducts(anonUserAuthToken, 6, 2)
}
