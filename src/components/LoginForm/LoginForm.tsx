import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'
import { schema } from '../../utils/LogInValidation'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'
import { singInCustomer } from '../../utils/singInCustomer'
import { Popup } from '../Popup/Popup.tsx'

export const LoginForm = (): JSX.Element => {
  const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (data: LogInInputsInterface): Promise<LogInInputsInterface> => {
    console.log(data)
    try {
      const response = await singInCustomer(data)
      if (response !== undefined) {
        setFormStatus('success')
        setErrorMessage('')
      } else {
        setFormStatus('error')
        setErrorMessage('Failed to sign in')
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus('error')
        if (error.message === 'Request failed with status code 400') {
          error.message = 'Check your login and password'
        }
        setErrorMessage(error.message)
      }
    }

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
      {formStatus === 'success' && <Popup message="Congratulations, you have successfully signed in!" />}
      {formStatus === 'error' && <Popup message={errorMessage} />}
      <MyButton>Log In</MyButton>
    </form>
  )
}
