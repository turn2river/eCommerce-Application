/* eslint-disable import/extensions */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'
import { schema } from '../../utils/LogInValidation'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'
// import { singInCustomer } from '../../utils/singInCustomer'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextType, useAuth } from '../../store/AuthContext.tsx'
import { CustomerServiceSignIn } from '../../services/CustomerServiceSignIn.ts'

export const LoginForm = (): JSX.Element => {
  const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [userData, setUserData] = useState({})
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
    setErrorMessage('')
    const customerService = new CustomerServiceSignIn()
    console.log(data)
    try {
      await customerService.signInCustomer(data)
      setFormStatus('success')

      setTimeout(() => setIsAuth(true), 5000)
    } catch (error) {
      setFormStatus('error')
      setErrorMessage('Failed to sign in')

      if (error instanceof Error) {
        setFormStatus('error')
        if (error.message === 'Request failed with status code 400') {
          error.message = 'Invalid credentials. Incorrect email or password'
        }
        setErrorMessage(error.message)
      }
    }
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        ...data,
      }
    })
    console.log('data', data)
    return data
  }

  useEffect(() => {
    if (formStatus === 'success') {
      toast.success('Congratulations, you have successfully signed in!')
    } else if (formStatus === 'error') {
      toast.error(errorMessage)
    }
  }, [userData])

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick={false}
        rtl={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <MyButton>Sign In</MyButton>
    </form>
  )
}
