export type AnonUserType = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

export type CustomerType = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

export type CustomerData = {
  username: string
  password: string
}

export type RefreshToken = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export type CategoryData = {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: CreatedModifiedBy
  createdBy: CreatedModifiedBy
  key: string
  name: Meta
  slug: Meta
  description: Meta
  ancestors: string[]
  orderHint: string
  metaTitle: Meta
  metaDescription: Meta
  assets: string[]
}

export type Meta = {
  'en-US': string
  'ru': string
}

export type User = {
  typeId: string
  id: string
}

export type CreatedModifiedBy = {
  isPlatformClient: boolean
  user: User
}

export type Token = {
  accessToken: string
  refreshToken: string
}
