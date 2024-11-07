import type * as T from '@get-subtext/lib.movie-reader.api';

export class FetchMovieReaderApi implements T.MovieReaderApi {
  public constructor(
    private readonly apiUrlBase: string,
    private readonly fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>
  ) {}

  public async queryMovies(pageNumber: number): Promise<T.MoviePage | null> {
    const url = `${this.apiUrlBase}/queries/release-date-asc/${pageNumber}/index.json`;
    const res = await this.fetch(url);
    if (res.status === 404) return null;
    const data = (await res.json()) as T.MoviePage;
    return data;
  }

  public async getMovie(imdbId: string): Promise<T.Movie | null> {
    const url = `${this.apiUrlBase}/movies/${imdbId}/index.json`;
    const res = await this.fetch(url);
    if (res.status === 404) return null;
    const data = (await res.json()) as T.Movie;
    return data;
  }

  public async getPoster(imdbId: string, posterId: string): Promise<T.Poster | null> {
    const url = `${this.apiUrlBase}/movies/${imdbId}/posters/${posterId}/index.json`;
    const res = await this.fetch(url);
    if (res.status === 404) return null;
    const data = (await res.json()) as T.Poster;
    return data;
  }

  public async getSubtitleFile(imdbId: string, subtitleFileId: string): Promise<T.SubtitleFile | null> {
    const url = `${this.apiUrlBase}/movies/${imdbId}/subtitle-files/${subtitleFileId}/index.json`;
    const res = await this.fetch(url);
    if (res.status === 404) return null;
    const data = (await res.json()) as T.SubtitleFile;
    return data;
  }
}
