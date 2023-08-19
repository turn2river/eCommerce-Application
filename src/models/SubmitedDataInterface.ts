export interface ISubmitedData {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  billing_zipCode: string
  billing_city: string
  billing_country: string
  billing_street: string
  shipping_zipCode?: string
  shipping_city?: string
  shipping_country?: string
  shipping_street?: string
}
