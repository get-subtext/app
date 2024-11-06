import { ApiFetch } from '$lib/services/StaticDataAccess/StaticDataAccessFetch';
import { ApiMemoryCache } from '$lib/services/StaticDataAccess/StaticDataAccessMemoryCache';
import { baseApi } from './baseApi';

export const apiFetch = new ApiFetch(baseApi);
export const api = new ApiMemoryCache(apiFetch);
