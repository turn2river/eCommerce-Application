import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'

export interface EditAdressFormPropsInterface extends ProfileDataPropsInterface {
  addressID: string
}

export type AddressDataFieldsIds =
  | 'streetName'
  | 'postalCode'
  | 'city'
  | 'country'
  | 'building'
  | 'apartment'
  | 'region'
  | 'state'

export interface AddressDataFieldsInterface {
  id: AddressDataFieldsIds
  title: string
}

export interface CheckBoxStateInterface {
  billingAddress: boolean | undefined
  defaultBillingAddress: boolean | undefined
  shippingAddress: boolean | undefined
  defaultShippingAddress: boolean | undefined
}

export interface EditableFieldInterface {
  state: boolean
  region: boolean
  apartment: boolean
  streetName: boolean
  city: boolean
  postalCode: boolean
}
