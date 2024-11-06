// import { SubTextApiFetch } from '$lib/services/StaticApi/SubTextApiFetch';
// import { SubTextApiMemoryCache } from '$lib/services/StaticApi/SubTextApiMemoryCache';
// import { baseApi } from './baseApi';

// export const apiFetch = new SubTextApiFetch(baseApi);
// export const api = new SubTextApiMemoryCache(apiFetch);

import { SubTextApiMemoryCache } from '$lib/services/StaticApi/SubTextApiMemoryCache';
import { SubTextApiFactory } from '@get-subtext/lib.api.subtext';
import { baseApi } from './baseApi';

export const subTextApiStd = SubTextApiFactory.create({ config: { apiUrlBase: baseApi }, fetch });
export const subTextApi = new SubTextApiMemoryCache(subTextApiStd);
