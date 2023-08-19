/* eslint-disable import/extensions */
import { Fragment } from 'react'
import { Header, RegistrationForm } from './components'
import { AnonTokensStorage } from './models/AnonTokensStorage.ts'
import { getCustomerToken } from './services/customerAuth'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'

// import {inputsList} from './models/InputsList'
// import { InputValues } from './models/yupType'

import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <RegistrationForm />
      <AppRoutes />
    </Fragment>
  )
}
const anonTokensStorage = new AnonTokensStorage()
export const anonUserAuthToken = anonTokensStorage.anonAuthToken
export const anonUserRefreshToken = anonTokensStorage.anonRefreshToken

getCustomerToken()
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('PskMUM-2819KZO4qNrReLWW7iZwldoAC')
