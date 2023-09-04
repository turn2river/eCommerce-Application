export const checkBoxTitle = (key: string): string | undefined => {
  let title
  switch (key) {
    case 'billingAddress':
      title = 'Set as billing address'
      break
    case 'shippingAddress':
      title = 'Set as shipping address'
      break
    case 'defaultShippingAddress':
      title = 'Set as default shipping address'
      break
    case 'defaultBillingAddress':
      title = 'Set as default billing address'
      break
    default:
      break
  }
  return title
}
