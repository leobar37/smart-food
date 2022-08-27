export interface Storage {
  set(key: string, value: string): void;
  get(key: string): string;
  setJson(key: string, value: any): void;
  getJson<T extends any>(key: string): T;
  clean(): void;
  removeKey(key: string): void;
}
