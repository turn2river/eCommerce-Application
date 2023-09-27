import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastPopUp = (): JSX.Element => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeButton={true}
      closeOnClick={true}
      rtl={false}
      pauseOnHover
      theme="light"
    />
  )
}
