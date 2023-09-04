import axios from 'axios'

export class UpdateUserInfoService {
  public async updateUserAddressInfo(
    token: string | null | undefined,
    customerUpdatedData: CustomerUpdatedAddressData,
  ): Promise<CustomerUpdatedProfile> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/me/`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const body = customerUpdatedData
    /* const body =
      {
  "version" : 16,
  "actions": [ {
    "action" : "changeAddress",
    "addressId": "{{addressId}}",
    "address": {
      "key": "exampleKey",
      "title": "My Address",
      "salutation": "Mr.",
      "firstName": "Example",
      "lastName": "Person",
      "streetName": "Example Street",
      "streetNumber": "4711",
      "additionalStreetInfo": "Backhouse",
      "postalCode": "80933",
      "city": "Exemplary City",
      "region": "Exemplary Region",
      "state": "Exemplary State",
      "country": "DE",
      "company": "My Company Name",
      "department": "Sales",
      "building": "Hightower 1",
      "apartment": "247",
      "pOBox": "2471",
      "phone": "+49 89 12345678",
      "mobile": "+49 171 2345678",
      "email": "email@example.com",
      "fax": "+49 89 12345679",
      "additionalAddressInfo": "no additional Info",
      "externalId": "Information not needed"
    }
  }]
} */
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
    /* const body =
      {
  "version" : 3,
  "actions" : [ {
    "action" : "addAddress",
    "address" : {
      "streetName" : "Any Street",
      "streetNumber" : "1337",
      "postalCode" : "11111",
      "city" : "Any City",
      "country" : "US"
    }
  } ]
    } */
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
    /* const body = {
      version: 3,
      actions: [
         {
    "action": "setFirstName",
    "firstName": "NewFirstName"
  },
  {
    "action": "setLastName",
    "lastName": "NewLastName"
  },
  {
      "action": "setDateOfBirth",
      "dateOfBirth": "1990-01-01"
    },

    {
  "action": "changeEmail",
  "email": "email@example.com"
}
],
    } */
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

    /* const body = {
  "version" : 1,
  "currentPassword" : "secret123",
  "newPassword" : "newSecret456"
    } */

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

export interface CustomerUpdatedAddressData {
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
  streetNumber: string
  postalCode: string
  city: string
  country: string
}

export type CustomerUpdatedData = {
  version: number
  actions: {
    action: string
    address: Address
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
