import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'First name should only contain letters'),

  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z]+$/, 'Last name should only contain letters'),
  dateOfBirth: Yup.date()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('Date of birth is required')
    .test('age', 'You must be at least 13 years old', (value) => {
      const currentDate = new Date()
      const dob = new Date(value)
      const age = currentDate.getFullYear() - dob.getFullYear()
      if (age < 13) {
        return false
      }
      return true
    }),
})
