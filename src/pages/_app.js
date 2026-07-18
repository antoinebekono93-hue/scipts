import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'

import '../styles/app.sass'

import { NhostProvider } from '@nhost/nextjs'
import { nhost } from '../lib/nhost'

function MyApp({ Component, pageProps }) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <StateContext>
        <Toaster />
        <Component {...pageProps} />
      </StateContext>
    </NhostProvider>
  )
}

export default MyApp
