import React from 'react'
import './App.scss'
import { Header } from './components'

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <div className="app">This is our react application</div>
    </React.Fragment>
  )
}
