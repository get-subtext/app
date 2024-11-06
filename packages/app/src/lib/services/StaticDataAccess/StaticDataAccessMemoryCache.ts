import { isNil } from 'lodash-es';
import type * as T from './StaticDataAccess.types';

export class ApiMemoryCache implements T.Api {
  private releaseDates: Record<number, T.MoviePage | null> = {};
  private movies: Record<string, T.Movie | null> = {};
  private posters: Record<string, T.Poster | null> = {};
  private subtitles: Record<string, T.SubtitleFile | null> = {};
  private subtitleFiles: Record<string, string | null> = {};

  public constructor(private readonly instance: T.Api) {}

  public async queryMovies(pageNumber: number): Promise<T.MoviePage | null> {
    if (isNil(this.releaseDates[pageNumber])) {
      this.releaseDates[pageNumber] = await this.instance.queryMovies(pageNumber);
    }

    return this.releaseDates[pageNumber];
  }

  public async getMovie(imdbId: string): Promise<T.Movie | null> {
    if (isNil(this.movies[imdbId])) {
      this.movies[imdbId] = await this.instance.getMovie(imdbId);
    }

    return this.movies[imdbId];
  }

  public async getPoster(imdbId: string, posterId: string): Promise<T.Poster | null> {
    const key = `${imdbId}:${posterId}`;
    if (isNil(this.posters[key])) {
      this.posters[key] = await this.instance.getPoster(imdbId, posterId);
    }

    return this.posters[key];
  }

  public async getSubtitleFile(imdbId: string, subtitleId: string): Promise<T.SubtitleFile | null> {
    if (isNil(this.subtitles[subtitleId])) {
      this.subtitles[subtitleId] = await this.instance.getSubtitleFile(imdbId, subtitleId);
    }

    return this.subtitles[subtitleId];
  }
}
