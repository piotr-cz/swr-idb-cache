import { useState, useEffect } from 'react'

import type { CacheProvider, Config } from './types'
import createCacheProvider from './cache-provider'

/**
 * Cache provider hook
 */
export default function useCacheProvider<Data = any, Error = any>(props: Config): CacheProvider | undefined {
  const [ cacheProvider, setCacheProvider ] = useState<CacheProvider>()

  useEffect(() => {
    // False on mount or on dependency change
    let isSetup = true

    createCacheProvider<Data, Error>(props)
      .then(cp =>
        isSetup && setCacheProvider(() => cp)
      )

    return () => { isSetup = false }
  }, [])

  return cacheProvider
}
