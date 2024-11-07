export interface UserSettingsApi {
  getUserId: () => Promise<string>;
  getMyList: () => Promise<string[]>;
  addToMyList: (imdbId: string) => Promise<void>;
  removeFromMyList: (imdbId: string) => Promise<void>;
}
