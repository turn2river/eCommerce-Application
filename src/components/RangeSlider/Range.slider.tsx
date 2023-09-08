import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

function valuetext(value: number): string {
  return `${value}Euro`
}

export const RangeSlider = ({
  priceRangeSetter,
}: {
  priceRangeSetter: (newValue: number | number[]) => void
}): JSX.Element => {
  const [value, setValue] = React.useState<number[]>([1, 350])
  // @ts-expect-error event is used under the hood of mui
  const handleChange = (event: Event, newValue: number | number[]): void => {
    priceRangeSetter(newValue as number[])
    setValue(newValue as number[])
  }
  const maxPrice = 350
  const minPrice = 0

  const marks = [
    {
      value: minPrice,
      label: '1',
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
        marks={marks}
        getAriaValueText={valuetext}
      />
    </Box>
  )
}
