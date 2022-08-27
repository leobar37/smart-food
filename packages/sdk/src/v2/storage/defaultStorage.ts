import { Storage } from './storage.strategy';

export class BrowserStorage implements Storage {
  PREFIX = 'smartFood-';

  private getKey(key: string): string {
    return this.PREFIX + key;
  }

  isSupported(): boolean {
    return !!(typeof window !== 'undefined' && document && window.localStorage);
  }

  set(key: string, value: string): void {
    if (this.isSupported()) {
      localStorage.setItem(this.getKey(key), value);
    }
  }

  setJson(key: string, value: any): void {
    if (value) {
      this.set(key, JSON.stringify(value));
    }
  }

  getJson<T extends any>(key: string): T {
    const result = this.get(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  get(key: string): string {
    if (this.isSupported()) {
      return localStorage.getItem(this.getKey(key));
    }
    return null;
  }
  removeKey(key: string): void {
    if (this.isSupported()) {
      localStorage.removeItem(this.PREFIX + key);
    }
  }

  clean(): void {
    if (this.isSupported()) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
  }
}
