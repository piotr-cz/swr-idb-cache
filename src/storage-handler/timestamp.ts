import type { IStorageHandler } from '../types'
import simpleStorageHandler from './simple'

type TData = any
type TStoreObject = {
  value: TData,
  ts: number,
}

/**
 * Storage value handler that wraps value in object containing timestamp
 */
const timestampStorageHandler: IStorageHandler<TData, TStoreObject> = {
  ...simpleStorageHandler,

  /**
   * @inheritdoc
   */
  initialize (database, storeName) {
    const objectStore = database.createObjectStore(storeName)

    objectStore.createIndex('ts', 'ts')
  },

  /**
   * @inheritdoc
   */
  replace: (key, value) => ({
    value,
    ts: Date.now(),
  }),

  /**
   * @inheritdoc
   */
  revive: (key, storeObject) =>
    storeObject.value
  ,
} as const

export default timestampStorageHandler
