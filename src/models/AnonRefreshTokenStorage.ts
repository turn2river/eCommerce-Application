import { getAnonRefreshToken } from '../utils/getAnonRefreshToken'

const anonUserRefreshToken = await getAnonRefreshToken()

export class AnonRefreshTokenStorage {
  public anonRefreshToken: string

  constructor() {
    if (window.localStorage.getItem('parfAnonRefreshToken')) {
      this.anonRefreshToken = this.getAnonRefreshToken()
      console.log('localStorage loaded')
      console.log(1, this.anonRefreshToken)
    } else {
      this.anonRefreshToken = anonUserRefreshToken
      this.setLocalStorage(this.anonRefreshToken)
    }
  }

  public setLocalStorage(value: string): void {
    window.localStorage.setItem('parfAnonRefreshToken', JSON.stringify(value))
  }

  public getAnonRefreshToken(): string {
    if (window.localStorage) {
      const anonRefreshToken = window.localStorage.getItem('parfAnonRefreshToken')
      if (anonRefreshToken !== null) {
        return JSON.parse(anonRefreshToken)
      }
    }
    return ''
  }
}
