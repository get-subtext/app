import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import { StorageSingleItemStore } from './services/StorageSingleItemStore';

export interface StorageSingleItemStoreOptions {
  key: string;
  storage: Storage;
}

export class StorageSingleItemStoreFactory {
  private constructor() {}

  public static create<T>({ key, storage }: StorageSingleItemStoreOptions): SingleItemStore<T> {
    return new StorageSingleItemStore<T>(key, storage);
  }
}
