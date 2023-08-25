import axios from 'axios'
import { SignUpDataInterface } from '../models/SignUpDataInterface'

export class CustomerServiceSignUp {
  public async createCustomer(token: string, customerData: SignUpDataInterface): Promise<Customer | undefined> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/customers'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // 0FNIXxVr1UIJIIxQdYIH_l-cvsQyYxgA`, sKKZQGFpmsbsTdCpUNhUeUI6pOU2Sp0g
    }
    const body = customerData

    const response = await axios.post(url, body, { headers })
    console.log(response.status, response.data)

    return response.data
  }
}

type Customer = {
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
  email: string
  firstName: string
  lastName: string
  password: string
  addresses: string[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  isEmailVerified: boolean
  stores: string[]
  authenticationMode: string
}
