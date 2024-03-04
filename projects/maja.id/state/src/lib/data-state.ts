import { Table } from 'dexie';
import { BaseStorage } from "./storage";
import { BehaviorSubject, Observable } from 'rxjs';

export type DataStateOptions = {
  database: string;
  table: string;
  primaryKey: string;
}

export class DataState<T> {
  private storage?: BaseStorage<T>;
  private _state$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  private tableName: string = '';
  private primaryKey: string = '';
  public state$: Observable<T[]> = this._state$.asObservable();
  constructor(initialState: T, options: DataStateOptions) {
    this.tableName = options.table;
    this.primaryKey = options.primaryKey;
    this.storage = new BaseStorage(initialState, options);
    this.storage?.table.toArray().then((res) => {
      console.debug(' ');
      console.debug('--- DataState::constructor');
      console.debug('Loaded %s state from database', options.table);
      console.debug('Data: ', res);
      console.debug('--- End of DataState::constructor');
      console.debug(' ');
      if (res) {
        this._state$.next(res);
      }
    }).catch((err) => {
      console.error(' ');
      console.error('--- DataState::constructor');
      console.error('Failed while loading %s state from database', options.table);
      console.error('Error:', err);
      console.error('--- End of DataState::constructor');
      console.error(' ');
      this._state$.next([]);
    })
  }

  get table() {
    return this.storage?.table;
  }

  get state(): T[] {
    return this._state$.getValue();
  }

  getTableName() {
    return this.tableName;
  }

  getPrimaryKey() {
    return this.primaryKey;
  }

  addItem(item: T) {
    this.storage?.table.put(item).then(() => {
      console.debug(' ');
      console.debug('--- DataState::addItem');
      console.debug('Item added to table: %s', this.tableName);
      console.debug('Data:', item);
      console.debug('--- End of DataState::addItem');
      console.debug(' ');
      this.getItems();
    });
  }


  addItems(items: T[]) {
    this.storage?.table.bulkPut(items).then(() => {
      console.debug(' ');
      console.debug('--- DataState::addItems');
      console.debug('Items added to table: %s', this.tableName);
      console.debug('Data: ', items);
      console.debug('--- End of DataState::addItems');
      console.debug(' ');
      this.getItems();
    });
  }

  deleteItem(id: any) {
    this.storage?.remove(id).then(() => {
      console.debug(' ');
      console.debug('--- DataState::deleteItem');
      console.debug('Item deleted from table: %s, id: %s', this.tableName, id);
      console.debug('--- End of DataState::deleteItem');
      console.debug(' ');
      this.getItems();
    });
  }

  findById(id: any) {
    this.storage?.findById(id).then((res: any) => {
      console.debug(' ');
      console.debug('--- DataState::findById');
      console.debug('Select item from table: %s, id: %s', this.tableName, id);
      console.debug('Data: ', res);
      console.debug('--- End of DataState::findById');
      console.debug(' ');
      if (res) {
        this._state$.next([res]);
      } else {
        this._state$.next([]);
      }
    }).catch((err) => {
      console.error(' ');
      console.error('--- DataState::findById');
      console.error(
        'Failed while finding data from table: %s, id: %s',
        this.tableName,
        id,
      );
      console.error('Error:', err);
      console.error('--- End of DataState::findById');
      console.error(' ');
      this._state$.next([]);
    });
  }

  findBy(column: string, keyword: any) {
    this.storage?.findBy(column, keyword).then((res: any) => {
      if (res) {
        this._state$.next(res);
      } else {
        this._state$.next([]);
      }
      console.debug(' ');
      console.debug('--- DataState::findBy');
      console.debug(
        'Select item from table: %s, column: %s, keyword: %s',
        this.tableName,
        column,
        keyword,
      );
      console.debug('Data: ', res);
      console.debug('--- End of DataState::findBy');
      console.debug(' ');
    }).catch((err) => {
      console.error(' ');
      console.error('--- DataState::findBy');
      console.error(
        'Failed while finding data from table: %s, column: %s, keyword: %s',
        this.tableName,
        column,
        keyword,
      );
      console.error('Error:', err);
      console.error('--- End of DataState::findBy');
      console.error(' ');
      this._state$.next([]);
    });
  }

  getItems() {
    this.storage?.table.toArray().then((res: any) => {
      console.debug(' ');
      console.debug('--- DataState::getItems');
      console.debug('Get all items from table: %s', this.tableName);
      console.debug('Data: ', res);
      console.debug('--- End of DataState::getItems');
      console.debug(' ');
      if (res) {
        this._state$.next(res);
      } else {
        this._state$.next([]);
      }
    }).catch((err) => {
      console.error(' ');
      console.error('--- DataState::getItems');
      console.error(
        'Failed while selecting data from table: %s',
        this.tableName,
      );
      console.error('Error:', err);
      console.error('--- End of DataState::getItems');
      console.error(' ');
      this._state$.next([]);
    });
  }

  clear() {
    this.storage?.table.clear().then(() => {
      console.debug(' ');
      console.debug('--- DataState::clear');
      console.debug('Table %s cleared', this.tableName);
      console.debug('--- End of DataState::clear');
      console.debug(' ');
      this._state$.next([]);
    });
  }
}
