/* eslint-disable import/extensions */
/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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
import 'react-toastify/dist/ReactToastify.css'
import { LogInInputsInterface } from '../../models/LogInInputsInterface'
import { CustomerServiceSignIn } from '../../services/customerServiceSignIn'
import { CustomerServiceSignUp } from '../../services/customerServiceSignUp.ts'
import { useAuth, AuthContextType } from '../../store/AuthContext.tsx'

export const RegistrationForm = (): JSX.Element => {
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const customerService = new CustomerServiceSignIn()
  const customerServiceSignUp = new CustomerServiceSignUp()
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

  const [userData, setUserData] = useState({})

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
      shippingAddresses: [1],
      billingAddresses: [0],
    }
    // TODO: remove console logging below
    console.log(JSON.stringify(customerInfo))
    if (anonUserAuthToken) {
      try {
        // Make the API call to create a new customer
        const response = await customerServiceSignUp.createCustomer(anonUserAuthToken, customerInfo)
        // Check the server response and set the form status and error message accordingly
        if (response !== undefined) {
          setFormStatus('success')
          setErrorMessage('')
          setTimeout(() => setIsAuth(true), 5000)
        } else {
          setFormStatus('error')
          setErrorMessage('Failed to create new customer')
        }
      } catch (error) {
        if (error instanceof Error) {
          setFormStatus('error')
          if (error.message === 'Request failed with status code 400') {
            error.message = 'Account already exists. Try to sign in.'
          }
          setErrorMessage(error.message)
        }
      }
    }
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        ...customerInfo,
      }
    })
    const customerloginIngfo: LogInInputsInterface = {
      email: customerInfo.email,
      password: customerInfo.password,
    }

    try {
      await customerService.signInCustomer(customerloginIngfo)

      setFormStatus('success')
      setErrorMessage('')

      setFormStatus('error')
      setErrorMessage('Failed to sign in')
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus('error')
        if (error.message === 'Request failed with status code 400') {
          error.message = 'Invalid credentials. Incorrect email or password'
        }
        setErrorMessage(error.message)
      }
    }
    return customerInfo
  }

  useEffect(() => {
    if (formStatus === 'success') {
      toast.success('Congratulations, you have successfully signed up!')
    } else if (formStatus === 'error') {
      toast.error(errorMessage)
    }
  }, [userData])

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
      <MyButton>Sign Up</MyButton>
    </form>
  )
}
