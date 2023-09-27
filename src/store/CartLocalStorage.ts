export class CartLocalStorage {
  public setLocalStorageCartID(value: string): void {
    window.localStorage.setItem('parfCartID', JSON.stringify(value))
  }

  public getLocalStorageCartID(): string | null {
    if (window.localStorage) {
      const CartID = window.localStorage.getItem('parfCartID')
      if (CartID !== null) {
        return JSON.parse(CartID)
      }
    }
    return null
  }

  public setLocalStorageCartVersion(value: number): void {
    window.localStorage.setItem('parfCartVersion', JSON.stringify(value))
  }

  public getLocalStorageCartVersion(): number | null {
    if (window.localStorage) {
      const CartVersion = window.localStorage.getItem('parfCartVersion')
      if (CartVersion !== null) {
        return JSON.parse(CartVersion)
      }
    }
    return null
  }

  public clearCartLocalStorage(): void {
    if (window.localStorage) {
      window.localStorage.removeItem('parfCartID')
      window.localStorage.removeItem('parfCartVersion')
    }
  }

  public setLocalStorageCustomerCartID(value: string): void {
    window.localStorage.setItem('parfCustomerCartID', JSON.stringify(value))
  }

  public getLocalStorageCustomerCartID(): string | null {
    if (window.localStorage) {
      const CartID = window.localStorage.getItem('parfCustomerCartID')
      if (CartID !== null) {
        return JSON.parse(CartID)
      }
    }
    return null
  }

  public setLocalStorageCustomerCartVersion(value: number): void {
    window.localStorage.setItem('parfCustomerCartVersion', JSON.stringify(value))
  }

  public getLocalStorageCustomerCartVersion(): number | null {
    if (window.localStorage) {
      const CartVersion = window.localStorage.getItem('parfCustomerCartVersion')
      if (CartVersion !== null) {
        return JSON.parse(CartVersion)
      }
    }
    return null
  }

  public clearCustomerCartLocalStorage(): void {
    if (window.localStorage) {
      window.localStorage.removeItem('parfCustomerCartID')
      window.localStorage.removeItem('parfCustomerCartVersion')
    }
  }
}
