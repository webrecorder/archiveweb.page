import { openDB } from "idb/with-async-ittr.js";
import { fromByteArray as encodeBase64, toByteArray as decodeBase64 } from "base64-js";


// ====================================================================
export class KeyStore
{
  constructor({dbname = "_keystore", mainStore = "store", key = "id", version = 1} = {}) {
    this.dbname = dbname;
    this.mainStore = mainStore;
    this.key = key;
    this.version = version;
    this._ready = this.init();
  }

  async init() {
    //let oldVersion = 0;

    this.db = await openDB(this.dbname, this.version, {
      upgrade: (db, oldV, newV, tx) => {
        //oldVersion = oldV;
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
    return await this.db.getAll(this.mainStore);
  }

  async get(name) {
    await this._ready;
    return await this.db.get(this.mainStore, name);
  }

  async delete(name) {
    await this._ready;
    return this.db.delete(this.mainStore, name);
  }

  async put(value) {
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
export class Signer
{
  constructor() {
    this._store = new KeyStore();
  }

  close() {
    if (this._store) {
      this._store.close();
      this._store = null;
    }
  }

  async sign(string) {
    let keyPair;
    let keys = await this.loadKeys();

    const ecdsaImportParams = {
      name: "ECDSA",
      namedCurve: "P-384"
    };

    const extractable = true;
    const usage = ["sign", "verify"];

    const ecdsaSignParams = {
      name: "ECDSA",
      hash: "SHA-256"
    };

    if (!keys) {
      keyPair = await crypto.subtle.generateKey(ecdsaImportParams, extractable, usage);

      const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
      keys = {
        private: encodeBase64(new Uint8Array(privateKey)),
        public: encodeBase64(new Uint8Array(publicKey))
      };

      await this.saveKeys(keys);
    } else {
      const privateKey = decodeBase64(keys.private);
      const publicKey = decodeBase64(keys.public);

      keyPair = {};
      keyPair.privateKey = await crypto.subtle.importKey("pkcs8", privateKey, ecdsaImportParams, true, ["sign"]);
      keyPair.publicKey = await crypto.subtle.importKey("spki", publicKey, ecdsaImportParams, true, ["verify"]);
    }

    const data = new TextEncoder().encode(string);

    let signature = await crypto.subtle.sign(ecdsaSignParams, keyPair.privateKey, data);

    //console.log("verify", await crypto.subtle.verify(ecdsaSignParams, keyPair.publicKey, signature, data));

    signature = encodeBase64(new Uint8Array(signature));

    return { signature, publicKey: keys.public };
  }

  async saveKeys(keys, id = "_userkey") {
    return await this._store.put({id, keys});
  }

  async loadKeys(id = "_userkey") {
    const res = await this._store.get(id);
    return res && res.keys;
  }
}