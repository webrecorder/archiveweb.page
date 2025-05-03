import { openDB } from "idb/with-async-ittr";
import {
  fromByteArray as encodeBase64,
  toByteArray as decodeBase64,
} from "base64-js";
import { type IDBPDatabase } from "idb";

type KeyPair = {
  public: string;
  private: string;
};

type IdSig = {
  id: string;
  sig?: string;
  keys?: KeyPair;
};

export type DataSignature = {
  hash: string;
  signature: string;
  publicKey: string;
  created: string;
  software: string;
};

// ====================================================================
export class KeyStore {
  dbname: string;
  mainStore: string;
  key: string;
  version: number;
  _ready: Promise<void>;
  db: IDBPDatabase | null = null;

  constructor({
    dbname = "_keystore",
    mainStore = "store",
    key = "id",
    version = 1,
  } = {}) {
    this.dbname = dbname;
    this.mainStore = mainStore;
    this.key = key;
    this.version = version;
    this._ready = this.init();
  }

  async init() {
    //let oldVersion = 0;

    this.db = await openDB(this.dbname, this.version, {
      upgrade: (db, oldV, _newV, _tx) => {
        //oldVersion = oldV;
        this._initDB(db, oldV);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      blocking: (e: any) => {
        if (!e || e.newVersion === null) {
          this.close();
        }
      },
    });
  }

  _initDB(db: IDBPDatabase, oldV: number /*, newV, tx*/) {
    if (!oldV) {
      db.createObjectStore(this.mainStore, { keyPath: this.key });
    }
  }

  async listAll() {
    await this._ready;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.db!.getAll(this.mainStore);
  }

  async get(name: string) {
    await this._ready;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.db!.get(this.mainStore, name);
  }

  async delete(name: string) {
    await this._ready;
    return this.db!.delete(this.mainStore, name);
  }

  async put(value: IdSig) {
    await this._ready;
    return await this.db!.put(this.mainStore, value);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// ====================================================================
export class Signer {
  softwareString: string;
  _store: KeyStore | null;
  cacheSig: boolean;

  constructor(softwareString: string, opts: { cacheSig?: boolean } = {}) {
    this._store = new KeyStore();
    this.softwareString = softwareString || "ArchiveWeb.page";
    this.cacheSig = opts.cacheSig || false;
  }

  close() {
    if (this._store) {
      this._store.close();
      this._store = null;
    }
  }

  async sign(string: string, created: string): Promise<DataSignature> {
    let keyPair: CryptoKeyPair;
    let keys = await this.loadKeys();

    const ecdsaImportParams = {
      name: "ECDSA",
      namedCurve: "P-384",
    };

    const extractable = true;
    const usage = ["sign", "verify"] as KeyUsage[];

    const ecdsaSignParams = {
      name: "ECDSA",
      hash: "SHA-256",
    };

    if (!keys) {
      keyPair = await crypto.subtle.generateKey(
        ecdsaImportParams,
        extractable,
        usage,
      );

      const privateKey = await crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey,
      );
      const publicKey = await crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey,
      );
      keys = {
        private: encodeBase64(new Uint8Array(privateKey)),
        public: encodeBase64(new Uint8Array(publicKey)),
      };

      await this.saveKeys(keys);
    } else {
      const privateDecoded = decodeBase64(keys.private);
      const publicDecoded = decodeBase64(keys.public);

      const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        privateDecoded,
        ecdsaImportParams,
        true,
        ["sign"],
      );
      const publicKey = await crypto.subtle.importKey(
        "spki",
        publicDecoded,
        ecdsaImportParams,
        true,
        ["verify"],
      );
      keyPair = { privateKey, publicKey };
    }

    let signature: string | null = this.cacheSig
      ? await this.loadSig(string)
      : null;

    if (!signature) {
      const data = new TextEncoder().encode(string);
      const signatureBuff = await crypto.subtle.sign(
        ecdsaSignParams,
        keyPair.privateKey,
        data,
      );
      signature = encodeBase64(new Uint8Array(signatureBuff));
      await this.saveSig(string, signature);
    }

    //console.log("verify", await crypto.subtle.verify(ecdsaSignParams, keyPair.publicKey, signature, data));

    return {
      hash: string,
      signature,
      publicKey: keys.public,
      created,
      software: this.softwareString,
    };
  }

  async saveSig(id: string, sig: string) {
    return await this._store!.put({ id, sig });
  }

  async loadSig(id: string): Promise<string> {
    const res = await this._store!.get(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res?.sig;
  }

  async saveKeys(keys: KeyPair, id = "_userkey") {
    return await this._store!.put({ id, keys });
  }

  async loadKeys(id = "_userkey"): Promise<KeyPair | null> {
    const res = await this._store!.get(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res?.keys;
  }
}
