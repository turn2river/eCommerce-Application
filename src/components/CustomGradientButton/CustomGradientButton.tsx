import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { IMyButton } from '../../models/MyButtonInterface'

const GradientButton = styled(Button)`
  cursor: pointer;
  color: white;
  position: relative;
  padding: 12px 30px;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
  background: none;
  border: 1px solid #d6b88d;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(184, 164, 142, 0.4);
`

export const CustomGradientButton = ({ children }: IMyButton): JSX.Element => {
  return (
    <>
      <GradientButton variant="outlined">{children}</GradientButton>
    </>
  )
}
