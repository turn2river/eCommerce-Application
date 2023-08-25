import axios from 'axios'

export class GetRefreshToken {
  public async getRefreshToken(token: string): Promise<RefreshToken> {
    const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/anonymous/token?grant_type=refresh_token&refresh_token=${token}`

    const response = await axios({
      method: 'post',
      url,
      auth: {
        username: 'siFhmtGmnSioXkUJakkWQafJ',
        password: 'wBkMaGx7k8lGflmkfPMt0OZe-Bhj9jy5',
      },
    })
    console.log(response.data)

    return response.data
  }
}

type RefreshToken = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}
