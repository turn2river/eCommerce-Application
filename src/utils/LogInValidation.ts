import * as Yup from 'yup'
import { LogInInputsInterface } from '../models/LogInInputsInterface'

export const schema: Yup.ObjectSchema<LogInInputsInterface> = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^\S+@\S+\.\S+$/, 'Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
})
