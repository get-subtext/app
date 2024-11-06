import { SearchService } from '$lib/services/SearchService';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

export const searchService = new SearchService(userIdService, gateway);
