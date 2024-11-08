import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import type { SingleItemStoreUserSettingsApiOptions } from './index.types';
import { SingleItemStoreUserSettingsApi } from './services/SingleItemStoreUserSettingsApi';

export type * from './index.types';

export class SingleItemStoreUserSettingsApiFactory {
  private constructor() {}

  public static create({ userIdStore, myListStore }: SingleItemStoreUserSettingsApiOptions): UserSettingsApi {
    return new SingleItemStoreUserSettingsApi(userIdStore, myListStore);
  }
}
