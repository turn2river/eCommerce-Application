/* eslint-disable no-param-reassign */
import axios from 'axios'
import { ProductResult } from './GetProductsByCategoryIdService'

export class GetFilteredProductsService {
  public async getFilteredProducts(
    token: string,
    { categoriesList = [], attributesList = [], priceList }: IFilteredProducts,
    limit: number,
    page: number,
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
    )}&limit=${limit}&offset=${page * limit}`

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
