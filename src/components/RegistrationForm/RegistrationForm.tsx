/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { schema } from '../../utils/RegistrationValidation'
import { Input } from '../Input/Input.tsx'
import {
  registration_form,
  title,
  card_wrapper,
  subtitle,
  container,
  check_box,
  checkbox_wrapper,
  cards_row,
} from './RegistrationForm.module.scss'
import { inputsList } from '../../models/InputsList'
import { MyButton } from '../MyButton/MyButton.tsx'
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput.tsx'
import { getCountryCode } from '../../utils/GetCountryCode'
import { SignUpDataInterface } from '../../models/SignUpDataInterface'
import { RegistrationInputsInterface } from '../../models/RegistrationInputsInterface'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'
import { CustomerSignInService } from '../../services/CustomerSignInService'
import { CustomerSignUpService } from '../../services/CustomerSignUpService'
import { useAuth, AuthContextType } from '../../store/AuthContext.tsx'

export const RegistrationForm = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const customerService = new CustomerSignInService()
  const customerServiceSignUp = new CustomerSignUpService()
  const auth = useAuth()
  const { setIsAuth } = auth as AuthContextType

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const [checkBoxState, setCheckBoxState] = useState({
    billing_checkbox: true,
    billing_checkbox_default: false,
    shipping_checkbox: true,
    shipping_checkbox_default: false,
    use_as_billing_address: false,
  })

  function checkBoxHandleClick(e: React.MouseEvent<HTMLInputElement>): void {
    const { id, checked } = e.currentTarget
    setCheckBoxState({
      ...checkBoxState,
      [id]: checked,
    })
    if (id === 'use_as_billing_address' && checked) {
      setValue('billing_street', getValues('shipping_street'))
      setValue('billing_city', getValues('shipping_city'))
      setValue('billing_zipCode', getValues('shipping_zipCode'))
      setValue('billing_country', getValues('shipping_country'))
      trigger('billing_city')
      trigger('billing_country')
      trigger('billing_street')
      trigger('billing_zipCode')
    } else if (id === 'use_as_billing_address' && !checked) {
      setValue('billing_street', '')
      setValue('billing_city', '')
      setValue('billing_zipCode', '')
      setValue('billing_country', '')
    }
    // console.log(id, checked)
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
  }: RegistrationInputsInterface): Promise<SignUpDataInterface> => {
    const shippingAddressInArray = 1
    const billingAddressInArray = 0
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
      defaultShippingAddress: checkBoxState.shipping_checkbox_default ? shippingAddressInArray : null,
      defaultBillingAddress: checkBoxState.billing_checkbox_default ? billingAddressInArray : null,
      shippingAddresses: [shippingAddressInArray],
      billingAddresses: [billingAddressInArray],
    }
    // TODO: remove console logging below
    // console.log(JSON.stringify(customerInfo))
    if (anonUserAuthToken) {
      try {
        // Make the API call to create a new customer
        await customerServiceSignUp.signUpCustomer(anonUserAuthToken, customerInfo)
        // Check the server response and set the form status and error message accordingly
        toast.success('Congratulations, you have successfully signed up!')
        setIsAuth(true)
        const customerloginIngfo: LogInInputsInterface = {
          email: customerInfo.email,
          password: customerInfo.password,
        }
        try {
          await customerService.signInCustomer(customerloginIngfo)
        } catch (error) {
          if (error instanceof Error) {
            if (error.message === 'Request failed with status code 400') {
              toast.error('Invalid credentials. Incorrect email or password')
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Request failed with status code 400') {
            toast.error('Account already exists. Try to sign in.')
          }
        }
      }
    }
    return customerInfo
  }

  return (
    <form className={registration_form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={title}>Sign Up</h2>
      <div className={container}>
        <div className={cards_row}>
          <div className={card_wrapper}>
            <p className={subtitle}>Your credentials</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'email' || id === 'password' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
          </div>

          <div className={`${card_wrapper}`}>
            <p className={subtitle}>Personal Information</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'firstName' || id === 'lastName' || id === 'dateOfBirth' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
          </div>
        </div>

        <div className={cards_row}>
          <div className={card_wrapper}>
            <p className={subtitle}>Shipping Address Information:*</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'shipping_street' || id === 'shipping_city' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            {inputsList.map(({ id, label, ...inputAtributes }) => {
              return id === 'shipping_country' ? (
                <AutoCompleteInput
                  key={id}
                  id={id}
                  label={label}
                  {...inputAtributes}
                  validation={register(id)}
                  error={errors[id]?.message}
                  setCountryValue={setValue}
                  controller={control}
                  trigger={trigger}
                />
              ) : null
            })}
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'shipping_zipCode' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            <div className={checkbox_wrapper}>
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
              <div className={check_box}>
                <input
                  id="use_as_billing_address"
                  value="use_as_billing_address"
                  type="checkbox"
                  defaultChecked={checkBoxState.use_as_billing_address}
                  onClick={(e): void => {
                    checkBoxHandleClick(e)
                  }}></input>
                <label htmlFor="use_as_billing_address">Use as billing address</label>
              </div>
            </div>
          </div>
          <div className={card_wrapper}>
            <p className={subtitle}>Billing Address Information:*</p>
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'billing_street' || id === 'billing_city' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            {inputsList.map(({ id, label, ...inputAtributes }) => {
              return id === 'billing_country' ? (
                <AutoCompleteInput
                  key={id}
                  id={id}
                  label={label}
                  {...inputAtributes}
                  validation={register(id)}
                  error={errors[id]?.message}
                  setCountryValue={setValue}
                  controller={control}
                  trigger={trigger}
                />
              ) : null
            })}
            {inputsList.map(({ id, ...inputAtributes }) => {
              return id === 'billing_zipCode' ? (
                <Input key={id} id={id} {...inputAtributes} validation={register(id)} error={errors[id]?.message} />
              ) : null
            })}
            <div className={checkbox_wrapper}>
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
      </div>
      <MyButton>Sign Up</MyButton>
    </form>
  )
}
