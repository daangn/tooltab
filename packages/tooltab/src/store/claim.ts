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
    get data() {
      return store.data;
    },
    set data(value: Data) {
      store.data = value;
      store.listeners.forEach((listener: (data: Data) => void) => {
        listener(value);
      });
    },
    addListener(listener: (data: Data) => void) {
      store.listeners.push(listener);
    },
    removeListener(listener: (data: Data) => void) {
      const index = store.listeners.indexOf(listener);
      if (index !== -1) {
        store.listeners.splice(index, 1);
      }
    },
  };
}
