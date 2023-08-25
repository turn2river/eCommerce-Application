import axios from 'axios'

export async function getRefreshToken(token: string): Promise<RefreshToken | undefined> {
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
  if (response.status !== 200) {
    throw Error('Failed to get the token')
  }
  return response.data
}

type RefreshToken = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}
