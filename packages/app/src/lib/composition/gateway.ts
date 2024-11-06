import { Gateway } from '$lib/services/Gateway/Gateway';
import { searchNRecentMovies, showNRecentMovies } from 'app/lib/composition/movies';
import { baseApi } from './baseApi';
import { gitHubService } from './gitHubService';
import { imageLoader } from './imageLoader';
import { myListMovieIdManager } from './myListMovieIdManager';
import { subTextApi } from './subTextApi';

export const gateway = new Gateway(baseApi, showNRecentMovies, searchNRecentMovies, subTextApi, gitHubService, myListMovieIdManager, imageLoader);
