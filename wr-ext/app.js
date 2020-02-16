(function(e, a) { for(var i in a) e[i] = a[i]; }(self, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb/build/esm/async-iterators.js":
/*!*******************************************************!*\
  !*** ./node_modules/idb/build/esm/async-iterators.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ \"./node_modules/idb/build/esm/chunk.js\");\n\n\nconst advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];\r\nconst methodMap = {};\r\nconst advanceResults = new WeakMap();\r\nconst ittrProxiedCursorToOriginalProxy = new WeakMap();\r\nconst cursorIteratorTraps = {\r\n    get(target, prop) {\r\n        if (!advanceMethodProps.includes(prop))\r\n            return target[prop];\r\n        let cachedFunc = methodMap[prop];\r\n        if (!cachedFunc) {\r\n            cachedFunc = methodMap[prop] = function (...args) {\r\n                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));\r\n            };\r\n        }\r\n        return cachedFunc;\r\n    },\r\n};\r\nasync function* iterate(...args) {\r\n    // tslint:disable-next-line:no-this-assignment\r\n    let cursor = this;\r\n    if (!(cursor instanceof IDBCursor)) {\r\n        cursor = await cursor.openCursor(...args);\r\n    }\r\n    if (!cursor)\r\n        return;\r\n    cursor = cursor;\r\n    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);\r\n    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);\r\n    // Map this double-proxy back to the original, so other cursor methods work.\r\n    _chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"d\"].set(proxiedCursor, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"e\"])(cursor));\r\n    while (cursor) {\r\n        yield proxiedCursor;\r\n        // If one of the advancing methods was not called, call continue().\r\n        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());\r\n        advanceResults.delete(proxiedCursor);\r\n    }\r\n}\r\nfunction isIteratorProp(target, prop) {\r\n    return ((prop === Symbol.asyncIterator &&\r\n        Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"c\"])(target, [IDBIndex, IDBObjectStore, IDBCursor])) ||\r\n        (prop === 'iterate' && Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"c\"])(target, [IDBIndex, IDBObjectStore])));\r\n}\r\nObject(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"b\"])(oldTraps => ({\r\n    get(target, prop, receiver) {\r\n        if (isIteratorProp(target, prop))\r\n            return iterate;\r\n        return oldTraps.get(target, prop, receiver);\r\n    },\r\n    has(target, prop) {\r\n        return isIteratorProp(target, prop) || oldTraps.has(target, prop);\r\n    },\r\n}));\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/async-iterators.js?");

/***/ }),

/***/ "./node_modules/idb/build/esm/chunk.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/chunk.js ***!
  \*********************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return wrap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return addTraps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return instanceOfAny; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return reverseTransformCache; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"e\", function() { return unwrap; });\nconst instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);\n\nlet idbProxyableTypes;\r\nlet cursorAdvanceMethods;\r\n// This is a function to prevent it throwing up in node environments.\r\nfunction getIdbProxyableTypes() {\r\n    return (idbProxyableTypes ||\r\n        (idbProxyableTypes = [\r\n            IDBDatabase,\r\n            IDBObjectStore,\r\n            IDBIndex,\r\n            IDBCursor,\r\n            IDBTransaction,\r\n        ]));\r\n}\r\n// This is a function to prevent it throwing up in node environments.\r\nfunction getCursorAdvanceMethods() {\r\n    return (cursorAdvanceMethods ||\r\n        (cursorAdvanceMethods = [\r\n            IDBCursor.prototype.advance,\r\n            IDBCursor.prototype.continue,\r\n            IDBCursor.prototype.continuePrimaryKey,\r\n        ]));\r\n}\r\nconst cursorRequestMap = new WeakMap();\r\nconst transactionDoneMap = new WeakMap();\r\nconst transactionStoreNamesMap = new WeakMap();\r\nconst transformCache = new WeakMap();\r\nconst reverseTransformCache = new WeakMap();\r\nfunction promisifyRequest(request) {\r\n    const promise = new Promise((resolve, reject) => {\r\n        const unlisten = () => {\r\n            request.removeEventListener('success', success);\r\n            request.removeEventListener('error', error);\r\n        };\r\n        const success = () => {\r\n            resolve(wrap(request.result));\r\n            unlisten();\r\n        };\r\n        const error = () => {\r\n            reject(request.error);\r\n            unlisten();\r\n        };\r\n        request.addEventListener('success', success);\r\n        request.addEventListener('error', error);\r\n    });\r\n    promise\r\n        .then(value => {\r\n        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval\r\n        // (see wrapFunction).\r\n        if (value instanceof IDBCursor) {\r\n            cursorRequestMap.set(value, request);\r\n        }\r\n        // Catching to avoid \"Uncaught Promise exceptions\"\r\n    })\r\n        .catch(() => { });\r\n    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This\r\n    // is because we create many promises from a single IDBRequest.\r\n    reverseTransformCache.set(promise, request);\r\n    return promise;\r\n}\r\nfunction cacheDonePromiseForTransaction(tx) {\r\n    // Early bail if we've already created a done promise for this transaction.\r\n    if (transactionDoneMap.has(tx))\r\n        return;\r\n    const done = new Promise((resolve, reject) => {\r\n        const unlisten = () => {\r\n            tx.removeEventListener('complete', complete);\r\n            tx.removeEventListener('error', error);\r\n            tx.removeEventListener('abort', error);\r\n        };\r\n        const complete = () => {\r\n            resolve();\r\n            unlisten();\r\n        };\r\n        const error = () => {\r\n            reject(tx.error);\r\n            unlisten();\r\n        };\r\n        tx.addEventListener('complete', complete);\r\n        tx.addEventListener('error', error);\r\n        tx.addEventListener('abort', error);\r\n    });\r\n    // Cache it for later retrieval.\r\n    transactionDoneMap.set(tx, done);\r\n}\r\nlet idbProxyTraps = {\r\n    get(target, prop, receiver) {\r\n        if (target instanceof IDBTransaction) {\r\n            // Special handling for transaction.done.\r\n            if (prop === 'done')\r\n                return transactionDoneMap.get(target);\r\n            // Polyfill for objectStoreNames because of Edge.\r\n            if (prop === 'objectStoreNames') {\r\n                return target.objectStoreNames || transactionStoreNamesMap.get(target);\r\n            }\r\n            // Make tx.store return the only store in the transaction, or undefined if there are many.\r\n            if (prop === 'store') {\r\n                return receiver.objectStoreNames[1]\r\n                    ? undefined\r\n                    : receiver.objectStore(receiver.objectStoreNames[0]);\r\n            }\r\n        }\r\n        // Else transform whatever we get back.\r\n        return wrap(target[prop]);\r\n    },\r\n    has(target, prop) {\r\n        if (target instanceof IDBTransaction &&\r\n            (prop === 'done' || prop === 'store')) {\r\n            return true;\r\n        }\r\n        return prop in target;\r\n    },\r\n};\r\nfunction addTraps(callback) {\r\n    idbProxyTraps = callback(idbProxyTraps);\r\n}\r\nfunction wrapFunction(func) {\r\n    // Due to expected object equality (which is enforced by the caching in `wrap`), we\r\n    // only create one new func per func.\r\n    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.\r\n    if (func === IDBDatabase.prototype.transaction &&\r\n        !('objectStoreNames' in IDBTransaction.prototype)) {\r\n        return function (storeNames, ...args) {\r\n            const tx = func.call(unwrap(this), storeNames, ...args);\r\n            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);\r\n            return wrap(tx);\r\n        };\r\n    }\r\n    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In\r\n    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the\r\n    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense\r\n    // with real promises, so each advance methods returns a new promise for the cursor object, or\r\n    // undefined if the end of the cursor has been reached.\r\n    if (getCursorAdvanceMethods().includes(func)) {\r\n        return function (...args) {\r\n            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\r\n            // the original object.\r\n            func.apply(unwrap(this), args);\r\n            return wrap(cursorRequestMap.get(this));\r\n        };\r\n    }\r\n    return function (...args) {\r\n        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\r\n        // the original object.\r\n        return wrap(func.apply(unwrap(this), args));\r\n    };\r\n}\r\nfunction transformCachableValue(value) {\r\n    if (typeof value === 'function')\r\n        return wrapFunction(value);\r\n    // This doesn't return, it just creates a 'done' promise for the transaction,\r\n    // which is later returned for transaction.done (see idbObjectHandler).\r\n    if (value instanceof IDBTransaction)\r\n        cacheDonePromiseForTransaction(value);\r\n    if (instanceOfAny(value, getIdbProxyableTypes()))\r\n        return new Proxy(value, idbProxyTraps);\r\n    // Return the same value back if we're not going to transform it.\r\n    return value;\r\n}\r\nfunction wrap(value) {\r\n    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because\r\n    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.\r\n    if (value instanceof IDBRequest)\r\n        return promisifyRequest(value);\r\n    // If we've already transformed this value before, reuse the transformed value.\r\n    // This is faster, but it also provides object equality.\r\n    if (transformCache.has(value))\r\n        return transformCache.get(value);\r\n    const newValue = transformCachableValue(value);\r\n    // Not all types are transformed.\r\n    // These may be primitive types, so they can't be WeakMap keys.\r\n    if (newValue !== value) {\r\n        transformCache.set(value, newValue);\r\n        reverseTransformCache.set(newValue, value);\r\n    }\r\n    return newValue;\r\n}\r\nconst unwrap = (value) => reverseTransformCache.get(value);\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/chunk.js?");

/***/ }),

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openDB\", function() { return openDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteDB\", function() { return deleteDB; });\n/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ \"./node_modules/idb/build/esm/chunk.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unwrap\", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"e\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"]; });\n\n\n\n\n/**\r\n * Open a database.\r\n *\r\n * @param name Name of the database.\r\n * @param version Schema version.\r\n * @param callbacks Additional callbacks.\r\n */\r\nfunction openDB(name, version, { blocked, upgrade, blocking } = {}) {\r\n    const request = indexedDB.open(name, version);\r\n    const openPromise = Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request);\r\n    if (upgrade) {\r\n        request.addEventListener('upgradeneeded', event => {\r\n            upgrade(Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request.result), event.oldVersion, event.newVersion, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request.transaction));\r\n        });\r\n    }\r\n    if (blocked)\r\n        request.addEventListener('blocked', () => blocked());\r\n    if (blocking) {\r\n        openPromise.then(db => db.addEventListener('versionchange', blocking)).catch(() => { });\r\n    }\r\n    return openPromise;\r\n}\r\n/**\r\n * Delete a database.\r\n *\r\n * @param name Name of the database.\r\n */\r\nfunction deleteDB(name, { blocked } = {}) {\r\n    const request = indexedDB.deleteDatabase(name);\r\n    if (blocked)\r\n        request.addEventListener('blocked', () => blocked());\r\n    return Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"a\"])(request).then(() => undefined);\r\n}\n\nconst readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];\r\nconst writeMethods = ['put', 'add', 'delete', 'clear'];\r\nconst cachedMethods = new Map();\r\nfunction getMethod(target, prop) {\r\n    if (!(target instanceof IDBDatabase &&\r\n        !(prop in target) &&\r\n        typeof prop === 'string')) {\r\n        return;\r\n    }\r\n    if (cachedMethods.get(prop))\r\n        return cachedMethods.get(prop);\r\n    const targetFuncName = prop.replace(/FromIndex$/, '');\r\n    const useIndex = prop !== targetFuncName;\r\n    const isWrite = writeMethods.includes(targetFuncName);\r\n    if (\r\n    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.\r\n    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||\r\n        !(isWrite || readMethods.includes(targetFuncName))) {\r\n        return;\r\n    }\r\n    const method = async function (storeName, ...args) {\r\n        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(\r\n        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');\r\n        let target = tx.store;\r\n        if (useIndex)\r\n            target = target.index(args.shift());\r\n        const returnVal = target[targetFuncName](...args);\r\n        if (isWrite)\r\n            await tx.done;\r\n        return returnVal;\r\n    };\r\n    cachedMethods.set(prop, method);\r\n    return method;\r\n}\r\nObject(_chunk_js__WEBPACK_IMPORTED_MODULE_0__[\"b\"])(oldTraps => ({\r\n    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),\r\n    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),\r\n}));\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/index.js?");

/***/ }),

/***/ "./node_modules/idb/with-async-ittr.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/with-async-ittr.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build/esm/index.js */ \"./node_modules/idb/build/esm/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unwrap\", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__[\"unwrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__[\"wrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"openDB\", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__[\"openDB\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deleteDB\", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__[\"deleteDB\"]; });\n\n/* harmony import */ var _build_esm_async_iterators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build/esm/async-iterators.js */ \"./node_modules/idb/build/esm/async-iterators.js\");\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/with-async-ittr.js?");

/***/ }),

/***/ "./node_modules/pretty-bytes/index.js":
/*!********************************************!*\
  !*** ./node_modules/pretty-bytes/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst BYTE_UNITS = [\n\t'B',\n\t'kB',\n\t'MB',\n\t'GB',\n\t'TB',\n\t'PB',\n\t'EB',\n\t'ZB',\n\t'YB'\n];\n\nconst BIT_UNITS = [\n\t'b',\n\t'kbit',\n\t'Mbit',\n\t'Gbit',\n\t'Tbit',\n\t'Pbit',\n\t'Ebit',\n\t'Zbit',\n\t'Ybit'\n];\n\n/*\nFormats the given number using `Number#toLocaleString`.\n- If locale is a string, the value is expected to be a locale-key (for example: `de`).\n- If locale is true, the system default locale is used for translation.\n- If no value for locale is specified, the number is returned unmodified.\n*/\nconst toLocaleString = (number, locale) => {\n\tlet result = number;\n\tif (typeof locale === 'string') {\n\t\tresult = number.toLocaleString(locale);\n\t} else if (locale === true) {\n\t\tresult = number.toLocaleString();\n\t}\n\n\treturn result;\n};\n\nmodule.exports = (number, options) => {\n\tif (!Number.isFinite(number)) {\n\t\tthrow new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);\n\t}\n\n\toptions = Object.assign({bits: false}, options);\n\tconst UNITS = options.bits ? BIT_UNITS : BYTE_UNITS;\n\n\tif (options.signed && number === 0) {\n\t\treturn ' 0 ' + UNITS[0];\n\t}\n\n\tconst isNegative = number < 0;\n\tconst prefix = isNegative ? '-' : (options.signed ? '+' : '');\n\n\tif (isNegative) {\n\t\tnumber = -number;\n\t}\n\n\tif (number < 1) {\n\t\tconst numberString = toLocaleString(number, options.locale);\n\t\treturn prefix + numberString + ' ' + UNITS[0];\n\t}\n\n\tconst exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);\n\t// eslint-disable-next-line unicorn/prefer-exponentiation-operator\n\tnumber = Number((number / Math.pow(1000, exponent)).toPrecision(3));\n\tconst numberString = toLocaleString(number, options.locale);\n\n\tconst unit = UNITS[exponent];\n\n\treturn prefix + numberString + ' ' + unit;\n};\n\n\n//# sourceURL=webpack:///./node_modules/pretty-bytes/index.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb_with_async_ittr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb/with-async-ittr.js */ \"./node_modules/idb/with-async-ittr.js\");\n/* harmony import */ var pretty_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pretty-bytes */ \"./node_modules/pretty-bytes/index.js\");\n/* harmony import */ var pretty_bytes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pretty_bytes__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n\n\nfunction getFile(name, size) {\n  name = name || 'test.warc';\n  size = size || 1024*1024*100;\n  return new Promise((resolve, reject) => {\n    window.webkitRequestFileSystem(window.PERMANENT, size, function(filesystem) {\n      //window.filesystem = filesystem;\n      filesystem.root.getFile(name, {create: false}, function(entry) {\n        entry.file(file => resolve(file), err => reject(err));\n      });\n    });\n  });\n}\n\nasync function init() {\n  chrome.storage.local.get(\"archiveSize\", (result) => {\n    let size = 0;\n\n    try {\n      size = pretty_bytes__WEBPACK_IMPORTED_MODULE_1___default()(Number(result.archiveSize || 0));\n    } catch (e) {\n      size = \"Unknown\";\n    }\n\n    document.querySelector(\"#size\").innerText = size;\n  });\n\n  //chrome.storage.local.get(\"pages\", (result) => {\n  //  renderColl(\"archive\", result.pages);\n  //});\n  const db = await Object(idb_with_async_ittr_js__WEBPACK_IMPORTED_MODULE_0__[\"openDB\"])('wr-ext.cache');\n  const result = await db.getAll(\"pages\");\n  console.log(result);\n  renderColl(\"archive\", result);\n\n\n  document.querySelector(\"#download\").addEventListener(\"click\", (event) => {\n    const blob = new Blob([file], {\"type\": \"application/octet-stream\"});\n    const blobURL = URL.createObjectURL(blob);\n    chrome.downloads.download({\"url\": blobURL, \"filename\": \"wr-ext.warc\", \"conflictAction\": \"overwrite\", \"saveAs\": false});\n    event.preventDefault();\n    return false;\n  });\n\n  document.querySelector(\"#delete\").addEventListener(\"click\", (event) => {\n    deleteAll();\n\n    event.preventDefault();\n    return false;\n  });\n\n  //navigator.serviceWorker.controller.postMessage({ \"msg_type\": \"addColl\", name: \"archive\", files: warcFiles });\n  navigator.serviceWorker.controller.postMessage({ \"msg_type\": \"addColl\", name: \"archive\", type: \"db\", data: \"wr-ext.cache\" });\n}\n\nasync function deleteAll() {\n  try {\n    await self.caches.delete(\"wr-ext.cache\");\n  } catch(e) {}\n\n  chrome.storage.local.set({\"pages\": [], \"archiveSize\": 0, \"wr-ext.text\": null});\n\n  try {\n    const db = await Object(idb_with_async_ittr_js__WEBPACK_IMPORTED_MODULE_0__[\"openDB\"])('wr-ext.cache');\n\n    await db.clear(\"urls\");\n    await db.clear(\"pages\");\n \n    await db.delete();\n  } catch (e) {}\n\n  window.location.reload();\n}\n\nfunction renderColl(name, pageList) {\n  const table = document.querySelector(\"#pages\");\n  table.innerHTML = \"\";\n\n  if (!pageList) {\n    table.innerHTML = \"<i>No Archived Pages Yet</i>\";\n    return;\n  }\n\n  const list = document.createElement(\"ol\");\n  \n\n  for (let page of pageList) {\n    const ts = page.date.replace(/[-:T]/g, '').slice(0, 14);\n    const date = page.date.replace('T', ' ').slice(0, 19);\n    list.innerHTML += `<li><i>${date}</i> <b><a href=\"/replay/wabac/${name}/${ts}/${page.url}\">${page.title}</a></b></li>`;\n  }\n\n  table.appendChild(list);\n}\n\n\n\n//window.addEventListener(\"swready\", init);\n\nwindow.addEventListener(\"load\", init);\n//init();\n\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ })));