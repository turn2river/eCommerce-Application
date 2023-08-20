import * as Yup from 'yup'
import { LogInInputsInterface } from '../models/LogInInputsInterface'

export const schema: Yup.ObjectSchema<LogInInputsInterface> = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email format').required('Email is required'),
  password: Yup.string().trim().required('Password is required'),
})
