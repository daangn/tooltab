declare global {
  interface Window {
    __TOOLTAB_STORE__: Record<
      string,
      {
        data: any;
        listeners: ((data: any) => void)[];
      }
    >;
  }
}

export {};
