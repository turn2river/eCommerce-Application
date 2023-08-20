import * as Yup from 'yup'
import { RegistrationInputsInterface } from '../models/RegistrationInputsInterface'

export const schema: Yup.ObjectSchema<RegistrationInputsInterface> = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .test('no-space', 'Email cannot contain spaces', (value) => {
      if (value) {
        return !value.includes(' ')
      }
      return true
    })
    .matches(/^\S+@\S+\.\S+$/, 'Please enter a valid email address'),
  password: Yup.string()

    .test('no-space', 'Password cannot contain spaces', (value) => {
      if (value) {
        return !value.includes(' ')
      }
      return true
    })
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),

  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'First name should only contain letters')
    .required('First name is required'),

  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Last name should only contain letters')
    .required('Last name is required'),

  dateOfBirth: Yup.date() // Change Yup.string() to Yup.date()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('Date of birth is required')
    .test('age', 'You must be at least 13 years old', (value) => {
      const currentDate = new Date()
      const dob = new Date(value)
      const age = currentDate.getFullYear() - dob.getFullYear()
      if (age < 13) {
        return false
      }
      return true
    }),

  billing_street: Yup.string().required('Street is required'),

  billing_city: Yup.string()
    .matches(/^[a-zA-Z\s-]+$/, 'City should only contain letters, spaces, and hyphens')
    .required('City is required'),

  billing_zipCode: Yup.string()
    .test('zipCode', 'Invalid zipCode', (value) => {
      if (!value) {
        return true // Skip validation if the postalCode field is undefined
      }
      return /^[A-Za-z0-9]{6}([- ]?[A-Za-z0-9]{4})?$/.test(value) // TODO implement the zipCode validation depending on the country
    })
    .nullable() // Allow null values for the postalCode field
    .required('Postal code is required'),
  billing_country: Yup.string().required('Country is required'),

  shipping_street: Yup.string().required('Street is required'),

  shipping_city: Yup.string()
    .matches(/^[a-zA-Z\s-]+$/, 'City should only contain letters, spaces, and hyphens')
    .required('City is required'),

  shipping_zipCode: Yup.string()
    .test('zipCode', 'Invalid zipCode', (value) => {
      if (!value) {
        return true // Skip validation if the postalCode field is undefined
      }
      return /^[A-Za-z0-9]{6}([- ]?[A-Za-z0-9]{4})?$/.test(value) // TODO implement the zipCode validation depending on the country
    })
    .nullable() // Allow null values for the postalCode field
    .required('Postal code is required'),

  shipping_country: Yup.string().required('Country is required'),
})
