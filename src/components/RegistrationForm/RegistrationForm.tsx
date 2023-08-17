import { useState } from 'react'
import { MyButton } from '../MyButton/MyButton.tsx'
import { Input } from '../Input/Input.tsx'
import { registration_form, wrapper, title, subtitle } from './RegistrationForm.module.scss'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'
import { IInput } from '../../models/InputInterface'
import { inputsList } from '../../models/InputsList'
import { getCountryCode } from '../../utils/GetContryCode'

export const RegistrationForm = (): JSX.Element => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
    emailIsValid: true,
    passwordIsValid: true,
    firstNameIsValid: true,
    lastNameIsValid: true,
    dateOfBirthIsValid: true,
    streetIsValid: true,
    cityIsValid: true,
    zipCodeIsValid: true,
    countryIsValid: true,
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
      case 'firstName':
        setInputValues({ ...inputValues, firstName: newValue })
        break
      case 'lastName':
        setInputValues({ ...inputValues, lastName: newValue })
        break
      case 'dateOfBirth':
        setInputValues({ ...inputValues, dateOfBirth: newValue })
        break
      case 'street':
        setInputValues({ ...inputValues, street: newValue })
        break
      case 'city':
        setInputValues({ ...inputValues, city: newValue })
        break
      case 'zipCode':
        setInputValues({ ...inputValues, zipCode: newValue })
        break
      case 'country':
        setInputValues({ ...inputValues, country: newValue })
        break
      default:
        break
    }
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): ISignUpDataInterface {
    e.preventDefault()
    const customerInfo = {
      email: inputValues.email,
      password: inputValues.password,
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      dateOfBirth: inputValues.dateOfBirth,
      isEmailVerified: true,
      addresses: [
        {
          country: getCountryCode(inputValues.country),
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
          streetName: inputValues.street,
          postalCode: inputValues.zipCode,
          city: inputValues.city,
        },
      ],
    }
    // TODO: remove console logging below
    console.log(customerInfo)
    return customerInfo
  }

  return (
    <form className={registration_form}>
      <h2 className={title}>Sign Up</h2>
      <div className={wrapper}>
        <p className={subtitle}>Your credentials</p>
        {inputsList(inputValues, changeHandler).map((element: IInput, index): JSX.Element | null => {
          return element.id === 'email' || element.id === 'password' ? <Input key={index} {...element} /> : null
        })}
      </div>
      <div className={wrapper}>
        <p className={subtitle}>Personal Information</p>
        {inputsList(inputValues, changeHandler).map((element, index): JSX.Element | null => {
          return element.id === 'firstName' || element.id === 'lastName' || element.id === 'dateOfBirth' ? (
            <Input key={index} {...element} />
          ) : null
        })}
      </div>
      <div className={wrapper}>
        <p className={subtitle}>Adress Information:*</p>
        {inputsList(inputValues, changeHandler).map((element, index): JSX.Element | null => {
          return element.id === 'street' ||
            element.id === 'city' ||
            element.id === 'zipCode' ||
            element.id === 'country' ? (
            <Input key={index} {...element} />
          ) : null
        })}
      </div>
      <MyButton onClick={submitHandler}>Submit</MyButton>
    </form>
  )
}
