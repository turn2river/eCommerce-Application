import * as Yup from 'yup'
import { InputValues } from '../models/yupType'

export const schema: Yup.ObjectSchema<InputValues> = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .trim()
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
  dateOfBirth: Yup.date().required('Date of birth is required'),
  /* .min(new Date().setFullYear(new Date().getFullYear() - 13), 'You must be at least 13 years old'),*/
  street: Yup.string().required('Street is required'),
  city: Yup.string()
    .matches(/^[a-zA-Z\s-]+$/, 'City should only contain letters, spaces, and hyphens')
    .required('City is required'),
  zipCode: Yup.string()
    .test('zipCode', 'Invalid zipCode', (value) => {
      if (!value) {
        return true // Skip validation if the postalCode field is undefined
      }
      return /^[A-Za-z0-9]{5}([- ]?[A-Za-z0-9]{4})?$/.test(value)
    })
    .nullable() // Allow null values for the postalCode field
    .required('Postal code is required'),
  country: Yup.string().required('Country is required'),
})
