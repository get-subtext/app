export interface KeyValueStore {
  get<T>(key: string, defaultValue: T | null): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}
