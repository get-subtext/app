import type { GitHubFetchApi } from '@get-subtext/lib.github.api.fetch';
import { isEmpty, join } from 'lodash-es';
import { v1 as guid } from 'uuid';
import type { Gateway } from '../Gateway/Gateway.types';
import type { UserIdService } from '../UserIdService/UserIdService';
import type * as T from './HelpDesk.types';

export class HelpDesk {
  public constructor(
    private readonly userIdService: UserIdService,
    private readonly gitHubFetchApi: GitHubFetchApi,
    private readonly gateway: Gateway
  ) {}

  public async submitRequest(imdbIdOrImdbUrl: string): Promise<T.SubmitRequestOutput> {
    try {
      const userId = await this.userIdService.getMyId();
      const imdbId = this.parseImdbIdOrUrl(imdbIdOrImdbUrl);

      if (imdbId === null) return { code: 'INVALID_INPUT' };

      const movie = await this.gateway.getMovie(imdbId);
      if (movie !== null) return { code: 'ALREADY_EXISTS', movie };

      const requestId = guid();
      const lines: string[] = [];
      lines.push(':robot: This issue is automated.');
      lines.push('');
      lines.push('===');
      lines.push('');
      lines.push(`type: SYNC_MOVIE`);
      lines.push(`requestId: ${requestId}`);
      lines.push(`imdbId: ${imdbId}`);
      lines.push(`userId: ${userId}`);
      const issue = { title: `Sync Movie ${imdbId}`, body: join(lines, '\n'), labels: ['subtext-bot'] };
      await this.gitHubFetchApi.submitIssue(issue);

      await this.gateway.submitMovieRequest(requestId, userId, imdbId);
      return { code: 'REQUEST_SUBMITTED' };
    } catch (error) {
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
    const userId = await this.userIdService.getMyId();
    if (isOnMyList) {
      await this.gateway.addToMyList(userId, imdbId);
    } else {
      await this.gateway.removeFromMyList(userId, imdbId);
    }
  }

  private parseImdbIdOrUrl(value: string) {
    const match = value.match(/tt\d{7,8}/);
    return match ? match[0] : null;
  }
}
