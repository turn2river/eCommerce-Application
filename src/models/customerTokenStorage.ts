export class CustomerTokensStorage {
  public setLocalStorageCustomerAuthToken(value: string): void {
    window.localStorage.setItem('parfcustomerAuthToken', JSON.stringify(value))
  }

  public getLocalStorageCustomerAuthToken(): string | null {
    if (window.localStorage) {
      const customerAuthToken = window.localStorage.getItem('parfcustomerAuthToken')
      if (customerAuthToken !== null) {
        return JSON.parse(customerAuthToken)
      }
    }
    return null
  }

  public setLocalStorageCustomerRefreshToken(value: string): void {
    window.localStorage.setItem('parfCustomerRefreshToken', JSON.stringify(value))
  }

  public getLocalStorageCustomerRefreshToken(): string | null {
    if (window.localStorage) {
      const customerRefreshToken = window.localStorage.getItem('parfCustomerRefreshToken')
      if (customerRefreshToken !== null) {
        return JSON.parse(customerRefreshToken)
      }
    }
    return null
  }
}
