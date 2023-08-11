import React, { useState } from 'react'
import './App.scss'
import { Header, Input } from './components'

export function App(): JSX.Element {
  const [value, setValue] = useState('')

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value)
  }

  return (
    <React.Fragment>
      <Header />
      <Input
        id="email"
        label="Input your email address*"
        placeholder="<E-Mail>"
        value={value}
        onChange={inputHandler}
      />
      <div className="app">This is our react application</div>
    </React.Fragment>
  )
}
