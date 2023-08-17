export interface IInput {
  id: string
  label: string
  type?: string | undefined
  placeholder: string
  value: string | undefined
  disabled?: boolean | undefined
  isValid: boolean | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean | undefined
}
