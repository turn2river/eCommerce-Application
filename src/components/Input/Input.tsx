import { IInput } from '../../models/InputInterface'
import { container, input_label, input, input_alert } from './Input.module.scss'

export const Input = ({ id, label, type, placeholder, value, disabled, alert, onChange }: IInput): JSX.Element => {
  let className: string = ''

  if (alert) {
    className = `${input} ${input_alert}`
  } else {
    className = input
  }

  return (
    <div className={container}>
      <label htmlFor={id} className={input_label}>
        {label}
      </label>
      <input
        className={className}
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
