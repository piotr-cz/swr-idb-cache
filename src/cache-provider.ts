import type { Cache as SWRCache} from 'swr'
import { openDB } from 'idb'

import type { CacheProvider, Config } from './types'
import simpleStorageHandler from './storage-handler/simple'

// Unlinke what SWR types suggest, key is always a serialized string
type Key = string

/**
 * Cache provider factory
 */
export default async function createCacheProvider<Data = any, Error = any>({
  dbName,
  storeName,
  storageHandler = simpleStorageHandler,
  version = 1,
  onError = () => {},
}: Config): Promise<CacheProvider> {
  type KeyInfo = { isValidating: boolean, error?: Error | undefined }
  type Value = Data | KeyInfo
  type Cache = SWRCache<Value>

  // Initialize database
  const db = await openDB(dbName, version, {
    upgrade (upgradeDb, oldVersion) {
      if (!oldVersion) {
        storageHandler.initialize(upgradeDb, storeName)
      } else {
        storageHandler.upgrade(upgradeDb, storeName, oldVersion)
      }
    }
  })

  // Get storage snapshot
  const map = new Map<Key, Value>()

  let cursor = await db.transaction(storeName, 'readwrite').store.openCursor()

  while (cursor) {
    const key = cursor.key as Key
    const value = storageHandler.revive(key, cursor.value)

    // Stale
    if (value === undefined) {
      cursor.delete()
    // OK
    } else {
      map.set(key, value)
    }

    cursor = await cursor.continue()
  }

  /**
   * SWR Cache provider API
   */
  return (globalCache: Readonly<Cache>): Cache => ({
    get: (key: Key): Value | null | undefined =>
      map.get(key),

    set: (key: Key, value: Value): void => {
      map.set(key, value)

      if (isFetchInfo(key, value)) {
        return
      }

      const storeValue = storageHandler.replace(key, value)

      if (storeValue === undefined) {
        return
      }

      db.put(storeName, storeValue, key)
        .catch(onError)
    },

    /**
     * Used only by useSWRInfinite
     */
    delete: (key: Key): void => {
      if (map.delete(key) && !isFetchInfo(key)) {
        db.delete(storeName, key)
          .catch(onError)
      }
    },

    /**
     * Documented, but missing method type
     * @link https://swr.vercel.app/docs/advanced/cache#access-to-the-cache
     * @link https://github.com/vercel/swr/pull/1936
     */
    // @ts-ignore
    clear: (): void => {
      map.clear()
      db.clear(storeName)
    },
  })

  /**
   * Ignore swr error and isValidating values
   * on swr 1.0+ these are $err$ and $req$
   * on swr 1.2 it's $swr$
   * on swr 2.0.0-beta.0 this has changed: https://github.com/vercel/swr/discussions/1919
   */
  function isFetchInfo(key: Key, value?: Value): value is KeyInfo {
    return key.startsWith('$')
  }
}
