import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { schema } from '../../utils/RegistrationValidation'
import { Input } from '../Input/Input.tsx'
import { registration_form, title, wrapper, subtitle } from './RegistrationForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { MyButton } from '../MyButton/MyButton.tsx'
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput.tsx'
import { getCountryCode } from '../../utils/GetCountryCode'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'

export const RegistrationForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  function submitHandler(e: React.MouseEvent<HTMLButtonElement>): ISignUpDataInterface {
    e.preventDefault()
    const customerInfo = {
      email: getValues('email'),
      password: getValues('password'),
      firstName: getValues('firstName'),
      lastName: getValues('lastName'),
      dateOfBirth: getValues('dateOfBirth'),
      isEmailVerified: true,
      addresses: [
        {
          country: getCountryCode(getValues('country')),
          firstName: getValues('firstName'),
          lastName: getValues('lastName'),
          streetName: getValues('street'),
          postalCode: getValues('zipCode'),
          city: getValues('city'),
        },
      ],
    }
    // TODO: remove console logging below
    console.log(customerInfo)
    return customerInfo
  }

  const [visibility, setVisibility] = useState(false)

  const onSubmit = (): void => console.log('submited')

  return (
    <form className={registration_form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={title}>Sign Up</h2>

      <div className={wrapper}>
        <p className={subtitle}>Your credentials</p>
        {inputsList.map(({ id, ...inputAtributes }) => {
          return id === 'email' || id === 'password' ? (
            <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
          ) : null
        })}
      </div>

      <div className={wrapper}>
        <p className={subtitle}>Personal Information</p>
        {inputsList.map(({ id, ...inputAtributes }) => {
          return id === 'firstName' || id === 'lastName' || id === 'dateOfBirth' ? (
            <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
          ) : null
        })}
      </div>

      <div className={wrapper}>
        <p className={subtitle}>Adress Information:*</p>
        {inputsList.map(({ id, ...inputAtributes }) => {
          return id === 'street' || id === 'city' || id === 'zipCode' ? (
            <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
          ) : null
        })}
        {inputsList.map(({ id, label, ...inputAtributes }) => {
          return id === 'country' ? (
            <AutoCompleteInput
              key={id}
              id={id}
              label={label}
              visibility={visibility}
              {...inputAtributes}
              validation={register(id)}
              error={errors[id]?.message}
              setVisibility={setVisibility}
              setCountryValue={setValue}
            />
          ) : null
        })}
      </div>

      <MyButton onClick={submitHandler}>Sign Up</MyButton>
    </form>
  )
}
