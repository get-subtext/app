import { convertSubtitles } from '$lib/isomorphic.utils/convertSubtitles';
import Fuse from 'fuse.js';
import { compact, includes, map, orderBy, uniq } from 'lodash-es';
import type { Api } from './Api.types';
import type * as T from './Gateway.types';
import type { GitHubService } from './GitHubService';
import type { ImageLoader } from './ImageLoader';
import type { MyListMovieIdManager } from './MyListMovieIdManager';

export class Gateway implements T.Gateway {
  private extraImdbIds: string[] = [];

  public constructor(
    private readonly baseUrl: string,
    private readonly showNRecentMovies: number,
    private readonly searchNRecentMovies: number,
    private readonly api: Api,
    private readonly gitHubService: GitHubService,
    private readonly myListMovieIdManager: MyListMovieIdManager,
    private readonly imageLoader: ImageLoader
  ) {}

  public async getRecentMovies(): Promise<T.MovieView[]> {
    const imdbIds = await this.queryAllMovies(this.showNRecentMovies);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieView[] = moviesSorted;
    return output;
  }

  public async searchMovies(query: string): Promise<T.MovieView[]> {
    const imdbIds = await this.queryAllMovies(this.searchNRecentMovies);
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const fuse = new Fuse(moviesCompact, { keys: ['title'], threshold: 0.3, distance: 100, minMatchCharLength: 2, useExtendedSearch: true });
    const fuseResults = fuse.search(query);
    const output = map(fuseResults, (r) => r.item);
    return output;
  }

  public async getMyListMovies(userId: string): Promise<T.MovieView[]> {
    const imdbIds = await this.myListMovieIdManager.get();
    const movies = await Promise.all(map(imdbIds, (imdbId) => this.getMovie(imdbId)));
    const moviesCompact = compact(movies);
    const moviesSorted = orderBy(moviesCompact, ['releaseDate', 'releaseYear', 'title'], ['desc', 'desc', 'asc']);
    const output: T.MovieView[] = moviesSorted;
    return output;
  }

  public async addToMyList(userId: string, imdbId: string): Promise<void> {
    this.extraImdbIds.push(imdbId);
    await this.myListMovieIdManager.add(imdbId);
  }

  public async removeFromMyList(userId: string, imdbId: string): Promise<void> {
    await this.myListMovieIdManager.remove(imdbId);
  }

  public async getMovie(imdbId: string): Promise<T.MovieView | null> {
    const movie = await this.doGetMovie(imdbId);
    return movie === null ? null : movie;
  }

  public async getMovieToWatch(imdbId: string): Promise<T.MovieWatch | null> {
    const movie = await this.api.getMovie(imdbId);
    if (movie === null || !movie.isAvailable) return null;

    const subtitleFilesRaw = await Promise.all(map(movie.subtitleFileIds, (sid) => this.getSubtitleFiles(imdbId, sid)));
    const subtitleFiles = compact(subtitleFilesRaw);

    const { title, runTimeMins } = movie;
    return { imdbId, title, runTimeMins, subtitleFiles };
  }

  public async submitMovieRequest(requestId: string, userId: string, imdbId: string) {
    this.extraImdbIds.push(imdbId);
    return await this.gitHubService.submitAddMovieRequestIssue(requestId, userId, imdbId);
  }

  private async queryAllMovies(maxMovies: number): Promise<string[]> {
    const output: string[] = this.extraImdbIds;

    let idx = 1;
    while (true) {
      const page = await this.api.queryMovies(idx);
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

  private async doGetMovie(imdbId: string): Promise<T.MovieView | T.MovieView | null> {
    const movie = await this.api.getMovie(imdbId);
    console.log(movie);

    if (movie === null || !movie.isAvailable) return null;

    const { posterIds, subtitleFileIds: subtitleIds, isAvailable, ...rest } = movie;
    const posterUrl = await this.getPosterUrl(imdbId, posterIds);
    const subtitleCount = subtitleIds.length;

    const myListMovieIds = await this.myListMovieIdManager.get();
    const isOnMyList = includes(myListMovieIds, movie.imdbId);

    await this.preloadImage(posterUrl);
    return { posterUrl, subtitleCount, isOnMyList, ...rest };
  }

  private async getSubtitleFiles(imdbId: string, subtitleId: string) {
    const subtitleFile = await this.api.getSubtitleFile(imdbId, subtitleId);
    if (subtitleFile === null) return null;
    const subtitles = convertSubtitles(subtitleFile.subtitles);
    return { subtitleId: subtitleFile.subtitleFileId, source: subtitleFile.source.origin, author: subtitleFile.source.author, subtitles };
  }

  private async getPosterUrl(imdbId: string, posterIds: string[]) {
    if (posterIds.length === 0) return null;
    const poster = await this.api.getPoster(imdbId, posterIds[0]);
    if (poster === null) return null;
    console.log(`${this.baseUrl}/movies/${imdbId}/posters/${posterIds[0]}/${poster.fileName}`);
    return `${this.baseUrl}/movies/${imdbId}/posters/${posterIds[0]}/${poster.fileName}`;
  }

  private async preloadImage(url: string | null) {
    if (url !== null) {
      try {
        await this.imageLoader.load(url);
      } catch {}
    }
  }
}
