export interface Issue {
  title: string;
  body: string;
  labels: string[];
}

export interface GitHubApi {
  submitIssue(issue: Issue): Promise<void>;
}
