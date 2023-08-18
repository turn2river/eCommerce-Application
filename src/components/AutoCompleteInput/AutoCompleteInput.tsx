import { IAutocompleteInput } from '../../models/AutocompleteInputInterface'
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

export const AutoCompleteInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  disabled,
  isValid,
  onChange,
  onClick,
  required,
  visibility,
  errorMessage,
}: IAutocompleteInput): JSX.Element => {
  const countriesArray = countriesList.map((country) => country.name)

  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        className={isValid ? input : `${input} ${input_invalid}`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      {errorMessage
        ? errorMessage.map((error, index) => (
            <span key={index} className={error_message}>
              {error}
            </span>
          ))
        : null}
      <div
        className={visibility ? suggestions_container : `${suggestions_container} ${suggestions_container_invisible}`}>
        {value
          ? countriesArray.map((country): JSX.Element | undefined => {
              let result
              if (country.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())) {
                result = (
                  <div className={suggestions} key={country} onClick={onClick}>
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
