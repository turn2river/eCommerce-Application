/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { schema } from '../../utils/RegistrationValidation'
import { Input } from '../Input/Input.tsx'
import {
  registration_form,
  title,
  wrapper,
  subtitle,
  container,
  check_box,
  personal_info,
} from './RegistrationForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { MyButton } from '../MyButton/MyButton.tsx'
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput.tsx'
import { getCountryCode } from '../../utils/GetCountryCode'
import { ISignUpDataInterface } from '../../models/SignUpDataInterface'
import { ISubmitedData } from '../../models/SubmitedDataInterface'
import { AnonTokensStorage } from '../../models/AnonTokensStorage'
import { createNewCustomer } from '../../utils/createNewCutomer'
import { Popup } from '../Popup/Popup.tsx'

const anonTokensStorage = new AnonTokensStorage()
export const anonUserAuthToken = anonTokensStorage.anonAuthToken

export const RegistrationForm = (): JSX.Element => {
  const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
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

  const [checkBoxState, setCheckBoxState] = useState({
    billing_checkbox: true,
    billing_checkbox_default: false,
    shipping_checkbox: true,
    shipping_checkbox_default: false,
  })

  const [visibility, setVisibility] = useState({
    billing_country: false,
    shipping_country: false,
  })

  function checkBoxHandleClick(e: React.MouseEvent<HTMLInputElement>): void {
    const { id, checked } = e.currentTarget
    setCheckBoxState({
      ...checkBoxState,
      [id]: checked,
    })
  }

  const onSubmit = async ({
    email: currentEmail,
    billing_city: currentBillingCity,
    billing_zipCode: currentBillingZipCode,
    billing_country: currentBillingCountry,
    billing_street: currentBillingStreet,
    shipping_city: currentShippingCity,
    shipping_zipCode: currentShippingZipCode,
    shipping_country: currentShippingCountry,
    shipping_street: currentShippingStreet,
    firstName: currentFirstName,
    lastName: currentLastName,
    password: currentCityPassword,
  }: ISubmitedData): Promise<ISignUpDataInterface> => {
    const customerInfo = {
      email: currentEmail,
      password: currentCityPassword,
      firstName: currentFirstName,
      lastName: currentLastName,
      dateOfBirth: getValues('dateOfBirth'),
      isEmailVerified: true,
      addresses: [
        {
          country: getCountryCode(currentBillingCountry),
          firstName: currentFirstName,
          lastName: currentLastName,
          streetName: currentBillingStreet,
          postalCode: currentBillingZipCode,
          city: currentBillingCity,
        },
        {
          country: getCountryCode(currentShippingCountry),
          firstName: currentFirstName,
          lastName: currentLastName,
          streetName: currentShippingStreet,
          postalCode: currentShippingZipCode,
          city: currentShippingCity,
        },
      ],
      defaultShippingAddress: checkBoxState.shipping_checkbox_default ? 1 : null,
      defaultBillingAddress: checkBoxState.billing_checkbox_default ? 0 : null,
      shippingAddresses: checkBoxState.shipping_checkbox ? [1] : [],
      billingAddresses: checkBoxState.billing_checkbox ? [0] : [],
    }
    // TODO: remove console logging below
    console.log(JSON.stringify(customerInfo))

    try {
      // Make the API call to create a new customer
      const response = await createNewCustomer(anonUserAuthToken, customerInfo)

      // Check the server response and set the form status and error message accordingly
      if (response !== undefined) {
        setFormStatus('success')
        setErrorMessage('')
      } else {
        setFormStatus('error')
        setErrorMessage('Failed to create new customer')
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus('error')
        setErrorMessage(error.message)
      }
    }

    return customerInfo
  }
  return (
    <form className={registration_form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={title}>Sign Up</h2>
      <div className={container}>
        <div className="column">
          <div className={wrapper}>
            <p className={subtitle}>Your credentials</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'email' || id === 'password' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
          </div>

          <div className={`${wrapper} ${personal_info}`}>
            <p className={subtitle}>Personal Information</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'firstName' || id === 'lastName' || id === 'dateOfBirth' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
          </div>
        </div>

        <div className="column">
          <div className={wrapper}>
            <p className={subtitle}>Shipping Adress Information:*</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'shipping_street' || id === 'shipping_city' || id === 'shipping_zipCode' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            {inputsList.map(({ id, label, ...inputAtributes }) => {
              return id === 'shipping_country' ? (
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
            <div className={check_box}>
              <input
                id="shipping_checkbox"
                value="shipping"
                type="checkbox"
                defaultChecked={checkBoxState.shipping_checkbox}
                onClick={(e): void => {
                  checkBoxHandleClick(e)
                }}></input>
              <label htmlFor="shipping_checkbox">Use as shipping</label>
            </div>
            <div className={check_box}>
              <input
                id="shipping_checkbox_default"
                value="shipping_default"
                type="checkbox"
                defaultChecked={checkBoxState.shipping_checkbox_default}
                onClick={(e): void => {
                  checkBoxHandleClick(e)
                }}></input>
              <label htmlFor="shipping_checkbox_default">Use as shipping default</label>
            </div>
          </div>

          <div className={wrapper}>
            <p className={subtitle}>Billing Adress Information:*</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'billing_street' || id === 'billing_city' || id === 'billing_zipCode' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            {inputsList.map(({ id, label, ...inputAtributes }) => {
              return id === 'billing_country' ? (
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
            <div className={check_box}>
              <input
                id="billing_checkbox"
                value="billing"
                type="checkbox"
                defaultChecked={checkBoxState.billing_checkbox}
                onClick={(e): void => {
                  checkBoxHandleClick(e)
                }}></input>
              <label htmlFor="billing_checkbox">Use as billing</label>
            </div>
            <div className={check_box}>
              <input
                id="billing_checkbox_default"
                value="billing_default"
                type="checkbox"
                defaultChecked={checkBoxState.billing_checkbox_default}
                onClick={(e): void => {
                  checkBoxHandleClick(e)
                }}></input>
              <label htmlFor="billing_checkbox_default">Use as billing default</label>
            </div>
          </div>
        </div>
      </div>
      {formStatus === 'success' && <Popup message="Congratulations, you have successfully signed up!" />}
      {formStatus === 'error' && <Popup message={errorMessage} />}

      <MyButton>Sign Up</MyButton>
    </form>
  )
}
