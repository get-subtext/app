import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import { SingleItemStoreUserSettingsApi } from './services/SingleItemStoreUserSettingsApi';

export interface SingleItemStoreUserSettingsApiOptions {
  userIdStore: SingleItemStore<string>;
  myListStore: SingleItemStore<string[]>;
}

export class SingleItemStoreUserSettingsApiFactory {
  private constructor() {}

  public static create({ userIdStore, myListStore }: SingleItemStoreUserSettingsApiOptions): UserSettingsApi {
    return new SingleItemStoreUserSettingsApi(userIdStore, myListStore);
  }
}
