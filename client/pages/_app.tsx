import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client, ssrCache } from '$lib/urql'
import Layout from '$components/Layout'

import '$styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
