import { ISignUpAdressInterface } from './SignUpAddressInterface'

export interface ISignUpDataInterface {
  email: string
  password: string
  firstName: string | undefined
  lastName: string | undefined
  dateOfBirth: string | undefined
  isEmailVerified: boolean
  addresses: ISignUpAdressInterface[]
}
