import axios from 'axios'
import { AnonTokensStorage } from '../store/AnonTokensStorage'

export class AnonTokensService {
  public async getAnonymousTokens(): Promise<AnonUserType> {
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

    const tokens: Token = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }
    const anonTokensStorage = AnonTokensStorage.getInstance()
    anonTokensStorage.setLocalStorageAnonAuthToken(tokens.accessToken)
    anonTokensStorage.setLocalStorageAnonRefreshToken(tokens.refreshToken)

    return response.data
  }
}
type AnonUserType = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

type Token = {
  accessToken: string
  refreshToken: string
}
