// eslint-disable-next-line import/extensions
import { getAnonTokens } from '../utils/getAnonTokens'

const tokens = await getAnonTokens()

let accessToken: string
if (typeof tokens === 'object' && 'accessToken' in tokens) {
  accessToken = tokens.accessToken
}

let refreshToken: string
if (typeof tokens === 'object' && 'accessToken' in tokens) {
  refreshToken = tokens.refreshToken
}

export class AnonTokensStorage {
  public anonAuthToken: string
  public anonRefreshToken: string
  constructor() {
    if (window.localStorage.getItem('parfAnonAuthToken')) {
      this.anonAuthToken = this.getLocalStorageAnonAuthToken()
      console.log('localStorage loaded')
    } else {
      this.anonAuthToken = accessToken
      this.setLocalStorageAnonAuthToken(this.anonAuthToken)
    }
    if (window.localStorage.getItem('parfAnonRefreshToken')) {
      this.anonRefreshToken = this.getLocalStorageAnonRefreshToken()
    } else {
      this.anonRefreshToken = refreshToken
      this.setLocalStorageAnonRefreshToken(this.anonRefreshToken)
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
}
