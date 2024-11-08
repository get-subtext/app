export interface LocalSearchApi {
  getImdbIdList(): Promise<string[]>;
  addToImdbIdList(imdbId: string): Promise<void>;
}
