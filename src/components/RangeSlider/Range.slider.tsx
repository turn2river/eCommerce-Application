import { Dispatch, SetStateAction, useState } from 'react'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const RangeSlider = ({
  filterParamsSetter,
}: {
  filterParamsSetter: Dispatch<
    SetStateAction<{
      categoriesList: string[]
      priceList: {
        min: number
        max: number
      }
    }>
  >
}): JSX.Element => {
  const [value, setValue] = useState<number[]>([1, 350])

  const handleChange = (_: Event, newValue: number | number[]): void => {
    const [min, max] = value
    const minvalue = min * 100
    const maxvalue = max * 100
    const pricelist = {
      min: minvalue,
      max: maxvalue,
    }
    filterParamsSetter((prevValue) => {
      return {
        ...prevValue,
        priceList: pricelist,
      }
    })
    setValue(newValue as number[])
  }

  const maxPrice = 350
  const minPrice = 1

  const marks = [
    {
      value: minPrice,
      label: `${minPrice} €`,
    },
    {
      value: maxPrice,
      label: `${maxPrice} €`,
    },
  ]

  return (
    <Box sx={{ width: 300 }}>
      <Typography>Set price range:</Typography>
      <Slider
        getAriaLabel={(): string => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={maxPrice}
        min={minPrice}
        marks={marks}
        valueLabelFormat={(currentValue): string => `${currentValue} €`}
      />
    </Box>
  )
}
