import { IMyButton } from '../../models/MyButtonInterface'
import { button, button_caption } from './MyButton.module.scss'

export const MyButton = ({ children, ...props }: IMyButton): JSX.Element => {
  return (
    <button className={button} {...props}>
      <span className={button_caption}>{children}</span>
    </button>
  )
}
