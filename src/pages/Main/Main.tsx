import main_page from '../../assets/image/png/main_page.png'
import { container, image } from './Main.module.scss'

export const Main = (): JSX.Element => {
  return (
    <div className={container}>
      <img className={image} src={main_page} alt="main page" />
    </div>
  )
}
