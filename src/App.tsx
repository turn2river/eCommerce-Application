import { Fragment } from 'react'
import './App.scss'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'
import { ProductsService } from './services/ProductsQueryService'
import { AnonTokensStorage } from './store/anonTokensStorage'
import { GetCustomerByTokenService } from './services/GetCustomerByTokenService'
import { CustomerTokensStorage } from './store/customerTokensStorage'
import { GetProductsByCategoryIdService } from './services/GetProductsByCategoryIdService'
import { GetProductsFilteredByCategoryIdAndAttributeService } from './services/GetProductsFilteredByCategoryIdAndAttributeService'
import { GetFilteredProductsService } from './services/GetFilteredProductsService'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { ProductsSortingService } from './services/ProductsSortingService'
import { GetProductsWithDiscountService } from './services/GetProductsWithDiscountService'
import { SearchProductsService } from './services/SearchProductsService'

export function App(): JSX.Element {
  return (
    <Fragment>
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
const filteredProd = new GetFilteredProductsService()
const sortedProducts = new ProductsSortingService()
const discountedProducts = new GetProductsWithDiscountService()
const searchProducts = new SearchProductsService()

if (anonUserAuthToken) {
  const catalogue = new ProductsService()
  catalogue.getProducts(anonUserAuthToken, 8, 1)
  const id = 'c3bbd3e2-ba78-4a21-9de1-e5c0ccdefc38' // это женские нишевые ароматы, просто пример
  const id1 = '95f20a5a-77e8-4469-a7af-0167888d5ef5' // это женские ароматы
  // id discount 'b8294a95-8151-4e58-ae1a-ae036e7dabc4'
  categoryProducts.getProductsByCategoryId(anonUserAuthToken, id)
  const volume = '50'
  const volume1 = '30'
  const attribute = 'VolumeEDP'
  const attribute1 = 'VolumeEDT'
  const priceRange = {
    min: 5500,
    max: 10000,
  }
  const params = {
    categoriesList: [id, id1],
    attributesList: [{ [attribute]: volume }, { [attribute1]: volume1 }] as { [key: string]: string }[],
    priceList: priceRange,
  }
  filteredProducts.getProductsFilteredByCategoryIdAndAttribute(anonUserAuthToken, id, attribute, volume)
  filteredProd.getFilteredProducts(anonUserAuthToken, params, 4, 1, 'price', 'desc')
  sortedProducts.getSortedProductsByName(anonUserAuthToken, 'desc', 8, 2)
  sortedProducts.getSortedProductsByPrice(anonUserAuthToken, 'desc', 8, 1)
  discountedProducts.getProductsWithDiscount(anonUserAuthToken, 'b8294a95-8151-4e58-ae1a-ae036e7dabc4')
  searchProducts.searchProducts(anonUserAuthToken, 'luxe')
}

if (customerToken) {
  const userProfile = new GetCustomerByTokenService()
  userProfile.getCustomerByToken(customerToken)
}
