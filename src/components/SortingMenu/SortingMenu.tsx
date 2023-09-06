import { Box, List, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { ProductsSortingService } from '../../services/ProductsSortingService'
import { Product } from '../../models/ProductType'
import { ProductResult } from '../../services/GetProductsByCategoryIdService'

const options = [
  { id: 'none', title: 'default', direction: 'none' },
  { id: 'price', title: 'price ASC', direction: 'asc' },
  { id: 'price', title: 'price DESC', direction: 'desc' },
  { id: 'name', title: 'name A-Z', direction: 'asc' },
  { id: 'name', title: 'name Z-A', direction: 'desc' },
]

interface SortingMenuPropsInterface {
  page: string
  token: string | null
  setProductsData: Dispatch<SetStateAction<(ProductResult | Product)[]>>
}

export const SortingMenu = ({ setProductsData, token, page }: SortingMenuPropsInterface): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const productsSortingService = new ProductsSortingService()

  const handleMenuItemClick = async (event: MouseEvent<HTMLElement>, index: number): Promise<void> => {
    const [id, direction] = event.currentTarget.id.split('-')
    setSelectedIndex(index)
    setAnchorEl(null)
    if (id === 'name' && token) {
      try {
        const productData = await productsSortingService.getSortedProductsByName(token, direction, 26, 0)
        setProductsData(productData)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          toast.error('Something went wrong')
        }
      }
    }
    if (id === 'price' && token) {
      try {
        const productData = await productsSortingService.getSortedProductsByPrice(token, direction, 26, 0)
        setProductsData(productData)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          toast.error('Something went wrong')
        }
      }
    }
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <List component="nav" aria-label="Sorting" sx={{ padding: '0' }}>
        <ListItemButton
          disabled={page !== 'catalogue'}
          id="sort-button"
          aria-haspopup="listbox"
          aria-controls="sort-menu"
          aria-label="Sort by"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{ textAlign: 'center' }}>
          <ListItemText primary="Sort by" secondary={options[selectedIndex].title} />
        </ListItemButton>
      </List>
      <Menu id="Sort-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map(({ id, title, direction }, index) => (
          <MenuItem
            key={index}
            disabled={index === 0}
            id={`${id}-${direction}`}
            selected={index === selectedIndex}
            onClick={(event): Promise<void> => handleMenuItemClick(event, index)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
