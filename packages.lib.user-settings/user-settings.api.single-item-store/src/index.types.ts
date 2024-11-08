import type { SingleItemStore } from '@get-subtext/lib.store.single-item';

export interface SingleItemStoreUserSettingsApiConfig {
  myRequestsLimit: number;
}

export interface SingleItemStoreUserSettingsApiOptions {
  config: SingleItemStoreUserSettingsApiConfig;
  userIdStore: SingleItemStore<string>;
  myListStore: SingleItemStore<string[]>;
  myRequestsStore: SingleItemStore<string[]>;
}
