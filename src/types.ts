import type { Cache } from 'swr'
import type { IDBPObjectStore, IDBPTransaction } from 'idb'

/**
 * Configuration options
 */
export type TConfig = {
  /** Database Name */
  dbName: string,
  /** Store name */
  storeName: string,
  /** Storage handler */
  storageHandler?: IStorageHandler,
  /** Schema version; use when switching storage handlers on same database and store */
  version?: number,
  /** Error handler */
  onError?: (reason: any) => void,
}

/**
 * Cache provider interface, missing in swr
 */
export type TCacheProvider = (globalCache: Readonly<Cache>) => Cache

/**
 * Use cache provider interface
 */
export type TUseCacheProvider = (dbName?: string, storeName?: string, version?: number, storageHandler?: IStorageHandler) => TCacheProvider | undefined

/**
 * Storage handler for Transferrable object
 */
export interface IStorageHandler<Data = any, StoreObject = any> {
  /**
   * Initialize / ugprade database
   */
  upgradeObjectStore?(
    objectStore: IDBPObjectStore<unknown, ArrayLike<string>, string, 'versionchange'>,
    oldVersion: number,
    newVersion: number | null,
    transaction: IDBPTransaction<unknown, string[], 'versionchange'>,
    event?: IDBVersionChangeEvent,
  ): void

  /**
   * Value replacer on db put
   * Return undefined ignore item persistence
   */
  replace(key: string, value: Data): StoreObject | undefined,

  /**
   * Value reviver on db get
   * Return undefined to remove item from cache
   */
  revive(key: string, storeObject: StoreObject): Data | undefined,
}
