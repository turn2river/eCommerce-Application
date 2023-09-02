import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { ProfileNavBar } from '../../components/ProfileNavBar/ProfileNavBar.tsx'
import { CustomerTokensStorage } from '../../store/customerTokensStorage'
import { CustomerProfile, GetCustomerByTokenService } from '../../services/GetCustomerByTokenService'
import { ProfilePersonalData } from '../../components/ProfiePersonalData/ProfilePersonalData.tsx'

export const Profile = (): JSX.Element => {
  const [tab, setTab] = useState('personal')
  const [userData, setUserData] = useState<null | CustomerProfile>(null)
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
  }, [])

  return (
    <Container>
      <ProfileNavBar tab={tab} setTab={setTab} />
      {userData ? <ProfilePersonalData userData={userData} setUserData={setUserData} /> : null}
    </Container>
  )
}
