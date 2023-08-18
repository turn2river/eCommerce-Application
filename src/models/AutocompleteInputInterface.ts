import { IInput } from './InputInterface'

export interface IAutocompleteInput extends IInput {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  visibility: boolean
  errorMessage?: string[]
}
