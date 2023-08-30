import { MasterVariant, Variants } from '../services/GetProductByIdService'

export interface ProductCardPropsInterface {
  imageSource: string
  title: string
  price: string
  variants: Variants[] | MasterVariant
}
