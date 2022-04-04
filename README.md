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

- [SWR](https://swr.vercel.app/) 1.0+


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
- `storageHandler` (optional): Custom Storage handler, see [IStorageHandler](./src/types.ts)
- `ignore(key: string, value: any) => boolean` (optional): Evaluate if item should not be persisted. Wrap in `useCallback` hook to prevent infinite loops.
- `version` (optional): Schema version, defaults to `1`


## FAQ

### How do I delete cache entry?

```tsx
import { useSWRConfig } from 'swr'

function Item() {
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
