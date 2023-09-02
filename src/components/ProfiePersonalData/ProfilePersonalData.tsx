import { Box } from '@mui/system'
import { useState, MouseEvent } from 'react'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircleOutline, Edit } from '@mui/icons-material'
import { validationScheme } from './validationScheme'
import { PersonalDataFieldsInterface, PersonalDataFieldsIds } from './types'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'

export const ProfilePersonalData = ({ userData }: ProfileDataPropsInterface): JSX.Element => {
  const fields: PersonalDataFieldsInterface[] = [
    { id: 'firstName', title: 'First name' },
    { id: 'lastName', title: 'Last name' },
    { id: 'dateOfBirth', title: 'Date of Birth' },
  ]

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationScheme),
    mode: 'all',
  })

  const [editableField, setEditableField] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {fields.map(({ id, title }) => {
        let result
        if (id !== 'dateOfBirth') {
          result = (
            <FormControl key={id} variant="outlined" sx={{ margin: '30px', width: '80%' }}>
              <InputLabel htmlFor={id}>{title}</InputLabel>
              <OutlinedInput
                id={id}
                label={title}
                defaultValue={userData ? userData[id] : null}
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
                defaultValue={userData[id]}
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
      <CustomGradientButton>Submit</CustomGradientButton>
    </Box>
  )
}
