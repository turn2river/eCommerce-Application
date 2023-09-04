import { Dispatch, SetStateAction } from 'react'
import { CustomerProfile } from '../services/GetCustomerByTokenService'

export interface ProfileDataPropsInterface {
  userData: CustomerProfile | null
  token?: string | null
  updateData: Dispatch<SetStateAction<number>>
}
