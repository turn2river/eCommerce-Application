export function convertPrice(price: number): string {
  let result
  if (price % 100) {
    result = price / 100
  } else {
    result = `${price / 100}.00`
  }
  return result.toString()
}
