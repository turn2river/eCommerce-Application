import axios from 'axios'

export class CategoriesService {
  public async getCategories(token: string): Promise<CategoryData> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/categories'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    console.log(response.data.results)

    return response.data.results
  }
}
type CategoryData = {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: CreatedModifiedBy
  createdBy: CreatedModifiedBy
  key: string
  name: Meta
  slug: Meta
  description: Meta
  ancestors: string[]
  orderHint: string
  metaTitle: Meta
  metaDescription: Meta
  assets: string[]
}

type CreatedModifiedBy = {
  isPlatformClient: boolean
  user: User
}

type Meta = {
  'en-US': string
  'ru': string
}

type User = {
  typeId: string
  id: string
}
