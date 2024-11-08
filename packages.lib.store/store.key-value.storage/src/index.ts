import type { KeyValueStore } from '@get-subtext/lib.store.key-value';
import type { StorageKeyValueStoreOptions } from './index.types';
import { StorageKeyValueStore } from './services/StorageKeyValueStore';

export type * from './index.types';

export class StorageKeyValueStoreFactory {
  private constructor() {}

  public static create<T>({ storage }: StorageKeyValueStoreOptions): KeyValueStore {
    return new StorageKeyValueStore(storage);
  }
}
