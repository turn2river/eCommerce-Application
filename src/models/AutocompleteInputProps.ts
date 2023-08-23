import { Control, UseFormRegisterReturn, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { InputValues } from './yupType'
import { RegistrationInputsInterface } from './RegistrationInputsInterface'

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
  type: string
  validation: UseFormRegisterReturn<'billing_country'> | UseFormRegisterReturn<'shipping_country'>
  error: string | undefined
  controller: Control<RegistrationInputsInterface>
  trigger: UseFormTrigger<RegistrationInputsInterface>
  setCountryValue: UseFormSetValue<InputValues>
}
