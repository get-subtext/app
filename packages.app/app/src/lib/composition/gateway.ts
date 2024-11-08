import { browser } from '$app/environment';
import { GatewayFactory } from '@get-subtext/lib.gateway';
import { FetchGitHubApiFactory } from '@get-subtext/lib.github.api.fetch';
import { FetchMovieReaderApiFactory } from '@get-subtext/lib.movie-reader.api.fetch';
import { StorageSingleItemStoreFactory } from '@get-subtext/lib.store.single-item.storage';
import { SingleItemStoreUserSettingsApiFactory } from '@get-subtext/lib.user-settings.api.single-item-store';
import * as config from './config';

const fakeStorage = { getItem: () => {}, setItem: () => {}, removeItem: () => {} };
const storage = browser && localStorage !== undefined ? localStorage : (fakeStorage as unknown as Storage);

const gitHubApiOptions = { config: config.fetchGitHubApiConfig, fetch };
const gitHubApi = FetchGitHubApiFactory.create(gitHubApiOptions);
const movieReaderApiOptions = { config: config.fetchMovieReaderApiConfig, fetch };
const movieReaderApi = FetchMovieReaderApiFactory.create(movieReaderApiOptions);
const myListStoreOptions = { config: config.myListStoreConfig, storage };
const myListStore = StorageSingleItemStoreFactory.create<string[]>(myListStoreOptions);
const myRequestsStoreOptions = { config: config.myRequestStoreConfig, storage };
const myRequestsStore = StorageSingleItemStoreFactory.create<string[]>(myRequestsStoreOptions);
const userIdStoreOptions = { config: config.userIdStoreConfig, storage };
const userIdStore = StorageSingleItemStoreFactory.create<string>(userIdStoreOptions);
const userSettingsApiOptions = { config: config.userSettingsApiConfig, myListStore, userIdStore, myRequestsStore };
const userSettingsApi = SingleItemStoreUserSettingsApiFactory.create(userSettingsApiOptions);

export const gateway = GatewayFactory.create({ config: config.gatewayConfig, gitHubApi, movieReaderApi, userSettingsApi });
