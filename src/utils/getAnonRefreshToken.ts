import { getAnonymousToken } from '../services/anonUserAuth'

export async function getAnonRefreshToken(): Promise<string> {
  try {
    const tokenObject = await getAnonymousToken()
    if (tokenObject !== undefined) {
      return tokenObject.refresh_token
    }
    return ''
  } catch (error) {
    console.error('Failed to get the refresh token')
    return ''
  }
}
