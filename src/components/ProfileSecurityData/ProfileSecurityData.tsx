import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material'
import { useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { validationScheme } from './validationScheme'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'
import { SecurityDataFieldsInterface, SecurityDataFieldsIds } from './types.tsx'
import { UpdateUserInfoService } from '../../services/UpdateUserInfoDataService'
import { CustomerSignInService } from '../../services/CustomerSignInService'

export const ProfileSecurityData = ({ userData, token, updateData }: ProfileDataPropsInterface): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationScheme),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const fields: SecurityDataFieldsInterface[] = [
    { id: 'currentPassword', title: 'Current password' },
    { id: 'newPassword', title: 'Enter new password' },
    { id: 'confirmPassword', title: 'Confirm password' },
  ]

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  async function onSubmit(): Promise<void> {
    if (token && userData) {
      const setNewPassword = {
        version: userData.version,
        currentPassword: getValues('currentPassword'),
        newPassword: getValues('confirmPassword'),
      }
      const updateUserInfoService = new UpdateUserInfoService()
      try {
        await updateUserInfoService.updateUserPasswordInfo(token, setNewPassword)
        const customerSignInService = new CustomerSignInService()
        await customerSignInService.signInCustomer({
          email: userData.email,
          password: setNewPassword.newPassword,
        })
        updateData((prevValue) => {
          const newValue = prevValue + 1
          return newValue
        })
        toast.success('User info updated successfully')
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  }

  function onTogglerButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    const id = event.currentTarget.id as SecurityDataFieldsIds

    setPasswordVisibility((prevState) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      }
    })
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id, title }) => {
        return (
          <FormControl key={id} variant="outlined" sx={{ margin: '30px', width: '80%' }}>
            <InputLabel htmlFor={id}>{title}</InputLabel>
            <OutlinedInput
              id={id}
              label={title}
              {...register(id)}
              error={!!errors[id]?.message}
              type={passwordVisibility[id] ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label={`${id}-toggler`} id={id} onClick={onTogglerButtonClick.bind(this)}>
                    {passwordVisibility[id] ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }></OutlinedInput>
            {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
          </FormControl>
        )
      })}
      <CustomGradientButton type="submit">Submit</CustomGradientButton>
    </form>
  )
}
