import type { Cache as SWRCache } from 'swr'
import type { IDBPDatabase } from 'idb'

/**
 * Configuration options
 */
export type Config = {
  /** Database Name */
  dbName: string,
  /** Store name */
  storeName: string,
  /** Storage handler */
  storageHandler?: StorageHandler,
  /** Schema version; use when switching storage handlers on same database and store */
  version?: number,
  /** Error handler */
  onError?: (reason: any) => void,
}

/**
 * Cache provider interface, missing in swr
 */
export type CacheProvider<Data = any> = (globalCache: Readonly<SWRCache<Data>>) => SWRCache<Data>

/**
 * Use cache provider interface
 */
export type UseCacheProvider<Data = any> = (props: Config) => CacheProvider<Data> | undefined

/**
 * Storage handler for Transferrable object
 */
export interface StorageHandler<Data = any, StoreObject = any> {
  /**
   * Initialize
   */
  initialize(
    upgradeDb: IDBPDatabase<unknown>,
    storeName: string,
  ): void

  /**
   * Upgrade
   */
  upgrade(
    upgradeDb: IDBPDatabase<unknown>,
    storeName: string,
    oldVesion: number,
  ): void

  /**
   * Value replacer on db put
   * Return undefined ignore item persistence
   */
  replace: (key: string, value: Data) => StoreObject | undefined,

  /**
   * Value reviver on db get
   * Return undefined to remove item from cache
   */
  revive: (key: string, storeObject: StoreObject) => Data | undefined,
}
