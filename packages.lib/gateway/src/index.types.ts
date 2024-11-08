import type { GitHubApi } from '@get-subtext/lib.github.api';
import type { LocalSearchApi } from '@get-subtext/lib.local-search.api';
import type { MovieReaderApi } from '@get-subtext/lib.movie-reader.api';
import type { UserSettingsApi } from '@get-subtext/lib.user-settings.api';

export interface GatewayConfig {
  movieReaderApiUrlBase: string;
  showNRecentMovies: number;
  searchNRecentMovies: number;
}

export interface GatewayOptions {
  config: GatewayConfig;
  movieReaderApi: MovieReaderApi;
  gitHubApi: GitHubApi;
  localSearchApi: LocalSearchApi;
  userSettingsApi: UserSettingsApi;
}
