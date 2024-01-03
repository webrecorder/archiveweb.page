export function setLocalOption(name, value) {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (self.chrome && self.chrome.storage) {
    return new Promise((resolve) => {
      const data = {};
      data[name] = value;
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
      self.chrome.storage.local.set(data, () => resolve());
    });
  }

  if (self.localStorage) {
    return Promise.resolve(localStorage.setItem(name, value));
  }

  return Promise.reject();
}

// ===========================================================================
export function getLocalOption(name) {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (self.chrome && self.chrome.storage) {
    return new Promise((resolve) => {
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome.storage.local.get(name, (res) => {
        resolve(res[name]);
      });
    });
  }

  if (self.localStorage) {
    return Promise.resolve(localStorage.getItem(name));
  }

  return Promise.reject();
}

// ===========================================================================
export function removeLocalOption(name) {
  // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'. | TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
  if (self.chrome && self.chrome.storage) {
    return new Promise((resolve) => {
      // @ts-expect-error - TS2339 - Property 'chrome' does not exist on type 'Window & typeof globalThis'.
      self.chrome.storage.local.remove(name, () => {
        // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
        resolve();
      });
    });
  }

  if (self.localStorage) {
    return Promise.resolve(localStorage.removeItem(name));
  }

  return Promise.reject();
}
