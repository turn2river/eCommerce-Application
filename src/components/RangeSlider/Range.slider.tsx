import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Dispatch, SetStateAction, useState } from 'react'

function valuetext(value: number): string {
  return `${value}Euro`
}

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
  // const [priceRange, setPriceRange] = useState<number | number[]>([])
  // @ts-expect-error event is used under the hood of mui
  const handleChange = (event: Event, newValue: number | number[]): void => {
    // priceRangeSetter(newValue as number[])
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
    // console.log(value)
    setValue(newValue as number[])
  }
  const maxPrice = 350
  const minPrice = 1

  const marks = [
    {
      value: minPrice,
      label: minPrice,
    },
    {
      value: maxPrice,
      label: maxPrice,
    },
  ]
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={(): string => 'Price range'}
        value={value} // массив значений из 2х элементов Type: Array<number> | number
        onChange={handleChange}
        valueLabelDisplay="on"
        max={maxPrice}
        min={minPrice}
        marks={marks}
        getAriaValueText={valuetext}
      />
    </Box>
  )
}
