import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import { FetchMovieReaderApi } from './services/FetchMovieReaderApi';

export interface FetchMovieReaderApiOptions {
  config: {
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class FetchMovieReaderApiFactory {
  private constructor() {}

  public static create({ config, fetch }: FetchMovieReaderApiOptions): MovieReaderApi {
    return new FetchMovieReaderApi(config.apiUrlBase, fetch);
  }
}
