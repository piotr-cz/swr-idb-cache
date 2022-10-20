import type { Cache } from 'swr'
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
export type CacheProvider = (globalCache: Readonly<Cache>) => Cache

/**
 * Use cache provider interface
 */
export type UseCacheProvider = (dbName?: string, storeName?: string, version?: number, storageHandler?: StorageHandler) => CacheProvider | undefined

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
