import { IInput } from '../../models/InputInterface'
import { container, input_label, input, input_alert } from './Input.module.scss'

export const Input = ({ id, label, type, placeholder, value, disabled, alert, onChange }: IInput): JSX.Element => {
  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        className={alert ? `${input} ${input_alert}` : input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
