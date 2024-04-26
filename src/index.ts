// Core APIs
export { default } from './cache-provider'


// Storage handlers
export { default as simpleStorageHandler } from './storage-handler/simple'
export { default as timestampStorageHandler } from './storage-handler/timestamp'

// Types
export type {
  Config,
  StorageHandler,
} from './types'
