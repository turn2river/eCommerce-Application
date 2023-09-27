import { Control, UseFormRegisterReturn, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
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

interface InputValues {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: Date // Update the type to Date instead of string
  billing_street: string
  shipping_street: string
  billing_city: string
  shipping_city: string
  billing_zipCode: string
  shipping_zipCode: string
  billing_country: string
  shipping_country: string
}
