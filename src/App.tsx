import { Fragment } from 'react'
import './App.scss'
import { AnonTokensService } from './services/AnonTokensService'
import { ToastPopUp } from './components/ToastPopUp/ToastPopUp.tsx'

import { AnonTokensStorage } from './store/anonTokensStorage'

import { AppRoutes } from './routes/AppRoutes.tsx'

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
      console.log('токен протух, держи новый')
      anonTokens.getAnonymousTokens()
      anonAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
      console.log(anonAuthToken)
    }
  } catch (error) {
    console.error(error)
  }
}

console.log(`
Дорогие проверяющие! От души поздравляем вас с завершением стейдж 2! Вы большие молодцы, что дошли до этого этапа и не сдались.
Просим не волноваться, если в карточках наших продуктах вы не видите изображений: все дело в санкциях(Используйте VPN)
Хотим пожелать вам всяческих успехов в текущем кросс-чеке и попросить не спешить с проверкой нашей работы - мы долго вдохновлялись и немного не успели. Работу доделаем в ближайшие 2 дня :)
Заранее благодарим вас за понимание!
С наилучшими пожеланиями, команда CoffeeCode
`)
