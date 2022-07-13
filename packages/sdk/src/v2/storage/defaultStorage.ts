import { Storage } from './storage.strategy';

export class BrowserStorage implements Storage {
  PREFIX = 'smartFood';

  isSupported() {
    return !(typeof window !== 'undefined' && document && window?.localStorage);
  }
  set(key: string, value: string): void {
    if (this.isSupported()) {
      localStorage.setItem(this.getKey(this.PREFIX), value);
    }
  }
  get(key: string): string {
    if (this.isSupported()) {
      return localStorage.getItem(this.getKey(key));
    }
    return null;
  }
  private getKey(key: string) {
    return this.PREFIX + key;
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
