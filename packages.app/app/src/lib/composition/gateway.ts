import { GatewayFactory } from '@get-subtext/lib.gateway';
import { FetchGitHubApiFactory } from '@get-subtext/lib.github.api.fetch';
import { FetchMovieReaderApiFactory } from '@get-subtext/lib.movie-reader.api.fetch';
import { StorageSingleItemStoreFactory } from '@get-subtext/lib.store.single-item.storage';
import { SingleItemStoreUserSettingsApiFactory } from '@get-subtext/lib.user-settings.api.single-item-store';
import { config } from './config';

export const gitHubApi = FetchGitHubApiFactory.create({ config: config.fetchGitHubApi, fetch });
export const movieReaderApi = FetchMovieReaderApiFactory.create({ config: config.fetchMovieReaderApi, fetch });
export const myListStore = StorageSingleItemStoreFactory.create<string[]>({ config: config.myListStore, storage: localStorage });
export const userIdStore = StorageSingleItemStoreFactory.create<string>({ config: config.userIdStore, storage: localStorage });
export const userSettingsApi = SingleItemStoreUserSettingsApiFactory.create({ myListStore, userIdStore });
export const gateway = GatewayFactory.create({ config: config.gateway, gitHubApi, movieReaderApi, userSettingsApi });
