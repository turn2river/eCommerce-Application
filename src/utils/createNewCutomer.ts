/* eslint-disable import/extensions */

import { createCustomer } from '../services/createCustomer'
import { Customer } from '../models/authTypes'
import { SignUpDataInterface } from '../models/SignUpDataInterface'

export async function createNewCustomer(
  anonUserAuthToken: string,
  customerInfo: SignUpDataInterface,
): Promise<Customer | undefined> {
  try {
    const response = await createCustomer(anonUserAuthToken, customerInfo)
    console.log(response)
    return response
  } catch (error) {
    if (error instanceof Error) {
      console.log(2, error.message)
      throw new Error(`${error.message}`)
    }
    throw new Error('Failed to sign up')
  }
}
