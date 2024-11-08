import type { Gateway } from '@get-subtext/lib.gateway';
import type * as T from './HomePageService.types';

export class HomePageService {
  public constructor(private readonly gateway: Gateway) {}

  public async load(): Promise<T.LoadOutput> {
    const myListMovies: T.LoadOutputMovie[] = await this.gateway.getMyListMovies();
    return { myListMovies };
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    await this.gateway.removeFromMyList(imdbId);
  }
}
