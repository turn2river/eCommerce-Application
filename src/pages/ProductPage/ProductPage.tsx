import { ProductItem } from '../../components/ProductItem/ProductItem.tsx'
// @ts-expect-error why
export const ProductPage = (props): JSX.Element => {
  const { id, imageSource, title, description, variants } = props
  return <ProductItem key={id} imageSource={imageSource} title={title} description={description} variants={variants} />
}
