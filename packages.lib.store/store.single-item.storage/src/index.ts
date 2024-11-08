import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import type { StorageSingleItemStoreOptions } from './index.types';
import { StorageSingleItemStore } from './services/StorageSingleItemStore';

export type * from './index.types';

export class StorageSingleItemStoreFactory {
  private constructor() {}

  public static create<T>({ config, storage }: StorageSingleItemStoreOptions): SingleItemStore<T> {
    return new StorageSingleItemStore<T>(config.key, storage);
  }
}
