import { useState, useEffect } from 'react'

import type { TCacheProvider, TConfig } from './types'
import createCacheProvider from './cache-provider'

/**
 * Cache provider hook
 */
export default function useCacheProvider<Data = any, Error = any>(
  options: TConfig = {}
): TCacheProvider | undefined {
  const [ cacheProvider, setCacheProvider ] = useState<TCacheProvider>()

  useEffect(() => {
    // False on mount or on dependency change
    let isSetup = true

    createCacheProvider<Data, Error>(options)
      .then(cp =>
        isSetup && setCacheProvider(() => cp)
      )

    return () => { isSetup = false }
  }, [options])

  return cacheProvider
}
