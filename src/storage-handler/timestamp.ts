import type { IStorageHandler } from '../types'

/**
 * Storage value handler that wraps value in object containing timestamp
 */
const timestampStorageHandler: IStorageHandler<any, { value: any, ts: number }> = {
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
