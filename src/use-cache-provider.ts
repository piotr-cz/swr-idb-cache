import { useState, useEffect } from 'react'

import type { CacheProvider, Config } from './types'
import createCacheProvider from './cache-provider'

/**
 * Cache provider hook
 */
export default function useCacheProvider<Data = any, Error = any>(config: Config): CacheProvider<Data> | undefined {
  const [ cacheProvider, setCacheProvider ] = useState<CacheProvider<Data>>()

  useEffect(() => {
    // False on mount or on dependency change
    let isSetup = true

    createCacheProvider<Data, Error>(config)
      .then(cp =>
        // Wrapped because setting state to a function
        isSetup && setCacheProvider(() => cp)
      )

    return () => { isSetup = false }
  }, [])

  return cacheProvider
}
