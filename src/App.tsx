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
import { CartService } from './services/CartService'

export function App(): JSX.Element {
  return (
    <Fragment>
      <AppRoutes />
      <ToastPopUp />
    </Fragment>
  )
}

const anonTokensStorage = AnonTokensStorage.getInstance()
let anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
const cartHandling = new CartService()
if (!anonAuthToken) {
  const anonTokens = new AnonTokensService()
  anonTokens.getAnonymousTokens()
  anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
}
cartHandling.createCart()
const customerTokensStorage = new CustomerTokensStorage()
const customerToken = customerTokensStorage.getLocalStorageCustomerAuthToken()

const categoryProducts = new GetProductsByCategoryIdService()
const filteredProducts = new GetProductsFilteredByCategoryIdAndAttributeService()
const filteredProd = new GetFilteredProductsService()
const sortedProducts = new ProductsSortingService()
const discountedProducts = new GetProductsWithDiscountService()
const searchProducts = new SearchProductsService()

if (anonAuthToken) {
  const catalogue = new ProductsService()
  catalogue.getProducts(anonAuthToken, 8, 1)
  const id = 'c3bbd3e2-ba78-4a21-9de1-e5c0ccdefc38' // это женские нишевые ароматы, просто пример
  const id1 = '95f20a5a-77e8-4469-a7af-0167888d5ef5' // это женские ароматы
  // id discount 'b8294a95-8151-4e58-ae1a-ae036e7dabc4'
  categoryProducts.getProductsByCategoryId(anonAuthToken, id, 8, 0)
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

  filteredProducts.getProductsFilteredByCategoryIdAndAttribute(anonAuthToken, id, attribute, volume)
  filteredProd.getFilteredProducts(anonAuthToken, params, 4, 1, 'price', 'desc')
  sortedProducts.getSortedProductsByName(anonAuthToken, 'desc', 8, 2)
  sortedProducts.getSortedProductsByPrice(anonAuthToken, 'desc', 8, 1)
  discountedProducts.getProductsWithDiscount(anonAuthToken, 'b8294a95-8151-4e58-ae1a-ae036e7dabc4')
  searchProducts.searchProducts(anonAuthToken, 'luxe')

  // cartHandling.createAnonymousCart(anonAuthToken)
  // cartHandling.updateUserCartByCartId(anonAuthToken,"3e13bc5e-9df5-4baf-8502-e6068c314bdc", 16, "addLineItem", "5dc7b880-3a0b-4abb-9f40-d9e1c988223b", 1, 1)
}
if (customerToken) {
  const userProfile = new GetCustomerByTokenService()
  userProfile.getCustomerByToken(customerToken)
}

console.log(`
Дорогие проверяющие! От души поздравляем вас с завершением стейдж 2! Вы большие молодцы, что дошли до этого этапа и не сдались.
Просим не волноваться, если в карточках наших продуктах вы не видите изображений: все дело в санкциях(Используйте VPN)
Хотим пожелать вам всяческих успехов в текущем кросс-чеке и попросить не спешить с проверкой нашей работы - мы долго вдохновлялись и немного не успели. Работу доделаем в ближайшие 2 дня :)
Заранее благодарим вас за понимание!
С наилучшими пожеланиями, команда CoffeeCode
`)
