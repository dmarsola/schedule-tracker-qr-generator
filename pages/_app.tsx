import { ToastProvider } from '@/src/utils/providers/toast'
import '@/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import 'primeicons/primeicons.css'
import { PrimeReactContext, PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Dynamically import Bootstrap JS on client side only
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </PrimeReactProvider>
  )
}
