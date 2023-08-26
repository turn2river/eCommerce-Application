import axios from 'axios'
import { LogInInputsInterface } from '../models/LogInInputsInterface'
import { CustomerTokensStorage } from '../store/customerTokensStorage'

export class CustomerSignInService {
  private customerStorage = new CustomerTokensStorage()

  public async signInCustomer(customerData: LogInInputsInterface): Promise<void> {
    const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/parfumerie/customers/token?grant_type=password`

    const response = await axios({
      method: 'post',
      url,
      auth: {
        username: 'siFhmtGmnSioXkUJakkWQafJ',
        password: 'wBkMaGx7k8lGflmkfPMt0OZe-Bhj9jy5',
      },
      params: {
        username: customerData.email,
        password: customerData.password,
      },
    })

    this.customerStorage.setLocalStorageCustomerAuthToken(response.data.access_token)
    this.customerStorage.setLocalStorageCustomerRefreshToken(response.data.refresh_token)

    console.log(response.data)
  }
}
