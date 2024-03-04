import { StorageType } from "./storage.type";

export abstract class SimpleStorage {
  abstract storage: Storage | undefined;
  private KEY_PREFIX: string = 'MAJAX_STATE::';
  abstract storageType: StorageType | undefined;
  private schema: any | undefined;

  async setItem<T>(key: string, value: T): Promise<void> {
    if (this.storage) {
      this.storage.setItem(this.KEY_PREFIX + key, JSON.stringify(value));
    }
  }

  async getItem<T>(key: string): Promise<T> {
    if (this.storage) {
      const value = this.storage.getItem(this.KEY_PREFIX + key);
      const data = value ? JSON.parse(value) : undefined;
      return Promise.resolve(data);
    }
    return Promise.reject('Storage not defined');
  }

  async removeItem(key: string): Promise<void> {
    if (this.storage) {
      this.storage.removeItem(this.KEY_PREFIX + key);
      return Promise.resolve();
    }
    return Promise.reject('Storage not defined');
  }

  async clear(): Promise<void> {
    if (this.storage) {
      for (let i = this.storage.length; i >= 0; i--) {
        const key = this.storage.key(i);
        if (key && key.startsWith(this.KEY_PREFIX)) {
          this.storage.removeItem(key);
        }
      }
      Promise.resolve();
    }
    return Promise.resolve(undefined);
  }

  getPrefix() {
    return this.KEY_PREFIX;
  }

  getStorageType() {
    return this.storageType;
  }

  getSchema() {
    return this.schema;
  }
}
