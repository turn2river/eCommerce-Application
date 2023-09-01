import { Fragment } from 'react'
import { Header } from './components'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'
import { ProductsService } from './services/ProductsQueryService'
import { AnonTokensStorage } from './store/anonTokensStorage'
import { GetCustomerByTokenService } from './services/GetCustomerByTokenService'
import { CustomerTokensStorage } from './store/customerTokensStorage'
import { GetProductsByCategoryIdService } from './services/GetProductsByCategoryIdService'
import { GetProductsFilteredByCategoryIdAndAttributeService } from './services/GetProductsFilteredByCategoryIdAndAttributeService'

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
const customerTokensStorage = new CustomerTokensStorage()
const customerToken = customerTokensStorage.getLocalStorageCustomerAuthToken()

const categoryProducts = new GetProductsByCategoryIdService()
const filteredProducts = new GetProductsFilteredByCategoryIdAndAttributeService()

if (anonUserAuthToken) {
  const catalogue = new ProductsService()
  catalogue.getProducts(anonUserAuthToken, 6, 2)
  const id = 'c3bbd3e2-ba78-4a21-9de1-e5c0ccdefc38' // это женские нишевые ароматы, просто пример
  categoryProducts.getProductsByCategoryId(anonUserAuthToken, id)
  const volume = '50'
  const attribute = 'VolumeEDP'
  filteredProducts.getProductsFilteredByCategoryIdAndAttribute(anonUserAuthToken, id, attribute, volume)
}

if (customerToken) {
  const userProfile = new GetCustomerByTokenService()
  userProfile.getCustomerByToken(customerToken)
}
