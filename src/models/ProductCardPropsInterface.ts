import { MasterVariant, Variants } from '../services/GetProductByIdService'

export interface ProductCardPropsInterface {
  imageSource: string
  title: string
  description: string
  variants: Variants[] | MasterVariant
}
