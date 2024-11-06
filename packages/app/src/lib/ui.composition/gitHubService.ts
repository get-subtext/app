import { PUBLIC_REPO_TOKEN } from '$env/static/public';
import { GitHubService } from '$lib/ui.services/GitHubService';

const baseApi = 'https://api.gitHub.com/repos/get-subtext/database-00';
export const gitHubService = new GitHubService(PUBLIC_REPO_TOKEN, baseApi);
