import * as Yup from 'yup'
import { Box } from '@mui/system'
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircleOutline, Edit } from '@mui/icons-material'
import { CustomerProfile } from '../../services/GetCustomerByTokenService'

type FieldId = 'firstName' | 'lastName'

interface FieldsInterface {
  id: FieldId
  title: string
}

interface ProfilePersonalDataPropsInterface {
  userData: CustomerProfile | null
  setUserData: Dispatch<SetStateAction<CustomerProfile | null>>
}

export const ProfilePersonalData = ({ userData, setUserData }: ProfilePersonalDataPropsInterface): JSX.Element => {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[a-zA-Z]+$/, 'First name should only contain letters'),

    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[a-zA-Z]+$/, 'Last name should only contain letters'),
  })

  const fields: FieldsInterface[] = [
    { id: 'firstName', title: 'First name' },
    { id: 'lastName', title: 'Last name' },
  ]

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const [editableField, setEditableField] = useState({
    firstName: false,
    lastName: false,
  })

  function onTogglerButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    const id = event.currentTarget.id as FieldId
    if (!errors.firstName) {
      setEditableField((prevState) => {
        return {
          ...prevState,
          [id]: !prevState[id],
        }
      })
    }

    setUserData((prevData): CustomerProfile | null => {
      return prevData
        ? {
            ...prevData,
            [id]: getValues(id),
          }
        : null
    })
  }

  return (
    <Box>
      {fields.map(({ id, title }) => {
        return (
          <FormControl variant="outlined" sx={{ margin: '30px' }}>
            <InputLabel htmlFor={id}>{title}</InputLabel>
            <OutlinedInput
              id={id}
              label={title}
              defaultValue={userData ? userData[id as keyof typeof userData] : null}
              disabled={!editableField[id as keyof typeof editableField]}
              {...register(`${id}`)}
              error={!!errors[id]?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label={`${id}-toggler`} id={id} onClick={onTogglerButtonClick.bind(this)}>
                    {editableField[id as keyof typeof editableField] ? <CheckCircleOutline /> : <Edit />}
                  </IconButton>
                </InputAdornment>
              }></OutlinedInput>
            {errors[id] ? <FormHelperText error>{errors[id]?.message}</FormHelperText> : null}
          </FormControl>
        )
      })}
    </Box>
  )
}
