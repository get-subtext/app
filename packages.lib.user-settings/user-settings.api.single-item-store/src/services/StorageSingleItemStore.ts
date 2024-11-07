import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import type * as T from '@get-subtext/lib.user-settings.api';
import { isNil } from 'lodash-es';
import { v1 as guid } from 'uuid';

export class SingleItemStoreUserSettingsApi implements T.UserSettingsApi {
  public constructor(
    private readonly userIdStore: SingleItemStore<string>,
    private readonly myListStore: SingleItemStore<string[]>
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
    if (!myList.includes(imdbId)) {
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
