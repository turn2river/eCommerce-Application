import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'
import { schema } from '../../utils/RegistrationValidation'

export const LoginForm = (): JSX.Element => {
  const { register } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  return (
    <form className={login_form}>
      <h2 className={title}>Log In</h2>
      <div className={wrapper}>
        <p className={subtitle}>Your credentials</p>
        {inputsList.map((element): JSX.Element | undefined => {
          let result
          if (element.id === 'email') {
            result = (
              <Input
                key={element.id}
                validation={register('email')}
                {...{ ...element, label: 'Enter your email address:*' }}
              />
            )
          } else if (element.id === 'password') {
            result = (
              <Input
                key={element.id}
                validation={register('password')}
                {...{ ...element, label: 'Enter your password:*' }}
              />
            )
          }
          return result
        })}
      </div>
      <MyButton>Log In</MyButton>
    </form>
  )
}
