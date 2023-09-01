import { MasterVariant, Variants } from '../services/GetProductByIdService'

export interface ProductCardPropsInterface {
  id?: string
  imageSource: string
  title: string
  description: string
  variants: Variants[] | MasterVariant
}
