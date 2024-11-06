import type * as T from './Api.types';

export class ApiFetch implements T.Api {
  public constructor(private readonly baseUrl: string) {}

  public async queryMovies(pageNumber: number): Promise<T.MoviePage | null> {
    const url = `${this.baseUrl}/queries/release-date-asc/${pageNumber}/index.json`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    const data: T.MoviePage = await res.json();
    return data;
  }

  public async getMovie(imdbId: string): Promise<T.Movie | null> {
    const url = `${this.baseUrl}/movies/${imdbId}/index.json`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    const data: T.Movie = await res.json();
    return data;
  }

  public async getPoster(imdbId: string, posterId: string): Promise<T.Poster | null> {
    const url = `${this.baseUrl}/movies/${imdbId}/posters/${posterId}/index.json`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    const data: T.Poster = await res.json();
    return data;
  }

  public async getSubtitleFile(imdbId: string, subtitleId: string): Promise<T.SubtitleFile | null> {
    const url = `${this.baseUrl}/movies/${imdbId}/subtitle-files/${subtitleId}/index.json`;
    const res = await fetch(url);
    if (res.status === 404) return null;
    const data: T.SubtitleFile = await res.json();
    return data;
  }
}
