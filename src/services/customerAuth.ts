import axios from 'axios'
import { CustomerType, CustomerData } from '../models/authTypes'

const customerData: CustomerData = {
  username: 'alice@something.com',
  password: 'alice123',
}
export async function getCustomerToken(): Promise<CustomerType | undefined> {
  const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/customers/token?grant_type=password&username=${customerData.username}&password=${customerData.password}`

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
    throw Error('Failed to get the token')
  }
  return response.data
}
