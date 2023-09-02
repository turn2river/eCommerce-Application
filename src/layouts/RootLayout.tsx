import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

export const RootLayout = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  )
}
