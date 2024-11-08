import type { GatewayOptions } from './index.types';
import { Gateway as GatewayImpl } from './services/Gateway';
import type { Gateway } from './services/Gateway.types';

export type * from './index.types';
export type * from './services/Gateway.types';

export class GatewayFactory {
  private constructor() {}

  public static create({ config, movieReaderApi, gitHubApi, userSettingsApi }: GatewayOptions): Gateway {
    return new GatewayImpl(config.movieReaderApiUrlBase, config.searchNRecentMovies, config.searchNRecentMovies, movieReaderApi, gitHubApi, userSettingsApi);
  }
}
