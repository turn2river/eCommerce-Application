import axios from 'axios'
import { ProductResult } from './GetProductsByCategoryIdService'

export class ProductsSortingService {
  public async getSortedProductsByName(
    token: string,
    order: string,
    limit: number,
    page: number,
    filter = '',
  ): Promise<ProductResult[]> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?${filter}&limit=${limit}&offset=${
      page * limit
    }&sort=name.en-us ${order}`

    const response = await axios.get(url, { headers })
    // console.log(response.data.results)
    return response.data.results
  }

  public async getSortedProductsByPrice(
    token: string,
    order: string,
    limit: number,
    page: number,
    filter = '',
  ): Promise<ProductResult[]> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-projections/search?${filter}&limit=${limit}&offset=${
      page * limit
    }&sort=price ${order}`

    const response = await axios.get(url, { headers })
    // console.log(response.data.results)
    return response.data.results
  }
}
