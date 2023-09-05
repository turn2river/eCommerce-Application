<<<<<<< HEAD
import { Variants } from './ProductType'
=======
import { Variants, MasterVariant } from './ProductType'
>>>>>>> 693cc34 (fix: issue with click on category)

export interface ProductCardPropsInterface {
  key?: string
  productKey?: string
  id?: string
  imageSource: string
  title: string
  description: string
  variants: Variants[]
}
