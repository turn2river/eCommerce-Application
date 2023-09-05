import { Tabs, Tab } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PinDropIcon from '@mui/icons-material/PinDrop'
import SecurityIcon from '@mui/icons-material/Security'

export const ProfileNavBar = ({ tab, setTab }: ProfileNavBarPropsInterface): JSX.Element => {
  const [value, setValue] = useState(tab)
  // @ts-expect-error why
  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setValue(newValue)
    setTab(newValue)
  }

  const tabs = [
    {
      title: 'Personal data',
      value: 'personal',
      icon: AccountCircleIcon,
    },
    {
      title: 'Addresses',
      value: 'address',
      icon: PinDropIcon,
    },
    {
      title: 'Security',
      value: 'security',
      icon: SecurityIcon,
    },
  ]

  return (
    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons={false} aria-label="profile tabs">
      {tabs.map(({ title: currentTitle, value: currentValue, icon: CurrentIcon }) => (
        <Tab key={currentValue} label={currentTitle} value={currentValue} icon={<CurrentIcon />} iconPosition="start" />
      ))}
    </Tabs>
  )
}

interface ProfileNavBarPropsInterface {
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}
