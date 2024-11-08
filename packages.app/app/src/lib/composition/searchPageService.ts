import { SearchPageService } from '$lib/services/SearchPageService';
import { gateway } from './gateway';

export const searchPageService = new SearchPageService(gateway);
