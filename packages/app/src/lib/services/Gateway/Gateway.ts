import type { SubTextDataAccess } from '@get-subtext/lib.data-access.subtext';
import type { MyListMovieIdManager } from '../MyListMovieIdManager/MyListMovieIdManager';
import type { GitHubService } from '../RequestService/RequestServiceGitHub';
import type * as T from './Gateway.types';

export class Gateway implements T.Gateway {
  private extraImdbIds: string[] = [];

  public constructor(
    private readonly subTextDataAccess: SubTextDataAccess,
    private readonly gitHubService: GitHubService,
    private readonly myListMovieIdManager: MyListMovieIdManager
  ) {}

  public async getRecentMovies(): Promise<T.MovieView[]> {
    return await this.subTextDataAccess.getRecentMovies();
  }

  public async searchMovies(query: string): Promise<T.MovieView[]> {
    return await this.subTextDataAccess.searchMovies(query);
  }

  public async getMyListMovies(userId: string): Promise<T.MovieView[]> {
    return await this.subTextDataAccess.getMyListMovies(userId);
  }

  public async addToMyList(userId: string, imdbId: string): Promise<void> {
    this.extraImdbIds.push(imdbId);
    await this.myListMovieIdManager.add(imdbId);
  }

  public async removeFromMyList(userId: string, imdbId: string): Promise<void> {
    await this.myListMovieIdManager.remove(imdbId);
  }

  public async getMovie(imdbId: string): Promise<T.MovieView | null> {
    return await this.subTextDataAccess.getMovie(imdbId);
  }

  public async getMovieToWatch(imdbId: string): Promise<T.MovieWatch | null> {
    return await this.subTextDataAccess.getMovieToWatch(imdbId);
  }

  public async submitMovieRequest(requestId: string, userId: string, imdbId: string) {
    this.extraImdbIds.push(imdbId);
    return await this.gitHubService.submitAddMovieRequestIssue(requestId, userId, imdbId);
  }
}
