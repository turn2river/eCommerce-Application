export interface IInputValues {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  street: string
  city: string
  zipCode: string
  country: string
  emailIsValid: boolean
  passwordIsValid: boolean
  firstNameIsValid: boolean
  lastNameIsValid: boolean
  dateOfBirthIsValid: boolean
  streetIsValid: boolean
  cityIsValid: boolean
  zipCodeIsValid: boolean
  countryIsValid: boolean
  validationErrorMessages: { [key: string]: string[] }
}
