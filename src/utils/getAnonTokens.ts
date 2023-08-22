/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAnonymousToken } from '../services/anonUserAuth'
import { Token } from '../models/authTypes'

export async function getAnonTokens(): Promise<Token | null> {
  const tokenObject = await getAnonymousToken()
  if (tokenObject !== undefined) {
    const tokens = {
      accessToken: tokenObject.access_token,
      refreshToken: tokenObject.refresh_token,
    }

    return tokens
  }
  throw Error('Failed to get the authorisation token')
}
