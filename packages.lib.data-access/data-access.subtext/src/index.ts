import { SubTextApi } from '@get-subtext/lib.movie-reader.api.fetch';
import { SubTextDataAccess as SubTextDataAccessImpl } from './services/SubTextDataAccess';
import type { MyListService, SubTextDataAccess } from './services/SubTextDataAccess.types';

export type * from './services/SubTextDataAccess.types';

export interface SubTextDataAccessOptions {
  config: {
    apiUrlBase: string;
    showNRecentMovies: number;
    searchNRecentMovies: number;
  };
  subTextApi: SubTextApi;
  myListService: MyListService;
}

export class SubTextDataAccessFactory {
  private constructor() {}

  public static create({ config, subTextApi, myListService }: SubTextDataAccessOptions): SubTextDataAccess {
    return new SubTextDataAccessImpl(config.apiUrlBase, config.searchNRecentMovies, config.searchNRecentMovies, subTextApi, myListService);
  }
}
