export interface IInput {
  id: string
  label: string
  type?: string | undefined
  placeholder: string
  value: string
  disabled?: boolean | undefined
  alert: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
