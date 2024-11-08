import type { Gateway } from '@get-subtext/lib.gateway';
import type * as T from './WatchPageService.types';

export class WatchPageService {
  public constructor(private readonly gateway: Gateway) {}

  public async load(imdbId: string): Promise<T.LoadOutput> {
    const movie = await this.gateway.getMovieToWatch(imdbId);
    return { movie: movie! };
  }
}
