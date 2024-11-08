import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import type { FetchMovieReaderApiOptions } from './index.types';
import { FetchMovieReaderApi } from './services/FetchMovieReaderApi';

export type * from './index.types';

export class FetchMovieReaderApiFactory {
  private constructor() {}

  public static create({ config, fetch }: FetchMovieReaderApiOptions): MovieReaderApi {
    return new FetchMovieReaderApi(config.apiUrlBase, fetch);
  }
}
