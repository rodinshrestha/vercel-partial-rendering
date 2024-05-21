export const setSessionStorageItem = (key: string, value: string) => {
  if (!key || !value) {
    throw new Error('Key or value cannot be empty');
  }

  sessionStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string) => {
  if (!key) {
    throw new Error('Key cannot be empty');
  }

  return sessionStorage.getItem(key);
};
