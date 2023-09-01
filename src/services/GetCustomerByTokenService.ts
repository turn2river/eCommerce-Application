import axios from 'axios'

export class GetCustomerByTokenService {
  public async getCustomerByToken(token: string): Promise<CustomerProfile> {
    const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/me'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    console.log(response.data)
    return response.data
  }
}
export type CustomerProfile = {
  addresses: {
    apartment: string
    building: string
    city: string
    country: string
    id: string
    postalCode: string
    region: string
    state: string
    streetName: string
  }[]
  authenticationMode: string
  billingAddressIds: string[]
  createdAt: string
  createdBy: {
    isPlatformClient: boolean
    user: {
      id: string
      typeId: string
    }
  }
  customerNumber: string
  email: string
  firstName: string
  id: string
  isEmailVerified: boolean
  lastMessageSequenceNumber: number
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      id: string
      typeId: string
    }
  }
  lastName: string
  middleName: string
  password: string
  salutation: string
  shippingAddressIds: string[]
  stores: string[]
  title: string
  version: number
  versionModifiedAt: string
}
