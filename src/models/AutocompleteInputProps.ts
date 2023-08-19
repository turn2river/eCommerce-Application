import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import { InputValues } from './yupType'

export interface AutocompleteInputProps {
  id:
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
    | 'billing_country'
    | 'shipping_country'
  label: string
  placeholder: string
  visibility: { [key: string]: boolean }
  type: string
  validation: UseFormRegisterReturn<'billing_country'> | UseFormRegisterReturn<'shipping_country'>
  error: string | undefined
  setVisibility: React.Dispatch<React.SetStateAction<{ billing_country: boolean; shipping_country: boolean }>>
  setCountryValue: UseFormSetValue<InputValues>
}
