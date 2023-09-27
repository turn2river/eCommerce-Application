import { Box, List, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
// import { ProductsSortingService } from '../../services/ProductsSortingService'
import { Product } from '../../models/ProductType'
import { ProductResult } from '../../services/GetProductsByCategoryIdService'
import { GetFilteredProductsService } from '../../services/GetFilteredProductsService'

const options = [
  // { id: 'none', title: 'default', direction: 'none' },
  { id: 'name.en-US', title: 'name A-Z', direction: 'asc' },
  { id: 'name.en-US', title: 'name Z-A', direction: 'desc' },
  { id: 'price', title: 'price ASC', direction: 'asc' },
  { id: 'price', title: 'price DESC', direction: 'desc' },
]

interface SortingMenuPropsInterface {
  page: string
  categoryID: string
  token: string | null
  filterParams: null | {
    categoriesList: string[]
    priceList: { min: number; max: number }
  }
  setProductsData: Dispatch<SetStateAction<(ProductResult | Product)[]>>
}

export const SortingMenu = ({ setProductsData, token, page, filterParams }: SortingMenuPropsInterface): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const productsSortingService = new GetFilteredProductsService()

  const handleMenuItemClick = async (event: MouseEvent<HTMLElement>, index: number): Promise<void> => {
    const [id, direction] = event.currentTarget.id.split('--')
    setSelectedIndex(index)
    setAnchorEl(null)
    console.log(filterParams)
    if (token && filterParams) {
      try {
        const productData = await productsSortingService.getFilteredProducts(token, filterParams, 26, 0, id, direction)
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
            // disabled={index === 0}
            id={`${id}--${direction}`}
            selected={index === selectedIndex}
            onClick={(event): Promise<void> => handleMenuItemClick(event, index)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
