import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { IMyButton } from '../../models/MyButtonInterface'

const GradientButton = styled(Button)`
  cursor: pointer;
  color: white;
  position: relative;
  padding: 12px 20px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  text-transform: uppercase;
  background: none;
  border: 1px solid #d6b88d;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(184, 164, 142, 0.4);
  max-width: fit-content;
`

export const CustomGradientButton = ({ children, ...props }: IMyButton): JSX.Element => {
  return (
    <>
      <GradientButton {...props} variant="contained">
        {children}
      </GradientButton>
    </>
  )
}
