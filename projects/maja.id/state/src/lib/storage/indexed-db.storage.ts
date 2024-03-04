import Dexie from "dexie";
import { StorageType } from "./storage.type";
import { Injectable } from "@angular/core";
import { SimpleStorage } from "./simple.storage";

@Injectable({ providedIn: 'root' })
export class IndexedDBStorage extends SimpleStorage {
  override storageType: StorageType | undefined = StorageType.INDEXED_DB;
  override storage: Storage | undefined;

  private db;

  constructor() {
    super();
    this.db = new Dexie('MAJAX_STATES');
    this.db.version(1).stores({ majax: `key, value` });
  }

  override async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await this.db.table('majax').put({ key, value: JSON.stringify(value) })
      return Promise.resolve();

    } catch (error: any) {
      console.error(error);
      return Promise.reject(error.message);
    }
  }

  override async getItem<T>(key: string): Promise<T> {
    try {
      console.debug('Get item from Indexed DB');
      const data = await this.db.table('majax')
        .where('key')
        .equals(key)
        .first();
      console.debug(data);
      if (data) {
        const res = JSON.parse(data.value) as T;
        return Promise.resolve(res);
      }
      return Promise.reject('Data with key: ' + key + ' Not Found!');
    } catch (error: any) {
      console.error(error);
      return Promise.reject(error.message);
    }
  }

  override async removeItem(key: string): Promise<void> {
    try {
      await this.db.table('majax')
        .where('key')
        .equals(key)
        .delete();
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject('Failed while deleting key: ' + key);
    }
  }

  override async clear(): Promise<void> {
    try {
      await this.db.table('majax').clear();
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject('Failed while clearing table majax');
    }
  }
}
