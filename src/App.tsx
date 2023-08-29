import { Fragment } from 'react'
import { Header } from './components'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'
import { SelectionProductsQueryService } from './services/SelectionProductsQueryService'
import { AnonTokensStorage } from './store/anonTokensStorage'
import { GetProductByIdService } from './services/GetProductByIdService'

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

const selectionsID = new SelectionProductsQueryService()
if (anonUserAuthToken) {
  selectionsID.getSectionProductsIDs(anonUserAuthToken, 'popular')

  const product = new GetProductByIdService()
  product.getProductById(anonUserAuthToken, 'a9801461-8f2f-4732-b7ae-bab5b069a228')
}
