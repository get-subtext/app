import { browser } from '$app/environment';
import { GatewayFactory } from '@get-subtext/lib.gateway';
import { FetchGitHubApiFactory } from '@get-subtext/lib.github.api.fetch';
import { FetchMovieReaderApiFactory } from '@get-subtext/lib.movie-reader.api.fetch';
import { StorageSingleItemStoreFactory } from '@get-subtext/lib.store.single-item.storage';
import { SingleItemStoreUserSettingsApiFactory } from '@get-subtext/lib.user-settings.api.single-item-store';
import { config } from './config';

const fakeStorage = { getItem: () => {}, setItem: () => {}, removeItem: () => {} };
const storage = browser && localStorage !== undefined ? localStorage : (fakeStorage as unknown as Storage);

export const gitHubApi = FetchGitHubApiFactory.create({ config: config.fetchGitHubApi, fetch });
export const movieReaderApi = FetchMovieReaderApiFactory.create({ config: config.fetchMovieReaderApi, fetch });
export const myListStore = StorageSingleItemStoreFactory.create<string[]>({ config: config.myListStore, storage });
export const userIdStore = StorageSingleItemStoreFactory.create<string>({ config: config.userIdStore, storage });
export const userSettingsApi = SingleItemStoreUserSettingsApiFactory.create({ myListStore, userIdStore });
export const gateway = GatewayFactory.create({ config: config.gateway, gitHubApi, movieReaderApi, userSettingsApi });
