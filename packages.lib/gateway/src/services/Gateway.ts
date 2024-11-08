import type { GitHubApi } from '@get-subtext/lib.github.api';
import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import { toSubtitleBlocks } from '@get-subtext/lib.utils';
import Fuse from 'fuse.js';
import { compact, includes, join, map, orderBy, uniq } from 'lodash-es';
import type * as T from './Gateway.types';

export class Gateway implements T.Gateway {
  private extraImdbIds: string[] = [];

  public constructor(
    private readonly movieReaderApiUrlBase: string,
    private readonly showNRecentMovies: number,
    private readonly searchNRecentMovies: number,
    private readonly movieReaderApi: MovieReaderApi,
    private readonly gitHubApi: GitHubApi,
    private readonly userSettingsApi: UserSettingsApi
  ) {}

  public async getRecentMovies(): Promise<T.MovieDetails[]> {
    const imdbIds = await this.queryAllMovies(this.showNRecentMovies);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieDetails[] = moviesSorted;
    return output;
  }

  public async searchMovies(query: string): Promise<T.MovieDetails[]> {
    const imdbIds = await this.queryAllMovies(this.searchNRecentMovies);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const fuse = new Fuse(moviesCompact, { keys: ['title'], threshold: 0.3, distance: 100, minMatchCharLength: 2, useExtendedSearch: true });
    const fuseResults = fuse.search(query);
    const output = map(fuseResults, (r) => r.item);
    return output;
  }

  public async getMyListMovies(): Promise<T.MovieDetails[]> {
    const imdbIds = await this.userSettingsApi.getMyList();
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieDetails[] = moviesSorted;
    return output;
  }

  public async addToMyList(imdbId: string): Promise<void> {
    this.extraImdbIds.push(imdbId);
    await this.userSettingsApi.addToMyList(imdbId);
  }

  public async removeFromMyList(imdbId: string): Promise<void> {
    await this.userSettingsApi.removeFromMyList(imdbId);
  }

  public async getMovie(imdbId: string): Promise<T.MovieDetails | null> {
    const movie = await this.doGetMovie(imdbId);
    return movie === null ? null : movie;
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
    const userId = await this.userSettingsApi.getUserId();
    this.extraImdbIds.push(imdbId);

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

  private async queryAllMovies(maxMovies: number): Promise<string[]> {
    const output: string[] = this.extraImdbIds;

    let idx = 1;
    while (true) {
      const page = await this.movieReaderApi.queryMovies(idx);
      if (page === null) break;
      for (let i = 0; i < page.imdbIds.length; i++) {
        output.push(page.imdbIds[i]);
        if (output.length >= maxMovies) break;
      }

      if (idx >= page.pageCount) break;
      idx++;
    }

    return uniq(output);
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
