import { PUBLIC_DB_REPO_TOKEN } from '$env/static/public';
import { GitHubService } from '$lib/services/GitHubService';

const baseApi = 'https://api.gitHub.com/repos/get-subtext/database-00';
export const gitHubService = new GitHubService(PUBLIC_DB_REPO_TOKEN, baseApi);
