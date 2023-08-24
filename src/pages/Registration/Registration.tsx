import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { RegistrationForm } from '../../components'
import { container, sign_in_link } from './Registration.module.scss'

export const Registration = (): JSX.Element => {
  return (
    <Fragment>
      <div className={container}>
        <RegistrationForm />
        <NavLink className={sign_in_link} to="/login">
          Already have an account? Sign in here!
        </NavLink>
      </div>
    </Fragment>
  )
}
