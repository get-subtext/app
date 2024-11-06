import { ApiFetch } from '$lib/services/ApiFetch';
import { ApiMemoryCache } from '$lib/services/ApiMemoryCache';
import { baseApi } from './baseApi';

export const apiFetch = new ApiFetch(baseApi);
export const api = new ApiMemoryCache(apiFetch);
