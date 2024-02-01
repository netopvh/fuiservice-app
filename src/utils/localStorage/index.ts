export function setStorageToken(token: string) {
  if (typeof window === 'undefined') return;

  return window.localStorage.setItem('token', token);

}

export function getStorageToken() {
  if (typeof window === 'undefined') return;

  return window.localStorage.getItem('token');

}

export function clearStorage() {
  if (typeof window === 'undefined') return;

  return window.localStorage.clear();
}

export function removeStorageItem(key: string) {
  if (typeof window === 'undefined') return;

  return window.localStorage.removeItem(`${key}`);
}

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return;

  const data = window.localStorage.getItem(`${key}`);

  return JSON.parse(data!);
}

export function setStorageItem(key: string, value: unknown) {
  if (typeof window === 'undefined') return;

  const data = JSON.stringify(value);

  return window.localStorage.setItem(`${key}`, data);
}