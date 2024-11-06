import { searchNRecentMovies, showNRecentMovies } from '$lib/constants/movies';
import { Gateway } from '$lib/services/Gateway/Gateway';
import { api } from './api';
import { baseApi } from './baseApi';
import { gitHubService } from './gitHubService';
import { imageLoader } from './imageLoader';
import { myListMovieIdManager } from './myListMovieIdManager';

export const gateway = new Gateway(baseApi, showNRecentMovies, searchNRecentMovies, api, gitHubService, myListMovieIdManager, imageLoader);
