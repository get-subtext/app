import { join } from 'lodash-es';

export class GitHubService {
  public constructor(
    private readonly token: string,
    private readonly baseApi: string
  ) {}

  public async submitAddMovieRequestIssue(requestId: string, userId: string, imdbId: string) {
    try {
      const lines: string[] = [];
      lines.push(':robot: This issue is automated.');
      lines.push('');
      lines.push('===');
      lines.push('');
      lines.push(`type: SYNC_MOVIE`);
      lines.push(`requestId: ${requestId}`);
      lines.push(`imdbId: ${imdbId}`);
      lines.push(`userId: ${userId}`);

      const issueData = { title: imdbId, body: join(lines, '\n'), labels: ['subtext-bot'] };

      const url = `${this.baseApi}/issues`;
      const headers = { Authorization: `token ${this.token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' };
      const body = JSON.stringify(issueData);
      const response = await fetch(url, { method: 'POST', headers, body });

      return response.ok;
    } catch {}

    return false;
  }
}
