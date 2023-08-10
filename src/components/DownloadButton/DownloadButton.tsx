import { IDownloadButton } from '../../models/DownloadButtonInterface'
import { button, button_caption } from './DownloadButton.module.scss'

export const DownloadButton = ({ children, ...props }: IDownloadButton): JSX.Element => {
  return (
    <button className={button} {...props}>
      <span className={button_caption}>{children}</span>
    </button>
  )
}
