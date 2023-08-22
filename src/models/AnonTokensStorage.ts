export class AnonTokensStorage {
  private anonAuthTokenKey: string = 'parfAnonAuthToken'
  private anonRefreshTokenKey: string = 'parfAnonRefreshToken'

  private static instance: AnonTokensStorage

  public static getInstance(): AnonTokensStorage {
    if (!AnonTokensStorage.instance) {
      AnonTokensStorage.instance = new AnonTokensStorage()
    }
    return AnonTokensStorage.instance
  }

  public setLocalStorageAnonAuthToken(value: string): void {
    window.localStorage.setItem('parfAnonAuthToken', JSON.stringify(value))
  }

  public getLocalStorageAnonAuthToken(): string | null {
    const anonAuthToken = window.localStorage.getItem(this.anonAuthTokenKey)
    if (anonAuthToken !== null) {
      return JSON.parse(anonAuthToken)
    }

    return null
  }

  public setLocalStorageAnonRefreshToken(value: string): void {
    window.localStorage.setItem('parfAnonRefreshToken', JSON.stringify(value))
  }

  public getLocalStorageAnonRefreshToken(): string | null {
    const anonRefreshToken = window.localStorage.getItem(this.anonRefreshTokenKey)
    if (anonRefreshToken !== null) {
      return JSON.parse(anonRefreshToken)
    }

    return null
  }
}
