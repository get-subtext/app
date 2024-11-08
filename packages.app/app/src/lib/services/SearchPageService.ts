import type { ImageLoader } from '$lib/services/ImageLoader';
import type { Gateway } from '@get-subtext/lib.gateway';
import { map } from 'lodash-es';
import type * as T from './SearchPageService.types';

export class SearchPageService {
  public constructor(
    private readonly gateway: Gateway,
    private readonly imageLoader: ImageLoader
  ) {}

  public async load(): Promise<T.LoadOutput> {
    const movies = await this.gateway.getRecentMovies();
    await this.preloadImages(movies);
    return { movies };
  }

  public async search(query: string): Promise<T.SearchOutput[]> {
    if (query === '') {
      const movies = await this.gateway.getRecentMovies();
      await this.preloadImages(movies);
      return movies;
    } else {
      const movies = await this.gateway.searchMovies(query);
      await this.preloadImages(movies);
      return movies;
    }
  }

  public async updateIsOnMyList(imdbId: string, isOnMyList: boolean): Promise<void> {
    if (isOnMyList) {
      await this.gateway.addToMyList(imdbId);
    } else {
      await this.gateway.removeFromMyList(imdbId);
    }
  }

  private async preloadImages(movies: { posterUrl: string | null }[]) {
    const preloadImagePromises = map(movies, (m) => this.preloadImage(m.posterUrl));
    await Promise.all(preloadImagePromises);
  }

  private async preloadImage(url: string | null) {
    if (url !== null) {
      try {
        await this.imageLoader.load(url);
      } catch {}
    }
  }
}
