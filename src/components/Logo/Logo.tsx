import { NavLink } from 'react-router-dom'
import { logo, logo_caption, logo_image } from './Logo.module.scss'
import logoImage from '../../../public/logo.svg'

export const Logo = (): JSX.Element => {
  return (
    <NavLink to="/" className={logo}>
      <img className={logo_image} src={logoImage} alt="logo.svg" />
      <h1 className={logo_caption}>Parfumerie</h1>
    </NavLink>
  )
}
