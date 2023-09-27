import axios from 'axios'
import { CategoryProductsData } from './GetProductsByCategoryIdService'

export class SearchProductsService {
  public async searchProducts(token: string, keyword: string): Promise<CategoryProductsData> {
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
