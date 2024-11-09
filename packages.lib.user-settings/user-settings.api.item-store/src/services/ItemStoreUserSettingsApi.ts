import type { ItemStore } from '@get-subtext/lib.store.item';
import type * as T from '@get-subtext/lib.user-settings.api';
import { isNil } from 'lodash-es';
import { v1 as guid } from 'uuid';

export class ItemStoreUserSettingsApi implements T.UserSettingsApi {
  public constructor(
    private readonly userIdStore: ItemStore<string>,
    private readonly myListStore: ItemStore<string[]>
  ) {}

  public async getUserId(): Promise<string> {
    const userId = await this.userIdStore.get(null);
    if (!isNil(userId)) return userId;

    const newUserId = guid();
    await this.userIdStore.set(newUserId);
    return newUserId;
  }

  public async getMyList(): Promise<string[]> {
    const myList = (await this.myListStore.get([])) ?? [];
    return myList;
  }

  public async addToMyList(imdbId: string): Promise<void> {
    const myList = (await this.myListStore.get([])) ?? [];
    const index = myList.indexOf(imdbId);

    if (index === -1) {
      myList.push(imdbId);
      await this.myListStore.set(myList);
    }
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    const myList = (await this.myListStore.get([])) ?? [];
    const updatedMovies = myList.filter((id) => id !== imdbId);
    await this.myListStore.set(updatedMovies);
  }
}
