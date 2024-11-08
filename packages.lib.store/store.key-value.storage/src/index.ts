import type { KeyValueStore } from '@get-subtext/lib.store.key-value';
import { StorageKeyValueStore } from './services/StorageKeyValueStore';

export interface StorageKeyValueStoreOptions {
  storage: Storage;
}

export class StorageKeyValueStoreFactory {
  private constructor() {}

  public static create<T>({ storage }: StorageKeyValueStoreOptions): KeyValueStore {
    return new StorageKeyValueStore(storage);
  }
}
