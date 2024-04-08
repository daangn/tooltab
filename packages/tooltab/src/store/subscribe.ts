import { claim } from "./claim";

export function subscribe<Data>(
  namespace: string,
  listener: (data: Data) => void
) {
  const store = claim<Data>(namespace);

  store.addListener(listener);

  return {
    unsubscribe() {
      store.removeListener(listener);
    },
  };
}
