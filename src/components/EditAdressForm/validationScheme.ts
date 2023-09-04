import { postcodeValidatorExistsForCountry, postcodeValidator } from 'postcode-validator'
import * as Yup from 'yup'
import { countriesArray } from '../../models/CountriesList'
import { getCountryCode } from '../../utils/GetCountryCode'

export const validationScheme = Yup.object().shape({
  state: Yup.string().required('State is required'),
  region: Yup.string().required('Region is required'),
  apartment: Yup.string().required('Apartment is required'),
  streetName: Yup.string().required('Street is required'),
  building: Yup.string().required('Street is required'),

  city: Yup.string()
    .matches(/^[a-zA-Z\s-]+$/, 'City should only contain letters, spaces, and hyphens')
    .required('City is required'),

  postalCode: Yup.string()
    .required('Postal code is required')
    .test('custom-validation', 'Invalid ZIP code', function checkZipCode(value): boolean {
      const { country } = this.parent
      const countryCode = getCountryCode(country)
      let result: boolean = false
      if (!postcodeValidatorExistsForCountry(countryCode || country)) {
        return false
      }
      if (value && countryCode) {
        result = postcodeValidator(value, countryCode)
      }
      return result
    })
    .nullable()
    .required('Postal code is required'),
  country: Yup.string()
    .required('Country is required')
    .test('country', 'invalid country, choose country from suggestion', (value) => {
      if (countriesArray.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
        return true
      }
      return false
    }),
})
