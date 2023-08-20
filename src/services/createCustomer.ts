import axios from 'axios'
import { Customer } from '../models/authTypes'
import { SignUpDataInterface } from '../models/SignUpDataInterface'

export async function createCustomer(token: string, customerData: SignUpDataInterface): Promise<Customer | undefined> {
  const url = 'https://api.europe-west1.gcp.commercetools.com/parfumerie/customers'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // 0FNIXxVr1UIJIIxQdYIH_l-cvsQyYxgA`, sKKZQGFpmsbsTdCpUNhUeUI6pOU2Sp0g
  }
  const body = customerData

  const response = await axios.post(url, body, { headers })
  console.log(response.status, response.data)
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  throw new Error('Failed to sign up')
}
