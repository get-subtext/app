import type { GitHubApi } from '@get-subtext/lib.github.api';
import { FetchGitHubApi } from './services/FetchGitHubApi';

export interface FetchGitHubApiOptions {
  config: {
    apiToken: string;
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class FetchGitHubApiFactory {
  private constructor() {}

  public static create({ config, fetch }: FetchGitHubApiOptions): GitHubApi {
    return new FetchGitHubApi(config.apiUrlBase, config.apiToken, fetch);
  }
}
