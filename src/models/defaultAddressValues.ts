import { Address } from '../services/GetCustomerByTokenService'

interface DefaultAddressValuesInterface {
  state: string
  region: string
  apartment: string
  streetName: string
  city: string
  building: string
  postalCode: string
  country: string
}

export const defaultAddressValues = (
  currentCardAddress: Address | undefined,
  addressID: string,
): DefaultAddressValuesInterface => {
  if (addressID && currentCardAddress) {
    return {
      state: currentCardAddress.state,
      region: currentCardAddress.region,
      apartment: currentCardAddress.apartment,
      streetName: currentCardAddress.streetName,
      city: currentCardAddress.city,
      building: currentCardAddress.building,
      postalCode: currentCardAddress.postalCode,
      country: '',
    }
  }
  return {
    state: '',
    region: '',
    apartment: '',
    streetName: '',
    city: '',
    building: '',
    postalCode: '',
    country: '',
  }
}
