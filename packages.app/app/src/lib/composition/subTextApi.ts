// import { SubTextApiFetch } from '$lib/services/StaticApi/SubTextApiFetch';
// import { SubTextApiMemoryCache } from '$lib/services/StaticApi/SubTextApiMemoryCache';
// import { baseApi } from './baseApi';

// export const apiFetch = new SubTextApiFetch(baseApi);
// export const api = new SubTextApiMemoryCache(apiFetch);

import { SubTextApiMemoryCache } from '$lib/services/StaticApi/SubTextApiMemoryCache';
import { MovieReaderFetchApiFactory } from '@get-subtext/lib.movie-reader.api.fetch';
import { baseApi } from './baseApi';

export const subTextApiStd = MovieReaderFetchApiFactory.create({ config: { apiUrlBase: baseApi }, fetch });
export const subTextApi = new SubTextApiMemoryCache(subTextApiStd);
