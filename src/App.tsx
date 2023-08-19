/* eslint-disable import/extensions */
import React from 'react'
import './App.scss'
import { Header, RegistrationForm } from './components'
import { getAnonymousToken } from './services/anonUserAuth'
import { getCustomerToken } from './services/customerAuth'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'

// import {inputsList} from './models/InputsList'
// import { InputValues } from './models/yupType'

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <RegistrationForm />
    </React.Fragment>
  )
}
getAnonymousToken()
getCustomerToken()
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('PskMUM-2819KZO4qNrReLWW7iZwldoAC')
