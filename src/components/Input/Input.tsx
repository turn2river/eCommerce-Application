import { IInput } from '../../models/InputInterface'
import { container, input_label, input } from './Input.module.scss'

export const Input = ({
  id = undefined,
  label = undefined,
  type = undefined,
  placeholder = undefined,
  value = undefined,
  disabled = undefined,
  onChange,
}: IInput): JSX.Element => {
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        className={input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} // Manually pass the 'disabled' property
      />
    </div>
  )
}
