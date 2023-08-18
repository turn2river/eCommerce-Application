import { useState } from 'react'
import * as Yup from 'yup'
import { MyButton } from '../MyButton/MyButton.tsx'
import { Input } from '../Input/Input.tsx'
import { registration_form, wrapper, title, subtitle } from './RegistrationForm.module.scss'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'
import { IInput } from '../../models/InputInterface'
import { inputsList } from '../../models/InputsList'
import { getCountryCode } from '../../utils/GetCountryCode'
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput.tsx'
import { IAutocompleteInput } from '../../models/AutocompleteInputInterface'
import { schema } from '../../utils/RegistrationValidation'
import { IInputValues } from '../../models/InputValuesInterface'

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
    suggestionVisibility: false,
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
        suggestionVisibility: !!value,
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
              validationErrorMessages: errors,
            }
          })
        })
      }
    }
  }

  function suggestionClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (e.target instanceof HTMLDivElement) {
      const { textContent } = e.target
      if (textContent) {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          country: textContent,
        }))
      }
    }
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      suggestionVisibility: false,
    }))
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): ISignUpDataInterface {
    e.preventDefault()
    onSubmit()
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
        {inputsList(inputValues, changeHandler).map((element: IInput): JSX.Element | null => {
          return element.id === 'email' || element.id === 'password' ? (
            <Input
              key={element.id}
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
        {inputsList(inputValues, changeHandler).map((element): JSX.Element | null => {
          return element.id === 'firstName' || element.id === 'lastName' || element.id === 'dateOfBirth' ? (
            <Input
              key={element.id}
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
        {inputsList(inputValues, changeHandler, suggestionClickHandler).map(
          (element: IInput | IAutocompleteInput): JSX.Element | undefined => {
            let input
            if (element.id === 'street' || element.id === 'city' || element.id === 'zipCode') {
              input = <Input key={element.id} {...element} />
            } else if (element.id === 'country') {
              if ('onClick' in element && 'visibility' in element) {
                input = (
                  <AutoCompleteInput
                    key={element.id}
                    {...element}
                    errorMessage={
                      inputValues.validationErrorMessages ? inputValues.validationErrorMessages[element.id] : undefined
                    }
                  />
                )
              }
            }
            return input
          },
        )}
      </div>
      <MyButton onClick={submitHandler}>Submit</MyButton>
    </form>
  )
}
