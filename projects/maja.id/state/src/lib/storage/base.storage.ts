import Dexie, { Table } from 'dexie';

export class BaseStorage<T> {
  public table!: Table<T, any>;
  private versionNumber = 1;
  private db: Dexie | undefined;
  private tableName: string | undefined;
  private primaryKey: string | undefined;
  private database: string = 'MAJAX_DB';

  constructor(model: T, options: { database: string; table: string; primaryKey: string }) {
    if (!options.database) {
      throw new Error('Database name not defined');
    }
    if (!options.table) {
      throw new Error('Table name not defined');
    }
    if (!options.primaryKey) {
      throw new Error('Primary key not defined');
    }

    this.tableName = options.table;
    this.primaryKey = options.primaryKey;
    this.database = options.database;

    this.db = new Dexie(this.database);
    const schema: any = {};
    const columns = Object.getOwnPropertyNames(model);
    schema[this.tableName] = columns.join(',');

    this.db.version(this.versionNumber).stores(schema);
    this.table = this.db.table(this.tableName);
  }

  getTableName() {
    return this.tableName!;
  }

  getPrimaryKey() {
    return this.primaryKey!;
  }

  getDatabaseName() {
    return this.database;
  }

  getDatabase() {
    return this.db;
  }

  getTable() {
    return this.table;
  }

  async findById(id: any): Promise<T|undefined> {
    return await this.table.where(this.primaryKey!).equals(id).first();
  }

  async findBy(key: string, keyword: any): Promise<T[]|undefined> {
    return await this.table.where(key).equals(keyword).toArray();
  }

  async save(data: T) {
    return await this.table.put(data);
  }

  async remove(id: any) {
    return await this.table.where(this.primaryKey!).equals(id).delete();
  }
}
