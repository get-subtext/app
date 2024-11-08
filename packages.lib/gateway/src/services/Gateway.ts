import type { GitHubApi } from '@get-subtext/lib.github.api';
import type { LocalSearchApi } from '@get-subtext/lib.local-search.api';
import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import { toSubtitleBlocks } from '@get-subtext/lib.utils';
import Fuse from 'fuse.js';
import { compact, concat, includes, join, map, orderBy, range, take, uniq } from 'lodash-es';
import type * as T from './Gateway.types';

export class Gateway implements T.Gateway {
  public constructor(
    private readonly movieReaderApiUrlBase: string,
    private readonly showNRecentMovies: number,
    private readonly searchNRecentMovies: number,
    private readonly movieReaderApi: MovieReaderApi,
    private readonly gitHubApi: GitHubApi,
    private readonly localSearchApi: LocalSearchApi,
    private readonly userSettingsApi: UserSettingsApi
  ) {}

  public async getRecentMovies(): Promise<T.MovieDetails[]> {
    const imdbIds = await this.getRecentImdbIds(this.showNRecentMovies);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.doGetMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieDetails[] = moviesSorted;
    return output;
  }

  public async searchMovies(query: string): Promise<T.MovieDetails[]> {
    const maybeImdbId = this.parseImdbIdOrUrl(query);
    if (maybeImdbId !== null) {
      const movie = await this.doGetMovie(maybeImdbId);
      if (movie !== null) {
        this.localSearchApi.addToImdbIdList(maybeImdbId);
        return [movie];
      }
    }

    const recentImdbIds = await this.getRecentImdbIds(this.searchNRecentMovies);
    const myListImdbIds = await this.userSettingsApi.getMyList();
    const myRequestsImdbIds = await this.localSearchApi.getImdbIdList();
    const imdbIds = concat(recentImdbIds, myListImdbIds, myRequestsImdbIds);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.doGetMovie(imdbId)));
    const moviesCompact = compact(movies);
    const fuse = new Fuse(moviesCompact, { keys: ['title'], threshold: 0.3, distance: 100, minMatchCharLength: 2, useExtendedSearch: true });
    const fuseResults = fuse.search(query);
    const output = map(fuseResults, (r) => r.item);
    return output;
  }

  public async getMyListMovies(): Promise<T.MovieDetails[]> {
    const imdbIds = await this.userSettingsApi.getMyList();
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.doGetMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieDetails[] = moviesSorted;
    return output;
  }

  public async addToMyList(imdbId: string): Promise<void> {
    await this.localSearchApi.addToImdbIdList(imdbId);
    await this.userSettingsApi.addToMyList(imdbId);
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    await this.userSettingsApi.removeFromMyList(imdbId);
  }

  public async getMovie(imdbId: string): Promise<T.MovieDetails | null> {
    return await this.doGetMovie(imdbId);
  }

  public async getMovieToWatch(imdbId: string): Promise<T.MovieWatch | null> {
    const movie = await this.movieReaderApi.getMovie(imdbId);
    if (movie === null || !movie.isAvailable) return null;

    const subtitleFilesRaw = await Promise.all(map(movie.subtitleFileIds, (sid) => this.getSubtitleFiles(imdbId, sid)));
    const subtitleFiles = compact(subtitleFilesRaw);

    const { title, runTimeMins } = movie;
    return { imdbId, title, runTimeMins, subtitleFiles };
  }

  public async submitMovieRequest(requestId: string, imdbId: string) {
    await this.localSearchApi.addToImdbIdList(imdbId);

    const userId = await this.userSettingsApi.getUserId();
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
    await this.gitHubApi.submitIssue(issue);
  }

  private async getRecentImdbIds(maxMovies: number): Promise<string[]> {
    const output: string[] = [];

    const page = await this.movieReaderApi.queryMovies(1);
    if (page !== null) {
      output.push(...page.imdbIds);

      const pageCount = page.pageCount;
      const pageSize = page.pageSize;
      const totalPages = Math.min(pageCount, Math.ceil(maxMovies / pageSize));

      const remainingPages = range(2, totalPages + 1);
      const queryMoviesPromises = map(remainingPages, (p) => this.movieReaderApi.queryMovies(p));
      const queryMoviesResults = await Promise.allSettled(queryMoviesPromises);

      for (let i = 0; i < queryMoviesResults.length; i++) {
        const queryMoviesRes = queryMoviesResults[i];
        if (queryMoviesRes.status === 'fulfilled' && queryMoviesRes.value !== null) {
          output.push(...queryMoviesRes.value.imdbIds);
        }
      }
    }

    return take(uniq(output), maxMovies);
  }

  private async doGetMovie(imdbId: string): Promise<T.MovieDetails | T.MovieDetails | null> {
    const movie = await this.movieReaderApi.getMovie(imdbId);

    if (movie === null || !movie.isAvailable) return null;

    const { posterIds, subtitleFileIds: subtitleIds, isAvailable, ...rest } = movie;
    const posterUrl = await this.getPosterUrl(imdbId, posterIds);
    const subtitleCount = subtitleIds.length;

    const myListMovieIds = await this.userSettingsApi.getMyList();
    const isOnMyList = includes(myListMovieIds, movie.imdbId);

    return { posterUrl, subtitleCount, isOnMyList, ...rest };
  }

  private async getSubtitleFiles(imdbId: string, subtitleId: string) {
    const subtitleFile = await this.movieReaderApi.getSubtitleFile(imdbId, subtitleId);
    if (subtitleFile === null) return null;
    const subtitles = toSubtitleBlocks(subtitleFile.subtitles);
    return { subtitleId: subtitleFile.subtitleFileId, source: subtitleFile.source.origin, author: subtitleFile.source.author, subtitles };
  }

  private async getPosterUrl(imdbId: string, posterIds: string[]) {
    if (posterIds.length === 0) return null;
    const poster = await this.movieReaderApi.getPoster(imdbId, posterIds[0]);
    if (poster === null) return null;
    return `${this.movieReaderApiUrlBase}/movies/${imdbId}/posters/${posterIds[0]}/${poster.fileName}`;
  }

  private parseImdbIdOrUrl(value: string) {
    const match = value.match(/tt\d{7,8}/);
    return match ? match[0] : null;
  }
}
