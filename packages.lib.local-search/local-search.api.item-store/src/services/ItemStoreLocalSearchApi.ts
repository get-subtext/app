import type * as T from '@get-subtext/lib.local-search.api';
import type { ItemStore } from '@get-subtext/lib.store.item';

export class ItemStoreLocalSearchApi implements T.LocalSearchApi {
  public constructor(
    private readonly localSearchLimit: number,
    private readonly localSearchStore: ItemStore<string[]>
  ) {}

  public async getImdbIdList(): Promise<string[]> {
    const localSearchImdbIds = (await this.localSearchStore.get([])) ?? [];
    return localSearchImdbIds;
  }

  public async addToImdbIdList(imdbId: string): Promise<void> {
    const localSearchImdbIds = (await this.localSearchStore.get([])) ?? [];
    const index = localSearchImdbIds.indexOf(imdbId);

    if (index !== -1) localSearchImdbIds.splice(index, 1);
    localSearchImdbIds.unshift(imdbId);

    if (localSearchImdbIds.length > this.localSearchLimit) localSearchImdbIds.length = this.localSearchLimit;
    await this.localSearchStore.set(localSearchImdbIds);
  }
}
