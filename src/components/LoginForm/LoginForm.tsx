/* eslint-disable import/extensions */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'
import { schema } from '../../utils/LogInValidation'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'
// import { singInCustomer } from '../../utils/singInCustomer'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'
import { CustomerSignInService } from '../../services/CustomerSignInService.ts'

export const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const auth = useAuth()
  const { setIsAuth } = auth as AuthContextType

  const onSubmit = async (data: LogInInputsInterface): Promise<LogInInputsInterface> => {
    const customerService = new CustomerSignInService()
    console.log(data)
    try {
      await customerService.signInCustomer(data)
      toast.success('Congratulations, you have successfully signed in!')
      setIsAuth(true)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        if (error.message === 'Request failed with status code 400') {
          toast.error('Invalid credentials. Incorrect email or password')
        }
      }
    }
    console.log('data', data)
    return data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={login_form}>
      <h2 className={title}>Sign In</h2>
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
      <MyButton>Sign In</MyButton>
    </form>
  )
}
