import { countriesList } from '../models/CountriesList'

export function getCountryCode(countryName: string | undefined): string | null {
  const countryNameInLowerCase = countryName?.toLowerCase()
  return countriesList
    .map((country): string | null => {
      return country.name.toLowerCase() === countryNameInLowerCase ? country.code : null
    })
    .join('')
}
