/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAnonymousToken } from '../services/anonUserAuth'
import { Token } from '../models/authTypes'

export async function getAnonTokens(): Promise<Token | string> {
  try {
    const tokenObject = await getAnonymousToken()
    if (tokenObject !== undefined) {
      const tokens = {
        accessToken: tokenObject.access_token,
        refreshToken: tokenObject.refresh_token,
      }

      return tokens
    }
    return ''
  } catch (error) {
    console.error('Failed to get the authorisation token')
    return ''
  }
}
