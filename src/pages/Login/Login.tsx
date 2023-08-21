import { NavLink } from 'react-router-dom'
import { container, sign_up_link } from './Login.module.scss'
import { LoginForm } from '../../components/LoginForm/LoginForm.tsx'

export const Login = (): JSX.Element => {
  return (
    <div className={container}>
      <LoginForm />
      <NavLink className={sign_up_link} to="/Registration">
        Sign Up Here
      </NavLink>
    </div>
  )
}
