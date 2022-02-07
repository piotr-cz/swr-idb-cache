import type { IStorageHandler } from '../types'

type TData = any
type TStoreObject = {
  value: TData,
  ts: number,
}

/**
 * Storage value handler that wraps value in object containing timestamp
 */
const timestampStorageHandler: IStorageHandler<TData, TStoreObject> = {
  /**
   * @inheritdoc
   */
  upgradeObjectStore: objectStore =>
    objectStore.createIndex('ts', 'ts')
  ,

  /**
   * @inheritdoc
   */
  replace: value => ({
    value,
    ts: Date.now(),
  }),

  /**
   * @inheritdoc
   */
  revive: storeObject =>
    storeObject.value
  ,
}

export default timestampStorageHandler
