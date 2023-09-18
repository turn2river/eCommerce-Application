import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

export type CataloguePageContextType = {
  currentPage: string
  setCurrentPage: Dispatch<SetStateAction<string>>
  categoriesID: string
  setCategoriesID: Dispatch<SetStateAction<string>>
  cartListLength: number
  setCartListLength: Dispatch<SetStateAction<number>>
  cartListTrigger: number
  setCartListTRigger: Dispatch<SetStateAction<number>>
}

export const CataloguePageContext = createContext<CataloguePageContextType | string>('')

export const useCataloguePage = (): CataloguePageContextType | string => {
  const context = useContext(CataloguePageContext)
  return context
}

export const CataloguePageProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>('catalogue')
  const [categoriesID, setCategoriesID] = useState<string>('0e007442-ed84-4e4f-ab3b-3c14191462c7')
  const [cartListLength, setCartListLength] = useState<number>(0)
  const [cartListTrigger, setCartListTRigger] = useState<number>(0)

  const value = {
    currentPage,
    setCurrentPage,
    categoriesID,
    setCategoriesID,
    cartListLength,
    setCartListLength,
    cartListTrigger,
    setCartListTRigger,
  }

  return <CataloguePageContext.Provider value={value}>{children}</CataloguePageContext.Provider>
}
