import type { GitHubApi } from '@get-subtext/lib.github.api';
import type { FetchGitHubApiOptions } from './index.types';
import { FetchGitHubApi } from './services/FetchGitHubApi';

export type * from './index.types';

export class FetchGitHubApiFactory {
  private constructor() {}

  public static create({ config, fetch }: FetchGitHubApiOptions): GitHubApi {
    return new FetchGitHubApi(config.apiToken, config.apiUrlBase, fetch);
  }
}
