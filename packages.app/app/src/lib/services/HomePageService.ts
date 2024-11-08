import type { ImageLoader } from '$lib/services/ImageLoader';
import type { Gateway } from '@get-subtext/lib.gateway';
import { map } from 'lodash-es';
import type * as T from './HomePageService.types';

export class HomePageService {
  public constructor(
    private readonly gateway: Gateway,
    private readonly imageLoader: ImageLoader
  ) {}

  public async load(): Promise<T.LoadOutput> {
    const myListMovies: T.LoadOutputMovie[] = await this.gateway.getMyListMovies();
    await this.preloadImages(myListMovies);
    return { myListMovies };
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    await this.gateway.removeFromMyList(imdbId);
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
