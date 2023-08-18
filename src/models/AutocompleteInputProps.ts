import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import { InputValues } from './yupType'

export interface AutocompleteInputProps {
  id: string
  label: string
  placeholder: string
  visibility: boolean
  type: string
  validation: UseFormRegisterReturn<'country'>
  error: string | undefined
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  setCountryValue: UseFormSetValue<InputValues>
}
