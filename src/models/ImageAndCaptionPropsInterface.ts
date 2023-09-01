import { ReactNode } from 'react'

export interface ImageAndCaptionPropsInterface {
  width: string
  height: string
  image: string
  children: ReactNode
  verticalPosition: string
  scale?: string
}
