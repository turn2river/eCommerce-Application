import axios from 'axios'

export class CreateAnonymousUserCartService {
  public async createAnonymousCart(token: string): Promise<Cart> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/carts'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.post(url, { headers })
    // console.log(response.data)

    return response.data
  }

  public async queryUserCart(token: string): Promise<Cart> {
    // получить корзину пользователя по токену пользователя
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.results)

    return response.data.results
  }

  public async createUserCart(token: string): Promise<Cart> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token
    }
    const response = await axios.post(url, { headers })
    // console.log(response.data)

    return response.data
  }
  public async updateUserCartByCartId(
    token: string,
    cartId: string,
    cartVersion: number,
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
          action: 'addLineItem',
          productId,
          variantId,
          quantity,
        },
      ],
    }
    const response = await axios.post(url, body, { headers })
    // console.log(response.data.results)

    return response.data
  }

  public async addItemToUserCart(token: string, cartId: string, cartUpdate: CartUpdate): Promise<Cart> {
    // "action" : "addLineItem",
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
  public async removeItemToUserCart(token: string, cartId: string, cartUpdate: CartUpdate): Promise<Cart> {
    // "action" : "removeLineItem"
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
