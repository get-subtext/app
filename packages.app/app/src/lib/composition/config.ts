import { PUBLIC_DB_REPO_NAME, PUBLIC_DB_REPO_OWNER, PUBLIC_DB_REPO_TOKEN } from '$env/static/public';
import type { GatewayConfig } from '@get-subtext/lib.gateway';
import type { FetchGitHubApiConfig } from '@get-subtext/lib.github.api.fetch';
import type { FetchMovieReaderApiConfig } from '@get-subtext/lib.movie-reader.api.fetch';
import type { StorageSingleItemStoreConfig } from '@get-subtext/lib.store.single-item.storage';

const showNRecentMovies = 30;
const searchNRecentMovies = 500;
const gitHubApiToken = PUBLIC_DB_REPO_TOKEN;
const gitHubApiUrlBase = `https://api.github.com/repos/${PUBLIC_DB_REPO_OWNER}/${PUBLIC_DB_REPO_NAME}`;
const movieReaderApiUrlBase = 'https://raw.githubusercontent.com/get-subtext/database-00/main/__data__';

export const fetchGitHubApiConfig: FetchGitHubApiConfig = {
  apiToken: gitHubApiToken,
  apiUrlBase: gitHubApiUrlBase,
};

export const fetchMovieReaderApiConfig: FetchMovieReaderApiConfig = {
  apiUrlBase: movieReaderApiUrlBase,
};

export const myListStoreConfig: StorageSingleItemStoreConfig = {
  key: 'subtext:my-list',
};

export const userIdStoreConfig: StorageSingleItemStoreConfig = {
  key: 'subtext:user-id',
};

export const gatewayConfig: GatewayConfig = {
  movieReaderApiUrlBase,
  searchNRecentMovies,
  showNRecentMovies,
};
