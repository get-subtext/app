export interface FetchGitHubApiConfig {
  apiToken: string;
  apiUrlBase: string;
}

export interface FetchGitHubApiOptions {
  config: FetchGitHubApiConfig;
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}
