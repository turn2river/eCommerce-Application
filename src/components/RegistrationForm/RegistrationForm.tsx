import { useState } from 'react'
import { MyButton } from '../MyButton/MyButton.tsx'
import { Input } from '../Input/Input.tsx'
import { registration_form, wrapper, title, subtitle } from './RegistrationForm.module.scss'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'

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
      dateOfBirth: inputValues.dateOfBirth, // date format has to be 'YYYY-MM-DD'
      isEmailVerified: true,
      addresses: [
        {
          country: inputValues.country, // country format has to be'RU'
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
        <Input
          id="email"
          isValid={inputValues.emailIsValid}
          label="Enter your valid email:*"
          placeholder="<E-mail>"
          value={inputValues.email}
          type="email"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="password"
          isValid={inputValues.passwordIsValid}
          label="Create your password:"
          placeholder="<Password>"
          value={inputValues.password}
          type="password"
          onChange={changeHandler}
          required={true}></Input>
      </div>
      <div className={wrapper}>
        <p className={subtitle}>Personal Information</p>
        <Input
          id="firstName"
          isValid={inputValues.firstNameIsValid}
          label="Enter your first name:*"
          placeholder="<First Name>"
          value={inputValues.firstName}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="lastName"
          isValid={inputValues.lastNameIsValid}
          label="Enter your last name:*"
          placeholder="<Last Name>"
          value={inputValues.lastName}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="dateOfBirth"
          isValid={inputValues.dateOfBirthIsValid}
          label="Enter your date of birth:*"
          placeholder="<Date of birth>"
          value={inputValues.dateOfBirth}
          type="date"
          onChange={changeHandler}
          required={true}></Input>
      </div>
      <div className={wrapper}>
        <p className={subtitle}>Adress Information:*</p>
        <Input
          id="street"
          isValid={inputValues.streetIsValid}
          label=""
          placeholder="<Street>"
          value={inputValues.street}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="city"
          isValid={inputValues.cityIsValid}
          label=""
          placeholder="<City>"
          value={inputValues.city}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="zipCode"
          isValid={inputValues.zipCodeIsValid}
          label=""
          placeholder="<Postal code>"
          value={inputValues.zipCode}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
        <Input
          id="country"
          isValid={inputValues.countryIsValid}
          label=""
          placeholder="<Country>"
          value={inputValues.country}
          type="text"
          onChange={changeHandler}
          required={true}></Input>
      </div>
      <MyButton onClick={submitHandler}>Submit</MyButton>
    </form>
  )
}
