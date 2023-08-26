import { useState } from 'react'
import {
  container,
  input_label,
  input,
  input_invalid,
  error_message,
  type_toggler,
  type_toggler_active,
  input_wrapper,
} from './Input.module.scss'
import { InputPropsInterface } from '../../models/InputProps'

export const Input = ({ id, label, type, error, validation, placeholder }: InputPropsInterface): JSX.Element => {
  const [togglerState, setTogglerState] = useState({
    active: false,
    inputType: type,
  })
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <div className={input_wrapper}>
        {type === 'password' ? (
          <div
            className={togglerState.active ? `${type_toggler} ${type_toggler_active}` : type_toggler}
            onClick={(): void => {
              setTogglerState((prevTogglerState) => {
                return {
                  ...prevTogglerState,
                  active: !togglerState.active,
                  inputType: prevTogglerState.active ? 'password' : 'text',
                }
              })
            }}></div>
        ) : null}
        <input
          type={togglerState.inputType}
          className={error ? `${input} ${input_invalid}` : input}
          {...validation}
          placeholder={placeholder}
        />
      </div>
      <span className={error_message}>{error}</span>
    </div>
  )
}
