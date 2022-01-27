// Core APIs
export { default } from './cache-provider'

// useCacheProvider
export { default as useCacheProvider } from './use-cache-provider'

// Storage handlers
export { default as simpleStorageHandler } from './storage-handler/simple'
export { default as timestampStorageHandler } from './storage-handler/timestamp'

// Types
export type {
  TConfig,
  TUseCacheProvider,
} from './types'
