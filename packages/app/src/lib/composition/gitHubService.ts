import { PUBLIC_DB_REPO_TOKEN } from '$env/static/public';
import { GitHubService } from '$lib/services/RequestService/RequestServiceGitHub';

const baseApi = 'https://api.gitHub.com/repos/get-subtext/database-00';
export const gitHubService = new GitHubService(PUBLIC_DB_REPO_TOKEN, baseApi);
