// @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type. | TS7006 - Parameter 'value' implicitly has an 'any' type.
export function setLocalOption(name, value) {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (globalThis.chrome?.storage) {
    return new Promise((resolve) => {
      const data = {};
      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'.
      data[name] = value;
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
      globalThis.chrome.storage.local.set(data, () => resolve());
    });
  }

  if (globalThis.localStorage) {
    return Promise.resolve(localStorage.setItem(name, value));
  }

  return Promise.reject();
}

// ===========================================================================
export function getLocalOption(name: string): Promise<string | null> {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (globalThis.chrome?.storage) {
    return new Promise<string>((resolve) => {
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      globalThis.chrome.storage.local.get(name, (res) => {
        resolve(res[name]);
      });
    });
  }

  if (globalThis.localStorage) {
    return Promise.resolve(localStorage.getItem(name));
  }

  return Promise.reject(null);
}

// ===========================================================================
// @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type.
export function removeLocalOption(name) {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (globalThis.chrome?.storage) {
    return new Promise((resolve) => {
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      globalThis.chrome.storage.local.remove(name, () => {
        // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
        resolve();
      });
    });
  }

  if (globalThis.localStorage) {
    return Promise.resolve(localStorage.removeItem(name));
  }

  return Promise.reject();
}
