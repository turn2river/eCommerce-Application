import React from 'react'
import './App.scss'
import { CatalogButton, Header, DownloadButton } from './components'

export function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <DownloadButton>Download</DownloadButton>
      <CatalogButton>Catalog</CatalogButton>
      <div className="app">This is our react application</div>
    </React.Fragment>
  )
}
