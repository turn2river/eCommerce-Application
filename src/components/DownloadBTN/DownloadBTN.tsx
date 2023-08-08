import classes from './DownloadBTN.module.scss'

interface IDownloadBTN extends React.ComponentPropsWithRef<'button'> {
  children: string
}

export const DownloadBTN = ({ children }: IDownloadBTN): JSX.Element => {
  return (
    <button className={classes.button}>
      <span className={`${classes['button-caption']}`}>{children}</span>
    </button>
  )
}
