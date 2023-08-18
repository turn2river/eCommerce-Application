export interface IInput {
  id: string
  label: string
  type?: string | undefined
  placeholder: string
  value: string
  disabled?: boolean | undefined
  isValid: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean | undefined
  key?: number
  errorMessage?: string
}

export interface IChangeService {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
