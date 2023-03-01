export function set<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }

  return null;
}
