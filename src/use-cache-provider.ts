import { useState, useEffect } from 'react'

import type { CacheProvider, Config } from './types'
import createCacheProvider from './cache-provider'

/**
 * Cache provider hook
 */
export default function useCacheProvider<Data = any, Error = any>({
  dbName,
  storeName,
  storageHandler,
  version,
  onError,
}: Config): CacheProvider | undefined {
  const [ cacheProvider, setCacheProvider ] = useState<CacheProvider>()

  useEffect(() => {
    // False on mount or on dependency change
    let isSetup = true

    createCacheProvider<Data, Error>({ dbName, storeName, storageHandler, version, onError })
      .then(cp =>
        isSetup && setCacheProvider(() => cp)
      )

    return () => { isSetup = false }
  }, [dbName, storeName, storageHandler, version, onError])

  return cacheProvider
}
