export interface FetchMovieReaderApiConfig {
  apiUrlBase: string;
}

export interface FetchMovieReaderApiOptions {
  config: FetchMovieReaderApiConfig;
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}
