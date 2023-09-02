/* eslint-disable no-param-reassign */
import axios from 'axios'

export class GetFilteredProductsService {
  public async getFilteredProducts(token: string, params: IFilteredProducts): Promise<FilteredProductsData> {
    let url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?filter=categories.id:"c3bbd3e2-ba78-4a21-9de1-e5c0ccdefc38"`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    if (params.categoriesList && params.attributesList) {
      const categoryFilters = params.categoriesList.map((id) => `categories.id:"${id}"`).join('&')
      const attributeFilters = params.attributesList.reduce((acc, element) => {
        const values = Object.entries(element).flat()
        acc += `variants.attributes.${values[0]}:${values[1]}&`
        return acc
      }, '')
      url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?filter=${categoryFilters}&filter=${attributeFilters}`
    } else if (params.categoriesList) {
      const categoryFilters = params.categoriesList.map((id) => `categories.id:"${id}"`).join('&')
      url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?filter=${categoryFilters}`
    } else if (params.attributesList) {
      const attributeFilters = params.attributesList.reduce((acc, element) => {
        const values = Object.entries(element).flat()
        acc += `variants.attributes.${values[0]}:${values[1]}&`
        return acc
      }, '')
      url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?filter=${attributeFilters}`
    }
    const response = await axios.get(url, { headers })
    console.log(response.data.results)
    return response.data.results
  }
}

interface IFilteredProducts {
  categoriesList?: string[]
  attributesList?: { [key: string]: string }[]
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