import { Variants } from './ProductType'

export interface ProductCardPropsInterface {
  key?: string
  productKey?: string
  id?: string
  imageSource: string
  title: string
  description: string
  variants: Variants[]
}
