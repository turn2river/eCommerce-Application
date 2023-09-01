import axios from 'axios'

export class SelectionProductsQueryService {
  public async getSectionProductsIDs(token: string, selectionKey: string): Promise<string[]> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/product-selections/key=${selectionKey}/products`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    const ids = await response.data.results.map((result: ResultData) => result.product.id)

    return ids
  }
}

type ResultData = {
  product: {
    typeId: string
    id: string
  }
}
