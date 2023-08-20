import { Fragment } from 'react'
import { RegistrationForm } from '../../components'
import { container } from './Registration.module.scss'

export const Registration = (): JSX.Element => {
  return (
    <Fragment>
      <div className={container}>
        <RegistrationForm />
      </div>
    </Fragment>
  )
}
