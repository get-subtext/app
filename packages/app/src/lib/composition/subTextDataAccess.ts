// import { MovieDataAccessFetch } from '$lib/services/StaticDataAccess/MovieDataAccessFetch';
// import { MovieDataAccessMemoryCache } from '$lib/services/StaticDataAccess/MovieDataAccessMemoryCache';
// import { baseApi } from './baseApi';

// export const apiFetch = new MovieDataAccessFetch(baseApi);
// export const api = new MovieDataAccessMemoryCache(apiFetch);

import { MovieDataAccessMemoryCache } from '$lib/services/StaticDataAccess/MovieDataAccessMemoryCache';
import { SubTextDataAccessFactory } from '@get-subtext/lib.data-access.subtext';
import { baseApi } from './baseApi';

export const subTextDataAccessStd = SubTextDataAccessFactory.create({ config: { apiUrlBase: baseApi }, fetch });
export const subTextDataAccess = new MovieDataAccessMemoryCache(subTextDataAccessStd);
