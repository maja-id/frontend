import { Injectable } from "@angular/core";
import { StorageType } from "./storage.type";
import { SimpleStorage } from "./simple.storage";

@Injectable({ providedIn: 'root' })
export class BrowserSessionStorage extends SimpleStorage {
  override storageType: StorageType | undefined = StorageType.SESSION_STORAGE;
  override storage: Storage = localStorage;
}
