import { useState } from 'react'
import * as Yup from 'yup'
import { MyButton } from '../MyButton/MyButton.tsx'
import { Input } from '../Input/Input.tsx'
import { registration_form, wrapper, title, subtitle } from './RegistrationForm.module.scss'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'
import { IInput } from '../../models/InputInterface'
import { inputsList } from '../../models/InputsList'
import { schema } from '../../utils/RegistrationValidation'
import { IInputValues } from '../../models/ImputValuesInterface'

export const RegistrationForm = (): JSX.Element => {
  const [inputValues, setInputValues] = useState<IInputValues>({
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
    validationErrorMessages: {},
  })

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id } = e.target

    setInputValues((prevInputValues) => {
      return {
        ...prevInputValues,
        [id]: value,
        validationErrorMessages: { ...prevInputValues.validationErrorMessages, [id]: [] },
        [`${id}IsValid`]: true,
      }
    })
  }

  const onSubmit = async (): Promise<void> => {
    const errors: { [key: string]: string[] } = {}
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
        emailIsValid: true,
        passwordIsValid: true,
        firstNameIsValid: true,
        lastNameIsValid: true,
        dateOfBirthIsValid: true,
        streetIsValid: true,
        cityIsValid: true,
        zipCodeIsValid: true,
        countryIsValid: true,
      }))
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const inputId = validationError.path
          const errorMessage = validationError.message
          if (inputId) {
            if (inputId in errors) {
              errors[inputId].push(errorMessage)
            } else {
              errors[inputId] = [errorMessage]
            }
          }
          setInputValues((prevInputvalues) => {
            return {
              ...prevInputvalues,
              [`${inputId}IsValid`]: false,
            }
          })
        })
        setInputValues((prevInputvalues) => {
          return {
            ...prevInputvalues,
            validationErrorMessages: errors,
          }
        })
      }
    }
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): ISignUpDataInterface {
    e.preventDefault()
    onSubmit()
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
            <Input
              key={index}
              {...element}
              errorMessage={
                element.id in inputValues.validationErrorMessages
                  ? inputValues.validationErrorMessages[element.id]
                  : undefined
              }
            />
          ) : null
        })}
      </div>
      <div className={wrapper}>
        <p className={subtitle}>Personal Information</p>
        {inputsList(inputValues, changeHandler).map((element, index): JSX.Element | null => {
          return element.id === 'firstName' || element.id === 'lastName' || element.id === 'dateOfBirth' ? (
            <Input
              key={index}
              {...element}
              errorMessage={
                inputValues.validationErrorMessages ? inputValues.validationErrorMessages[element.id] : undefined
              }
            />
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
            <Input
              key={index}
              {...element}
              errorMessage={
                inputValues.validationErrorMessages ? inputValues.validationErrorMessages[element.id] : undefined
              }
            />
          ) : null
        })}
      </div>
      <MyButton onClick={submitHandler}>Submit</MyButton>
    </form>
  )
}
