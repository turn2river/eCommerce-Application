export interface IMyButton {
  type?: ('button' | 'submit' | 'reset' | undefined) | undefined
  children: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  form?: string
}
