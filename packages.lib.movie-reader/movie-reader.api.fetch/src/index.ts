import { MovieReaderFetchApi as SubTextApiImpl } from './services/MovieReaderFetchApi';
import type { MovieReaderFetchApi } from './services/MovieReaderFetchApi.types';

export type * from './services/MovieReaderFetchApi.types';

export interface MovieReaderFetchApiOptions {
  config: {
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class MovieReaderFetchApiFactory {
  private constructor() {}

  public static create({ config, fetch }: MovieReaderFetchApiOptions): MovieReaderFetchApi {
    return new SubTextApiImpl(config.apiUrlBase, fetch);
  }
}
