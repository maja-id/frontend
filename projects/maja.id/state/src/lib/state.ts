import { BehaviorSubject, Observable } from "rxjs";
import { StorageType } from "./storage/storage.type";
import { IndexedDBStorage } from "./storage/indexed-db.storage";
import { BrowserSessionStorage } from "./storage/browser-session.storage";
import { BrowserLocalStorage } from "./storage/browser-local.storage";
import { SimpleStorage } from "./storage/simple.storage";

export type StateOptions = {
  key?: string;
  persist?: boolean;
  storageType?: StorageType;
};

export class State<T> {
  private STATE_KEY = '';
  private IS_PERSIST = false;
  private storage: SimpleStorage | undefined;
  private _state$: BehaviorSubject<T|any> = new BehaviorSubject<T|any>({});

  public state$: Observable<T|any> = this._state$.asObservable();

  constructor(initialState: T, options?: StateOptions) {
    this.STATE_KEY = options?.key || '';
    /**
     * Persistence State
     */
    if (options?.persist === true) {
      this.IS_PERSIST = true;
      if (!this.STATE_KEY) {
        throw new Error('Invalid state name');
      }

      // Mendefinisikan Storage Provider (default: Indexed DB)
      switch(options.storageType) {
        case StorageType.INDEXED_DB:
          this.storage = new IndexedDBStorage();
          break;
        case StorageType.SESSION_STORAGE:
          this.storage = new BrowserSessionStorage();
          break;
        case StorageType.LOCAL_STORAGE:
          this.storage = new BrowserLocalStorage();
          break;
        default:
          this.storage = new IndexedDBStorage();
          break;
      }

      // Load existing state
      this.storage.getItem<T>(this.STATE_KEY)
        .then((res: T) => {
          console.debug(' ');
          console.debug('--- State::constructor');
          console.debug('%s State constructor', this.STATE_KEY);
          console.debug('Loaded existing %s state', this.STATE_KEY);
          console.debug(res);
          console.debug('--- End of State::constructor');
          console.debug(' ');
          this._state$.next(res);
        })
        .catch((err) => {
          console.error(' ');
          console.error('--- State::constructor');
          console.error('%s State constructor', this.STATE_KEY);
          console.error('Failed while loading %s state', this.STATE_KEY);
          console.error('Error:', err);
          console.error('--- End of State::constructor');
          console.error(' ');
          this._state$.next(initialState);
        });

    } else {
      this._state$.next(initialState);
    }
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: Partial<T>): void {
    const currentState = this._state$.getValue();
    const newState = { ...currentState, ...nextState };
    this._state$.next(newState);
    if (this.IS_PERSIST) {
      this.storage?.setItem(this.STATE_KEY, newState).then(() => {
        console.debug(' ');
        console.debug('--- State::setState');
        console.debug('%s state updated', this.STATE_KEY);
        console.debug('--- End of State::setState');
        console.debug(' ');
      }).catch((err) => {
        console.error(' ');
        console.error('--- State::setState');
        console.error('Failed while saving %s state', this.STATE_KEY);
        console.error('Error:', err);
        console.error('--- End of State::setState');
        console.error(' ');
      });
    }
  }

  resetState(): void {
    this._state$.next({} as T);
    if (this.IS_PERSIST) {
      this.storage?.removeItem(this.STATE_KEY).then(() => {
        console.debug(' ');
        console.debug('--- State::resetState');
        console.debug('%s state deleted', this.STATE_KEY);
        console.debug('--- End of State::resetState');
        console.debug(' ');
      }).catch((err) => {
        console.error(' ');
        console.error('--- State::resetState');
        console.error('Failed while resetting %s state', this.STATE_KEY);
        console.error('Error: ', err);
        console.error('--- End of State::resetState');
        console.error(' ');
      });
    }
  }
}
