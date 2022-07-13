export interface Storage {
  set(key: string, value: string): void;
  get(key: string, value: string): string;
  clean(): void;
}
