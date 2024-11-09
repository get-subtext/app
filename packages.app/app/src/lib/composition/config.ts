import { PUBLIC_DB_REPO_NAME, PUBLIC_DB_REPO_OWNER, PUBLIC_DB_REPO_TOKEN } from '$env/static/public';
import type { GatewayConfig } from '@get-subtext/lib.gateway';
import type { FetchGitHubApiConfig } from '@get-subtext/lib.github.api.fetch';
import type { ItemStoreLocalSearchApiConfig } from '@get-subtext/lib.local-search.api.item-store';
import type { FetchMovieReaderApiConfig } from '@get-subtext/lib.movie-reader.api.fetch';
import type { StorageItemStoreConfig } from '@get-subtext/lib.store.item.storage';

const showNRecentMovies = 30;
const searchNRecentMovies = 500;
const localSearchLimit = 500;
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

export const localSearchApiConfig: ItemStoreLocalSearchApiConfig = {
  localSearchLimit,
};

export const userIdStoreConfig: StorageItemStoreConfig = {
  key: 'subtext:user-id',
};

export const myListStoreConfig: StorageItemStoreConfig = {
  key: 'subtext:my-list',
};

export const localSearchStoreConfig: StorageItemStoreConfig = {
  key: 'subtext:local-search',
};

export const gatewayConfig: GatewayConfig = {
  movieReaderApiUrlBase,
  searchNRecentMovies,
  showNRecentMovies,
};
