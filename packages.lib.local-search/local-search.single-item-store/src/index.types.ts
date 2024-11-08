import type { SingleItemStore } from '@get-subtext/lib.store.single-item';

export interface SingleItemStoreLocalSearchApiConfig {
  localSearchLimit: number;
}

export interface SingleItemStoreLocalSearchApiOptions {
  config: SingleItemStoreLocalSearchApiConfig;
  localSearchStore: SingleItemStore<string[]>;
}
