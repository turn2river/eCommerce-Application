import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CheckCircleOutline, Edit, Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material'
import { Box } from '@mui/system'
import { useState, MouseEvent } from 'react'
import { validationScheme } from './validationScheme'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'
import { SecurityDataFieldsInterface, SecurityDataFieldsIds } from './types.tsx'

export const ProfileSecurityData = ({ userData }: ProfileDataPropsInterface): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationScheme),
    mode: 'onSubmit',
  })

  const fields: SecurityDataFieldsInterface[] = [
    { id: 'email', title: 'E-mail' },
    { id: 'currentPassword', title: 'Current password' },
    { id: 'newPassword', title: 'Enter new password' },
    { id: 'confirmPassword', title: 'Confirm password' },
  ]

  const [editableField, setEditableField] = useState({
    email: false,
  })
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  function onTogglerButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    const id = event.currentTarget.id as SecurityDataFieldsIds
    if (id === 'email') {
      if (!errors[id]) {
        setEditableField((prevState) => {
          return {
            ...prevState,
            [id]: !prevState[id],
          }
        })
      }
    } else {
      setPasswordVisibility((prevState) => {
        return {
          ...prevState,
          [id]: !prevState[id],
        }
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {fields.map(({ id, title }) => {
        let result
        if (userData) {
          if (id === 'email') {
            result = (
              <FormControl variant="outlined" sx={{ margin: '30px', width: '80%' }}>
                <InputLabel htmlFor={id}>{title}</InputLabel>
                <OutlinedInput
                  id={id}
                  label={title}
                  defaultValue={userData[id]}
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
          } else {
            result = (
              <FormControl variant="outlined" sx={{ margin: '30px', width: '80%' }}>
                <InputLabel htmlFor={id}>{'New password'}</InputLabel>
                <OutlinedInput
                  id={id}
                  label={'New password'}
                  {...register(id)}
                  error={!!errors[id]?.message}
                  type={passwordVisibility[id] ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label={`${id}-toggler`}
                        id={id}
                        onClick={onTogglerButtonClick.bind(this)}>
                        {passwordVisibility[id] ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }></OutlinedInput>
                {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
              </FormControl>
            )
          }
        }
        return result
      })}
      <CustomGradientButton>Submit</CustomGradientButton>
    </Box>
  )
}
