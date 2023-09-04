import { CardFieldInterface } from '../components/ProfileAddressesData/type'
import { Address } from '../services/GetCustomerByTokenService'

export const addressCardFields = (address: Address): CardFieldInterface[] => {
  return [
    {
      title: 'Postal code: ',
      value: address.postalCode,
    },
    {
      title: 'Country:',
      value: address.country,
    },
    {
      title: 'State:',
      value: address.state,
    },
    {
      title: 'City:',
      value: address.city,
    },
    {
      title: 'Region:',
      value: address.region,
    },
    {
      title: 'Street:',
      value: address.streetName,
    },
    {
      title: 'Building:',
      value: address.building,
    },
    {
      title: 'Apartment:',
      value: address.apartment,
    },
  ]
}
