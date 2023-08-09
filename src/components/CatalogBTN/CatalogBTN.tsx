import { useState } from 'react'
import classes from './CatalogBTN.module.scss'
import classitem from '../CatalogItem/CatalogItem.module.scss'
import { CatalogItem } from '../CatalogItem/CatalogItem.tsx'

interface ICatalogBTN extends React.ComponentPropsWithRef<'div'> {
  children: string
}

export const CatalogBTN = ({ children, ...props }: ICatalogBTN): JSX.Element => {
  const [catalogButtonStatus, setCatalogButtonStatus] = useState(false)
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const categories = ['For men', 'For women']

  const clickOnCatalogBTN = (): void => {
    setCatalogButtonStatus((active) => !active)
  }

  const clickOnCatalogItem = (index: number): void => {
    setActiveElement(index)
    console.log(activeElement)
  }

  const buttonClassName = catalogButtonStatus ? `${classes.button} ${classes.button__active}` : classes.button

  return (
    <div className={classes.container}>
      <div className={buttonClassName} {...props} onClick={clickOnCatalogBTN}>
        <div className={classes['button-icon']}></div>
        <span className={classes['button-caption']}>{children}</span>
      </div>
      {catalogButtonStatus ? (
        <div className={classes.container__wrapper}>
          {categories.map((category, index) => (
            <CatalogItem
              key={index}
              className={`${activeElement === index ? `${classitem.item} ${classitem.item__active}` : classitem.item}`} // Adjust the class names
              onClick={(): void => clickOnCatalogItem(index)}>
              {category}
            </CatalogItem>
          ))}
        </div>
      ) : null}
    </div>
  )
}
