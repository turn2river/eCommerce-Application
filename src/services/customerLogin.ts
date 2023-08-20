import axios from 'axios'
import { CustomerType } from '../models/authTypes'
import { LogInInputsInterface } from '../models/LogInInputsInterface'

export async function getCustomerToken(customerData: LogInInputsInterface): Promise<CustomerType | undefined> {
  const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/customers/token?grant_type=password&username=${customerData.email}&password=${customerData.password}`

  const response = await axios({
    method: 'post',
    url,
    auth: {
      username: 'siFhmtGmnSioXkUJakkWQafJ',
      password: 'wBkMaGx7k8lGflmkfPMt0OZe-Bhj9jy5',
    },
  })
  console.log(response.data)
  if (response.status !== 200) {
    throw Error('Failed to sign in')
  }
  return response.data
}
