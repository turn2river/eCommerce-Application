import React from 'react'
import './App.scss'
import { Header } from './components'
import { getAnonymousToken } from './services/anonUserAuth'
import { getCustomerToken } from './services/customerAuth'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <div className="app">This is our react application</div>
    </React.Fragment>
  )
}
getAnonymousToken()
getCustomerToken()
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('C5CrfIHMqMFHJjJbLdD2Lo5MH02nOJOl')
