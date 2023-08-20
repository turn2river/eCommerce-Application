import React, { useState } from 'react'
import { popup } from './Popup.module.scss'

type PopupProps = {
  message: string
}

export const Popup: React.FC<PopupProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleClose = (): void => {
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div className={popup}>
          <h2>{message}</h2>

          <button className="button" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </>
  )
}
