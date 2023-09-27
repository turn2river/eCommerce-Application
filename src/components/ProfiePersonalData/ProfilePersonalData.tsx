import { useState, MouseEvent } from 'react'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircleOutline, Edit } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { validationScheme } from './validationScheme'
import { PersonalDataFieldsInterface, PersonalDataFieldsIds } from './types'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'
import { UpdateUserInfoService } from '../../services/UpdateUserInfoDataService'

export const ProfilePersonalData = ({ userData, token, updateData }: ProfileDataPropsInterface): JSX.Element | null => {
  const fields: PersonalDataFieldsInterface[] = [
    { id: 'firstName', title: 'First name' },
    { id: 'lastName', title: 'Last name' },
    { id: 'dateOfBirth', title: 'Date of Birth' },
    { id: 'email', title: 'Email' },
  ]

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationScheme),
    defaultValues: userData
      ? {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          dateOfBirth: userData?.dateOfBirth,
          email: userData?.email,
        }
      : undefined,
    mode: 'all',
  })

  const [editableField, setEditableField] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
  })

  function onTogglerButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    const id = event.currentTarget.id as PersonalDataFieldsIds
    if (!errors[id]) {
      setEditableField((prevState) => {
        return {
          ...prevState,
          [id]: !prevState[id],
        }
      })
    }
  }

  async function onSubmit(): Promise<void> {
    if (Object.values(editableField).every((value) => value === false) && token && userData) {
      const newUserData = {
        version: userData.version,
        actions: [
          {
            action: 'setFirstName',
            firstName: getValues('firstName'),
          },
          {
            action: 'setLastName',
            lastName: getValues('lastName'),
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: getValues('dateOfBirth'),
          },
          {
            action: 'changeEmail',
            email: getValues('email'),
          },
        ],
      }
      const updateUserInfoService = new UpdateUserInfoService()
      try {
        await updateUserInfoService.updateUserPersonalInfo(token, newUserData)
        updateData((prevValue) => {
          const newValue = prevValue + 1
          return newValue
        })
        toast.success('User info updated successfully')
      } catch (error) {
        toast.error('Something went wrong')
      }
      console.log(newUserData)
    } else {
      toast.error('Please save changes in fields')
    }
  }

  return userData ? (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id, title }) => {
        let result
        if (id !== 'dateOfBirth') {
          result = (
            <FormControl key={id} variant="outlined" sx={{ margin: '30px', width: '80%' }}>
              <InputLabel htmlFor={id}>{title}</InputLabel>
              <OutlinedInput
                id={id}
                label={title}
                disabled={!editableField[id]}
                {...register(id)}
                error={!!errors[id]?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={`${id}-toggler`}
                      id={id}
                      onClick={onTogglerButtonClick.bind(this)}>
                      {editableField[id] ? <CheckCircleOutline /> : <Edit />}
                    </IconButton>
                  </InputAdornment>
                }></OutlinedInput>
              {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
            </FormControl>
          )
        } else if (userData) {
          result = (
            <FormControl key={id} variant="outlined" sx={{ margin: '30px', width: '80%' }}>
              <InputLabel htmlFor={id}>{title}</InputLabel>
              <OutlinedInput
                id={id}
                label={title}
                disabled={!editableField[id]}
                type="date"
                {...register(id)}
                error={!!errors[id]?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={`${id}-toggler`}
                      id={id}
                      onClick={onTogglerButtonClick.bind(this)}>
                      {editableField[id] ? <CheckCircleOutline /> : <Edit />}
                    </IconButton>
                  </InputAdornment>
                }></OutlinedInput>
              {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
            </FormControl>
          )
        }
        return result
      })}
      <CustomGradientButton type="submit">Submit</CustomGradientButton>
    </form>
  ) : null
}
