import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import { StorageSingleItemStore } from './services/StorageSingleItemStore';

export interface StorageSingleItemStoreOptions {
  config: {
    key: string;
  };
  storage: Storage;
}

export class StorageSingleItemStoreFactory {
  private constructor() {}

  public static create<T>({ config, storage }: StorageSingleItemStoreOptions): SingleItemStore<T> {
    return new StorageSingleItemStore<T>(config.key, storage);
  }
}
