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
  replace: (key, value) => value,

  /**
   * @inheritdoc
   */
  revive: (key, storeObject) => storeObject,
}

export default simpleStorageHandler
