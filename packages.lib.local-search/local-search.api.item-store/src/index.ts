import type { LocalSearchApi } from '@get-subtext/lib.local-search.api';
import type { ItemStoreLocalSearchApiOptions } from './index.types';
import { ItemStoreLocalSearchApi } from './services/ItemStoreLocalSearchApi';

export type * from './index.types';

export class ItemStoreLocalSearchApiFactory {
  private constructor() {}

  public static create({ config, localSearchStore }: ItemStoreLocalSearchApiOptions): LocalSearchApi {
    return new ItemStoreLocalSearchApi(config.localSearchLimit, localSearchStore);
  }
}
