/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import { Fragment } from 'react'
import { Header } from './components'
import { AnonTokensStorage } from './models/AnonTokensStorage.ts'
import { getCustomerToken } from './services/customerAuth'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'

// import {inputsList} from './models/InputsList'
// import { InputValues } from './models/yupType'

import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { getAnonymousToken } from './services/anonUserAuth.ts'

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
getCustomerToken()
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('s6vlQPAaj94OGsoY2bhXDRqyM6DxnP4-')
