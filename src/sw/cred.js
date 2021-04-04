import { randomId } from "@webrecorder/wabac/src/utils";
import { openDB } from "idb/with-async-ittr.js";

const CRED_DB = "_store-cred";
const CRED_STORE = "credentials";


// ====================================================================
export class SimpleDB
{
  constructor({dbname, mainStore, key, version = 1}) {
    this.dbname = dbname;
    this.mainStore = mainStore;
    this.key = key;
    this.version = version;
    this._ready = this.init();
  }

  async init() {
    let oldVersion = 0;

    this.db = await openDB(this.dbname, this.version, {
      upgrade: (db, oldV, newV, tx) => {
        oldVersion = oldV;
        this._initDB(db, oldV, newV, tx);
      },
      blocking: (e) => { if (!e || e.newVersion === null) { this.close(); }}
    });
  }

  _initDB(db, oldV/*, newV, tx*/) {
    if (!oldV) {
      db.createObjectStore(this.mainStore, { keyPath: this.key });
    }
  }

  async listAll() {
    await this._ready;
    return await this.db.getAll(this.mainStore)
  }

  async get(name) {
    await this._ready;
    return await this.db.get(this.mainStore, name);
  }

  async delete(name) {
    await this._ready;
    return this.db.delete(this.mainStore, name);
  }

  async update(value) {
    await this._ready;
    return await this.db.put(this.mainStore, value);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// ====================================================================
export class Credentials extends SimpleDB
{
  constructor() {
    super({dbname: CRED_DB, mainStore: CRED_STORE});
  }
}


// ====================================================================
export class IdStore extends SimpleDB
{
  constructor() {
    super({dbname: "id", mainStore: "id", key: "id"});
  }

  async getId() {
    let result = await this.get(this.key);
    if (!result) {
      result = {};
      result[this.key] = randomId();
      await this.update(result);
    }
    return result;
  }
}

export function getUID() {
  const store = new IdStore();
  return store.getId();
}