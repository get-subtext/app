import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import type { SingleItemStoreUserSettingsApiOptions } from './index.types';
import { SingleItemStoreUserSettingsApi } from './services/SingleItemStoreUserSettingsApi';

export type * from './index.types';

export class SingleItemStoreUserSettingsApiFactory {
  private constructor() {}

  public static create({ config, userIdStore, myListStore, myRequestsStore }: SingleItemStoreUserSettingsApiOptions): UserSettingsApi {
    return new SingleItemStoreUserSettingsApi(config.myRequestsLimit, userIdStore, myListStore, myRequestsStore);
  }
}
