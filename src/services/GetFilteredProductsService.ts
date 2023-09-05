/* eslint-disable no-param-reassign */
import axios from 'axios'

export class GetFilteredProductsService {
  public async getFilteredProducts(
    token: string,
    { categoriesList = [], attributesList = [], priceList }: IFilteredProducts,
    limit: number,
    page: number,
  ): Promise<FilteredProductsData> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const categoriesFilters = this.getCategoriesListFilters(categoriesList)
    const attributesFilters = this.getAttributeListFilters(attributesList)
    const pricesFilters = this.getPriceFilters(priceList)

    const allParams: string[] = [categoriesFilters, attributesFilters, pricesFilters]
    const removeEmpty = allParams.filter((param) => !!param)

    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?${removeEmpty.join(
      '&',
    )}limit=${limit}&offset=${page * limit}`

    const response = await axios.get(url, { headers })
    // console.log(response.data.results)
    return response.data.results
  }

  private getCategoriesListFilters(categoriesList: string[]): string {
    if (!categoriesList.length) {
      return ''
    }

    const idList = categoriesList.map((id) => `"${id}"`)
    const categoryFilters = `categories.id: ${idList.join(', ')}`

    return `filter=${categoryFilters}`
  }

  private getAttributeListFilters(attributeRecordList: Record<string, string>[]): string {
    if (!attributeRecordList.length) {
      return ''
    }

    const attributeFilters = attributeRecordList.reduce((acc, element, index) => {
      const values = Object.entries(element).flat()

      if (index === attributeRecordList.length - 1) {
        acc += `${values[0]}:${values[1]}`

        return acc
      }

      acc += `${values[0]}:${values[1]}&`

      return acc
    }, '')

    return `filter=variants.attributes.${attributeFilters}`
  }

  private getPriceFilters(pricesFilter?: PriceType): string {
    if (!pricesFilter) {
      return ''
    }

    if (!pricesFilter.max || !pricesFilter.min) {
      return ''
    }

    return `filter=variants.price.centAmount:range(${pricesFilter.min} to ${pricesFilter.max})`
  }
}

interface IFilteredProducts {
  categoriesList?: string[]
  attributesList?: { [key: string]: string }[]
  priceList?: PriceType
}

type PriceType = {
  min: number
  max: number
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
