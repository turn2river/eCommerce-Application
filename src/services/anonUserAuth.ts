import axios from 'axios'
import { AnonUserType, Token } from '../models/authTypes'
import { AnonTokensStorage } from '../models/AnonTokensStorage'

export async function getAnonymousToken(): Promise<AnonUserType | undefined> {
  const url =
    'https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/anonymous/token?grant_type=client_credentials'

  const response = await axios({
    method: 'post',
    url,
    auth: {
      /* username: 'siFhmtGmnSioXkUJakkWQafJ',
      password: 'wBkMaGx7k8lGflmkfPMt0OZe-Bhj9jy5',*/

      username: 'rYRaZX089qXdVYTbWgTytLcU',
      password: 'itUuiiHan_5t0wwKkkslnPXc_jIjV3VI',
    },
  })
  console.log(response.data)
  if (response.status !== 200) {
    throw Error('Failed to get the token')
  }
  const tokens: Token = {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  }
  const anonTokensStorage = AnonTokensStorage.getInstance()
  anonTokensStorage.setLocalStorageAnonAuthToken(tokens.accessToken)
  anonTokensStorage.setLocalStorageAnonRefreshToken(tokens.refreshToken)

  return response.data
}
