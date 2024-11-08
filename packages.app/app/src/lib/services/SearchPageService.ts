import type { Gateway } from '@get-subtext/lib.gateway';
import type * as T from './SearchPageService.types';

export class SearchPageService {
  public constructor(private readonly gateway: Gateway) {}

  public async load(): Promise<T.LoadOutput> {
    const movies = await this.gateway.getRecentMovies();
    return { movies };
  }

  public async search(query: string): Promise<T.SearchOutput[]> {
    return query === '' ? await this.gateway.getRecentMovies() : await this.gateway.searchMovies(query);
  }

  public async updateIsOnMyList(imdbId: string, isOnMyList: boolean): Promise<void> {
    if (isOnMyList) {
      await this.gateway.addToMyList(imdbId);
    } else {
      await this.gateway.removeFromMyList(imdbId);
    }
  }
}
