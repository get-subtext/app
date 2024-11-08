import type { Gateway } from '@get-subtext/lib.gateway';
import { isEmpty } from 'lodash-es';
import { v1 as guid } from 'uuid';
import type * as T from './RequestPageService.types';

export class RequestPageService {
  public constructor(private readonly gateway: Gateway) {}

  public async submitRequest(imdbIdOrImdbUrl: string): Promise<T.SubmitRequestOutput> {
    try {
      const imdbId = this.parseImdbIdOrUrl(imdbIdOrImdbUrl);

      if (imdbId === null) return { code: 'INVALID_INPUT' };

      const movie = await this.gateway.getMovie(imdbId);
      if (movie !== null) return { code: 'ALREADY_EXISTS', movie };

      const request = guid();
      await this.gateway.submitMovieRequest(request, imdbId);
      return { code: 'REQUEST_SUBMITTED' };
    } catch {
      return { code: 'UNEXPECTED_ERROR' };
    }
  }

  public getImdbQueryUrl(query: string): string {
    if (isEmpty(query)) {
      return `https://www.imdb.com?ref_=subtext`;
    } else {
      return `https://www.imdb.com/find/?q=${query}&s=tt&ttype=ft&ref_=subtext`;
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
