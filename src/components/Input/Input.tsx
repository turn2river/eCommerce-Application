import { IInput } from '../../models/InputInterface'
import { container, input_label, input, input_invalid } from './Input.module.scss'

export const Input = ({
  id,
  label,
  type,
  placeholder,
  value,
  disabled,
  isValid,
  onChange,
  required,
}: IInput): JSX.Element => {
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
        onChange={onChange}
        disabled={disabled}
        required={required}

        /* {!isValid && <span className={error}>{errorMessage}</span>} // Display the error message if isValid is false*/
      />
    </div>
  )
}
