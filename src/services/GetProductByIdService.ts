import axios from 'axios'
import { Product } from '../models/ProductType'

export class GetProductByIdService {
  public async getProductById(token: string, id: string): Promise<Product> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/products/${id}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.masterData.current)
    return response.data
  }

  public async getProductByKey(token: string, key: string): Promise<Product> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie//products/key=${key}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.masterData.current)
    return response.data
  }
}
