import { Typography, Chip, Modal, Fab } from '@mui/material'
import { Box } from '@mui/system'
import { useState, MouseEvent } from 'react'
import { Add, Delete } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { CustomGradientButton } from '../CustomGradientButton/CustomGradientButton.tsx'
import { adressCardStyle, typographyBoxStyle, contentStyle, titleStyle, popUpStyle } from './style'
import { EditAdressForm } from '../EditAdressForm/EditAdressForm.tsx'
import { ProfileDataPropsInterface } from '../../models/ProfileDataPropsInterface'
import { Address } from '../../services/GetCustomerByTokenService'
import { addressCardFields } from '../../utils/addressCardFields'
import { UpdateUserInfoService } from '../../services/UpdateUserInfoData'

export const ProfileAddressesData = ({ userData, token, updateData }: ProfileDataPropsInterface): JSX.Element => {
  const handleDelete = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    const updateUserInfoService = new UpdateUserInfoService()
    const id = event.currentTarget.parentElement?.id
    if (token && userData && id) {
      try {
        await updateUserInfoService.modifyUserAddressInfo(token, userData.version, 'removeAddress', id)
        updateData((prevValue) => {
          const newValue = prevValue + 1
          return newValue
        })
        toast.success('Address removed successfully')
      } catch (error) {
        toast.error('Something went wrong!')
      }
    }
  }

  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openNewAddressModal, setOpenNewAsdressModal] = useState<boolean>(false)
  const [addressID, setAddressID] = useState<string>('')

  const closeEditAddress = (): void => {
    setOpenEditModal(false)
    setAddressID('')
  }
  const closeNewEditAddress = (): void => setOpenNewAsdressModal(false)
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {userData?.addresses.map((address: Address) => {
        return (
          <Box key={address.id} id={`address-${address.id}`} sx={adressCardStyle}>
            <Box sx={{ width: '100%' }}>
              {addressCardFields(address).map(({ title, value }) => {
                return (
                  <Box sx={typographyBoxStyle} key={title.split(' ').join()}>
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
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                  />
                ) : null}
                {userData.shippingAddressIds.includes(address.id) ? (
                  <Chip
                    id={address.id}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Shipping Adress"
                  />
                ) : null}
                {address.id === userData.defaultBillingAddressId ? (
                  <Chip
                    id={address.id}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Default billing Adress"
                  />
                ) : null}
                {address.id === userData.defaultShippingAddressId ? (
                  <Chip
                    id={address.id}
                    sx={{ margin: '5px 0' }}
                    size="small"
                    variant="outlined"
                    label="Default shipping Adress"
                  />
                ) : null}
                <Chip
                  id={address.id}
                  onDelete={handleDelete.bind(this)}
                  deleteIcon={<Delete />}
                  sx={{ margin: '5px 0' }}
                  size="medium"
                  variant="outlined"
                  label="Remove"
                />
              </Box>
            </Box>
            <CustomGradientButton
              onClick={(event: MouseEvent<HTMLElement>): void => {
                const id = event.currentTarget.parentElement?.id.split('-')[1]
                setOpenEditModal(true)
                if (id) {
                  setAddressID(id)
                }
              }}>
              Edit
            </CustomGradientButton>
          </Box>
        )
      })}
      <Modal open={openEditModal} onClose={closeEditAddress}>
        <Box sx={popUpStyle}>
          <EditAdressForm
            userData={userData}
            addressID={addressID}
            token={token}
            updateData={updateData}
            closeModal={setOpenEditModal}
          />
        </Box>
      </Modal>
      <Modal open={openNewAddressModal} onClose={closeNewEditAddress}>
        <Box sx={popUpStyle}>
          <EditAdressForm
            userData={userData}
            addressID={addressID}
            token={token}
            updateData={updateData}
            closeModal={closeNewEditAddress}
          />
        </Box>
      </Modal>
      <Fab
        sx={{ position: 'sticky', top: '100%', left: '100%' }}
        color="primary"
        aria-label="add"
        onClick={(): void => {
          setOpenEditModal(true)
        }}>
        <Add />
      </Fab>
    </Box>
  )
}
