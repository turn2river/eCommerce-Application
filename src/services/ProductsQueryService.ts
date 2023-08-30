import axios from 'axios'

export class ProductsService {
  public async getProducts(token: string, limit: number, page: number): Promise<ProductsData> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/products?limit=${limit}&offset=${
      page * limit
    }`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    console.log(response.data)

    return response.data
  }
}

type ProductsData = {
  limit: number
  offset: number
  count: number
  total: number
  results: Result[]
}

interface Result {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: CreatedBy
  productType: ProductType
  masterData: MasterData
  key: string
  priceMode: string
  lastVariantId: number
}

interface LastModifiedBy {
  isPlatformClient: boolean
  user: User
}

interface CreatedBy {
  isPlatformClient: boolean
  user: User
}

interface User {
  typeId: string
  id: string
}

interface ProductType {
  typeId: string
  id: string
}

interface MasterData {
  current: Current
  staged: Staged
  published: boolean
  hasStagedChanges: boolean
}

interface Current {
  name: Translations
  description: Translations
  categories: Category[]
  categoryOrderHints: Record<string, string>
  slug: Translations
  metaTitle: Translations
  metaDescription: Translations
  masterVariant: MasterVariant
  variants: Variant[]
  searchKeywords: Translations
}

interface Staged {
  name: Translations
  description: Translations
  categories: Category[]
  categoryOrderHints: Record<string, string>
  slug: Translations
  metaTitle: Translations
  metaDescription: Translations
  masterVariant: MasterVariant
  variants: [] // Replace with the actual type if needed
  searchKeywords: Translations
}

interface Translations {
  [locale: string]: string
}

interface Category {
  typeId: string
  id: string
}

interface MasterVariant {
  id: number
  prices: Price[]
  images: Image[]
  attributes: [] // Replace with the actual type if needed
  assets: [] // Replace with the actual type if needed
}

interface Price {
  id: string
  value: {
    type: string
    currencyCode: string
    centAmount: number
    fractionDigits: number
  }
  key: string
}

interface Image {
  url: string
  dimensions: {
    w: number
    h: number
  }
}
interface Variant {
  id: number
  key: string
  prices: Price[]
  images: []
  attributes: [] // Replace  with the actual type if needed
  assets: [] // Replace  with the actual type if needed
}

interface Price {
  id: string
  value: {
    type: string
    currencyCode: string
    centAmount: number
    fractionDigits: number
  }
  key: string
}
