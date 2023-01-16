export function setLocalOption(name, value)
{
  if (self.chrome && self.chrome.storage) {
    return new Promise(resolve => {
      const data = {};
      data[name] = value;
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
  if (self.chrome && self.chrome.storage) {
    return new Promise(resolve => {
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
  if (self.chrome && self.chrome.storage) {
    return new Promise(resolve => {
      self.chrome.storage.local.remove(name, () => {
        resolve();
      });
    });
  }

  if (self.localStorage) {
    return Promise.resolve(localStorage.removeItem(name));
  }

  return Promise.reject();
}
