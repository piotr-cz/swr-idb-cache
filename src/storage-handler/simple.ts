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
  replace: value => value,

  /**
   * @inheritdoc
   */
  revive: storeObject => storeObject,
}

export default simpleStorageHandler
