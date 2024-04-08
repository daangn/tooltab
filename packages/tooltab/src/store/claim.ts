export function claim<Data>(namespace: string, initialData?: Data) {
  if (!window.__TOOLTAB_STORE__) {
    window.__TOOLTAB_STORE__ = {};
  }

  if (!window.__TOOLTAB_STORE__[namespace]) {
    window.__TOOLTAB_STORE__[namespace] = {
      data: initialData,
      listeners: [],
    };
  }

  const store = window.__TOOLTAB_STORE__[namespace];

  return {
    getData() {
      return store.data;
    },
    publish(data: Data) {
      store.data = data;

      store.listeners.forEach((listener: (data: Data) => void) => {
        listener(data);
      });
    },
    subscribe(listener: (data: Data) => void) {
      store.listeners.push(listener);
      listener(store.data);
      return {
        unsubscribe() {
          const index = store.listeners.indexOf(listener);
          if (index !== -1) {
            store.listeners.splice(index, 1);
          }
        },
      };
    },
  };
}
