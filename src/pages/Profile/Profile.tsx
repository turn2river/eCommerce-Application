import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { ProfileNavBar } from '../../components/ProfileNavBar/ProfileNavBar.tsx'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'
import { CustomerProfile, GetCustomerByTokenService } from '../../services/GetCustomerByTokenService'
import { ProfilePersonalData } from '../../components/ProfiePersonalData/ProfilePersonalData.tsx'
import { ProfileSecurityData } from '../../components/ProfileSecurityData/ProfileSecurityData.tsx'
import { ProfileAddressesData } from '../../components/ProfileAddressesData/ProfileAddressesData.tsx'

export const Profile = (): JSX.Element => {
  const [tab, setTab] = useState('personal')
  const [userData, setUserData] = useState<null | CustomerProfile>(null)
  const [updateData, setUpdateData] = useState(0)
  const customerTokensStorage = new CustomerTokensStorage()
  const customerToken = customerTokensStorage.getLocalStorageCustomerAuthToken()

  useEffect(() => {
    let loading = true
    if (customerToken) {
      const userProfile = new GetCustomerByTokenService()
      userProfile.getCustomerByToken(customerToken).then((response) => {
        if (loading) {
          setUserData(response)
        }
      })
    }
    return () => {
      loading = false
    }
  }, [updateData])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <ProfileNavBar tab={tab} setTab={setTab} />
      {userData && tab === 'personal' ? (
        <ProfilePersonalData userData={userData} token={customerToken} updateData={setUpdateData} />
      ) : null}
      {userData && tab === 'security' ? (
        <ProfileSecurityData userData={userData} updateData={setUpdateData} token={customerToken} />
      ) : null}
      {userData && tab === 'address' ? (
        <ProfileAddressesData userData={userData} token={customerToken} updateData={setUpdateData} />
      ) : null}
    </Container>
  )
}
