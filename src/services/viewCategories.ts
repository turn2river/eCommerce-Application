import axios from 'axios'

export async function getCategories(token: string): Promise<CategoryData | undefined> {
  const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/categories'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
  const response = await axios.get(url, { headers })
  console.log(response.data.results)
  if (response.status !== 200) {
    throw Error('Failed to get the categories')
  }
  return response.data.results
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
