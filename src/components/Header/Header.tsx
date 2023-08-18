import { Logo } from '../Logo/Logo.tsx'
import { header, nav, nav_list, nav_item } from './Header.module.scss'

export const Header = (): JSX.Element => {
  return (
    <header className={header}>
      <Logo />
      <nav className={nav}>
        <ul className={nav_list}>
          <li className={nav_item}>Home</li>
          <li className={nav_item}>About us</li>
          <li className={nav_item}>Catalog</li>
          <li className={nav_item}>Login</li>
          <li className={nav_item}>Registrarion</li>
        </ul>
      </nav>
    </header>
  )
}
