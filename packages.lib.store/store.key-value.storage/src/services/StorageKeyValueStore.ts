import type * as T from '@get-subtext/lib.store.key-value';

export class StorageKeyValueStore implements T.KeyValueStore {
  public constructor(private readonly storage: Storage) {}

  public async get<T = any>(key: string, defaultValue: T | null = null): Promise<T | null> {
    const itemRaw = this.storage.getItem(key);
    if (itemRaw === null) return defaultValue;

    try {
      const item: T = JSON.parse(itemRaw);
      return item;
    } catch {
      return defaultValue;
    }
  }

  public async set<T = any>(key: string, value: T): Promise<void> {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public async remove(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}
