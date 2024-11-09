import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import type { ItemStoreUserSettingsApiOptions } from './index.types';
import { ItemStoreUserSettingsApi } from './services/ItemStoreUserSettingsApi';

export type * from './index.types';

export class ItemStoreUserSettingsApiFactory {
  private constructor() {}

  public static create({ userIdStore, myListStore }: ItemStoreUserSettingsApiOptions): UserSettingsApi {
    return new ItemStoreUserSettingsApi(userIdStore, myListStore);
  }
}
