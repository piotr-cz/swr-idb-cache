# IndexedDB Cache Provider for [SWR](https://swr.vercel.app/)

Synchronize SWR Cache with [IndexedDB](https://developer.mozilla.org/en-US/docs/Glossary/IndexedDB) to get offline cache.


## How does it work?

Library reads current state of cache stored in IndexedDB into memory using [idb](https://github.com/jakearchibald/idb) during initialization.
Then it resolves into Cache Provider which should be passed to SWR.

Read [SWR docs on Cache](https://swr.vercel.app/docs/advanced/cache) for more info


## Installation

Using npm:

```console
npm install --save @piotr-cz/swr-idb-cache
```

or Yarn:

```console
yarn add @piotr-cz/@piotr-cz/swr-idb-cache
```


## Requirements

- [SWR](https://swr.vercel.app/) ^2.0.0-rc.0  
  *Note: For SWR 1.x use the 1.0.0-rc.2 version of this package*
- Works with [React](https://reactjs.org/) ^16.11 and [Preact](https://preactjs.com/)

## Setup

Initialize library and when it's ready, pass it in configuration under `provider` key to SWR.

To wait until provider is resolved, use bundled `useCacheProvider` hook:

```jsx
// App.jsx
import { SWRConfig } from 'swr'
import { useCacheProvider } from '@piotr-cz/swr-idb-cache'

function App() {
  // Initialize
  const cacheProvider = useCacheProvider({
    dbName: 'my-app',
    storeName: 'swr-cache',
  })

  // Not ready yet, render fallback component
  if (!cacheProvider) {
    return <div>Initializing cache…</div>
  }

  return (
    <SWRConfig value={{
      provider: cacheProvider,
    }}>
      <Dashboard />
    </SWRConfig>
  )
}
```

…or library like [react-use-promise](https://github.com/bsonntag/react-use-promise):

```js
import createCacheProvider from '@piotr-cz/swr-idb-cache'
import usePromise from 'react-use-promise'

function App() {
  // Initialize
  const [ cacheProvider ] = usePromise(() => createCacheProvider({
    dbName: 'my-app',
    storeName: 'swr-cache',
  }), [])

  // …
}

```


## Configuration

- `dbName`: IndexedDB Database name
- `storeName`: IndexedDB Store name
- `storageHandler` (optional): Custom Storage handler, see [IStorageHandler interface](./src/types.ts#L31)
- `version` (optional): Schema version, defaults to `1`
- `onError` (optional): Database error handler, defaults to noop function


## Known issues


### InvalidStateError

```
InvalidStateError
Failed to execute 'transaction' on 'IDBDatabase': The database connection is closing.
```

See idb [Issue #229](https://github.com/jakearchibald/idb/issues/229)


## Recipes


### Delete cache entry

```jsx
import useSWR, { useSWRConfig } from 'swr'

export default function Item() {
  const { data, error } = useSWR('/api/data')
  const { cache } = useSWRConfig()

  const handleRemove = () => {
    // Remove from state
    // …

    // Remove from cache with key used in useSWR hook
    cache.delete('/api/data')
  }

  return (
    <main>
      {/** Show item */}
      {data &&
        <h1>{data.label}</h1>
      }

      {/** Remove item */}
      <button onClick={handleRemove}>
        Remove
      </button>
    </main>
  )
}
```


### Implement Garbage Collector

Define custom storage handler that extends timestamp storage

```js
// custom-storage-handler.js
import { timestampStorageHandler } from '@piotr-cz/swr-idb-cache'

// Define max age of 7 days
const maxAge = 7 * 24 * 60 * 60 * 1e3

const gcStorageHandler = {
  ...timestampStorageHandler,
  // Revive each entry only when it's timestamp is newer than expiration
  revive: (key, storeObject) => 
    storeObject.ts > Date.now() - maxAge
      // Unwrapped value
      ? timestampStorageHandler.revive(key, storeObject)
      // Undefined to indicate item is stale
      : undefined,
}

export default gcStorageHandler
```

Pass it to configuration

```diff
 // App.jsx
 import { SWRConfig } from 'swr'
 import { useCacheProvider } from '@piotr-cz/swr-idb-cache'

+import customStorageHandler from './custom-storage-handler.js'
+
 function App() {
   // Initialize
   const cacheProvider = useCacheProvider({
     dbName: 'my-app',
     storeName: 'swr-cache',
+    storageHandler: customStorageHandler,
   })

   // …
```


### Ignore API endpoints from cache persistence

Define custom storage handler that extends timestamp storage

```js
// custom-storage-handler.js
import { timestampStorageHandler } from '@piotr-cz/swr-idb-cache'

const blacklistStorageHandler = {
  ...timestampStorageHandler,
  // Ignore entries fetched from API endpoints starting with /api/device
  replace: (key, value) =>
    !key.startsWith('/api/device/')
      // Wrapped value
      ? timestampStorageHandler.replace(key, value)
      // Undefined to ignore storing value
      : undefined,
}

export default blacklistStorageHandler
```

Pass it in configuration as in the [recipe above](#implement-garbage-collector)
