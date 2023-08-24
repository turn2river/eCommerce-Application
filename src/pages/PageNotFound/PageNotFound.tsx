import { NavLink } from 'react-router-dom'
import { permission_denied, denied__wrapper, astranout, link_to_main } from './PageNotFound.module.scss'
import { nav_link } from '../../components/Header/Header.module.scss'

export const PageNotFound = (): JSX.Element => {
  return (
    <div className={permission_denied}>
      <div className={denied__wrapper}>
        <h1>404</h1>
        <h2>
          LOST IN <span>SPACE</span> Perfumerie? Hmm, looks like that page doesn't exist.
        </h2>
        <img className={astranout} src="./astronaut.svg" />
        <NavLink className={`${nav_link} ${link_to_main}`} to="/">
          Back To Main
        </NavLink>
      </div>
    </div>
  )
}
