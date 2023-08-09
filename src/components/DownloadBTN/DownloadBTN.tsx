import classes from './DownloadBTN.module.scss'

interface IDownloadBTN extends React.ComponentPropsWithRef<'button'> {
  children: string
}

export const DownloadBTN = ({ children, ...props }: IDownloadBTN): JSX.Element => {
  console.log(props)
  return (
    <button className={classes.button} {...props}>
      <span className={`${classes['button-caption']}`}>{children}</span>
    </button>
  )
}
