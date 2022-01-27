import { useState, useEffect } from 'react'

import type { TCacheProvider, TConfig } from './types'
import createCacheProvider from './cache-provider'

/**
 * Cache provider hook
 */
export default function useCacheProvider<Data = any, Error = any>(config: TConfig): TCacheProvider | undefined {
  const [ cacheProvider, setCacheProvider ] = useState<TCacheProvider>()

  useEffect(() => {
    // False on mount or on dependency change
    let isSetup = true

    createCacheProvider<Data, Error>(config)
      .then(cp =>
        isSetup && setCacheProvider(() => cp)
      )

    return () => { isSetup = false }
  }, [config])

  return cacheProvider
}
