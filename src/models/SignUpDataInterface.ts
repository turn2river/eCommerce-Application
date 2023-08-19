import { ISignUpAdressInterface } from './SignUpAddressInterface'

export interface ISignUpDataInterface {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  isEmailVerified: boolean
  addresses: ISignUpAdressInterface[]
}
