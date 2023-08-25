import { useState } from 'react'
import {
  container,
  button,
  button_icon,
  button_caption,
  button_active,
  container_wrapper,
} from './CatalogButton.module.scss'
import { item, item_active } from '../CatalogItem/CatalogItem.module.scss'
import { CatalogItem } from '../CatalogItem/CatalogItem.tsx'
import { ICatalogButton } from '../../models/CatalogButtonInterface'
import { MainCategories } from '../../models/MainCategories'

export const CatalogButton = ({ children, ...props }: ICatalogButton): JSX.Element => {
  const [catalogButtonStatus, setCatalogButtonStatus] = useState(false)
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const MainCategoriesValues = Object.values(MainCategories)

  const clickOnCatalogButton = (): void => {
    setCatalogButtonStatus((active) => !active)
  }

  const clickOnCatalogItem = (index: number): void => {
    setActiveElement(index)
    setCatalogButtonStatus((active) => !active)
  }

  const buttonClassName = catalogButtonStatus ? `${button} ${button_active}` : button

  return (
    <div className={container}>
      <div className={buttonClassName} {...props} onClick={clickOnCatalogButton}>
        <div className={button_icon}></div>
        <span className={button_caption}>{children}</span>
      </div>
      {catalogButtonStatus ? (
        <div className={container_wrapper}>
          {MainCategoriesValues.map((value, index): JSX.Element => {
            return (
              <CatalogItem
                key={index}
                className={`${activeElement === index ? `${item} ${item_active}` : item}`}
                onClick={(): void => clickOnCatalogItem(index)}>
                {value}
              </CatalogItem>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
