import { ISignUpAdressInterface } from './SignUpAddressInterface'

export interface ISignUpDataInterface {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  isEmailVerified: boolean
  addresses: ISignUpAdressInterface[]
}
