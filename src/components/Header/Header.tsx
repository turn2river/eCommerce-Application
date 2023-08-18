import { NavLink } from 'react-router-dom'
import { Fragment } from 'react'
import { Logo } from '../Logo/Logo.tsx'
import { header, nav, nav_list, nav_item, nav_link } from './Header.module.scss'

const isAuth = false // TODO make this var from context

export const Header = (): JSX.Element => {
  return (
    <header className={header}>
      <Logo />
      <nav className={nav}>
        <ul className={nav_list}>
          <li className={nav_item}>
            <NavLink className={nav_link} to="/">
              Main
            </NavLink>
          </li>
          <li className={nav_item}>
            <NavLink className={nav_link} to="/About">
              About us
            </NavLink>
          </li>
          {isAuth ? (
            <Fragment>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/Profile">
                  Profile
                </NavLink>
              </li>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/">
                  Logout
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/Login">
                  Login
                </NavLink>
              </li>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/Registration">
                  Registrarion
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}
