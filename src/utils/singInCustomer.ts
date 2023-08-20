import { getCustomerToken } from '../services/customerLogin'
import { Token } from '../models/authTypes'
import { LogInInputsInterface } from '../models/LogInInputsInterface'
import { CustomerTokensStorage } from '../models/customerTokenStorage'

const customerStorage = new CustomerTokensStorage()

export async function singInCustomer(customerData: LogInInputsInterface): Promise<Token | undefined> {
  try {
    const tokenObject = await getCustomerToken(customerData)
    console.log(tokenObject)
    if (tokenObject !== undefined) {
      const tokens = {
        accessToken: tokenObject.access_token,
        refreshToken: tokenObject.refresh_token,
      }
      customerStorage.setLocalStorageCustomerAuthToken(tokens.accessToken)
      customerStorage.setLocalStorageCustomerRefreshToken(tokens.refreshToken)
      return tokens
    }
    return undefined
  } catch (error) {
    if (error instanceof Error) {
      console.log(2, error.message)
      throw new Error(`${error.message}`)
    }
    throw new Error('Failed to sign in')
  }
}
