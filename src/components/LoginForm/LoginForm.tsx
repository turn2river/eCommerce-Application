import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'
import { schema } from '../../utils/LogInValidation'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'

export const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = (data: LogInInputsInterface): LogInInputsInterface => {
    console.log(data)
    return data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={login_form}>
      <h2 className={title}>Log In</h2>
      <div className={wrapper}>
        <p className={subtitle}>Your credentials</p>
        {inputsList.map(({ id, ...inputAtributes }): JSX.Element | undefined => {
          let result
          if (id === 'email') {
            result = (
              <Input
                key={id}
                id={id}
                validation={register('email')}
                error={errors[id]?.message}
                {...{ ...inputAtributes, label: 'Enter your email address:*' }}
              />
            )
          } else if (id === 'password') {
            result = (
              <Input
                key={id}
                id={id}
                error={errors[id]?.message}
                validation={register('password')}
                {...{ ...inputAtributes, label: 'Enter your password:*' }}
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
