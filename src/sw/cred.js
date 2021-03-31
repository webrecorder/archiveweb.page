import { openDB } from "idb/with-async-ittr.js";

const CRED_DB = "_store-cred";
const CRED_STORE = "credentials";

export class Credentials
{
  constructor() {
    this.version = 1;
    this.init();
  }

  async init() {
    let oldVersion = 0;

    this.db = await openDB(CRED_DB, this.version, {
      upgrade: (db, oldV, newV, tx) => {
        oldVersion = oldV;
        this._initDB(db, oldV, newV, tx);
      },
      blocking: (e) => { if (!e || e.newVersion === null) { this.close(); }}
    });
  }

  _initDB(db, oldV/*, newV, tx*/) {
    if (!oldV) {
      db.createObjectStore(CRED_STORE, { keyPath: "name" });
    }
  }

  listAll() {
    return this.db.getAll(CRED_STORE)
  }

  get(name) {
    return this.db.get(CRED_STORE, name);
  }

  delete(name) {
    return this.db.delete(CRED_STORE, name);
  }

  update(value) {
    return this.db.put(CRED_STORE, value);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}