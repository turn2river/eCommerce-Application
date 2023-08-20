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
    if (typeof error === 'string') {
      console.log(1, error) // handle string error
    } else if (error instanceof Error) {
      console.log(2, error.message) // handle Error object
    } else {
      console.log('Unknown error occurred') // handle unknown error
    }
    throw new Error(`Failed to create new customer`)
  }
}
