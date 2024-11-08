import type { Gateway } from '@get-subtext/lib.gateway';
import type * as T from './SearchPageService.types';

export class SearchPageService {
  public constructor(private readonly gateway: Gateway) {}

  public async load(): Promise<T.LoadOutput> {
    const movies = await this.gateway.getRecentMovies();
    return { movies };
  }

  public async search(query: string): Promise<T.SearchOutput[]> {
    if (query === '') {
      return await this.gateway.getRecentMovies();
    } else {
      const maybeImdbId = this.parseImdbIdOrUrl(query);
      if (maybeImdbId !== null) {
        const movie = await this.gateway.getMovie(maybeImdbId);
        return movie === null ? [] : [movie];
      } else {
        return await this.gateway.searchMovies(maybeImdbId ?? query);
      }
    }
  }

  public async updateIsOnMyList(imdbId: string, isOnMyList: boolean): Promise<void> {
    if (isOnMyList) {
      await this.gateway.addToMyList(imdbId);
    } else {
      await this.gateway.removeFromMyList(imdbId);
    }
  }

  private parseImdbIdOrUrl(value: string) {
    const match = value.match(/tt\d{7,8}/);
    return match ? match[0] : null;
  }
}
