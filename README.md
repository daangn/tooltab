# Tooltab

Extensible toolbar for general devtools like vConsole but React-based! ⚛️

## Structure

### `tooltab`

Toolbar component that can be used in any React application. **(Planned)**

### `tooltab/store`

Simple datastore layer utilities that allows JS objects to be shared in a global `Window` context within a browser.

It is useful for sharing data between different parts of a web application, such as a toolbar and the main application.

#### Usage (Publisher)

```ts
// my-tool (package)
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
// Application
import { useSyncExternalStore } from "react";
import { claim } from "tooltab/store";
import type { GlobalMyToolStore } from "my-tool";

const store = claim<GlobalMyToolStore>("my-tool");

function useMyToolStore() {
  return useSyncExternalStore((listener) => {
    const { unsubscribe } = store.subscribe(listener);
    return unsubscribe;
  }, store.getData);
}

export default function MyToolTab() {
  const data = useMyToolStore();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Payload</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type}</td>
            <td>{item.payload}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
