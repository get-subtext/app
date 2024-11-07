import { GitHubFetchApi as SubTextApiImpl } from './services/GitHubFetchApi';
import type { GitHubFetchApi } from './services/GitHubFetchApi.types';

export type * from './services/GitHubFetchApi.types';

export interface GitHubFetchApiOptions {
  config: {
    apiToken: string;
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class GitHubFetchApiFactory {
  private constructor() {}

  public static create({ config, fetch }: GitHubFetchApiOptions): GitHubFetchApi {
    return new SubTextApiImpl(config.apiUrlBase, config.apiToken, fetch);
  }
}
