import { Dispatch, SetStateAction } from 'react'
import { CustomerProfile } from '../../services/GetCustomerByTokenService'

export type PersonalDataFieldsIds = 'firstName' | 'lastName' | 'dateOfBirth'

export interface PersonalDataFieldsInterface {
  id: PersonalDataFieldsIds
  title: string
}

export interface ProfilePersonalDataPropsInterface {
  userData: CustomerProfile | null
  setUserData: Dispatch<SetStateAction<CustomerProfile | null>>
}
