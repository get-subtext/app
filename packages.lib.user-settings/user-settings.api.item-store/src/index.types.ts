import type { ItemStore } from '@get-subtext/lib.store.item';

export interface ItemStoreUserSettingsApiOptions {
  userIdStore: ItemStore<string>;
  myListStore: ItemStore<string[]>;
}
