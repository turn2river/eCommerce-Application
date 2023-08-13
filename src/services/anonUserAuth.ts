import axios from 'axios'
import { AnonUserType } from '../models/authTypes'

export async function getAnonymousToken(): Promise<AnonUserType | undefined> {
  const url =
    'https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/anonymous/token?grant_type=client_credentials'

  const response = await axios({
    method: 'post',
    url,
    auth: {
      username: 'siFhmtGmnSioXkUJakkWQafJ',
      password: 'wBkMaGx7k8lGflmkfPMt0OZe-Bhj9jy5',
    },
  })
  console.log(response.data)
  if (response.status !== 200) {
    throw Error('Failed to get the token')
  }
  return response.data
}
