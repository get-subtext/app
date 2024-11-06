import { Gateway } from '$lib/services/Gateway/Gateway';
import type { MyListMovieIdManager } from '$lib/services/MyListMovieIdManager/MyListMovieIdManager';
import { SubTextDataAccessFactory } from '@get-subtext/lib.data-access.subtext';
import { searchNRecentMovies, showNRecentMovies } from 'app/lib/composition/movies';
import { baseApi } from './baseApi';
import { gitHubService } from './gitHubService';
import { imageLoader } from './imageLoader';
import { myListMovieIdManager } from './myListMovieIdManager';
import { subTextApi } from './subTextApi';

class MyListService {
  public constructor(private readonly myListMovieIdManager: MyListMovieIdManager) {}

  public async getMyList() {
    return this.myListMovieIdManager.get();
  }
}

const myListService = new MyListService(myListMovieIdManager);

const subTextDataAccess = SubTextDataAccessFactory.create({
  config: { apiUrlBase: baseApi, searchNRecentMovies, showNRecentMovies },
  myListService,
  subTextApi,
});
export const gateway = new Gateway(
  baseApi,
  showNRecentMovies,
  searchNRecentMovies,
  subTextApi,
  subTextDataAccess,
  gitHubService,
  myListMovieIdManager,
  imageLoader
);
