import type { LocalSearchApi } from '@get-subtext/lib.local-search.api';
import type { SingleItemStoreLocalSearchApiOptions } from './index.types';
import { SingleItemStoreLocalSearchApi } from './services/SingleItemStoreLocalSearchApi';

export type * from './index.types';

export class SingleItemStoreLocalSearchApiFactory {
  private constructor() {}

  public static create({ config, localSearchStore }: SingleItemStoreLocalSearchApiOptions): LocalSearchApi {
    return new SingleItemStoreLocalSearchApi(config.localSearchLimit, localSearchStore);
  }
}
