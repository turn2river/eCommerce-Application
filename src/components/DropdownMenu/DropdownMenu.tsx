import * as React from 'react'
import { useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import { List, ListItemButton, ListItemText, Menu } from '@mui/material'

const options = ['Lowest price', 'Highest price', 'From A to Z', 'From Z to A']

export function DropdownMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) // initial state in the array
  const [selectedIndex, setSelectedIndex] = useState(1)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number): void => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div>
      <List component="nav" aria-label="Sorting options" sx={{ bgcolor: 'background.paper' }}>
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="sorting options"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}>
          <ListItemText primary="Sort items" secondary={options[selectedIndex]} />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          'role': 'listbox',
        }}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event): void => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
