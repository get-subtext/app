import { PUBLIC_DB_REPO_NAME, PUBLIC_DB_REPO_OWNER, PUBLIC_DB_REPO_TOKEN } from '$env/static/public';

const showNRecentMovies = 30;
const searchNRecentMovies = 500;
const gitHubApiToken = PUBLIC_DB_REPO_TOKEN;
const gitHubApiUrlBase = `https://api.github.com/repos/${PUBLIC_DB_REPO_OWNER}/${PUBLIC_DB_REPO_NAME}`;
const movieReaderApiUrlBase = 'https://raw.githubusercontent.com/get-subtext/database-00/main/__data__';

export const config = {
  fetchGitHubApi: {
    apiToken: gitHubApiToken,
    apiUrlBase: gitHubApiUrlBase,
  },
  fetchMovieReaderApi: {
    apiUrlBase: movieReaderApiUrlBase,
  },
  myListStore: {
    key: 'subtext:my-list',
  },
  userIdStore: {
    key: 'subtext:user-id',
  },
  gateway: {
    movieReaderApiUrlBase,
    searchNRecentMovies,
    showNRecentMovies,
  },
};
