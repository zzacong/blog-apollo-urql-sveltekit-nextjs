import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql'
import { SERVER_URL } from '$lib/config'

const isServerSide = typeof window === 'undefined'

export const ssrCache = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

export const client = createClient({
  url: SERVER_URL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
})
