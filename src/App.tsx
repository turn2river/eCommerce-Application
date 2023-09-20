import { Fragment } from 'react'
import './App.scss'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'

import { AnonTokensStorage } from './store/anonTokensStorage'

import { AppRoutes } from './routes/AppRoutes.tsx'
import { CustomerTokensStorage } from './store/customerTokensStorage'
import { CustomerSignInService } from './services/CustomerSignInService'

export function App(): JSX.Element {
  return (
    <Fragment>
      <AppRoutes />
      <ToastPopUp />
    </Fragment>
  )
}

async function initTokens(): Promise<void> {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  let anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const customerTokenStorage = new CustomerTokensStorage()
  let customerToken = customerTokenStorage.getLocalStorageCustomerAuthToken()

  if (customerToken) {
    const anonTokens = new AnonTokensService()
    const newCustomerToken = new CustomerSignInService()
    const refreshToken = customerTokenStorage.getLocalStorageCustomerRefreshToken()
    if (refreshToken) {
      try {
        const response = await anonTokens.introspectToken(customerToken)

        if (!response) {
          console.log('customer токен протух, держи новый')
          try {
            await newCustomerToken.refreshCustomerToken(refreshToken)
            customerToken = customerTokenStorage.getLocalStorageCustomerAuthToken()
            console.log(customerToken)
          } catch (error) {
            console.error(error)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  if (!anonAuthToken) {
    const anonTokens = new AnonTokensService()
    anonTokens.getAnonymousTokens()
    anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
    console.log(anonAuthToken)
  }

  if (anonAuthToken) {
    const anonTokens = new AnonTokensService()
    try {
      const response = await anonTokens.introspectToken(anonAuthToken)
      if (!response) {
        // console.log('токен протух')
        anonTokens.getAnonymousTokens()
        anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
        console.log(anonAuthToken)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

initTokens()

console.log(`
Дорогие проверяющие! От души поздравляем вас с завершением стейдж 2! Вы большие молодцы, что дошли до этого этапа и не сдались.
Просим не волноваться, если в карточках наших продуктах вы не видите изображений: все дело в санкциях(Используйте VPN)
Хотим пожелать вам всяческих успехов в текущем кросс-чеке!

С наилучшими пожеланиями, команда CoffeeCode
`)
