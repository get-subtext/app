import type { ItemStore } from '@get-subtext/lib.store.item';
import type { StorageItemStoreOptions } from './index.types';
import { StorageItemStore } from './services/StorageItemStore';

export type * from './index.types';

export class StorageItemStoreFactory {
  private constructor() {}

  public static create<T>({ config, storage }: StorageItemStoreOptions): ItemStore<T> {
    return new StorageItemStore<T>(config.key, storage);
  }
}
