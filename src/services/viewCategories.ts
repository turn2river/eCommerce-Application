import axios from 'axios'
import { CategoryData } from '../models/authTypes'

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
