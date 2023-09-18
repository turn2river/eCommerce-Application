import { MouseEvent, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Typography } from '@mui/material'
import { CategoriesService, CategoryData } from '../../services/CategoriesService'
import { AnonTokensStorage } from '../../store/anonTokensStorage'
import { useCataloguePage, CataloguePageContextType } from '../../store/CataloguePageContext.tsx'

// @ts-expect-error why
export const DropdownButton = ({ categoryIdSetter }): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [categoies, setCategories] = useState<CategoryData[] | null>(null)
  const anonTokensStorage = AnonTokensStorage.getInstance()
  const anonUserAuthToken = anonTokensStorage.getLocalStorageAnonAuthToken()
  const categoriesService = new CategoriesService()
  const page = useCataloguePage()
  const { setCurrentPageName } = page as CataloguePageContextType

  useEffect(() => {
    let loading = true
    if (anonUserAuthToken) {
      categoriesService.getCategories(anonUserAuthToken).then((data) => {
        data.forEach((categoryData) => {
          if (loading) {
            if (!('parent' in categoryData)) {
              setCategories((prevValue) => {
                return prevValue ? [...prevValue, categoryData] : [categoryData]
              })
            }
          }
        })
      })
    }
    return () => {
      loading = false
    }
  }, [])

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const { currentTarget } = event
    if (currentTarget && currentTarget instanceof HTMLButtonElement) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleMenuClose = (id: string): void => {
    categoryIdSetter(id)
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
        variant="contained"
        startIcon={<FormatListBulletedIcon />}
        sx={{ height: '100%' }}>
        Categories
      </Button>
      <Menu id="dropdown-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {categoies?.map((category) => {
          return (
            <MenuItem
              key={category.description?.['en-US']}
              onClick={(): void => {
                handleMenuClose(category.id)
                setCurrentPageName('catalogue')
              }}>
              {<Typography variant="h5">{category.description?.['en-US']}</Typography>}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
