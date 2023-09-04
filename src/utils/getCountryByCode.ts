import { countriesList } from '../models/CountriesList'

export function getCountryByCode(countryCode: string | undefined): string | null {
  const countryCodeInLowerCase = countryCode?.toLowerCase()
  return countriesList
    .map((country): string | null => {
      return country.code.toLowerCase() === countryCodeInLowerCase ? country.label : null
    })
    .join('')
}
