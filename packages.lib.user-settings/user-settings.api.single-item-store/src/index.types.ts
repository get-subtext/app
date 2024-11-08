import type { SingleItemStore } from '@get-subtext/lib.store.single-item';

export interface SingleItemStoreUserSettingsApiOptions {
  userIdStore: SingleItemStore<string>;
  myListStore: SingleItemStore<string[]>;
}
