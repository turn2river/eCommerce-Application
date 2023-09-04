import axios from 'axios'

export class UpdateUserInfoService {
  public async updateUserAddressInfo(
    token: string,
    customerUpdatedData: CustomerUpdatedAddressData,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body = customerUpdatedData

    const response = await axios.post(url, body, { headers })
    console.log('Updated address', response.data)
    return response.data
  }
  public async addUserAddressInfo(
    token: string,
    customerUpdatedData: CustomerUpdatedData,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body = customerUpdatedData

    const response = await axios.post(url, body, { headers })
    console.log('Updated address', response.data)
    return response.data
  }

  public async modifyUserAddressInfo(
    token: string,
    version: number,
    actionKey: string,
    addressId: string | undefined,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body: ModifyAddressData = {
      version,
      actions: [
        {
          action: actionKey,
          addressId,
        },
      ],
    }
    const response = await axios.post(url, body, { headers })
    console.log('Updated address', response.data)
    return response.data
  }

  public async updateUserPersonalInfo(
    token: string,
    customerUpdatedPersonalData: CustomerUpdatedPersonalData,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body = customerUpdatedPersonalData

    const response = await axios.post(url, body, { headers })
    console.log('Updated name', response.data)
    return response.data
  }
  public async updateUserPasswordInfo(
    token: string, // тут нужен customer token
    customerUpdatedPasswordlData: CustomerUpdatedPasswordlData,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/password`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body = customerUpdatedPasswordlData

    const response = await axios.post(url, body, { headers })
    console.log(1, response.data)
    return response.data
  }
}
interface UpdatedAddress {
  key?: string
  title?: string
  salutation?: string
  firstName?: string
  lastName?: string
  streetName?: string
  streetNumber?: string
  additionalStreetInfo?: string
  postalCode?: string
  city?: string
  region?: string
  state?: string
  country?: string | null
  company?: string
  department?: string
  building?: string
  apartment?: string
  pOBox?: string
  phone?: string
  mobile?: string
  email?: string
  fax?: string
  additionalAddressInfo?: string
  externalId?: string
}

export type CustomerUpdatedAddressData = {
  version: number | undefined
  actions: {
    action: string
    addressId: string
    address: UpdatedAddress
  }[]
}

export type CustomerUpdatedPasswordlData = {
  version: number
  currentPassword: string
  newPassword: string
}

export type CustomerUpdatedPersonalData = {
  version: number
  actions: Action[]
}
interface Action {
  action: string
  firstName?: string
  lastName?: string
  dateOfBirth?: Date
  email?: string
}

export interface Address {
  streetName: string
  building: string
  postalCode: string
  city: string
  country: string | null
  state: string
  region: string
  apartment: string
}

export type CustomerUpdatedData = {
  version: number | undefined
  actions: {
    action: string
    address: Address
  }[]
}

export type ModifyAddressData = {
  version: number
  actions: {
    action: string
    addressId: string | undefined
  }[]
}

interface CustomerUpdatedProfile {
  id: string
  version: number
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
export enum ActionKey {
  RemoveAddress = 'removeAddress',
  SetDefaultShippingAddress = 'setDefaultShippingAddress',
  SetDefaultBillingAddress = 'setDefaultBillingAddress',
  AddBillingAddressId = 'addBillingAddressId',
  AddShippingAddressId = 'addShippingAddressId',
}
