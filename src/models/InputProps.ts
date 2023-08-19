import { UseFormRegisterReturn } from 'react-hook-form'

export interface InputPropsInterface {
  id: string
  label: string
  type: string
  placeholder: string
  validation?: UseFormRegisterReturn<
    | 'billing_street'
    | 'billing_city'
    | 'billing_zipCode'
    | 'shipping_street'
    | 'shipping_city'
    | 'shipping_zipCode'
    | 'firstName'
    | 'lastName'
    | 'dateOfBirth'
    | 'email'
    | 'password'
  >
  error?: string | undefined
}
