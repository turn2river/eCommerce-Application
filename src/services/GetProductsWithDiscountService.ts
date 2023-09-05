import axios from 'axios'

export class GetProductsWithDiscountService {
  public async getProductsWithDiscount(token: string, discountID: string): Promise<DiscountedProductsData> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-discounts/${discountID}`

    const response = await axios.get(url, { headers })
    // console.log(response.data.description)
    return response.data
  }
}
export interface DiscountedProductsData {
  id: string
  version: number
  versionModifiedAt: string
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  createdBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  value: {
    type: string
    permyriad: number
  }
  predicate: string
  name: {
    [key: string]: string
  }
  description: {
    [key: string]: string
  }
  validFrom: string
  validUntil: string
  isActive: boolean
  sortOrder: string
  references: string[]
  attributeTypes: string
  key: string
}
export enum DiscountIds {
  SummerSale = 'b8294a95-8151-4e58-ae1a-ae036e7dabc4',
  LuxeSale = '09471838-b30a-4231-815f-1e88c1d4d2c2',
}
