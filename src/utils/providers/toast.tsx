import { Toast } from 'primereact/toast'
import { ToastMessage } from 'primereact/toast'
import React, { createContext, useContext, useRef } from 'react'

interface ToastContextType {
  showToast: (message: ToastMessage | ToastMessage[]) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = useRef<Toast>(null)

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toastRef.current?.show(message)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
