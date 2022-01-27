import type { Cache } from 'swr'
import type { IDBPObjectStore, IDBPTransaction } from 'idb'

/**
 * Configuration options
 */
export type TConfig = {
  /** Database Name */
  dbName?: string,
  /** Store name */
  storeName?: string,
  /** Storage handler */
  storageHandler?: IStorageHandler,
  /** Schema version */
  version?: number,
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
  ): void

  /**
   * Value replacer on db put
   */
  replace(value: Data): StoreObject,

  /**
   * Value reviver on db get
   */
  revive(storeObject: StoreObject): Data,
}
