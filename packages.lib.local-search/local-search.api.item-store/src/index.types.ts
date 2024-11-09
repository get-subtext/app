import type { ItemStore } from '@get-subtext/lib.store.item';

export interface ItemStoreLocalSearchApiConfig {
  localSearchLimit: number;
}

export interface ItemStoreLocalSearchApiOptions {
  config: ItemStoreLocalSearchApiConfig;
  localSearchStore: ItemStore<string[]>;
}
