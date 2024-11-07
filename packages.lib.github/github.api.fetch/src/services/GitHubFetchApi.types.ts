export interface Issue {
  title: string;
  body: string;
  labels: string[];
}

export interface GitHubFetchApi {
  submitIssue: (issue: Issue) => Promise<void>;
}
