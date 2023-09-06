import axios from 'axios'

export class SearchProductsService {
  public async searchProducts(token: string, keyword: string): Promise<FilteredProductsData> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?text.en-us=${keyword}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.results)
    return response.data
  }
}

interface FilteredProductsData {
  limit: number
  offset: number
  count: number
  total: number
  results: ProductResult[]
  facets: Record<string, unknown>
}

interface ProductResult {
  id: string
  version: number
  productType: {
    typeId: string
    id: string
  }
  name: {
    [locale: string]: string
  }
  description: {
    [locale: string]: string
  }
  categories: {
    typeId: string
    id: string
  }[]
  categoryOrderHints: Record<string, unknown>
  slug: {
    [locale: string]: string
  }
  metaTitle: {
    [locale: string]: string
  }
  metaDescription: {
    [locale: string]: string
  }
  variants: ProductVariant[]
  masterVariant: ProductVariant
  searchKeywords: Record<string, unknown>
  hasStagedChanges: boolean
  published: boolean
  key: string
  priceMode: string
  createdAt: string
  lastModifiedAt: string
}

interface ProductVariant {
  attributes: {
    name: string
    value: number[]
  }[]
  assets: unknown[]
  images: {
    url: string
    dimensions: {
      w: number
      h: number
    }
  }[]
  prices: ProductPrice[]
  key: string
  id: number
}

interface ProductPrice {
  id: string
  value: {
    type: string
    currencyCode: string
    centAmount: number
    fractionDigits: number
  }
  key: string
  discounted: {
    value: {
      type: string
      currencyCode: string
      centAmount: number
      fractionDigits: number
    }
    discount: {
      typeId: string
      id: string
    }
  }
}
