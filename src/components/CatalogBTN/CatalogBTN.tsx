import classes from './CatalogBTN.module.scss'

interface ICatalogBTN extends React.ComponentPropsWithRef<'button'> {
  children: string
}

export const CatalogBTN = ({ children, ...props }: ICatalogBTN): JSX.Element => {
  return (
    <button className={classes.button} {...props}>
      <div className={`${classes['button-icon']}`}></div>
      <span className={`${classes['button-caption']}`}>{children}</span>
    </button>
  )
}
