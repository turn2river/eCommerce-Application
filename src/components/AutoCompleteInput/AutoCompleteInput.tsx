// import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { countriesArray } from '../../models/CountriesList'
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
  setCountryValue,
  controller,
  trigger,
}: AutocompleteInputProps): JSX.Element => {
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <Controller
        control={controller}
        name={id}
        defaultValue=""
        render={({ field }): JSX.Element => {
          const { value, ...otherAttributes } = field
          return (
            <>
              <input
                type={type}
                className={error ? `${input} ${input_invalid}` : input}
                id={id}
                placeholder={placeholder}
                {...validation}
                value={value instanceof Date ? value.toISOString() : value}
                {...otherAttributes}
              />
              <span className={error_message}>{error}</span>
              <div
                className={
                  value &&
                  !countriesArray.map((country) => country.toLowerCase()).includes(value.toString().toLowerCase())
                    ? suggestions_container
                    : `${suggestions_container} ${suggestions_container_invisible}`
                }>
                {value
                  ? countriesArray.map((country): JSX.Element | undefined => {
                      let result
                      if (typeof value === 'string') {
                        if (country.toLowerCase().startsWith(value.toLowerCase())) {
                          result = (
                            <div
                              className={suggestions}
                              key={country}
                              onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                                const { textContent, parentElement } = e.currentTarget
                                if (textContent) {
                                  setCountryValue(id, textContent)
                                  trigger(id)
                                }
                                parentElement?.classList.add(suggestions_container_invisible)
                              }}>
                              {country}
                            </div>
                          )
                        }
                      }
                      return result
                    })
                  : null}
              </div>
            </>
          )
        }}
      />
    </div>
  )
}
