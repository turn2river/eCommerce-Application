/* eslint-disable no-param-reassign */
import axios from 'axios'
import { ProductResult } from './GetProductsByCategoryIdService'

export class GetFilteredProductsService {
  public async getFilteredProducts(
    token: string,
    { categoriesList = [], attributesList = [], priceList }: IFilteredProducts,
    limit: number,
    page: number,
    sortName: string = 'name.en-us',
    order: string = 'asc',
  ): Promise<ProductResult[]> {
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
    )}&limit=${limit}&offset=${page * limit}&sort=${sortName} ${order}`

    const response = await axios.get(url, { headers })
    // console.log(3, response.data)
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
    console.log('BANANA', pricesFilter)
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
  sortName?: string
  order?: string
}

type PriceType = {
  min: number
  max: number
}

export enum SortingNames {
  name = 'name.en-us',
  price = 'price',
}
