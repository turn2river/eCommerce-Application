import axios from 'axios'
import { CustomerTokensStorage } from '../store/customerTokensStorage'
import { AnonTokensStorage } from '../store/anonTokensStorage'

const customerTokens = new CustomerTokensStorage()
const anonTokens = new AnonTokensStorage()

export class CartService {
  public createCart(): void {
    if (
      localStorage.getItem('isAuth') &&
      customerTokens.getLocalStorageCustomerAuthToken() &&
      anonTokens.getLocalStorageAnonAuthToken()
    ) {
      const token = customerTokens.getLocalStorageCustomerAuthToken()
      console.log(token)
      this.createUserCart(token)
    } else if (anonTokens.getLocalStorageAnonAuthToken()) {
      const token = anonTokens.getLocalStorageAnonAuthToken()
      this.createAnonymousCart(token)
    }
  }
  public async createAnonymousCart(token: string | null): Promise<Cart> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = {
      currency: 'EUR',
      //  anonymousId: token,
    }
    const response = await axios.post(url, body, { headers })
    console.log('createCart', response)

    return response.data
  }

  public async queryUserCart(token: string): Promise<Cart> {
    // получить корзины пользователя по токену пользователя
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.results)

    return response.data.results
  }

  public async createUserCart(token: string | null): Promise<Cart> {
    console.log(token)
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token
    }

    const body = {
      currency: 'EUR',
    }
    const response = await axios.post(url, body, { headers })
    console.log('createUserCart', response)

    return response.data
  }
  public async updateUserCartByCartId(
    token: string,
    cartId: string,
    cartVersion: number,
    action: string, // "action" : "addLineItem", "removeLineItem"
    productId: string,
    variantId: number,
    quantity: number,
  ): Promise<Cart> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/carts/${cartId}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = {
      version: cartVersion,
      actions: [
        {
          action,
          productId,
          variantId,
          quantity,
        },
      ],
    }
    const response = await axios.post(url, body, { headers })
    console.log('added', response.data.results)

    return response.data
  }

  public async handleCartItemInUserCart(token: string, cartId: string, cartUpdate: CartUpdate): Promise<Cart> {
    // "action" : "addLineItem", "removeLineItem"
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts/${cartId}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = cartUpdate
    const response = await axios.post(url, body, { headers })
    // console.log(response.data.results)

    return response.data
  }

  public async setCustomerId(token: string, cartVersion: number, customerId: string): Promise<Cart> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/carts/${customerId}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = {
      version: cartVersion,
      actions: [
        {
          action: 'setCustomerId',
          customerId,
        },
      ],
    }
    const response = await axios.post(url, body, { headers })
    // console.log(response.data.results)

    return response.data
  }
}

interface Cart {
  type: string
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: {
    clientId: string
    isPlatformClient: boolean
  }
  createdBy: {
    clientId: string
    isPlatformClient: boolean
  }
  lineItems: string[]
  cartState: string
  totalPrice: {
    type: string
    currencyCode: string
    centAmount: number
    fractionDigits: number
  }
  shippingMode: string
  shipping: string[]
  customLineItems: string[]
  discountCodes: string[]
  directDiscounts: string[]
  inventoryMode: string
  taxMode: string
  taxRoundingMode: string
  taxCalculationMode: string
  deleteDaysAfterLastModification: number
  refusedGifts: string[]
  origin: string
  itemShippingAddresses: string[]
}

interface CartUpdate {
  version: string
  actions: Action[]
}

interface Action {
  action: string
  productId: string
  variantId: number
  quantity: number
  supplyChannel?: Channel
  distributionChannel?: Channel
  externalTaxRate?: ExternalTaxRate
  shippingDetails?: ShippingDetails
}

interface Channel {
  typeId: string
  id: string
}

interface ExternalTaxRate {
  name: string
  amount: number
  country: string
  state: string
}

interface ShippingDetails {
  targets: ShippingTarget[]
}

interface ShippingTarget {
  addressKey: string
  quantity: number
}
