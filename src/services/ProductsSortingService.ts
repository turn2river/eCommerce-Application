import axios from 'axios'

export class ProductsSortingService {
  public async getSortedProductsByName(
    token: string,
    order: string,
    limit: number,
    page: number,
    filter = '',
  ): Promise<FilteredProductsData> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?${filter}limit=${limit}&offset=${
      page * limit
    }&sort=name.en-us ${order}`

    const response = await axios.get(url, { headers })
    console.log(response.data.results)
    return response.data.results
  }

  public async getSortedProductsByPrice(
    token: string,
    order: string,
    limit: number,
    page: number,
    filter = '',
  ): Promise<FilteredProductsData> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?${filter}limit=${limit}&offset=${
      page * limit
    }&sort=price ${order}`

    const response = await axios.get(url, { headers })
    console.log(response.data.results)
    return response.data.results
  }
}
interface FilteredProductsData {
  limit: number
  offset: number
  count: number
  total: number
  results: ProductResult[]
  facets?: Record<string, unknown>
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
