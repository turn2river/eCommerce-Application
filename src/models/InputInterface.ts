export interface IInput {
  id: string | undefined
  label: string | undefined
  type?: string | undefined
  placeholder: string | undefined
  value: string | undefined
  disabled?: boolean | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
