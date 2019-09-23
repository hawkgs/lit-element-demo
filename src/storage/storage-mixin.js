import { LocalStorage } from './local-storage';

export const StorageMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this.__storageCache = new Map();
  }

  get __storage() {
    return LocalStorage;
  }

  storeProperties(properties) {
    properties.forEach((prop) => {
      const { name, value } = prop;

      Object.defineProperty(this, name, {
        get() {
          const cache = this.__storageCache.get(name);

          if (cache) {
            return cache;
          }

          const storage = this.__storage.get(name);
          this.__storageCache.set(name, storage);

          return storage;
        },
        set(value) {
          this.__storageCache.set(name, value);
          this.__storage.set(name, value);

          this.requestUpdate();
        }
      });

      if (!this[name] && value) {
        this[name] = value;
      }
    });
  }
};
