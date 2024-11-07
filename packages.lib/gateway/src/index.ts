import type { GitHubApi } from '@get-subtext/lib.github.api';
import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';
import { Gateway as GatewayImpl } from './services/Gateway';
import type { Gateway } from './services/Gateway.types';

export type * from './services/Gateway.types';

export interface GatewayOptions {
  config: {
    movieReaderApiUrlBase: string;
    showNRecentMovies: number;
    searchNRecentMovies: number;
  };
  movieReaderApi: MovieReaderApi;
  gitHubApi: GitHubApi;
  userSettingsApi: UserSettingsApi;
}

export class GatewayFactory {
  private constructor() {}

  public static create({ config, movieReaderApi, gitHubApi, userSettingsApi }: GatewayOptions): Gateway {
    return new GatewayImpl(config.movieReaderApiUrlBase, config.searchNRecentMovies, config.searchNRecentMovies, movieReaderApi, gitHubApi, userSettingsApi);
  }
}
