import type { SingleItemStore } from '@get-subtext/lib.store.single-item';
import type * as T from '@get-subtext/lib.user-settings.api';
import { isNil } from 'lodash-es';
import { v1 as guid } from 'uuid';

export class SingleItemStoreUserSettingsApi implements T.UserSettingsApi {
  public constructor(
    private readonly myRequestsLimit: number,
    private readonly userIdStore: SingleItemStore<string>,
    private readonly myListStore: SingleItemStore<string[]>,
    private readonly myRequestsStore: SingleItemStore<string[]>
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

  public async getMyRequests(): Promise<string[]> {
    const myRequests = (await this.myRequestsStore.get([])) ?? [];
    return myRequests;
  }

  public async addToMyRequests(imdbId: string): Promise<void> {
    const myRequests = (await this.myRequestsStore.get([])) ?? [];
    const index = myRequests.indexOf(imdbId);

    if (index !== -1) myRequests.splice(index, 1);
    myRequests.unshift(imdbId);

    if (myRequests.length > this.myRequestsLimit) myRequests.length = this.myRequestsLimit;
    await this.myRequestsStore.set(myRequests);
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    const myList = (await this.myListStore.get([])) ?? [];
    const updatedMovies = myList.filter((id) => id !== imdbId);
    await this.myListStore.set(updatedMovies);
  }
}
