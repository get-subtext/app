import { SearchPageService } from '$lib/services/SearchPageService/SearchPageService';
import { gateway } from './gateway';
import { userIdService } from './userIdService';

export const searchService = new SearchPageService(userIdService, gateway);
