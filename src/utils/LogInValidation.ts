import * as Yup from 'yup'
import { LogInInputsInterface } from '../models/LogInInputsInterface'

export const schema: Yup.ObjectSchema<LogInInputsInterface> = Yup.object().shape({
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
})
