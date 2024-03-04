import { Injectable } from "@angular/core";
import { StorageType } from "./storage.type";
import { SimpleStorage } from "./simple.storage";

@Injectable({ providedIn: 'root' })
export class BrowserLocalStorage extends SimpleStorage {
  override storage: Storage = localStorage;
  override storageType: StorageType = StorageType.LOCAL_STORAGE;
}
