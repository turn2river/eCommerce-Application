export interface InputValues {
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
