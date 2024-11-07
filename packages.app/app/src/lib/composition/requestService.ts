import { PUBLIC_DB_REPO_TOKEN } from '$env/static/public';
import { HelpDesk } from '$lib/services/HelpDesk/HelpDesk';
import { GitHubFetchApiFactory } from '@get-subtext/lib.github.api.fetch';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

const apiToken = PUBLIC_DB_REPO_TOKEN;
const apiUrlBase = 'https://api.gitHub.com/repos/get-subtext/database-00';

const gitHubFetchApi = GitHubFetchApiFactory.create({ config: { apiUrlBase, apiToken }, fetch });
export const helpDesk = new HelpDesk(userIdService, gitHubFetchApi, gateway);
