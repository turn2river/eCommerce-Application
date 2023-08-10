import './CatalogItem.module.scss'

interface ICatalogItem extends React.ComponentPropsWithRef<'div'> {
  children: string
}

export const CatalogItem = (props: ICatalogItem): JSX.Element => {
  return <div {...props}>{props.children}</div>
}
