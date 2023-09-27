import { toast } from 'react-toastify'
import { CheckBoxStateInterface } from '../components/EditAdressForm/type'
import { GetCustomerByTokenService } from '../services/GetCustomerByTokenService'
import { UpdateUserInfoService } from '../services/UpdateUserInfoDataService'

export async function checkStateOfCheckBox(
  token: string,
  updateUserInfoService: UpdateUserInfoService,
  object: CheckBoxStateInterface,
  key: string,
  id: string = '',
): Promise<void> {
  let action = ''
  switch (key) {
    case 'billingAddress':
      if (object[key as keyof CheckBoxStateInterface]) {
        action = 'addBillingAddressId'
        break
      }
      action = 'removeBillingAddressId'
      break
    case 'defaultBillingAddress':
      action = 'setDefaultBillingAddress'
      break
    case 'shippingAddress':
      if (object[key as keyof CheckBoxStateInterface]) {
        action = 'addShippingAddressId'
        break
      }
      action = 'removeShippingAddressId'
      break
    case 'defaultShippingAddress':
      action = 'setDefaultShippingAddress'
      break
    default:
      break
  }
  // console.log(action)
  const customer = new GetCustomerByTokenService()
  if (token) {
    const customerData = await customer.getCustomerByToken(token)
    let currentID
    if (
      !object[key as keyof CheckBoxStateInterface] &&
      (action === 'setDefaultShippingAddress' || action === 'setDefaultBillingAddress')
    ) {
      currentID = undefined
    } else if (id !== '') {
      currentID = id
    } else if (id === '') {
      currentID = customerData.addresses[customerData.addresses.length - 1].id
    }
    try {
      await updateUserInfoService.modifyUserAddressInfo(token, customerData.version, action, currentID)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }
}
