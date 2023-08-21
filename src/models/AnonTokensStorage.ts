import { getAnonTokens } from '../utils/getAnonTokens'
import { StorageTokens, Token } from './authTypes'

let storageTokens: StorageTokens

/* async function getTokens(): Promise<string | Token> {
  const tokens = await getAnonTokens()

  if (typeof tokens === 'object' && 'accessToken' in tokens && 'refreshToken' in tokens) {
    storageTokens = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
  return storageTokens
}

getTokens()*/

export class AnonTokensStorage {
  public anonAuthToken: string = ''
  public anonRefreshToken: string = ''
  constructor() {
    if (window.localStorage.getItem('parfAnonAuthToken')) {
      this.anonAuthToken = this.getLocalStorageAnonAuthToken()
      console.log('localStorage loaded')
    } else {
      this.getTokens().then(() => {
        this.anonAuthToken = storageTokens.accessToken
        this.setLocalStorageAnonAuthToken(this.anonAuthToken)
      })
    }
    if (window.localStorage.getItem('parfAnonRefreshToken')) {
      this.anonRefreshToken = this.getLocalStorageAnonRefreshToken()
    } else {
      this.getTokens().then(() => {
        this.anonRefreshToken = storageTokens.refreshToken
        this.setLocalStorageAnonRefreshToken(this.anonRefreshToken)
      })
    }
  }

  public setLocalStorageAnonAuthToken(value: string): void {
    window.localStorage.setItem('parfAnonAuthToken', JSON.stringify(value))
  }

  public getLocalStorageAnonAuthToken(): string {
    if (window.localStorage) {
      const anonAuthToken = window.localStorage.getItem('parfAnonAuthToken')
      if (anonAuthToken !== null) {
        return JSON.parse(anonAuthToken)
      }
    }
    return ''
  }

  public setLocalStorageAnonRefreshToken(value: string): void {
    window.localStorage.setItem('parfAnonRefreshToken', JSON.stringify(value))
  }

  public getLocalStorageAnonRefreshToken(): string {
    if (window.localStorage) {
      const anonRefreshToken = window.localStorage.getItem('parfAnonRefreshToken')
      if (anonRefreshToken !== null) {
        return JSON.parse(anonRefreshToken)
      }
    }
    return ''
  }

  public async getTokens(): Promise<string | Token> {
    const tokens = await getAnonTokens()

    if (typeof tokens === 'object' && 'accessToken' in tokens && 'refreshToken' in tokens) {
      storageTokens = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    }
    return storageTokens
  }
}
