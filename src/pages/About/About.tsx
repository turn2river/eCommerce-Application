import { container, image } from './About.module.scss'
import about_page from '../../assets/image/png/about_us.png'

export const About = (): JSX.Element => {
  return (
    <div className={container}>
      <img className={image} src={about_page} alt="main page" />
    </div>
  )
}
