import { IAutocompleteInput } from './AutocompleteInputInterface'
import { IInputValues } from './InputValuesInterface'
import { IInput } from './InputInterface'

export const inputsList = (
  inputValues: IInputValues,
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  clickHadler?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
): (IAutocompleteInput | IInput)[] => {
  return [
    {
      id: 'email',
      isValid: inputValues.emailIsValid,
      label: 'Enter your valid email:*',
      placeholder: '<E-mail>',
      value: inputValues.email,
      type: 'email',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'password',
      isValid: inputValues.passwordIsValid,
      label: 'Create your password:',
      placeholder: '<Password>',
      value: inputValues.password,
      type: 'password',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'firstName',
      isValid: inputValues.firstNameIsValid,
      label: 'Enter your first name:*',
      placeholder: '<First Name>',
      value: inputValues.firstName,
      type: 'text',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'lastName',
      isValid: inputValues.lastNameIsValid,
      label: 'Enter your last name:*',
      placeholder: '<Last Name>',
      value: inputValues.lastName,
      type: 'text',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'dateOfBirth',
      isValid: inputValues.dateOfBirthIsValid,
      label: 'Enter your date of birth:*',
      placeholder: '<Date of birth>',
      value: inputValues.dateOfBirth,
      type: 'date',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'street',
      isValid: inputValues.streetIsValid,
      label: '',
      placeholder: '<Street>',
      value: inputValues.street,
      type: 'text',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'city',
      isValid: inputValues.cityIsValid,
      label: '',
      placeholder: '<City>',
      value: inputValues.city,
      type: 'text',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'zipCode',
      isValid: inputValues.zipCodeIsValid,
      label: '',
      placeholder: '<Postal code>',
      value: inputValues.zipCode,
      type: 'text',
      onChange: changeHandler,
      required: true,
    },
    {
      id: 'country',
      label: '',
      isValid: true,
      placeholder: '<Country>',
      value: inputValues.country,
      onChange: changeHandler,
      onClick: clickHadler,
      visibility: inputValues.suggestionVisibility,
    },
  ]
}
