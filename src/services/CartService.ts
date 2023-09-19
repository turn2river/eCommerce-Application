import axios from 'axios'
import { CustomerTokensStorage } from '../store/customerTokensStorage'
import { AnonTokensStorage } from '../store/anonTokensStorage'

const customerTokens = new CustomerTokensStorage()
const anonTokens = AnonTokensStorage.getInstance()

export class CartService {
  public async createCart(): Promise<Cart | undefined> {
    // нужно использовать для проверки на наличие активной корзины и создания новой корзины
    let response
    if (
      localStorage.getItem('isAuth') &&
      customerTokens.getLocalStorageCustomerAuthToken() &&
      anonTokens.getLocalStorageAnonAuthToken()
    ) {
      const token = customerTokens.getLocalStorageCustomerAuthToken()
      // console.log(token)
      try {
        response = await this.queryMyActiveCart(token)
      } catch (error) {
        // console.error(error)
        response = await this.createUserCart(token)
      }
    } else if (anonTokens.getLocalStorageAnonAuthToken()) {
      const token = anonTokens.getLocalStorageAnonAuthToken()
      try {
        response = await this.queryMyActiveCart(token)
      } catch (error) {
        // console.error(error)
        response = await this.createAnonymousCart(token)
      }
    }
    return response
  }

  public async queryMyActiveCart(token: string | null): Promise<Cart> {
    // получить актуальную корзину пользователя по токену пользователя
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/active-cart'

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token or anonymous token for anonymous user
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data)

    return response.data
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
    // console.log('createCart', token, response)

    return response.data
  }

  public async queryUserCart(token: string | null): Promise<Cart> {
    // получить корзины пользователя по токену пользователя
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token or anonymous token for anonymous user
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data)

    return response.data
  }

  public async createUserCart(token: string | null): Promise<Cart> {
    // console.log(token)
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // customer token
    }

    const body = {
      currency: 'EUR',
    }
    const response = await axios.post(url, body, { headers })
    // console.log('createUserCart', response)

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
    // console.log('added', response.data.results)

    return response.data
  }

  public async handleCartItemInUserCart(
    token: string,
    cartId: string | undefined,
    cartUpdate: CartUpdate,
  ): Promise<Cart> {
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

  public async removeLineItem(token: string, cartId: string, cartUpdate: RemoveLineItem): Promise<Cart> {
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

  public async addDiscountCode(token: string, cartId: string, version: number, myDiscountCode: string): Promise<Cart> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts/${cartId}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = {
      version,
      actions: [
        {
          action: 'addDiscountCode',
          code: myDiscountCode,
        },
      ],
    }

    const response = await axios.post(url, body, { headers })
    // console.log(response.data.results)

    return response.data
  }

  public async removeDiscountCode(
    token: string,
    cartId: string,
    version: number,
    myDiscountCodeId: string, // это не сам код, а его ай-ди!! он приходит в ответе завпроса по добавлению скидочного кода
  ): Promise<Cart> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts/${cartId}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const body = {
      version,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: myDiscountCodeId,
          },
        },
      ],
    }

    const response = await axios.post(url, body, { headers })
    // console.log(response.data.results)

    return response.data
  }

  public async deleteCart(token: string, cartId: string, cartVersion: number): Promise<void> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/carts/${cartId}?version=${cartVersion}`

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.delete(url, { headers })
    console.log(response.data)

    return response.data
  }
}

interface RemoveLineItem {
  version: number
  actions: RemoveAction[]
}

interface RemoveAction {
  action: string
  lineItemId: string
  quantity: number
}
export interface Cart {
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
  lineItems: LineItems[]
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
  discountCodes: DiscountCodes[]
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
  version: number | undefined
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

interface LineItems {
  addedAt: string
  id: string
  lastModifiedAt: string
  lineItemMode: string
  name: {
    ['en-US']: string
    ru: string
  }
  price: {
    discounted: {
      discount: {
        id: string
        typeId: string
      }
      value: {
        centAmount: number
        currencyCode: string
        fractionDigits: number
        type: string
      }
      id: string
      key: string
    }
  }
  priceMode: string
  productId: string
  productKey: string
  quantity: number
  totalPrice: {
    type: string
    currencyCode: string
    centAmount: number
    fractionDigits: number
  }
  variant: {
    id: number
    key: string
    images: {
      url: string
    }[]
    prices: {
      discounted: {
        discount: {
          id: string
          typeId: string
        }
        value: {
          type: string
          currencyCode: string
          centAmount: number
          fractionDigits: number
        }
        id: string
        key: string
      }
      id: string
      key: string
      value: {
        type: string
        currencyCode: string
        centAmount: number
        fractionDigits: number
      }
    }[]
    attributes: {
      name: string
      value: number[]
    }[]
  }
}

interface DiscountCodes {
  discountCode: {
    id: string
    typeID: string
  }
  state: string
}
