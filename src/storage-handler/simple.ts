import type { IStorageHandler } from '../types'

/**
 * Simple storage handler
 */
const simpleStorageHandler: IStorageHandler<any, any> = {
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
