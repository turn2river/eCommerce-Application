/* eslint-disable max-lines-per-function */
import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircleOutline, Edit } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState, MouseEvent, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { countriesList } from '../../models/CountriesList'
import { validationScheme } from './validationScheme'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { getCountryCode } from '../../utils/GetCountryCode'
import {
  CustomerUpdatedAddressData,
  CustomerUpdatedData,
  UpdateUserInfoService,
} from '../../services/UpdateUserInfoData'
import {
  AddressDataFieldsInterface,
  CheckBoxStateInterface,
  EditAdressFormPropsInterface,
  EditableFieldInterface,
} from './type'
import { addressFormFields } from '../../models/addressFormFields'
import { checkBoxTitle } from '../../utils/createTitleForCheckBox'
import { defaultAddressValues } from '../../models/defaultAddressValues'
import { checkStateOfCheckBox } from '../../utils/checkStateOfCheckBox'

export const EditAdressForm = ({
  userData,
  addressID,
  token,
  updateData,
  closeModal,
}: EditAdressFormPropsInterface): JSX.Element => {
  const currentCardAddress = userData?.addresses.filter((address) => address.id === addressID)[0]

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationScheme),
    defaultValues: defaultAddressValues(currentCardAddress, addressID),
    mode: 'all',
  })

  const [checkBox, setCheckBox] = useState<CheckBoxStateInterface>({
    defaultBillingAddress: addressID === userData?.defaultBillingAddressId,
    defaultShippingAddress: addressID === userData?.defaultShippingAddressId,
    billingAddress: userData?.billingAddressIds.includes(addressID),
    shippingAddress: userData?.shippingAddressIds.includes(addressID),
  })

  function handleOnCheckBoxClick(event: ChangeEvent<HTMLInputElement>): void {
    const id = event.currentTarget.id as keyof CheckBoxStateInterface
    setCheckBox((prevState: CheckBoxStateInterface) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      }
    })
    // console.log(checkBox)
  }

  const [editableField, setEditableField] = useState<EditableFieldInterface>({
    state: false,
    region: false,
    apartment: false,
    streetName: false,
    city: false,
    postalCode: false,
  })

  function onTogglerButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    const id = event.currentTarget.id as keyof EditableFieldInterface
    setEditableField((prevState: EditableFieldInterface) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      }
    })
  }

  const updateUserInfoService = new UpdateUserInfoService()

  async function onSubmit(): Promise<void> {
    if (addressID && token) {
      const body: CustomerUpdatedAddressData = {
        version: userData?.version,
        actions: [
          {
            action: 'changeAddress',
            addressId: addressID,
            address: {
              streetName: getValues('streetName'),
              postalCode: getValues('postalCode'),
              city: getValues('city'),
              country: getCountryCode(getValues('country')),
              building: getValues('building'),
              apartment: getValues('apartment'),
              region: getValues('region'),
              state: getValues('state'),
            },
          },
        ],
      }
      if (Object.values(editableField).every((el) => el === false)) {
        try {
          await updateUserInfoService.updateUserAddressInfo(token, body)
          await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'shippingAddress', addressID)
          await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'billingAddress', addressID)
          await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'defaultShippingAddress', addressID)
          await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'defaultBillingAddress', addressID)
          updateData((prevValue) => {
            const newValue = prevValue + 1
            return newValue
          })
          toast.success('Address updated successfully')
          closeModal(false)
        } catch (error) {
          console.error(error)
          toast.error('Something went wrong')
        }
      } else {
        toast.error('Please save changes in fields')
      }
    } else if (token) {
      if (Object.values(editableField).every((el) => el === false)) {
        const body: CustomerUpdatedData = {
          version: userData?.version,
          actions: [
            {
              action: 'addAddress',
              address: {
                state: getValues('state'),
                region: getValues('region'),
                apartment: getValues('apartment'),
                streetName: getValues('streetName'),
                city: getValues('city'),
                building: getValues('building'),
                postalCode: getValues('postalCode'),
                country: getCountryCode(getValues('country')),
              },
            },
          ],
        }
        try {
          await updateUserInfoService.addUserAddressInfo(token, body)
          if (checkBox.billingAddress) {
            await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'billingAddress')
          }
          if (checkBox.shippingAddress) {
            await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'shippingAddress')
          }
          if (checkBox.defaultBillingAddress) {
            await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'defaultBillingAddress')
          }
          if (checkBox.defaultShippingAddress) {
            await checkStateOfCheckBox(token, updateUserInfoService, checkBox, 'defaultShippingAddress')
          }
          toast.success('Address added successfully')

          updateData((prevValue) => {
            const newValue = prevValue + 1
            return newValue
          })
          closeModal(false)
        } catch (error) {
          console.error(error)
          toast.error('Something went wrong')
        }
      } else {
        toast.error('Please save changes in fields')
      }
    }
  }

  return (
    <form
      style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      onSubmit={handleSubmit(onSubmit)}>
      {addressFormFields.map(({ id, title }: AddressDataFieldsInterface) => {
        let result
        if (id !== 'country') {
          result = (
            <FormControl sx={{ margin: '20px', width: '250px' }} key={id}>
              <InputLabel htmlFor={id}>{title}</InputLabel>
              <OutlinedInput
                id={id}
                label={title}
                disabled={!editableField[id as keyof EditableFieldInterface]}
                {...register(id)}
                error={!!errors[id]?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={`${id}-toggler`}
                      id={id}
                      onClick={onTogglerButtonClick.bind(this)}>
                      {editableField[id as keyof EditableFieldInterface] ? <CheckCircleOutline /> : <Edit />}
                    </IconButton>
                  </InputAdornment>
                }></OutlinedInput>
              {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
            </FormControl>
          )
        } else {
          result = (
            <FormControl sx={{ margin: '20px', width: '250px' }} key={id}>
              <Autocomplete
                id={id}
                options={countriesList}
                onInputChange={(event): void => {
                  if (event.currentTarget.textContent) {
                    setValue(id, event.currentTarget.textContent)
                    trigger('country')
                    trigger('postalCode')
                  }
                }}
                renderInput={(props): JSX.Element => {
                  return (
                    <TextField
                      {...register(id)}
                      {...props}
                      label={title}
                      error={!!errors[id]?.message}
                      helperText={errors[id]?.message}
                    />
                  )
                }}></Autocomplete>
            </FormControl>
          )
        }
        return result
      })}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(checkBox).map((key) => {
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  id={key}
                  checked={checkBox[key as keyof CheckBoxStateInterface]}
                  onChange={handleOnCheckBoxClick.bind(this)}
                />
              }
              sx={{ color: '#beae97' }}
              label={checkBoxTitle(key)}
            />
          )
        })}
      </Box>
      <CustomGradientButton type="submit">Submit</CustomGradientButton>
    </form>
  )
}
