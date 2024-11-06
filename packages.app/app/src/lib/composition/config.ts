import { PUBLIC_DB_REPO_NAME, PUBLIC_DB_REPO_OWNER, PUBLIC_DB_REPO_TOKEN } from '$env/static/public';

export const showNRecentMovies = 30;
export const searchNRecentMovies = 500;

export const databaseApiUrlBase = `https://raw.githubusercontent.com/${PUBLIC_DB_REPO_OWNER}/${PUBLIC_DB_REPO_NAME}/main/__data__`;
export const issueApiToken = PUBLIC_DB_REPO_TOKEN;
export const issueApiUrlBase = `https://api.gitHub.com/repos/${PUBLIC_DB_REPO_OWNER}/${PUBLIC_DB_REPO_NAME}`;

export const config = {
  gitHubService: {
    apiToken: issueApiToken,
    apiUrlBase: issueApiUrlBase,
  },
  gateWay: {
    apiUrlBase: issueApiUrlBase,
    showNRecentMovies,
    searchNRecentMovies,
  },
};
