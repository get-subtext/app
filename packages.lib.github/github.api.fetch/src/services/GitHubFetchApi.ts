import type * as T from '@get-subtext/lib.github.api';

export class GitHubFetchApi implements T.GitHubApi {
  public constructor(
    private readonly apiToken: string,
    private readonly apiUrlBase: string,
    private readonly fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>
  ) {}

  public async submitIssue(issue: T.Issue): Promise<void> {
    const url = `${this.apiUrlBase}/issues`;
    const headers = { Authorization: `token ${this.apiToken}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' };
    const body = JSON.stringify(issue);
    await this.fetch(url, { method: 'POST', headers, body });
  }
}
