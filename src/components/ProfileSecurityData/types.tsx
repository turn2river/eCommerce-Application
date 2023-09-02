export type SecurityDataFieldsIds = 'email' | 'currentPassword' | 'newPassword' | 'confirmPassword'

export interface SecurityDataFieldsInterface {
  id: SecurityDataFieldsIds
  title: string
}
