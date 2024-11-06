import { MovieDataAccessFetch } from '$lib/services/StaticDataAccess/MovieDataAccessFetch';
import { MovieDataAccessMemoryCache } from '$lib/services/StaticDataAccess/MovieDataAccessMemoryCache';
import { baseApi } from './baseApi';

export const apiFetch = new MovieDataAccessFetch(baseApi);
export const api = new MovieDataAccessMemoryCache(apiFetch);
