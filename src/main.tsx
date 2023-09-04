import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { App } from './App.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import './index.scss'
import { customTheme } from './utils/CustomTheme.tsx'

if (document.getElementById('root') !== null) {
  const root = document.getElementById('root') as Element
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={customTheme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>,
  )
}
