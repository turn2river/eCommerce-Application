import { NavLink } from 'react-router-dom'
import { Fragment } from 'react'
import { Logo } from '../Logo/Logo.tsx'
import { header, nav, nav_list, nav_item, nav_link } from './Header.module.scss'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'

export const Header = (): JSX.Element => {
  const auth = useAuth()
  const { isAuth, setIsAuth } = auth as AuthContextType

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
            <NavLink className={nav_link} to="/about">
              About us
            </NavLink>
          </li>
          {isAuth ? (
            <Fragment>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/" onClick={(): void => setIsAuth(false)}>
                  Log out
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className={nav_item}>
                <NavLink className={nav_link} to="/registration">
                  Sign Up
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}
