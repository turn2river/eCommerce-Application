import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import './index.scss'

if (document.getElementById('root') !== null) {
  const root = document.getElementById('root') as Element
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>,
  )
}
