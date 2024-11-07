import type { Gateway } from '@get-subtext/lib.gateway';
import type * as T from './SearchPageService.types';

export class SearchPageService {
  public constructor(private readonly gateway: Gateway) {}

  public async load(): Promise<T.LoadOutput> {
    const recentMovies = await this.gateway.getRecentMovies();
    return { recentMovies };
  }

  public async search(query: string): Promise<T.SearchOutput[]> {
    if (query === '') return [];
    const matchingMovies: T.SearchOutput[] = await this.gateway.searchMovies(query);
    return matchingMovies;
  }

  public async updateIsOnMyList(imdbId: string, isOnMyList: boolean): Promise<void> {
    if (isOnMyList) {
      await this.gateway.addToMyList(imdbId);
    } else {
      await this.gateway.removeFromMyList(imdbId);
    }
  }
}
