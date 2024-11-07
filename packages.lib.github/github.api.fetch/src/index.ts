import type { GitHubApi } from '@get-subtext/lib.github.api';
import { GitHubFetchApi } from './services/GitHubFetchApi';

export interface GitHubFetchApiOptions {
  config: {
    apiToken: string;
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class GitHubFetchApiFactory {
  private constructor() {}

  public static create({ config, fetch }: GitHubFetchApiOptions): GitHubApi {
    return new GitHubFetchApi(config.apiUrlBase, config.apiToken, fetch);
  }
}
