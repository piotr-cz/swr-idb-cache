import type { IStorageHandler } from '../types'

type TData = any
type TStoreObject = TData

/**
 * Simple storage handler
 */
const simpleStorageHandler: IStorageHandler<TData, TStoreObject> = {
  /**
   * @inheritdoc
   */
  initialize (database, storeName) {
    database.createObjectStore(storeName)
  },

  /**
   * @inheritdoc
   */
  upgrade (database, storeName) {
    database.deleteObjectStore(storeName)

    this.initialize(database, storeName)
  },

  /**
   * @inheritdoc
   */
  replace: (key, value) => value,

  /**
   * @inheritdoc
   */
  revive: (key, storeObject) => storeObject,
} as const

export default simpleStorageHandler
