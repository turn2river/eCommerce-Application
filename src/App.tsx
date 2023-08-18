/* eslint-disable import/extensions */
import React from 'react'
import * as Yup from 'yup'
import './App.scss'
import { Header } from './components'
import { getAnonymousToken } from './services/anonUserAuth'
import { getCustomerToken } from './services/customerAuth'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'

// import {inputsList} from './models/InputsList'
// import { InputValues } from './models/yupType'
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm'

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <RegistrationForm />
      <div className="app">This is our react application</div>
    </React.Fragment>
  )
}
getAnonymousToken()
getCustomerToken()
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('PskMUM-2819KZO4qNrReLWW7iZwldoAC')
