# Tooltab

Extensible toolbar for general devtools like vConsole but React-based! ⚛️

## Structure

### `tooltab`

Toolbar component that can be used in any React application. **(Planned)**

### `tooltab/store`

Simple datastore layer utilities that allows JS objects to be shared in a global `Window` context within a browser.

#### Usage (Publisher)

```ts
import { claim } from "tooltab/store";

export type GlobalMyToolStore = {
  id: string;
  type: string;
  payload: any;
}[];

const store = claim<GlobalMyToolStore>("my-tool", []);

store.publish({ id: "1", type: "ADD", payload: "Hello" });
```

#### Usage (Subscriber)

```tsx
import { useSyncExternalStore } from "react";
import { claim } from "tooltab/store";
import type { GlobalMyToolStore } from "my-tool";

const store = claim<GlobalMyToolStore>("my-tool");

export default function useMyStore() {
  return useSyncExternalStore((listener) => {
    const { unsubscribe } = store.subscribe(listener);
    return unsubscribe;
  }, store.getData);
}
```
