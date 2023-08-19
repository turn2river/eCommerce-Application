import { useState } from 'react'
import { countriesList } from '../../models/CountriesList'
import {
  container,
  input_label,
  input,
  input_invalid,
  suggestions,
  suggestions_container,
  suggestions_container_invisible,
  error_message,
} from './AutoCompleteInput.module.scss'
import { AutocompleteInputProps } from '../../models/AutocompleteInputProps'

export const AutoCompleteInput = ({
  id,
  label,
  type,
  error,
  placeholder,
  validation,
  setVisibility,
  setCountryValue,
  visibility,
}: AutocompleteInputProps): JSX.Element => {
  const countriesArray = countriesList.map((country) => country.name)
  const [value, setValue] = useState('')
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        type={type}
        className={error ? `${input} ${input_invalid}` : input}
        id={id}
        placeholder={placeholder}
        {...validation}
        onChange={(e): void => {
          if (e.target.value && Number.isNaN(+e.target.value)) {
            setVisibility(true)
          } else {
            setVisibility(false)
          }
          setValue(e.target.value)
        }}
      />
      <span className={error_message}>{error}</span>
      <div
        className={visibility ? suggestions_container : `${suggestions_container} ${suggestions_container_invisible}`}>
        {value
          ? countriesArray.map((country): JSX.Element | undefined => {
              let result
              if (country.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())) {
                result = (
                  <div
                    className={suggestions}
                    key={country}
                    onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                      const { textContent } = e.target as HTMLDivElement
                      if (textContent) {
                        setCountryValue('country', textContent)
                      }
                      setVisibility(false)
                    }}>
                    {country}
                  </div>
                )
              }
              return result
            })
          : null}
      </div>
    </div>
  )
}
