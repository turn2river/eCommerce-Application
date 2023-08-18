import { useState } from 'react'
import * as Yup from 'yup'
import { MyButton } from '../MyButton/MyButton.tsx'
import { Input } from '../Input/Input.tsx'
import { registration_form, wrapper, title, subtitle } from './RegistrationForm.module.scss'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'
import { IInput } from '../../models/InputInterface'
import { inputsList } from '../../models/InputsList'
import { InputValues } from '../../models/yupType'

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
    emailError: '',
    passwordError: '',
    firstNameError: '',
    lastNameError: '',
    dateOfBirthError: '',
    streetError: '',
    cityError: '',
    zipCodeError: '',
    countryError: '',
  })
  const schema: Yup.ObjectSchema<InputValues> = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .trim()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),

    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'First name should only contain letters')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Last name should only contain letters')
      .required('Last name is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    /* .min(new Date().setFullYear(new Date().getFullYear() - 13), 'You must be at least 13 years old'),*/
    street: Yup.string().required('Street is required'),
    city: Yup.string()
      .matches(/^[a-zA-Z\s-]+$/, 'City should only contain letters, spaces, and hyphens')
      .required('City is required'),
    zipCode: Yup.string()
      .test('zipCode', 'Invalid zipCode', (value) => {
        if (!value) {
          return true // Skip validation if the postalCode field is undefined
        }
        return /^[A-Za-z0-9]{5}([- ]?[A-Za-z0-9]{4})?$/.test(value)
      })
      .nullable() // Allow null values for the postalCode field
      .required('Postal code is required'),
    country: Yup.string().required('Country is required'),
  })
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const newValue = e.target.value
    const inputId = e.target.id

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: newValue,
      [`${inputId}Error`]: '', // Clear the error message
    }))

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
  const onSubmit = async (): Promise<void> => {
    try {
      schema.validateSync(inputValues, { abortEarly: false })
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        emailError: '',
        passwordError: '',
        firstNameError: '',
        lastNameError: '',
        dateOfBirthError: '',
        streetError: '',
        cityError: '',
        zipCodeError: '',
        countryError: '',
      }))
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const inputId = validationError.path
          const errorMessage = validationError.message
          console.log(`Error in ${inputId} field: ${errorMessage}`)
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [`${inputId}Error`]: errorMessage, // Set the error message for the input field
          }))
        })
      }
    }
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): ISignUpDataInterface {
    onSubmit()
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
        {inputsList(inputValues, changeHandler).map((element: IInput, index): JSX.Element | null => {
          return element.id === 'email' || element.id === 'password' ? (
            <Input key={index} {...element} errorMessage={inputValues[`${element.id}Error`]} />
          ) : null
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
