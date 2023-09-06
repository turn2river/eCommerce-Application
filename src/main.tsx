import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { App } from './App.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import './index.scss'
import { customTheme } from './utils/CustomTheme.tsx'
import { CataloguePageProvider } from './store/CataloguePageContext.tsx'

if (document.getElementById('root') !== null) {
  const root = document.getElementById('root') as Element
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={customTheme}>
        <CataloguePageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CataloguePageProvider>
      </ThemeProvider>
    </React.StrictMode>,
  )
}
