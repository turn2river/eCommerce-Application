import { useState } from 'react'
import { login_form, title, wrapper, subtitle } from './LoginForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { IInput } from '../../models/InputInterface'
import { Input } from '../Input/Input.tsx'
import { MyButton } from '../index'

export const LoginForm = (): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    emailIsValid: true,
    passwordIsValid: true,
  })

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const newValue = e.target.value
    switch (e.target.id) {
      case 'email':
        setInputValues({ ...inputValues, email: newValue })
        break
      case 'password':
        setInputValues({ ...inputValues, password: newValue })
        break
      default:
        break
    }
  }

  return (
    <form className={login_form}>
      <h2 className={title}>Log In</h2>
      <div className={wrapper}>
        <p className={subtitle}>Your credentials</p>
        {inputsList(inputValues, changeHandler).map((element: IInput): JSX.Element | undefined => {
          let result
          if (element.id === 'email') {
            result = <Input key={element.id} {...{ ...element, label: 'Enter your email address:*' }} />
          } else if (element.id === 'password') {
            result = <Input key={element.id} {...{ ...element, label: 'Enter your password:*' }} />
          }
          return result
        })}
      </div>
      <MyButton>Log In</MyButton>
    </form>
  )
}
