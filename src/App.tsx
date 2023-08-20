/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import { Fragment } from 'react'
import { Header } from './components'
import { AnonTokensStorage } from './models/AnonTokensStorage.ts'
import { getCustomerToken } from './services/customerLogin.ts'
import { getRefreshToken } from './services/refreshToken'
import { getCategories } from './services/viewCategories'
import './App.scss'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { getAnonymousToken } from './services/anonUserAuth.ts'
import { LogInInputsInterface } from './models/LogInInputsInterface.ts'
import { LoginForm } from './components/LoginForm/LoginForm.tsx'

const anonTokensStorage = new AnonTokensStorage()
export const anonUserAuthToken = anonTokensStorage.anonAuthToken
export const anonUserRefreshToken = anonTokensStorage.anonRefreshToken

export function App(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <LoginForm />
      <AppRoutes />
    </Fragment>
  )
}

const customerData: LogInInputsInterface = {
  email: 'alice@something.com',
  password: 'alice123',
}
getAnonymousToken()
getCustomerToken(customerData)
getRefreshToken('parfumerie:Hs2lsmw-p0rA2Q4wx7wAo37OHj6dttKdrySjIqmEwY4')
getCategories('QIQgrGqpLLkx0rm47N6hZRIlMzbCo2gT')
