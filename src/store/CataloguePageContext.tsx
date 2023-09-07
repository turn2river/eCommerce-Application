import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

export type CataloguePageContextType = {
  currentPage: string
  setCurrentPage: Dispatch<SetStateAction<string>>
  categoriesID: string
  setCategoriesID: Dispatch<SetStateAction<string>>
}

export const CataloguePageContext = createContext<CataloguePageContextType | string>('')

export const useCataloguePage = (): CataloguePageContextType | string => {
  const context = useContext(CataloguePageContext)
  return context
}

export const CataloguePageProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>('catalogue')
  const [categoriesID, setCategoriesID] = useState<string>('0e007442-ed84-4e4f-ab3b-3c14191462c7')

  const value = {
    currentPage,
    setCurrentPage,
    categoriesID,
    setCategoriesID,
  }

  return <CataloguePageContext.Provider value={value}>{children}</CataloguePageContext.Provider>
}
