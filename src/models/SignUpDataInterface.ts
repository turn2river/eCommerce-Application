import { ISignUpAdressInterface } from './SignUpAddressInterface'

export interface ISignUpDataInterface {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string // date format has to be 'YYYY-MM-DD'
  isEmailVerified: boolean
  addresses: ISignUpAdressInterface[]
}
