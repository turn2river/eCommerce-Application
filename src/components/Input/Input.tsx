import { memo } from 'react'
import { container, input_label, input, input_invalid, error_message } from './Input.module.scss'
import { InputPropsInterface } from '../../models/InputProps'

export const Input = memo(({ id, label, type, error, validation, placeholder }: InputPropsInterface): JSX.Element => {
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        type={type}
        className={error ? `${input} ${input_invalid}` : input}
        {...validation}
        placeholder={placeholder}
      />
      <span className={error_message}>{error}</span>
    </div>
  )
})
