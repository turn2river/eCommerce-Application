import { Typography, Chip, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useState, MouseEvent } from 'react'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { adressCardStyle, typographyBoxStyle, contentStyle, titleStyle, popUpStyle } from './style'
import { EditAdressForm } from '../EditAdressForm/EditAdressForm.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'
import { Address } from '../../services/GetCustomerByTokenService'
import { addressCardFields } from '../../utils/addressCardFields'

export const ProfileAddressesData = ({ userData, token, updateData }: ProfileDataPropsInterface): JSX.Element => {
  const handleDelete = (event: MouseEvent<HTMLElement>): void => {
    console.info(event?.currentTarget?.parentElement?.id)
  }
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [addressID, setAddressID] = useState<string>('')

  const handleClose = (): void => setOpenModal(false)
  return (
    <Box sx={{ display: 'flex' }}>
      {userData?.addresses.map((address: Address) => {
        return (
          <Box key={address.id} id={`address-${address.id}`} sx={adressCardStyle}>
            <Box sx={{ width: '100%' }}>
              {addressCardFields(address).map(({ title, value }) => {
                return (
                  <Box sx={typographyBoxStyle}>
                    <Typography sx={titleStyle}>{title}</Typography>
                    <Typography sx={contentStyle}>{`${value || '-'}`}</Typography>
                  </Box>
                )
              })}
              <Box sx={{ marginBottom: '10px' }}>
                {userData.billingAddressIds.includes(address.id) ? (
                  <Chip
                    id={address.id}
                    label="Billing Adress"
                    onDelete={handleDelete.bind(this)}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                  />
                ) : null}
                {userData.shippingAddressIds.includes(address.id) ? (
                  <Chip
                    id={address.id}
                    onDelete={handleDelete.bind(this)}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Shipping Adress"
                  />
                ) : null}
                {address.id === userData.defaultBillingAddressId ? (
                  <Chip
                    id={address.id}
                    onDelete={handleDelete.bind(this)}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Default billing Adress"
                  />
                ) : null}
                {address.id === userData.defaultShippingAddressId ? (
                  <Chip
                    id={address.id}
                    onDelete={handleDelete.bind(this)}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Default shipping Adress"
                  />
                ) : null}
              </Box>
            </Box>
            <CustomGradientButton
              onClick={(event: MouseEvent<HTMLElement>): void => {
                const id = event.currentTarget.parentElement?.id.split('-')[1]
                setOpenModal(true)
                if (id) {
                  setAddressID(id)
                }
              }}>
              Edit
            </CustomGradientButton>
          </Box>
        )
      })}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={popUpStyle}>
          <EditAdressForm userData={userData} addressID={addressID} token={token} updateData={updateData} />
        </Box>
      </Modal>
    </Box>
  )
}
